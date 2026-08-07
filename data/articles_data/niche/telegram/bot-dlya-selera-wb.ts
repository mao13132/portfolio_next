import { Article, makeArticleSchema } from '../../types';
import { botDlyaSeleraWbPart1 } from './texts/bot-dlya-selera-wb-part1';
import { botDlyaSeleraWbPart2 } from './texts/bot-dlya-selera-wb-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaSeleraWb: Article = {
    slug: "bot-dlya-selera-wildberries",
    title: "Telegram бот для селлера Wildberries: мониторинг позиций и аналитика",
    metaDescription: "Telegram бот для селлера Wildberries от 30 000 ₽. Мониторинг позиций, цен конкурентов, отзывов. ROI 420%.. Запись 24/7, нап. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для селлера wildberries, бот wildberries, мониторинг wildberries telegram, автоматизация wildberries",
    h1: "Telegram бот для селлера Wildberries: мониторинг позиций, цен конкурентов и увеличение продаж на 180%",
    ogTitle: "Telegram бот для селлера WB — мониторинг и аналитика, ROI 420%",
    ogDescription: "Как селлер Wildberries увеличил продажи на 180% благодаря Telegram-боту. Мониторинг позиций, цен, отзывов 24/7.",
    canonical: `${SITE_URL}/blog/bot-dlya-selera-wildberries`,
    heroBadge: "🛒 Wildberries • Селлер • 2026",
    heroSubtitle: "Как селлер WB увеличил продажи на 180% за 4 месяца. Мониторинг позиций, цен конкурентов, отзывов 24/7.",
    readingTime: "14 мин чтения", wordCount: "~3500 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему селлеры теряют деньги" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +180% продаж" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Внедрение" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaSeleraWbPart1, ...botDlyaSeleraWbPart2],
    faq: [
        { question: "Бот работает через API Wildberries?", answer: "Да. Используем официальный Wildberries API для получения данных о позициях, ценах, отзывах." },
        { question: "Сколько товаров можно мониторить?", answer: "Неограниченно. Бот проверяет позиции по ключевым запросам для всех ваших товаров." },
        { question: "Как быстро окупится бот?", answer: "За 2-4 недели. Позиции улучшаются, продажи растут на 180%." },
    ],
    ctaTitle: "Хотите бота для WB от 30 000 ₽ — за 5 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит продажи на 180%",
    ctaSource: "article-seller-wb-cta",
    structuredData: makeArticleSchema("bot-dlya-selera-wildberries", "Telegram бот для селлера Wildberries: мониторинг позиций, цен конкурентов и увеличение продаж на 180%", "Telegram бот для селлера Wildberries от 30 000 ₽.", "2026-08-06", "2026-08-06", [{ name: "Как быстро окупится?", text: "За 2-4 недели." }], 3500, [{ name: "Шаг 1", text: "Список товаров." }]),
    internalLinks: [
        { anchor: "заказать бота для WB", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для Wildberries", url: "/blog/telegram-bot-dlya-wildberries", context: "Мониторинг и аналитика" },
        { anchor: "Парсер Wildberries", url: "/blog/parser-wildberries", context: "Сбор данных" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
