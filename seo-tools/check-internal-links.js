/**
 * seo-tools/check-internal-links.js
 * Граф перелинковки: строит карту внутренних ссылок между статьями
 * Находит страницы-сироты (нет входящих) и страницы-тупики (нет исходящих)
 *
 * Запуск: node seo-tools/check-internal-links.js
 */

const fs = require('fs');
const path = require('path');
const {
    C, ARTICLES_DIR,
    findDomainFiles, findTextFiles,
    extractSlug, extractMarkdownLinks,
    normalizeSlug, parseDomainFile,
    getServicePageSlugs,
} = require('./lib/parser');

// ═══════════════════════════════════════════
//  ОСНОВНАЯ ЛОГИКА
// ═══════════════════════════════════════════

/**
 * Строит граф перелинковки из всех domain-файлов и text-файлов
 * @returns {{ graph: Map<string, Set<string>>, allSlugs: Set<string> }}
 */
function buildLinkGraph() {
    const graph = new Map();       // slug → Set<slug> (исходящие ссылки)
    const allSlugs = new Set();    // все известные slug'и

    // 1. Сканируем domain-файлы (содержат internalLinks и markdown в полях)
    const domainFiles = findDomainFiles(ARTICLES_DIR);
    console.log(`${C.dim}Найдено domain-файлов: ${domainFiles.length}${C.reset}`);

    for (const filePath of domainFiles) {
        const parsed = parseDomainFile(filePath);
        if (!parsed.slug) continue;

        allSlugs.add(parsed.slug);
        if (!graph.has(parsed.slug)) graph.set(parsed.slug, new Set());

        // Собираем все ссылки из internalLinks
        for (const url of parsed.internalLinksUrls) {
            const targetSlug = normalizeSlug(url);
            if (targetSlug && targetSlug !== parsed.slug) {
                graph.get(parsed.slug).add(targetSlug);
            }
        }

        // Собираем markdown-ссылки из domain-файла (ctaSubtitle, heroSubtitle и др.)
        // Пропускаем якорные ссылки (#section) и внешние ссылки
        for (const link of parsed.domainLinks) {
            if (link.url.startsWith('#')) continue; // якорные ссылки — не межстраничные
            if (link.url.startsWith('/')) {
                const targetSlug = normalizeSlug(link.url);
                if (targetSlug && targetSlug !== parsed.slug) {
                    graph.get(parsed.slug).add(targetSlug);
                }
            }
        }
    }

    // 2. Сканируем text-файлы (содержат markdown-ссылки в content)
    const textFiles = findTextFiles(ARTICLES_DIR);
    console.log(`${C.dim}Найдено text-файлов: ${textFiles.length}${C.reset}`);

    // Строим маппинг: text part → parent domain slug
    // Например: ai-agenty-part1.ts → ai-agenty-dlya-biznesa (slug из domain файла)
    const partToParentSlug = new Map();
    for (const [slug, filePath] of domainFiles) {
        const dir = path.dirname(filePath);
        const textDir = path.join(dir, 'texts');
        if (!fs.existsSync(textDir)) continue;
        const textFilesInDir = fs.readdirSync(textDir).filter(f => f.endsWith('.ts'));
        for (const tf of textFilesInDir) {
            const partName = tf.replace('.ts', '');
            partToParentSlug.set(path.join(textDir, tf), slug);
        }
    }

    for (const filePath of textFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Используем slug родительского domain файла, а не имя text part
        const parentSlug = partToParentSlug.get(filePath);
        if (!parentSlug) continue;

        // Не добавляем text part slug в allSlugs — только domain файлы определяют статьи

        // Извлекаем все template literals и ищем markdown-ссылки
        const templateLiterals = content.match(/content\s*:\s*`([\s\S]*?)`/g);
        if (templateLiterals) {
            for (const tpl of templateLiterals) {
                const inner = tpl.replace(/^content\s*:\s*`/, '').replace(/`$/, '');
                const links = extractMarkdownLinks(inner);
                for (const link of links) {
                    if (link.url.startsWith('#')) continue;
                    if (link.url.startsWith('/')) {
                        const targetSlug = normalizeSlug(link.url);
                        if (targetSlug && targetSlug !== parentSlug) {
                            if (!graph.has(parentSlug)) graph.set(parentSlug, new Set());
                            graph.get(parentSlug).add(targetSlug);
                        }
                    }
                }
            }
        }
    }

    return { graph, allSlugs };
}

/**
 * Считает входящие ссылки для каждого slug'а
 */
function countIncomingLinks(graph, allSlugs) {
    const incoming = new Map();
    for (const slug of allSlugs) {
        incoming.set(slug, 0);
    }
    for (const [source, targets] of graph) {
        for (const target of targets) {
            if (incoming.has(target)) {
                incoming.set(target, incoming.get(target) + 1);
            } else {
                // Ссылка на неизвестный slug — возможно, страница-кластер
                incoming.set(target, 1);
            }
        }
    }
    return incoming;
}

/**
 * Главная функция
 */
