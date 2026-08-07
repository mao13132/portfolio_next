import { Article, makeArticleSchema } from '../../types';
import { botDlyaDetskogoSadaPart1 } from './texts/bot-dlya-detskogo-sada-part1';
import { botDlyaDetskogoSadaPart2 } from './texts/bot-dlya-detskogo-sada-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaDetskogoSada: Article = {
    slug: "bot-dlya-detskogo-sada",
    title: "Telegram бот для детского сада: отчёты, оплата, объявления",
    metaDescription: "Telegram бот для детского сада от 30 000 ₽. Ежедневные отчёты, оплата, объявления, запись. Бесплатная оценка →",
    keywords: "telegram бот для детского сада, бот детский сад, автоматизация детского сада, telegram бот отчёты родителям",
    h1: "Telegram бот для детского сада: как увеличить набор на 150% и доверие родителей",
    ogTitle: "Telegram бот для детского сада — отчёты 24/7",
    ogDescription: "Как детский сад увеличил набор на 150% благодаря Telegram-боту. Отчёты, оплата, объявления.",
    canonical: `${SITE_URL}/blog/bot-dlya-detskogo-sada`,
    heroBadge: "👶 Детский сад • Автоматизация • 2026",
    heroSubtitle: "Как детский сад увеличил набор на 150% за 2 месяца. Ежедневные отчёты, оплата, объявления.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему сады теряют родителей" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% набора" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaDetskogoSadaPart1, ...botDlyaDetskogoSadaPart2],
    faq: [
        { question: "Родители будут пользоваться ботом?", answer: "Да. 90% родителей уже в Telegram. Бот удобнее звонков и записок." },
        { question: "Как бот отправляет отчёты?", answer: "Воспитатель заполняет шаблон → бот отправляет всем родителям." },
        { question: "Как быстро окупится бот?", answer: "За 2-3 недели. Доверие родителей = больше набор." },
    ],
    ctaTitle: "Хотите бота для детского сада от 30 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-detsad-cta",
    structuredData: makeArticleSchema("bot-dlya-detskogo-sada", "Telegram бот для детского сада", "Telegram бот для детского сада от 30 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Родители будут пользоваться ботом?", text: "Да, 90% уже в Telegram." },
        { name: "Как бот отправляет отчёты?", text: "Воспитатель заполняет шаблон." },
        { name: "Как быстро окупится бот?", text: "За 2-3 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Процессы, расписание." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с отчётами." },
        { name: "Шаг 3: Запуск", text: "Рассылка родителям." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для детского сада", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для онлайн-школы", url: "/blog/bot-dlya-onlajn-shkoly", context: "Автоматизация обучения" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для репетитора", url: "/blog/bot-dlya-repetitora", context: "Автоматизация занятий" },
    ],
};
