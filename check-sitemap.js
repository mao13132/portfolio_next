// check-sitemap.js
// Тройная проверка: Domain файлы vs Registry vs Sitemap vs Pages
// Запуск: node check-sitemap.js

const fs = require('fs');
const https = require('https');
const path = require('path');

// ─── ANSI colors ───
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// ─── Конфигурация ───
const SITE_URL = 'https://dima-razrab.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const ARTICLES_DIR = path.join(__dirname, 'data', 'articles_data');
const PAGES_DIR = path.join(__dirname, 'pages');

// ─── Страницы, которые НЕ должны быть в sitemap ───
const EXCLUDED_PAGES = new Set([
  '_app', '_document', '404', 'login', 'register',
]);

// ─── Динамические роуты (пропускаем) ───
const DYNAMIC_ROUTES = new Set(['[slug]']);

// ─── Файлы, которые не являются domain-файлами ───
const SKIP_FILES = new Set(['registry.ts', 'types.ts']);

// ════════════════════════════════════════════
//  1. ЗАГРУЗКА SITEMAP
// ════════════════════════════════════════════

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    console.log(`${C.dim}Загрузка sitemap: ${url}${C.reset}`);
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

function parseSitemapUrls(xml) {
  const urls = new Set();
  const regex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    urls.add(m[1]);
  }
  return urls;
}

// ════════════════════════════════════════════
//  2. СКАНИРОВАНИЕ DOMAIN ФАЙЛОВ
// ════════════════════════════════════════════

/**
 * Сканирует все .ts файлы в директории (рекурсивно),
 * извлекает slug из каждого (кроме registry.ts, types.ts, *-part*.ts).
 * Возвращает Map: slug → { file, relPath }
 */
function scanDomainFiles(dir) {
  const result = new Map(); // slug → { file, relPath }

  function walk(currentDir) {
    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Пропускаем texts/ директории — там не domain файлы
        if (entry.name === 'texts') continue;
        walk(fullPath);
        continue;
      }

      if (!entry.name.endsWith('.ts')) continue;
      if (SKIP_FILES.has(entry.name)) continue;
      if (entry.name.includes('-part')) continue;

      const content = fs.readFileSync(fullPath, 'utf-8');
      const match = content.match(/slug:\s*["']([^"']+)["']/);
      if (match) {
        const slug = match[1];
        const relPath = path.relative(ARTICLES_DIR, fullPath).replace(/\\/g, '/');
        result.set(slug, { file: fullPath, relPath });
      }
    }
  }

  walk(dir);
  return result;
}

// ════════════════════════════════════════════
//  3. СКАНИРОВАНИЕ REGISTRY (импорты)
// ════════════════════════════════════════════

/**
 * Парсит registry.ts (и подреестры) и извлекает slug'и
 * из импортированных domain файлов.
 * Возвращает Set<string> — slug'и из registry.
 */
function extractRegistrySlugs(registryPath) {
  const slugs = new Set();
  const dir = path.dirname(registryPath);

  let content;
  try {
    content = fs.readFileSync(registryPath, 'utf-8');
  } catch (e) {
    return slugs;
  }

  // Ищем import ... from './xxx' или from '../xxx'
  const importRegex = /from\s+['"](\.[^'"]+)['"]/g;
  let m;

  while ((m = importRegex.exec(content)) !== null) {
    const importPath = m[1];
    const resolvedBase = path.resolve(dir, importPath);

    // Пробуем как .ts файл
    const tsPath = resolvedBase + '.ts';

    if (fs.existsSync(tsPath)) {
      // Это domain файл — читаем и извлекаем slug
      const fileContent = fs.readFileSync(tsPath, 'utf-8');
      const slugMatch = fileContent.match(/slug:\s*["']([^"']+)["']/);
      if (slugMatch) {
        slugs.add(slugMatch[1]);
      }
    } else if (fs.existsSync(resolvedBase) && fs.statSync(resolvedBase).isDirectory()) {
      // Может быть подреестр — пропускаем
    }
  }

  // Ищем import подреестров: from './xxx/registry'
  const subRegistryRegex = /from\s+['"]([^'"]*\/registry)['"]/g;
  while ((m = subRegistryRegex.exec(content)) !== null) {
    const subRegPath = path.resolve(dir, m[1]);
    // Добавляем .ts если нужно
    const subRegFile = subRegPath.endsWith('.ts') ? subRegPath : subRegPath + '.ts';
    if (fs.existsSync(subRegFile)) {
      const subSlugs = extractRegistrySlugs(subRegFile);
      for (const s of subSlugs) {
        slugs.add(s);
      }
    }
  }

  return slugs;
}

// ════════════════════════════════════════════
//  4. ПРОВЕРКА TEXT PARTS
// ════════════════════════════════════════════

