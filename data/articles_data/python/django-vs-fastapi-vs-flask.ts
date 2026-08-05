import { Article, makeArticleSchema } from '../types';
import { djangoVsFastapiVsFlaskPart1 } from './texts/django-vs-fastapi-vs-flask-part1';
import { djangoVsFastapiVsFlaskPart2 } from './texts/django-vs-fastapi-vs-flask-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleDjangoVsFastapiVsFlask: Article = {
    slug: "django-vs-fastapi-vs-flask",
    title: "API как искусство разработка поддержка интеграция: что лучше выбрать",
    metaDescription: "Сравнение: api как искусство разработка поддержка интеграция от 15 000 ₽. Интеграция с внешними сервисами, автоматизация. Бесплатная оценка за 24 часа →",
    keywords: "django vs fastapi, fastapi vs flask, django vs flask, python фреймворки сравнение, какой python фреймворк выбрать",
    h1: "Django vs FastAPI vs Flask: какой фреймворк выбрать",
    ogTitle: "Django vs FastAPI vs Flask — честное сравнение с кейсами",
    ogDescription: "Подробное сравнение трёх Python-фреймворков. Реальные кейсы, таблицы, дерево решений. ROI 380-680%.",
    canonical: `${SITE_URL}/blog/django-vs-fastapi-vs-flask`,
    heroBadge: "⚔️ Django • FastAPI • Flask",
    heroSubtitle: "Подробное сравнение трёх Python-фреймворков с реальными кейсами. Дерево решений для выбора оптимального варианта.",
    readingTime: "18 мин чтения",
    wordCount: "~5000 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "overview", title: "Обзор трёх фреймворков" },
        { id: "django-deep-dive", title: "Django: когда «батарейки включены»" },
        { id: "fastapi-deep-dive", title: "FastAPI: скорость и производительность" },
        { id: "flask-deep-dive", title: "Flask: минимализм и гибкость" },
        { id: "comparison-table", title: "Детальное сравнение" },
        { id: "case-django-tan", title: "Кейс: студия загара Django (ROI 580%)" },
        { id: "case-django-price-framework", title: "Кейс: ценообразование Django (ROI 380%)" },
        { id: "case-fastapi-framework", title: "Кейс: маркетплейсы FastAPI (ROI 680%)" },
        { id: "decision-tree", title: "Дерево решений" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...djangoVsFastapiVsFlaskPart1, ...djangoVsFastapiVsFlaskPart2],

    faq: [
        {
            question: "FastAPI заменит Django?",
            answer: "Нет. Они решают разные задачи. FastAPI — для API, Django — для full-stack приложений. Они дополняют друг друга.",
        },
        {
            question: "Flask ещё актуален?",
            answer: "Да, для простых задач. Но для нового API-проекта лучше FastAPI: больше возможностей «из коробки».",
        },
        {
            question: "Какой фреймворк для Telegram-бота?",
            answer: "Для бота — aiogram 3.x. FastAPI/Django используются для backend-части бота.",
        },
        {
            question: "Можно ли мигрировать с Flask на FastAPI?",
            answer: "Да, за 1-2 недели. Синтаксис похож, Pydantic заменяет Marshmallow.",
        },
        {
            question: "Какой фреймворк выбрать для стартапа?",
            answer: "Для MVP — FastAPI (быстро, документация из коробки). Для проекта с админкой — Django. Для простого API — Flask.",
        },
    ],

    ctaTitle: "Не можете выбрать фреймворк?",
    ctaSubtitle: "Бесплатная консультация — подберём оптимальный стек для вашего проекта.",
    ctaSource: "article-django-vs-fastapi-cta",

    structuredData: makeArticleSchema(
        "django-vs-fastapi-vs-flask",
        "Django vs FastAPI vs Flask: какой фреймворк выбрать",
        "Подробное сравнение Django, FastAPI и Flask с реальными кейсами и деревом решений.",
        "2026-08-02", "2026-08-02",
        [
            { name: "FastAPI лучше Django?", text: "Не лучше, а другой. FastAPI — для API, Django — для full-stack приложений." },
            { name: "Какой фреймворк самый быстрый?", text: "FastAPI — 10 000+ req/s благодаря async/await." },
            { name: "Когда выбирать Flask?", text: "Для простых задач: 3-5 эндпоинтов, прототипы, вебхуки." },
            { name: "Какой фреймворк для стартапа?", text: "FastAPI для MVP, Django для проекта с админкой." },
            { name: "Можно ли комбинировать фреймворки?", text: "Да, Django для сайта + FastAPI для микросервиса." },
        ],
        5000,
    ),

    internalLinks: [
        { anchor: "Python-разработка под ключ", url: "/blog/python-razrabotka-pod-klyuch", context: "Полный цикл разработки" },
        { anchor: "FastAPI разработка", url: "/blog/fastapi-razrabotka", context: "Подробнее о FastAPI" },
        { anchor: "Python backend разработка", url: "/blog/python-backend-razrabotka", context: "Архитектура backend" },
        { anchor: "заказать разработку API", url: "/razrabotka-api", context: "Коммерческая страница" },
        { anchor: "Python для автоматизации", url: "/blog/python-avtomatizaciya-biznesa", context: "Автоматизация бизнеса" },
    ],
};
