import { Article, makeArticleSchema } from '../types';
import { razrabotkaNaNextjsPart1 } from './texts/razrabotka-na-nextjs-part1';
import { razrabotkaNaNextjsPart2 } from './texts/razrabotka-na-nextjs-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleRazrabotkaNaNextjs: Article = {
    slug: "razrabotka-na-nextjs",
    title: "Разработка на Next.js: преимущества и возможности | DimaRazrab",
    metaDescription: "Разработка на Next.js: SSR, SSG, ISR, API Routes. Реальные кейсы с ROI 480-680%. Создание сайтов и SaaS от 80 000 ₽. Консультация →",
    keywords: "разработка на next.js, next.js разработка, создание сайта next.js, next.js ssr, next.js преимущества, next.js разработка на заказ",
    h1: "Разработка на Next.js: преимущества и возможности",
    ogTitle: "Разработка на Next.js — преимущества, кейсы, стоимость | DimaRazrab",
    ogDescription: "Полное руководство по разработке на Next.js. SSR, SSG, ISR. 3 реальных кейса с ROI 480-680%. Разработка от 80 000 ₽.",
    canonical: `${SITE_URL}/blog/razrabotka-na-nextjs`,
    heroBadge: "⚡ Next.js • Разработка • SSR",
    heroSubtitle: "Полное руководство: преимущества Next.js, архитектура, стек технологий. Три реальных кейса из моей практики с ROI 480-680%.",
    readingTime: "18 мин чтения",
    wordCount: "~5500 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-nextjs", title: "Что такое Next.js" },
        { id: "nextjs-advantages", title: "Преимущества Next.js для бизнеса" },
        { id: "ssr-vs-ssg", title: "SSR, SSG и ISR: какой подход выбрать" },
        { id: "case-dating", title: "Кейс: платформа знакомств (ROI 520%)" },
        { id: "case-cinema", title: "Кейс: стриминговая платформа (ROI 480%)" },
        { id: "case-marketplace", title: "Кейс: автоматизация маркетплейсов (ROI 680%)" },
        { id: "tech-stack", title: "Технологический стек" },
        { id: "development-process", title: "Процесс разработки" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...razrabotkaNaNextjsPart1, ...razrabotkaNaNextjsPart2],

    faq: [
        {
            question: "Next.js лучше чистого React?",
            answer: "Для большинства коммерческих проектов — да. Next.js добавляет SSR, маршрутизацию, оптимизации и деплой «из коробки». Чистый React подходит только для SPA без SEO.",
        },
        {
            question: "Next.js подходит для высоконагруженных проектов?",
            answer: "Да. Next.js поддерживает serverless-архитектуру, edge-рендеринг, кеширование на CDN. Платформы с миллионами пользователей работают на Next.js: Twitch, Hulu, Notion.",
        },
        {
            question: "Сколько времени занимает разработка на Next.js?",
            answer: "Лендинг: 2-4 недели. Веб-приложение: 4-10 недель. Сложная платформа: 2-6 месяцев. Next.js ускоряет разработку на 30-50%.",
        },
        {
            question: "Next.js хорошо работает с SEO?",
            answer: "Next.js — лучший выбор для SEO среди React-фреймворков. SSR и SSG генерируют полный HTML. В проектах переход на Next.js давал +300-520% органического трафика.",
        },
        {
            question: "Сколько стоит разработка на Next.js?",
            answer: "Лендинг: 80 000-200 000 ₽. Веб-приложение: 200 000-600 000 ₽. Сложная платформа: 600 000-2 000 000 ₽. ROI 480-680% за 3-4 месяца.",
        },
        {
            question: "Какой хостинг выбрать для Next.js?",
            answer: "Vercel — оптимальный выбор (создатели Next.js). Бесплатный тариф для стартовых проектов, автоматический деплой из Git. Альтернативы: AWS, DigitalOcean, Docker.",
        },
    ],

    ctaTitle: "Хотите разработку на Next.js для вашего проекта?",
    ctaSubtitle: "Бесплатная консультация — определим задачи, подберём архитектуру и оценим стоимость разработки на Next.js.",
    ctaSource: "article-nextjs-dev-cta",

    structuredData: makeArticleSchema(
        "razrabotka-na-nextjs",
        "Разработка на Next.js: преимущества и возможности",
        "Разработка на Next.js: SSR, SSG, ISR, API Routes. Реальные кейсы с ROI 480-680%. Создание сайтов и SaaS от 80 000 ₽.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Что такое Next.js?", text: "Next.js — это React-фреймворк от Vercel с серверным рендерингом (SSR), статической генерацией (SSG), маршрутизацией и встроенными оптимизациями." },
            { name: "Next.js лучше чистого React?", text: "Для коммерческих проектов — да. Next.js добавляет SSR, SEO, маршрутизацию и деплой из коробки." },
            { name: "Сколько стоит разработка на Next.js?", text: "Лендинг: 80 000-200 000 ₽. Веб-приложение: 200 000-600 000 ₽. Платформа: 600 000-2 000 000 ₽." },
            { name: "Какой ROI у проектов на Next.js?", text: "В реальных проектах ROI составляет 480-680% за 3-4 месяца за счёт роста конверсии и SEO." },
            { name: "Next.js подходит для SEO?", text: "Да, Next.js — лучший выбор для SEO среди React-фреймворков. SSR даёт полный HTML для поисковиков." },
            { name: "Какой хостинг для Next.js?", text: "Vercel — оптимальный выбор. Автоматический деплой, edge-функции, бесплатный тариф." },
        ],
        5500,
    ),

    internalLinks: [
        { anchor: "SEO-оптимизация на Next.js", url: "/blog/nextjs-seo-optimizaciya", context: "Полное руководство по SEO на Next.js" },
        { anchor: "SaaS-разработка на Next.js", url: "/blog/saas-razrabotka-nextjs", context: "Архитектура и стек для SaaS" },
        { anchor: "Next.js vs React", url: "/blog/nextjs-vs-react", context: "Сравнение фреймворков" },
        { anchor: "создание сайта на Next.js", url: "/blog/sozdanie-sajta-nextjs", context: "Пошаговое руководство" },
        { anchor: "заказать разработку на Next.js", url: "/nextjs-razrabotka", context: "Услуги разработки" },
    ],
};
