import { Article, makeArticleSchema } from '../../types';
import { botDlyaRepetitoraPart1 } from './texts/bot-dlya-repetitora-part1';
import { botDlyaRepetitoraPart2 } from './texts/bot-dlya-repetitora-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaRepetitora: Article = {
    slug: "bot-dlya-repetitora",
    title: "Telegram бот для репетитора: запись, ДЗ, оплата",
    metaDescription: "Telegram бот для репетитора от 30 000 ₽. Запись учеников, домашние задания, предоплата, напоминания. ROI 400%. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для репетитора, бот репетитор, автоматизация репетитора, telegram бот занятия, бот запись учеников",
    h1: "Telegram бот для репетитора: как увеличить число учеников на 200% и автоматизировать занятия",
    ogTitle: "Telegram бот для репетитора — запись 24/7, ROI 400%",
    ogDescription: "Как репетитор увеличил учеников на 200% благодаря Telegram-боту. Запись, ДЗ, предоплата, напоминания. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-repetitora`,
    heroBadge: "📚 Репетитор • Автоматизация • 2026",
    heroSubtitle: "Как репетитор увеличил число учеников на 200% за 2 месяца благодаря Telegram-боту. Запись, ДЗ, предоплата — всё автоматически.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему репетиторы теряют учеников" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота для репетитора" },
        { id: "case", title: "Кейс: +200% учеников" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaRepetitoraPart1, ...botDlyaRepetitoraPart2],

    faq: [
        {
            question: "Ученики будут записываться через Telegram?",
            answer: "Да. 90% учеников уже используют Telegram. Запись через бота удобнее переписки: видно свободное время, можно записаться в любое время.",
        },
        {
            question: "Как бот отправляет домашние задания?",
            answer: "Репетитор создаёт ДЗ через админ-панель: текст, фото, файл. Ученик получает уведомление. Загружает выполненное ДЗ в бота. Репетитор проверяет и ставит оценку.",
        },
        {
            question: "Можно ли настроить разные цены для разных предметов?",
            answer: "Да. У каждого предмета своя стоимость, длительность занятия и расписание. Бот показывает цены ученику до записи.",
        },
        {
            question: "Как бот снижает no-show у репетитора?",
            answer: "Два механизма: предоплата 50% при записи и автоматические напоминания (за день и за час). Снижают no-show с 20% до 4%.",
        },
        {
            question: "Как быстро окупится бот для репетитора?",
            answer: "За 1-2 недели. Один новый ученик = 4 000-15 000 ₽/мес. Бот окупается с 2-3 новых учеников.",
        },
    ],

    ctaTitle: "Хотите бота для занятий от 30 000 ₽ — за 7 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит учеников на 200%",
    ctaSource: "article-repetitor-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-repetitora",
        "Telegram бот для репетитора: как увеличить число учеников на 200% и автоматизировать занятия",
        "Telegram бот для репетитора от 30 000 ₽. Запись, ДЗ, предоплата. ROI 400%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Ученики будут записываться через Telegram?", text: "Да, 90% учеников уже в Telegram." },
            { name: "Как бот отправляет ДЗ?", text: "Через админ-панель с уведомлениями ученику." },
            { name: "Как бот снижает no-show?", text: "Предоплата 50% + напоминания = снижение с 20% до 4%." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели с 2-3 новых учеников." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ расписания", text: "Изучаем поток учеников и предметы." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с записью и ДЗ." },
            { name: "Шаг 3: Настройка", text: "Расписание, цены, ДЗ." },
            { name: "Шаг 4: Запуск", text: "Тестирование, ссылки." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для репетитора", url: "/razrabotka-botov", context: "Получите расчёт стоимости бота" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов для бизнеса" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для онлайн-школы", url: "/blog/bot-dlya-onlajn-shkoly", context: "Автоматизация онлайн-образования" },
        { anchor: "заказать разработку бота", url: "/razrabotka-botov", context: "Бесплатная оценка" },
    ],
};
