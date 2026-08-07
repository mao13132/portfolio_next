import { Article, makeArticleSchema } from '../../types';
import { botDlyaMassazhaPart1 } from './texts/bot-dlya-massazha-part1';
import { botDlyaMassazhaPart2 } from './texts/bot-dlya-massazha-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaMassazha: Article = {
    slug: "bot-dlya-massazha",
    title: "Telegram бот для массажной студии: запись, лояльность, напоминания",
    metaDescription: "Telegram бот для массажной студии от 25 000 ₽. Запись 24/7, программа лояльности, напоминания. Бесплатная оценка →",
    keywords: "telegram бот для массажа, бот массажная студия, автоматизация массажа, telegram бот запись массаж",
    h1: "Telegram бот для массажной студии: как увеличить визиты на 200% с помощью лояльности",
    ogTitle: "Telegram бот для массажа — запись 24/7",
    ogDescription: "Как массажная студия увеличила визиты на 200% благодаря Telegram-боту. Запись, лояльность, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-massazha`,
    heroBadge: "💆 Массаж • Автоматизация • 2026",
    heroSubtitle: "Как массажная студия увеличила визиты на 200% за 2 месяца. Запись 24/7, лояльность.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему студии теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% визитов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaMassazhaPart1, ...botDlyaMassazhaPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 85% клиентов уже в Telegram." },
        { question: "Как работает лояльность?", answer: "Бонусы за каждый визит. Каждый 5-й сеанс бесплатно." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 120 дополнительных визитах в месяц." },
    ],
    ctaTitle: "Хотите бота для массажной студии от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-massazh-cta",
    structuredData: makeArticleSchema("bot-dlya-massazha", "Telegram бот для массажной студии", "Telegram бот для массажа от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут записываться через Telegram?", text: "Да, 85% уже в Telegram." },
        { name: "Как работает лояльность?", text: "Каждый 5-й сеанс бесплатно." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, мастера, цены." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с записью." },
        { name: "Шаг 3: Запуск", text: "QR-код в студии." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для массажа", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для салона красоты", url: "/blog/bot-dlya-salona-krasoty", context: "Автоматизация записи" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для фитнеса", url: "/blog/bot-dlya-fitnesa", context: "Автоматизация фитнеса" },
    ],
};
