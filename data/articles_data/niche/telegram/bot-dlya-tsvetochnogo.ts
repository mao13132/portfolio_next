import { Article, makeArticleSchema } from '../../types';
import { botDlyaTsvetochnogoPart1 } from './texts/bot-dlya-tsvetochnogo-part1';
import { botDlyaTsvetochnogoPart2 } from './texts/bot-dlya-tsvetochnogo-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaTsvetochnogo: Article = {
    slug: "bot-dlya-tsvetochnogo",
    title: "Telegram бот для цветочного: каталог, доставка, лояльность",
    metaDescription: "Telegram бот для цветочного магазина от 25 000 ₽. Каталог букетов, доставка, напоминания о праздниках.. Каталог букетов, до. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для цветочного, бот цветочный магазин, автоматизация цветочного, telegram бот букеты",
    h1: "Telegram бот для цветочного магазина: как увеличить заказы на 200% с помощью каталога",
    ogTitle: "Telegram бот для цветочного — каталог 24/7",
    ogDescription: "Как цветочный магазин увеличил заказы на 200% благодаря Telegram-боту. Каталог, доставка, лояльность.",
    canonical: `${SITE_URL}/blog/bot-dlya-tsvetochnogo`,
    heroBadge: "💐 Цветочный • Автоматизация • 2026",
    heroSubtitle: "Как цветочный магазин увеличил заказы на 200% за 2 месяца. Каталог, доставка.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему цветочные теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaTsvetochnogoPart1, ...botDlyaTsvetochnogoPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 85% клиентов уже в Telegram." },
        { question: "Бот напомнит о праздниках?", answer: "Да. Автоматические напоминания за неделю до праздников." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 80 дополнительных заказах в месяц." },
    ],
    ctaTitle: "Хотите бота для цветочного от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-tsvety-cta",
    structuredData: makeArticleSchema("bot-dlya-tsvetochnogo", "Telegram бот для цветочного магазина", "Telegram бот для цветочного от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут заказывать через Telegram?", text: "Да, 85% уже в Telegram." },
        { name: "Бот напомнит о праздниках?", text: "Да, за неделю автоматически." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Каталог, цены, доставка." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "Ссылки в соцсетях." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для цветочного", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
        { anchor: "Telegram бот для пекарни", url: "/blog/bot-dlya-pekarni", context: "Автоматизация пекарни" },
    ],
};
