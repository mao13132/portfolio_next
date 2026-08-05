import { Article, makeArticleSchema } from './types';
import { nastrojkaTelegramBotaPart1 } from './texts/nastrojka-telegram-bota-part1';
import { nastrojkaTelegramBotaPart2 } from './texts/nastrojka-telegram-bota-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleNastrojkaTelegramBota: Article = {
    slug: "nastrojka-telegram-bota",
    title: "Разработка ботов Telegram Python: цена от 7 000 ₽, от 3 дней",
    metaDescription: "Разработка ботов Telegram Python от 7 000 ₽. Автоматизация продаж и поддержки клиентов, приём заказов 24/7, уведомления. Бесплатная оценка за 24 часа →",
    keywords: "настройка бота telegram, настройка telegram бота, как настроить бота в telegram, webhook telegram бот, команды telegram бота, клавиатура telegram бот",
    h1: "Настройка Telegram бота: пошаговое руководство",
    ogTitle: "Настройка Telegram бота — пошаговое руководство 2026",
    ogDescription: "Полное руководство по настройке Telegram-бота: от регистрации в BotFather до webhook, базы данных, оплаты и рассылки. С примерами кода на Python.",
    canonical: `${SITE_URL}/blog/nastrojka-telegram-bota`,
    heroBadge: "⚙️ Техническое руководство • 2026",
    heroSubtitle: "Пошаговая настройка Telegram-бота: BotFather, webhook, команды, кнопки, база данных, оплата, рассылка. С примерами кода на Python (aiogram).",
    readingTime: "18 мин чтения",
    wordCount: "~4500 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "intro", title: "Введение" },
        { id: "botfather", title: "Регистрация через @BotFather" },
        { id: "webhook-vs-polling", title: "Webhook vs polling" },
        { id: "commands", title: "Настройка команд" },
        { id: "keyboards", title: "Клавиатуры и кнопки" },
        { id: "database", title: "Настройка базы данных" },
        { id: "notifications", title: "Уведомления и рассылка" },
        { id: "payments", title: "Настройка оплаты" },
        { id: "testing", title: "Тестирование и отладка" },
        { id: "case-sapis", title: "Кейс: салон красоты (ROI 300%)" },
        { id: "mistakes", title: "Типичные ошибки" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...nastrojkaTelegramBotaPart1, ...nastrojkaTelegramBotaPart2],

    faq: [
        {
            question: "Сколько времени занимает настройка Telegram бота?",
            answer: "Простой бот (приветствие, кнопки, сбор заявок) — 1-2 дня. Средний (каталог, запись, база данных) — 3-5 дней. Сложный (оплата, рассылка, админ-панель) — 5-10 дней. С нуля, включая тестирование и деплой.",
        },
        {
            question: "Какие инструменты нужны для настройки бота?",
            answer: "Python 3.10+, библиотека aiogram 3.x, редактор кода (VS Code), Telegram-аккаунт, сервер с Python (VPS от 150₽/мес) для продакшна. Для разработки достаточно локального компьютера.",
        },
        {
            question: "Как настроить webhook для Telegram бота?",
            answer: "Нужен сервер с публичным IP и SSL-сертификатом (HTTPS). Установите nginx как reverse proxy, настройте SSL через Let's Encrypt. В коде вызовите bot.set_webhook(url) при запуске. Aiogram предоставляет готовый SimpleRequestHandler для обработки запросов.",
        },
        {
            question: "Можно ли настроить бота без программирования?",
            answer: "Да, с помощью конструкторов ботов (ManyChat, Chatfuel, BotMother). Но они ограничены: нельзя подключить свою базу данных, сложную логику, оплату. Для бизнес-задач лучше заказать разработку у специалиста — это дешевле, чем кажется (от 15 000₽).",
        },
        {
            question: "Как настроить оплату в Telegram боте?",
            answer: "Telegram Payments: выберите провайдера (YooKassa, Stripe, PayMaster), зарегистрируйте его в BotFather, реализуйте send_invoice + обработку pre_checkout_query и successful_payment. Комиссия провайдера — от 2% до 3.5%. Подробнее — в статье.",
        },
    ],

    ctaTitle: "Нужна настройка бота? Сделаю от 7 000 ₽ за 3 дня",
    ctaSubtitle: "Бесплатная консультация за 30 минут — разберём вашу задачу и подготовим план настройки",
    ctaSource: "article-nastrojka-cta",

    structuredData: makeArticleSchema(
        "nastrojka-telegram-bota",
        "Настройка Telegram бота: пошаговое руководство",
        "Полное руководство по настройке Telegram-бота: от регистрации в BotFather до webhook, базы данных, оплаты и рассылки. С примерами кода на Python.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько времени занимает настройка Telegram бота?", text: "От 1-2 дней (простой) до 5-10 дней (сложный) с тестированием и деплоем." },
            { name: "Какие инструменты нужны для настройки бота?", text: "Python 3.10+, aiogram 3.x, VS Code, Telegram-аккаунт, VPS от 150₽/мес." },
            { name: "Как настроить webhook для Telegram бота?", text: "Сервер с SSL + nginx + bot.set_webhook(url). Aiogram предоставляет SimpleRequestHandler." },
            { name: "Можно ли настроить бота без программирования?", text: "Да, через конструкторы, но с ограничениями. Для бизнеса лучше заказать разработку от 15 000₽." },
            { name: "Как настроить оплату в Telegram боте?", text: "Telegram Payments: YooKassa/Stripe + send_invoice. Комиссия от 2%." },
        ],
        4500,
        [
            { name: "Шаг 1: Зарегистрируйте бота", text: "Откройте @BotFather, создайте бота, получите токен." },
            { name: "Шаг 2: Настройте окружение", text: "Python, aiogram, .env файл с токеном." },
            { name: "Шаг 3: Настройте команды", text: "Команды через /setcommands в BotFather." },
            { name: "Шаг 4: Добавьте клавиатуры", text: "Reply-клавиатура для меню, Inline для выбора." },
            { name: "Шаг 5: Подключите базу данных", text: "SQLite для MVP, PostgreSQL для продакшна." },
            { name: "Шаг 6: Настройте webhook и деплой", text: "VPS + nginx + SSL + webhook." },
            { name: "Шаг 7: Протестируйте и запустите", text: "Все сценарии, логирование, бета-тест." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать разработку бота", url: "/razrabotka-botov", context: "Готовы заказать настройку бота?" },
        { anchor: "как сделать Telegram-бота на Python", url: "/blog/kak-sdelat-telegram-bota-na-python", context: "Пошаговое руководство по созданию бота" },
        { anchor: "разработка Telegram-бота с нуля", url: "/blog/razrabotka-telegram-bota-s-nulya", context: "Полный цикл разработки от идеи до запуска" },
        { anchor: "Telegram-бот с оплатой", url: "/blog/telegram-bot-s-oplatoj", context: "Настройка приёма платежей в боте" },
        { anchor: "Telegram-бот рассылка", url: "/blog/telegram-bot-rassylka", context: "Настройка автоматических рассылок" },
        { anchor: "разработка Telegram-бота", url: "/blog/razrabotka-bota-dlya-telegram", context: "Обзор процесса разработки" },
        { anchor: "автоматизация заявок", url: "/blog/avtomatizaciya-zayavok", context: "Как бот принимает заявки 24/7 (кластер B)" },
    ],
};
