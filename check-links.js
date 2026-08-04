// check-links.js
// Проверяет битые ссылки на продакшен-сайте
// Получает sitemap.xml с сайта автоматически
// Рекурсия 1 уровень: проверяет начальные URL + все ссылки внутри страниц
// Запуск: node check-links.js [url]
//   url — необязательный, по умолчанию https://dima-razrab.com/sitemap.xml
// Без внешних зависимостей — только встроенный Node.js (https, http)

const https = require('https');
const http = require('http');
const { URL } = require('url');

// ─── ANSI colors ───
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', white: '\x1b[37m',
};

// ─── Настройки ───
const SITEMAP_URL = process.argv[2] || 'https://dima-razrab.com/sitemap.xml';
const CONCURRENCY = 10;
const TIMEOUT_MS = 15000;
const MAX_RETRIES = 1;
let BASE_URL = 'https://dima-razrab.com'; // будет обновлён из sitemap

// ─── Получаем sitemap.xml с сайта ───
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.get(url, { timeout: TIMEOUT_MS, headers: { 'User-Agent': 'LinkChecker/1.0' } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        fetchUrl(new URL(res.headers.location, url).href).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: chunks.join('') }));
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
  });
}

async function fetchSitemapUrls(sitemapUrl) {
  const { status, body } = await fetchUrl(sitemapUrl);
  if (status !== 200) throw new Error(`Sitemap вернул ${status}: ${sitemapUrl}`);
  const regex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = regex.exec(body)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

// ─── HTTP запрос с редиректами ───
function fetchPage(url, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      resolve({ status: 0, body: '', error: 'Too many redirects' });
      return;
    }

    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;

    const req = lib.get(url, { timeout: TIMEOUT_MS, headers: { 'User-Agent': 'LinkChecker/1.0', 'Accept-Encoding': 'identity' } }, (res) => {
      // Следуем редиректам
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, url).href;
        res.resume();
        resolve(fetchPage(redirectUrl, redirectCount + 1));
        return;
      }

      let body = '';
      res.setEncoding('utf8');
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({ status: res.statusCode, body: chunks.join(''), error: null });
      });
    });

    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '', error: 'Timeout' }); });
    req.on('error', (e) => resolve({ status: 0, body: '', error: e.message }));
  });
}

// ─── Извлечение ссылок из HTML ───
function extractLinks(html, baseUrl) {
  const links = new Set();
  const regex = /href=["']([^"'#]+?)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let href = match[1].trim();
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    try {
      const absolute = new URL(href, baseUrl).href;
      // Только внутренние ссылки
      if (absolute.startsWith(BASE_URL)) {
        // Убираем query и hash
        const clean = new URL(absolute);
        clean.search = '';
        clean.hash = '';
        links.add(clean.href);
      }
    } catch {}
  }
  return [...links];
}

// ─── Параллельная обработка с лимитом ───
async function processBatch(urls, fn, concurrency) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      results[idx] = await fn(urls[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()));
  return results;
}

// ─── Проверка одного URL с retry ───
async function checkUrl(url, retries = MAX_RETRIES) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const result = await fetchPage(url);
    if (result.status !== 0 || attempt === retries) {
      return { url, ...result };
    }
    await new Promise(r => setTimeout(r, 500));
  }
}

