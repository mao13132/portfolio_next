const fs = require('fs');
const path = require('path');

// Скрипт одноразовой замены: https://t.me/dima_razrab → https://t.me/developer_telegrams
// Выполнен 2026-08-05. 315 замен в 186 файлах.
const OLD_URL = 'https://t.me/dima_razrab';
const NEW_URL = 'https://t.me/developer_telegrams';

function getAllFiles(dir, extensions) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') continue;
            results = results.concat(getAllFiles(fullPath, extensions));
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
            results.push(fullPath);
        }
    }
    return results;
}

const projectRoot = path.resolve(__dirname, '..');
const files = getAllFiles(projectRoot, ['.ts', '.tsx', '.js', '.jsx', '.md', '.json']);

let totalReplacements = 0;
const modifiedFiles = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes(OLD_URL)) {
        const count = content.split(OLD_URL).length - 1;
        const newContent = content.split(OLD_URL).join(NEW_URL);
        fs.writeFileSync(file, newContent, 'utf-8');
        totalReplacements += count;
        modifiedFiles.push({ file: path.relative(projectRoot, file), count });
    }
}

console.log(`\n=== Замена Telegram URL ===`);
console.log(`Старый URL: ${OLD_URL}`);
console.log(`Новый URL:  ${NEW_URL}`);
console.log(`\nВсего замен: ${totalReplacements}`);
console.log(`Файлов изменено: ${modifiedFiles.length}\n`);

modifiedFiles.sort((a, b) => b.count - a.count);
for (const { file, count } of modifiedFiles) {
    console.log(`  ${file} — ${count} замен`);
}
