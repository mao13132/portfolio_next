import { Article, makeArticleSchema } from '../types';
import { sozdanieInternetMagazinaPart1 } from './texts/sozdanie-internet-magazina-part1';
import { sozdanieInternetMagazinaPart2 } from './texts/sozdanie-internet-magazina-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleSozdanieInternetMagazina: Article = {
    slug: "sozdanie-internet-magazina",
    title: "Создание интернет-магазина на заказ: стоимость, этапы, платформы | DimaRazrab",
    metaDescription: "Создание интернет-магазина на заказ от 80 000 ₽. Shopify, WooCommerce, 1С-Битрикс, кастомная разработка. Реальные кейсы. Оценка бесплатно →",
    keywords: "создание интернет-магазина, сайт магазина на заказ, сайт интернет магазин на заказ, сайт онлайн магазин на заказ, заказать интернет магазин 1с битрикс, создание интернет магазина стоимость, разработка интернет магазина, интернет магазин под ключ, создать интернет магазин цена, заказать интернет магазин",
    h1: "Создание интернет-магазина на заказ: стоимость, платформы и этапы разработки",
    ogTitle: "Создание интернет-магазина: стоимость от 80 000 ₽, платформы, этапы",
    ogDescription: "Полное руководство: как создать интернет-магазин на заказ. Сравнение платформ, стоимость, этапы разработки, интеграции, реальные кейсы.",
    canonical: `${SITE_URL}/blog/sozdanie-internet-magazina`,
    heroBadge: "🖥️ Веб-разработка • E-commerce • Магазины",
    heroSubtitle: "Полное руководство: создание интернет-магазина от 80 000 ₽. Сравнение платформ, этапы, интеграции с 1С и CRM. Реальные кейсы.",
    readingTime: "20 мин чтения",
    wordCount: "~4600 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-online-store", title: "Что такое интернет-магазин на заказ" },
        { id: "platforms", title: "Платформы для интернет-магазина" },
        { id: "development-stages", title: "Этапы разработки" },
        { id: "features", title: "Функции интернет-магазина" },
        { id: "cost", title: "Стоимость создания" },
        { id: "integrations", title: "Интеграции" },
        { id: "cases", title: "Кейсы" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...sozdanieInternetMagazinaPart1, ...sozdanieInternetMagazinaPart2],

    faq: [
        {
            question: "Сколько стоит создание интернет-магазина?",
            answer: "WooCommerce — от 80 000 ₽, Shopify — от 50 000 ₽, 1С-Битрикс — от 100 000 ₽, кастомная разработка — от 150 000 ₽. Точную смету подготовлю за 24 часа.",
        },
        {
            question: "Какую платформу выбрать для интернет-магазина?",
            answer: "Бюджет до 150K — WooCommerce или Shopify. Нужна интеграция с 1С — 1С-Битрикс. Важны производительность и SEO — кастом на Next.js + Django.",
        },
        {
            question: "Сколько времени занимает создание?",
            answer: "Простой магазин — 30-45 дней. Средний — 45-60 дней. Сложный с 1С и маркетплейсами — 60-120 дней.",
        },
        {
            question: "Нужна ли интеграция с 1С?",
            answer: "Если более 100 товаров и ведёте учёт в 1С — да. Автоматическая синхронизация экономит 2-4 часа в день и исключает ошибки.",
        },
        {
            question: "Как принимать оплату на сайте?",
            answer: "ЮKassa, Robokassa, Сбербанк, Tinkoff. Комиссия 2-3.5%. Также СБП (0.4-0.7%), наличные при получении, рассрочка.",
        },
        {
            question: "Как привлечь первых покупателей?",
            answer: "Контекстная реклама (Яндекс.Директ) — быстрый старт. SEO — долгосрочный канал. Маркетплейсы — дополнительный канал.",
        },
    ],

    ctaTitle: "Хотите интернет-магазин с оплатой и доставкой?",
    ctaSubtitle: "Создам магазин на WooCommerce или 1С-Битрикс от 80 000 ₽. Интеграция с 1С, СДЭК, ЮKassa. Бесплатная оценка за 24 часа.",
    ctaSource: "article-sozdanie-internet-magazina-cta",

    structuredData: makeArticleSchema(
        "sozdanie-internet-magazina",
        "Создание интернет-магазина на заказ: стоимость, этапы, платформы",
        "Создание интернет-магазина на заказ от 80 000 ₽. Shopify, WooCommerce, 1С-Битрикс, кастомная разработка.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько стоит интернет-магазин?", text: "WooCommerce от 80K ₽, Shopify от 50K ₽, Битрикс от 100K ₽, кастом от 150K ₽." },
            { name: "Какую платформу выбрать?", text: "Зависит от бюджета и задач. Для 1С — Битрикс, для SEO — кастом." },
            { name: "Сколько времени занимает?", text: "Простой — 30-45 дней, средний — 45-60, сложный — 60-120 дней." },
            { name: "Нужна ли интеграция с 1С?", text: "При 100+ товарах — да. Экономит 2-4 часа/день." },
            { name: "Как принимать оплату?", text: "ЮKassa, Robokassa, Сбербанк. Комиссия 2-3.5%." },
            { name: "Как привлечь покупателей?", text: "Яндекс.Директ для быстрого старта, SEO для долгосрочного роста." },
        ],
        4600,
    ),

    internalLinks: [
        { anchor: "заказать разработку интернет-магазина", url: "/razrabotka-servisov", context: "Разработка сервисов и магазинов" },
        { anchor: "сайты на заказ", url: "/blog/sajty-na-zakaz", context: "Полное руководство по сайтам на заказ" },
        { anchor: "создание лендинга", url: "/blog/sozdanie-lendinga", context: "Руководство по созданию лендингов" },
        { anchor: "разработка сайта под ключ", url: "/blog/razrabotka-sajta-pod-klyuch-veb", context: "Этапы и стоимость разработки" },
        { anchor: "создание сайта-каталога", url: "/blog/sozdanie-sajta-kataloga", context: "Если нужен каталог без корзины" },
        { anchor: "разработка CRM", url: "/razrabotka-crm", context: "CRM-системы для управления заказами" },
        { anchor: "парсеры маркетплейсов", url: "/blog/parser-wildberries", context: "Аналитика для интернет-магазина" },
        { anchor: "Telegram-бот для магазина", url: "/blog/telegram-bot-dlya-magazina", context: "Бот для приёма заказов в Telegram" },
    ],
};
