import { Article, makeArticleSchema } from '../../types';
import { botDlyaDizajnStudiiPart1 } from './texts/bot-dlya-dizajn-studii-part1';
import { botDlyaDizajnStudiiPart2 } from './texts/bot-dlya-dizajn-studii-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaDizajnStudii: Article = {
    slug: "bot-dlya-dizajn-studii",
    title: "Telegram бот для дизайн-студии: портфолио, бриф, калькулятор",
    metaDescription: "Telegram бот для дизайн-студии от 35 000 ₽. Портфолио, автоматический бриф, калькулятор, управление проектами. ROI 600%.. П. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для дизайн студии, бот дизайн, автоматизация дизайн студии, telegram бот портфолио",
    h1: "Telegram бот для дизайн-студии: как увеличить заказы на 150% с помощью портфолио и брифа",
    ogTitle: "Telegram бот для дизайн-студии — портфолио 24/7, ROI 600%",
    ogDescription: "Как дизайн-студия увеличила заказы на 150% благодаря Telegram-боту. Портфолио, бриф, калькулятор. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-dizajn-studii`,
    heroBadge: "🎨 Дизайн • Автоматизация • 2026",
    heroSubtitle: "Как дизайн-студия увеличила заказы на 150% за 2 месяца благодаря Telegram-боту. Портфолио, бриф, калькулятор.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему дизайн-студии теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% заказов" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaDizajnStudiiPart1, ...botDlyaDizajnStudiiPart2],

    faq: [
        {
            question: "Клиенты будут заказывать дизайн через Telegram?",
            answer: "Да. Telegram удобнее email: видно портфолио, цены, можно заполнить бриф за 5 минут.",
        },
        {
            question: "Как бот показывает портфолио?",
            answer: "Галерея по категориям: логотипы, веб-дизайн, приложения, полиграфия. Каждый кейс с макетами и описанием.",
        },
        {
            question: "Можно ли настроить калькулятор под свои тарифы?",
            answer: "Да. Калькулятор настраивается: тип проекта, сложность, сроки, количество правок.",
        },
        {
            question: "Как быстро окупится бот для дизайн-студии?",
            answer: "За 1-2 недели. Один новый проект = 20 000-200 000 ₽. Бот окупается с первого нового проекта.",
        },
    ],

    ctaTitle: "Хотите бота для дизайн-студии от 35 000 ₽ — за 10 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит заказы на 150%",
    ctaSource: "article-dizajn-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-dizajn-studii",
        "Telegram бот для дизайн-студии: как увеличить заказы на 150% с помощью портфолио и брифа",
        "Telegram бот для дизайн-студии от 35 000 ₽. Портфолио, бриф, калькулятор. ROI 600%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Клиенты будут заказывать дизайн через Telegram?", text: "Да, Telegram удобнее email." },
            { name: "Как бот показывает портфолио?", text: "Галерея по категориям с макетами." },
            { name: "Можно ли настроить калькулятор?", text: "Да, под ваши тарифы." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели с первого проекта." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ услуг", text: "Изучаем кейсы, тарифы." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с портфолио." },
            { name: "Шаг 3: Загрузка работ", text: "Галерея по категориям." },
            { name: "Шаг 4: Запуск", text: "Тестирование, ссылки." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для дизайн-студии", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "Telegram бот для SMM-агентства", url: "/blog/bot-dlya-smm-agentstva", context: "Автоматизация агентства" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для фотографа", url: "/blog/bot-dlya-fotografa", context: "Автоматизация фотографа" },
    ],
};
