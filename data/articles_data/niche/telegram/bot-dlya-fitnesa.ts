import { Article, makeArticleSchema } from '../../types';
import { botDlyaFitnesaPart1 } from './texts/bot-dlya-fitnesa-part1';
import { botDlyaFitnesaPart2 } from './texts/bot-dlya-fitnesa-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaFitnesa: Article = {
    slug: "bot-dlya-fitnes-kluba",
    title: "Telegram бот для фитнес-клуба: абонементы, расписание, запись",
    metaDescription: "Telegram бот для фитнес-клуба от 45 000 ₽. Запись на тренировки, контроль абонементов, напоминания. ROI 350%.. Запись 24/7,. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для фитнес-клуба, бот запись фитнес, автоматизация фитнес-клуба, бот для спортзала, telegram бот тренировки",
    h1: "Telegram бот для фитнес-клуба: запись, абонементы и увеличение посещаемости на 45%",
    ogTitle: "Telegram бот для фитнес-клуба — запись и абонементы, ROI 350%",
    ogDescription: "Как фитнес-клуб увеличил посещаемость на 45% благодаря Telegram-боту. Запись 24/7, контроль абонементов, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-fitnes-kluba`,
    heroBadge: "💪 Фитнес • Автоматизация • 2026",
    heroSubtitle: "Как фитнес-клуб увеличил посещаемость на 45% за 3 месяца. Запись 24/7, контроль абонементов, напоминания о тренировках.",
    readingTime: "13 мин чтения",
    wordCount: "~3500 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему фитнес-клубы теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота для фитнеса" },
        { id: "case", title: "Кейс: +45% посещаемости" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaFitnesaPart1, ...botDlyaFitnesaPart2],
    faq: [
        { question: "Бот заменит систему управления клубом?", answer: "Нет. Бот дополняет существующую систему: запись, напоминания, контроль абонементов. Интеграция с вашей CRM." },
        { question: "Клиенты будут пользоваться ботом?", answer: "Да. 80% клиентов фитнес-клубов используют Telegram. Бот удобнее звонка: можно записаться в любое время." },
        { question: "Как быстро окупится бот?", answer: "За 2-3 недели. Продление абонементов увеличивается на 62%, no-show снижается на 80%." },
    ],
    ctaTitle: "Хотите бота для фитнес-клуба от 45 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит посещаемость на 45%",
    ctaSource: "article-fitnes-cta",
    structuredData: makeArticleSchema("bot-dlya-fitnes-kluba", "Telegram бот для фитнес-клуба: запись, абонементы и увеличение посещаемости на 45%", "Telegram бот для фитнес-клуба от 45 000 ₽.", "2026-08-06", "2026-08-06", [{ name: "Как быстро окупится?", text: "За 2-3 недели." }], 3500, [{ name: "Шаг 1", text: "Определите тренировки." }, { name: "Шаг 2", text: "Настройте расписание." }]),
    internalLinks: [
        { anchor: "заказать бота для фитнеса", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для записи клиентов", url: "/blog/bot-dlya-zapisi-klientov", context: "Полное руководство по записи" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
