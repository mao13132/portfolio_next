import { Article, makeArticleSchema } from '../types';
import { nextjsSeoOptimizaciyaPart1 } from './texts/nextjs-seo-optimizaciya-part1';
import { nextjsSeoOptimizaciyaPart2 } from './texts/nextjs-seo-optimizaciya-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleNextjsSeoOptimizaciya: Article = {
    slug: "nextjs-seo-optimizaciya",
    title: "Next js и figma разработке code сайта: полное руководство — кейсы",
    metaDescription: "Next js и figma разработке code сайта от 80 000 ₽. SSR, SSG, высокая производительность и встроенная SEO-оптимизация, от 10. Бесплатная оценка за 24 часа →",
    keywords: "seo next.js, seo оптимизация next.js, next.js seo, core web vitals next.js, ssr seo, next.js мета теги, seo nextjs",
    h1: "SEO-оптимизация на Next.js: полное руководство",
    ogTitle: "SEO-оптимизация на Next.js — руководство с кейсами | DimaRazrab",
    ogDescription: "Полное руководство по SEO на Next.js. SSR, Core Web Vitals, structured data. 3 кейса с +520% трафика. SEO-аудит бесплатно.",
    canonical: `${SITE_URL}/blog/nextjs-seo-optimizaciya`,
    heroBadge: "🔍 SEO • Next.js • Трафик",
    heroSubtitle: "Полное руководство: как Next.js решает SEO-задачи. SSR, Core Web Vitals, structured data. Три кейса с +480-520% ростом органического трафика.",
    readingTime: "19 мин чтения",
    wordCount: "~5800 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "seo-nextjs-intro", title: "Почему Next.js лучший для SEO" },
        { id: "core-web-vitals", title: "Core Web Vitals в Next.js" },
        { id: "meta-tags", title: "Мета-теги и structured data" },
        { id: "ssr-seo", title: "SSR vs SSG vs ISR для SEO" },
        { id: "case-dating-seo", title: "Кейс: +520% трафика" },
        { id: "case-cinema-seo", title: "Кейс: органический трафик с 15% до 68%" },
        { id: "case-marketplace-seo", title: "Кейс: 78% товаров в ТОП-10" },
        { id: "technical-seo-checklist", title: "Чеклист технического SEO" },
        { id: "seo-tools", title: "Инструменты SEO-мониторинга" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...nextjsSeoOptimizaciyaPart1, ...nextjsSeoOptimizaciyaPart2],

    faq: [
        {
            question: "Next.js лучше Gatsby для SEO?",
            answer: "Да. Gatsby — только SSG, а Next.js поддерживает SSR, SSG и ISR. Для динамических проектов Next.js однозначно лучше.",
        },
        {
            question: "Google одинаково индексирует SSR и SSG?",
            answer: "Да, Google обрабатывает SSR и SSG одинаково — получает готовый HTML. ISR — лучший вариант: скорость SSG + актуальность SSR.",
        },
        {
            question: "Нужен ли отдельный SEO-плагин для Next.js?",
            answer: "Нет. Next.js имеет встроенный Metadata API, который полностью покрывает потребности SEO. Для sitemap используйте next-sitemap.",
        },
        {
            question: "Сколько времени нужно для SEO-результатов после миграции на Next.js?",
            answer: "Первые результаты — через 2-4 недели. Значительный рост трафика — через 2-3 месяца. В проектах: +300% за месяц, +520% за три месяца.",
        },
        {
            question: "Next.js влияет на позиции в Яндексе?",
            answer: "Да, положительно. Яндекс хуже обрабатывает JavaScript. SSR в Next.js решает эту проблему. Рост трафика из Яндекса: +200-400%.",
        },
        {
            question: "Как проверить, что Google видит SSR-контент?",
            answer: "Google Search Console — раздел «Проверка URL». Или отключите JavaScript в DevTools: если контент виден — SSR работает.",
        },
    ],

    ctaTitle: "Хотите SEO-оптимизацию вашего сайта на Next.js?",
    ctaSubtitle: "Бесплатный SEO-аудит — найдём точки роста и оценим стоимость оптимизации. От 80 000₽.",
    ctaSource: "article-nextjs-seo-cta",

    structuredData: makeArticleSchema(
        "nextjs-seo-optimizaciya",
        "SEO-оптимизация на Next.js: полное руководство",
        "SEO-оптимизация на Next.js: SSR, Core Web Vitals, structured data. Кейсы с +520% трафика. SEO-аудит бесплатно.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Почему Next.js лучше для SEO?", text: "Next.js генерирует полный HTML на сервере (SSR/SSG), что обеспечивает мгновенную индексацию Google и Яндекс." },
            { name: "Как Next.js оптимизирует Core Web Vitals?", text: "Через next/image, next/font, Streaming и Server Components. LCP с 4 сек до 1 сек." },
            { name: "Сколько времени для SEO-результатов?", text: "Первые результаты через 2-4 недели. +520% трафика за 3 месяца в реальных проектах." },
            { name: "Нужен ли SEO-плагин для Next.js?", text: "Нет. Встроенный Metadata API + JSON-LD полностью покрывают потребности SEO." },
            { name: "Next.js лучше Gatsby для SEO?", text: "Да. Next.js поддерживает SSR, SSG и ISR. Gatsby — только SSG." },
            { name: "Как проверить SSR в Next.js?", text: "Отключите JavaScript в DevTools. Если контент виден — SSR работает. Или через Search Console." },
        ],
        5800,
    ),

    internalLinks: [
        { anchor: "разработка на Next.js", url: "/nextjs-razrabotka", context: "Полное руководство по Next.js" },
        { anchor: "SaaS-разработка на Next.js", url: "/blog/saas-razrabotka-nextjs", context: "Архитектура SaaS" },
        { anchor: "Next.js vs React", url: "/blog/nextjs-vs-react", context: "Сравнение фреймворков" },
        { anchor: "создание сайта на Next.js", url: "/blog/sozdanie-sajta-nextjs", context: "Пошаговое руководство" },
        { anchor: "заказать SEO-оптимизацию", url: "/nextjs-razrabotka", context: "Услуги SEO на Next.js" },
    ],
};
