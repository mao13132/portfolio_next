import { Article, makeArticleSchema } from '../../types';
import { botDlyaMarketingovogoAgentstvaPart1 } from './texts/bot-dlya-marketingovogo-agentstva-part1';
import { botDlyaMarketingovogoAgentstvaPart2 } from './texts/bot-dlya-marketingovogo-agentstva-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaMarketingovogoAgentstva: Article = {
    slug: "bot-dlya-marketingovogo-agentstva",
    title: "Telegram бот для маркетингового агентства: лиды, отчёты, кейсы",
    metaDescription: "Telegram бот для маркетингового агентства от 35 000 ₽. Сбор лидов, портфолио, автоматические отчёты. ROI 780%. Бесплатная оценка →",
    keywords: "telegram бот для маркетингового агентства, бот маркетинг, автоматизация агентства, telegram бот лидогенерация",
    h1: "Telegram бот для маркетингового агентства: как увеличить лидов на 650% и автоматизировать отчёты",
    ogTitle: "Telegram бот для маркетингового агентства — лиды 24/7, ROI 780%",
    ogDescription: "Как маркетинговое агентство увеличило лидов на 650% благодаря Telegram-боту. Сбор лидов, отчёты, кейсы. Реальный кейс.",
    canonical: `${SITE_URL}/blog/bot-dlya-marketingovogo-agentstva`,
    heroBadge: "📈 Маркетинг • Автоматизация • 2026",
    heroSubtitle: "Как маркетинговое агентство увеличило лидов на 650% за 2 месяца благодаря Telegram-боту. Сбор лидов, отчёты — всё автоматически.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему агентства теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +650% лидов" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaMarketingovogoAgentstvaPart1, ...botDlyaMarketingovogoAgentstvaPart2],

    faq: [
        {
            question: "Как бот собирает лиды из Telegram?",
            answer: "Бот мониторит 500+ каналов и чатов по ключевым словам. Находит сообщения, фильтрует по критериям, создаёт базу контактов с ссылками на профили.",
        },
        {
            question: "Как бот готовит отчёты?",
            answer: "Бот подключается к API рекламных кабинетов и аналитики. Автоматически формирует еженедельные отчёты: трафик, конверсия, ROI.",
        },
        {
            question: "Можно ли настроить фильтрацию лидов?",
            answer: "Да. Фильтры: ключевые слова, количество подписчиков, активность, геолокация, ниша. Только качественные лиды.",
        },
        {
            question: "Как быстро окупится бот для агентства?",
            answer: "За 1-2 недели. Один новый клиент = 50 000-200 000 ₽/мес. Бот окупается с первого нового клиента.",
        },
    ],

    ctaTitle: "Хотите бота для маркетингового агентства от 35 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит лидов на 650%",
    ctaSource: "article-marketing-cta",

    structuredData: makeArticleSchema(
        "bot-dlya-marketingovogo-agentstva",
        "Telegram бот для маркетингового агентства: как увеличить лидов на 650%",
        "Telegram бот для маркетингового агентства от 35 000 ₽. Сбор лидов, отчёты. ROI 780%.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Как бот собирает лиды?", text: "Мониторинг 500+ каналов по ключевым словам." },
            { name: "Как бот готовит отчёты?", text: "Автоматически через API рекламных кабинетов." },
            { name: "Можно ли настроить фильтрацию?", text: "Да, по ключевым словам, активности, нише." },
            { name: "Как быстро окупится бот?", text: "За 1-2 недели с первого нового клиента." },
        ],
        3200,
        [
            { name: "Шаг 1: Анализ", text: "Изучаем ниши и каналы для мониторинга." },
            { name: "Шаг 2: Разработка", text: "Создаём бота со сбором лидов." },
            { name: "Шаг 3: Настройка фильтров", text: "Ключевые слова, критерии." },
            { name: "Шаг 4: Запуск", text: "Тестирование, мониторинг." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для агентства", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "лидогенерация в Telegram", url: "/blog/lidogeneraciya-telegram-kak-eto-rabotaet", context: "Поиск клиентов" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "Telegram бот для SMM-агентства", url: "/blog/bot-dlya-smm-agentstva", context: "Автоматизация SMM" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
    ],
};
