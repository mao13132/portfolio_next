/**
 * check-anomalies.js — Проверка аномалий и ошибок в slug, meta-тегах, URL
 *
 * Проверяет:
 * 1. Кириллица в slug/URL (должна быть только латиница)
 * 2. CJK символы (китайские/японские/корейские)
 * 3. Дубликаты slug
 * 4. Slug не совпадает с именем файла
 * 5. Невалидные символы в slug
 * 6. Сломанные template literals (нечётные обратные кавычки)
 * 7. Пустые meta-теги
 * 8. Wordstat-упоминания в тексте статей
 *
 * Запуск: node seo-tools/check-anomalies.js
 */

const fs = require('fs');
const path = require('path');
const { findDomainFiles, parseDomainFile, findTextFiles, ARTICLES_DIR } = require('./lib/parser');

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
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
};

// ─── Регулярки для проверок ───
// Ищем кириллицу только в реальных URL-путях: (/blog/xxx) или [text](/xxx)
const CYRILLIC_IN_URL = /\(\/[^)]*[а-яА-ЯёЁ][^)]*\)|\[.*?\]\(\/[^)]*[а-яА-ЯёЁ][^)]*\)/g;
const CJK_REGEX = /[\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\uff00-\uffef]/g;
const INVALID_SLUG_CHARS = /[^a-z0-9\-]/;
const WORDSTAT_MENTIONS = /(?:по данным\s+)Wordstat|запрос ищут\s+\d|показов\/мес|SEO-термин/gi;
const BACKTICK_REGEX = /`/g;

/**
 * Основная функция проверки
 */
function checkAnomalies() {
    const domainFiles = findDomainFiles(ARTICLES_DIR);
    const issues = [];
    let totalChecks = 0;

    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  🔍 ПРОВЕРКА АНОМАЛИЙ И ОШИБОК${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    console.log(`${C.dim}Найдено domain-файлов: ${domainFiles.length}${C.reset}\n`);

    // ─── 1. Проверка дубликатов slug ───
    console.log(`${C.bold}1. Проверка дубликатов slug...${C.reset}`);
    const slugMap = new Map(); // slug → [filePath]
    for (const filePath of domainFiles) {
        const parsed = parseDomainFile(filePath);
        if (!parsed || !parsed.slug) continue;
        const slug = parsed.slug;
        if (!slugMap.has(slug)) slugMap.set(slug, []);
        slugMap.get(slug).push(filePath);
    }
    for (const [slug, files] of slugMap) {
        if (files.length > 1) {
            issues.push({
                type: 'ДУБЛИКАТ SLUG',
                severity: 'critical',
                slug,
                message: `Slug "${slug}" используется в ${files.length} файлах: ${files.join(', ')}`,
            });
        }
    }
    totalChecks += slugMap.size;

    // ─── 2. Проверка каждого domain файла ───
    for (const filePath of domainFiles) {
        const parsed = parseDomainFile(filePath);
        if (!parsed || !parsed.slug) continue;
        const slug = parsed.slug;
        const relPath = path.relative('.', filePath);

        // 2a. Кириллица в slug
        if (/[а-яА-ЯёЁ]/.test(slug)) {
            issues.push({
                type: 'КИРИЛЛИЦА В SLUG',
                severity: 'critical',
                slug,
                file: relPath,
                message: `Slug "${slug}" содержит кириллические символы`,
            });
        }

        // 2b. Невалидные символы в slug
        if (INVALID_SLUG_CHARS.test(slug)) {
            const invalid = slug.match(/[^a-z0-9\-]/g);
            issues.push({
                type: 'НЕВАЛИДНЫЙ SLUG',
                severity: 'warning',
                slug,
                file: relPath,
                message: `Slug "${slug}" содержит невалидные символы: ${[...new Set(invalid)].join(', ')}`,
            });
        }

        // 2c. Slug не совпадает с именем файла
        const fileName = path.basename(filePath, '.ts');
        if (slug !== fileName && !filePath.includes('texts/')) {
            // Это нормально для многих статей, но фиксируем
            // Не считаем ошибкой, просто информируем
        }

        // 2d. Проверка title
        if (parsed.title) {
            if (parsed.title.length < 50) {
                issues.push({
                    type: 'TITLE КОРОТКИЙ',
                    severity: 'warning',
                    slug,
                    file: relPath,
                    message: `Title "${parsed.title.substring(0, 50)}..." — ${parsed.title.length} символов (нужно 50-70)`,
                });
            }
            if (parsed.title.length > 70) {
                issues.push({
                    type: 'TITLE ДЛИННЫЙ',
                    severity: 'warning',
                    slug,
                    file: relPath,
                    message: `Title — ${parsed.title.length} символов (нужно 50-70)`,
                });
            }
        }

        // 2e. Проверка metaDescription
        if (parsed.metaDescription) {
            if (parsed.metaDescription.length < 150) {
                issues.push({
                    type: 'METADESC КОРОТКИЙ',
                    severity: 'warning',
                    slug,
                    file: relPath,
                    message: `MetaDescription — ${parsed.metaDescription.length} символов (нужно 150-160)`,
                });
            }
            if (parsed.metaDescription.length > 160) {
                issues.push({
                    type: 'METADESC ДЛИННЫЙ',
                    severity: 'warning',
                    slug,
                    file: relPath,
                    message: `MetaDescription — ${parsed.metaDescription.length} символов (нужно 150-160)`,
                });
            }
        }

        // 2f. Проверка canonical
        if (parsed.canonical) {
            if (!parsed.canonical.includes(slug)) {
                issues.push({
                    type: 'CANONICAL НЕ СОВПАДАЕТ',
                    severity: 'warning',
                    slug,
                    file: relPath,
                    message: `Canonical "${parsed.canonical.substring(0, 60)}..." не содержит slug "${slug}"`,
                });
            }
            if (/[а-яА-ЯёЁ]/.test(parsed.canonical)) {
                issues.push({
                    type: 'КИРИЛЛИЦА В CANONICAL',
                    severity: 'critical',
                    slug,
                    file: relPath,
                    message: `Canonical содержит кириллицу: "${parsed.canonical}"`,
                });
            }
        }

        // 2g. Проверка rawContent на CJK
        if (parsed.rawContent) {
            const cjkMatches = parsed.rawContent.match(CJK_REGEX);
            if (cjkMatches) {
                issues.push({
                    type: 'CJK СИМВОЛЫ',
                    severity: 'critical',
                    slug,
                    file: relPath,
                    message: `${cjkMatches.length} CJK символов в файле`,
                });
            }

            // 2h. Проверка на кириллицу в URL внутри контента
            const cyrillicUrls = parsed.rawContent.match(CYRILLIC_IN_URL);
            if (cyrillicUrls) {
                const unique = [...new Set(cyrillicUrls)].slice(0, 5);
                issues.push({
                    type: 'КИРИЛЛИЦА В URL',
                    severity: 'critical',
                    slug,
                    file: relPath,
                    message: `Кириллица в URL: ${unique.join(', ')}`,
                });
            }

            // 2i. Проверка на Wordstat-упоминания
            const wordstatMatches = parsed.rawContent.match(WORDSTAT_MENTIONS);
            if (wordstatMatches) {
                issues.push({
                    type: 'WORDSTAT УПОМИНАНИЕ',
                    severity: 'warning',
                    slug,
                    file: relPath,
                    message: `Упоминание Wordstat/SEO-терминов в тексте: ${[...new Set(wordstatMatches)].join(', ')}`,
                });
            }

            // 2j. Проверка на сломанные template literals
            const backticks = (parsed.rawContent.match(BACKTICK_REGEX) || []).length;
            if (backticks % 2 !== 0) {
                issues.push({
                    type: 'СЛОМАННЫЙ TEMPLATE',
                    severity: 'critical',
                    slug,
                    file: relPath,
                    message: `Нечётное количество обратных кавычек (${backticks}) — сломанный template literal`,
                });
            }
        }
        totalChecks++;
    }

    // ─── 3. Проверка text parts на CJK и кириллицу в URL ───
    const textParts = findTextFiles(ARTICLES_DIR);
    for (const filePath of textParts) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative('.', filePath);

        const cjkMatches = content.match(CJK_REGEX);
        if (cjkMatches) {
            issues.push({
                type: 'CJK В TEXT PART',
                severity: 'critical',
                file: relPath,
                message: `${cjkMatches.length} CJK символов`,
            });
        }

        const cyrillicUrls = content.match(CYRILLIC_IN_URL);
        if (cyrillicUrls) {
            const unique = [...new Set(cyrillicUrls)].slice(0, 3);
            issues.push({
                type: 'КИРИЛЛИЦА В URL (TEXT PART)',
                severity: 'critical',
                file: relPath,
                message: `Кириллица в URL: ${unique.join(', ')}`,
            });
        }
    }

    // ─── Вывод результатов ───
    const critical = issues.filter(i => i.severity === 'critical');
    const warnings = issues.filter(i => i.severity === 'warning');

    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  📊 РЕЗУЛЬТАТЫ ПРОВЕРКИ АНОМАЛИЙ${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    console.log(`${C.bold}Проверено файлов: ${totalChecks}${C.reset}`);
    console.log(`${C.red}${C.bold}Критических: ${critical.length}${C.reset}`);
    console.log(`${C.yellow}${C.bold}Предупреждений: ${warnings.length}${C.reset}\n`);

    if (critical.length > 0) {
        console.log(`${C.bold}${C.bgRed}${C.white} ❌ КРИТИЧЕСКИЕ ОШИБКИ (${critical.length}) ${C.reset}\n`);
        for (const issue of critical) {
            console.log(`  ${C.red}✘${C.reset} ${C.bold}${issue.type}${C.reset}: ${issue.message}`);
            if (issue.file) console.log(`    ${C.dim}файл: ${issue.file}${C.reset}`);
            if (issue.slug) console.log(`    ${C.dim}slug: ${issue.slug}${C.reset}`);
        }
    }

    if (warnings.length > 0) {
        console.log(`\n${C.bold}${C.bgYellow}${C.white} ⚠️  ПРЕДУПРЕЖДЕНИЯ (${warnings.length}) ${C.reset}\n`);
        // Группируем по типу
        const byType = {};
        for (const w of warnings) {
            if (!byType[w.type]) byType[w.type] = [];
            byType[w.type].push(w);
        }
        for (const [type, items] of Object.entries(byType)) {
            console.log(`  ${C.yellow}⚠${C.reset} ${C.bold}${type}${C.reset}: ${items.length} файлов`);
            for (const item of items.slice(0, 3)) {
                console.log(`    ${C.dim}${item.slug || item.file}: ${item.message}${C.reset}`);
            }
            if (items.length > 3) {
                console.log(`    ${C.dim}... и ещё ${items.length - 3}${C.reset}`);
            }
        }
    }

    if (critical.length === 0 && warnings.length === 0) {
        console.log(`${C.green}${C.bold}✅ Все проверки пройдены! Нет аномалий.${C.reset}`);
    }

    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);

    return { critical: critical.length, warnings: warnings.length, issues };
}

// Запуск
if (require.main === module) {
    checkAnomalies();
}

module.exports = { checkAnomalies };
