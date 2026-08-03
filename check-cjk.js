const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'data', 'articles_data');

// CJK Unicode ranges
const CJK_RANGES = [
  { name: 'CJK Unified Ideographs', start: 0x4E00, end: 0x9FFF },
  { name: 'CJK Extension A', start: 0x3400, end: 0x4DBF },
  { name: 'CJK Symbols and Punctuation', start: 0x3000, end: 0x303F },
  { name: 'Fullwidth Forms (excluding standard)', start: 0xFF00, end: 0xFFEF },
];

// Build a single regex for all ranges
const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\uff00-\uffef]/g;

function getAllTsFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllTsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

function getUnicodeName(codePoint) {
  for (const range of CJK_RANGES) {
    if (codePoint >= range.start && codePoint <= range.end) {
      return range.name;
    }
  }
  return 'Unknown';
}

function getContext(line, matchIndex, matchLength) {
  const ctxBefore = 20;
  const ctxAfter = 20;
  const start = Math.max(0, matchIndex - ctxBefore);
  const end = Math.min(line.length, matchIndex + matchLength + ctxAfter);
  const before = line.substring(start, matchIndex);
  const match = line.substring(matchIndex, matchIndex + matchLength);
  const after = line.substring(matchIndex + matchLength, end);
  return {
    before: (start > 0 ? '...' : '') + before,
    match,
    after: after + (end < line.length ? '...' : ''),
  };
}

console.log('=== СКАНИРОВАНИЕ .ts ФАЙЛОВ НА CJK СИМВОЛЫ ===\n');
console.log(`Базовая директория: ${BASE_DIR}\n`);

const files = getAllTsFiles(BASE_DIR);
console.log(`Найдено .ts файлов: ${files.length}\n`);

let totalFiles = files.length;
let filesWithCjk = 0;
const problemFiles = [];

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const findings = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let match;
    cjkRegex.lastIndex = 0;
    while ((match = cjkRegex.exec(line)) !== null) {
      const char = match[0];
      const codePoint = char.codePointAt(0);
      const hex = 'U+' + codePoint.toString(16).toUpperCase().padStart(4, '0');
      const ctx = getContext(line, match.index, char.length);
      findings.push({
        line: lineIdx + 1,
        char,
        hex,
        rangeName: getUnicodeName(codePoint),
        context: ctx,
      });
    }
  }

  if (findings.length > 0) {
    filesWithCjk++;
    problemFiles.push({ relPath, findings });
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📄 ФАЙЛ: ${relPath}`);
    console.log(`   Найдено CJK символов: ${findings.length}`);
    console.log(`${'='.repeat(80)}`);
    for (const f of findings) {
      console.log(`\n  Строка ${f.line}:`);
      console.log(`    Символ: "${f.char}" (${f.hex}) — ${f.rangeName}`);
      console.log(`    Контекст: "${f.context.before}[${f.context.match}]${f.context.after}"`);
    }
  }
}

console.log(`\n${'='.repeat(80)}`);
console.log('📊 СВОДНЫЙ ОТЧЁТ');
console.log(`${'='.repeat(80)}`);
console.log(`Всего проверено файлов: ${totalFiles}`);
console.log(`Файлов с CJK символами: ${filesWithCjk}`);
console.log(`Файлов без CJK символов: ${totalFiles - filesWithCjk}`);

if (problemFiles.length > 0) {
  console.log(`\n${'─'.repeat(80)}`);
  console.log('⚠️  ПРОБЛЕМНЫЕ ФАЙЛЫ:');
  console.log(`${'─'.repeat(80)}`);
  for (const pf of problemFiles) {
    const urlPath = pf.relPath
      .replace(/^data\/articles_data\//, '/articles/')
      .replace(/\.ts$/, '')
      .replace(/\/texts\//, '/');
    console.log(`  ${pf.relPath}`);
    console.log(`    → URL: ${urlPath}`);
    console.log(`    → CJK символов: ${pf.findings.length}`);
    const uniqueChars = [...new Set(pf.findings.map(f => `${f.char} (${f.hex})`))];
    console.log(`    → Уникальные символы: ${uniqueChars.join(', ')}`);
  }
} else {
  console.log('\n✅ CJK символы не найдены ни в одном файле!');
}

console.log(`\n${'='.repeat(80)}`);
console.log('Сканирование завершено.');
