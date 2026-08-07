import { Article, makeArticleSchema } from '../../types';
import { botDlyaTuragentstvaPart1 } from './texts/bot-dlya-turagentstva-part1';
import { botDlyaTuragentstvaPart2 } from './texts/bot-dlya-turagentstva-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaTuragentstva: Article = {
    slug: "bot-dlya-turagentstva",
    title: "Telegram бот для турагентства: туры, бронирование, визы",
    metaDescription: "Telegram бот для турагентства от 40 000 ₽. Каталог туров, бронирование, визы, оплата. ROI 600%.. Каталог туров, бронировани. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для турагентства, бот бронирование туров, автоматизация турагентства, telegram бот туризм",
    h1: "Telegram бот для турагентства: каталог туров, бронирование и автоматизация виз",
    ogTitle: "Telegram бот для турагентства — бронирование, ROI 600%",
    ogDescription: "Как турагентство увеличило оформленные визы на 400% благодаря Telegram-боту. Каталог туров, бронирование, оплата.",
    canonical: `${SITE_URL}/blog/bot-dlya-turagentstva`,
    heroBadge: "🌍 Туризм • Автоматизация • 2026",
    heroSubtitle: "Как турагентство увеличило оформленные визы на 400% за 2 месяца. Каталог туров, бронирование, оплата через Telegram.",
    readingTime: "14 мин чтения", wordCount: "~3500 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему турагентства теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +400% виз" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Внедрение" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaTuragentstvaPart1, ...botDlyaTuragentstvaPart2],
    faq: [
        { question: "Бот заменит сайт турагентства?", answer: "Нет. Бот дополняет сайт: для тех, кто уже в Telegram. Удобнее формы на сайте." },
        { question: "Как бот помогает с визами?", answer: "Бот мониторит сайт посольства 24/7 и автоматически записывает на свободные слоты." },
        { question: "Как быстро окупится бот?", answer: "За 2 недели. Успешность записи в посольство вырастает с 15% до 95%." },
    ],
    ctaTitle: "Хотите бота для турагентства от 40 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит оформление виз на 400%",
    ctaSource: "article-turagentstvo-cta",
    structuredData: makeArticleSchema("bot-dlya-turagentstva", "Telegram бот для турагентства: каталог туров, бронирование и автоматизация виз", "Telegram бот для турагентства от 40 000 ₽.", "2026-08-06", "2026-08-06", [{ name: "Как быстро окупится?", text: "За 2 недели." }], 3500, []),
    internalLinks: [
        { anchor: "заказать бота для турагентства", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
