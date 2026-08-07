import { Article, makeArticleSchema } from '../../types';
import { botDlyaKouchaPart1 } from './texts/bot-dlya-koucha-part1';
import { botDlyaKouchaPart2 } from './texts/bot-dlya-koucha-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaKoucha: Article = {
    slug: "bot-dlya-koucha",
    title: "Telegram бот для коуча: запись, ДЗ, трекер прогресса",
    metaDescription: "Telegram бот для коуча от 30 000 ₽. Запись на сессии, домашние задания, трекер прогресса, абонементы. ROI 600%. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для коуча, бот коучинг, автоматизация коуча, telegram бот сессии, бот запись коуч",
    h1: "Telegram бот для коуча: как увеличить клиентов на 250% и автоматизировать практику",
    ogTitle: "Telegram бот для коуча — запись 24/7, ROI 600%",
    ogDescription: "Как коуч увеличил клиентов на 250% благодаря Telegram-боту. Запись, ДЗ, трекер прогресса. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-koucha`,
    heroBadge: "🎯 Коучинг • Автоматизация • 2026",
    heroSubtitle: "Как коуч увеличил клиентов на 250% за 3 месяца благодаря Telegram-боту. Запись, ДЗ, трекер прогресса — всё автоматически.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему коучи теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота для коуча" },
        { id: "case", title: "Кейс: +250% клиентов" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaKouchaPart1, ...botDlyaKouchaPart2],

    faq: [
        {
            question: "Клиенты будут записываться через Telegram?",
            answer: "Да. 90% клиентов коуча уже используют Telegram. Запись через бота удобнее переписки: видно свободное время, типы сессий, цены.",
        },
        {
            question: "Как работает трекер прогресса?",
            answer: "Клиент оценивает своё состояние по шкале 1-10 перед каждой сессией. Бот строит график. Коуч видит динамику. Клиент видит рост — мотивация растёт.",
        },
        {
            question: "Можно ли настроить абонементы?",
            answer: "Да. Пакеты: 4 сессии -10%, 8 сессий -15%, интенсив 12 сессий -20%. Автоматическое списание. Увеличивает средний чек на 30-40%.",
        },
        {
            question: "Как быстро окупится бот для коуча?",
            answer: "За 1-2 недели. Один новый клиент = 15 000-50 000 ₽/мес. Бот окупается с первого нового клиента.",
        },
    ],

    ctaTitle: "Хотите бота для коучинга от 30 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит клиентов на 250%",
    ctaSource: "article-kouch-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-koucha",
        "Telegram бот для коуча: как увеличить клиентов на 250% и автоматизировать практику",
        "Telegram бот для коуча от 30 000 ₽. Запись, ДЗ, трекер прогресса. ROI 600%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Клиенты будут записываться через Telegram?", text: "Да, 90% клиентов коуча уже в Telegram." },
            { name: "Как работает трекер прогресса?", text: "Оценка 1-10 перед каждой сессией с графиком." },
            { name: "Можно ли настроить абонементы?", text: "Да, пакеты 4/8/12 сессий со скидками." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели с первого нового клиента." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ практики", text: "Изучаем типы сессий и расписание." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с записью и ДЗ." },
            { name: "Шаг 3: Настройка", text: "Шаблоны ДЗ, трекер." },
            { name: "Шаг 4: Запуск", text: "Тестирование, ссылки." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для коуча", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "Telegram бот для психолога", url: "/blog/bot-dlya-psihologa", context: "Автоматизация практики" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для репетитора", url: "/blog/bot-dlya-repetitora", context: "Автоматизация занятий" },
    ],
};
