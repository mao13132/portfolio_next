import { Article, makeArticleSchema } from '../../types';
import { botDlyaAvtodileraPart1 } from './texts/bot-dlya-avtodilera-part1';
import { botDlyaAvtodileraPart2 } from './texts/bot-dlya-avtodilera-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaAvtodilera: Article = {
    slug: "bot-dlya-avtodilera",
    title: "Telegram бот для автодилера: каталог авто, тест-драйв, trade-in",
    metaDescription: "Telegram бот для автодилера от 40 000 ₽. Каталог авто, запись на тест-драйв, trade-in, follow-up.. Каталог авто, тест-драйв. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для автодилера, бот автосалон, автоматизация автодилера, telegram бот тест-драйв, бот каталог авто",
    h1: "Telegram бот для автодилера: как увеличить тест-драйвы на 200% и продажи на 150%",
    ogTitle: "Telegram бот для автодилера — каталог 24/7",
    ogDescription: "Как автодилер увеличил тест-драйвы на 200% благодаря Telegram-боту. Каталог, запись, trade-in, follow-up.",
    canonical: `${SITE_URL}/blog/bot-dlya-avtodilera`,
    heroBadge: "🚗 Автодилер • Автоматизация • 2026",
    heroSubtitle: "Как автодилер увеличил тест-драйвы на 200% за 2 месяца благодаря Telegram-боту. Каталог, запись, trade-in.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему автодилеры теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% тест-драйвов" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaAvtodileraPart1, ...botDlyaAvtodileraPart2],

    faq: [
        {
            question: "Клиенты будут смотреть каталог в Telegram?",
            answer: "Да. Telegram удобнее сайта: быстрая загрузка фото, фильтры, запись на тест-драйв в одном чате.",
        },
        {
            question: "Как бот работает с trade-in?",
            answer: "Клиент загружает фото своего авто, указывает параметры. Бот отправляет менеджеру для оценки. Быстрый ответ за 1-2 часа.",
        },
        {
            question: "Можно ли настроить кредитный калькулятор?",
            answer: "Да. Клиент указывает сумму, первоначальный взнос, срок → бот рассчитывает ежемесячный платёж.",
        },
        {
            question: "Как быстро окупится бот для автодилера?",
            answer: "За 1-2 недели. Одна дополнительная продажа = 100 000-500 000 ₽. Бот окупается с первой продажи.",
        },
    ],

    ctaTitle: "Хотите бота для автосалона от 40 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит тест-драйвы на 200%",
    ctaSource: "article-avtodiler-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-avtodilera",
        "Telegram бот для автодилера: как увеличить тест-драйвы на 200%",
        "Telegram бот для автодилера от 40 000 ₽. Каталог, тест-драйв, trade-in.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Клиенты будут смотреть каталог в Telegram?", text: "Да, Telegram удобнее сайта." },
            { name: "Как бот работает с trade-in?", text: "Клиент загружает фото, менеджер оценивает." },
            { name: "Можно ли настроить кредитный калькулятор?", text: "Да, расчёт ежемесячного платежа." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели с первой продажи." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ каталога", text: "Изучаем модели, цены, расписание." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота с каталогом." },
            { name: "Шаг 3: Загрузка каталога", text: "Все модели и комплектации." },
            { name: "Шаг 4: Запуск", text: "Тестирование, запуск." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для автодилера", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
        { anchor: "Telegram бот для риелтора", url: "/blog/bot-dlya-rieltora", context: "Автоматизация продаж" },
    ],
};
