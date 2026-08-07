import { Article, makeArticleSchema } from '../../types';
import { botDlyaDostavkiEdyPart1 } from './texts/bot-dlya-dostavki-edy-part1';
import { botDlyaDostavkiEdyPart2 } from './texts/bot-dlya-dostavki-edy-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaDostavkiEdy: Article = {
    slug: "bot-dlya-dostavki-edy",
    title: "Telegram бот для доставки еды: меню, заказ, отслеживание",
    metaDescription: "Telegram бот для доставки еды от 35 000 ₽. Меню с фото, онлайн-заказ, отслеживание, лояльность.. Меню с фото, онлайн-заказ,. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для доставки еды, бот доставка еды, автоматизация доставки",
    h1: "Telegram бот для доставки еды: как увеличить заказы на 250%",
    ogTitle: "Telegram бот для доставки еды — меню 24/7",
    ogDescription: "Как служба доставки увеличила заказы на 250% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-dostavki-edy`,
    heroBadge: "🍕 Доставка еды • Автоматизация • 2026",
    heroSubtitle: "Как служба доставки увеличила заказы на 250% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему доставка теряет клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +250% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaDostavkiEdyPart1, ...botDlyaDostavkiEdyPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. 85% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для доставки еды от 35 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-dostavka-eda-cta",
    structuredData: makeArticleSchema("bot-dlya-dostavki-edy", "Telegram бот для доставки еды", "Telegram бот для доставки от 35 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для ресторана", url: "/blog/bot-dlya-restorana", context: "Автоматизация ресторана" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
