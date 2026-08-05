/**
 * seo-tools/fix-titles-from-wordstat.js
 *
 * Переписывает Title и MetaDescription на основе РЕАЛЬНЫХ данных Wordstat.
 * Алгоритм:
 * 1. Парсит CLEAN_ALL.md → 563 запроса с частотностью
 * 2. Для каждой статьи находит лучший Wordstat-запрос (specificity-weighted matching)
 * 3. Генерирует Title (50-70 символов, без DimaRazrab, с цифрами)
 * 4. Генерирует MetaDescription (150-160 символов, с ценой и CTA →)
 *
 * Запуск: node seo-tools/fix-titles-from-wordstat.js
 * Затем:  node seo-tools/check-seo-meta.js
 */

const fs = require('fs');
const path = require('path');
const {
    C, ARTICLES_DIR,
    findDomainFiles,
    extractSlug,
    extractTitle,
    extractMetaDescription,
    extractKeywords,
} = require('./lib/parser');

// ═══════════════════════════════════════════
//  ЦЕНЫ (из калькулятора)
// ═══════════════════════════════════════════
const PRICES = {
    'telegram-bot':     { price: '7 000',  tl: 'от 3 дней' },
    'sajt':             { price: '10 000', tl: 'от 5 дней' },
    'lending':          { price: '10 000', tl: 'от 3 дней' },
    'internet-magazin': { price: '50 000', tl: 'от 14 дней' },
    'parser':           { price: '10 000', tl: 'от 3 дней' },
    'crm':              { price: '80 000', tl: 'от 21 дня' },
    'api':              { price: '15 000', tl: 'от 5 дней' },
    'ai':               { price: '30 000', tl: 'от 7 дней' },
    'mobile':           { price: '50 000', tl: 'от 30 дней' },
    'sklad':            { price: '30 000', tl: 'от 14 дней' },
    'nextjs':           { price: '80 000', tl: 'от 10 дней' },
    'python':           { price: '30 000', tl: 'от 5 дней' },
    'saas':             { price: '200 000', tl: 'от 60 дней' },
    'konstruktory':     { price: '10 000', tl: 'от 1 дня' },
    'liderogeneraciya': { price: '30 000', tl: 'от 5 дней' },
};

// ═══════════════════════════════════════════
//  ДИРЕКТОРИЯ → КЛАСТЕР
// ═══════════════════════════════════════════
const DIR_TO_CLUSTER = {
    '': 'A', 'cluster2': 'B', 'ai': 'F', 'api': 'H', 'python': 'D',
    'nextjs': 'G', 'parsery': 'E', 'lidogeneraciya': 'L', 'veb': 'I',
    'mobile': 'J', 'konstruktory': 'M', 'sklad': 'N',
};

