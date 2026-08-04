import { Article, makeArticleSchema } from './types';
import { botObratnojSvyaziPart1 } from './texts/bot-obratnoj-svyazi-telegram-part1';
import { botObratnojSvyaziPart2 } from './texts/bot-obratnoj-svyazi-telegram-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotObratnojSvyazi: Article = {
    slug: "bot-obratnoj-svyazi-telegram",
    title: "Telegram бот обратной связи: как настроить сбор отзывов | DimaRazrab",
    metaDescription: "Telegram бот обратной связи: сбор отзывов, опросы, NPS, жалобы. Как настроить автоматический сбор обратной связи от клиентов. Примеры и кейсы →",
    keywords: "бот обратной связи telegram, бот для отзывов, сбор отзывов в telegram, nps в telegram боте, опросы в telegram боте, бот для жалоб, обратная связь бот",
    h1: "Telegram бот обратной связи: как настроить сбор отзывов",
    ogTitle: "Telegram бот обратной связи: сбор отзывов и NPS",
    ogDescription: "Как настроить Telegram-бота обратной связи: сбор отзывов, опросы, NPS-метр, обработка жалоб. Интеграция с CRM и Google Sheets. Кейс с ROI 300%.",
    canonical: `${SITE_URL}/blog/bot-obratnoj-svyazi-telegram`,
    heroBadge: "💬 Обратная связь • 2026",
    heroSubtitle: "Как настроить Telegram-бота обратной связи: сбор отзывов, опросы, NPS-метр, обработка жалоб. Интеграция с CRM и Google Sheets. Реальный кейс с ROI 300%.",
    readingTime: "14 мин чтения",
    wordCount: "~3500 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "vvedenie", title: "Зачем бизнесу бот обратной связи" },
        { id: "vidy-obratnoj-svyazi", title: "Виды обратной связи" },
        { id: "kak-rabotaet", title: "Как работает бот" },
        { id: "oprosy-i-ankety", title: "Настройка опросов" },
        { id: "nps-metr", title: "NPS-метр в Telegram" },
        { id: "obrabotka-zhalob", title: "Обработка жалоб" },
        { id: "integraciya-crm-sheets", title: "Интеграция с CRM" },
        { id: "kejs-otzyvy", title: "Кейс: сбор отзывов" },
        { id: "stoimost", title: "Сколько стоит" },
        { id: "zaklyuchenie", title: "Заключение" },
    ],

    sections: [...botObratnojSvyaziPart1, ...botObratnojSvyaziPart2],

    faq: [
        {
            question: "Что такое бот обратной связи в Telegram?",
            answer: "Это Telegram-бот, который автоматически собирает отзывы, опросы, NPS и жалобы от клиентов. Отправляется запрос после заказа или визита, клиент отвечает прямо в мессенджере. Конверсия в ответ: 40-60% против 5-10% у email-опросов.",
        },
        {
            question: "Какие вопросы задавать в боте обратной связи?",
            answer: "Начните с NPS (0-10) + текстовый комментарий. Потом добавьте оценку конкретных аспектов (качество, доставка, обслуживание). Не больше 5 вопросов — каждый дополнительный снижает конверсию на 10-15%.",
        },
        {
            question: "Как анализировать ответы из бота?",
            answer: "Данные автоматически записываются в Google Таблицы или CRM. Считайте средний NPS еженедельно, отслеживайте динамику, сегментируйте по категориям (качество, доставка, обслуживание). Негативные отзывы — приоритет для реакции.",
        },
        {
            question: "Сколько стоит бот обратной связи?",
            answer: "Базовый (отзывы + уведомления) — от 15 000 ₽. Стандартный (+ NPS + Google Sheets) — от 25 000 ₽. Продвинутый (+ опросы + CRM) — от 40 000 ₽. Полный (+ система жалоб + аналитика) — от 60 000 ₽.",
        },
        {
            question: "Можно ли настроить бота обратной связи без программирования?",
            answer: "Простой бот (оценка + текст) можно сделать через конструктор (BotHelp, Chatfuel). Но для NPS, интеграции с CRM, автоматической маршрутизации жалоб и аналитики нужна кастомная разработка.",
        },
    ],

    ctaTitle: "Хотите настроить сбор отзывов в Telegram?",
    ctaSubtitle: "Бесплатная консультация за 30 минут — разберём вашу задачу и подготовим предложение",
    ctaSource: "article-feedback-cta",

    structuredData: makeArticleSchema(
        "bot-obratnoj-svyazi-telegram",
        "Telegram бот обратной связи: как настроить сбор отзывов",
        "Как настроить Telegram-бота обратной связи: сбор отзывов, опросы, NPS-метр, обработка жалоб. Интеграция с CRM и Google Sheets.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Что такое бот обратной связи?", text: "Telegram-бот для автоматического сбора отзывов, NPS и жалоб. Конверсия 40-60%." },
            { name: "Какие вопросы задавать?", text: "NPS (0-10) + комментарий. Не больше 5 вопросов." },
            { name: "Как анализировать ответы?", text: "Google Таблицы или CRM. Средний NPS еженедельно, сегментация по категориям." },
            { name: "Сколько стоит?", text: "Базовый — от 15 000 ₽. Полный — от 60 000 ₽." },
            { name: "Можно ли без программирования?", text: "Простой бот — да, через конструктор. Сложный — нужна кастомная разработка." },
        ],
        3500,
    ),
    internalLinks: [
        { anchor: "разработка ботов", url: "/razrabotka-botov", context: "Заказать разработку бота обратной связи" },
        { anchor: "как быстро отвечать клиентам", url: "/blog/kak-bystro-otvechat-klientam", context: "Автоматизация ответов клиентам" },
        { anchor: "Telegram-бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Все задачи, которые решает бот для бизнеса" },
        { anchor: "бот для записи клиентов", url: "/blog/bot-dlya-zapisi-klientov", context: "Автоматизация записи на услуги" },
        { anchor: "Telegram-бот рассылка", url: "/blog/telegram-bot-rassylka", context: "Настройка автоматических рассылок клиентам" },
        { anchor: "автоматизация клиентов", url: "/blog/avtomatizaciya-klientov", context: "Автоматизация работы с клиентами" },
    ],
};
