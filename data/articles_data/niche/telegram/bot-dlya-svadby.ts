import { Article, makeArticleSchema } from '../../types';
import { botDlyaSvadbyPart1 } from './texts/bot-dlya-svadby-part1';
import { botDlyaSvadbyPart2 } from './texts/bot-dlya-svadby-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaSvadby: Article = {
    slug: "bot-dlya-svadby",
    title: "Telegram бот для свадебного агентства: портфолио, калькулятор, запись",
    metaDescription: "Telegram бот для свадебного агентства от 35 000 ₽. Портфолио, калькулятор, запись, предоплата. Бесплатная оценка →",
    keywords: "telegram бот для свадьбы, бот свадебное агентство, автоматизация свадьбы",
    h1: "Telegram бот для свадебного агентства: как увеличить заказы на 150%",
    ogTitle: "Telegram бот для свадьбы — портфолио 24/7",
    ogDescription: "Как свадебное агентство увеличило заказы на 150% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-svadby`,
    heroBadge: "💒 Свадьба • Автоматизация • 2026",
    heroSubtitle: "Как свадебное агентство увеличило заказы на 150% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему агентства теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaSvadbyPart1, ...botDlyaSvadbyPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для свадебного агентства от 35 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-svadba-cta",
    structuredData: makeArticleSchema("bot-dlya-svadby", "Telegram бот для свадебного агентства", "Telegram бот для свадьбы от 35 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "Telegram бот для ивент-агентства", url: "/blog/bot-dlya-eventa", context: "Автоматизация ивентов" },
    ],
};