function runCheckInternalLinks() {
    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  📊 ГРАФ ПЕРЕЛИНКОВКИ${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    const { graph, allSlugs } = buildLinkGraph();

    // Подсчёт статистики
    let totalLinks = 0;
    for (const targets of graph.values()) {
        totalLinks += targets.size;
    }

    console.log(`${C.bold}Всего статей: ${C.white}${allSlugs.size}${C.reset}`);
    console.log(`${C.bold}Всего внутренних ссылок: ${C.white}${totalLinks}${C.reset}`);
    console.log();

    // ─── Входящие ссылки ───
    const incoming = countIncomingLinks(graph, allSlugs);

    // Топ-10 по входящим ссылкам
    const sortedByIncoming = [...incoming.entries()]
        .filter(([slug]) => allSlugs.has(slug))
        .sort((a, b) => b[1] - a[1]);

    console.log(`${C.bold}${C.cyan}🔗 ТОП-10 по входящим ссылкам:${C.reset}`);
    const top10 = sortedByIncoming.slice(0, 10);
    top10.forEach(([slug, count], idx) => {
        const bar = count > 0 ? '●'.repeat(Math.min(count, 40)) : '';
        console.log(`  ${C.bold}${idx + 1}.${C.reset} /${C.white}${slug}${C.reset} — ${C.green}${count} входящих${C.reset} ${C.dim}${bar}${C.reset}`);
    });
    console.log();

    // ─── Сироты (нет входящих ссылок) ───
    const orphans = sortedByIncoming.filter(([_, count]) => count === 0);
    console.log(`${C.bold}${C.yellow}🏝️  СИРОТЫ (нет входящих ссылок): ${orphans.length}${C.reset}`);
    if (orphans.length > 0) {
        for (const [slug, _] of orphans) {
            console.log(`  ${C.red}✘ /${slug}${C.reset} — ${C.red}0 входящих${C.reset}`);
        }
        // Рекомендация: найти ближайшую по теме статью
        const firstOrphan = orphans[0]?.[0];
        if (firstOrphan) {
            const relatedSlug = sortedByIncoming.find(([s]) => s !== firstOrphan)?.[0];
            if (relatedSlug) {
                console.log(`  ${C.yellow}💡 Рекомендация: добавить ссылку из /${relatedSlug} на /${firstOrphan}${C.reset}`);
            }
        }
    } else {
        console.log(`  ${C.green}✅ Все статьи имеют входящие ссылки!${C.reset}`);
    }
    console.log();

    // ─── Тупики (нет исходящих ссылок) ───
    const deadEnds = [...allSlugs]
        .filter(slug => {
            const targets = graph.get(slug);
            return !targets || targets.size === 0;
        })
        .sort();

    console.log(`${C.bold}${C.red}🚪 ТУПИКИ (нет исходящих ссылок): ${deadEnds.length}${C.reset}`);
    if (deadEnds.length > 0) {
        for (const slug of deadEnds) {
            console.log(`  ${C.red}✘ /${slug}${C.reset} — ${C.red}0 исходящих${C.reset}`);
        }
        console.log(`  ${C.yellow}💡 Рекомендация: добавить 3-5 ссылок на другие статьи${C.reset}`);
    } else {
        console.log(`  ${C.green}✅ Все статьи имеют исходящие ссылки!${C.reset}`);
    }
    console.log();

    // ─── Предупреждения: ссылки на несуществующие slug'и ───
    // Собираем slug'и сервисных страниц (razrabotka-botov, ai-integracii и т.д.)
    const serviceSlugs = getServicePageSlugs();
    // Также исключаем ссылки на /work/* и /blog/* (категории)
    const knownPrefixes = ['work/', 'blog/'];

    const unknownTargets = new Set();
    for (const [source, targets] of graph) {
        for (const target of targets) {
            // Пропускаем сервисные страницы
            if (serviceSlugs.has(target)) continue;
            // Пропускаем work/* и blog/* ссылки
            if (knownPrefixes.some(p => target.startsWith(p))) continue;
            // Пропускаем известные slug'и статей
            if (allSlugs.has(target)) continue;
            unknownTargets.add(`${source} → ${target}`);
        }
    }
    if (unknownTargets.size > 0) {
        console.log(`${C.bold}${C.magenta}⚠️  Ссылки на неизвестные slug'и: ${unknownTargets.size}${C.reset}`);
        for (const link of [...unknownTargets].slice(0, 15)) {
            console.log(`  ${C.yellow}→ ${link}${C.reset}`);
        }
        if (unknownTargets.size > 15) {
            console.log(`  ${C.dim}... и ещё ${unknownTargets.size - 15}${C.reset}`);
        }
        console.log();
    }

    // ─── Возвращаем данные для dashboard ───
    return {
        totalArticles: allSlugs.size,
        totalLinks,
        orphanCount: orphans.length,
        deadEndCount: deadEnds.length,
        unknownTargetCount: unknownTargets.size,
        incoming,
        graph,
        allSlugs,
    };
}

// Запуск если вызван напрямую
if (require.main === module) {
    runCheckInternalLinks();
}

module.exports = { runCheckInternalLinks, buildLinkGraph, countIncomingLinks };
