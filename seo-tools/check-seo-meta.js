/**
 * seo-tools/check-seo-meta.js
 * Аудит мета-тегов: Title, MetaDescription, Canonical, H1, Keywords, OG
 *
 * Запуск: node seo-tools/check-seo-meta.js
 */

const fs = require('fs');
const path = require('path');
const {
    C, ARTICLES_DIR,
    findDomainFiles,
    parseDomainFile,
} = require('./lib/parser');

// ═══════════════════════════════════════════
//  ПРОВЕРКИ МЕТА-ТЕГОВ
// ═══════════════════════════════════════════

/**
 * Проверяет мета-теги одной статьи
 * @param {object} parsed — результат parseDomainFile()
 * @returns {{ errors: string[], warnings: string[] }}
 */
function checkMetaTags(parsed) {
    const errors = [];
    const warnings = [];

    // ─── Title ───
    if (!parsed.title) {
        errors.push('Title отсутствует');
    } else {
        const len = parsed.title.length;
        if (len < 50) {
            errors.push(`Title слишком короткий (${len} символов, нужно 50-70)`);
        } else if (len > 70) {
            errors.push(`Title слишком длинный (${len} символов, нужно 50-70)`);
        }
    }

    // ─── MetaDescription ───
    if (!parsed.metaDescription) {
        errors.push('MetaDescription отсутствует');
    } else {
        const len = parsed.metaDescription.length;
        if (len < 150) {
            errors.push(`MetaDescription слишком короткий (${len} символов, нужно 150-160)`);
        } else if (len > 160) {
            errors.push(`MetaDescription слишком длинный (${len} символов, нужно 150-160)`);
        }
    }

    // ─── Canonical ───
    if (!parsed.canonical) {
        errors.push('Canonical отсутствует');
    } else {
        // Проверяем формат URL
        // Canonical может быть вида: `${SITE_URL}/blog/slug` или `https://dima-razrab.com/blog/slug`
        const canonical = parsed.canonical;
        const isTemplateWithSiteUrl = canonical.includes('${SITE_URL}') || canonical.includes('${siteUrl}');
        const startsWithHttps = canonical.startsWith('https://') || isTemplateWithSiteUrl;

        if (!startsWithHttps) {
            errors.push(`Canonical не начинается с https://: "${canonical.substring(0, 50)}..."`);
        }
        if (!canonical.includes('dima-razrab.com') && !isTemplateWithSiteUrl) {
            warnings.push(`Canonical не содержит dima-razrab.com: "${canonical.substring(0, 50)}..."`);
        }
        // Проверяем что canonical соответствует slug
        if (parsed.slug && !canonical.includes(parsed.slug)) {
            warnings.push(`Canonical не содержит slug "${parsed.slug}": "${canonical.substring(0, 60)}..."`);
        }
    }

    // ─── H1 ───
    if (!parsed.h1 || parsed.h1.trim().length === 0) {
        errors.push('H1 пустой');
    } else {
        const h1Len = parsed.h1.length;
        if (h1Len < 20) {
            warnings.push(`H1 слишком короткий (${h1Len} символов)`);
        } else if (h1Len > 100) {
            warnings.push(`H1 слишком длинный (${h1Len} символов)`);
        }
    }

    // ─── Keywords ───
    if (!parsed.keywords || parsed.keywords.trim().length === 0) {
        warnings.push('Keywords пустые');
    } else {
        const kwCount = parsed.keywords.split(',').length;
        if (kwCount < 3) {
            warnings.push(`Слишком мало keywords (${kwCount}, рекомендуется 5-10)`);
        }
    }

    // ─── ogTitle ───
    if (!parsed.ogTitle || parsed.ogTitle.trim().length === 0) {
        warnings.push('ogTitle пустой');
    }

    // ─── ogDescription ───
    if (!parsed.ogDescription || parsed.ogDescription.trim().length === 0) {
        warnings.push('ogDescription пустой');
    } else if (parsed.metaDescription && parsed.ogDescription === parsed.metaDescription) {
        warnings.push('ogDescription совпадает с MetaDescription (рекомендуется уникальный)');
    }

    return { errors, warnings };
}

// ═══════════════════════════════════════════
//  ГЛАВНАЯ ФУНКЦИЯ
// ═══════════════════════════════════════════

function runCheckSeoMeta() {
    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  🔍 АУДИТ МЕТА-ТЕГОВ${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    const domainFiles = findDomainFiles(ARTICLES_DIR);
    console.log(`${C.dim}Найдено domain-файлов: ${domainFiles.length}${C.reset}\n`);

    const allErrors = [];
    const allWarnings = [];
    const okArticles = [];
    const results = [];

    for (const filePath of domainFiles) {
        const parsed = parseDomainFile(filePath);
        if (!parsed.slug) continue;

        const { errors, warnings } = checkMetaTags(parsed);
        results.push({
            slug: parsed.slug,
            errors,
            warnings,
        });

        if (errors.length === 0 && warnings.length === 0) {
            okArticles.push(parsed.slug);
        }
        for (const err of errors) {
            allErrors.push(`/${parsed.slug}: ${err}`);
        }
        for (const warn of warnings) {
            allWarnings.push(`/${parsed.slug}: ${warn}`);
        }
    }

    // ─── Ошибки ───
    if (allErrors.length > 0) {
        console.log(`${C.bold}${C.red}❌ ОШИБКИ (${allErrors.length}):${C.reset}`);
        for (const err of allErrors) {
            console.log(`  ${C.red}✘ ${err}${C.reset}`);
        }
    } else {
        console.log(`${C.green}✅ Ошибок нет!${C.reset}`);
    }
    console.log();

    // ─── Предупреждения ───
    if (allWarnings.length > 0) {
        console.log(`${C.bold}${C.yellow}⚠️  ПРЕДУПРЕЖДЕНИЯ (${allWarnings.length}):${C.reset}`);
        for (const warn of allWarnings) {
            console.log(`  ${C.yellow}⚠ ${warn}${C.reset}`);
        }
    } else {
        console.log(`${C.green}✅ Предупреждений нет!${C.reset}`);
    }
    console.log();

    // ─── Итог ───
    console.log(`${C.bold}${C.green}✅ ВСЁ ОК: ${okArticles.length} из ${results.length} статей${C.reset}`);
    console.log();

    // ─── Возвращаем данные для dashboard ───
    return {
        totalArticles: results.length,
        okCount: okArticles.length,
        errorCount: allErrors.length,
        warningCount: allWarnings.length,
        errors: allErrors,
        warnings: allWarnings,
        results,
    };
}

// Запуск если вызван напрямую
if (require.main === module) {
    runCheckSeoMeta();
}

module.exports = { runCheckSeoMeta, checkMetaTags };
