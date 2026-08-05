/* ============================================================
   CALCULATOR DATA — конфигурация калькуляторов стоимости
   ============================================================ */

export interface CalculatorOption {
    id: string;
    label: string;
    description: string;
    price: number;
    icon: string;
}

export interface CalculatorTier {
    id: string;
    label: string;
    description: string;
    basePrice: number;
    minDays: number;
    maxDays: number;
    icon: string;
}

export interface CalculatorConfig {
    title: string;
    subtitle: string;
    tiers: CalculatorTier[];
    options: CalculatorOption[];
    moneyPageUrl: string;
    telegramUrl: string;
}

/* ─── Telegram-бот ─── */
export const botCalculator: CalculatorConfig = {
    title: 'Калькулятор стоимости Telegram-бота',
    subtitle: 'Выберите тип бота и дополнительные функции',
    tiers: [
        { id: 'basic', label: 'Базовый', description: 'Меню, FAQ, квиз, заявка в Telegram', basePrice: 7000, minDays: 3, maxDays: 5, icon: '🤖' },
        { id: 'medium', label: 'Средний', description: '+ запись, напоминания, валидация', basePrice: 15000, minDays: 7, maxDays: 10, icon: '⚡' },
        { id: 'complex', label: 'Сложной', description: '+ CRM, AI, аналитика, админка', basePrice: 40000, minDays: 14, maxDays: 21, icon: '🚀' },
    ],
    options: [
        { id: 'payment', label: 'Оплата (ЮKassa/СБП)', description: 'Приём платежей прямо в боте', price: 5000, icon: '💳' },
        { id: 'crm', label: 'Интеграция с CRM', description: 'amoCRM, Битrix24, 1С', price: 5000, icon: '📊' },
        { id: 'ai', label: 'AI (ChatGPT)', description: 'Умные ответы на основе GPT', price: 10000, icon: '🧠' },
        { id: 'broadcast', label: 'Рассылки', description: 'Массовые сообщения по сегментам', price: 3000, icon: '📢' },
        { id: 'cabinet', label: 'Личный кабинет', description: 'История, бонусы, профиль', price: 5000, icon: '👤' },
        { id: 'admin', label: 'Админ-панель', description: 'Управление через бота или веб', price: 5000, icon: '⚙️' },
        { id: 'reminders', label: 'Напоминания', description: 'Автоматические уведомления', price: 2000, icon: '🔔' },
    ],
    moneyPageUrl: '/razrabotka-botov',
    telegramUrl: 'https://t.me/developer_telegrams',
};

/* ─── Сайт / сервис ─── */
export const siteCalculator: CalculatorConfig = {
    title: 'Калькулятор стоимости сайта',
    subtitle: 'Выберите тип сайта и дополнительные функции',
    tiers: [
        { id: 'landing', label: 'Лендинг', description: '1 страница, форма, адаптив', basePrice: 10000, minDays: 3, maxDays: 5, icon: '📄' },
        { id: 'business', label: 'Визитка', description: '3-5 страниц, навигация, формы', basePrice: 15000, minDays: 5, maxDays: 7, icon: '🏢' },
        { id: 'corporate', label: 'Корпоративный', description: '10+ страниц, SEO, админка', basePrice: 30000, minDays: 10, maxDays: 14, icon: '🏛️' },
        { id: 'shop', label: 'Интернет-магазин', description: 'Каталог, корзина, оплата', basePrice: 50000, minDays: 14, maxDays: 21, icon: '🛒' },
    ],
    options: [
        { id: 'seo', label: 'SEO-оптимизация', description: 'Мета-теги, sitemap, schema.org', price: 5000, icon: '🔍' },
        { id: 'crm', label: 'Интеграция с CRM', description: 'amoCRM, Битrix24', price: 5000, icon: '📊' },
        { id: 'multilang', label: 'Мультиязычность', description: '2-3 языка', price: 5000, icon: '🌍' },
        { id: 'admin', label: 'Админ-панель', description: 'Управление контентом', price: 8000, icon: '⚙️' },
        { id: 'calculator', label: 'Калькулятор/конфигуратор', description: 'Интерактивный элемент', price: 7000, icon: '🧮' },
    ],
    moneyPageUrl: '/razrabotka-servisov',
    telegramUrl: 'https://t.me/developer_telegrams',
};

/* ─── Парсер маркетплейсов ─── */
export const parserCalculator: CalculatorConfig = {
    title: 'Калькулятор стоимости парсера',
    subtitle: 'Выберите сложность парсера и доп. функции',
    tiers: [
        { id: 'basic', label: 'Простой', description: '1 источник, CSV/Excel', basePrice: 10000, minDays: 3, maxDays: 5, icon: '📊' },
        { id: 'medium', label: 'Средний', description: 'Несколько источников, БД, расписание', basePrice: 20000, minDays: 7, maxDays: 10, icon: '⚡' },
        { id: 'complex', label: 'Сложной', description: 'API, аналитика, дашборд, repricer', basePrice: 35000, minDays: 14, maxDays: 21, icon: '🚀' },
    ],
    options: [
        { id: 'bot', label: 'Telegram-бот для отчётов', description: 'Автоматические отчёты в TG', price: 5000, icon: '🤖' },
        { id: 'monitoring', label: 'Мониторинг цен', description: 'Отслеживание изменений 24/7', price: 5000, icon: '📈' },
        { id: 'repricer', label: 'Repricer (автоцены)', description: 'Автоматическое изменение цен', price: 10000, icon: '💰' },
        { id: 'dashboard', label: 'Дашборд с аналитикой', description: 'Визуализация данных', price: 10000, icon: '📊' },
    ],
    moneyPageUrl: '/parsery-marketplejsov',
    telegramUrl: 'https://t.me/developer_telegrams',
};
