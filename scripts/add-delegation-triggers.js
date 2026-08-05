const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'data', 'articles_data');

// ============================================================
// 1. FIND ALL PART FILES
// ============================================================
function findPartFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findPartFiles(fullPath));
        } else if (entry.isFile() && /-part[12]\.ts$/.test(entry.name)) {
            results.push(fullPath);
        }
    }
    return results;
}

// ============================================================
// 2. CHECK FOR EXISTING TRIGGERS
// ============================================================
function hasTriggers(content) {
    // Check for delegation trigger pattern: > 🔧/💰/🚀 **text**
    return />\s*(?:🔧|💰|🚀)\s*\*\*/.test(content);
}

// ============================================================
// 3. MONEY PAGE MAPPING
// ============================================================
function getMoneyPage(filePath) {
    const rel = path.relative(BASE, filePath).replace(/\\/g, '/');

    if (rel.startsWith('cluster2/')) return '/avtomatizaciya-biznesa';
    if (rel.startsWith('parsery/')) return '/parsery-marketplejsov';
    if (rel.startsWith('lidogeneraciya/')) return '/lidogeneraciya-telegram';
    if (rel.startsWith('ai/')) return '/ai-integracii';
    if (rel.startsWith('api/')) return '/razrabotka-api';
    if (rel.startsWith('python/')) return '/python-razrabotka';
    if (rel.startsWith('nextjs/')) return '/nextjs-razrabotka';
    if (rel.startsWith('veb/')) return '/razrabotka-servisov';
    if (rel.startsWith('mobile/')) return '/razrabotka-servisov';
    if (rel.startsWith('konstruktory/')) return '/razrabotka-servisov';
    if (rel.startsWith('sklad/')) return '/avtomatizaciya-biznesa';

    // Root texts — all Telegram bots
    return '/razrabotka-botov';
}

// ============================================================
// 4. TRIGGER TEMPLATES BY MONEY PAGE
// ============================================================
const TRIGGER_TEMPLATES = {
    '/razrabotka-botov': {
        wrench: [
            '> 🔧 **Не хотите разбираться в разработке ботов?** Доверьте это профессионалу — [напишите мне](/razrabotka-botov), и я сделаю всё под ключ.',
            '> 🔧 **Нужен профессиональный Telegram-бот?** Доверьте разработку профессионалу — [напишите мне](/razrabotka-botov).',
            '> 🔧 **Сложная задача? Доверьте разработку бота профессионалу** — [напишите мне](/razrabotka-botov), и я сделаю всё под ключ.',
            '> 🔧 **Нет времени разбираться в разработке?** Доверьте создание бота профессионалу — [напишите мне](/razrabotka-botov).',
            '> 🔧 **Хотите бота, который работает?** Доверьте разработку профессионалу — [напишите мне](/razrabotka-botov).',
        ],
        money: [
            '> 💰 **Хотите точную смету?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/razrabotka-botov).',
            '> 💰 **Интересует стоимость разработки?** Расскажите о проекте — подготовлю детальную смету за 24 часа. [Заказать оценку](/razrabotka-botov).',
            '> 💰 **Хотите узнать стоимость?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/razrabotka-botov).',
            '> 💰 **Какова стоимость бота?** Расскажите о проекте — подготовлю точную смету. [Заказать оценку](/razrabotka-botov).',
        ],
    },
    '/avtomatizaciya-biznesa': {
        wrench: [
            '> 🔧 **Не хотите разбираться в автоматизации?** Доверьте это профессионалу — [напишите мне](/avtomatizaciya-biznesa).',
            '> 🔧 **Нужна автоматизация бизнеса?** Доверьте это профессионалу — [напишите мне](/avtomatizaciya-biznesa), и я сделаю всё под ключ.',
        ],
        money: [
            '> 💰 **Хотите точную смету на автоматизацию?** Расскажите о процессах — подготовлю оценку за 24 часа. [Заказать оценку](/avtomatizaciya-biznesa).',
        ],
    },
    '/parsery-marketplejsov': {
        wrench: [
            '> 🔧 **Не хотите разбираться в парсинге?** Доверьте разработку парсера профессионалу — [напишите мне](/parsery-marketplejsov).',
            '> 🔧 **Нужен парсер данных?** Доверьте разработку профессионалу — [напишите мне](/parsery-marketplejsov).',
        ],
        money: [
            '> 💰 **Хотите точную смету на парсер?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/parsery-marketplejsov).',
        ],
    },
    '/ai-integracii': {
        wrench: [
            '> 🔧 **Не хотите разбираться в AI?** Доверьте интеграцию профессионалу — [напишите мне](/ai-integracii).',
            '> 🔧 **Нужна AI-интеграция?** Доверьте это профессионалу — [напишите мне](/ai-integracii).',
        ],
        money: [
            '> 💰 **Хотите точную смету на AI-интеграцию?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/ai-integracii).',
        ],
    },
    '/razrabotka-api': {
        wrench: [
            '> 🔧 **Не хотите разбираться в API?** Доверьте интеграцию профессионалу — [напишите мне](/razrabotka-api), и я сделаю всё под ключ.',
            '> 🔧 **Нужна API-интеграция?** Доверьте это профессионалу — [напишите мне](/razrabotka-api).',
        ],
        money: [
            '> 💰 **Хотите точную смету на API-интеграцию?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/razrabotka-api).',
        ],
    },
    '/python-razrabotka': {
        wrench: [
            '> 🔧 **Нужен Python-разработчик?** Доверьте проект профессионалу — [напишите мне](/python-razrabotka).',
            '> 🔧 **Хотите проект на Python?** Доверьте разработку профессионалу — [напишите мне](/python-razrabotka).',
        ],
        money: [
            '> 💰 **Хотите точную смету на Python-проект?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/python-razrabotka).',
        ],
    },
    '/nextjs-razrabotka': {
        wrench: [
            '> 🔧 **Нужен разработчик на Next.js?** Доверьте проект профессионалу — [напишите мне](/nextjs-razrabotka).',
            '> 🔧 **Хотите проект на Next.js?** Доверьте разработку профессионалу — [напишите мне](/nextjs-razrabotka).',
        ],
        money: [
            '> 💰 **Хотите точную смету на Next.js проект?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/nextjs-razrabotka).',
        ],
    },
    '/lidogeneraciya-telegram': {
        wrench: [
            '> 🔧 **Не хотите разбираться в лидогенерации?** Доверьте это профессионалу — [напишите мне](/lidogeneraciya-telegram).',
            '> 🔧 **Нужна лидогенерация в Telegram?** Доверьте это профессионалу — [напишите мне](/lidogeneraciya-telegram).',
        ],
        money: [
            '> 💰 **Хотите точную смету на лидогенерацию?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/lidogeneraciya-telegram).',
        ],
    },
    '/razrabotka-servisov': {
        wrench: [
            '> 🔧 **Не хотите разбираться в разработке?** Доверьте проект профессионалу — [напишите мне](/razrabotka-servisov).',
            '> 🔧 **Нужен профессиональный разработчик?** Доверьте проект профессионалу — [напишите мне](/razrabotka-servisov).',
        ],
        money: [
            '> 💰 **Хотите точную смету?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/razrabotka-servisov).',
        ],
    },
};

