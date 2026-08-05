import { Article, makeArticleSchema } from '../types';
import { sozdanieSajtaNextjsPart1 } from './texts/sozdanie-sajta-nextjs-part1';
import { sozdanieSajtaNextjsPart2 } from './texts/sozdanie-sajta-nextjs-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleSozdanieSajtaNextjs: Article = {
    slug: "sozdanie-sajta-nextjs",
    title: "Next js и figma разработке code сайта: цена от 80 000 ₽, от 10 дней",
    metaDescription: "Создание next js и figma разработке code сайта от 80 000 ₽. SSR, SSG, высокая производительность и встроенная SEO-оптимизация. Бесплатная оценка за 24 часа →",
    keywords: "создание сайта next.js, создание сайта на next.js, как создать сайт next.js, разработка сайта next.js, сайт на next.js, next.js создание сайта",
    h1: "Создание сайта на Next.js: пошаговое руководство",
    ogTitle: "Создание сайта на Next.js — пошаговое руководство | DimaRazrab",
    ogDescription: "Пошаговое руководство по созданию сайта на Next.js. Планирование, разработка, SEO, запуск. 3 кейса с ROI 480-680%.",
    canonical: `${SITE_URL}/blog/sozdanie-sajta-nextjs`,
    heroBadge: "🛠 Создание • Next.js • Сайт",
    heroSubtitle: "Пошаговое руководство: как создать сайт на Next.js от идеи до запуска. Планирование, разработка, SEO-настройка. Три кейса с ROI 480-680%.",
    readingTime: "18 мин чтения",
    wordCount: "~5600 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "why-nextjs-for-site", title: "Почему Next.js для сайта" },
        { id: "planning", title: "Планирование сайта" },
        { id: "setup-project", title: "Настройка проекта" },
        { id: "building-pages", title: "Создание страниц" },
        { id: "case-dating-site", title: "Кейс: платформа знакомств" },
        { id: "case-cinema-site", title: "Кейс: стриминговая платформа" },
        { id: "case-marketplace-site", title: "Кейс: автоматизация маркетплейсов" },
        { id: "seo-setup", title: "SEO-настройка: чеклист" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...sozdanieSajtaNextjsPart1, ...sozdanieSajtaNextjsPart2],

    faq: [
        {
            question: "Сколько стоит создать сайт на Next.js?",
            answer: "Лендинг: 80 000-200 000₽. Корпоративный сайт: 150 000-400 000₽. Интернет-магазин: 300 000-800 000₽. SaaS: 500 000-2 000 000₽.",
        },
        {
            question: "Сколько времени занимает создание сайта?",
            answer: "Лендинг: 2-4 недели. Корпоративный сайт: 4-8 недель. Интернет-магазин: 6-12 недель. SaaS: 2-6 месяцев.",
        },
        {
            question: "Какой хостинг выбрать для Next.js?",
            answer: "Vercel — оптимальный выбор (создатели Next.js). Автоматический деплой из Git, edge-функции, бесплатный тариф.",
        },
        {
            question: "Можно ли создать сайт на Next.js без программиста?",
            answer: "Простой лендинг — да, с Vercel Templates. Для SEO, интеграций, кастомного функционала — нужен разработчик.",
        },
        {
            question: "Next.js подходит для интернет-магазина?",
            answer: "Да. ISR для карточек товаров, SSR для корзины, SSG для каталога. Переход на Next.js давал +240% конверсии.",
        },
        {
            question: "Нужен ли дизайнер для сайта на Next.js?",
            answer: "Для лендинга — можно использовать shadcn/ui. Для корпоративного сайта и выше — рекомендую дизайнера. UI/UX увеличивает конверсию на 20-40%.",
        },
    ],

    ctaTitle: "Хотите сайт на Next.js от 30 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — обсудим проект, спроектируем архитектуру и оценим стоимость создания сайта.",
    ctaSource: "article-nextjs-site-cta",

    structuredData: makeArticleSchema(
        "sozdanie-sajta-nextjs",
        "Создание сайта на Next.js: пошаговое руководство",
        "Создание сайта на Next.js: пошаговое руководство от идеи до запуска. Кейсы с ROI 480-680%. От 80 000 ₽.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Сколько стоит создать сайт на Next.js?", text: "Лендинг: 80 000-200 000₽. Корпоративный: 150 000-400 000₽. Интернет-магазин: 300 000-800 000₽." },
            { name: "Сколько времени занимает создание?", text: "Лендинг: 2-4 недели. Корпоративный: 4-8 недель. Интернет-магазин: 6-12 недель." },
            { name: "Почему Next.js для создания сайта?", text: "SEO из коробки, скорость 0.5-1.5 сек, безопасность, масштабируемость, деплой за 30 секунд." },
            { name: "Какой хостинг для Next.js?", text: "Vercel — оптимальный выбор. Автоматический деплой, edge-функции, бесплатный тариф." },
            { name: "Next.js подходит для e-commerce?", text: "Да. ISR для карточек, SSR для корзины, SSG для каталога. +240% конверсии." },
            { name: "Какой ROI у сайтов на Next.js?", text: "В реальных проектах: 480-680% за 3-4 месяца за счёт скорости и SEO." },
        ],
        5600,
    ),

    internalLinks: [
        { anchor: "разработка на Next.js", url: "/nextjs-razrabotka", context: "Полное руководство по Next.js" },
        { anchor: "SEO-оптимизация на Next.js", url: "/blog/nextjs-seo-optimizaciya", context: "SEO-настройка сайта" },
        { anchor: "SaaS-разработка на Next.js", url: "/blog/saas-razrabotka-nextjs", context: "SaaS на Next.js" },
        { anchor: "Next.js vs React", url: "/blog/nextjs-vs-react", context: "Сравнение фреймворков" },
        { anchor: "заказать создание сайта", url: "/nextjs-razrabotka", context: "Услуги создания сайтов" },
    ],
};
