// seo-tools/analyze-content-length.js
// Анализ объёма текста всех статей
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

const files = walk(path.join(__dirname, '..', 'data', 'articles_data'));
const results = [];

for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    
    // Считаем символы в text parts
    const dir = path.dirname(f);
    const textDir = path.join(dir, 'texts');
    let chars = 0;
    
    if (fs.existsSync(textDir)) {
        const parts = fs.readdirSync(textDir).filter(x => x.endsWith('.ts'));
        for (const p of parts) {
            const tc = fs.readFileSync(path.join(textDir, p), 'utf8');
            const templates = tc.match(/content\s*:\s*`([\s\S]*?)`/g);
            if (templates) templates.forEach(t => chars += t.length - 20);
        }
    }
    
    // Также считаем inline content в domain файле
    const inlineTemplates = content.match(/content\s*:\s*`([\s\S]*?)`/g);
    if (inlineTemplates) inlineTemplates.forEach(t => chars += t.length - 20);
    
    // Определяем кластер
    const relDir = path.relative(path.join(__dirname, '..', 'data', 'articles_data'), dir);
    const cluster = relDir === '.' ? 'root' : relDir.split(path.sep)[0];
    
    results.push({ slug, chars, cluster, file: path.relative(path.join(__dirname, '..'), f) });
}

results.sort((a, b) => a.chars - b.chars);

console.log('=== АНАЛИЗ ОБЪЁМА СТАТЕЙ ===');
console.log(`Всего статей: ${results.length}\n`);

// Группируем по объёму
const under5k = results.filter(r => r.chars < 5000);
const from5kto8k = results.filter(r => r.chars >= 5000 && r.chars < 8000);
const from8kto12k = results.filter(r => r.chars >= 8000 && r.chars < 12000);
const over12k = results.filter(r => r.chars >= 12000);

console.log(`< 5 000 символов: ${under5k.length} статей`);
console.log(`5 000 - 8 000:   ${from5kto8k.length} статей`);
console.log(`8 000 - 12 000:  ${from8kto12k.length} статей`);
console.log(`> 12 000:         ${over12k.length} статей`);
console.log('');

// Детальный список статей < 8000
console.log('=== СТАТЬИ < 8 000 СИМВОЛОВ ===');
const short = results.filter(r => r.chars < 8000);
for (const r of short) {
    const expandable = r.chars < 5000 ? 'МОЖНО РАСШИРИТЬ' : 'ДОСТАТОЧНО';
    console.log(`${r.chars} | ${r.cluster} | ${r.slug} | ${expandable}`);
}
