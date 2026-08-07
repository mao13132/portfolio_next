import { Article, makeArticleSchema } from '../../types';
import { botDlyaStrahovkiPart1 } from './texts/bot-dlya-strahovki-part1';
import { botDlyaStrahovkiPart2 } from './texts/bot-dlya-strahovki-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaStrahovki: Article = {
    slug: "bot-dlya-strahovki",
    title: "Telegram бот для страхования: калькулятор, оформление, продление",
    metaDescription: "Telegram бот для страхового агента от 35 000 ₽. Калькулятор, онлайн-оформление, продление полисов. Бесплатная оценка →",
    keywords: "telegram бот для страхования, бот страховой агент, автоматизация страхования",
    h1: "Telegram бот для страхования: как увеличить полисы на 200%",
    ogTitle: "Telegram бот для страхования — калькулятор 24/7",
    ogDescription: "Как страховой агент увеличил полисы на 200% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-strahovki`,
    heroBadge: "🛡️ Страхование • Автоматизация • 2026",
    heroSubtitle: "Как страховой агент увеличил полисы на 200% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему страховые теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% полисов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaStrahovkiPart1, ...botDlyaStrahovkiPart2],
    faq: [
        { question: "Клиенты будут оформлять через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для страхования от 35 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-strahovka-cta",
    structuredData: makeArticleSchema("bot-dlya-strahovki", "Telegram бот для страхования", "Telegram бот для страхования от 35 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
    ],
};
