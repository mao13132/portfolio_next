/**
 * seo-tools/check-content-quality.js
 * Аудит качества контента: проверяет 28 критериев из ARTICLE-CHECKLIST.md
 * Сканирует domain-файлы и text-файлы в data/articles_data/
 *
 * Запуск: node seo-tools/check-content-quality.js
 */

const fs = require('fs');
const path = require('path');
const {
    C, ARTICLES_DIR,
    findDomainFiles, findTextFiles,
    parseDomainFile,
    hasDelegationTriggers, hasTables, countTables,
    normalizeSlug,
} = require('./lib/parser');

// ═══════════════════════════════════════════
//  КРИТЕРИИ ПРОВЕРКИ (28 из ARTICLE-CHECKLIST.md)
// ═══════════════════════════════════════════

/**
 * Проверяет все критерии для одной статьи
 * @param {object} parsed — результат parseDomainFile()
 * @returns {{ score: number, maxScore: number, issues: string[] }}
 */
function checkArticleQuality(parsed) {
    const issues = [];
    let score = 0;
    const maxScore = 10; // Проверяем ключевые критерию из 28 (автоматизируемые)

    // 1. ctaTitle содержит цифры?
    if (parsed.ctaTitle && /\d/.test(parsed.ctaTitle)) {
        score++;
    } else {
        issues.push('ctaTitle без цифр (критерий 28)');
    }

    // 2. ctaSubtitle содержит конкретные цены/сроки?
    if (parsed.ctaSubtitle && /\d/.test(parsed.ctaSubtitle)) {
        score++;
    } else {
        issues.push('ctaSubtitle без конкретных цифр (критерий 28)');
    }

    // 3. Delegation triggers в text parts
    const textDir = path.join(path.dirname(parsed.filePath), 'texts');
    let hasDelegation = false;
    let textContent = '';
    if (fs.existsSync(textDir) && parsed.slug) {
        const textFiles = fs.readdirSync(textDir)
            .filter(f => f.startsWith(parsed.slug + '-part') && f.endsWith('.ts'));
        for (const tf of textFiles) {
            const tc = fs.readFileSync(path.join(textDir, tf), 'utf-8');
            textContent += tc;
            if (hasDelegationTriggers(tc)) {
                hasDelegation = true;
            }
        }
    }
    // Также проверяем domain-файл
    if (hasDelegationTriggers(parsed.rawContent)) {
        hasDelegation = true;
    }
    if (hasDelegation) {
        score++;
    } else {
        issues.push('Нет delegation triggers (🔧/💰/🚀) (критерий 27)');
    }

    // 4. Таблицы в text parts
    const allContent = textContent + parsed.rawContent;
    const tableCount = countTables(allContent);
    if (tableCount >= 1) {
        score++;
    } else {
        issues.push('Нет таблиц (критерий 10)');
    }

    // 5. Объём текста > 8000 символов
    if (parsed.contentChars >= 8000) {
        score++;
    } else {
        issues.push(`Объём < 8000 символов (${parsed.contentChars.toLocaleString('ru-RU')}) (критерий 2/4)`);
    }

    // 6. Есть FAQ?
    if (parsed.faqCount >= 4) {
        score++;
    } else if (parsed.faqCount > 0) {
        issues.push(`FAQ: только ${parsed.faqCount} вопросов (нужно 4-6) (критерий 14)`);
    } else {
        issues.push('Нет FAQ (критерий 14)');
    }

    // 7. Есть internalLinks?
    if (parsed.internalLinksUrls.length >= 3) {
        score++;
    } else if (parsed.internalLinksUrls.length > 0) {
        issues.push(`Мало internalLinks: ${parsed.internalLinksUrls.length} (нужно 3-5) (критерий 16)`);
    } else {
        issues.push('Нет internalLinks (критерий 16)');
    }

    // 8. Есть structuredData?
    if (parsed.hasStructuredData) {
        score++;
    } else {
        issues.push('Нет structuredData (критерий Schema.org)');
    }

    // 9. Title 50-70 символов?
    if (parsed.title) {
        const titleLen = parsed.title.length;
        if (titleLen >= 50 && titleLen <= 70) {
            score++;
        } else {
            issues.push(`Title ${titleLen} символов (нужно 50-70) (критерий 12)`);
        }
    } else {
        issues.push('Нет Title (критерий 12)');
    }

    // 10. MetaDescription 150-160 символов?
    if (parsed.metaDescription) {
        const metaLen = parsed.metaDescription.length;
        if (metaLen >= 150 && metaLen <= 160) {
            score++;
        } else {
            issues.push(`MetaDescription ${metaLen} символов (нужно 150-160) (критерий SEO)`);
        }
    } else {
        issues.push('Нет MetaDescription (критерий SEO)');
    }

    // Бонусные проверки (не в score, но в issues)

    // 11. Keywords заполнены?
    if (!parsed.keywords || parsed.keywords.trim().length === 0) {
        issues.push('Keywords пустые');
    }

    // 12. H1 заполнен?
    if (!parsed.h1 || parsed.h1.trim().length === 0) {
        issues.push('H1 пустой');
    }

    // 13. ogTitle заполнен?
    if (!parsed.ogTitle || parsed.ogTitle.trim().length === 0) {
        issues.push('ogTitle пустой');
    }

    // 14. ogDescription заполнен?
    if (!parsed.ogDescription || parsed.ogDescription.trim().length === 0) {
        issues.push('ogDescription пустой');
    }

    // 15. Нет упоминаний Wordstat (критерий 17.1)
    const wordstatPatterns = /по данным Wordstat|запрос ищут|частотность|показов\/мес/i;
    if (wordstatPatterns.test(allContent)) {
        issues.push('Есть упоминания Wordstat в тексте (критерий 17.1)');
    }

    // 16. Количество таблиц >= 5 (критерий 10 — рекомендация)
    if (tableCount > 0 && tableCount < 5) {
        issues.push(`Только ${tableCount} таблиц (рекомендуется ≥ 5) (критерий 10)`);
    }

    return { score, maxScore, issues, tableCount };
}

