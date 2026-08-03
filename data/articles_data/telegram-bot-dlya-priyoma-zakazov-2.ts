import { Article, makeArticleSchema } from './types';
import { priyomZakazov2Part1 } from './texts/priyom-zakazov-2-part1';
import { priyomZakazov2Part2 } from './texts/priyom-zakazov-2-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleTelegramBotDlyaPriyomaZakazov2: Article = {
    slug: "telegram-bot-dlya-priyoma-zakazov-2",
    title: "Telegram бот для приёма заказов: доставка, еда, товары | DimaRazrab",
    metaDescription: "Telegram бот для автоматического приёма заказов. Каталог, корзина, оплата, уведомления. Заказать бота от 30 000 ₽.",
    keywords: "telegram бот заказ, telegram бот приём заказов, бот для бизнеса в telegram, бот для приёма заказов, автоматизация заказов telegram, заказать бота для заказов, telegram бот доставка",
    h1: "Telegram бот для приёма заказов: доставка, еда, товары — полное руководство",
    ogTitle: "Telegram бот для приёма заказов: доставка, еда, товары",
    ogDescription: "Как автоматизировать приём заказов через Telegram-бота: каталог, корзина, оплата, уведомления. Реальные кейсы с цифрами.",
    canonical: `${SITE_URL}/blog/telegram-bot-dlya-priyoma-zakazov-2`,
    heroBadge: "🛒 Доставка • Еда • Товары • 2026",
    heroSubtitle: "Как Telegram-бот принимает заказы на доставку, еду и товары 24/7. Каталог, корзина, оплата, уведомления — всё в одном боте. Реальные кейсы с ROI.",
    readingTime: "18 мин чтения",
    wordCount: "~4800 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-03",
    author: "Дмитрий Малышев",

    toc: [
        { id: "why-bot", title: "Зачем бизнесу бот для заказов" },
        { id: "how-works", title: "Как работает бот (пошагово)" },
        { id: "features", title: "Функции: каталог, корзина, оплата" },
        { id: "cases", title: "Кейсы из моей практики" },
        { id: "integrations", title: "Интеграция с маркетплейсами и CRM" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...priyomZakazov2Part1, ...priyomZakazov2Part2],

    faq: [
        {
            question: "Сколько стоит бот для приёма заказов?",
            answer: "Простой (каталог + корзина + заявка) — от 30 000₽. Средний (+ оплата + CRM) — 60 000-120 000₽. Сложный (+ WebApp + интеграции) — 120 000-300 000₽.",
        },
        {
            question: "Как клиенты находят бота?",
            answer: "Ссылка на сайте, в соцсетях, QR-код, таргетированная реклама, Telegram-канал. Один клик — клиент в боте.",
        },
        {
            question: "Бот работает с 1С?",
            answer: "Да, автоматическая синхронизация товаров, цен и остатков через API.",
        },
        {
            question: "Что если клиент хочет живого человека?",
            answer: "Кнопка «Связаться с менеджером» — переход в чат. Бот разгружает от рутины, не заменяет людей.",
        },
        {
            question: "Как быстро можно запустить?",
            answer: "Простой — за 7-10 дней, MVP — за 5-7 дней, средний — за 14-21 день.",
        },
        {
            question: "Бот безопасен для оплаты?",
            answer: "Да. Telegram Payments, шифрование, PCI DSS. Данные не хранятся на вашем сервере.",
        },
    ],

    ctaTitle: "Готовы принимать заказы через Telegram-бота?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит количество заказов на 40-70% и окупится за 3-4 дня",
    ctaSource: "article-zakazy-2-cta",

    structuredData: makeArticleSchema(
        "telegram-bot-dlya-priyoma-zakazov-2",
        "Telegram бот для приёма заказов: доставка, еда, товары",
        "Telegram бот для автоматического приёма заказов. Каталог, корзина, оплата, уведомления. Заказать бота от 30 000 ₽.",
        "2026-08-02", "2026-08-03",
        [
            { name: "Сколько стоит бот для заказов?", text: "От 30 000₽ (простой) до 300 000₽ (сложный с WebApp и интеграциями)." },
            { name: "Как клиенты находят бота?", text: "Ссылки на сайте, соцсетях, QR-код, реклама, Telegram-канал." },
            { name: "Бот работает с 1С?", text: "Да, автоматическая синхронизация товаров и остатков через API." },
            { name: "Что если клиент хочет живого человека?", text: "Кнопка «Связаться с менеджером» — переход в чат." },
            { name: "Как быстро можно запустить?", text: "Простой — за 7-10 дней, MVP — за 5-7 дней." },
            { name: "Бот безопасен для оплаты?", text: "Да. Telegram Payments, шифрование, PCI DSS." },
        ],
        4800,
        [
            { name: "Шаг 1: Клиент находит бота", text: "Переход по ссылке, QR-коду или через поиск в Telegram." },
            { name: "Шаг 2: Каталог и выбор", text: "Просмотр категорий, карточек товаров, добавление в корзину." },
            { name: "Шаг 3: Оформление заказа", text: "Имя, телефон, адрес, способ доставки." },
            { name: "Шаг 4: Оплата", text: "Картой онлайн, при получении или переводом." },
            { name: "Шаг 5: Подтверждение", text: "Номер заказа, состав, сумма, срок доставки." },
            { name: "Шаг 6: Отслеживание", text: "Статус заказа в боте с уведомлениями." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для приёма заказов", url: "/razrabotka-botov", context: "Готовы автоматизировать приём заказов?" },
        { anchor: "Telegram-бот для приёма заявок", url: "/blog/telegram-bot-dlya-priyoma-zayavok", context: "Если задача — сбор заявок, а не заказов" },
        { anchor: "Telegram-бот для интернет-магазина", url: "/blog/telegram-bot-dlya-magazina", context: "Подробнее о магазине в Telegram" },
        { anchor: "стоимость разработки бота", url: "/blog/stoimost-razrabotki", context: "Узнайте подробные цены" },
        { anchor: "Telegram-бот для записи клиентов", url: "/blog/bot-dlya-zapisi-klientov", context: "Для салонов и студий" },
        { anchor: "Telegram-бот для продаж", url: "/blog/telegram-bot-dlya-prodazh", context: "Как бот увеличивает продажи" },
        { anchor: "автоматизация бизнеса", url: "/blog/avtomatizaciya-biznesa", context: "Комплексная автоматизация" },
        { anchor: "разработка CRM под ключ", url: "/blog/razrabotka-crm-pod-klyuch", context: "Если нужна полноценная CRM" },
    ],
};
