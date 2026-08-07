import { Article, makeArticleSchema } from '../../types';
import { botDlyaParikmaxerskojPart1 } from './texts/bot-dlya-parikmaxerskoj-part1';
import { botDlyaParikmaxerskojPart2 } from './texts/bot-dlya-parikmaxerskoj-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaParikmaxerskoj: Article = {
    slug: "bot-dlya-parikmaxerskoj",
    title: "Telegram бот для парикмахерской: запись, лояльность, напоминания",
    metaDescription: "Telegram бот для парикмахерской от 25 000 ₽. Запись 24/7, программа лояльности, напоминания.. Запись, программа лояльности,. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для парикмахерской, бот парикмахерская, автоматизация парикмахерской, telegram бот запись парикмахер",
    h1: "Telegram бот для парикмахерской: как увеличить записи на 175% с помощью лояльности",
    ogTitle: "Telegram бот для парикмахерской — запись 24/7",
    ogDescription: "Как парикмахерская увеличила записи на 175% благодаря Telegram-боту. Запись, лояльность, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-parikmaxerskoj`,
    heroBadge: "💇‍♀️ Парикмахерская • Автоматизация • 2026",
    heroSubtitle: "Как парикмахерская увеличила записи на 175% за 2 месяца. Запись 24/7, лояльность.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему парикмахерские теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +175% записей" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaParikmaxerskojPart1, ...botDlyaParikmaxerskojPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 90% клиентов уже в Telegram." },
        { question: "Как работает лояльность?", answer: "Бонусы за каждый визит. Каждая 5-я стрижка бесплатно." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 140 дополнительных записях в месяц." },
    ],
    ctaTitle: "Хотите бота для парикмахерской от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-parikmaxerskaya-cta",
    structuredData: makeArticleSchema("bot-dlya-parikmaxerskoj", "Telegram бот для парикмахерской", "Telegram бот для парикмахерской от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут записываться через Telegram?", text: "Да, 90% уже в Telegram." },
        { name: "Как работает лояльность?", text: "Каждая 5-я стрижка бесплатно." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, мастера, цены." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с записью." },
        { name: "Шаг 3: Запуск", text: "QR-код в парикмахерской." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для парикмахерской", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для салона красоты", url: "/blog/bot-dlya-salona-krasoty", context: "Автоматизация записи" },
        { anchor: "Telegram бот для барбершопа", url: "/blog/bot-dlya-barbershopa", context: "Автоматизация барбершопа" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
    ],
};
