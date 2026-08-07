import { Article, makeArticleSchema } from '../../types';
import { botDlyaFotografaPart1 } from './texts/bot-dlya-fotografa-part1';
import { botDlyaFotografaPart2 } from './texts/bot-dlya-fotografa-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaFotografa: Article = {
    slug: "bot-dlya-fotografa",
    title: "Telegram бот для фотографа: портфолио, запись, предоплата",
    metaDescription: "Telegram бот для фотографа от 30 000 ₽. Портфолио, запись 24/7, калькулятор, предоплата, напоминания. ROI 500%. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для фотографа, бот фотограф, автоматизация фотографа, telegram бот фотосессия, бот запись фотограф",
    h1: "Telegram бот для фотографа: как увеличить заказы на 180% с помощью портфолио и записи",
    ogTitle: "Telegram бот для фотографа — портфолио 24/7, ROI 500%",
    ogDescription: "Как фотограф увеличил заказы на 180% благодаря Telegram-боту. Портфолио, запись, предоплата. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-fotografa`,
    heroBadge: "📸 Фотограф • Автоматизация • 2026",
    heroSubtitle: "Как фотограф увеличил заказы на 180% за 2 месяца благодаря Telegram-боту. Портфолио, запись 24/7, предоплата.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему фотографы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота для фотографа" },
        { id: "case", title: "Кейс: +180% заказов" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaFotografaPart1, ...botDlyaFotografaPart2],

    faq: [
        {
            question: "Клиенты будут заказывать фотосессию через Telegram?",
            answer: "Да. Telegram — основной мессенджер для общения с фотографами. Бот удобнее переписки: видно портфолио, цены, свободные даты.",
        },
        {
            question: "Как бот показывает портфолио?",
            answer: "Галерея по категориям: портретная, семейная, свадебная. Каждая работа — фото, описание, локация, стоимость. Клиент видит работы до заказа.",
        },
        {
            question: "Можно ли настроить разные цены для разных типов съёмок?",
            answer: "Да. У каждого типа своя стоимость, длительность, количество кадров. Калькулятор рассчитывает цену автоматически по параметрам.",
        },
        {
            question: "Как быстро окупится бот для фотографа?",
            answer: "За 1-2 недели. Одна дополнительная съёмка = 5 000-30 000 ₽. Бот окупается с 1-2 дополнительных заказов.",
        },
    ],

    ctaTitle: "Хотите бота для фотосессий от 30 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит заказы на 180%",
    ctaSource: "article-fotograf-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-fotografa",
        "Telegram бот для фотографа: как увеличить заказы на 180% с помощью портфолио и записи",
        "Telegram бот для фотографа от 30 000 ₽. Портфолио, запись, предоплата. ROI 500%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Клиенты будут заказывать через Telegram?", text: "Да, Telegram — основной мессенджер для фотографов." },
            { name: "Как бот показывает портфолио?", text: "Галерея по категориям с фото и ценами." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели с 1-2 дополнительных съёмок." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ услуг", text: "Изучаем типы съёмок и портфолио." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с портфолио и записью." },
            { name: "Шаг 3: Загрузка работ", text: "Галерея по категориям." },
            { name: "Шаг 4: Запуск", text: "Ссылки в соцсетях." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для фотографа", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
        { anchor: "Telegram бот для салона красоты", url: "/blog/bot-dlya-salona-krasoty", context: "Автоматизация записи" },
    ],
};
