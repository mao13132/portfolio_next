import { Article, makeArticleSchema } from '../../types';
import { botDlyaNotariusaPart1 } from './texts/bot-dlya-notariusa-part1';
import { botDlyaNotariusaPart2 } from './texts/bot-dlya-notariusa-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaNotariusa: Article = {
    slug: "bot-dlya-notariusa",
    title: "Telegram бот для нотариуса: запись, документы, напоминания",
    metaDescription: "Telegram бот для нотариуса от 25 000 ₽. Запись 24/7, каталог услуг, чек-лист документов.. Запись, каталог услуг, чек-лист д. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для нотариуса, бот нотариус, автоматизация нотариуса, telegram бот запись нотариус",
    h1: "Telegram бот для нотариуса: как увеличить клиентов на 150% с помощью записи",
    ogTitle: "Telegram бот для нотариуса — запись 24/7",
    ogDescription: "Как нотариус увеличил клиентов на 150% благодаря Telegram-боту. Запись, документы, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-notariusa`,
    heroBadge: "📜 Нотариус • Автоматизация • 2026",
    heroSubtitle: "Как нотариус увеличил клиентов на 150% за 2 месяца. Запись 24/7, каталог услуг.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему нотариусы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% клиентов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaNotariusaPart1, ...botDlyaNotariusaPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 80% клиентов уже в Telegram." },
        { question: "Бот покажет какие документы нужны?", answer: "Да. Для каждой услуги — чек-лист документов." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 60 дополнительных клиентах в месяц." },
    ],
    ctaTitle: "Хотите бота для нотариуса от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-notarius-cta",
    structuredData: makeArticleSchema("bot-dlya-notariusa", "Telegram бот для нотариуса", "Telegram бот для нотариуса от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут записываться через Telegram?", text: "Да, 80% уже в Telegram." },
        { name: "Бот покажет какие документы нужны?", text: "Да, чек-лист для каждой услуги." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, цены, документы." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с каталогом." },
        { name: "Шаг 3: Запуск", text: "QR-код в конторе." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для нотариуса", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для юриста", url: "/blog/bot-dlya-yurista", context: "Автоматизация юриста" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для бухгалтера", url: "/blog/bot-dlya-buhgaltera", context: "Автоматизация бухгалтерии" },
    ],
};
