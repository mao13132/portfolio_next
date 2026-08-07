import { Article, makeArticleSchema } from '../../types';
import { botDlyaAvtoservisaPart1 } from './texts/bot-dlya-avtoservisa-part1';
import { botDlyaAvtoservisaPart2 } from './texts/bot-dlya-avtoservisa-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaAvtoservisa: Article = {
    slug: "bot-dlya-avtoservisa",
    title: "Telegram бот для автосервиса: запись, отслеживание ремонт, уведомления",
    metaDescription: "Telegram бот для автосервиса от 30 000 ₽. Запись 24/7, отслеживание ремонта, уведомления.. Запись, отслеживание ремонта, ув. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для автосервиса, бот автосервис, автоматизация автосервиса",
    h1: "Telegram бот для автосервиса: как увеличить записи на 200%",
    ogTitle: "Telegram бот для автосервиса — запись 24/7",
    ogDescription: "Как автосервис увеличил записи на 200% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-avtoservisa`,
    heroBadge: "🔧 Автосервис • Автоматизация • 2026",
    heroSubtitle: "Как автосервис увеличил записи на 200% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему автосервисы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% записей" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaAvtoservisaPart1, ...botDlyaAvtoservisaPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как бот отслеживает статус ремонта?", answer: "Уведомления: принят, в ремонте, готов." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для автосервиса от 30 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-avtoservis-cta",
    structuredData: makeArticleSchema("bot-dlya-avtoservisa", "Telegram бот для автосервиса", "Telegram бот для автосервиса от 30 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для ремонта техники", url: "/blog/bot-dlya-remonta-tekhniki", context: "Автоматизация ремонта" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
