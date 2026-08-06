import { Article, makeArticleSchema } from './types';
import { telegramWebappPart1 } from './texts/telegram-webapp-part1';
import { telegramWebappPart2 } from './texts/telegram-webapp-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleTelegramWebApp: Article = {
    slug: "telegram-webapp-razrabotka",
    title: "Telegram WebApp разработка: создание Mini App от 40 000 ₽",
    metaDescription: "Разработка telegram бот для онлайн записи клиентов от 7 000 ₽. Автоматизация продаж и поддержки клиентов, приём заказов 24/7,. Бесплатная оценка за 24 часа →",
    keywords: "telegram webapp разработка, telegram web app, webapp telegram бот, создание webapp telegram, mini app telegram, telegram mini apps, разработка webapp для telegram",
    h1: "Telegram WebApp разработка: полное руководство по созданию Mini App",
    ogTitle: "Telegram WebApp разработка — создание Mini App в Telegram",
    ogDescription: "Всё о Telegram WebApp: что это, когда нужен, как создать. Пошаговое руководство с примерами и расчётом стоимости от практикующего разработчика.",
    canonical: `${SITE_URL}/blog/telegram-webapp-razrabotka`,
    heroBadge: "🚀 WebApp • Полное руководство • 2026",
    heroSubtitle: "Всё, что нужно знать о Telegram WebApp (Mini App): от идеи до запуска. Когда обычного бота недостаточно и нужен полноценный интерфейс прямо в Telegram.",
    readingTime: "16 мин чтения",
    wordCount: "~4200 слов",
    publishDate: "2026-07-31",
    modifiedDate: "2026-08-03",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-webapp", title: "Что такое Telegram WebApp" },
        { id: "when-needed", title: "Когда нужен WebApp" },
        { id: "vs-bot", title: "WebApp vs обычный бот" },
        { id: "capabilities", title: "Возможности WebApp" },
        { id: "examples", title: "Примеры WebApp по нишам" },
        { id: "tech-stack", title: "Технологический стек" },
        { id: "how-to-create", title: "Как создать WebApp" },
        { id: "cost", title: "Сколько стоит разработка" },
        { id: "mistakes", title: "Частые ошибки" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...telegramWebappPart1, ...telegramWebappPart2],

    faq: [
        {
            question: "Что такое Telegram WebApp простыми словами?",
            answer: "Это веб-сайт, который открывается внутри Telegram. Пользователь нажимает кнопку в боте и видит полноценный интерфейс: каталог, календарь, форму, калькулятор. Без открытия браузера и без установки приложения.",
        },
        {
            question: "Сколько стоит создать Telegram WebApp?",
            answer: "Простой WebApp (калькулятор, форма) — от 50 000₽. Средний (каталог с оплатой, запись) — 100 000-200 000₽. Сложный (магазин, платформа) — 200 000-400 000₽+. Точная стоимость — после бесплатной консультации.",
        },
        {
            question: "Нужно ли отдельное мобильное приложение, если есть WebApp?",
            answer: "В большинстве случаев — нет. WebApp работает на любом устройстве прямо в Telegram, не требует установки и обновлений. Мобильное приложение нужно только если требуются push-уведомления без бота, офлайн-режим или доступ к камере/датчикам.",
        },
        {
            question: "Как принимать оплату в Telegram WebApp?",
            answer: "Telegram поддерживает встроенные платежи (Telegram Payments). WebApp может отображать страницу оплаты внутри мессенджера. Поддерживаются карты, СБП, электронные кошельки. Комиссия — 2-5% от суммы.",
        },
        {
            question: "Как быстро можно создать Telegram WebApp?",
            answer: "Простой — за 10-15 дней. Средний — за 15-30 дней. Сложный — за 30-60 дней. MVP (минимальная версия) можно запустить за 7-10 дней и постепенно добавлять функции.",
        },
        {
            question: "WebApp или обычный бот — что выбрать?",
            answer: "Если задача — линейный диалог (FAQ, сбор заявок) — достаточно бота. Если нужен визуальный интерфейс (каталог, календарь, формы) — WebApp. WebApp увеличивает конверсию на 30-80% в задачах с выбором.",
        },
    ],

    ctaTitle: "Нужен WebApp от 10 000 ₽ — за 5 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как WebApp увеличит конверсию и автоматизирует процессы",
    ctaSource: "article-webapp-cta",

    structuredData: makeArticleSchema(
        "telegram-webapp-razrabotka",
        "Telegram WebApp разработка: полное руководство по созданию Mini App",
        "Telegram WebApp разработка: что это, когда нужен, сколько стоит. Пошаговое руководство по созданию WebApp в Telegram-боте.",
        "2026-07-31", "2026-08-03",
        [
            { name: "Что такое Telegram WebApp простыми словами?", text: "Веб-сайт, который открывается внутри Telegram без браузера." },
            { name: "Сколько стоит создать Telegram WebApp?", text: "От 50 000₽ до 400 000₽ в зависимости от сложности." },
            { name: "Нужно ли мобильное приложение при наличии WebApp?", text: "В большинстве случаев нет — WebApp работает на любом устройстве." },
            { name: "Как принимать оплату в WebApp?", text: "Через Telegram Payments: карты, СБП, электронные кошельки." },
            { name: "Как быстро можно создать WebApp?", text: "Простой — за 10-15 дней, сложный — за 30-60 дней." },
        ],
        4200,
        [
            { name: "Шаг 1: Определите задачу", text: "Что должен делать WebApp? Каталог, запись, калькулятор?" },
            { name: "Шаг 2: Спроектируйте интерфейс", text: "Нарисуйте макеты экранов и схему переходов." },
            { name: "Шаг 3: Разработайте backend", text: "API, база данных, интеграции с CRM и платёжными системами." },
            { name: "Шаг 4: Разработайте frontend", text: "React + Telegram WebApp SDK, адаптивный дизайн, тёмная тема." },
            { name: "Шаг 5: Интегрируйте с ботом", text: "Бот — точка входа, WebApp — интерфейс для сложных действий." },
            { name: "Шаг 6: Протестируйте и запустите", text: "Тестирование на реальных устройствах, деплой, сбор обратной связи." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать разработку WebApp", url: "/razrabotka-botov", context: "Готовы создать WebApp для вашего бизнеса?" },
        { anchor: "Telegram-бот для приёма заявок", url: "/blog/telegram-bot-dlya-priyoma-zayavok", context: "Если задача простая — начните с обычного бота" },
        { anchor: "стоимость разработки Telegram-бота", url: "/blog/stoimost-razrabotki", context: "Узнайте цены на разработку" },
        { anchor: "Telegram-бот для интернет-магазина", url: "/blog/telegram-bot-dlya-internet-magazina", context: "WebApp — идеальное решение для магазина в Telegram" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл разработки от идеи до запуска" },
    ],
};