// ============================================================
// 5. SELECT UNIQUE TRIGGER
// ============================================================
function selectTrigger(moneyPage, type, articleSlug) {
    const templates = TRIGGER_TEMPLATES[moneyPage];
    if (!templates) {
        console.log(`WARN: No templates for ${moneyPage}`);
        return null;
    }

    const options = templates[type];
    if (!options || options.length === 0) return null;

    // Use article slug hash for uniqueness
    const hash = articleSlug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return options[hash % options.length];
}

// ============================================================
// 6. FIND SECTIONS IN FILE
// ============================================================
function findSections(content) {
    const sections = [];
    const regex = /\bid:\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        sections.push({
            id: match[1],
            pos: match.index,
        });
    }
    return sections;
}

// ============================================================
// 7. FIND END OF SECTION'S MAIN CONTENT
// ============================================================
function findContentEnd(content, sectionPos) {
    // Find 'content: `' after the section position
    const afterSection = content.slice(sectionPos);
    const contentMatch = afterSection.match(/content:\s*`/);
    if (!contentMatch) return -1;

    const contentStart = sectionPos + contentMatch.index + contentMatch[0].length;

    // Now find the closing backtick
    // We need to find a backtick that's followed by , (end of content property)
    // or followed by nothing significant (end of template literal)
    let pos = contentStart;
    while (pos < content.length) {
        if (content[pos] === '`') {
            // Check what follows this backtick
            const after = content.slice(pos + 1, pos + 20).trimStart();
            if (after.startsWith(',') || after.startsWith(']') || after.startsWith('}')) {
                return pos; // Position of the closing backtick
            }
        }
        pos++;
    }
    return -1;
}

