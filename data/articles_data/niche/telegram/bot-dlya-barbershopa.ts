import { Article, makeArticleSchema } from '../../types';
import { botDlyaBarbershopaPart1 } from './texts/bot-dlya-barbershopa-part1';
import { botDlyaBarbershopaPart2 } from './texts/bot-dlya-barbershopa-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaBarbershopa: Article = {
    slug: "bot-dlya-barbershopa",
    title: "Telegram бот для барбершопа: запись, лояльность, напоминания",
    metaDescription: "Telegram бот для барбершопа от 25 000 ₽. Запись 24/7, программа лояльности, напоминания, предоплата. Бесплатная оценка →",
    keywords: "telegram бот для барбершопа, бот барбершоп, автоматизация барбершопа, telegram бот запись барбер",
    h1: "Telegram бот для барбершопа: как увеличить записи на 150% с помощью лояльности",
    ogTitle: "Telegram бот для барбершопа — запись 24/7",
    ogDescription: "Как барбершоп увеличил записи на 150% благодаря Telegram-боту. Запись, лояльность, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-barbershopa`,
    heroBadge: "💈 Барбершоп • Автоматизация • 2026",
    heroSubtitle: "Как барбершоп увеличил записи на 150% за 2 месяца. Запись 24/7, лояльность.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему барбершопы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% записей" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaBarbershopaPart1, ...botDlyaBarbershopaPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 90% клиентов барбершопа уже в Telegram." },
        { question: "Как работает лояльность?", answer: "Бонусы за каждый визит. Каждая 5-я стрижка бесплатно." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При 90 дополнительных записях в месяц." },
    ],
    ctaTitle: "Хотите бота для барбершопа от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-barbershop-cta",
    structuredData: makeArticleSchema("bot-dlya-barbershopa", "Telegram бот для барбершопа", "Telegram бот для барбершопа от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут записываться через Telegram?", text: "Да, 90% уже в Telegram." },
        { name: "Как работает лояльность?", text: "Каждая 5-я стрижка бесплатно." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, расписание, цены." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с записью." },
        { name: "Шаг 3: Запуск", text: "QR-код в барбершопе." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для барбершопа", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для салона красоты", url: "/blog/bot-dlya-salona-krasoty", context: "Автоматизация записи" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для парикмахерской", url: "/blog/bot-dlya-parikmaxerskoj", context: "Автоматизация парикмахерской" },
    ],
};
