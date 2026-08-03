import { Article, makeArticleSchema } from '../types';
import { apiWildberriesRukovodstvoPart1 } from './texts/api-wildberries-rukovodstvo-part1';
import { apiWildberriesRukovodstvoPart2 } from './texts/api-wildberries-rukovodstvo-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleApiWildberriesRukovodstvo: Article = {
    slug: "api-wildberries-rukovodstvo",
    title: "API Wildberries: полное руководство для разработчиков | DimaRazrab",
    metaDescription: "API Wildberries: полное руководство по интеграции. Endpoints, авторизация, примеры кода. Реальные кейсы. Разработка от 30 000 ₽. Консультация →",
    keywords: "api wildberries, api wildberries документация, интеграция wildberries api, разработка под wildberries, автоматизация wildberries api",
    h1: "API Wildberries: полное руководство по интеграции",
    ogTitle: "API Wildberries — полное руководство по интеграции для разработчиков",
    ogDescription: "Всё об API Wildberries: endpoints, авторизация, примеры кода, реальные кейсы. Разработка от 30 000 ₽.",
    canonical: `${SITE_URL}/blog/api-wildberries-rukovodstvo`,
    heroBadge: "⚙️ API • Wildberries • Интеграция",
    heroSubtitle: "Полное руководство по API Wildberries: endpoints, авторизация, практические примеры. Три реальных кейса интеграции из моей практики.",
    readingTime: "19 мин чтения",
    wordCount: "~5200 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-api", title: "Что такое API Wildberries" },
        { id: "api-endpoints", title: "Обзор API: основные endpoints" },
        { id: "auth-and-setup", title: "Авторизация и настройка" },
        { id: "case-seo-wb", title: "Кейс: SEO-позиции через API" },
        { id: "case-limits", title: "Кейс: Мониторинг поставок" },
        { id: "case-auto-market", title: "Кейс: Автоматизация маркетплейсов" },
        { id: "integration-examples", title: "Практические примеры интеграции" },
        { id: "api-limitations", title: "Ограничения и особенности" },
        { id: "how-to-start", title: "Как начать работу: пошаговый план" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...apiWildberriesRukovodstvoPart1, ...apiWildberriesRukovodstvoPart2],

    faq: [
        {
            question: "API Wildberries бесплатный?",
            answer: "Да, API бесплатный для авторизованных продавцов. Нужен аккаунт продавца и API-ключ из личного кабинета.",
        },
        {
            question: "Можно ли получить данные о конкурентах через API?",
            answer: "Нет. Через API доступны только данные по своему аккаунту. Данные о конкурентах — только через скрейпинг.",
        },
        {
            question: "Какой язык программирования лучше для API WB?",
            answer: "Python — оптимальный выбор. requests/aiohttp для HTTP, pandas для анализа, asyncio для асинхронности.",
        },
        {
            question: "Как часто можно опрашивать API?",
            answer: "Content и Prices API — до 100 запросов/минуту. Analytics и Statistics — 1 запрос/минуту.",
        },
        {
            question: "API Wildberries часто меняется?",
            answer: "Да, WB регулярно обновляет API. Примерно раз в квартал появляются новые endpoints. Важна система мониторинга.",
        },
        {
            question: "Сколько стоит разработка интеграции?",
            answer: "Базовая: 30 000–60 000 ₽. Средняя: 60 000–150 000 ₽. Сложная: 150 000–400 000 ₽.",
        },
    ],

    ctaTitle: "Нужна интеграция с API Wildberries?",
    ctaSubtitle: "Бесплатная консультация — определим задачи, подберём подход и оценим стоимость разработки.",
    ctaSource: "article-api-wb-cta",

    structuredData: makeArticleSchema(
        "api-wildberries-rukovodstvo",
        "API Wildberries: полное руководство по интеграции",
        "API Wildberries: полное руководство по интеграции. Endpoints, авторизация, примеры кода. Реальные кейсы.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Что такое API Wildberries?", text: "Программный интерфейс для автоматического обмена данными с платформой Wildberries." },
            { name: "API Wildberries бесплатный?", text: "Да, бесплатный для авторизованных продавцов." },
            { name: "Можно ли получить данные о конкурентах через API?", text: "Нет. Только данные по своему аккаунту. Данные о конкурентах — через скрейпинг." },
            { name: "Сколько стоит разработка интеграции?", text: "Базовая: 30 000–60 000 ₽. Средняя: 60 000–150 000 ₽. Сложная: 150 000–400 000 ₽." },
            { name: "Какой язык лучше для API WB?", text: "Python — оптимальный выбор для работы с API Wildberries." },
            { name: "Как часто обновляется API Wildberries?", text: "Примерно раз в квартал появляются изменения. Важна система мониторинга." },
        ],
        5200,
    ),

    internalLinks: [
        { anchor: "заказать парсер маркетплейсов", url: "/parsery-marketplejsov", context: "Разработка парсеров маркетплейсов" },
        { anchor: "парсер Wildberries", url: "/blog/parser-wildberries", context: "Полное руководство по парсингу WB" },
        { anchor: "repricer для Wildberries", url: "/blog/repricer-wildberries", context: "Автоматическое ценообразование" },
        { anchor: "мониторинг цен на маркетплейсах", url: "/blog/monitoring-cen-marketplejsov", context: "Инструменты мониторинга" },
        { anchor: "разработка на Python", url: "/blog/python-razrabotka", context: "Python для автоматизации" },
    ],
};
