/**
 * seo-tools/lib/parser.js
 * Общие утилиты для парсинга .ts файлов статей
 * Все скрипты seo-tools/ используют этот модуль
 */

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
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bgGreen: '\x1b[42m',
    bgRed: '\x1b[41m',
    bgYellow: '\x1b[43m',
};

// __dirname = seo-tools/lib/ → поднимаемся на 2 уровня до корня проекта
const ARTICLES_DIR = path.resolve(__dirname, '..', '..', 'data', 'articles_data');
const PAGES_DIR = path.resolve(__dirname, '..', '..', 'pages');

/**
 * Собирает slug'и сервисных страниц из pages/ (не blog/, не динамические)
 */
function getServicePageSlugs() {
    const slugs = new Set();
    if (!fs.existsSync(PAGES_DIR)) return slugs;
    const entries = fs.readdirSync(PAGES_DIR, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.startsWith('_') && !entry.name.startsWith('[') && entry.name !== '404.tsx' && entry.name !== 'login.tsx' && entry.name !== 'register.tsx') {
            slugs.add(entry.name.replace('.tsx', ''));
        }
        // Подпапки (blog/ и т.д.)
        if (entry.isDirectory() && entry.name !== 'blog' && entry.name !== 'work' && entry.name !== 'category') {
            const subEntries = fs.readdirSync(path.join(PAGES_DIR, entry.name), { withFileTypes: true });
            for (const sub of subEntries) {
                if (sub.isFile() && sub.name.endsWith('.tsx') && !sub.name.startsWith('_') && !sub.name.startsWith('[')) {
                    slugs.add(`${entry.name}/${sub.name.replace('.tsx', '')}`);
                }
            }
        }
    }
    return slugs;
}

/**
 * Рекурсивно находит все .ts файлы в директории (кроме types.ts и registry.ts)
 */
function findAllTsFiles(dir, skipNames = new Set(['types.ts', 'registry.ts'])) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(findAllTsFiles(fullPath, skipNames));
        } else if (entry.isFile() && entry.name.endsWith('.ts') && !skipNames.has(entry.name)) {
            results.push(fullPath);
        }
    }
    return results;
}

/**
 * Находит domain-файлы (содержат slug, title, metaDescription и т.д.)
 * Исключает text-части (находятся в папке texts/)
 */
