import { Article, makeArticleSchema } from '../../types';
import { botDlyaDropshippingaPart1 } from './texts/bot-dlya-dropshippinga-part1';
import { botDlyaDropshippingaPart2 } from './texts/bot-dlya-dropshippinga-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaDropshippinga: Article = {
    slug: "bot-dlya-dropshippinga",
    title: "Telegram бот для дропшиппинга: каталог, заказ, отслеживание",
    metaDescription: "Telegram бот для дропшиппинга от 35 000 ₽. Каталог, автоматическое оформление, отслеживание, мониторинг цен. ROI 520%. Бесплатная оценка →",
    keywords: "telegram бот для дропшиппинга, бот дропшиппинг, автоматизация дропшиппинга, telegram бот магазин",
    h1: "Telegram бот для дропшиппинга: как увеличить оборот на 280% и автоматизировать заказы",
    ogTitle: "Telegram бот для дропшиппинга — автооформление, ROI 520%",
    ogDescription: "Как дропшиппер увеличил оборот на 280% благодаря Telegram-боту. Каталог, автооформление, отслеживание. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-dropshippinga`,
    heroBadge: "📦 Дропшиппинг • Автоматизация • 2026",
    heroSubtitle: "Как дропшиппер увеличил оборот на 280% за 3 месяца благодаря Telegram-боту. Каталог, автооформление, отслеживание.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему дропшипперы теряют прибыль" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +280% оборота" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaDropshippingaPart1, ...botDlyaDropshippingaPart2],

    faq: [
        {
            question: "Бот автоматически оформляет заказы у поставщика?",
            answer: "Да. Бот принимает заказ от клиента → автоматически оформляет на сайте поставщика → получает трек-номер → отправляет клиенту.",
        },
        {
            question: "Как бот отслеживает цены поставщика?",
            answer: "Бот проверяет цены каждые 6 часов. Если цена выросла — уведомляет и автоматически корректирует наценку.",
        },
        {
            question: "Можно ли подключить несколько поставщиков?",
            answer: "Да. Бот поддерживает несколько поставщиков. Клиент выбирает товар — бот определяет поставщика и оформляет заказ.",
        },
        {
            question: "Как быстро окупится бот для дропшиппинга?",
            answer: "За 1-2 недели. При 50 дополнительных заказах в день и среднем чеке 2 000 ₽ — это 3 000 000 ₽/мес дополнительного оборота.",
        },
    ],

    ctaTitle: "Хотите бота для дропшиппинга от 35 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит оборот на 280%",
    ctaSource: "article-dropshipping-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-dropshippinga",
        "Telegram бот для дропшиппинга: как увеличить оборот на 280%",
        "Telegram бот для дропшиппинга от 35 000 ₽. Каталог, автооформление, отслеживание. ROI 520%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Бот автоматически оформляет заказы?", text: "Да, без ручного ввода." },
            { name: "Как бот отслеживает цены?", text: "Проверяет каждые 6 часов." },
            { name: "Можно ли подключить несколько поставщиков?", text: "Да, бот поддерживает несколько." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ поставщика", text: "Изучаем каталог и цены." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с каталогом." },
            { name: "Шаг 3: Интеграция", text: "Подключение к поставщику." },
            { name: "Шаг 4: Запуск", text: "Тестирование, запуск." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для дропшиппинга", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "Telegram бот для селлера Wildberries", url: "/blog/bot-dlya-selera-wb", context: "Автоматизация маркетплейсов" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для Avito", url: "/blog/bot-dlya-avito-prodavca", context: "Автоматизация продаж" },
    ],
};
