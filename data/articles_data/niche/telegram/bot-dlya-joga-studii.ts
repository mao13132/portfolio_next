import { Article, makeArticleSchema } from '../../types';
import { botDlyaJogaStudiiPart1 } from './texts/bot-dlya-joga-studii-part1';
import { botDlyaJogaStudiiPart2 } from './texts/bot-dlya-joga-studii-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaJogaStudii: Article = {
    slug: "bot-dlya-joga-studii",
    title: "Telegram бот для студии йоги: запись, абонементы, расписание",
    metaDescription: "Telegram бот для студии йоги от 25 000 ₽. Запись 24/7, абонементы, расписание, лояльность.. Запись, абонементы, расписание . Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для йоги, бот студия йоги, автоматизация йоги, telegram бот запись йога",
    h1: "Telegram бот для студии йоги: как увеличить посещаемость на 175% с помощью абонементов",
    ogTitle: "Telegram бот для йоги — запись 24/7",
    ogDescription: "Как студия йоги увеличила посещаемость на 175% благодаря Telegram-боту. Запись, абонементы.",
    canonical: `${SITE_URL}/blog/bot-dlya-joga-studii`,
    heroBadge: "🧘 Йога • Автоматизация • 2026",
    heroSubtitle: "Как студия йоги увеличила посещаемость на 175% за 2 месяца. Запись, абонементы.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему студии йоги теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +175% посещаемости" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaJogaStudiiPart1, ...botDlyaJogaStudiiPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 85% клиентов уже в Telegram." },
        { question: "Как работают абонементы?", answer: "4/8/12 занятий со скидками. Автоматическое списание." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для студии йоги от 25 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-joga-cta",
    structuredData: makeArticleSchema("bot-dlya-joga-studii", "Telegram бот для студии йоги", "Telegram бот для йоги от 25 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут записываться через Telegram?", text: "Да, 85% уже в Telegram." },
        { name: "Как работают абонементы?", text: "4/8/12 занятий со скидками." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Расписание, тренеры." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "QR-код в студии." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для йоги", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для фитнеса", url: "/blog/bot-dlya-fitnes-kluba", context: "Автоматизация фитнеса" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для танцев", url: "/blog/bot-dlya-tancev", context: "Автоматизация танцев" },
    ],
};
