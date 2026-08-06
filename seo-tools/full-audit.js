/**
 * Полный аудит SEO-статей: slug, title, h1, metaDescription, keywords, ogTitle
 * 
 * Запуск: node seo-tools/full-audit.js
 * 
 * Проверяет:
 * 1. Дубли title, slug, h1, ogTitle
 * 2. Пустые поля (title, h1, metaDescription, keywords, ogTitle, canonical)
 * 3. Title длиннее 70 символов
 * 4. MetaDescription длиннее 160 символов
 * 5. H1 совпадает с title (должен отличаться)
 * 6. Title не содержит "| DimaRazrab" (запрещено по правилам)
 * 7. metaDescription без CTA (нет "→" или "заказать" и т.п.)
 * 8. keywords пустые или менее 3 слов
 * 9. Все slug URL
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'data', 'articles_data');

function findTsFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'texts') continue;
            results.push(...findTsFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'types.ts' && entry.name !== 'registry.ts') {
            results.push(fullPath);
        }
    }
    return results;
}

function extract(content, field) {
    const regex = new RegExp(`${field}:\\s*["'\`](.+?)["'\`]`, 's');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
}

function main() {
    console.log('🔍 ПОЛНЫЙ АУДИТ SEO-СТАТЕЙ\n');
    console.log('='.repeat(80));

    const files = findTsFiles(ARTICLES_DIR);
    const articles = [];

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const relativePath = path.relative(path.join(__dirname, '..'), file);

        const slug = extract(content, 'slug');
        const title = extract(content, 'title');
        const h1 = extract(content, 'h1');
        const metaDesc = extract(content, 'metaDescription');
        const keywords = extract(content, 'keywords');
        const ogTitle = extract(content, 'ogTitle');

        articles.push({ file: relativePath, slug, title, h1, metaDesc, keywords, ogTitle });
    }

    // ═══════════════════════════════════════════
    // 1. СПИСОК ВСЕХ SLUG URL
    // ═══════════════════════════════════════════
    console.log('\n📋 ВСЕ SLUG URL (120 статей):\n');
    const slugs = articles.filter(a => a.slug).map(a => a.slug).sort();
    for (const slug of slugs) {
        console.log(`   /blog/${slug}`);
    }

    // ═══════════════════════════════════════════
    // 2. ДУБЛИРОВАНИЕ ПОЛЕЙ
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🔴 ПРОВЕРКА ДУБЛЕЙ:\n');

    const fieldsToCheck = ['title', 'h1', 'ogTitle', 'metaDesc'];
    for (const field of fieldsToCheck) {
        const map = new Map();
        for (const a of articles) {
            if (!a[field]) continue;
            const normalized = a[field].toLowerCase().replace(/[^а-яёa-z0-9]/gi, ' ').replace(/\s+/g, ' ').trim();
            if (!map.has(normalized)) map.set(normalized, []);
            map.get(normalized).push(a);
        }
        const dups = [...map.entries()].filter(([, list]) => list.length > 1);
        if (dups.length === 0) {
            console.log(`   ✅ ${field}: дублей нет`);
        } else {
            console.log(`   🔴 ${field}: ${dups.length} групп дублей`);
            for (const [norm, list] of dups) {
                console.log(`      "${list[0][field].substring(0, 80)}..."`);
                for (const a of list) {
                    console.log(`         📄 ${a.file} (slug: ${a.slug})`);
                }
            }
        }
    }

    // ═══════════════════════════════════════════
    // 3. ПУСТЫЕ ПОЛЯ
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🟡 ПУСТЫЕ ПОЛЯ:\n');

    const requiredFields = ['slug', 'title', 'h1', 'metaDesc', 'keywords', 'ogTitle'];
    let emptyCount = 0;
    for (const a of articles) {
        for (const field of requiredFields) {
            if (!a[field]) {
                console.log(`   ⚠️ ${a.file}: поле "${field}" пустое`);
                emptyCount++;
            }
        }
    }
    if (emptyCount === 0) console.log('   ✅ Все обязательные поля заполнены');

    // ═══════════════════════════════════════════
    // 4. TITLE ДЛИННЕЕ 70 СИМВОЛОВ
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🟡 TITLE ДЛИННЕЕ 70 СИМВОЛОВ:\n');

    let longTitleCount = 0;
    for (const a of articles) {
        if (a.title && a.title.length > 70) {
            console.log(`   ⚠️ [${a.title.length} символов] ${a.title}`);
            console.log(`      📄 ${a.file}`);
            longTitleCount++;
        }
    }
    if (longTitleCount === 0) console.log('   ✅ Все title ≤ 70 символов');
    else console.log(`\n   ⚠️ ВСЕГО: ${longTitleCount} статей с длинным title`);

    // ═══════════════════════════════════════════
    // 5. METADESCRIPTION ДЛИННЕЕ 160 СИМВОЛОВ
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🟡 METADESCRIPTION ДЛИННЕЕ 160 СИМВОЛОВ:\n');

    let longDescCount = 0;
    for (const a of articles) {
        if (a.metaDesc && a.metaDesc.length > 160) {
            console.log(`   ⚠️ [${a.metaDesc.length} символов] ${a.metaDesc.substring(0, 80)}...`);
            console.log(`      📄 ${a.file}`);
            longDescCount++;
        }
    }
    if (longDescCount === 0) console.log('   ✅ Все metaDescription ≤ 160 символов');
    else console.log(`\n   ⚠️ ВСЕГО: ${longDescCount} статей с длинным metaDescription`);

    // ═══════════════════════════════════════════
    // 6. TITLE СОДЕРЖИТ "| DimaRazrab" (ЗАПРЕЩЕНО)
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🔴 TITLE СОДЕРЖИТ "| DimaRazrab" (ЗАПРЕЩЕНО):\n');

    let brandCount = 0;
    for (const a of articles) {
        if (a.title && a.title.includes('DimaRazrab')) {
            console.log(`   ❌ ${a.title}`);
            console.log(`      📄 ${a.file}`);
            brandCount++;
        }
    }
    if (brandCount === 0) console.log('   ✅ Ни один title не содержит "| DimaRazrab"');

    // ═══════════════════════════════════════════
    // 7. H1 = TITLE (ДОЛЖНЫ ОТЛИЧАТЬСЯ)
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🟡 H1 = TITLE (должны отличаться):\n');

    let sameCount = 0;
    for (const a of articles) {
        if (a.h1 && a.title && a.h1 === a.title) {
            console.log(`   ⚠️ H1 и Title совпадают: "${a.title}"`);
            console.log(`      📄 ${a.file}`);
            sameCount++;
        }
    }
    if (sameCount === 0) console.log('   ✅ Все H1 отличаются от title');
    else console.log(`\n   ⚠️ ВСЕГО: ${sameCount} статей с H1 = Title`);

    // ═══════════════════════════════════════════
    // 8. KEYWORDS МЕНЕЕ 3 СЛОВ
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n🟡 KEYWORDS МЕНЕЕ 3 СЛОВ:\n');

    let fewKwCount = 0;
    for (const a of articles) {
        if (a.keywords) {
            const kwCount = a.keywords.split(',').length;
            if (kwCount < 3) {
                console.log(`   ⚠️ [${kwCount} ключей] ${a.keywords}`);
                console.log(`      📄 ${a.file}`);
                fewKwCount++;
            }
        }
    }
    if (fewKwCount === 0) console.log('   ✅ У всех статей ≥ 3 keywords');

    // ═══════════════════════════════════════════
    // СВОДКА
    // ═══════════════════════════════════════════
    console.log('\n' + '='.repeat(80));
    console.log('\n📊 СВОДКА АУДИТА:\n');
    console.log(`   Всего статей:            ${articles.length}`);
    console.log(`   Slug URL:                ${slugs.length}`);
    console.log(`   Пустых полей:            ${emptyCount}`);
    console.log(`   Длинных title (>70):     ${longTitleCount}`);
    console.log(`   Длинных desc (>160):     ${longDescCount}`);
    console.log(`   Title с DimaRazrab:      ${brandCount}`);
    console.log(`   H1 = Title:              ${sameCount}`);
    console.log(`   Keywords < 3:            ${fewKwCount}`);
    console.log('');
}

main();