/**
 * Проверяет наличие текстовых частей для slug.
 * Ищет в texts/ директории того же каталога, где лежит domain файл.
 * Паттерн: {slug}-part*.ts или {slug-abbreviated}-part*.ts
 */
function checkTextParts(slug, domainFile, allTextsDirs) {
  // Ищем во всех texts/ директориях файлы с -part и содержащие часть slug
  const parts = [];

  for (const textsDir of allTextsDirs) {
    if (!fs.existsSync(textsDir)) continue;
    try {
      const entries = fs.readdirSync(textsDir);
      for (const entry of entries) {
        if (!entry.endsWith('.ts') || !entry.includes('-part')) continue;

        // Извлекаем имя файла без -partN.ts
        const partMatch = entry.match(/^(.+)-part\d+\.ts$/);
        if (!partMatch) continue;

        const baseName = partMatch[1];

        // Точное совпадение: slug начинается с baseName
        // или baseName начинается с части slug
        // или slug содержит baseName
        if (
          slug === baseName ||
          slug.startsWith(baseName + '-') ||
          baseName.startsWith(slug.replace(/-[^-]*$/, '')) ||
          slug.includes(baseName) ||
          baseName.includes(slug.replace(/-[^-]*$/, ''))
        ) {
          parts.push(entry);
        }
      }
    } catch (e) { /* ignore */ }
  }

  return parts.length > 0;
}

/**
 * Собирает все texts/ директории из articles_data
 */
function collectTextsDirs(baseDir) {
  const dirs = [];

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(dir, entry.name);
        if (entry.name === 'texts') {
          dirs.push(fullPath);
        } else {
          walk(fullPath);
        }
      }
    }
  }

  walk(baseDir);
  return dirs;
}

// ════════════════════════════════════════════
//  5. СКАНИРОВАНИЕ PAGES/
// ════════════════════════════════════════════

function scanPages(dir, basePath = '') {
  const routes = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return routes;
  }

  for (const entry of entries) {
    const name = entry.name;

    if (entry.isFile()) {
      if (!name.endsWith('.tsx')) continue;
      const slug = name.replace('.tsx', '');
      if (EXCLUDED_PAGES.has(slug)) continue;
      if (DYNAMIC_ROUTES.has(slug)) continue;

      const route = basePath ? `${basePath}/${slug}` : `/${slug}`;
      const finalRoute = slug === 'index' ? (basePath || '/') : route;
      routes.push(finalRoute);
    }

    if (entry.isDirectory()) {
      const subPath = basePath ? `${basePath}/${name}` : `/${name}`;
      routes.push(...scanPages(path.join(dir, name), subPath));
    }
  }

  return routes;
}

// ════════════════════════════════════════════
//  6. ОСНОВНАЯ ЛОГИКА
// ════════════════════════════════════════════

