import { Article, makeArticleSchema } from './types';
import { miniAppPart1 } from './texts/mini-app-part1';
import { miniAppPart2 } from './texts/mini-app-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleTelegramMiniAppChtoEto: Article = {
    slug: "telegram-mini-app-chto-eto",
    title: "Разработка Telegram mini apps: полное руководство — кейсы",
    metaDescription: "Разработка Telegram mini apps от 7 000 ₽. Автоматизация продаж и поддержки клиентов, приём заказов 24/7, уведомления, от 3. Бесплатная оценка за 24 часа →",
    keywords: "telegram mini app, mini apps telegram бот, telegram webapp разработка, веб-приложение telegram, mini app разработка, telegram web app бизнес",
    h1: "Telegram Mini App: что это, когда нужно бизнесу и сколько стоит",
    ogTitle: "Telegram Mini App — веб-приложение внутри Telegram для бизнеса",
    ogDescription: "Что такое Telegram Mini App, чем отличается от бота, когда бизнесу нужно Mini App. Примеры, технологии, стоимость от 50 000 ₽.",
    canonical: `${SITE_URL}/blog/telegram-mini-app-chto-eto`,
    heroBadge: "📱 Mini App • Telegram • 2026",
    heroSubtitle: "Полное руководство: что такое Telegram Mini App, чем отличается от обычного бота, когда бизнесу нужно Mini App и сколько стоит разработка.",
    readingTime: "18 мин чтения",
    wordCount: "~4500 слов",
    publishDate: "2026-08-01",
    modifiedDate: "2026-08-03",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-mini-app", title: "Что такое Telegram Mini App" },
        { id: "mini-app-vs-bot", title: "Чем Mini App отличается от бота" },
        { id: "when-business-needs", title: "Когда бизнесу нужен Mini App" },
        { id: "examples", title: "Примеры Mini App из практики" },
        { id: "technologies", title: "Технологии для разработки" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...miniAppPart1, ...miniAppPart2],

    faq: [
        {
            question: "Telegram Mini App работает только в Telegram?",
            answer: "Да, Mini App открывается только внутри Telegram. Но технически это обычное веб-приложение — его можно адаптировать и для обычного браузера. Многие мои клиенты запускают Mini App как основной канал продаж в Telegram, а позже добавляют отдельный сайт на том же коде.",
        },
        {
            question: "Нужно ли одобрение Telegram для запуска Mini App?",
            answer: "Нет. Mini App привязывается к боту через BotFather, и вы можете запустить его сразу после разработки. Никакого модерации или одобрения не требуется. Достаточно создать бота через @BotFather и указать URL Mini App.",
        },
        {
            question: "Mini App может принимать оплату?",
            answer: "Да. Telegram предоставляет Payments API с поддержкой множества провайдеров (ЮKassa, Stripe, СБП, Robokassa). Комиссия Telegram — 0%. Оплата происходит прямо внутри Mini App, пользователю не нужно покидать Telegram.",
        },
        {
            question: "Сколько пользователей может одновременно использовать Mini App?",
            answer: "Ограничений со стороны Telegram нет. Нагрузка зависит от вашего сервера. Для простых Mini App (до 10 000 пользователей) достаточно VPS за 300–500 ₽/мес. Для высоконагруженных проектов — масштабируемая инфраструктура (от 3 000 ₽/мес).",
        },
        {
            question: "Чем Mini App лучше мобильного приложения?",
            answer: "Главные преимущества: не нужно скачивать (0 порог входа), не нужна регистрация (данные из Telegram), не нужно одобрение App Store/Google Play, стоимость разработки в 3–10 раз ниже. Конверсия в действие выше на 200–400% за счёт отсутствия барьеров.",
        },
        {
            question: "Можно ли обновлять Mini App после запуска?",
            answer: "Да, это главное преимущество веб-приложения. Вы обновляете код на сервере — и все пользователи сразу видят новую версию. Нет необходимости обновлять приложение через App Store. Каждое обновление мгновенное для всех пользователей.",
        },
    ],

    ctaTitle: "Хотите заказать Telegram Mini App?",
    ctaSubtitle: "Бесплатная консультация — разберём вашу задачу, подберём оптимальный стек и оценим стоимость разработки Mini App для вашего бизнеса",
    ctaSource: "article-mini-app-cta",

    structuredData: makeArticleSchema(
        "telegram-mini-app-chto-eto",
        "Telegram Mini App: что это, когда нужно бизнесу и сколько стоит",
        "Telegram Mini App — веб-приложение внутри Telegram. Когда нужно, сколько стоит, примеры. Разработка Mini App от 50 000 ₽.",
        "2026-08-01", "2026-08-03",
        [
            { name: "Что такое Telegram Mini App?", text: "Веб-приложение, работающее внутри интерфейса Telegram. Открывается по кнопке в боте, без скачивания и регистрации." },
            { name: "Чем Mini App отличается от бота?", text: "Бот — текстовый интерфейс с кнопками. Mini App — полноценная веб-страница с произвольным дизайном, формами, каталогами." },
            { name: "Сколько стоит разработка Mini App?", text: "Простой: 50 000–80 000 ₽. Средний: 80 000–150 000 ₽. Сложный: 150 000–300 000 ₽." },
            { name: "Нужно ли одобрение Telegram?", text: "Нет. Mini App привязывается к боту через BotFather и запускается без модерации." },
            { name: "Может ли Mini App принимать оплату?", text: "Да, через Telegram Payments API. Комиссия Telegram — 0%." },
            { name: "Чем Mini App лучше мобильного приложения?", text: "Не нужно скачивать, не нужна регистрация, стоимость в 3–10 раз ниже, конверсия выше на 200–400%." },
        ],
        4500,
    ),

    internalLinks: [
        { anchor: "заказать разработку Mini App", url: "/razrabotka-servisov", context: "Разработка веб-сервисов и Mini App" },
        { anchor: "заказать Telegram бота", url: "/razrabotka-botov", context: "Разработка ботов любой сложности" },
        { anchor: "стоимость разработки Telegram бота", url: "/blog/stoimost-razrabotki", context: "Полный разбор цен на ботов" },
        { anchor: "Telegram бот для магазина", url: "/blog/telegram-bot-dlya-magazina", context: "Каталог и оплата в Telegram" },
        { anchor: "бот для записи клиентов", url: "/blog/bot-dlya-zapisi-klientov", context: "Автоматизация записи" },
        { anchor: "как бот увеличивает продажи", url: "/blog/kak-telegram-bot-uvelichivaet-prodazhi", context: "4 реальных кейса с цифрами" },
        { anchor: "что можно автоматизировать в бизнесе", url: "/blog/chto-mozhno-avtomatizirovat-v-malom-biznese", context: "10 процессов для автоматизации" },
        { anchor: "автоматизация бизнеса", url: "/blog/avtomatizaciya-biznesa-pod-klyuch", context: "Комплексная автоматизация" },
    ],
};