// ═══════════════════════════════════════════
//  ПАРСИНГ CLEAN_ALL.md
// ═══════════════════════════════════════════
function parseWordstatData() {
    const filePath = path.resolve(__dirname, '..', 'PLAN_SEO', 'WORDS', 'CLEAN_ALL.md');
    const content = fs.readFileSync(filePath, 'utf-8');
    const queries = [];
    let cluster = '';
    for (const line of content.split('\n')) {
        const cm = line.match(/^## ([A-Z])\.\s+(.+?)\s+\(/);
        if (cm) { cluster = cm[1]; continue; }
        const qm = line.match(/\|\s*\d+\s*\|\s*(.+?)\s*\|\s*([\d\s~]+)\s*\|\s*(\S+)\s*\|\s*(★+)\s*\|/);
        if (qm) {
            queries.push({
                query: qm[1].trim(),
                frequency: parseInt(qm[2].replace(/[\s~]/g, ''), 10) || 0,
                type: qm[3].trim(),
                priority: qm[4].trim(),
                cluster,
                words: qm[1].trim().toLowerCase().split(/\s+/).filter(w => w.length > 1),
            });
        }
    }
    return queries;
}

// ═══════════════════════════════════════════
//  РУЧНЫЕ ОВЕРРАЙДЫ (slug → лучший wordstat-запрос)
//  Для статей, где алгоритм даёт неверное совпадение
// ═══════════════════════════════════════════
const QUERY_OVERRIDES = {
    'ai-dlya-obrabotki-dokumentov': 'внедрение искусственного интеллекта в бизнес',
    'chatgpt-dlya-biznesa': 'интеграция chatgpt',
    'integraciya-openai-api': 'интеграция chatgpt',
    'nejroseti-dlya-avtomatizacii': 'нейросети для автоматизации бизнес процессов',
    'zakazat-telegram-bota': 'telegram боты на заказ',
    'zakazat-sajt-na-bitrix': 'заказать сайт на битрикс',
    'zakazat-sajt-na-tilde': 'заказать сайт на тильде',
    'sozdanie-sajta-kataloga': 'сайт каталог на заказ',
};

const CATEGORY_OVERRIDES = {
    'integraciya-openai-api': 'ai',
    'ai-dlya-obrabotki-dokumentov': 'ai',
    'chatgpt-dlya-biznesa': 'ai',
    'integraciya-chatgpt': 'ai',
    'zakazat-sajt-na-bitrix': 'konstruktory',
    'zakazat-sajt-na-tilde': 'konstruktory',
};

// ═══════════════════════════════════════════
//  ОПРЕДЕЛЕНИЕ ТИПА / КАТЕГОРИИ
// ═══════════════════════════════════════════
function detectType(slug) {
    if (/stoimost|skolko-stoit|cena|kalkulyator/.test(slug)) return 'price';
    if (/\bvs\b|ili-mobilnoe|ili-prilozhenie|bot-ili|aiogram-vs/.test(slug)) return 'comparison';
    if (/zakazat|razrabotka-|sozdanie-|nastrojka|integraciya|vnedrenie|avtomatizaciya-sklada\b/.test(slug)) return 'service';
    return 'guide';
}

function detectCategory(slug, cluster) {
    if (/parser|monitoring-cen|api-wildberries|analitika-marketplejsov/.test(slug)) return 'parser';
    if (/crm/.test(slug)) return 'crm';
    if (/mobile|mobilnoe|prilozheni|krossplatform/.test(slug)) return 'mobile';
    if (/sklad|wms/.test(slug)) return 'sklad';
    if (/nextjs|saas-razrabotka/.test(slug)) return 'nextjs';
    if (/saas/.test(slug)) return 'saas';
    if (/lending/.test(slug)) return 'lending';
    if (/internet-magazin|sozdanie-internet-magazina/.test(slug)) return 'internet-magazin';
    if (/bitrix|tilde|tilda|wordpress/.test(slug)) return 'konstruktory';
    if (/lidogeneraciya|parser-telegram|rassylka-telegram|sbor-bazy|kak-najti-klientov/.test(slug)) return 'liderogeneraciya';
    if (/api|rest-api|webhook|integraciya-api|integraciya-nichevyh/.test(slug)) return 'api';
    if (/ai-|chatgpt|nejroset|ai-bot|ai-agenty|openai|obrabotka-dokumentov/.test(slug)) return 'ai';
    if (/sajt|sajty|veb|razrabotka-sajta|sozdanie-sajta|zakazat-sajt|razrabotka-servisov/.test(slug)) return 'sajt';
    if (cluster === 'D' && /python|django|flask|fastapi|backend|parsing-na-zakaz|obrabotka-dannyh/.test(slug)) return 'python';
    // По кластеру
    const map = { C:'crm', D:'python', E:'parser', F:'ai', G:'nextjs', H:'api', I:'sajt', J:'mobile', M:'konstruktory', N:'sklad', L:'liderogeneraciya' };
    return map[cluster] || 'telegram-bot';
}

function detectCluster(filePath) {
    const rel = path.relative(ARTICLES_DIR, filePath).replace(/\\/g, '/');
    const dir = rel.split('/')[0];
    return DIR_TO_CLUSTER[rel.includes('/') ? dir : ''] || 'A';
}

// ═══════════════════════════════════════════
//  ПОИСК ЛУЧШЕГО WORDSTAT-ЗАПРОСА
//  Формула: score = specificity² × matchQuality × ln(freq+1)
//  specificity = кол-во слов в запросе
//  matchQuality = доля совпавших слов
// ═══════════════════════════════════════════
function norm(s) { return s.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9\s]/g, '').replace(/\s+/g, ' ').trim(); }

function scoreMatch(ws, kw) {
    const wsNorm = norm(ws.query);
    const wsWords = ws.words;
    const spec = wsWords.length;
    // Exact match
    if (kw === wsNorm) return spec * spec * 1.0 * Math.log(ws.frequency + 1);
    // Containment (ws в kw)
    if (kw.includes(wsNorm) && wsNorm.length > 4) {
        return spec * spec * (wsNorm.length / kw.length) * Math.log(ws.frequency + 1);
    }
    // Containment (kw в ws)
    if (wsNorm.includes(kw) && kw.length > 4) {
        return spec * spec * (kw.length / wsNorm.length) * Math.log(ws.frequency + 1);
    }
    // Word-level match (min 2 слова)
    const kwWords = kw.split(/\s+/).filter(w => w.length > 2);
    const matched = wsWords.filter(w => kwWords.some(k => k.includes(w) || w.includes(k)));
    if (matched.length >= 2) {
        return spec * spec * (matched.length / wsWords.length) * Math.log(ws.frequency + 1);
    }
    return 0;
}

