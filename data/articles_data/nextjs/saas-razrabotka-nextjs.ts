import { Article, makeArticleSchema } from '../types';
import { saasRazrabotkaNextjsPart1 } from './texts/saas-razrabotka-nextjs-part1';
import { saasRazrabotkaNextjsPart2 } from './texts/saas-razrabotka-nextjs-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleSaasRazrabotkaNextjs: Article = {
    slug: "saas-razrabotka-nextjs",
    title: "SaaS-разработка на Next.js: архитектура и стек | DimaRazrab",
    metaDescription: "SaaS-разработка на Next.js: архитектура, стек, мультитенантность, биллинг. Кейсы с ROI 480-680%. Создание SaaS от 200 000 ₽. Консультация →",
    keywords: "saas разработка next.js, создание saas next.js, saas архитектура, next.js saas, saas подписки, мультитенантность next.js",
    h1: "SaaS-разработка на Next.js: архитектура и стек",
    ogTitle: "SaaS-разработка на Next.js — архитектура, стек, кейсы | DimaRazrab",
    ogDescription: "Полное руководство по SaaS на Next.js. Архитектура, стек, мультитенантность, биллинг. 3 кейса с ROI 480-680%.",
    canonical: `${SITE_URL}/blog/saas-razrabotka-nextjs`,
    heroBadge: "🚀 SaaS • Next.js • Подписки",
    heroSubtitle: "Полное руководство: архитектура SaaS на Next.js, стек технологий, мультитенантность, система подписок. Три кейса с ROI 480-680%.",
    readingTime: "19 мин чтения",
    wordCount: "~5700 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "saas-nextjs-intro", title: "Почему Next.js для SaaS" },
        { id: "saas-architecture", title: "Архитектура: монолит vs микросервисы" },
        { id: "saas-tech-stack", title: "Полный стек технологий" },
        { id: "saas-auth", title: "Авторизация и мультитенантность" },
        { id: "case-dating-saas", title: "Кейс: платформа знакомств" },
        { id: "case-cinema-saas", title: "Кейс: стриминговая платформа" },
        { id: "case-marketplace-saas", title: "Кейс: автоматизация маркетплейсов" },
        { id: "saas-billing", title: "Система подписок и биллинга" },
        { id: "saas-cost", title: "Стоимость SaaS-разработки" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...saasRazrabotkaNextjsPart1, ...saasRazrabotkaNextjsPart2],

    faq: [
        {
            question: "Next.js подходит для B2B SaaS?",
            answer: "Да. SSR обеспечивает быструю загрузку дашбордов, App Router — сложную навигацию, Server Components — безопасную бизнес-логику.",
        },
        {
            question: "Какую базу данных выбрать для SaaS на Next.js?",
            answer: "PostgreSQL — стандарт. Для serverless: Neon или Supabase. Для кеширования: Redis через Upstash. Prisma ORM работает со всеми.",
        },
        {
            question: "Как реализовать мультитенантность в Next.js?",
            answer: "Три подхода: shared DB + tenant_id (самый простой), schema per tenant, database per tenant. Для 90% SaaS достаточно первого.",
        },
        {
            question: "Сколько пользователей выдержит SaaS на Next.js?",
            answer: "Next.js на Vercel масштабируется автоматически: от 100 до 10 000 000 запросов в день. Ограничения — в базе данных, не во фреймворке.",
        },
        {
            question: "Нужен ли отдельный бэкенд для SaaS на Next.js?",
            answer: "Для 80% SaaS — нет. API Routes и Server Actions покрывают потребности. Отдельный бэкенд нужен для тяжёлых задач и ML.",
        },
        {
            question: "Сколько стоит SaaS на Next.js?",
            answer: "MVP: 200 000-500 000₽. Полнофункциональный: 500 000-1 500 000₽. Enterprise: 1 500 000-5 000 000₽. ROI 480-680% за 3-4 месяца.",
        },
    ],

    ctaTitle: "Хотите создать SaaS-продукт на Next.js?",
    ctaSubtitle: "Бесплатная консультация — спроектируем архитектуру, подберём стек и оценим стоимость SaaS-разработки.",
    ctaSource: "article-nextjs-saas-cta",

    structuredData: makeArticleSchema(
        "saas-razrabotka-nextjs",
        "SaaS-разработка на Next.js: архитектура и стек",
        "SaaS-разработка на Next.js: архитектура, стек, мультитенантность, биллинг. Кейсы с ROI 480-680%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Почему Next.js для SaaS?", text: "Next.js покрывает весь стек SaaS: маркетинг (SSG), продукт (SSR), API (Routes), авторизация (Middleware), платежи (Stripe)." },
            { name: "Какую архитектуру выбрать для SaaS?", text: "Начинайте с монолита. Переводите на микросервисы только при реальной необходимости масштабирования." },
            { name: "Как реализовать мультитенантность?", text: "Shared DB + tenant_id — для 90% SaaS. Schema per tenant — для enterprise с требованиями к изоляции." },
            { name: "Сколько стоит SaaS на Next.js?", text: "MVP: 200 000-500 000₽. Полный SaaS: 500 000-1 500 000₽. ROI 480-680% за 3-4 месяца." },
            { name: "Нужен ли отдельный бэкенд?", text: "Для 80% SaaS — нет. Next.js API Routes и Server Actions покрывают потребности." },
            { name: "Какую БД выбрать для SaaS?", text: "PostgreSQL (Neon/Supabase) + Redis (Upstash) + Prisma ORM — стандартный стек." },
        ],
        5700,
    ),

    internalLinks: [
        { anchor: "разработка на Next.js", url: "/nextjs-razrabotka", context: "Полное руководство по Next.js" },
        { anchor: "SEO-оптимизация на Next.js", url: "/blog/nextjs-seo-optimizaciya", context: "SEO для SaaS" },
        { anchor: "Next.js vs React", url: "/blog/nextjs-vs-react", context: "Сравнение фреймворков" },
        { anchor: "создание сайта на Next.js", url: "/blog/sozdanie-sajta-nextjs", context: "Пошаговое руководство" },
        { anchor: "заказать SaaS на Next.js", url: "/nextjs-razrabotka", context: "Услуги SaaS-разработки" },
    ],
};
