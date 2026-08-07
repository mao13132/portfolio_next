import { Article, makeArticleSchema } from '../../types';
import { botDlyaPekarniPart1 } from './texts/bot-dlya-pekarni-part1';
import { botDlyaPekarniPart2 } from './texts/bot-dlya-pekarni-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaPekarni: Article = {
    slug: "bot-dlya-pekarni",
    title: "Telegram бот для пекарни: каталог, заказ, доставка",
    metaDescription: "Telegram бот для пекарни от 25 000 ₽. Каталог продукции, онлайн-заказ, доставка, лояльность.. Каталог продукции, онлайн-зак. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для пекарни, бот пекарня, автоматизация пекарни, telegram бот заказ выпечки",
    h1: "Telegram бот для пекарни: как увеличить заказы на 180% с помощью каталога",
    ogTitle: "Telegram бот для пекарни — каталог 24/7",
    ogDescription: "Как пекарня увеличила заказы на 180% благодаря Telegram-боту. Каталог, заказ, доставка.",
    canonical: `${SITE_URL}/blog/bot-dlya-pekarni`,
    heroBadge: "🍞 Пекарня • Автоматизация • 2026",
    heroSubtitle: "Как пекарня увеличила заказы на 180% за 2 месяца. Каталог, заказ, доставка.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему пекарни теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +180% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaPekarniPart1, ...botDlyaPekarniPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 80% клиентов уже в Telegram." },
        { question: "Бот покажет ассортимент?", answer: "Да. Каталог с фото, ценами, описаниями." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для пекарни от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-pekarnya-cta",
    structuredData: makeArticleSchema("bot-dlya-pekarni", "Telegram бот для пекарни", "Telegram бот для пекарни от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут заказывать через Telegram?", text: "Да, 80% уже в Telegram." },
        { name: "Бот покажет ассортимент?", text: "Да, каталог с фото." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Каталог, цены." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "Ссылки." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для пекарни", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для ресторана", url: "/blog/bot-dlya-restorana", context: "Автоматизация ресторана" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
    ],
};