function findDomainFiles(dir) {
    const allFiles = findAllTsFiles(dir);
    return allFiles.filter(f => {
        const rel = path.relative(dir, f);
        // Пропускаем файлы в папке texts/ — это текстовые части
        if (rel.startsWith('texts') || rel.includes('\\texts\\') || rel.includes('/texts/')) {
            return false;
        }
        // Проверяем что файл содержит slug
        const content = fs.readFileSync(f, 'utf-8');
        return /slug\s*[:=]\s*["'`]/.test(content);
    });
}

/**
 * Находит text-файлы (содержат ArticleSection[] с content в template literals)
 */
function findTextFiles(dir) {
    const allFiles = findAllTsFiles(dir);
    return allFiles.filter(f => {
        const rel = path.relative(dir, f);
        return rel.startsWith('texts') || rel.includes('\\texts\\') || rel.includes('/texts/');
    });
}

/**
 * Извлекает строковое значение поля из .ts файла
 * Поддерживает: field: "value", field: `value`
 */
function extractString(content, fieldName) {
    // Однострочное значение в кавычках
    const singleQuote = new RegExp(`${fieldName}\\s*:\\s*"([^"]*)"`, 'm');
    const match1 = content.match(singleQuote);
    if (match1) return match1[1];

    // Обратные кавычки (template literal без интерполяции)
    const backtick = new RegExp(`${fieldName}\\s*:\\s*\`([^\`]*)\``, 'ms');
    const match2 = content.match(backtick);
    if (match2) return match2[1];

    // Template literal с интерполяцией (возвращаем как есть)
    const backtickInterp = new RegExp(`${fieldName}\\s*:\\s*\`([\\s\\S]*?)\``, 'm');
    const match3 = content.match(backtickInterp);
    if (match3) return match3[1];

    return null;
}

/**
 * Извлекает slug из domain-файла
 */
function extractSlug(content) {
    return extractString(content, 'slug');
}

/**
 * Извлекает title из domain-файла.
 * Ищет title ПОСЛЕ slug, чтобы не захватить section title из inline sections.
 */
function extractTitle(content) {
    // Сначала ищем позицию slug
    const slugPos = content.search(/slug\s*:\s*["'`]/);
    if (slugPos === -1) return extractString(content, 'title');
    
    // Ищем title после slug
    const afterSlug = content.substring(slugPos);
    const match = afterSlug.match(/title\s*:\s*"([^"]*)"/);
    if (match) return match[1];
    
    // Fallback
    return extractString(content, 'title');
}

/**
 * Извлекает metaDescription.
 * Ищет ПОСЛЕ slug, чтобы не захватить из inline sections.
 */
function extractMetaDescription(content) {
    const slugPos = content.search(/slug\s*:\s*["'`]/);
    if (slugPos === -1) return extractString(content, 'metaDescription');
    const afterSlug = content.substring(slugPos);
    const match = afterSlug.match(/metaDescription\s*:\s*"([^"]*)"/);
    if (match) return match[1];
    return extractString(content, 'metaDescription');
}

/**
 * Извлекает keywords
 */
function extractKeywords(content) {
    return extractString(content, 'keywords');
}

/**
 * Извлекает h1
 */
function extractH1(content) {
    return extractString(content, 'h1');
}

/**
 * Извлекает ogTitle
 */
function extractOgTitle(content) {
    return extractString(content, 'ogTitle');
}

/**
 * Извлекает ogDescription
 */
function extractOgDescription(content) {
    return extractString(content, 'ogDescription');
}

/**
 * Извлекает canonical
 */
function extractCanonical(content) {
    return extractString(content, 'canonical');
}

/**
 * Извлекает ctaTitle
 */
function extractCtaTitle(content) {
    return extractString(content, 'ctaTitle');
}

/**
 * Извлекает ctaSubtitle
 */
function extractCtaSubtitle(content) {
    return extractString(content, 'ctaSubtitle');
}

/**
 * Проверяет наличие faq (считает количество объектов)
 */
function extractFaqCount(content) {
    // Ищем блок faq: [...]
    const faqBlock = content.match(/faq\s*:\s*\[([\s\S]*?)\]/);
    if (!faqBlock) return 0;
    // Считаем количество объектов { question: ..., answer: ... }
    const questions = faqBlock[1].match(/question\s*:/g);
    return questions ? questions.length : 0;
}

/**
 * Проверяет наличие structuredData
 */
function hasStructuredData(content) {
    return /structuredData\s*:/.test(content);
}

/**
 * Проверяет наличие internalLinks и возвращает массив URL'ов
 */
function extractInternalLinks(content) {
    const linksBlock = content.match(/internalLinks\s*:\s*\[([\s\S]*?)\]/);
    if (!linksBlock) return [];
    // Извлекаем url из каждого объекта
    const urlMatches = linksBlock[1].match(/url\s*:\s*["'`](.*?)["'`]/g);
    if (!urlMatches) return [];
    return urlMatches.map(m => {
        const url = m.match(/url\s*:\s*["'`](.*?)["'`]/);
        return url ? url[1] : null;
    }).filter(Boolean);
}

/**
 * Извлекает все markdown-ссылки [text](/url) из текста
 */
function extractMarkdownLinks(text) {
    const links = [];
    const regex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        links.push({ text: match[1], url: match[2] });
    }
    return links;
}

/**
 * Проверяет наличие delegation triggers (> 🔧, > 💰, > 🚀)
 */
function hasDelegationTriggers(text) {
    return />\s*(🔧|💰|🚀)/.test(text);
}

/**
 * Проверяет наличие таблиц (markdown tables с |)
 */
function hasTables(text) {
    return /\|.*\|.*\|/.test(text);
}

/**
 * Считает количество таблиц в тексте
 */
function countTables(text) {
    // Ищем строки с | заголовок | ... | и следующую строку с |---|
    const tableHeaders = text.match(/\|[^\n]+\|\n\|[-:\s|]+\|/g);
    return tableHeaders ? tableHeaders.length : 0;
}

/**
 * Подсчитывает общее количество символов в template literals (content) из текстовых файлов
 */
function countTextContentChars(textFiles) {
    let total = 0;
    for (const filePath of textFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Извлекаем все template literals из content: `...`
        const templateLiterals = content.match(/content\s*:\s*`([\s\S]*?)`/g);
        if (templateLiterals) {
            for (const tl of templateLiterals) {
                const inner = tl.replace(/^content\s*:\s*`/, '').replace(/`$/, '');
                total += inner.length;
            }
        }
        // Также проверяем subsections content
        const subTemplateLiterals = content.match(/content\s*:\s*`([\s\S]*?)`/g);
        // Уже посчитали выше
    }
    return total;
}

/**
 * Подсчитывает количество символов контента для конкретной статьи
 * (по slug — ищет соответствующие text-файлы)
 */
function countArticleContentChars(slug, textDir) {
    if (!fs.existsSync(textDir)) return 0;
    const textFiles = fs.readdirSync(textDir)
        .filter(f => f.startsWith(slug + '-part') && f.endsWith('.ts'))
        .map(f => path.join(textDir, f));

    let total = 0;
    for (const filePath of textFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const templateLiterals = content.match(/content\s*:\s*`([\s\S]*?)`/g);
        if (templateLiterals) {
            for (const tl of templateLiterals) {
                const inner = tl.replace(/^content\s*:\s*`/, '').replace(/`$/, '');
                total += inner.length;
            }
        }
    }
    return total;
}

/**
 * Извлекает все внутренние ссылки из текстовых частей статьи
 */
function extractLinksFromTextFiles(slug, textDir) {
    if (!fs.existsSync(textDir)) return [];
    const textFiles = fs.readdirSync(textDir)
        .filter(f => f.startsWith(slug + '-part') && f.endsWith('.ts'))
        .map(f => path.join(textDir, f));

    const links = [];
    for (const filePath of textFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const templateLiterals = content.match(/content\s*:\s*`([\s\S]*?)`/g);
        if (templateLiterals) {
            for (const tl of templateLiterals) {
                const inner = tl.replace(/^content\s*:\s*`/, '').replace(/`$/, '');
                links.push(...extractMarkdownLinks(inner));
            }
        }
        // Также проверяем subsections
        const subMatches = content.match(/content\s*:\s*`([\s\S]*?)`/g);
        // Уже извлекли выше
    }
    return links;
}

/**
 * Извлекает все внутренние ссылки из domain-файла (из template literals полей)
 */
function extractLinksFromDomainFile(content) {
    const links = [];
    // Ищем все template literals и извлекаем markdown-ссылки
    const allTemplates = content.match(/`([\s\S]*?)`/g);
    if (allTemplates) {
        for (const tpl of allTemplates) {
            const inner = tpl.slice(1, -1);
            links.push(...extractMarkdownLinks(inner));
        }
    }
    // Также ищем в обычных строках
    const allStrings = content.match(/"([^"]*\[[^\]]*\]\([^)]+\)[^"]*)"/g);
    if (allStrings) {
        for (const s of allStrings) {
            const inner = s.slice(1, -1);
            links.push(...extractMarkdownLinks(inner));
        }
    }
    return links;
}

/**
 * Парсит domain-файл и возвращает объект с извлечёнными данными
 */
function parseDomainFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const slug = extractSlug(content);

    // Находим text-директорию (рядом с domain-файлом или в texts/)
    const dir = path.dirname(filePath);
    const textDir = path.join(dir, 'texts');

    return {
        filePath,
        slug,
        title: extractTitle(content),
        metaDescription: extractMetaDescription(content),
        keywords: extractKeywords(content),
        h1: extractH1(content),
        ogTitle: extractOgTitle(content),
        ogDescription: extractOgDescription(content),
        canonical: extractCanonical(content),
        ctaTitle: extractCtaTitle(content),
        ctaSubtitle: extractCtaSubtitle(content),
        faqCount: extractFaqCount(content),
        hasStructuredData: hasStructuredData(content),
        internalLinksUrls: extractInternalLinks(content),
        contentChars: slug ? countArticleContentChars(slug, textDir) : 0,
        textLinks: slug ? extractLinksFromTextFiles(slug, textDir) : [],
        domainLinks: extractLinksFromDomainFile(content),
        rawContent: content,
    };
}

/**
 * Нормализует URL в slug
 * /blog/some-article → some-article
 * /razrabotka-botov → razrabotka-botov
 */
function normalizeSlug(url) {
    // Убираем ведущий /
    let slug = url.replace(/^\//, '');
    // Убираем blog/ префикс
    slug = slug.replace(/^blog\//, '');
    return slug;
}

/**
 * Прогресс-бар
 */
function progressBar(value, max, width = 20) {
    const ratio = Math.min(value / max, 1);
    const filled = Math.round(ratio * width);
    const empty = width - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
}

module.exports = {
    C,
    ARTICLES_DIR,
    PAGES_DIR,
    getServicePageSlugs,
    findAllTsFiles,
    findDomainFiles,
    findTextFiles,
    extractString,
    extractSlug,
    extractTitle,
    extractMetaDescription,
    extractKeywords,
    extractH1,
    extractOgTitle,
    extractOgDescription,
    extractCanonical,
    extractCtaTitle,
    extractCtaSubtitle,
    extractFaqCount,
    hasStructuredData,
    extractInternalLinks,
    extractMarkdownLinks,
    hasDelegationTriggers,
    hasTables,
    countTables,
    countTextContentChars,
    countArticleContentChars,
    extractLinksFromTextFiles,
    extractLinksFromDomainFile,
    parseDomainFile,
    normalizeSlug,
    progressBar,
};
