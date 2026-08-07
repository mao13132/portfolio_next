import { Article, makeArticleSchema } from '../../types';
import { botDlyaVideografaPart1 } from './texts/bot-dlya-videografa-part1';
import { botDlyaVideografaPart2 } from './texts/bot-dlya-videografa-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaVideografa: Article = {
    slug: "bot-dlya-videografa",
    title: "Telegram бот для видеографа: портфолио, запись, предоплата",
    metaDescription: "Telegram бот для видеографа от 30 000 ₽. Портфолио, запись 24/7, калькулятор, предоплата. Бесплатная оценка →",
    keywords: "telegram бот для видеографа, бот видеограф, автоматизация видеографа",
    h1: "Telegram бот для видеографа: как увеличить заказы на 200%",
    ogTitle: "Telegram бот для видеографа — портфолио 24/7",
    ogDescription: "Как видеограф увеличил заказы на 200% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-videografa`,
    heroBadge: "🎬 Видеограф • Автоматизация • 2026",
    heroSubtitle: "Как видеограф увеличил заказы на 200% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему видеографы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaVideografaPart1, ...botDlyaVideografaPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для видеографа от 30 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-videograf-cta",
    structuredData: makeArticleSchema("bot-dlya-videografa", "Telegram бот для видеографа", "Telegram бот для видеографа от 30 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для фотографа", url: "/blog/bot-dlya-fotografa", context: "Автоматизация фотографа" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
