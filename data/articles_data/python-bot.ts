import { Article, makeArticleSchema } from './types';
import { pythonBotPart1 } from './texts/python-bot-part1';
import { pythonBotPart2 } from './texts/python-bot-part2';


export const articlePythonBot: Article = {
    slug: "kak-sdelat-telegram-bota-na-python",
    title: "Как сделать Telegram бота на Python — пошаговое руководство 2026 | DimaRazrab",
    metaDescription: "Пошаговое руководство: как сделать Telegram бота на Python с нуля. Aiogram, python-telegram-bot, webhook, база данных. Код, примеры, деплой.",
    keywords: "как сделать телеграм бота на python, telegram бот python, создать бота telegram python, python telegram бот урок, aiogram tutorial, разработка telegram бота python, бот telegram python пошагово",
    h1: "Как сделать Telegram бота на Python: пошаговое руководство для начинающих",
    ogTitle: "Как сделать Telegram бота на Python — пошаговое руководство",
    ogDescription: "Полный гайд по созданию Telegram-бота на Python: от регистрации бота до деплоя на сервер. Aiogram 3, база данных, webhook.",
    canonical: "https://dima-razrab.com/blog/kak-sdelat-telegram-bota-na-python",
    heroBadge: "🐍 Python • Пошаговый гайд • 2026",
    heroSubtitle: "Научитесь создавать Telegram-ботов на Python с нуля. От простого echo-бота до полноценного приложения с базой данных и деплоем.",
    readingTime: "18 мин чтения",
    wordCount: "~4500 слов",
    publishDate: "2026-03-01",
    modifiedDate: "2026-08-03",
    author: "Дмитрий Малышев",

    toc: [
        { id: "why-python", title: "Почему Python для ботов" },
        { id: "preparation", title: "Подготовка окружения" },
        { id: "botfather", title: "Регистрация бота в BotFather" },
        { id: "first-bot", title: "Первый бот: Hello World" },
        { id: "frameworks", title: "Обзор фреймворков" },
        { id: "aiogram", title: "Бот на Aiogram 3" },
        { id: "handlers", title: "Хендлеры и команды" },
        { id: "keyboards", title: "Клавиатуры и кнопки" },
        { id: "database", title: "Подключение базы данных" },
        { id: "states", title: "Машина состояний (FSM)" },
        { id: "webhook", title: "Webhook vs Polling" },
        { id: "deploy", title: "Деплой на сервер" },
        { id: "errors", title: "Обработка ошибок" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...pythonBotPart1, ...pythonBotPart2],

    faq: [
        {
            question: "Сколько времени нужно, чтобы научиться делать ботов на Python?",
            answer: "Если вы уже знаете Python базово — 1-2 дня на изучение aiogram и создание первого бота. Если Python не знаете — 1-2 недели на основы языка, затем 1-2 дня на бота.",
        },
        {
            question: "Бесплатно ли создание Telegram-бота?",
            answer: "Да! Регистрация бота через BotFather бесплатна. Библиотеки Python — open source. Для хостинга можно использовать бесплатные платы (Railway, Render) или дешёвый VPS (от 149₽/мес).",
        },
        {
            question: "Можно ли сделать бота без знания программирования?",
            answer: "Можно через конструкторы ботов (BotHelp, Manybot), но они сильно ограничены. Для бизнес-бота с CRM, оплатой и аналитикой нужна кастомная разработка.",
        },
        {
            question: "Какой фреймворк лучше: aiogram или python-telegram-bot?",
            answer: "Для большинства проектов рекомендую aiogram 3. Он быстрее (асинхронный), лучше документирован, больше готовых примеров на русском языке.",
        },
        {
            question: "Нужен ли мне сервер для бота?",
            answer: "Для разработки и тестирования — нет, достаточно вашего компьютера. Для продакшена (бот работает 24/7) — нужен сервер или хостинг. VPS от 149₽/мес.",
        },
        {
            question: "Python или Node.js — что лучше для Telegram-бота?",
            answer: "Python проще для начинающих, больше готовых решений и библиотек для Telegram. Node.js быстрее для real-time приложений. Для 90% ботов Python — оптимальный выбор.",
        },
    ],

    ctaTitle: "Нужен профессиональный Telegram-бот?",
    ctaSubtitle: "Создам бота на Python с базой данных, CRM-интеграцией и деплоем на сервер. Бесплатная оценка проекта.",
    ctaSource: "article-python-cta",

    structuredData: makeArticleSchema(
        "kak-sdelat-telegram-bota-na-python",
        "Как сделать Telegram бота на Python — пошаговое руководство 2026",
        "Пошаговое руководство: как сделать Telegram бота на Python с нуля. Aiogram 3, база данных, webhook, деплой.",
        "2026-03-01",
        "2026-08-03",
        [
            { name: "Сколько времени нужно чтобы научиться делать ботов на Python?", text: "1-2 дня если знаете Python, 1-2 недели если нет." },
            { name: "Бесплатно ли создание Telegram-бота?", text: "Да. Регистрация бесплатна, библиотеки open source, хостинг от 149₽/мес." },
            { name: "Можно ли сделать бота без знания программирования?", text: "Через конструкторы можно, но они ограничены. Для бизнеса нужна кастомная разработка." },
            { name: "Какой фреймворк лучше: aiogram или python-telegram-bot?", text: "Для большинства проектов рекомендую aiogram 3." },
            { name: "Нужен ли сервер для бота?", text: "Для продакшена — нужен VPS от 149₽/мес. Для тестирования — достаточно компьютера." },
        ],
        4500,
        [
            { name: "Шаг 1: Установка окружения", text: "Установите Python 3.10+, создайте виртуальное окружение, установите aiogram." },
            { name: "Шаг 2: Регистрация бота", text: "Создайте бота через @BotFather, получите токен." },
            { name: "Шаг 3: Базовый код", text: "Напишите echo-бота, добавьте команды и кнопки." },
            { name: "Шаг 4: База данных", text: "Подключите SQLite/PostgreSQL для хранения данных пользователей." },
            { name: "Шаг 5: Деплой", text: "Разверните бота на VPS, настройте webhook." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать разработку бота на Python", url: "/razrabotka-botov", context: "Не хотите разбираться сами?" },
        { anchor: "создать AI бота в Telegram", url: "/blog/kak-sozdat-ai-bot-telegram", context: "Хотите добавить искусственный интеллект?" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл от идеи до запуска" },
    ],
};
