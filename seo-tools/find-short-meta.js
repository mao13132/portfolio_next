const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'data', 'articles_data', 'niche', 'telegram');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.includes('-part') && f !== 'registry.ts' && f !== 'types.ts');
const issues = [];
files.forEach(f => {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const m = c.match(/metaDescription:\s*["']([^"']+)["']/);
    if (m) {
        const len = m[1].length;
        if (len < 150) issues.push({ file: f, len, desc: m[1] });
    }
});
issues.sort((a, b) => a.len - b.len);
console.log('Niche articles with metaDescription < 150:');
issues.forEach(i => console.log(`  ${i.len} | ${i.file} | "${i.desc.substring(0, 90)}..."`));
console.log(`Total: ${issues.length}`);
