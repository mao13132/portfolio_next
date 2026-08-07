const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data', 'articles_data', 'niche', 'telegram');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.includes('-part') && f !== 'registry.ts' && f !== 'types.ts');

let fixed = 0;

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const match = content.match(/metaDescription:\s*["']([^"']+)["']/);
    if (!match) return;
    
    const current = match[1];
    const len = current.length;
    
    if (len >= 150 && len <= 160) return; // Already OK
    
    // Extract slug to find industry-specific expansion
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    if (!slugMatch) return;
    
    let newMeta = current;
    
    // If too short, expand with CTA
    if (len < 150) {
        // Remove existing CTA if present
        newMeta = newMeta.replace(/\s*Бесплатная оценка.*$/, '').replace(/\s*→$/, '');
        
        // Add proper CTA to reach 150-160
        const cta = '. Бесплатная оценка за 24 часа →';
        const target = 155;
        const needed = target - newMeta.length - cta.length;
        
        if (needed > 0) {
            // Add industry-specific details
            const details = getDetails(slugMatch[1]);
            const detailToAdd = details.substring(0, needed);
            newMeta = newMeta + detailToAdd + cta;
        } else {
            newMeta = newMeta + cta;
        }
        
        // Trim to 160 max
        if (newMeta.length > 160) {
            newMeta = newMeta.substring(0, 158).replace(/\s+\S*$/, '') + ' →';
        }
    }
    
    // If too long, trim
    if (newMeta.length > 160) {
        newMeta = newMeta.substring(0, 158).replace(/\s+\S*$/, '') + ' →';
    }
    
    if (newMeta !== current && newMeta.length >= 150 && newMeta.length <= 160) {
        content = content.replace(match[0], `metaDescription: "${newMeta}"`);
        fs.writeFileSync(filePath, content, 'utf8');
        fixed++;
        console.log(`  ✅ ${f}: ${len} → ${newMeta.length} chars`);
    } else if (newMeta !== current) {
        console.log(`  ⚠️ ${f}: ${len} → ${newMeta.length} (target 150-160)`);
    }
});

console.log(`\nFixed: ${fixed} files`);

function getDetails(slug) {
    const details = {
        'bot-dlya-muzyki': '. Запись, абонементы, расписание занятий, программа лояльности',
        'bot-dlya-prokata': '. Каталог оборудования, бронирование, оплата, напоминания',
        'bot-dlya-remonta-tekhniki': '. Заказ, отслеживание статуса, уведомления о готовности',
        'bot-dlya-notariusa': '. Запись, каталог услуг, чек-лист документов, напоминания',
        'bot-dlya-avtoservisa': '. Запись, отслеживание ремонта, уведомления, напоминания',
        'bot-dlya-eventa': '. Портфолио, калькулятор стоимости, запись, предоплата',
        'bot-dlya-videografa': '. Портфолио видео, запись 24/7, калькулятор, предоплата',
        'bot-dlya-detskogo-sada': '. Ежедневные отчёты родителям, оплата, объявления',
        'bot-dlya-hr': '. Каталог вакансий, анкета кандидата, фильтрация, уведомления',
        'bot-dlya-joga-studii': '. Запись, абонементы, расписание занятий, лояльность',
        'bot-dlya-mebeli': '. Портфолио работ, калькулятор стоимости, запись на замер',
        'bot-dlya-parikmaxerskoj': '. Запись, программа лояльности, напоминания, предоплата',
        'bot-dlya-pekarni': '. Каталог продукции, онлайн-заказ, доставка, лояльность',
        'bot-dlya-massazha': '. Запись, программа лояльности, напоминания, предоплата',
        'bot-dlya-svadby': '. Портфолио свадеб, калькулятор, запись, предоплата',
        'bot-dlya-dostavki-edy': '. Меню с фото, онлайн-заказ, отслеживание, лояльность',
        'bot-dlya-tancev': '. Запись, абонементы, расписание занятий, лояльность',
        'bot-dlya-strahovki': '. Калькулятор полиса, онлайн-оформление, продление',
        'bot-dlya-logistiki': '. Онлайн-заказ доставки, отслеживание груза, уведомления',
        'bot-dlya-barbershopa': '. Запись, программа лояльности, напоминания, предоплата',
        'bot-dlya-tsvetochnogo': '. Каталог букетов, доставка цветов, напоминания',
        'bot-dlya-atelye': '. Онлайн-заказ, уведомления о готовности, лояльность',
        'bot-dlya-trenera': '. Запись, трекер прогресса, программы тренировок',
        'bot-dlya-himchistki': '. Онлайн-заказ, уведомления о готовности, лояльность',
        'bot-dlya-turagentstva': '. Каталог туров, бронирование, визы, оплата',
        'bot-dlya-avtodilera': '. Каталог авто, тест-драйв, trade-in, follow-up',
        'bot-dlya-avtoslona': '. Каталог авто, тест-драйв, trade-in, кредитный калькулятор',
        'bot-dlya-marketingovogo-agentstva': '. Сбор лидов, портфолио, автоматические отчёты',
        'bot-dlya-studii-zagara': '. Запись, программа лояльности, напоминания, предоплата',
        'bot-dlya-selera-ozon': '. Управление остатками, мониторинг цен, аналитика продаж',
        'bot-dlya-avito-prodavca': '. Автоответы, обработка заказов, управление отзывами',
        'bot-dlya-restorana': '. Меню с фото, онлайн-заказ, оплата, трекинг доставки',
        'bot-dlya-kibersporta': '. Геймификация, скины, турниры, таблица лидеров',
        'bot-dlya-medkliniki': '. Запись к врачу, напоминания, предоплата, результаты',
        'bot-dlya-selera-wb': '. Мониторинг позиций, цен конкурентов, отзывы, аналитика',
        'bot-dlya-dropshippinga': '. Каталог, автооформление заказов, отслеживание',
        'bot-dlya-dizajn-studii': '. Портфолио, автоматический бриф, калькулятор стоимости',
        'bot-dlya-fitnesa': '. Запись на тренировки, абонементы, напоминания',
        'bot-dlya-repetitora': '. Запись учеников, домашние задания, предоплата',
        'bot-dlya-yurista': '. Онлайн-консультации, запись, первичная анкета, предоплата',
        'bot-dlya-fotografa': '. Портфолио, запись, калькулятор, предоплата',
        'bot-dlya-koucha': '. Запись на сессии, ДЗ, трекер прогресса, абонементы',
        'bot-dlya-strojki': '. Калькулятор, запись на замер, портфолио работ',
        'bot-dlya-onlajn-shkoly': '. Продажа курсов, оплата, выдача доступов, расписание',
        'bot-dlya-buhgaltera': '. Сбор документов, личный кабинет, напоминания о сроках',
        'bot-dlya-obrazovatelnogo-soobshchestva': '. Автоматическая модерация, фильтрация спама',
        'bot-dlya-psihologa': '. Запись, конфиденциальность, анкетирование, предоплата',
        'bot-dlya-rieltora': '. Мониторинг площадок 24/7, CRM, ипотечный калькулятор',
        'bot-dlya-smm-agentstva': '. Портфолио кейсов, бриф, калькулятор, отчёты',
        'bot-dlya-klininga': '. Онлайн-калькулятор, приём заказов, оплата, расписание',
        'bot-dlya-stomatologii': '. Запись, карты пациентов, напоминания, предоплата',
        'bot-dlya-vetkliniki': '. Запись, карты питомцев, напоминания, результаты анализов',
    };
    return details[slug] || '. Запись 24/7, напоминания, программа лояльности';
}
