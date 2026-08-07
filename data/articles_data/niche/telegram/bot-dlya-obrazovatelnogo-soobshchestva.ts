import { Article, makeArticleSchema } from '../../types';
import { botDlyaObrazovatelnogoSoobshchestvaPart1 } from './texts/bot-dlya-obrazovatelnogo-soobshchestva-part1';
import { botDlyaObrazovatelnogoSoobshchestvaPart2 } from './texts/bot-dlya-obrazovatelnogo-soobshchestva-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaObrazovatelnogoSoobshchestva: Article = {
    slug: "bot-dlya-obrazovatelnogo-soobshchestva",
    title: "Telegram бот для сообщества: модерация и монетизация",
    metaDescription: "Telegram бот для образовательного сообщества от 35 000 ₽. Автоматическая модерация, фильтрация спама, монетизация. ROI 450%.. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для сообщества, бот модерация, автоматизация telegram сообщества, бот фильтрация заявок",
    h1: "Telegram бот для образовательного сообщества: как увеличить доход на 180% через качественную модерацию",
    ogTitle: "Telegram бот для сообщества — модерация 24/7, ROI 450%",
    ogDescription: "Как образовательное сообщество увеличило доход на 180% благодаря боту-модератору. Фильтрация спама, монетизация. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-obrazovatelnogo-soobshchestva`,
    heroBadge: "🎓 Образование • Модерация • 2026",
    heroSubtitle: "Как образовательное сообщество увеличило доход на 180% за 2 месяца благодаря боту-модератору. Фильтрация спама, монетизация.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему сообщества теряют аудиторию" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +180% дохода" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaObrazovatelnogoSoobshchestvaPart1, ...botDlyaObrazovatelnogoSoobshchestvaPart2],

    faq: [
        {
            question: "Бот не отпугнет реальных участников?",
            answer: "Нет. Квалифицирующие вопросы занимают 30 секунд. Заинтересованный участник пройдёт их без проблем. Спамеры и боты — нет.",
        },
        {
            question: "Как бот фильтрует спам?",
            answer: "Проверяет возраст аккаунта, активность, количество подписок, ответы на вопросы. 95% спама блокируется автоматически.",
        },
        {
            question: "Можно ли настроить вопросы под свою нишу?",
            answer: "Да. Вопросы настраиваются: тематика, уровень подготовки, ожидания. Каждое сообщество — свои вопросы.",
        },
        {
            question: "Как быстро окупится бот для сообщества?",
            answer: "За 1-2 недели. При конверсии 8% и среднем чеке 10 000 ₽ — каждый 1000 качественных участников = 800 000 ₽.",
        },
    ],

    ctaTitle: "Хотите бота-модератора для сообщества от 35 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит доход на 180%",
    ctaSource: "article-obshchestvo-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-obrazovatelnogo-soobshchestva",
        "Telegram бот для образовательного сообщества: как увеличить доход на 180%",
        "Telegram бот для сообщества от 35 000 ₽. Модерация, фильтрация, монетизация. ROI 450%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Бот не отпугнет реальных участников?", text: "Нет, квалификация занимает 30 секунд." },
            { name: "Как бот фильтрует спам?", text: "Проверяет аккаунт и ответы на вопросы." },
            { name: "Можно ли настроить вопросы?", text: "Да, под любую нишу." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ аудитории", text: "Портрет целевого участника." },
            { name: "Шаг 2: Разработка бота", text: "Создаём бота-модератора." },
            { name: "Шаг 3: Настройка фильтров", text: "Квалифицирующие вопросы." },
            { name: "Шаг 4: Запуск", text: "Тестирование, запуск." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для сообщества", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "Telegram бот для онлайн-школы", url: "/blog/bot-dlya-onlajn-shkoly", context: "Автоматизация обучения" },
        { anchor: "лидогенерация в Telegram", url: "/blog/lidogeneraciya-telegram-kak-eto-rabotaet", context: "Поиск клиентов" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
    ],
};
