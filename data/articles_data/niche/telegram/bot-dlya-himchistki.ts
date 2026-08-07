import { Article, makeArticleSchema } from '../../types';
import { botDlyaHimchistkiPart1 } from './texts/bot-dlya-himchistki-part1';
import { botDlyaHimchistkiPart2 } from './texts/bot-dlya-himchistki-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaHimchistki: Article = {
    slug: "bot-dlya-himchistki",
    title: "Telegram бот для химчистки: заказ, уведомления, лояльность",
    metaDescription: "Telegram бот для химчистки от 25 000 ₽. Онлайн-заказ 24/7, уведомления о готовности, программа лояльности.. Онлайн-заказ, у. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для химчистки, бот химчистка, автоматизация химчистки, telegram бот заказ химчистки",
    h1: "Telegram бот для химчистки: как увеличить заказы на 150% с помощью онлайн-заказа",
    ogTitle: "Telegram бот для химчистки — заказ 24/7",
    ogDescription: "Как химчистка увеличила заказы на 150% благодаря Telegram-боту. Заказ, уведомления, лояльность.",
    canonical: `${SITE_URL}/blog/bot-dlya-himchistki`,
    heroBadge: "👔 Химчистка • Автоматизация • 2026",
    heroSubtitle: "Как химчистка увеличила заказы на 150% за 2 месяца. Онлайн-заказ, уведомления о готовности.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему химчистки теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaHimchistkiPart1, ...botDlyaHimchistkiPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 80% клиентов уже в Telegram. Заказ через бота удобнее звонка." },
        { question: "Бот уведомит о готовности?", answer: "Да. Автоматическое уведомление когда вещи готовы." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 100 дополнительных заказах в месяц." },
    ],
    ctaTitle: "Хотите бота для химчистки от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-himchistka-cta",
    structuredData: makeArticleSchema("bot-dlya-himchistki", "Telegram бот для химчистки", "Telegram бот для химчистки от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут заказывать через Telegram?", text: "Да, 80% уже в Telegram." },
        { name: "Бот уведомит о готовности?", text: "Да, автоматически." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ услуг", text: "Типы вещей, цены, сроки." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с заказом." },
        { name: "Шаг 3: Запуск", text: "QR-код в химчистке." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для химчистки", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для клининга", url: "/blog/bot-dlya-klininga", context: "Автоматизация клининга" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
    ],
};
