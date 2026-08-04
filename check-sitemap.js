// check-sitemap.js
// Сравнивает slug'и из PLAN_SEO/sitemap.xml с зарегистрированными статьями
// в data/articles_data
// Запуск: node check-sitemap.js

const fs = require('fs');
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

// ─── Категории блога (НЕ статьи) ───
const CATEGORY_SLUGS = new Set([
  'telegram-boty',
  'parsery-marketplejsov',
  'lidogeneraciya-telegram',
  'python-razrabotka',
  'nextjs-razrabotka',
  'ai-integracii',
  'razrabotka-api',
  'avtomatizaciya-biznesa',
]);

// ─── 1. Читаем sitemap.xml ───
const sitemapPath = path.join(__dirname, 'PLAN_SEO', 'sitemap.xml');
let sitemapContent;
try {
  sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
} catch (e) {
  console.error(`${C.red}Ошибка чтения sitemap.xml: ${e.message}${C.reset}`);
  process.exit(1);
}

// Извлекаем все <loc> URL
const locRegex = /<loc>([^<]+)<\/loc>/g;
const allUrls = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
  allUrls.push(match[1]);
}

// Фильтруем blog-URL и извлекаем slug, исключая категории
const sitemapSlugs = new Set();
const blogUrlBySlug = {};

for (const url of allUrls) {
  const blogMatch = url.match(/\/blog\/([^\/\?#]+)/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (!CATEGORY_SLUGS.has(slug)) {
      sitemapSlugs.add(slug);
      blogUrlBySlug[slug] = url;
    }
  }
}

// ─── 2. Сканируем реестры статей ───
const articlesDir = path.join(__dirname, 'data', 'articles_data');

/**
 * Рекурсивно находит все .ts файлы в директории
 */
function findTsFiles(dir) {
  let results = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return results;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Пропускаем подпапку texts — там части статей, не определения
      if (entry.name === 'texts') continue;
      results = results.concat(findTsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

const tsFiles = findTsFiles(articlesDir);
const registrySlugs = new Set();
const slugToFile = {};

const slugRegex = /slug:\s*["']([^"']+)["']/g;

for (const filePath of tsFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let m;
  while ((m = slugRegex.exec(content)) !== null) {
    const slug = m[1];
    registrySlugs.add(slug);
    slugToFile[slug] = path.relative(__dirname, filePath);
  }
}

// ─── 3. Сравнение ───
const ok = [];             // В sitemap + в реестре
const missingInSitemap = [];  // В реестре, но НЕТ в sitemap
const missingInRegistry = []; // В sitemap, но НЕТ в реестре

for (const slug of registrySlugs) {
  if (sitemapSlugs.has(slug)) {
    ok.push(slug);
  } else {
    missingInSitemap.push(slug);
  }
}

for (const slug of sitemapSlugs) {
  if (!registrySlugs.has(slug)) {
    missingInRegistry.push(slug);
  }
}

// Сортируем для удобства
ok.sort();
missingInSitemap.sort();
missingInRegistry.sort();

// ─── 4. Вывод ───
const line = '─'.repeat(72);

console.log(`\n${C.bold}${C.cyan}${line}${C.reset}`);
console.log(`${C.bold}${C.cyan}  🔍  SITEMAP vs REGISTRY — Сравнение slug'ей${C.reset}`);
console.log(`${C.bold}${C.cyan}${line}${C.reset}\n`);

// Общая статистика
console.log(`${C.bold}📊 Общая статистика:${C.reset}`);
console.log(`   Всего URL в sitemap:         ${C.bold}${allUrls.length}${C.reset}`);
console.log(`   Blog-URL (не категории):     ${C.bold}${sitemapSlugs.size}${C.reset}`);
console.log(`   Статей в реестре:            ${C.bold}${registrySlugs.size}${C.reset}`);
console.log(`   Совпадений (OK):             ${C.green}${C.bold}${ok.length}${C.reset}`);
console.log(`   Нет в sitemap:               ${missingInSitemap.length > 0 ? C.red : C.green}${C.bold}${missingInSitemap.length}${C.reset}`);
console.log(`   Нет в реестре:               ${missingInRegistry.length > 0 ? C.yellow : C.green}${C.bold}${missingInRegistry.length}${C.reset}`);
console.log();

// OK — совпадения
console.log(`${C.bold}${C.bgGreen}${C.white} ✅ OK — зарегистрированы + в sitemap (${ok.length}) ${C.reset}\n`);
if (ok.length === 0) {
  console.log(`   ${C.dim}(нет совпадений)${C.reset}`);
} else {
  for (let i = 0; i < ok.length; i++) {
    const slug = ok[i];
    const num = String(i + 1).padStart(3);
    console.log(`   ${C.dim}${num}.${C.reset} ${C.green}✔${C.reset} ${C.bold}${slug}${C.reset}`);
  }
}
console.log();

// MISSING IN SITEMAP
console.log(`${C.bold}${C.bgRed}${C.white} ❌ MISSING IN SITEMAP — в реестре, но НЕТ в sitemap (${missingInSitemap.length}) ${C.reset}\n`);
if (missingInSitemap.length === 0) {
  console.log(`   ${C.dim}(все статьи из реестра есть в sitemap)${C.reset}`);
} else {
  for (let i = 0; i < missingInSitemap.length; i++) {
    const slug = missingInSitemap[i];
    const num = String(i + 1).padStart(3);
    const file = slugToFile[slug] || '?';
    console.log(`   ${C.dim}${num}.${C.reset} ${C.red}✘${C.reset} ${C.bold}${slug}${C.reset}`);
    console.log(`        ${C.dim}файл: ${file}${C.reset}`);
    console.log(`        ${C.dim}нужно добавить: https://dima-razrab.com/blog/${slug}${C.reset}`);
  }
}
console.log();

// MISSING IN REGISTRY
console.log(`${C.bold}${C.bgYellow}${C.white} ⚠️  MISSING IN REGISTRY — в sitemap, но НЕТ в реестре (${missingInRegistry.length}) ${C.reset}\n`);
if (missingInRegistry.length === 0) {
  console.log(`   ${C.dim}(все URL из sitemap зарегистрированы)${C.reset}`);
} else {
  for (let i = 0; i < missingInRegistry.length; i++) {
    const slug = missingInRegistry[i];
    const num = String(i + 1).padStart(3);
    const url = blogUrlBySlug[slug] || `https://dima-razrab.com/blog/${slug}`;
    console.log(`   ${C.dim}${num}.${C.reset} ${C.yellow}⚠${C.reset} ${C.bold}${slug}${C.reset}`);
    console.log(`        ${C.dim}url: ${url}${C.reset}`);
  }
}
console.log();

// Итог
console.log(`${C.bold}${C.cyan}${line}${C.reset}`);
if (missingInSitemap.length === 0 && missingInRegistry.length === 0) {
  console.log(`${C.green}${C.bold}  🎉 Всё синхронизировано!${C.reset}`);
} else {
  if (missingInSitemap.length > 0) {
    console.log(`${C.red}${C.bold}  ⛔ ${missingInSitemap.length} статей нужно добавить в sitemap${C.reset}`);
  }
  if (missingInRegistry.length > 0) {
    console.log(`${C.yellow}${C.bold}  ⚠️  ${missingInRegistry.length} URL в sitemap не зарегистрированы в реестре${C.reset}`);
  }
}
console.log(`${C.bold}${C.cyan}${line}${C.reset}\n`);
