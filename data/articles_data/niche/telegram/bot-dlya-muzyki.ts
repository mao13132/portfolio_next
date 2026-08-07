import { Article, makeArticleSchema } from '../../types';
import { botDlyaMuzykiPart1 } from './texts/bot-dlya-muzyki-part1';
import { botDlyaMuzykiPart2 } from './texts/bot-dlya-muzyki-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaMuzyki: Article = {
    slug: "bot-dlya-muzyki",
    title: "Telegram бот для музыкальной школы: запись, абонементы, расписание",
    metaDescription: "Telegram бот для музыкальной школы от 25 000 ₽. Запись 24/7, абонементы, расписание.. Запись, абонементы, расписание заняти. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для музыкальной школы, бот музыка, автоматизация музыкальной школы",
    h1: "Telegram бот для музыкальной школы: как увеличить учеников на 180%",
    ogTitle: "Telegram бот для музыки — запись 24/7",
    ogDescription: "Как музыкальная школа увеличила учеников на 180% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-muzyki`,
    heroBadge: "🎵 Музыка • Автоматизация • 2026",
    heroSubtitle: "Как музыкальная школа увеличила учеников на 180% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему школы теряют учеников" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +180% учеников" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaMuzykiPart1, ...botDlyaMuzykiPart2],
    faq: [
        { question: "Ученики будут записываться через Telegram?", answer: "Да. 90% уже в Telegram." },
        { question: "Как работают абонементы?", answer: "4/8/12 занятий со скидками." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для музыкальной школы от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-muzyka-cta",
    structuredData: makeArticleSchema("bot-dlya-muzyki", "Telegram бот для музыкальной школы", "Telegram бот для музыки от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Ученики будут записываться через Telegram?", text: "Да, 90% уже в Telegram." },
        { name: "Как работают абонементы?", text: "4/8/12 занятий со скидками." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Расписание, инструменты." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "QR-код в школе." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для музыки", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для танцев", url: "/blog/bot-dlya-tancev", context: "Автоматизация танцев" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для репетитора", url: "/blog/bot-dlya-repetitora", context: "Автоматизация занятий" },
    ],
};
