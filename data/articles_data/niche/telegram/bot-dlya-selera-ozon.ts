import { Article, makeArticleSchema } from '../../types';
import { botDlyaSeleraOzonPart1 } from './texts/bot-dlya-selera-ozon-part1';
import { botDlyaSeleraOzonPart2 } from './texts/bot-dlya-selera-ozon-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaSeleraOzon: Article = {
    slug: "bot-dlya-selera-ozon",
    title: "Telegram бот для селлера Ozon: управление остатками и аналитика",
    metaDescription: "Telegram бот для селлера Ozon от 35 000 ₽. Управление остатками, мониторинг цен, аналитика. ROI 380%. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для селлера ozon, бот ozon, автоматизация ozon, управление остатками ozon telegram",
    h1: "Telegram бот для селлера Ozon: управление остатками, мониторинг цен и увеличение продаж на 290%",
    ogTitle: "Telegram бот для селлера Ozon — управление и аналитика, ROI 380%",
    ogDescription: "Как селлер Ozon увеличил продажи на 290% благодаря Telegram-боту. Управление остатками, мониторинг цен 24/7.",
    canonical: `${SITE_URL}/blog/bot-dlya-selera-ozon`,
    heroBadge: "🛒 Ozon • Селлер • 2026",
    heroSubtitle: "Как селлер Ozon увеличил продажи на 290% за 4 месяца. Управление остатками, мониторинг цен, аналитика 24/7.",
    readingTime: "14 мин чтения", wordCount: "~3500 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему селлеры теряют деньги" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +290% продаж" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Внедрение" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaSeleraOzonPart1, ...botDlyaSeleraOzonPart2],
    faq: [
        { question: "Бот работает через Ozon API?", answer: "Да. Используем официальный Ozon Seller API для управления остатками, ценами, отзывами." },
        { question: "Сколько товаров можно управлять?", answer: "Неограниченно. Бот синхронизирует остатки и цены для всех ваших товаров." },
        { question: "Как быстро окупится бот?", answer: "За 2-4 недели. Управление остатками снижает потери на 95%." },
    ],
    ctaTitle: "Хотите бота для Ozon от 35 000 ₽ — за 5 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит продажи на 290%",
    ctaSource: "article-seller-ozon-cta",
    structuredData: makeArticleSchema("bot-dlya-selera-ozon", "Telegram бот для селлера Ozon: управление остатками, мониторинг цен и увеличение продаж на 290%", "Telegram бот для селлера Ozon от 35 000 ₽.", "2026-08-06", "2026-08-06", [{ name: "Как быстро окупится?", text: "За 2-4 недели." }], 3500, [{ name: "Шаг 1", text: "Список товаров." }]),
    internalLinks: [
        { anchor: "заказать бота для Ozon", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для селлера Wildberries", url: "/blog/bot-dlya-selera-wildberries", context: "Аналогичный бот для WB" },
        { anchor: "Парсер Ozon", url: "/blog/parser-ozon", context: "Сбор данных" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
