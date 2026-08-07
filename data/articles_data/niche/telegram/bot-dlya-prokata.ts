import { Article, makeArticleSchema } from '../../types';
import { botDlyaProkataPart1 } from './texts/bot-dlya-prokata-part1';
import { botDlyaProkataPart2 } from './texts/bot-dlya-prokata-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaProkata: Article = {
    slug: "bot-dlya-prokata",
    title: "Telegram бот для проката: каталог, бронирование, оплата",
    metaDescription: "Telegram бот для проката от 25 000 ₽. Каталог, бронирование 24/7, оплата, уведомления.. Каталог оборудования, бронирование,. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для проката, бот прокат оборудования, автоматизация проката",
    h1: "Telegram бот для проката: как увеличить заказы на 180%",
    ogTitle: "Telegram бот для проката — каталог 24/7",
    ogDescription: "Как компания проката увеличила заказы на 180% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-prokata`,
    heroBadge: "🔧 Прокат • Автоматизация • 2026",
    heroSubtitle: "Как компания проката увеличила заказы на 180% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему прокат теряет клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +180% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaProkataPart1, ...botDlyaProkataPart2],
    faq: [
        { question: "Клиенты будут бронировать через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для проката от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-prokat-cta",
    structuredData: makeArticleSchema("bot-dlya-prokata", "Telegram бот для проката", "Telegram бот для проката от 25 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
    ],
};
