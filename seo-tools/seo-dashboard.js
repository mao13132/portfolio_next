/**
 * seo-tools/seo-dashboard.js
 * Общий SEO-дашборд: запускает все проверки и выводит сводный отчёт
 *
 * Запуск: node seo-tools/seo-dashboard.js
 */

const {
    C,
    progressBar,
} = require('./lib/parser');

const { runCheckInternalLinks } = require('./check-internal-links');
const { runCheckContentQuality } = require('./check-content-quality');
const { runCheckSeoMeta } = require('./check-seo-meta');

// ═══════════════════════════════════════════
//  РАСЧЁТ БАЛЛОВ
// ═══════════════════════════════════════════

/**
 * Рассчитывает балл перелинковки (0-100)
 */
function calcLinkingScore(linkData) {
    if (!linkData || linkData.totalArticles === 0) return 0;

    let score = 0;

    // 40 баллов — отсутствие сирот
    const orphanRatio = linkData.orphanCount / linkData.totalArticles;
    score += Math.round(40 * (1 - orphanRatio));

    // 30 баллов — отсутствие тупиков
    const deadEndRatio = linkData.deadEndCount / linkData.totalArticles;
    score += Math.round(30 * (1 - deadEndRatio));

    // 20 баллов — среднее количество ссылок на статью
    const avgLinks = linkData.totalLinks / linkData.totalArticles;
    score += Math.round(Math.min(avgLinks / 5, 1) * 20);

    // 10 баллов — отсутствие ссылок на неизвестные slug'и
    if (linkData.unknownTargetCount === 0) {
        score += 10;
    } else {
        score += Math.max(0, 10 - linkData.unknownTargetCount);
    }

    return Math.min(100, Math.max(0, score));
}

/**
 * Рассчитывает балл качества контента (0-100)
 */
function calcContentScore(contentData) {
    if (!contentData || contentData.totalArticles === 0) return 0;

    // Средний score по статьям (из maxScore)
    const maxScore = contentData.results[0]?.maxScore || 10;
    const totalPossible = contentData.totalArticles * maxScore;
    const totalActual = contentData.results.reduce((sum, r) => sum + r.score, 0);

    return Math.round((totalActual / totalPossible) * 100);
}

/**
 * Рассчитывает балл мета-тегов (0-100)
 */
function calcMetaScore(metaData) {
    if (!metaData || metaData.totalArticles === 0) return 0;

    // За каждую ошибку -3 балла, за каждое предупреждение -1 балл
    let score = 100;
    score -= metaData.errorCount * 3;
    score -= metaData.warningCount * 1;

    return Math.min(100, Math.max(0, score));
}

/**
 * Рассчитывает балл sitemap (заглушка — нужен онлайн-чек)
 */
function calcSitemapScore() {
    // Sitemap проверяется отдельным скриптом check-sitemap.js (онлайн)
    // Здесь возвращаем заглушку
    return null;
}

// ═══════════════════════════════════════════
//  ТОП-5 ПРИОРИТЕТНЫХ ИСПРАВЛЕНИЙ
// ═══════════════════════════════════════════

function collectPriorityFixes(linkData, contentData, metaData) {
    const fixes = [];

    // Из contentData
    if (contentData && contentData.issueStats) {
        const sortedIssues = Object.entries(contentData.issueStats)
            .sort((a, b) => b[1] - a[1]);
        for (const [issue, count] of sortedIssues.slice(0, 3)) {
            fixes.push({ text: `${issue} (${count} статей)`, priority: count });
        }
    }

    // Из linkData
    if (linkData) {
        if (linkData.orphanCount > 0) {
            fixes.push({
                text: `Добавить входящие ссылки на ${linkData.orphanCount} сирот`,
                priority: linkData.orphanCount * 2,
            });
        }
        if (linkData.deadEndCount > 0) {
            fixes.push({
                text: `Добавить исходящие ссылки в ${linkData.deadEndCount} тупиков`,
                priority: linkData.deadEndCount,
            });
        }
    }

    // Из metaData
    if (metaData) {
        if (metaData.errorCount > 0) {
            fixes.push({
                text: `Исправить ${metaData.errorCount} ошибок мета-тегов`,
                priority: metaData.errorCount * 2,
            });
        }
    }

    // Сортируем по приоритету
    fixes.sort((a, b) => b.priority - a.priority);
    return fixes.slice(0, 5);
}

// ═══════════════════════════════════════════
//  ОТРИСОВКА ДАШБОРДА
// ═══════════════════════════════════════════

