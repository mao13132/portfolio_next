import { Article, makeArticleSchema } from '../../types';
import { botDlyaRemontaTekhnikiPart1 } from './texts/bot-dlya-remonta-tekhniki-part1';
import { botDlyaRemontaTekhnikiPart2 } from './texts/bot-dlya-remonta-tekhniki-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaRemontaTekhniki: Article = {
    slug: "bot-dlya-remonta-tekhniki",
    title: "Telegram бот для ремонта техники: заказ, отслеживание, уведомления",
    metaDescription: "Telegram бот для сервиса ремонта от 25 000 ₽. Заказ, отслеживание статуса, уведомления. Бесплатная оценка →",
    keywords: "telegram бот для ремонта техники, бот сервисный центр, автоматизация ремонта, telegram бот ремонт",
    h1: "Telegram бот для ремонта техники: как увеличить заказы на 175% с помощью отслеживания",
    ogTitle: "Telegram бот для ремонта техники — отслеживание 24/7",
    ogDescription: "Как сервис ремонта увеличил заказы на 175% благодаря Telegram-боту. Заказ, отслеживание, уведомления.",
    canonical: `${SITE_URL}/blog/bot-dlya-remonta-tekhniki`,
    heroBadge: "🔧 Ремонт • Автоматизация • 2026",
    heroSubtitle: "Как сервис ремонта увеличил заказы на 175% за 2 месяца. Заказ, отслеживание.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему сервисы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +175% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaRemontaTekhnikiPart1, ...botDlyaRemontaTekhnikiPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 80% клиентов уже в Telegram." },
        { question: "Как бот отслеживает статус ремонта?", answer: "Уведомления: принят, в ремонте, готов." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 70 дополнительных заказах в месяц." },
    ],
    ctaTitle: "Хотите бота для сервиса ремонта от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-remont-cta",
    structuredData: makeArticleSchema("bot-dlya-remonta-tekhniki", "Telegram бот для ремонта техники", "Telegram бот для ремонта от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут заказывать через Telegram?", text: "Да, 80% уже в Telegram." },
        { name: "Как бот отслеживает статус?", text: "Уведомления на каждом этапе." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, цены, сроки." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с отслеживанием." },
        { name: "Шаг 3: Запуск", text: "QR-код в сервисе." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для ремонта", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
        { anchor: "Telegram бот для логистики", url: "/blog/bot-dlya-logistiki", context: "Автоматизация доставки" },
    ],
};
