import { Article, makeArticleSchema } from '../types';
import { sborBazyKlientovTelegramPart1 } from './texts/sbor-bazy-klientov-telegram-part1';
import { sborBazyKlientovTelegramPart2 } from './texts/sbor-bazy-klientov-telegram-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleSborBazyKlientovTelegram: Article = {
    slug: "sbor-bazy-klientov-telegram",
    title: "Сбор базы клиентов в Telegram: парсинг каналов с ROI 780%",
    metaDescription: "Сбор базы клиентов в Telegram от 30 000 ₽. Парсинг каналов, ML-фильтрация, экспорт в CRM. ROI 780%. Бесплатная оценка за 24 часа →",
    keywords: "сбор базы клиентов telegram, база клиентов telegram, парсинг каналов telegram, сбор контактов telegram, база данных telegram",
    h1: "Как собрать базу клиентов в Telegram: пошаговое руководство",
    ogTitle: "Сбор базы клиентов в Telegram — автоматический парсинг с ROI 780%",
    ogDescription: "Как автоматизировать сбор базы клиентов в Telegram. Парсинг каналов, ML-фильтрация, экспорт в CRM. 3 реальных кейса.",
    canonical: `${SITE_URL}/blog/sbor-bazy-klientov-telegram`,
    heroBadge: "📋 База клиентов • Telegram • Парсинг",
    heroSubtitle: "Полное руководство: как автоматически собрать базу клиентов в Telegram. Три реальных кейса из моей практики с ROI 500-780%.",
    readingTime: "18 мин чтения",
    wordCount: "~5000 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-client-base", title: "Что такое база клиентов в Telegram" },
        { id: "methods", title: "Методы сбора базы" },
        { id: "how-parser-works", title: "Как работает парсер" },
        { id: "case-people-pars", title: "Кейс: Сбор контактов для агентства" },
        { id: "case-leads-telegram", title: "Кейс: Поиск клиентов для психолога" },
        { id: "case-support-tg", title: "Кейс: Система стимулирования отзывов" },
        { id: "how-to-build", title: "Как создать систему сбора" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...sborBazyKlientovTelegramPart1, ...sborBazyKlientovTelegramPart2],

    faq: [
        {
            question: "Это легально — собирать базу участников каналов?",
            answer: "Да, сбор открытых данных из публичных каналов легален. Участники сами соглашаются на публичность профиля. Важно не отправлять спам.",
        },
        {
            question: "Какой объём базы можно собрать?",
            answer: "Для популярных ниш: 5 000-20 000 контактов в неделю. Для узких ниш: 500-2 000. Качество важнее количества.",
        },
        {
            question: "Как отличить живых людей от ботов?",
            answer: "ML-алгоритм фильтрует по признакам: наличие username, активность, дата регистрации, премиум-подписка. Точность 92-95%.",
        },
        {
            question: "Сколько стоит контакт из базы?",
            answer: "При автоматическом сборе: 50-150₽. Для сравнения: контекстная реклама — 500-2000₽. Экономия в 5-10 раз.",
        },
        {
            question: "Как часто нужно обновлять базу?",
            answer: "Рекомендуется 1-2 раза в неделю. Автоматический парсер обновляет базу по расписанию.",
        },
        {
            question: "Можно ли интегрировать базу с CRM?",
            answer: "Да, стандартная интеграция с amoCRM, Bitrix24, Google Sheets, HubSpot. Контакты автоматически попадают в CRM с тегами.",
        },
    ],

    ctaTitle: "Хотите сбор базы от 7 000 ₽ — за 3 дня?",
    ctaSubtitle: "Бесплатная консультация — разберём вашу нишу, подберём подход и оценим стоимость системы сбора.",
    ctaSource: "article-sbor-baza-cta",

    structuredData: makeArticleSchema(
        "sbor-bazy-klientov-telegram",
        "Как собрать базу клиентов в Telegram: пошаговое руководство",
        "Сбор базы клиентов в Telegram: автоматический парсинг каналов, ML-фильтрация, экспорт в CRM. Реальные кейсы с ROI 500-780%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Что такое база клиентов в Telegram?", text: "Структурированный набор данных о потенциальных клиентах: username, ID, имя, интересы, активность в каналах." },
            { name: "Это легально — собирать базу?", text: "Да, сбор открытых данных из публичных каналов легален. Важно не отправлять спам-рассылки." },
            { name: "Сколько стоит система сбора базы?", text: "Базовая: 30 000–60 000 ₽. Средняя: 60 000–150 000 ₽. Сложная: 150 000–350 000 ₽." },
            { name: "Какой объём базы можно собрать?", text: "5 000-20 000 контактов в неделю для популярных ниш, 500-2 000 для узких." },
            { name: "Сколько стоит контакт из базы?", text: "50-150₽ при автоматическом сборе. Экономия в 5-10 раз по сравнению с рекламой." },
            { name: "Как быстро окупается?", text: "ROI 500-780% за 1-2 месяца. Первые контакты в день запуска парсера." },
        ],
        5000,
    ),

    internalLinks: [
        { anchor: "заказать сбор базы клиентов", url: "/lidogeneraciya-telegram", context: "Разработка систем сбора базы" },
        { anchor: "парсер Telegram-каналов", url: "/blog/parser-telegram-kanalov", context: "Сбор данных из каналов" },
        { anchor: "лидогенерация в Telegram", url: "/blog/lidogeneraciya-telegram-kak-eto-rabotaet", context: "Как работает лидогенерация" },
        { anchor: "массовая рассылка в Telegram", url: "/blog/massovaya-rassylka-telegram", context: "Рассылки по собранной базе" },
        { anchor: "разработка ботов", url: "/razrabotka-botov", context: "Telegram-боты для бизнеса" },
        { anchor: "разработка на Python", url: "/blog/python-razrabotka", context: "Python для автоматизации" },
    ],
};
