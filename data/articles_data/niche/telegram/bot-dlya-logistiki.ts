import { Article, makeArticleSchema } from '../../types';
import { botDlyaLogistikiPart1 } from './texts/bot-dlya-logistiki-part1';
import { botDlyaLogistikiPart2 } from './texts/bot-dlya-logistiki-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaLogistiki: Article = {
    slug: "bot-dlya-logistiki",
    title: "Telegram бот для логистики: заказ, отслеживание, уведомления",
    metaDescription: "Telegram бот для логистической компании от 35 000 ₽. Онлайн-заказ, отслеживание груза, уведомления.. Онлайн-заказ доставки,. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для логистики, бот логистика, автоматизация логистики, telegram бот отслеживание груза",
    h1: "Telegram бот для логистики: как увеличить заказы на 150% с помощью отслеживания",
    ogTitle: "Telegram бот для логистики — отслеживание 24/7",
    ogDescription: "Как логистическая компания увеличила заказы на 150% благодаря Telegram-боту. Заказ, отслеживание, уведомления.",
    canonical: `${SITE_URL}/blog/bot-dlya-logistiki`,
    heroBadge: "🚚 Логистика • Автоматизация • 2026",
    heroSubtitle: "Как логистическая компания увеличила заказы на 150% за 2 месяца. Онлайн-заказ, отслеживание.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему логистика теряет клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaLogistikiPart1, ...botDlyaLogistikiPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. Telegram удобнее звонка: калькулятор, заказ, отслеживание — всё в одном месте." },
        { question: "Как бот отслеживает груз?", answer: "По трек-номеру. Уведомления на каждом этапе: принят, в пути, доставлен." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 75 дополнительных заказах в месяц." },
    ],
    ctaTitle: "Хотите бота для логистики от 35 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-logistika-cta",
    structuredData: makeArticleSchema("bot-dlya-logistiki", "Telegram бот для логистики", "Telegram бот для логистики от 35 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут заказывать через Telegram?", text: "Да, Telegram удобнее звонка." },
        { name: "Как бот отслеживает груз?", text: "По трек-номеру с уведомлениями." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Процессы, маршруты." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с отслеживанием." },
        { name: "Шаг 3: Запуск", text: "Тестирование, запуск." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для логистики", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
        { anchor: "Telegram бот для доставки еды", url: "/blog/bot-dlya-dostavki-edy", context: "Автоматизация доставки" },
    ],
};
