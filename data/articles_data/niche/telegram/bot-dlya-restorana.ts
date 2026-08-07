import { Article, makeArticleSchema } from '../../types';
import { botDlyaRestoranaPart1 } from './texts/bot-dlya-restorana-part1';
import { botDlyaRestoranaPart2 } from './texts/bot-dlya-restorana-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaRestorana: Article = {
    slug: "bot-dlya-restorana",
    title: "Telegram бот для ресторана: меню, заказ, доставка, оплата",
    metaDescription: "Telegram бот для ресторана от 50 000 ₽. Меню с фото, онлайн-заказ, оплата, трекинг доставки. ROI 380%. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для ресторана, бот заказ еды telegram, автоматизация ресторана, бот доставка еды, telegram бот кафе",
    h1: "Telegram бот для ресторана: заказ еды через Telegram с оплатой и трекингом доставки",
    ogTitle: "Telegram бот для ресторана — заказ еды, ROI 380%",
    ogDescription: "Как ресторан увеличил заказы на 65% благодаря Telegram-боту. Меню, оплата, трекинг доставки автоматически.",
    canonical: `${SITE_URL}/blog/bot-dlya-restorana`,
    heroBadge: "🍽️ Ресторан • Автоматизация • 2026",
    heroSubtitle: "Как ресторан увеличил заказы на 65% за 3 месяца. Меню с фото, онлайн-заказ, оплата, трекинг доставки.",
    readingTime: "13 мин чтения", wordCount: "~3500 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему рестораны теряют заказы" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +65% заказов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Внедрение" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaRestoranaPart1, ...botDlyaRestoranaPart2],
    faq: [
        { question: "Клиенты будут заказывать через Telegram?", answer: "Да. Telegram удобнее сайта: не нужно скачивать приложение, меню открывается в мессенджере." },
        { question: "Бот заменит сайт ресторана?", answer: "Нет. Бот дополняет сайт: для тех, кто уже в Telegram. Большинство клиентов используют мессенджеры ежедневно." },
        { question: "Как быстро окупится бот?", answer: "За 2-3 недели. Средний чек увеличивается на 25%, повторные заказы на 125%." },
    ],
    ctaTitle: "Хотите бота для ресторана от 50 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит заказы на 65%",
    ctaSource: "article-restoran-cta",
    structuredData: makeArticleSchema("bot-dlya-restorana", "Telegram бот для ресторана: заказ еды через Telegram с оплатой и трекингом доставки", "Telegram бот для ресторана от 50 000 ₽.", "2026-08-06", "2026-08-06", [{ name: "Как быстро окупится?", text: "За 2-3 недели." }], 3500, [{ name: "Шаг 1", text: "Подготовьте меню." }]),
    internalLinks: [
        { anchor: "заказать бота для ресторана", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для приёма заказов", url: "/blog/telegram-bot-dlya-priyoma-zakazov", context: "Полное руководство" },
        { anchor: "Telegram бот для магазина", url: "/blog/telegram-bot-dlya-magazina", context: "Каталог и оплата" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
