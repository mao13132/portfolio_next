// seo-tools/analyze-content-length.js
// Анализ объёма текста всех статей
// Проверяет: text parts (backtick content), inline sections (backtick + double-quote), subsections, FAQ
const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.includes('texts')) results = results.concat(walk(full));
        else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.includes('-part') && entry.name !== 'registry.ts' && entry.name !== 'types.ts') results.push(full);
    }
    return results;
}

/**
 * Считает реальные символы текста в template literal `...`
 * Исключает markdown-разметку (:::conversion, > 🔧, таблицы-заголовки)
 */
function countBacktickContent(content) {
    let chars = 0;
    const regex = /content\s*:\s*`([\s\S]*?)`/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        // Убираем markdown-разметку, считаем только читаемый текст
        let text = match[1]
            .replace(/:::conversion[\s\S]*?:::/g, '') // conversion блоки
            .replace(/^>\s.*$/gm, '') // blockquotes (delegation triggers)
            .replace(/^\|.*\|$/gm, '') // таблицы
            .replace(/^#{1,6}\s/gm, '') // заголовки markdown
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // ссылки → текст
            .replace(/[*_`]/g, '') // форматирование
            .replace(/\n{2,}/g, '\n') // множественные переносы
            .trim();
        chars += text.length;
    }
    return chars;
}

/**
 * Считает текст в double-quote content полях (subsections в inline-статьях)
 */
function countDoubleQuoteContent(content) {
    let chars = 0;
    const regex = /content:\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        chars += match[1].length;
    }
    return chars;
}

/**
 * Считает текст в FAQ (question + answer)
 */
function countFaqContent(content) {
    let chars = 0;
    const qRegex = /question:\s*"([^"]+)"/g;
    const aRegex = /answer:\s*"([^"]+)"/g;
    let match;
    while ((match = qRegex.exec(content)) !== null) chars += match[1].length;
    while ((match = aRegex.exec(content)) !== null) chars += match[1].length;
    return chars;
}

const files = walk(path.join(__dirname, '..', 'data', 'articles_data'));
const results = [];

for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    
    let chars = 0;
    const dir = path.dirname(f);
    const relDir = path.relative(path.join(__dirname, '..', 'data', 'articles_data'), dir);
    const cluster = relDir === '.' ? 'root' : relDir.split(path.sep)[0];
    let source = 'inline'; // по умолчанию — inline content

    // 1. Text parts (если есть texts/ директория)
    const textDir = path.join(dir, 'texts');
    if (fs.existsSync(textDir)) {
        const parts = fs.readdirSync(textDir).filter(x => x.endsWith('.ts'));
        if (parts.length > 0) {
            source = 'text-parts';
            for (const p of parts) {
                const tc = fs.readFileSync(path.join(textDir, p), 'utf8');
                chars += countBacktickContent(tc);
                chars += countDoubleQuoteContent(tc);
                chars += countFaqContent(tc);
            }
        }
    }

    // 2. Inline content в domain файле (если нет text parts)
    if (source === 'inline') {
        chars += countBacktickContent(content);
        chars += countDoubleQuoteContent(content);
        chars += countFaqContent(content);
    }
    
    results.push({ slug, chars, cluster, source, file: path.relative(path.join(__dirname, '..'), f) });
}

results.sort((a, b) => a.chars - b.chars);

console.log('=== АНАЛИЗ ОБЪЁМА СТАТЕЙ ===');
console.log(`Всего статей: ${results.length}\n`);

// Группируем по объёму
const under500 = results.filter(r => r.chars < 500);
const under2k = results.filter(r => r.chars >= 500 && r.chars < 2000);
const from2kto5k = results.filter(r => r.chars >= 2000 && r.chars < 5000);
const from5kto8k = results.filter(r => r.chars >= 5000 && r.chars < 8000);
const over8k = results.filter(r => r.chars >= 8000);

console.log(`< 500 символов (скелет):  ${under500.length} статей ⚠️`);
console.log(`500 - 2 000 (короткие):  ${under2k.length} статей`);
console.log(`2 000 - 5 000 (средние): ${from2kto5k.length} статей`);
console.log(`5 000 - 8 000 (длинные): ${from5kto8k.length} статей`);
console.log(`> 8 000 (полные):        ${over8k.length} статей`);
console.log('');

// Детальный список проблемных статей < 2000
console.log('=== СТАТЬИ < 2 000 СИМВОЛОВ (НУЖНО ДОПИСАТЬ) ===');
const short = results.filter(r => r.chars < 2000);
if (short.length === 0) {
    console.log('✅ Все статьи имеют достаточный объём');
} else {
    for (const r of short) {
        console.log(`${r.chars.toString().padStart(5)} | ${r.cluster.padEnd(10)} | ${r.source.padEnd(10)} | ${r.slug}`);
    }
    console.log(`\n⚠️ ВСЕГО: ${short.length} статей нужно дописать`);
}

console.log('');

// Статистика по источникам
const textPartsCount = results.filter(r => r.source === 'text-parts').length;
const inlineCount = results.filter(r => r.source === 'inline').length;
console.log(`Источник контента: text-parts=${textPartsCount}, inline=${inlineCount}`);
