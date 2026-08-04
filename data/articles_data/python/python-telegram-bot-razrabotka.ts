import { Article, makeArticleSchema } from '../types';
import { pythonTelegramBotRazrabotkaPart1 } from './texts/python-telegram-bot-razrabotka-part1';
import { pythonTelegramBotRazrabotkaPart2 } from './texts/python-telegram-bot-razrabotka-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articlePythonTelegramBotRazrabotka: Article = {
    slug: "python-telegram-bot-razrabotka",
    title: "Разработка Telegram-бота на Python: полное руководство | DimaRazrab",
    metaDescription: "Разработка Telegram-бота на Python: aiogram, архитектура, кейсы. ROI 300-500%. Запись клиентов, лидогенерация, уведомления. От 30 000₽.",
    keywords: "telegram бот на python, разработка telegram бота python, aiogram бот, python telegram bot, заказать telegram бота",
    h1: "Разработка Telegram-бота на Python: полное руководство",
    ogTitle: "Telegram-бот на Python — разработка с ROI 300-500%",
    ogDescription: "Полное руководство по созданию Telegram-ботов на Python. aiogram, архитектура, кейсы. От 30 000₽.",
    canonical: `${SITE_URL}/blog/python-telegram-bot-razrabotka`,
    heroBadge: "🤖 Telegram • Python • Боты",
    heroSubtitle: "Полное руководство по разработке Telegram-ботов на Python. aiogram, архитектура, реальные кейсы с ROI 300-500%.",
    readingTime: "18 мин чтения",
    wordCount: "~5000 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "why-python-telegram", title: "Почему Python для Telegram-ботов" },
        { id: "bot-architecture", title: "Архитектура бота" },
        { id: "case-sapis-cllientov", title: "Кейс: запись клиентов (ROI 300%)" },
        { id: "case-leads-telegram", title: "Кейс: лидогенерация (ROI 500%)" },
        { id: "case-university-tg", title: "Кейс: уведомления (ROI 380%)" },
        { id: "bot-development-process", title: "Процесс разработки" },
        { id: "bot-monetization", title: "Монетизация бота" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...pythonTelegramBotRazrabotkaPart1, ...pythonTelegramBotRazrabotkaPart2],

    faq: [
        {
            question: "Сколько стоит Telegram-бот?",
            answer: "Простой — от 30 000₽. Средний — от 50 000₽. Сложный — от 120 000₽. Точную оценку даю после бесплатной консультации.",
        },
        {
            question: "Сколько времени занимает разработка?",
            answer: "Простой бот — 1-2 недели. Средний — 2-3 недели. Сложный — 3-6 недель.",
        },
        {
            question: "Бот будет работать 24/7?",
            answer: "Да. Бот разворачивается на VPS с автоматическим перезапуском. Аптайм 99.9%+.",
        },
        {
            question: "Можно ли принимать оплату через бота?",
            answer: "Да. Интегрирую ЮKassa, Stripe, СБП. Клиент оплачивает прямо в Telegram.",
        },
        {
            question: "Нужно ли уметь программировать?",
            answer: "Нет. Я разрабатываю бота «под ключ». Админ-панель позволяет управлять без кода.",
        },
    ],

    ctaTitle: "Хотите Telegram-бота для вашего бизнеса?",
    ctaSubtitle: "Бесплатная консультация — обсудим задачу и оценим стоимость. ROI от 300%.",
    ctaSource: "article-python-tg-bot-cta",

    structuredData: makeArticleSchema(
        "python-telegram-bot-razrabotka",
        "Разработка Telegram-бота на Python: полное руководство",
        "Разработка Telegram-бота на Python: aiogram, архитектура, кейсы. ROI 300-500%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Сколько стоит Telegram-бот?", text: "Простой — от 30 000₽. Средний — от 50 000₽. Сложный — от 120 000₽." },
            { name: "Сколько времени занимает разработка?", text: "От 1 до 6 недель в зависимости от сложности." },
            { name: "Какой фреймворк для бота?", text: "aiogram 3.x — асинхронный фреймворк №1 для Telegram." },
            { name: "Бот будет работать 24/7?", text: "Да, на VPS с автоматическим перезапуском." },
            { name: "Можно ли принимать оплату?", text: "Да, ЮKassa, Stripe, СБП." },
        ],
        5000,
    ),

    internalLinks: [
        { anchor: "заказать разработку ботов", url: "/razrabotka-botov", context: "Коммерческая страница" },
        { anchor: "Python-разработка под ключ", url: "/blog/python-razrabotka-pod-klyuch", context: "Полный цикл разработки" },
        { anchor: "Telegram-бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Боты для бизнеса" },
        { anchor: "стоимость разработки бота", url: "/blog/stoimost-razrabotki", context: "Цены на ботов" },
        { anchor: "лидогенерация в Telegram", url: "/blog/kak-najti-klientov-v-telegram", context: "Поиск клиентов" },
    ],
};
