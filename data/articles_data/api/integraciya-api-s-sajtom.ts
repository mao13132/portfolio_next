import { Article, makeArticleSchema } from '../types';
import { integraciyaApiSSajtomPart1 } from './texts/integraciya-api-s-sajtom-part1';
import { integraciyaApiSSajtomPart2 } from './texts/integraciya-api-s-sajtom-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleIntegraciyaApiSSajtom: Article = {
    slug: "integraciya-api-s-sajtom",
    title: "Интеграция API с сайтом: практические примеры | DimaRazrab",
    metaDescription: "Интеграция API с сайтом: платёжные системы, CRM, маркетплейсы, геосервисы. Реальные кейсы с ROI 380-680%. От 30 000 ₽.",
    keywords: "интеграция api с сайтом, подключить api к сайту, api интеграция, связать сайт с api, интеграция crm с сайтом",
    h1: "Интеграция API с сайтом: пошаговое руководство",
    ogTitle: "Интеграция API с сайтом — автоматизация с ROI 680%",
    ogDescription: "Как интегрировать API с сайтом: платёжные системы, CRM, маркетплейсы. 3 реальных кейса с конкретными цифрами.",
    canonical: `${SITE_URL}/blog/integraciya-api-s-sajtom`,
    heroBadge: "🔗 Интеграция • API • Сайт",
    heroSubtitle: "Полное руководство по интеграции API с сайтом: платёжные системы, CRM, маркетплейсы. Три реальных кейса с ROI 380-680%.",
    readingTime: "18 мин чтения",
    wordCount: "~5100 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-api-integration", title: "Что такое интеграция API" },
        { id: "types-of-integration", title: "Типы интеграций" },
        { id: "popular-apis", title: "Популярные API" },
        { id: "case-documents-google", title: "Кейс: Google API для документов" },
        { id: "case-fastapi-markets", title: "Кейс: API маркетплейсов" },
        { id: "case-oxprotocol", title: "Кейс: API крипто-платформ" },
        { id: "how-to-integrate", title: "Как интегрировать API" },
        { id: "cost", title: "Стоимость интеграции" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...integraciyaApiSSajtomPart1, ...integraciyaApiSSajtomPart2],

    faq: [
        {
            question: "Что делать, если API сервиса изменилось?",
            answer: "Используйте версионирование и абстрактный слой. При обновлении — обновляете только адаптер.",
        },
        {
            question: "Как обрабатывать сбои внешнего API?",
            answer: "Retry-логика, circuit breaker, fallback-стратегии, мониторинг и алерты.",
        },
        {
            question: "Нужно ли кэшировать данные от API?",
            answer: "Да, кэширование критически важно. Снижает нагрузку, ускоряет загрузку, снижает стоимость.",
        },
        {
            question: "Безопасно ли хранить API-ключи?",
            answer: "В переменных окружения (.env), не в коде. Для пользовательских токенов — OAuth 2.0.",
        },
        {
            question: "Сколько API можно подключить к сайту?",
            answer: "Технически — неограниченно. Микросервисный подход позволяет подключать десятки API.",
        },
        {
            question: "Как быстро окупается интеграция?",
            answer: "ROI 380-680% за 1-4 месяца за счёт автоматизации и снижения ошибок.",
        },
    ],

    ctaTitle: "Хотите интегрировать API с вашим сайтом?",
    ctaSubtitle: "Бесплатная консультация — определим задачи, подберём API и оценим стоимость интеграции.",
    ctaSource: "article-integraciya-api-cta",

    structuredData: makeArticleSchema(
        "integraciya-api-s-sajtom",
        "Интеграция API с сайтом: пошаговое руководство",
        "Интеграция API с сайтом: платёжные системы, CRM, маркетплейсы. Реальные кейсы с ROI 380-680%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Что такое интеграция API с сайтом?", text: "Подключение внешних сервисов к сайту через программный интерфейс для автоматического обмена данными." },
            { name: "Какие API можно подключить к сайту?", text: "Платёжные системы, CRM, карты, соцсети, маркетплейсы, аналитика, email-сервисы." },
            { name: "Сколько стоит интеграция API?", text: "Простая: 30 000–60 000 ₽. Средняя: 60 000–150 000 ₽. Сложная: 150 000–400 000 ₽." },
            { name: "Как обрабатывать сбои внешнего API?", text: "Retry-логика, circuit breaker, fallback-стратегии, кэширование, мониторинг." },
            { name: "Нужно ли кэшировать данные от API?", text: "Да, кэширование снижает нагрузку и ускоряет загрузку. Redis — оптимальный выбор." },
            { name: "Как быстро окупается интеграция?", text: "ROI 380-680% за 1-4 месяца за счёт автоматизации ручных операций." },
        ],
        5100,
    ),

    internalLinks: [
        { anchor: "заказать интеграцию API", url: "/razrabotka-api", context: "Интеграция API для бизнеса" },
        { anchor: "разработка REST API", url: "/blog/razrabotka-rest-api", context: "Создание собственного API" },
        { anchor: "webhook-интеграция", url: "/blog/webhook-integraciya", context: "Автоматизация событий" },
        { anchor: "API-интеграция с 1С", url: "/blog/api-integraciya-1s", context: "Обмен данными с 1С" },
        { anchor: "FastAPI для разработки API", url: "/blog/fastapi-dlya-api", context: "Почему FastAPI" },
        { anchor: "разработка на Python", url: "/blog/python-razrabotka", context: "Python для интеграций" },
        { anchor: "интеграция API маркетплейсов", url: "/blog/integraciya-api-marketplejsov", context: "Ozon, WB, Avito" },
        { anchor: "интеграция API доставки", url: "/blog/integraciya-api-dostavki", context: "СДЭК, Почта России" },
    ],
};
