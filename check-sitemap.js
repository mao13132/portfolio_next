// check-sitemap.js
// Сравнивает ВСЕ страницы сайта (pages/) с онлайн sitemap
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
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m',
};

// ─── Страницы, которые НЕ должны быть в sitemap ───
const EXCLUDED_PAGES = new Set([
  '_app',
  '_document',
  '404',
  'login',
  'register',
]);

// ─── Динамические роуты (пропускаем) ───
const DYNAMIC_ROUTES = new Set([
  '[slug]',
]);

const SITEMAP_URL = 'https://dima-razrab.com/sitemap.xml';

// ─── Функция загрузки sitemap ───
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

// ─── Сканирование pages/ директории ───
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

    // Пропускаем .module.css, не .tsx файлы
    if (entry.isFile()) {
      if (!name.endsWith('.tsx')) continue;
      const slug = name.replace('.tsx', '');

      // Пропускаем исключённые и динамические
      if (EXCLUDED_PAGES.has(slug)) continue;
      if (DYNAMIC_ROUTES.has(slug)) continue;

      const route = basePath ? `${basePath}/${slug}` : `/${slug}`;
      // index → родительский путь
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

// ─── Основная логика ───
async function main() {
  // 1. Загружаем онлайн sitemap
  let sitemapContent;
  try {
    sitemapContent = await fetchSitemap(SITEMAP_URL);
    console.log(`${C.green}✔ Sitemap загружен (${sitemapContent.length} байт)${C.reset}\n`);
  } catch (e) {
    console.error(`${C.red}Ошибка загрузки sitemap: ${e.message}${C.reset}`);
    process.exit(1);
  }

  // 2. Извлекаем URL из sitemap
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const sitemapUrls = new Set();
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    sitemapUrls.add(match[1]);
  }

  // 2.5. Загружаем slug'и из domain файлов (парсим, т.к. TypeScript нельзя require)
  const registrySlugs = new Set();
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const articlesDir = path.join(__dirname, 'data', 'articles_data');
  
  function scanForSlugs(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanForSlugs(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'registry.ts' && entry.name !== 'types.ts' && !entry.name.includes('-part')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          let m;
          slugRegex.lastIndex = 0;
          while ((m = slugRegex.exec(content)) !== null) {
            registrySlugs.add(m[1]);
          }
        }
      }
    } catch (e) { /* игнорируем ошибки */ }
  }
  
  scanForSlugs(articlesDir);
  console.log(`${C.dim}Найдено ${registrySlugs.size} slug'ов в domain файлах${C.reset}`);

  // 3. Сканируем pages/ директорию
  const pagesDir = path.join(__dirname, 'pages');
  const localRoutes = scanPages(pagesDir);

  // Преобразуем routes в полные URL
  const siteUrl = 'https://dima-razrab.com';
  const localUrls = new Map(); // url → file path
  for (const route of localRoutes) {
    const url = `${siteUrl}${route}`;
    const filePath = route === '/' ? 'pages/index.tsx' : `pages${route}.tsx`;
    localUrls.set(url, filePath);
  }

  // 4. Сравнение
  const ok = [];
  const missingInSitemap = [];
  const missingInPages = [];

  for (const [url, filePath] of localUrls) {
    if (sitemapUrls.has(url)) {
      ok.push({ url, filePath });
    } else {
      missingInSitemap.push({ url, filePath });
    }
  }

  for (const url of sitemapUrls) {
    if (!localUrls.has(url)) {
      if (url.includes('/work/') || url.includes('/category/')) {
        // Динамические страницы — пропускаем
        continue;
      } else if (url.includes('/blog/')) {
        // Blog статьи — проверяем через registry
        const slug = url.replace(`${siteUrl}/blog/`, '');
        if (registrySlugs.has(slug)) {
          // Статья есть в registry — OK (рендерится через [slug].tsx)
          ok.push({ url, filePath: `dynamic [slug].tsx → ${slug}` });
        } else {
          missingInPages.push({ url, note: 'blog статья — НЕТ в registry!' });
        }
      } else {
        missingInPages.push({ url, note: 'нет в pages/' });
      }
    }
  }

  // Сортируем
  ok.sort((a, b) => a.url.localeCompare(b.url));
  missingInSitemap.sort((a, b) => a.url.localeCompare(b.url));
  missingInPages.sort((a, b) => a.url.localeCompare(b.url));

  // 5. Вывод
  const line = '─'.repeat(80);

  console.log(`${C.bold}${C.cyan}${line}${C.reset}`);
  console.log(`${C.bold}${C.cyan}  🔍  SITEMAP vs PAGES — Полная проверка сайта${C.reset}`);
  console.log(`${C.bold}${C.cyan}${line}${C.reset}\n`);

  // Статистика
  console.log(`${C.bold}📊 Общая статистика:${C.reset}`);
  console.log(`   Всего URL в онлайн sitemap:  ${C.bold}${sitemapUrls.size}${C.reset}`);
  console.log(`   Страниц в pages/:            ${C.bold}${localUrls.size}${C.reset}`);
  console.log(`   Совпадений (OK):             ${C.green}${C.bold}${ok.length}${C.reset}`);
  console.log(`   Нет в sitemap:               ${missingInSitemap.length > 0 ? C.red : C.green}${C.bold}${missingInSitemap.length}${C.reset}`);
  console.log(`   Нет в pages (blog/work):     ${missingInPages.length > 0 ? C.yellow : C.green}${C.bold}${missingInPages.length}${C.reset}`);
  console.log();

  // OK
  console.log(`${C.bold}${C.bgGreen}${C.white} ✅ OK — в pages/ и в sitemap (${ok.length}) ${C.reset}\n`);
  for (let i = 0; i < ok.length; i++) {
    const { url, filePath } = ok[i];
    console.log(`   ${C.dim}${String(i + 1).padStart(3)}.${C.reset} ${C.green}✔${C.reset} ${C.bold}${url}${C.reset} ${C.dim}(${filePath})${C.reset}`);
  }
  console.log();

  // MISSING IN SITEMAP
  console.log(`${C.bold}${C.bgRed}${C.white} ❌ НЕТ В SITEMAP — страница есть, но не в sitemap (${missingInSitemap.length}) ${C.reset}\n`);
  if (missingInSitemap.length === 0) {
    console.log(`   ${C.dim}(все страницы из pages/ есть в sitemap)${C.reset}`);
  } else {
    for (let i = 0; i < missingInSitemap.length; i++) {
      const { url, filePath } = missingInSitemap[i];
      console.log(`   ${C.dim}${String(i + 1).padStart(3)}.${C.reset} ${C.red}✘${C.reset} ${C.bold}${url}${C.reset}`);
      console.log(`        ${C.dim}файл: ${filePath}${C.reset}`);
    }
  }
  console.log();

  // MISSING IN PAGES
  if (missingInPages.length > 0) {
    console.log(`${C.bold}${C.bgYellow}${C.white} ⚠️  В SITEMAP, НО НЕ В pages/ (${missingInPages.length}) ${C.reset}\n`);
    for (let i = 0; i < missingInPages.length; i++) {
      const { url, note } = missingInPages[i];
      console.log(`   ${C.dim}${String(i + 1).padStart(3)}.${C.reset} ${C.yellow}⚠${C.reset} ${C.bold}${url}${C.reset} ${C.dim}(${note})${C.reset}`);
    }
    console.log();
  }

  // Итог
  console.log(`${C.bold}${C.cyan}${line}${C.reset}`);
  if (missingInSitemap.length === 0) {
    console.log(`${C.green}${C.bold}  🎉 Все страницы из pages/ есть в sitemap!${C.reset}`);
  } else {
    console.log(`${C.red}${C.bold}  ⛔ ${missingInSitemap.length} страниц нужно добавить в sitemap${C.reset}`);
  }
  console.log(`${C.bold}${C.cyan}${line}${C.reset}\n`);

  // Простой список всех пропущенных URL (для копирования)
  if (missingInSitemap.length > 0) {
    console.log(`${C.bold}${C.white}📋 СПИСОК ДЛЯ ДОБАВЛЕНИЯ В SITEMAP:${C.reset}\n`);
    for (const { url } of missingInSitemap) {
      console.log(`  ${url}`);
    }
    console.log(`\n${C.dim}Всего: ${missingInSitemap.length} URL${C.reset}\n`);
  }
}

main().catch(err => {
  console.error(`${C.red}Критическая ошибка: ${err.message}${C.reset}`);
  process.exit(1);
});
