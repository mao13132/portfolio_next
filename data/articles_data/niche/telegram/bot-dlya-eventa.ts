import { Article, makeArticleSchema } from '../../types';
import { botDlyaEventaPart1 } from './texts/bot-dlya-eventa-part1';
import { botDlyaEventaPart2 } from './texts/bot-dlya-eventa-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaEventa: Article = {
    slug: "bot-dlya-eventa",
    title: "Telegram бот для ивент-агентства: портфолио, калькулятор, запись",
    metaDescription: "Telegram бот для ивент-агентства от 35 000 ₽. Портфолио, калькулятор, запись, предоплата.. Портфолио, калькулятор стоимости. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для ивент агентства, бот мероприятие, автоматизация ивентов",
    h1: "Telegram бот для ивент-агентства: как увеличить заказы на 180%",
    ogTitle: "Telegram бот для ивента — портфолио 24/7",
    ogDescription: "Как ивент-агентство увеличило заказы на 180% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-eventa`,
    heroBadge: "🎉 Ивент • Автоматизация • 2026",
    heroSubtitle: "Как ивент-агентство увеличило заказы на 180% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему агентства теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +180% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaEventaPart1, ...botDlyaEventaPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для ивент-агентства от 35 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-event-cta",
    structuredData: makeArticleSchema("bot-dlya-eventa", "Telegram бот для ивент-агентства", "Telegram бот для ивента от 35 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для свадьбы", url: "/blog/bot-dlya-svadby", context: "Автоматизация свадьбы" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
