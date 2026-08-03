import { Article, makeArticleSchema } from '../types';
import { pythonBackendRazrabotkaPart1 } from './texts/python-backend-razrabotka-part1';
import { pythonBackendRazrabotkaPart2 } from './texts/python-backend-razrabotka-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articlePythonBackendRazrabotka: Article = {
    slug: "python-backend-razrabotka",
    title: "Python backend разработка: архитектура и лучшие практики | DimaRazrab",
    metaDescription: "Python backend разработка: архитектура, Django, FastAPI, деплой. Кейсы с ROI 320-680%. Бесплатная консультация. От 40 000₽.",
    keywords: "python backend разработка, python backend, python api разработка, backend архитектура python",
    h1: "Python backend разработка: архитектура и лучшие практики",
    ogTitle: "Python backend разработка — архитектура, кейсы, лучшие практики",
    ogDescription: "Проектирование backend на Python: архитектурные паттерны, БД, безопасность, деплой. Кейсы с ROI 320-680%.",
    canonical: `${SITE_URL}/blog/python-backend-razrabotka`,
    heroBadge: "🏗️ Backend • Python • Архитектура",
    heroSubtitle: "Проектирование и разработка надёжного backend на Python. Архитектурные паттерны, базы данных, безопасность, деплой.",
    readingTime: "18 мин чтения",
    wordCount: "~5000 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-backend", title: "Что такое Python backend" },
        { id: "architecture-patterns", title: "Архитектурные паттерны" },
        { id: "database-design", title: "Проектирование БД" },
        { id: "case-fastapi-backend", title: "Кейс: FastAPI backend (ROI 680%)" },
        { id: "case-django-backend", title: "Кейс: Django backend (ROI 320%)" },
        { id: "security", title: "Безопасность backend" },
        { id: "deployment", title: "Деплой Python backend" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...pythonBackendRazrabotkaPart1, ...pythonBackendRazrabotkaPart2],

    faq: [
        {
            question: "Сколько стоит backend разработка?",
            answer: "Простой API — от 40 000₽. Средний — от 80 000₽. Сложная система — от 200 000₽.",
        },
        {
            question: "FastAPI или Django для backend?",
            answer: "FastAPI — для чистого API с высокой производительностью. Django — если нужна админка и ORM из коробки.",
        },
        {
            question: "Нужен ли Docker для деплоя?",
            answer: "Рекомендуется, но не обязателен. Docker гарантирует одинаковое окружение на разработке и продакшене.",
        },
        {
            question: "Как обеспечить безопасность API?",
            answer: "JWT авторизация, rate limiting, input validation через Pydantic, HTTPS, CORS. Всё в стандартной конфигурации.",
        },
        {
            question: "Можно ли масштабировать Python backend?",
            answer: "Да. Async FastAPI — 10 000+ req/s. Для большей нагрузки — горизонтальное масштабирование через Docker Swarm/K8s.",
        },
    ],

    ctaTitle: "Нужен надёжный Python backend?",
    ctaSubtitle: "Бесплатная консультация — подберём оптимальную архитектуру для вашего проекта.",
    ctaSource: "article-python-backend-cta",

    structuredData: makeArticleSchema(
        "python-backend-razrabotka",
        "Python backend разработка: архитектура и лучшие практики",
        "Python backend разработка: архитектура, Django, FastAPI, деплой. Кейсы с ROI 320-680%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Сколько стоит backend разработка?", text: "Простой API — от 40 000₽. Средний — от 80 000₽. Сложный — от 200 000₽." },
            { name: "FastAPI или Django для backend?", text: "FastAPI — для API, Django — для full-stack с админкой." },
            { name: "Нужен ли Docker?", text: "Рекомендуется для гарантии одинакового окружения." },
            { name: "Как обеспечить безопасность?", text: "JWT, rate limiting, Pydantic validation, HTTPS, CORS." },
            { name: "Можно ли масштабировать?", text: "Да, 10 000+ req/s, горизонтальное масштабирование." },
        ],
        5000,
    ),

    internalLinks: [
        { anchor: "Python-разработка под ключ", url: "/blog/python-razrabotka-pod-klyuch", context: "Полный цикл разработки" },
        { anchor: "FastAPI разработка", url: "/blog/fastapi-razrabotka", context: "Подробнее о FastAPI" },
        { anchor: "Django vs FastAPI vs Flask", url: "/blog/django-vs-fastapi-vs-flask", context: "Сравнение фреймворков" },
        { anchor: "заказать разработку API", url: "/razrabotka-api", context: "Коммерческая страница" },
        { anchor: "разработка сервисов", url: "/razrabotka-servisov", context: "Full-stack приложения" },
    ],
};
