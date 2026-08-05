const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'data', 'articles_data');

// Folders that ALREADY had triggers before the main script ran
const AFFECTED_FOLDERS = [
    'api/texts',
    'cluster2/texts',
    'parsery/texts',
    'veb/texts',
    'mobile/texts',
];

let cleaned = 0;
let skipped = 0;

for (const folder of AFFECTED_FOLDERS) {
    const dir = path.join(BASE, folder);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // The duplicate triggers were inserted with \n\n (LF LF)
        // Original triggers use \r\n\r\n (CRLF CRLF) because files use Windows line endings
        // So we find triggers preceded by \n\n (but NOT \r\n\r\n)
        
        // Match: \n\n> [emoji] ** ... until ` or \n or \r
        const dupPattern = /\n\n> (?:🔧|💰|🚀)\s*\*\*[^`]*?(?=`)/g;
        const matches = [];
        let m;
        while ((m = dupPattern.exec(content)) !== null) {
            matches.push({ index: m.index, length: m[0].length, full: m[0] });
        }

        if (matches.length === 0) {
            skipped++;
            continue;
        }

        // Remove ALL duplicate triggers (there should be exactly 1 per file)
        // Process in reverse order to preserve indices
        for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];
            content = content.slice(0, match.index) + content.slice(match.index + match.length);
        }

        fs.writeFileSync(filePath, content, 'utf-8');
        cleaned++;
        console.log(`🧹 ${folder}/${file} — removed ${matches.length} duplicate trigger(s)`);
    }
}

console.log(`\n=== CLEANUP SUMMARY ===`);
console.log(`Cleaned: ${cleaned}`);
console.log(`Skipped (no duplicates found): ${skipped}`);