// ============================================================
// 8. DETERMINE TARGET SECTION FOR INSERTION
// ============================================================
function findTargetSection(sections, isPart1) {
    // Patterns for section ids
    const etapPatterns = /^(etap|stage|process|kak-rabotaet|kak-vybrat|vybor|how|shagi|poshagov)/i;
    const stoimostPatterns = /^(stoimost|price|cost|skolko|tarif|budget|cena|stoim)/i;
    const keysPatterns = /^(keys|kейс|case|primer|result|roi|effect)/i;
    const vivodPatterns = /^(zaklyuchenie|conclusion|vivod|itog|final|summary)/i;

    if (isPart1) {
        // For part1: look for "etap" or "process" section
        for (const s of sections) {
            if (etapPatterns.test(s.id)) return s;
        }
        // Fallback: 3rd section (index 2)
        if (sections.length > 2) return sections[2];
        if (sections.length > 0) return sections[sections.length - 1];
    } else {
        // For part2: look for "stoimost" section
        for (const s of sections) {
            if (stoimostPatterns.test(s.id)) return s;
        }
        // Then look for "keys" section
        for (const s of sections) {
            if (keysPatterns.test(s.id)) return s;
        }
        // Fallback: 2nd section (index 1)
        if (sections.length > 1) return sections[1];
        if (sections.length > 0) return sections[0];
    }

    return null;
}

// ============================================================
// 9. INSERT TRIGGER INTO FILE
// ============================================================
function insertTrigger(content, sectionPos, triggerText) {
    const contentEnd = findContentEnd(content, sectionPos);
    if (contentEnd === -1) {
        return null;
    }

    // Determine if content uses real newlines or \n escape sequences
    // Check if there's a real newline between content start and end
    const contentStartSearch = content.slice(sectionPos).match(/content:\s*`/);
    const contentStart = sectionPos + contentStartSearch.index + contentStartSearch[0].length;
    const contentSlice = content.slice(contentStart, contentEnd);
    const hasRealNewlines = /\n/.test(contentSlice);

    let insertText;
    if (hasRealNewlines) {
        // Content has real newlines - use real newlines for trigger
        insertText = '\n\n' + triggerText;
    } else {
        // Content is single-line - use \n escape sequences
        insertText = '\\n\\n' + triggerText;
    }

    // Insert before the closing backtick
    const newContent = content.slice(0, contentEnd) + insertText + content.slice(contentEnd);
    return newContent;
}

// ============================================================
// 10. GET ARTICLE SLUG FROM FILE PATH
// ============================================================
function getArticleSlug(filePath) {
    const filename = path.basename(filePath);
    return filename.replace(/-part[12]\.ts$/, '');
}

// ============================================================
// 11. MAIN PROCESSING
// ============================================================
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    if (hasTriggers(content)) {
        return { status: 'skip', reason: 'already has triggers' };
    }

    const moneyPage = getMoneyPage(filePath);
    const slug = getArticleSlug(filePath);
    const isPart1 = filePath.includes('-part1.');

    // Find sections
    const sections = findSections(content);
    if (sections.length === 0) {
        return { status: 'error', reason: 'no sections found' };
    }

    // Find target section
    const target = findTargetSection(sections, isPart1);
    if (!target) {
        return { status: 'error', reason: 'no target section found' };
    }

    // Select trigger type based on part
    const triggerType = isPart1 ? 'wrench' : 'money';
    const triggerText = selectTrigger(moneyPage, triggerType, slug);
    if (!triggerText) {
        return { status: 'error', reason: `no trigger template for ${moneyPage}` };
    }

    // Insert trigger
    const newContent = insertTrigger(content, target.pos, triggerText);
    if (!newContent) {
        return { status: 'error', reason: 'could not find content end' };
    }

    fs.writeFileSync(filePath, newContent, 'utf-8');
    return { status: 'ok', section: target.id, trigger: triggerType };
}

// ============================================================
// 12. RUN
// ============================================================
const files = findPartFiles(BASE);
console.log(`Found ${files.length} part files total`);

let skipped = 0;
let processed = 0;
let errors = 0;
const errorFiles = [];

for (const file of files) {
    const relPath = path.relative(BASE, file);
    const result = processFile(file);

    if (result.status === 'skip') {
        skipped++;
    } else if (result.status === 'ok') {
        processed++;
        console.log(`✅ ${relPath} → section "${result.section}" (${result.trigger})`);
    } else {
        errors++;
        errorFiles.push({ file: relPath, reason: result.reason });
        console.log(`❌ ${relPath} → ${result.reason}`);
    }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Total files: ${files.length}`);
console.log(`Skipped (already have triggers): ${skipped}`);
console.log(`Processed (triggers added): ${processed}`);
console.log(`Errors: ${errors}`);

if (errorFiles.length > 0) {
    console.log(`\nError files:`);
    for (const ef of errorFiles) {
        console.log(`  - ${ef.file}: ${ef.reason}`);
    }
}
