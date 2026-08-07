import { Article, makeArticleSchema } from '../../types';
import { botDlyaHrPart1 } from './texts/bot-dlya-hr-part1';
import { botDlyaHrPart2 } from './texts/bot-dlya-hr-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaHr: Article = {
    slug: "bot-dlya-hr",
    title: "Telegram бот для HR-агентства: вакансии, анкеты, фильтрация",
    metaDescription: "Telegram бот для HR-агентства от 30 000 ₽. Каталог вакансий, анкета кандидата, фильтрация.. Каталог вакансий, анкета кандид. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для HR, бот HR агентство, автоматизация подбора персонала",
    h1: "Telegram бот для HR-агентства: как увеличить кандидатов на 300%",
    ogTitle: "Telegram бот для HR — вакансии 24/7",
    ogDescription: "Как HR-агентство увеличило кандидатов на 300% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-hr`,
    heroBadge: "👥 HR • Автоматизация • 2026",
    heroSubtitle: "Как HR-агентство увеличило кандидатов на 300% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему HR теряет кандидатов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +300% кандидатов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaHrPart1, ...botDlyaHrPart2],
    faq: [
        { question: "Кандидаты будут откликаться через Telegram?", answer: "Да. 90% уже в Telegram." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для HR от 30 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-hr-cta",
    structuredData: makeArticleSchema("bot-dlya-hr", "Telegram бот для HR-агентства", "Telegram бот для HR от 30 000 ₽.", "2026-08-06", "2026-08-06", [], 2800),
    internalLinks: [
        { anchor: "заказать бота", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
    ],
};