async function main() {
  console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
  console.log(`${C.bold}${C.cyan}  🔍 SITEMAP vs REGISTRY vs DOMAIN FILES${C.reset}`);
  console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

  // ─── Шаг 1: Загружаем sitemap ───
  let sitemapUrls;
  try {
    const xml = await fetchSitemap(SITEMAP_URL);
    sitemapUrls = parseSitemapUrls(xml);
    console.log(`${C.green}✔ Sitemap загружен: ${sitemapUrls.size} URL${C.reset}`);
  } catch (e) {
    console.error(`${C.red}✘ Ошибка загрузки sitemap: ${e.message}${C.reset}`);
    process.exit(1);
  }

  // ─── Шаг 2: Сканируем domain файлы ───
  const domainFiles = scanDomainFiles(ARTICLES_DIR);
  console.log(`${C.green}✔ Domain файлов: ${domainFiles.size}${C.reset}`);

  // ─── Шаг 3: Извлекаем slug'и из registry ───
  const mainRegistryPath = path.join(ARTICLES_DIR, 'registry.ts');
  const registrySlugs = extractRegistrySlugs(mainRegistryPath);
  console.log(`${C.green}✔ В registry: ${registrySlugs.size} записей${C.reset}`);

  // ─── Шаг 4: Собираем texts/ директории ───
  const allTextsDirs = collectTextsDirs(ARTICLES_DIR);
  console.log(`${C.dim}  Найдено texts/ директорий: ${allTextsDirs.length}${C.reset}`);

  // ─── Шаг 5: Сканируем pages/ ───
  const localRoutes = scanPages(PAGES_DIR);
  const localUrls = new Map();
  for (const route of localRoutes) {
    const url = `${SITE_URL}${route}`;
    localUrls.set(url, route);
  }
  console.log(`${C.green}✔ Pages: ${localRoutes.size || localRoutes.length} маршрутов${C.reset}\n`);

  // ════════════════════════════════════════════
  //  АНАЛИЗ
  // ════════════════════════════════════════════

  // Множество slug'ов из sitemap (только /blog/ URLs)
  const sitemapBlogSlugs = new Set();
  for (const url of sitemapUrls) {
    const blogMatch = url.match(/\/blog\/([^/]+)\/?$/);
    if (blogMatch) {
      sitemapBlogSlugs.add(blogMatch[1]);
    }
  }

  // Проверки
  const domainNotInRegistry = [];   // 🔴 Критично: domain есть, registry нет
  const registryNotInSitemap = [];  // 🔴 Критично: registry есть, sitemap нет
  const sitemapNotInRegistry = [];  // 🟡 Предупреждение: sitemap есть, registry нет
  const pagesNotInSitemap = [];     // 🟡 Предупреждение: pages есть, sitemap нет
  const sitemapNotInPages = [];     // 🟢 Информация: sitemap есть, pages нет
  const missingTextParts = [];      // 🟡 Предупреждение: нет text parts
  const matched = [];               // ✅ Совпадения

  // 1. Domain файл есть, но НЕТ в registry → 🔴
  for (const [slug, info] of domainFiles) {
    if (!registrySlugs.has(slug)) {
      domainNotInRegistry.push({ slug, ...info });
    }
  }

  // 2. Registry есть, но НЕТ в sitemap → 🔴
  for (const slug of registrySlugs) {
    const blogUrl = `${SITE_URL}/blog/${slug}`;
    if (!sitemapBlogSlugs.has(slug)) {
      registryNotInSitemap.push({ slug, blogUrl });
    }
  }

  // Известные hub-страницы (категории, не статьи) — не требуются в registry
  const KNOWN_HUB_SLUGS = new Set([
    'ai-integracii', 'avtomatizaciya-biznesa', 'lidogeneraciya-telegram',
    'mobilnye-prilozheniya', 'nextjs-razrabotka', 'parsery-marketplejsov',
    'python-razrabotka', 'razrabotka-api', 'telegram-boty', 'veb-razrabotka',
  ]);

  // 3. Sitemap есть, но НЕТ в registry → 🟡 (кроме hub pages)
  for (const slug of sitemapBlogSlugs) {
    if (!registrySlugs.has(slug) && !KNOWN_HUB_SLUGS.has(slug)) {
      const blogUrl = `${SITE_URL}/blog/${slug}`;
      sitemapNotInRegistry.push({ slug, blogUrl });
    }
  }

  // 4. Pages/ есть, но НЕТ в sitemap → 🟡
  for (const [url, route] of localUrls) {
    if (!sitemapUrls.has(url)) {
      // Проверяем, не dynamic ли это
      if (route.includes('[slug]')) continue;
      pagesNotInSitemap.push({ url, route });
    }
  }

  // 5. Sitemap есть, но НЕТ в pages/ → 🟢
  for (const url of sitemapUrls) {
    if (!localUrls.has(url)) {
      // Пропускаем blog/ (динамические) и work/ category/
      if (url.includes('/blog/') || url.includes('/work/') || url.includes('/category/')) continue;
      sitemapNotInPages.push({ url });
    }
  }

  // 6. Domain файл есть, но НЕТ text parts → 🟡
  for (const [slug, info] of domainFiles) {
    const hasParts = checkTextParts(slug, info.file, allTextsDirs);
    if (!hasParts) {
      try {
        const content = fs.readFileSync(info.file, 'utf-8');
        // Проверяем: есть ли inline контент ИЛИ импорт из texts/
        const hasInlineContent = /content\s*:\s*`/.test(content);
        const hasTextImport = /import.*from\s+['"]\.\/texts\//.test(content);
        if (!hasInlineContent && !hasTextImport) {
          missingTextParts.push({ slug, ...info });
        }
      } catch (e) {
        missingTextParts.push({ slug, ...info });
      }
    }
  }

  // Совпадения: domain в registry и в sitemap
  for (const [slug] of domainFiles) {
    if (registrySlugs.has(slug) && sitemapBlogSlugs.has(slug)) {
      matched.push(slug);
    }
  }

  // ════════════════════════════════════════════
  //  ВЫВОД
  // ════════════════════════════════════════════

  // Общая статистика
  console.log(`${C.bold}📊 ОБЩАЯ СТАТИСТИКА:${C.reset}`);
  console.log(`   Domain файлов:     ${C.bold}${domainFiles.size}${C.reset}`);
  console.log(`   В registry:        ${C.bold}${registrySlugs.size}${C.reset}`);
  console.log(`   В sitemap (blog):  ${C.bold}${sitemapBlogSlugs.size}${C.reset}`);
  console.log(`   Всего в sitemap:   ${C.bold}${sitemapUrls.size}${C.reset}`);
  console.log(`   Pages маршрутов:   ${C.bold}${localRoutes.length}${C.reset}`);
  console.log(`   Совпадений (3/3):  ${C.bold}${matched.length}${C.reset}\n`);

  // ─── 🔴 Критические проблемы ───
  const criticalCount = domainNotInRegistry.length + registryNotInSitemap.length;
  console.log(`${C.bold}${C.red}❌ КРИТИЧЕСКИЕ ПРОБЛЕМЫ (${criticalCount}):${C.reset}`);

  if (domainNotInRegistry.length > 0) {
    console.log(`\n   ${C.red}${C.bold}Domain файл НЕ в registry → 500 ошибка при запросе!${C.reset}`);
    for (const item of domainNotInRegistry.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`   ${C.red}• /blog/${item.slug}${C.reset} ${C.dim}(${item.relPath})${C.reset}`);
    }
  }

  if (registryNotInSitemap.length > 0) {
    console.log(`\n   ${C.red}${C.bold}Registry есть, но НЕТ в sitemap → забыли добавить на бэкенде${C.reset}`);
    for (const item of registryNotInSitemap.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`   ${C.red}• /blog/${item.slug}${C.reset}`);
    }
  }

  if (criticalCount === 0) {
    console.log(`   ${C.green}(всё чисто)${C.reset}`);
  }

  // ─── 🟡 Предупреждения ───
  const warningsCount = sitemapNotInRegistry.length + pagesNotInSitemap.length + missingTextParts.length;
  console.log(`\n${C.bold}${C.yellow}⚠️ ПРЕДУПРЕЖДЕНИЯ (${warningsCount}):${C.reset}`);

  if (sitemapNotInRegistry.length > 0) {
    console.log(`\n   ${C.yellow}${C.bold}Sitemap ссылается на несуществующую статью (нет в registry):${C.reset}`);
    for (const item of sitemapNotInRegistry.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`   ${C.yellow}• /blog/${item.slug}${C.reset}`);
    }
  }

  if (pagesNotInSitemap.length > 0) {
    console.log(`\n   ${C.yellow}${C.bold}Страница в pages/ но НЕТ в sitemap:${C.reset}`);
    for (const item of pagesNotInSitemap.sort((a, b) => a.url.localeCompare(b.url))) {
      console.log(`   ${C.yellow}• ${item.url}${C.reset} ${C.dim}(${item.route})${C.reset}`);
    }
  }

  if (missingTextParts.length > 0) {
    console.log(`\n   ${C.yellow}${C.bold}Domain файл без текстовых частей:${C.reset}`);
    for (const item of missingTextParts.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`   ${C.yellow}• /blog/${item.slug}${C.reset} ${C.dim}(${item.relPath})${C.reset}`);
    }
  }

  if (warningsCount === 0) {
    console.log(`   ${C.green}(всё чисто)${C.reset}`);
  }

  // ─── 🟢 Информация ───
  console.log(`\n${C.bold}${C.cyan}ℹ️ ИНФОРМАЦИЯ (${sitemapNotInPages.length}):${C.reset}`);

  if (sitemapNotInPages.length > 0) {
    console.log(`   ${C.dim}Sitemap URL не в pages/ (внешние/динамические):${C.reset}`);
    for (const item of sitemapNotInPages.sort((a, b) => a.url.localeCompare(b.url))) {
      console.log(`   ${C.dim}• ${item.url}${C.reset}`);
    }
  } else {
    console.log(`   ${C.dim}(нет лишних URL в sitemap)${C.reset}`);
  }

  // ─── Итог ───
  console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);

  if (criticalCount === 0 && warningsCount === 0) {
    console.log(`${C.bold}${C.green}✅ ВСЁ ОК: ${matched.length}/${domainFiles.size} domain файлов в registry и в sitemap${C.reset}`);
  } else if (criticalCount === 0) {
    console.log(`${C.bold}${C.yellow}⚠️ Критических проблем нет, но есть ${warningsCount} предупреждений${C.reset}`);
    console.log(`${C.bold}${C.green}✅ Domain файлы в порядке: ${matched.length}/${domainFiles.size}${C.reset}`);
  } else {
    console.log(`${C.bold}${C.red}❌ НАЙДЕНЫ КРИТИЧЕСКИЕ ПРОБЛЕМЫ: ${criticalCount}${C.reset}`);
    console.log(`${C.bold}${C.red}   Исправьте перед деплоем!${C.reset}`);
  }

  // ─── Список для деплоя (если есть что добавить) ───
  if (registryNotInSitemap.length > 0) {
    console.log(`\n${C.bold}📋 СПИСОК ДЛЯ ДЕПЛОЯ (добавить в sitemap backend):${C.reset}`);
    for (const item of registryNotInSitemap.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`   ${C.cyan}/blog/${item.slug}${C.reset}`);
    }
  }

  console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);

  // Exit code
  process.exit(criticalCount > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(`${C.red}Критическая ошибка: ${e.message}${C.reset}`);
  console.error(e.stack);
  process.exit(1);
});
