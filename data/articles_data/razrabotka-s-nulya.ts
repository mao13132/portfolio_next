import { Article, makeArticleSchema } from './types';
import { razrabotkaSNulyaPart1 } from './texts/razrabotka-s-nulya-part1';
import { razrabotkaSNulyaPart2 } from './texts/razrabotka-s-nulya-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleRazrabotkaSNulya: Article = {
    slug: "razrabotka-telegram-bota-s-nulya",
    title: "Как сделать бот для бизнеса: стоимость от 7 000 ₽, от 3 дней",
    metaDescription: "Разработка как сделать бот для бизнеса от 7 000 ₽. Автоматизация продаж и поддержки клиентов, приём заказов 24/7, уведомления. Бесплатная оценка за 24 часа →",
    keywords: "разработка telegram бота с нуля, как создать telegram бота для бизнеса, создание telegram бота с нуля, разработка бота telegram пошагово, telegram бот с нуля, как разработать telegram бота",
    h1: "Разработка Telegram-бота с нуля: пошаговое руководство от разработчика",
    ogTitle: "Разработка Telegram-бота с нуля — пошаговое руководство",
    ogDescription: "Полное руководство по разработке Telegram-бота с нуля: от идеи до запуска. Технологии, сроки, стоимость, частые ошибки.",
    canonical: `${SITE_URL}/blog/razrabotka-telegram-bota-s-nulya`,
    heroBadge: "📖 Пошаговое руководство • 2026",
    heroSubtitle: "Полное руководство по созданию Telegram-бота с нуля: от идеи до запуска. Технологии, архитектура, стоимость, примеры кода и реальные кейсы.",
    readingTime: "18 мин чтения",
    wordCount: "~4800 слов",
    publishDate: "2026-07-31",
    modifiedDate: "2026-08-03",
    author: "Дмитрий Малышев",

    toc: [
        { id: "overview", title: "Обзор процесса" },
        { id: "step-1-idea", title: "Шаг 1: Идея и задача" },
        { id: "step-2-tech", title: "Шаг 2: Выбор технологий" },
        { id: "step-3-architecture", title: "Шаг 3: Архитектура" },
        { id: "step-4-botfather", title: "Шаг 4: Регистрация бота" },
        { id: "step-5-development", title: "Шаг 5: Разработка" },
        { id: "step-6-integrations", title: "Шаг 6: Интеграции" },
        { id: "step-7-testing", title: "Шаг 7: Тестирование" },
        { id: "step-8-deploy", title: "Шаг 8: Запуск" },
        { id: "step-9-promotion", title: "Шаг 9: Продвижение" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "mistakes", title: "Частые ошибки" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...razrabotkaSNulyaPart1, ...razrabotkaSNulyaPart2],

    faq: [
        {
            question: "Можно ли создать Telegram-бота без знания программирования?",
            answer: "Да, с помощью конструкторов (BotMother, Chatfuel, ManyChat). Но функционал ограничен: простые диалоги, без сложных интеграций. Для бизнес-бота с CRM и оплатой нужна индивидуальная разработка.",
        },
        {
            question: "Сколько времени занимает разработка бота?",
            answer: "Простой (сбор заявок) — 3-5 дней. Средний (каталог, CRM) — 7-14 дней. Сложный (магазин, оплата, аналитика) — 14-30 дней. MVP можно запустить за неделю.",
        },
        {
            question: "Какой язык лучше для Telegram-бота?",
            answer: "Python (aiogram 3) — рекомендую для большинства задач. Простой, быстрый, много библиотек. Node.js (grammy) — если команда на JavaScript. Другие языки (Go, Java, C#) — для специфичных задач.",
        },
        {
            question: "Нужен ли сервер для Telegram-бота?",
            answer: "Да. Бот работает 24/7 на сервере. VPS от 300₽/мес (Hetzner, Timeweb). Для прототипа можно использовать бесплатные платформы (Railway, Render).",
        },
        {
            question: "Как подключить оплату к Telegram-боту?",
            answer: "Через Telegram Payments. Подключаете платёжную систему (ЮKassa, Stripe, Тинькофф), бот отправляет инвойс, клиент оплачивает внутри Telegram. Комиссия: 2-5%.",
        },
        {
            question: "Бот может работать без интернета?",
            answer: "Нет. Telegram-бот работает через Telegram API, который требует интернета. Если нужен офлайн-режим — рассмотрите мобильное приложение.",
        },
    ],

    ctaTitle: "Хотите Telegram-бота с нуля от 7 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — разберём вашу задачу и предложим оптимальное решение за 24 часа",
    ctaSource: "article-s-nulya-cta",

    structuredData: makeArticleSchema(
        "razrabotka-telegram-bota-s-nulya",
        "Разработка Telegram-бота с нуля: пошаговое руководство от разработчика",
        "Полное руководство по созданию Telegram-бота с нуля: от идеи до запуска. Технологии, архитектура, стоимость.",
        "2026-07-31", "2026-08-03",
        [
            { name: "Можно ли создать бота без программирования?", text: "Да, через конструкторы, но функционал ограничен." },
            { name: "Сколько времени занимает разработка?", text: "Простой — 3-5 дней, сложный — 14-30 дней." },
            { name: "Какой язык лучше для бота?", text: "Python (aiogram 3) — рекомендую для большинства задач." },
            { name: "Нужен ли сервер?", text: "Да, VPS от 300₽/мес." },
            { name: "Как подключить оплату?", text: "Через Telegram Payments: ЮKassa, Stripe, Тинькофф." },
        ],
        4800,
        [
            { name: "Шаг 1: Идея и задача", text: "Определите, что бот должен делать и для кого." },
            { name: "Шаг 2: Выбор технологий", text: "Python + aiogram, PostgreSQL, VPS." },
            { name: "Шаг 3: Архитектура", text: "Структура проекта, обработчики, база данных." },
            { name: "Шаг 4: Регистрация в BotFather", text: "Создайте бота, получите токен." },
            { name: "Шаг 5: Разработка", text: "Напишите код: обработчики, клавиатуры, FSM." },
            { name: "Шаг 6: Интеграции", text: "CRM, оплата, аналитика, Google Таблицы." },
            { name: "Шаг 7: Тестирование", text: "Проверьте все сценарии на реальных пользователях." },
            { name: "Шаг 8: Запуск", text: "Деплой на сервер, мониторинг." },
            { name: "Шаг 9: Продвижение", text: "Ссылки, QR-код, реклама, соцсети." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать разработку бота", url: "/razrabotka-botov", context: "Не хотите разбираться сами? Закажите разработку" },
        { anchor: "стоимость разработки Telegram-бота", url: "/blog/stoimost-razrabotki", context: "Узнайте подробные цены" },
        { anchor: "Telegram-бот на Python", url: "/blog/kak-sdelat-telegram-bota-na-python", context: "Техническое руководство по Python" },
        { anchor: "Telegram WebApp разработка", url: "/blog/telegram-webapp-razrabotka", context: "Если нужен сложный интерфейс — создайте WebApp" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл: от идеи до запуска и продвижения" },
        { anchor: "Telegram-бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Какие задачи решает бот для бизнеса" },
    ],
};
