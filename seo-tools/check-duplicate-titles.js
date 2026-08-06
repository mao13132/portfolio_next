/**
 * Скрипт проверки дублирующихся title и slug среди SEO-статей.
 * 
 * Запуск: node seo-tools/check-duplicate-titles.js
 * 
 * Проверяет:
 * 1. Одинаковые title (самая частая проблема — канибализм)
 * 2. Одинаковые slug (техническая ошибка — страницы не будут уникальными)
 * 3. Похожие title (Levenshtein distance > 80% совпадение)
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'data', 'articles_data');

// ─────────────────────────────────────────────
// Рекурсивный поиск всех .ts файлов
// ─────────────────────────────────────────────
function findTsFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Пропускаем папку texts — там тексты, а не статьи
            if (entry.name === 'texts') continue;
            results.push(...findTsFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'types.ts' && entry.name !== 'registry.ts') {
            results.push(fullPath);
        }
    }

    return results;
}

// ─────────────────────────────────────────────
// Извлечение title и slug из .ts файла
// ─────────────────────────────────────────────
function extractArticleData(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);

    const titleMatch = content.match(/title:\s*["'`](.+?)["'`]/);
    const slugMatch = content.match(/slug:\s*["'`](.+?)["'`]/);
    const h1Match = content.match(/h1:\s*["'`](.+?)["'`]/);

    return {
        file: relativePath,
        title: titleMatch ? titleMatch[1] : null,
        slug: slugMatch ? slugMatch[1] : null,
        h1: h1Match ? h1Match[1] : null,
    };
}

// ─────────────────────────────────────────────
// Нормализация title для сравнения
// ─────────────────────────────────────────────
function normalizeTitle(title) {
    if (!title) return '';
    return title
        .toLowerCase()
        .replace(/[«»"':!?,.\-—–]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// ─────────────────────────────────────────────
// Levenshtein distance (для поиска похожих title)
// ─────────────────────────────────────────────
function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
        Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[a.length][b.length];
}

function similarity(a, b) {
    const maxLen = Math.max(a.length, b.length);
    if (maxLen === 0) return 1;
    return 1 - levenshtein(a, b) / maxLen;
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
function main() {
    console.log('🔍 Проверка дублирующихся title и slug\n');
    console.log('='.repeat(70));

    const files = findTsFiles(ARTICLES_DIR);
    console.log(`📁 Найдено ${files.length} файлов статей\n`);

    const articles = files.map(extractArticleData).filter(a => a.title || a.slug);

    // ─── 1. Дублирующиеся title ───
    const titleMap = new Map();
    for (const article of articles) {
        if (!article.title) continue;
        const normalized = normalizeTitle(article.title);
        if (!titleMap.has(normalized)) {
            titleMap.set(normalized, []);
        }
        titleMap.get(normalized).push(article);
    }

    const duplicateTitles = [...titleMap.entries()].filter(([, list]) => list.length > 1);

    console.log('\n🔴 1. ДУБЛИРУЮЩИЕСЯ TITLE (одинаковые)\n');
    if (duplicateTitles.length === 0) {
        console.log('   ✅ Дублей не найдено!\n');
    } else {
        for (const [normalized, list] of duplicateTitles) {
            console.log(`   Title: "${list[0].title}"`);
            console.log(`   Найдено ${list.length} статей:`);
            for (const article of list) {
                console.log(`      📄 ${article.file}`);
                console.log(`         slug: ${article.slug}`);
            }
            console.log('');
        }
        console.log(`   ⚠️  ВСЕГО: ${duplicateTitles.length} групп дублей, ${duplicateTitles.reduce((s, [, l]) => s + l.length, 0)} статей\n`);
    }

    // ─── 2. Дублирующиеся slug ───
    const slugMap = new Map();
    for (const article of articles) {
        if (!article.slug) continue;
        if (!slugMap.has(article.slug)) {
            slugMap.set(article.slug, []);
        }
        slugMap.get(article.slug).push(article);
    }

    const duplicateSlugs = [...slugMap.entries()].filter(([, list]) => list.length > 1);

    console.log('🔴 2. ДУБЛИРУЮЩИЕСЯ SLUG\n');
    if (duplicateSlugs.length === 0) {
        console.log('   ✅ Дублей не найдено!\n');
    } else {
        for (const [slug, list] of duplicateSlugs) {
            console.log(`   Slug: "${slug}"`);
            for (const article of list) {
                console.log(`      📄 ${article.file}`);
            }
            console.log('');
        }
        console.log(`   ⚠️  ВСЕГО: ${duplicateSlugs.length} групп дублей\n`);
    }

    // ─── 3. Похожие title (>80% совпадение) ───
    console.log('🟡 3. ПОХОЖИЕ TITLE (>80% совпадение, разные статьи)\n');

    const similarPairs = [];
    const normalizedArticles = articles.filter(a => a.title).map(a => ({
        ...a,
        normalized: normalizeTitle(a.title),
    }));

    for (let i = 0; i < normalizedArticles.length; i++) {
        for (let j = i + 1; j < normalizedArticles.length; j++) {
            const a = normalizedArticles[i];
            const b = normalizedArticles[j];

            // Пропускаем уже найденные точные дубли
            if (a.normalized === b.normalized) continue;

            const sim = similarity(a.normalized, b.normalized);
            if (sim >= 0.80) {
                similarPairs.push({ a, b, similarity: sim });
            }
        }
    }

    if (similarPairs.length === 0) {
        console.log('   ✅ Похожих title не найдено!\n');
    } else {
        // Сортировка по убыванию схожести
        similarPairs.sort((x, y) => y.similarity - x.similarity);

        for (const pair of similarPairs.slice(0, 50)) {
            const pct = Math.round(pair.similarity * 100);
            console.log(`   [${pct}%] "${pair.a.title}"`);
            console.log(`          "${pair.b.title}"`);
            console.log(`          📄 ${pair.a.file}`);
            console.log(`          📄 ${pair.b.file}`);
            console.log('');
        }

        if (similarPairs.length > 50) {
            console.log(`   ... и ещё ${similarPairs.length - 50} пар\n`);
        }
        console.log(`   ⚠️  ВСЕГО: ${similarPairs.length} пар похожих title\n`);
    }

    // ─── 4. Сводка ───
    console.log('='.repeat(70));
    console.log('\n📊 СВОДКА:\n');
    console.log(`   Всего статей:            ${articles.length}`);
    console.log(`   Дублей title:            ${duplicateTitles.length} групп (${duplicateTitles.reduce((s, [, l]) => s + l.length, 0)} статей)`);
    console.log(`   Дублей slug:             ${duplicateSlugs.length} групп`);
    console.log(`   Похожих title (>80%):    ${similarPairs.length} пар`);
    console.log('');

    if (duplicateTitles.length > 0 || duplicateSlugs.length > 0) {
        console.log('🚨 РЕКОМЕНДАЦИЯ: Исправьте дублирующиеся title и slug.');
        console.log('   Каждая статья должна иметь УНИКАЛЬНЫЙ title, который точно');
        console.log('   описывает её содержание. Дубли = канибализм в поиске.\n');
    } else {
        console.log('✅ Все title и slug уникальны. Канибализм не обнаружен.\n');
    }
}

main();
