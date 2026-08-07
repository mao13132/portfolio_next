import { Article, makeArticleSchema } from '../../types';
import { botDlyaAtelyePart1 } from './texts/bot-dlya-atelye-part1';
import { botDlyaAtelyePart2 } from './texts/bot-dlya-atelye-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaAtele: Article = {
    slug: "bot-dlya-atelye",
    title: "Telegram бот для ателье: заказ, уведомления, лояльность",
    metaDescription: "Telegram бот для ателье от 25 000 ₽. Онлайн-заказ 24/7, уведомления о готовности, программа лояльности. Бесплатная оценка →",
    keywords: "telegram бот для ателье, бот ателье, автоматизация ателье, telegram бот пошив одежды",
    h1: "Telegram бот для ателье: как увеличить заказы на 150% с помощью онлайн-заказа",
    ogTitle: "Telegram бот для ателье — заказ 24/7",
    ogDescription: "Как ателье увеличило заказы на 150% благодаря Telegram-боту. Заказ, уведомления, лояльность.",
    canonical: `${SITE_URL}/blog/bot-dlya-atelye`,
    heroBadge: "🧵 Ателье • Автоматизация • 2026",
    heroSubtitle: "Как ателье увеличило заказы на 150% за 2 месяца. Онлайн-заказ, уведомления.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему ателье теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaAtelyePart1, ...botDlyaAtelyePart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 80% клиентов уже в Telegram." },
        { question: "Бот уведомит о готовности?", answer: "Да. Автоматическое уведомление." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для ателье от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-atele-cta",
    structuredData: makeArticleSchema("bot-dlya-atelye", "Telegram бот для ателье", "Telegram бот для ателье от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут заказывать через Telegram?", text: "Да, 80% уже в Telegram." },
        { name: "Бот уведомит о готовности?", text: "Да, автоматически." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, цены." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "QR-код в ателье." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для ателье", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для химчистки", url: "/blog/bot-dlya-himchistki", context: "Автоматизация химчистки" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
    ],
};