function findBestQuery(keywordsStr, titleStr, allQueries, cluster) {
    if (!keywordsStr && !titleStr) return null;
    const kws = (keywordsStr || '').split(',').map(k => norm(k)).filter(Boolean);
    // Добавляем title как дополнительный контекст для matching
    const titleNorm = norm(titleStr || '');
    if (titleNorm) kws.push(titleNorm);

    const candidates = allQueries.filter(q => q.cluster === cluster);
    const pool = candidates.length > 0 ? candidates : allQueries;

    let best = null, bestScore = 0;

    for (const ws of pool) {
        for (const kw of kws) {
            const s = scoreMatch(ws, kw);
            if (s > bestScore) { bestScore = s; best = ws; }
        }
    }

    // Fallback: ищем по всем кластерам
    if (!best && candidates.length > 0) {
        return findBestQuery(keywordsStr, titleStr, allQueries, '');
    }
    return best;
}

// ═══════════════════════════════════════════
//  ФОРМАТИРОВАНИЕ ЗАПРОСА
// ═══════════════════════════════════════════
function fmtQuery(q) {
    let s = q.charAt(0).toUpperCase() + q.slice(1);
    const repl = [
        [/\btelegram\b/gi, 'Telegram'], [/\bapi\b/gi, 'API'], [/\bai\b/gi, 'AI'],
        [/\bcrm\b/gi, 'CRM'], [/\berp\b/gi, 'ERP'], [/\bwms\b/gi, 'WMS'],
        [/\bseo\b/gi, 'SEO'], [/\bchatgpt\b/gi, 'ChatGPT'], [/\bpython\b/gi, 'Python'],
        [/\bsaas\b/gi, 'SaaS'], [/\bfastapi\b/gi, 'FastAPI'], [/\bdjango\b/gi, 'Django'],
        [/\bflask\b/gi, 'Flask'], [/\bnext\.?js\b/gi, 'Next.js'], [/\bflutter\b/gi, 'Flutter'],
        [/\bwildberries\b/gi, 'Wildberries'], [/\bozon\b/gi, 'Ozon'], [/\bavito\b/gi, 'Avito'],
        [/\bwordpress\b/gi, 'WordPress'], [/\bbitrix\b/gi, 'Битрикс'], [/\b1с\b/gi, '1С'],
        [/\btilda\b/gi, 'Tilda'],
    ];
    for (const [rx, to] of repl) s = s.replace(rx, to);
    // Исправляем "чат бот" → "чат-бот"
    s = s.replace(/чат бот/gi, 'чат-бот');
    // Исправляем "сделаю сайт" → "создание сайта" (first-person → noun)
    s = s.replace(/^Сделаю\s+/i, 'Создание ');
    s = s.replace(/^Пишу\s+/i, 'Создание ');
    s = s.replace(/^Напишу\s+/i, 'Создание ');
    return s;
}

