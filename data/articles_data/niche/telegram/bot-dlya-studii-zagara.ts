import { Article, makeArticleSchema } from '../../types';
import { botDlyaStudiiZagaraPart1 } from './texts/bot-dlya-studii-zagara-part1';
import { botDlyaStudiiZagaraPart2 } from './texts/bot-dlya-studii-zagara-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaStudiiZagara: Article = {
    slug: "bot-dlya-studii-zagara",
    title: "Telegram бот для студии загара: запись, лояльность, напоминания",
    metaDescription: "Telegram бот для студии загара от 25 000 ₽. Запись 24/7, программа лояльности, напоминания, оплата. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для студии загара, бот солярий, автоматизация студии загара, telegram бот запись загар",
    h1: "Telegram бот для студии загара: как увеличить визиты на 150% с помощью записи и лояльности",
    ogTitle: "Telegram бот для студии загара — запись 24/7",
    ogDescription: "Как студия загара увеличила визиты на 150% благодаря Telegram-боту. Запись, лояльность, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-studii-zagara`,
    heroBadge: "☀️ Студия загара • Автоматизация • 2026",
    heroSubtitle: "Как студия загара увеличила визиты на 150% за 2 месяца благодаря Telegram-боту. Запись 24/7, лояльность.",
    readingTime: "12 мин чтения",
    wordCount: "~2800 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему студии теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +150% визитов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaStudiiZagaraPart1, ...botDlyaStudiiZagaraPart2],

    faq: [
        {
            question: "Клиенты будут записываться через Telegram?",
            answer: "Да. 80% клиентов уже в Telegram. Запись через бота удобнее звонка: не нужно ждать, можно записаться в любое время.",
        },
        {
            question: "Как работает программа лояльности?",
            answer: "Бонусы за каждый визит. Каждый 5-й сеанс бесплатно. Скидка на день рождения 20%. Приведи друга — бонус.",
        },
        {
            question: "Как быстро окупится бот для студии загара?",
            answer: "За 1-2 недели. При 100 дополнительных визитах в месяц и среднем чеке 2 500 ₽ — это 250 000 ₽/мес.",
        },
    ],

    ctaTitle: "Хотите бота для студии загара от 25 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит визиты на 150%",
    ctaSource: "article-zagar-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-studii-zagara",
        "Telegram бот для студии загара: как увеличить визиты на 150%",
        "Telegram бот для студии загара от 25 000 ₽. Запись, лояльность, напоминания.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Клиенты будут записываться через Telegram?", text: "Да, 80% клиентов уже в Telegram." },
            { name: "Как работает лояльность?", text: "Бонусы, каждый 5-й сеанс бесплатно." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
        ],
        2800,
        [
            { name: "Шаг 1: Анализ услуг", text: "Солярии, цены, расписание." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с записью." },
            { name: "Шаг 3: Настройка лояльности", text: "Бонусы, скидки." },
            { name: "Шаг 4: Запуск", text: "QR-код в студии." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для студии загара", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для салона красоты", url: "/blog/bot-dlya-salona-krasoty", context: "Автоматизация записи" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для фитнеса", url: "/blog/bot-dlya-fitnesa", context: "Автоматизация фитнеса" },
    ],
};
