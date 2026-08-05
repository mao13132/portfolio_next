import { Article, makeArticleSchema } from '../types';
import { razrabotkaSajtaPodKlyuchPart1 } from './texts/razrabotka-sajta-pod-klyuch-part1';
import { razrabotkaSajtaPodKlyuchPart2 } from './texts/razrabotka-sajta-pod-klyuch-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleRazrabotkaSajtaPodKlyuchVeb: Article = {
    slug: "razrabotka-sajta-pod-klyuch-veb",
    title: "Создание сайта под ключ цена: заказать от 10 000 ₽, от 5 дней",
    metaDescription: "Создание сайта под ключ цена от 10 000 ₽. Дизайн, разработка, SEO-оптимизация, интеграция с CRM и аналитикой, от 5 дней. Бесплатная оценка за 24 часа →",
    keywords: "разработка сайта под ключ, разработка сайта под ключ цена, разработка веб сайта под ключ, создание сайта под ключ цена, разработка веб сайта на заказ, разработка корпоративного сайта, разработка веб приложений, разработка веб приложений для бизнеса, разработка веб приложения стоимость",
    h1: "Разработка сайта под ключ: полное руководство по стоимости и этапам",
    ogTitle: "Разработка сайта под ключ: стоимость, сроки, этапы, кейсы",
    ogDescription: "Полное руководство по разработке сайта под ключ. Этапы, стоимость, технологии. Реальные кейсы с цифрами. Стоимость от 50 000 ₽.",
    canonical: `${SITE_URL}/blog/razrabotka-sajta-pod-klyuch-veb`,
    heroBadge: "🖥️ Веб-разработка • Сайты • Приложения",
    heroSubtitle: "Полное руководство: этапы, стоимость и технологии разработки сайта под ключ. Реальные кейсы с конкретными цифрами.",
    readingTime: "22 мин чтения",
    wordCount: "~4800 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-includes", title: "Что входит в разработку" },
        { id: "stages", title: "Этапы разработки" },
        { id: "tech-stack", title: "Технологический стек" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "timelines", title: "Сроки разработки" },
        { id: "corporate-vs-landing", title: "Корпоративный сайт vs лендинг" },
        { id: "cases", title: "Кейсы" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...razrabotkaSajtaPodKlyuchPart1, ...razrabotkaSajtaPodKlyuchPart2],

    faq: [
        {
            question: "Сколько стоит разработка сайта под ключ?",
            answer: "Лендинг — от 30 000 до 80 000 ₽. Корпоративный сайт — от 80 000 до 250 000 ₽. Интернет-магазин — от 150 000 до 500 000 ₽. Веб-приложение — от 150 000 ₽. Точная смета за 24 часа.",
        },
        {
            question: "Сколько времени занимает разработка?",
            answer: "Лендинг — 5-14 дней. Корпоративный сайт — 21-45 дней. Интернет-магазин — 30-90 дней. Сроки зависят от сложности и скорости согласований.",
        },
        {
            question: "Что лучше: WordPress или кастомная разработка?",
            answer: "WordPress — быстрее и дешевле для простых проектов. Кастомная разработка (Next.js + Django) — лучше по производительности, SEO и безопасности. Для серьёзного бизнеса — кастом.",
        },
        {
            question: "Что входит в разработку сайта под ключ?",
            answer: "Полный цикл: аналитика, проектирование, дизайн, frontend, backend, интеграции, тестирование, запуск, поддержка. Один исполнитель отвечает за весь результат.",
        },
        {
            question: "Нужна ли CMS для управления сайтом?",
            answer: "Если планируете самостоятельно обновлять контент — да. Я использую Django Admin как CMS — удобно и не требует отдельного ПО. Для статичного контента CMS не обязательна.",
        },
        {
            question: "Какой хостинг выбрать для сайта?",
            answer: "Для Next.js: Vercel (бесплатно) или Railway. Для Django: DigitalOcean, Selectel. Рекомендую Vercel + Railway — оптимальный баланс цены и удобства.",
        },
    ],

    ctaTitle: "Хотите сайт под ключ за 14 дней?",
    ctaSubtitle: "Разработаю сайт с нуля: дизайн, код, SEO, запуск. От 50 000 ₽. Бесплатная оценка и точная смета за 24 часа.",
    ctaSource: "article-razrabotka-sajta-pod-klyuch-veb-cta",

    structuredData: makeArticleSchema(
        "razrabotka-sajta-pod-klyuch-veb",
        "Разработка сайта под ключ: что входит, стоимость, сроки",
        "Разработка сайта под ключ: от дизайна до запуска. Стоимость от 50 000 ₽. Next.js, Python, FastAPI. Реальные кейсы.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько стоит разработка сайта под ключ?", text: "Лендинг — от 30 000 ₽, корпоративный — от 80 000 ₽, интернет-магазин — от 150 000 ₽." },
            { name: "Сколько времени занимает разработка?", text: "Лендинг — 5-14 дней, корпоративный — 21-45 дней, интернет-магазин — 30-90 дней." },
            { name: "Что лучше: WordPress или кастомная разработка?", text: "Для серьёзного бизнеса — кастомная разработка на Next.js + Django. Для простых задач — WordPress." },
            { name: "Что входит в разработку под ключ?", text: "Полный цикл: аналитика, дизайн, frontend, backend, интеграции, тестирование, запуск, поддержка." },
            { name: "Нужна ли CMS?", text: "Если планируете обновлять контент — да. Django Admin — удобная встроенная CMS." },
            { name: "Какой хостинг выбрать?", text: "Для Next.js: Vercel, для Django: DigitalOcean или Railway." },
        ],
        4800,
    ),

    internalLinks: [
        { anchor: "заказать разработку сайта", url: "/razrabotka-servisov", context: "Разработка сервисов и сайтов" },
        { anchor: "сайты на заказ", url: "/blog/sajty-na-zakaz", context: "Полное руководство по сайтам на заказ" },
        { anchor: "создание лендинга", url: "/blog/sozdanie-lendinga", context: "Полное руководство по созданию лендингов" },
        { anchor: "создание интернет-магазина", url: "/blog/sozdanie-internet-magazina", context: "Разработка интернет-магазинов" },
        { anchor: "заказать сайт на Tilda", url: "/blog/zakazat-sajt-na-tilde", context: "Быстрый старт на конструкторе" },
        { anchor: "заказать сайт на 1С-Битрикс", url: "/blog/zakazat-sajt-na-bitrix", context: "Корпоративные решения на Битрикс" },
        { anchor: "разработка CRM", url: "/razrabotka-crm", context: "CRM-системы для бизнеса" },
        { anchor: "Python-разработка под ключ", url: "/blog/python-razrabotka-pod-klyuch", context: "Python для веб-разработки" },
        { anchor: "интеграция API", url: "/razrabotka-api", context: "REST API для веб-приложений" },
    ],
};