// ═══════════════════════════════════════════
//  ГЕНЕРАЦИЯ TITLE (50-70 символов)
// ═══════════════════════════════════════════
function makeTitle(ws, type, cat) {
    const p = PRICES[cat] || PRICES['telegram-bot'];
    const q = fmtQuery(ws.query);
    const ql = q.toLowerCase();

    // Генерируем кандидатов
    const cands = [];
    switch (type) {
        case 'service':
            cands.push(`${q}: цена от ${p.price} ₽, ${p.tl}`);
            cands.push(`${q}: разработка от ${p.price} ₽, ${p.tl}`);
            cands.push(`${q}: стоимость от ${p.price} ₽, ${p.tl}`);
            cands.push(`${q}: заказать от ${p.price} ₽, ${p.tl}`);
            break;
        case 'price':
            cands.push(`${q}: реальные цены 2026 года`);
            cands.push(`Сколько стоит ${ql}: реальные цены 2026`);
            cands.push(`${q}: от ${p.price} ₽ в 2026 году`);
            break;
        case 'comparison':
            cands.push(`${q}: что лучше выбрать в 2026`);
            cands.push(`${q}: подробное сравнение 2026`);
            break;
        default: // guide
            cands.push(`${q}: полное руководство — кейсы`);
            cands.push(`${q}: стоимость, этапы и реальные кейсы`);
            cands.push(`${q}: всё что нужно знать о разработке`);
            break;
    }

    // Выбираем лучший по длине (целевая = 60)
    let best = cands[0];
    let bestDist = Math.abs(best.length - 60);
    for (const c of cands) {
        const d = Math.abs(c.length - 60);
        if (d < bestDist && c.length >= 40 && c.length <= 75) {
            bestDist = d; best = c;
        }
    }

    // Финальная подгонка
    if (best.length > 70) {
        const colon = best.indexOf(':');
        if (colon > 0) {
            const before = best.substring(0, colon);
            const after = best.substring(colon + 2);
            const budget = 70 - before.length - 2;
            if (budget > 8) {
                const trimmed = after.substring(0, budget).replace(/\s+\S*$/, '');
                best = before + ': ' + trimmed;
            } else {
                best = before.substring(0, 70);
            }
        }
    }
    if (best.length < 50) {
        // Расширяем
        best = `${q}: разработка от ${p.price} ₽, ${p.tl}`;
        if (best.length < 50) {
            best = `${q}: заказать разработку от ${p.price} ₽, ${p.tl}`;
        }
    }
    if (best.length > 70) {
        best = best.substring(0, 70).replace(/\s+\S*$/, '');
    }
    return best;
}

// ═══════════════════════════════════════════
//  ГЕНЕРАЦИЯ METADESCRIPTION (150-160 символов)
// ═══════════════════════════════════════════
const META_DETAILS = {
    'telegram-bot':     'Автоматизация продаж и поддержки клиентов, приём заказов 24/7, уведомления',
    'crm':              'Кастомная CRM для вашего бизнеса, интеграция с 1С, Telegram и amoCRM',
    'api':              'Интеграция с внешними сервисами, автоматизация обмена данными в реальном времени',
    'ai':               'Внедрение ChatGPT и нейросетей, автоматизация контента и поддержки клиентов',
    'parser':           'Сбор данных с маркетплейсов, мониторинг цен конкурентов, аналитика продаж',
    'mobile':           'iOS и Android, кроссплатформенная разработка на Flutter и React Native',
    'sklad':            'WMS-системы, штрихкоды, ТСД, интеграция с 1С и маркетплейсами',
    'nextjs':           'SSR, SSG, высокая производительность и встроенная SEO-оптимизация',
    'python':           'Backend, API, парсеры, автоматизация бизнес-процессов и обработка данных',
    'saas':             'Мультитенантность, биллинг, масштабируемая архитектура и аналитика',
    'sajt':             'Дизайн, разработка, SEO-оптимизация, интеграция с CRM и аналитикой',
    'lending':          'Высокая конверсия, адаптивный дизайн, A/B тестирование и SEO-оптимизация',
    'internet-magazin':  'Каталог товаров, корзина, оплата, интеграция с 1С и складом',
    'konstruktory':     'Tilda, WordPress, 1С-Битрикс — быстрый запуск без программирования',
    'liderogeneraciya': 'Автоматический поиск клиентов в Telegram, парсинг каналов и рассылки',
};

function makeServicePhrase(ws, slug, type) {
    const q = fmtQuery(ws.query);
    const ql = q.toLowerCase();
    // Слова-префиксы, которые НЕ нужно дублировать
    const prefixWords = ['заказать', 'разработка', 'создание', 'настройка', 'интеграция', 'мониторинг', 'стоимость', 'сравнение'];
    // Проверяем, начинается ли запрос уже с глагола/действия
    const startsWithVerb = prefixWords.some(pw => ql.startsWith(pw + ' ') || ql.startsWith(pw));
    if (startsWithVerb) return q; // Запрос уже содержит действие

    // Добавляем контекст из slug
    if (type === 'price') return `Стоимость: ${ql}`;
    if (type === 'comparison') return `Сравнение: ${ql}`;
    if (/zakazat/.test(slug)) return `Заказать ${ql}`;
    if (/razrabotka/.test(slug)) return `Разработка ${ql}`;
    if (/sozdanie/.test(slug)) return `Создание ${ql}`;
    if (/nastrojka/.test(slug)) return `Настройка ${ql}`;
    if (/integraciya/.test(slug)) return `Интеграция ${ql}`;
    if (/monitoring/.test(slug)) return `Мониторинг ${ql}`;
    return ql.charAt(0).toUpperCase() + ql.slice(1);
}

