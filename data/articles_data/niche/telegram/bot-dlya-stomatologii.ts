import { Article, makeArticleSchema } from '../../types';
import { botDlyaStomatologiiPart1 } from './texts/bot-dlya-stomatologii-part1';
import { botDlyaStomatologiiPart2 } from './texts/bot-dlya-stomatologii-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaStomatologii: Article = {
    slug: "bot-dlya-stomatologii",
    title: "Telegram бот для стоматологии: запись, карты пациентов, напоминания",
    metaDescription: "Telegram бот для стоматологии от 40 000 ₽. Запись 24/7, карты пациентов, напоминания о повторных осмотрах. ROI 400%.. Запис. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для стоматологии, бот запись стоматология, автоматизация стоматологии, бот для стоматологической клиники",
    h1: "Telegram бот для стоматологии: запись, карты пациентов и увеличение повторных визитов на 55%",
    ogTitle: "Telegram бот для стоматологии — запись и карты пациентов",
    ogDescription: "Как стоматология увеличила повторные визиты на 55% благодаря Telegram-боту. Запись 24/7, карты пациентов, напоминания.",
    canonical: `${SITE_URL}/blog/bot-dlya-stomatologii`,
    heroBadge: "🦷 Стоматология • Автоматизация • 2026",
    heroSubtitle: "Как стоматология увеличила повторные визиты на 55% за 3 месяца. Запись 24/7, карты пациентов, напоминания об осмотрах.",
    readingTime: "13 мин чтения", wordCount: "~3500 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему стоматологии теряют пациентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +55% повторных визитов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Внедрение" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaStomatologiiPart1, ...botDlyaStomatologiiPart2],
    faq: [
        { question: "Бот поддерживает разные процедуры?", answer: "Да. Лечение, протезирование, отбеливание, имплантация, профилактика. Каждая = цена, длительность." },
        { question: "Как бот напоминает о повторных осмотрах?", answer: "Автоматические напоминания через 3, 6, 12 месяцев. Клиент записывается одним нажатием." },
        { question: "Как быстро окупится бот?", answer: "За 2-3 недели. Повторные визиты увеличиваются на 55%, no-show снижается на 80%." },
    ],
    ctaTitle: "Хотите бота для стоматологии от 40 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит повторные визиты на 55%",
    ctaSource: "article-stomatologiya-cta",
    structuredData: makeArticleSchema("bot-dlya-stomatologii", "Telegram бот для стоматологии: запись, карты пациентов и увеличение повторных визитов на 55%", "Telegram бот для стоматологии от 40 000 ₽.", "2026-08-06", "2026-08-06", [{ name: "Как быстро окупится?", text: "За 2-3 недели." }], 3500, [{ name: "Шаг 1", text: "Определите процедуры." }]),
    internalLinks: [
        { anchor: "заказать бота для стоматологии", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для записи клиентов", url: "/blog/bot-dlya-zapisi-klientov", context: "Полное руководство по записи" },
        { anchor: "Telegram бот для ветклиники", url: "/blog/bot-dlya-vetkliniki", context: "Кейс с картами пациентов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
    ],
};
