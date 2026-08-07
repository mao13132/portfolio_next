import { Article, makeArticleSchema } from '../../types';
import { botDlyaTreneraPart1 } from './texts/bot-dlya-trenera-part1';
import { botDlyaTreneraPart2 } from './texts/bot-dlya-trenera-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaTrenera: Article = {
    slug: "bot-dlya-trenera",
    title: "Telegram бот для тренера: запись, трекер, программы",
    metaDescription: "Telegram бот для персонального тренера от 30 000 ₽. Запись 24/7, трекер прогресса, программы тренировок.. Запись, трекер пр. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для тренера, бот персональный тренер, автоматизация тренера, telegram бот тренировки",
    h1: "Telegram бот для тренера: как увеличить клиентов на 200% с помощью трекера",
    ogTitle: "Telegram бот для тренера — запись 24/7",
    ogDescription: "Как тренер увеличил клиентов на 200% благодаря Telegram-боту. Запись, трекер, программы.",
    canonical: `${SITE_URL}/blog/bot-dlya-trenera`,
    heroBadge: "💪 Тренер • Автоматизация • 2026",
    heroSubtitle: "Как тренер увеличил клиентов на 200% за 2 месяца. Запись, трекер прогресса.",
    readingTime: "12 мин чтения", wordCount: "~2800 слов",
    publishDate: "2026-08-06", modifiedDate: "2026-08-06", author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему тренеры теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% клиентов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaTreneraPart1, ...botDlyaTreneraPart2],
    faq: [
        { question: "Клиенты будут записываться через Telegram?", answer: "Да. 90% клиентов уже в Telegram." },
        { question: "Как работает трекер?", answer: "Вес, объёмы, силовые. Графики прогресса." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели." },
    ],
    ctaTitle: "Хотите бота для тренера от 30 000 ₽?", ctaSubtitle: "Бесплатная консультация", ctaSource: "article-trener-cta",
    structuredData: makeArticleSchema("bot-dlya-trenera", "Telegram бот для тренера", "Telegram бот для тренера от 30 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут записываться через Telegram?", text: "Да, 90% уже в Telegram." },
        { name: "Как работает трекер?", text: "Вес, объёмы, силовые с графиками." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 2800, [
        { name: "Шаг 1: Анализ", text: "Услуги, расписание." },
        { name: "Шаг 2: Разработка", text: "Создаём бота." },
        { name: "Шаг 3: Запуск", text: "Ссылки клиентам." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для тренера", url: "/razrabotka-botov", context: "Получите расчёт" },
        { anchor: "Telegram бот для фитнеса", url: "/blog/bot-dlya-fitnes-kluba", context: "Автоматизация фитнеса" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для коуча", url: "/blog/bot-dlya-koucha", context: "Автоматизация коучинга" },
    ],
};