function makeMeta(ws, type, cat, slug) {
    const p = PRICES[cat] || PRICES['telegram-bot'];
    const details = META_DETAILS[cat] || META_DETAILS['telegram-bot'];
    const prefix = makeServicePhrase(ws, slug, type);

    const cta = 'Бесплатная оценка за 24 часа →';

    // Строим: "{prefix} от {price} ₽. {details}. {cta}"
    let meta = `${prefix} от ${p.price} ₽. ${details}. ${cta}`;

    // Подгоняем длину до 150-160
    if (meta.length > 160) {
        // Обрезаем details
        const over = meta.length - 160;
        const trimmed = details.substring(0, details.length - over - 1).replace(/\s+\S*$/, '');
        meta = `${prefix} от ${p.price} ₽. ${trimmed}. ${cta}`;
    }

    if (meta.length < 150) {
        // Добавляем срок в details
        const withTl = details + `, ${p.tl} разработки`;
        meta = `${prefix} от ${p.price} ₽. ${withTl}. ${cta}`;
    }

    if (meta.length > 160) {
        const over = meta.length - 160;
        const det = details + `, ${p.tl} разработки`;
        const trimmed = det.substring(0, det.length - over - 1).replace(/\s+\S*$/, '');
        meta = `${prefix} от ${p.price} ₽. ${trimmed}. ${cta}`;
    }

    // Финальная точная обрезка
    if (meta.length > 160) {
        const cut = meta.lastIndexOf(' ', 158);
        meta = cut > 140 ? meta.substring(0, cut) + ' →' : meta.substring(0, 159) + '→';
    }
    if (meta.length < 150) {
        // Удлиняем CTA
        const longCta = 'Бесплатная оценка вашего проекта за 24 часа →';
        meta = `${prefix} от ${p.price} ₽. ${details}. ${longCta}`;
        if (meta.length > 160) {
            const cut = meta.lastIndexOf(' ', 158);
            meta = cut > 140 ? meta.substring(0, cut) + ' →' : meta.substring(0, 159) + '→';
        }
    }

    return meta;
}

