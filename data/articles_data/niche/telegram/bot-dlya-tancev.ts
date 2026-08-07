import { Article, makeArticleSchema } from '../../types';
import { botDlyaTancevPart1 } from './texts/bot-dlya-tancev-part1';
import { botDlyaTancevPart2 } from './texts/bot-dlya-tancev-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaTancev: Article = {
    slug: "bot-dlya-tancev",
    title: "Telegram бот для танцевальной школы: запись, абонементы, расписание",
    metaDescription: "Telegram бот для танцевальной школы от 25 000 ₽. Запись 24/7, абонементы, расписание, лояльность. Бесплатная оценка →",
    keywords: "telegram бот для танцев, бот танцевальная школа, автоматизация танцев, telegram бот запись танцы",
    h1: "Telegram бот для танцевальной школы: как увеличить посещаемость на 200%",
    ogTitle: "Telegram бот для танцев — запись 24/7",
    ogDescription: "Как танцевальная школа увеличила посещаемость на 200% благодаря Telegram-боту.",
    canonical: `${SITE_URL}/blog/bot-dlya-tancev`,
    heroBadge: "💃 Танцы • Автоматизация • 2026",
    heroSubtitle: "Как танцевальная школа увеличила посещаемость на 200% за 2 месяца.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему школы теряют учеников" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% посещаемости" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaTancevPart1, ...botDlyaTancevPart2],
    faq: [
        { question: "Ученики будут записываться через Telegram?", answer: "Да. 90% уже в Telegram." },
        { question: "Как работают абонементы?", answer: "4/8/12 занятий со скидками." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для танцев от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-tancy-cta",
    structuredData: makeArticleSchema("bot-dlya-tancev", "Telegram бот для танцевальной школы", "Telegram бот для танцев от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Ученики будут записываться через Telegram?", text: "Да, 90% уже в Telegram." },
        { name: "Как работают абонементы?", text: "4/8/12 занятий со скидками." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Расписание, стили." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "QR-код в школе." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для танцев", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для йоги", url: "/blog/bot-dlya-joga-studii", context: "Автоматизация йоги" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для музыки", url: "/blog/bot-dlya-muzyki", context: "Автоматизация музыки" },
    ],
};
