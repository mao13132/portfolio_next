import { Article, makeArticleSchema } from '../types';
import { razrabotkaRestApiPart1 } from './texts/razrabotka-rest-api-part1';
import { razrabotkaRestApiPart2 } from './texts/razrabotka-rest-api-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleRazrabotkaRestApi: Article = {
    slug: "razrabotka-rest-api",
    title: "Разработка REST API: от проектирования до деплоя | DimaRazrab",
    metaDescription: "Разработка REST API: проектирование, разработка, деплой. FastAPI, Django, PostgreSQL. Реальные кейсы с ROI 420-680%. От 50 000 ₽.",
    keywords: "разработка rest api, создание api, rest api разработка, api для бизнеса, заказать api, разработка api на python",
    h1: "Разработка REST API: полное руководство",
    ogTitle: "Разработка REST API — от проектирования до деплоя с ROI 680%",
    ogDescription: "Как разработать REST API для бизнеса. FastAPI, Django, PostgreSQL. 3 реальных кейса с конкретными цифрами.",
    canonical: `${SITE_URL}/blog/razrabotka-rest-api`,
    heroBadge: "🔧 REST API • Разработка • Интеграции",
    heroSubtitle: "Полное руководство по разработке REST API: от проектирования до деплоя. Три реальных кейса из моей практики с ROI 420-680%.",
    readingTime: "19 мин чтения",
    wordCount: "~5300 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-rest-api", title: "Что такое REST API" },
        { id: "rest-vs-other", title: "REST vs GraphQL vs gRPC" },
        { id: "tech-stack", title: "Технологический стек" },
        { id: "case-fastapi-markets", title: "Кейс: Автоматизация маркетплейсов" },
        { id: "case-oxprotocol", title: "Кейс: API для крипто-аналитики" },
        { id: "case-bankless", title: "Кейс: Система аналитики рынка" },
        { id: "how-to-build", title: "Как разработать REST API" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...razrabotkaRestApiPart1, ...razrabotkaRestApiPart2],

    faq: [
        {
            question: "REST API подходит для моего проекта?",
            answer: "REST API подходит для 80% проектов: веб-приложения, мобильные приложения, интеграции, SaaS-сервисы.",
        },
        {
            question: "Сколько времени занимает разработка API?",
            answer: "Простое: 1-2 недели. Среднее: 2-4 недели. Сложное: 4-10 недель.",
        },
        {
            question: "Какой язык лучше для API?",
            answer: "Python (FastAPI) — оптимальный выбор для большинства: быстрая разработка, высокая производительность.",
        },
        {
            question: "Нужно ли документировать API?",
            answer: "Обязательно. Swagger/OpenAPI автоматически генерирует интерактивную документацию.",
        },
        {
            question: "Как защитить API?",
            answer: "JWT-авторизация, rate limiting, HTTPS, валидация данных, логирование.",
        },
        {
            question: "API можно масштабировать?",
            answer: "Да, горизонтальное масштабирование: добавление серверов, балансировка, кэширование через Redis.",
        },
    ],

    ctaTitle: "Хотите разработать REST API для вашего бизнеса?",
    ctaSubtitle: "Бесплатная консультация — спроектируем архитектуру, оценим стоимость и сроки разработки API.",
    ctaSource: "article-rest-api-cta",

    structuredData: makeArticleSchema(
        "razrabotka-rest-api",
        "Разработка REST API: полное руководство",
        "Разработка REST API: проектирование, разработка, деплой. FastAPI, Django. Реальные кейсы с ROI 420-680%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Что такое REST API?", text: "Архитектурный стиль для создания веб-сервисов, позволяющий системам обмениваться данными через HTTP." },
            { name: "REST API vs GraphQL — что выбрать?", text: "REST API подходит для 80% проектов. GraphQL — для сложных фронтендов с переменными запросами." },
            { name: "Сколько стоит разработка API?", text: "Простое: 50 000–100 000 ₽. Среднее: 100 000–250 000 ₽. Сложное: 250 000–600 000 ₽." },
            { name: "Какой язык лучше для API?", text: "Python (FastAPI) — оптимальный выбор: быстрая разработка, высокая производительность, богатая экосистема." },
            { name: "Как быстро окупается разработка API?", text: "ROI 420-680% за 1-4 месяца за счёт автоматизации и масштабирования." },
            { name: "API можно масштабировать?", text: "Да, горизонтальное масштабирование через Docker, Kubernetes, балансировку нагрузки." },
        ],
        5300,
    ),

    internalLinks: [
        { anchor: "заказать разработку API", url: "/razrabotka-api", context: "Разработка API для бизнеса" },
        { anchor: "интеграция API с сайтом", url: "/blog/integraciya-api-s-sajtom", context: "Подключение API к фронтенду" },
        { anchor: "webhook-интеграция", url: "/blog/webhook-integraciya", context: "Автоматизация событий" },
        { anchor: "FastAPI для разработки API", url: "/blog/fastapi-dlya-api", context: "Почему FastAPI" },
        { anchor: "разработка на Python", url: "/blog/python-razrabotka", context: "Python для автоматизации" },
        { anchor: "разработка на Next.js", url: "/nextjs-razrabotka", context: "Фронтенд для API" },
        { anchor: "интеграция API маркетплейсов", url: "/blog/integraciya-api-marketplejsov", context: "Ozon, WB, Avito" },
        { anchor: "интеграция API с CRM", url: "/blog/integraciya-api-s-crm", context: "amoCRM, Битrix24" },
    ],
};