// ─── Главная функция ───
async function main() {
  console.log(`${C.cyan}${C.bold}══════════════════════════════════════════════════════════════${C.reset}`);
  console.log(`${C.cyan}${C.bold}  🔗  ПРОВЕРКА БИТЫХ ССЫЛОК НА ПРОДЕ${C.reset}`);
  console.log(`${C.cyan}${C.bold}══════════════════════════════════════════════════════════════${C.reset}`);
  console.log(`${C.dim}Sitemap: ${SITEMAP_URL}${C.reset}`);
  console.log(`${C.dim}Параллельность: ${CONCURRENCY}${C.reset}\n`);

  // ─── Получаем sitemap с сайта ───
  console.log(`${C.bold}Загружаю sitemap.xml...${C.reset}`);
  let INITIAL_URLS;
  try {
    INITIAL_URLS = await fetchSitemapUrls(SITEMAP_URL);
  } catch (e) {
    console.error(`${C.red}Ошибка загрузки sitemap: ${e.message}${C.reset}`);
    process.exit(1);
  }
  BASE_URL = new URL(INITIAL_URLS[0]).origin;
  console.log(`${C.green}✔ Загружено ${INITIAL_URLS.length} URL из sitemap${C.reset}\n`);

  const allChecked = new Map();
  const brokenLinks = [];

  // ─── Уровень 0: проверяем начальные URL ───
  console.log(`${C.bold}[Уровень 0] Проверяю ${INITIAL_URLS.length} начальных URL...${C.reset}`);
  
  const level0Results = await processBatch(INITIAL_URLS, checkUrl, CONCURRENCY);
  
  let okCount = 0;
  let errCount = 0;
  const pagesToScan = []; // страницы с 200 для сканирования ссылок

  for (const r of level0Results) {
    allChecked.set(r.url, { status: r.status, error: r.error });
    if (r.status === 200) {
      okCount++;
      pagesToScan.push(r);
    } else {
      errCount++;
      brokenLinks.push({ page: '(initial)', link: r.url, status: r.status, error: r.error });
    }
  }

  console.log(`  ${C.green}✔ OK (200): ${okCount}${C.reset}`);
  if (errCount > 0) console.log(`  ${C.red}✘ Битых: ${errCount}${C.reset}`);

  // ─── Уровень 1: парсим ссылки из страниц и проверяем ───
  console.log(`\n${C.bold}[Уровень 1] Паршу ссылки из ${pagesToScan.length} страниц...${C.reset}`);

  const level1Urls = new Set();
  for (const page of pagesToScan) {
    const links = extractLinks(page.body, page.url);
    for (const link of links) {
      if (!allChecked.has(link)) {
        level1Urls.add(link);
      }
    }
  }

  console.log(`  Найдено ${level1Urls.size} уникальных внутренних ссылок для проверки`);

  const level1Array = [...level1Urls];
  let l1ok = 0, l1err = 0;
  let processed = 0;

  const level1Results = await processBatch(level1Array, async (url) => {
    const r = await checkUrl(url);
    processed++;
    if (processed % 50 === 0) {
      process.stdout.write(`  ${C.dim}Проверено: ${processed}/${level1Array.length}${C.reset}\r`);
    }
    return r;
  }, CONCURRENCY);

  for (const r of level1Results) {
    allChecked.set(r.url, { status: r.status, error: r.error });
    if (r.status === 200) {
      l1ok++;
    } else {
      l1err++;
      // Находим на какой странице была эта ссылка
      const sourcePage = pagesToScan.find(p => extractLinks(p.body, p.url).includes(r.url));
      brokenLinks.push({
        page: sourcePage ? sourcePage.url : '(unknown)',
        link: r.url,
        status: r.status,
        error: r.error,
      });
    }
  }

  console.log(`  ${C.green}✔ OK (200): ${l1ok}${C.reset}`);
  if (l1err > 0) console.log(`  ${C.red}✘ Битых: ${l1err}${C.reset}`);

  // ─── Отчёт ───
  console.log(`\n${C.cyan}${C.bold}══════════════════════════════════════════════════════════════${C.reset}`);
  console.log(`${C.bold}📊 СВОДНЫЙ ОТЧЁТ${C.reset}`);
  console.log(`${C.cyan}${C.bold}══════════════════════════════════════════════════════════════${C.reset}`);
  console.log(`Всего проверено URL: ${allChecked.size}`);
  console.log(`${C.green}✔ OK (200): ${okCount + l1ok}${C.reset}`);
  console.log(`${C.red}✘ Битых: ${brokenLinks.length}${C.reset}`);

  if (brokenLinks.length > 0) {
    console.log(`\n${C.red}${C.bold}⛔ БИТЫЕ ССЫЛКИ:${C.reset}`);
    console.log(`${C.red}${'─'.repeat(80)}${C.reset}`);

    // Группируем по source page
    const byPage = {};
    for (const bl of brokenLinks) {
      if (!byPage[bl.page]) byPage[bl.page] = [];
      byPage[bl.page].push(bl);
    }

    for (const [page, links] of Object.entries(byPage)) {
      console.log(`\n  ${C.yellow}📄 Страница: ${page}${C.reset}`);
      for (const l of links) {
        const statusStr = l.status === 0 ? `${C.red}ERR${C.reset}` : `${C.red}${l.status}${C.reset}`;
        const errStr = l.error ? ` ${C.dim}(${l.error})${C.reset}` : '';
        console.log(`    ${C.red}✘${C.reset} ${l.link} → ${statusStr}${errStr}`);
      }
    }
  } else {
    console.log(`\n${C.green}${C.bold}✅ Все ссылки рабочие!${C.reset}`);
  }

  console.log(`\n${C.cyan}${'═'.repeat(60)}${C.reset}`);
  console.log(`Проверка завершена.`);
}

main().catch(console.error);