// ═══════════════════════════════════════════
//  ПРИМЕНЕНИЕ ИЗМЕНЕНИЙ К ФАЙЛУ
// ═══════════════════════════════════════════
function applyField(content, field, value) {
    const slugPos = content.search(/slug\s*:\s*["'`]/);
    if (slugPos === -1) return { content, changed: false, oldValue: null };
    const before = content.substring(0, slugPos);
    const after = content.substring(slugPos);

    const sq = new RegExp(`(${field}\\s*:\\s*)"([^"]*)"`, 'm');
    const sm = after.match(sq);
    if (sm) {
        return { content: before + after.replace(sq, `$1"${value}"`), changed: true, oldValue: sm[2] };
    }
    const bq = new RegExp(`(${field}\\s*:\\s*)\`([^\`]*)\``, 'ms');
    const bm = after.match(bq);
    if (bm) {
        return { content: before + after.replace(bq, `$1\`${value}\``), changed: true, oldValue: bm[2] };
    }
    return { content, changed: false, oldValue: null };
}

// ═══════════════════════════════════════════
//  ГЛАВНАЯ ФУНКЦИЯ
// ═══════════════════════════════════════════
function run() {
    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  📊 ИСПРАВЛЕНИЕ TITLE/META ИЗ WORDSTAT${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    const allQ = parseWordstatData();
    console.log(`${C.green}✅ Wordstat-запросов: ${allQ.length}${C.reset}`);
    console.log(`${C.dim}   Кластеры: ${[...new Set(allQ.map(q => q.cluster))].join(', ')}${C.reset}\n`);

    const files = findDomainFiles(ARTICLES_DIR);
    console.log(`${C.green}✅ Domain-файлов: ${files.length}${C.reset}\n`);

    let fixed = 0, skipped = 0;
    const changes = [], warnings = [];

    for (const fp of files) {
        const rel = path.relative(ARTICLES_DIR, fp);
        const raw = fs.readFileSync(fp, 'utf-8');
        const slug = extractSlug(raw);
        if (!slug) { skipped++; continue; }

        const curTitle = extractTitle(raw);
        const curMeta = extractMetaDescription(raw);
        const kw = extractKeywords(raw);
        const cluster = detectCluster(fp);

        // Проверяем ручные оверрайды для запроса
        let best;
        if (QUERY_OVERRIDES[slug]) {
            const overrideQuery = QUERY_OVERRIDES[slug];
            best = allQ.find(q => norm(q.query) === norm(overrideQuery));
            if (!best) {
                // Создаём фиктивный запрос если не нашли в wordstat
                best = { query: overrideQuery, frequency: 0, type: 'ком', priority: '★★★', cluster, words: overrideQuery.toLowerCase().split(/\s+/) };
            }
        } else {
            best = findBestQuery(kw, curTitle, allQ, cluster);
        }
        if (!best) { warnings.push(`${rel}: нет подходящего Wordstat-запроса`); skipped++; continue; }

        const type = detectType(slug);
        const cat = CATEGORY_OVERRIDES[slug] || detectCategory(slug, cluster);
        const newTitle = makeTitle(best, type, cat);
        const newMeta = makeMeta(best, type, cat, slug);

        // Проверяем нужно ли менять
        if (curTitle === newTitle && curMeta === newMeta) { skipped++; continue; }

        let content = raw;
        let fileChanged = false;

        if (curTitle !== newTitle) {
            const r = applyField(content, 'title', newTitle);
            if (r.changed) {
                changes.push({ file: rel, slug, field: 'title', old: r.oldValue, new: newTitle, ws: best.query, freq: best.frequency });
                content = r.content; fileChanged = true;
            }
        }
        if (curMeta !== newMeta) {
            const r = applyField(content, 'metaDescription', newMeta);
            if (r.changed) {
                changes.push({ file: rel, slug, field: 'metaDescription', old: r.oldValue, new: newMeta, ws: best.query, freq: best.frequency });
                content = r.content; fileChanged = true;
            }
        }

        if (fileChanged) { fs.writeFileSync(fp, content, 'utf-8'); fixed++; }
    }

    // ─── Отчёт ───
    console.log(`${C.bold}${C.green}✅ Исправлено: ${fixed} файлов, ${changes.length} полей${C.reset}`);
    console.log(`${C.dim}Пропущено: ${skipped}${C.reset}\n`);

    if (warnings.length > 0) {
        console.log(`${C.yellow}⚠️  ${warnings.length} предупреждений${C.reset}`);
        for (const w of warnings) console.log(`  ${C.yellow}⚠ ${w}${C.reset}`);
        console.log('');
    }

    // Группировка по файлам
    const byFile = {};
    for (const ch of changes) { (byFile[ch.file] ??= []).push(ch); }

    console.log(`${C.bold}📋 Изменения:${C.reset}\n`);
    for (const [file, fch] of Object.entries(byFile)) {
        console.log(`  ${C.cyan}${file}${C.reset} ${C.dim}[${fch[0].ws} — ${fch[0].freq} показов/мес]${C.reset}`);
        for (const ch of fch) {
            const icon = ch.field === 'title' ? '🏷️' : '📝';
            const lc = (ch.new.length >= 50 && ch.new.length <= 70) || (ch.new.length >= 150 && ch.new.length <= 160) ? C.green : C.red;
            console.log(`    ${icon} ${ch.field}: ${C.dim}[${(ch.old||'').length}]${C.reset} → ${lc}[${ch.new.length}]${C.reset}`);
            console.log(`      ${C.red}БЫЛО: ${ch.old}${C.reset}`);
            console.log(`      ${C.green}СТАЛО: ${ch.new}${C.reset}`);
        }
        console.log('');
    }

    // Статистика
    const tl = changes.filter(c => c.field === 'title').map(c => c.new.length);
    const ml = changes.filter(c => c.field === 'metaDescription').map(c => c.new.length);
    if (tl.length) {
        const ok = tl.filter(l => l >= 50 && l <= 70).length;
        console.log(`${C.bold}📊 Title:${C.reset} мин=${Math.min(...tl)}, макс=${Math.max(...tl)}, ср=${Math.round(tl.reduce((a,b)=>a+b,0)/tl.length)}. 50-70: ${ok}/${tl.length}`);
    }
    if (ml.length) {
        const ok = ml.filter(l => l >= 150 && l <= 160).length;
        console.log(`${C.bold}📊 MetaDesc:${C.reset} мин=${Math.min(...ml)}, макс=${Math.max(...ml)}, ср=${Math.round(ml.reduce((a,b)=>a+b,0)/ml.length)}. 150-160: ${ok}/${ml.length}`);
    }
    console.log('');
    return { fixed, changes, warnings };
}

if (require.main === module) run();
module.exports = { run, parseWordstatData, findBestQuery, makeTitle, makeMeta };
