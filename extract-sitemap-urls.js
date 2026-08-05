// extract-sitemap-urls.js
// Загружает sitemap.xml с сайта и выводит все URL в консоль (по одному на строку)
// Поддерживает sitemap index (вложенные sitemap)
// Запуск: node extract-sitemap-urls.js
// Использование с перенаправлением: node extract-sitemap-urls.js > urls.txt

const https = require('https');

// ─── Конфигурация ───
const SITE_URL = 'https://dima-razrab.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// ─── ANSI colors ───
const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
};

// ════════════════════════════════════════════
//  ЗАГРУЗКА XML ПО URL
// ════════════════════════════════════════════

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    console.error(`${C.dim}Загрузка: ${url}${C.reset}`);
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} для ${url}`));
        }
      });
    }).on('error', reject);
  });
}

// ════════════════════════════════════════════
//  ПАРСИНГ URL ИЗ SITEMAP
// ════════════════════════════════════════════

function parseLocUrls(xml) {
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

/**
 * Проверяет, является ли XML sitemap index'ом
 * (содержит <sitemapindex> вместо <urlset>)
 */
function isSitemapIndex(xml) {
  return xml.includes('<sitemapindex');
}

// ════════════════════════════════════════════
//  ОСНОВНАЯ ЛОГИКА
// ════════════════════════════════════════════

async function main() {
  console.error(`${C.cyan}Загрузка sitemap: ${SITEMAP_URL}${C.reset}`);

  let xml;
  try {
    xml = await fetchUrl(SITEMAP_URL);
  } catch (e) {
    console.error(`${C.red}Ошибка загрузки sitemap: ${e.message}${C.reset}`);
    process.exit(1);
  }

  let allUrls = [];

  if (isSitemapIndex(xml)) {
    // Sitemap index — загружаем каждый вложенный sitemap
    const subSitemaps = parseLocUrls(xml);
    console.error(`${C.green}Sitemap index: найдено ${subSitemaps.length} вложенных sitemap${C.reset}`);

    for (const subUrl of subSitemaps) {
      try {
        const subXml = await fetchUrl(subUrl);
        const urls = parseLocUrls(subXml);
        allUrls.push(...urls);
      } catch (e) {
        console.error(`${C.red}Ошибка загрузки ${subUrl}: ${e.message}${C.reset}`);
      }
    }
  } else {
    // Обычный sitemap — просто парсим URL
    allUrls = parseLocUrls(xml);
  }

  // Выводим все URL в stdout (по одному на строку)
  for (const url of allUrls) {
    console.log(url);
  }

  console.error(`${C.green}Всего URL: ${allUrls.length}${C.reset}`);
}

main().catch((e) => {
  console.error(`${C.red}Критическая ошибка: ${e.message}${C.reset}`);
  process.exit(1);
});