// ═══════════════════════════════════════════
//  ГЛАВНАЯ ФУНКЦИЯ
// ═══════════════════════════════════════════

function runCheckContentQuality() {
    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  📊 АУДИТ КАЧЕСТВА КОНТЕНТА${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    const domainFiles = findDomainFiles(ARTICLES_DIR);
    console.log(`${C.dim}Найдено domain-файлов: ${domainFiles.length}${C.reset}\n`);

    const results = [];
    const issueStats = {};

    for (const filePath of domainFiles) {
        const parsed = parseDomainFile(filePath);
        if (!parsed.slug) continue;

        const { score, maxScore, issues, tableCount } = checkArticleQuality(parsed);
        results.push({
            slug: parsed.slug,
            filePath,
            score,
            maxScore,
            issues,
            tableCount,
            contentChars: parsed.contentChars,
        });

        // Собираем статистику проблем (нормализуем для группировки)
        for (const issue of issues) {
            let issueKey = issue
                .replace(/\s*\(.*?\)/g, '')    // убираем (критерий X)
                .replace(/\d[\d\s,]*$/, '')     // убираем числа в конце
                .replace(/\(\d[\d\s,]*\)/g, '') // убираем (5 234)
                .trim();
            // Группируем MetaDescription и Title по типу ошибки
            issueKey = issueKey.replace(/\d+\s*символов/, 'N символов');
            if (issueKey) {
                issueStats[issueKey] = (issueStats[issueKey] || 0) + 1;
            }
        }
    }

    // ─── Сортируем по score ───
    results.sort((a, b) => a.score - b.score);

    const perfect = results.filter(r => r.score === r.maxScore);
    const withIssues = results.filter(r => r.score < r.maxScore);

    console.log(`${C.bold}Всего статей: ${C.white}${results.length}${C.reset}`);
    console.log(`${C.green}✅ ИДЕАЛЬНЫЕ (${results[0]?.maxScore || 10}/${results[0]?.maxScore || 10}): ${perfect.length} статей${C.reset}`);
    console.log(`${C.yellow}⚠️  ЕСТЬ ПРОБЛЕМЫ: ${withIssues.length} статей${C.reset}`);
    console.log();

    // ─── Топ-10 проблемных статей ───
    console.log(`${C.bold}${C.red}❌ ТОП-10 ПРОБЛЕМНЫХ СТАТЕЙ:${C.reset}`);
    const top10Problems = withIssues.slice(0, 10);
    top10Problems.forEach((r, idx) => {
        const color = r.score <= 3 ? C.red : r.score <= 6 ? C.yellow : C.dim;
        console.log(`  ${C.bold}${idx + 1}.${C.reset} /${C.white}${r.slug}${C.reset} — ${color}${r.score}/${r.maxScore} ✗${C.reset}`);
        for (const issue of r.issues.slice(0, 5)) {
            console.log(`     ${C.yellow}• ${issue}${C.reset}`);
        }
        if (r.issues.length > 5) {
            console.log(`     ${C.dim}... и ещё ${r.issues.length - 5} проблем${C.reset}`);
        }
    });
    console.log();

    // ─── Статистика проблем ───
    console.log(`${C.bold}${C.magenta}📊 СТАТИСТИКА ПРОБЛЕМ:${C.reset}`);
    const sortedIssues = Object.entries(issueStats).sort((a, b) => b[1] - a[1]);
    for (const [issue, count] of sortedIssues) {
        const bar = '●'.repeat(Math.min(Math.ceil(count / 2), 30));
        console.log(`  ${C.yellow}• ${issue}: ${C.white}${count} статей${C.reset} ${C.dim}${bar}${C.reset}`);
    }
    console.log();

    // ─── Возвращаем данные для dashboard ───
    return {
        totalArticles: results.length,
        perfectCount: perfect.length,
        withIssuesCount: withIssues.length,
        results,
        issueStats,
    };
}

// Запуск если вызван напрямую
if (require.main === module) {
    runCheckContentQuality();
}

module.exports = { runCheckContentQuality, checkArticleQuality };