function printDashboard(linkData, contentData, metaData, sitemapScore) {
    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  🏆 SEO DASHBOARD — dima-razrab.com${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    const linkingScore = calcLinkingScore(linkData);
    const contentScore = calcContentScore(contentData);
    const metaScore = calcMetaScore(metaData);

    // Средний балл (только по доступным метрикам)
    const scores = [linkingScore, contentScore, metaScore];
    if (sitemapScore !== null) scores.push(sitemapScore);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    // ─── Общий балл ───
    const scoreColor = avgScore >= 80 ? C.green : avgScore >= 60 ? C.yellow : C.red;
    console.log(`${C.bold}📊 ОБЩИЙ БАЛЛ: ${scoreColor}${avgScore}/100${C.reset}\n`);

    // ─── Детализация ───
    const barWidth = 10;

    const linkingBar = progressBar(linkingScore, 100, barWidth);
    const linkingColor = linkingScore >= 80 ? C.green : linkingScore >= 60 ? C.yellow : C.red;
    console.log(`  Перелинковка:      ${linkingColor}${linkingBar}${C.reset} ${linkingScore}%`);

    const contentBar = progressBar(contentScore, 100, barWidth);
    const contentColor = contentScore >= 80 ? C.green : contentScore >= 60 ? C.yellow : C.red;
    console.log(`  Качество контента: ${contentColor}${contentBar}${C.reset} ${contentScore}%`);

    const metaBar = progressBar(metaScore, 100, barWidth);
    const metaColor = metaScore >= 80 ? C.green : metaScore >= 60 ? C.yellow : C.red;
    console.log(`  Мета-теги:         ${metaColor}${metaBar}${C.reset} ${metaScore}%`);

    if (sitemapScore !== null) {
        const sitemapBar = progressBar(sitemapScore, 100, barWidth);
        const sitemapColor = sitemapScore >= 80 ? C.green : sitemapScore >= 60 ? C.yellow : C.red;
        console.log(`  Sitemap:           ${sitemapColor}${sitemapBar}${C.reset} ${sitemapScore}%`);
    } else {
        console.log(`  Sitemap:           ${C.dim}N/A (запустите node check-sitemap.js)${C.reset}`);
    }

    console.log();

    // ─── Топ-5 приоритетных исправлений ───
    const fixes = collectPriorityFixes(linkData, contentData, metaData);
    if (fixes.length > 0) {
        console.log(`${C.bold}${C.magenta}🎯 ТОП-5 ПРИОРИТЕТНЫХ ИСПРАВЛЕНИЙ:${C.reset}`);
        fixes.forEach((fix, idx) => {
            console.log(`  ${C.bold}${idx + 1}.${C.reset} ${C.white}${fix.text}${C.reset}`);
        });
    } else {
        console.log(`${C.green}✅ Всё в порядке!${C.reset}`);
    }

    console.log(`\n${C.dim}───────────────────────────────────────────${C.reset}`);
    console.log(`${C.dim}Для детального анализа запустите:${C.reset}`);
    console.log(`${C.dim}  node seo-tools/check-content-quality.js${C.reset}`);
    console.log(`${C.dim}  node seo-tools/check-internal-links.js${C.reset}`);
    console.log(`${C.dim}  node seo-tools/check-seo-meta.js${C.reset}`);
    console.log(`${C.dim}  node check-sitemap.js${C.reset}`);
    console.log();
}

// ═══════════════════════════════════════════
//  ГЛАВНАЯ ФУНКЦИЯ
// ═══════════════════════════════════════════

function main() {
    console.log(`${C.bold}${C.cyan}🚀 Запуск SEO Dashboard...${C.reset}\n`);

    // 1. Перелинковка
    let linkData;
    try {
        // Перехватываем stdout чтобы не дублировать вывод
        const originalLog = console.log;
        const capturedOutput = [];
        console.log = (...args) => capturedOutput.push(args.join(' '));
        linkData = runCheckInternalLinks();
        console.log = originalLog;
        // Показываем краткую сводку
        console.log(`${C.green}✅ Перелинковка: ${linkData.totalArticles} статей, ${linkData.totalLinks} ссылок${C.reset}`);
    } catch (err) {
        console.log(`${C.red}❌ Ошибка проверки перелинковки: ${err.message}${C.reset}`);
    }

    // 2. Качество контента
    let contentData;
    try {
        const originalLog = console.log;
        const capturedOutput = [];
        console.log = (...args) => capturedOutput.push(args.join(' '));
        contentData = runCheckContentQuality();
        console.log = originalLog;
        console.log(`${C.green}✅ Качество контента: ${contentData.perfectCount} идеальных, ${contentData.withIssuesCount} с проблемами${C.reset}`);
    } catch (err) {
        console.log(`${C.red}❌ Ошибка проверки контента: ${err.message}${C.reset}`);
    }

    // 3. Мета-теги
    let metaData;
    try {
        const originalLog = console.log;
        const capturedOutput = [];
        console.log = (...args) => capturedOutput.push(args.join(' '));
        metaData = runCheckSeoMeta();
        console.log = originalLog;
        console.log(`${C.green}✅ Мета-теги: ${metaData.okCount} ОК, ${metaData.errorCount} ошибок, ${metaData.warningCount} предупреждений${C.reset}`);
    } catch (err) {
        console.log(`${C.red}❌ Ошибка проверки мета-тегов: ${err.message}${C.reset}`);
    }

    // 4. Sitemap (заглушка)
    const sitemapScore = calcSitemapScore();

    // ─── Выводим дашборд ───
    printDashboard(linkData, contentData, metaData, sitemapScore);
}

main();
