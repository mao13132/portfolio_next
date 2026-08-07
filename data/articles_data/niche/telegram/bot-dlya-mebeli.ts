import { Article, makeArticleSchema } from '../../types';
import { botDlyaMebeliPart1 } from './texts/bot-dlya-mebeli-part1';
import { botDlyaMebeliPart2 } from './texts/bot-dlya-mebeli-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaMebeli: Article = {
    slug: "bot-dlya-mebeli",
    title: "Telegram бот для мебельной мастерской: портфолио, калькулятор, запись",
    metaDescription: "Telegram бот для мебельной мастерской от 30 000 ₽. Портфолио, калькулятор, запись на замер. Бесплатная оценка →",
    keywords: "telegram бот для мебели, бот мебельная мастерская, автоматизация мебели",
    h1: "Telegram бот для мебельной мастерской: как увеличить заказы на 150%",
    ogTitle: "Telegram бот для мебели — портфолио 24/7",
    ogDescription: "Как мебельная мастерская увеличила заказы на 150% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-mebeli`,
    heroBadge: "🪑 Мебель • Автоматизация • 2026",
    heroSubtitle: "Как мебельная мастерская увеличила заказы на 150% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему мастерские теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaMebeliPart1, ...botDlyaMebeliPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для мебели от 30 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-mebel-cta",
    structuredData: makeArticleSchema("bot-dlya-mebeli", "Telegram бот для мебельной мастерской", "Telegram бот для мебели от 30 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
    ],
};
