import { Article, makeArticleSchema } from '../types';
import { nextjsVsReactPart1 } from './texts/nextjs-vs-react-part1';
import { nextjsVsReactPart2 } from './texts/nextjs-vs-react-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleNextjsVsReact: Article = {
    slug: "nextjs-vs-react",
    title: "Next js и figma разработке code сайта: что лучше выбрать в 2026",
    metaDescription: "Сравнение: next js и figma разработке code сайта от 80 000 ₽. SSR, SSG, высокая производительность и встроенная SEO-оптимизация. Бесплатная оценка за 24 часа →",
    keywords: "next.js vs react, next.js или react, что лучше next.js react, сравнение next.js react, миграция react на next.js, react vs nextjs",
    h1: "Next.js vs React: когда и что использовать",
    ogTitle: "Next.js vs React — полное сравнение с кейсами | DimaRazrab",
    ogDescription: "Сравнение Next.js и React: производительность, SEO, стоимость. 3 кейса миграции с ROI 480-520%. Бесплатная консультация.",
    canonical: `${SITE_URL}/blog/nextjs-vs-react`,
    heroBadge: "⚔️ Next.js vs React • Сравнение",
    heroSubtitle: "Полное сравнение Next.js и React: производительность, SEO, стоимость, когда что выбирать. Три реальных кейса миграции с ROI 480-520%.",
    readingTime: "18 мин чтения",
    wordCount: "~5400 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "comparison-intro", title: "Next.js vs React: в чём разница" },
        { id: "performance-comparison", title: "Производительность" },
        { id: "seo-comparison", title: "SEO: Next.js vs React" },
        { id: "case-dating-comparison", title: "Кейс: миграция на Next.js" },
        { id: "case-cinema-comparison", title: "Кейс: стриминг на Next.js" },
        { id: "case-dubai", title: "Кейс: когда WordPress лучше" },
        { id: "migration-guide", title: "Как мигрировать с React на Next.js" },
        { id: "cost-comparison", title: "Сравнение стоимости" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...nextjsVsReactPart1, ...nextjsVsReactPart2],

    faq: [
        {
            question: "React умирает?",
            answer: "Нет. React остаётся самой популярной UI-библиотекой. Но будущее React — в фреймворках (Next.js, Remix), а не в чистом CRA/Vite.",
        },
        {
            question: "Когда точно не нужен Next.js?",
            answer: "Для внутренних дашбордов без SEO, мобильных приложений (React Native), Electron-приложений, Chrome Extensions.",
        },
        {
            question: "Next.js сложнее React?",
            answer: "Немного. Next.js добавляет SSR, SSG, ISR, Server Components. Но 80% кода — обычные React-компоненты. Сложность окупается встроенными решениями.",
        },
        {
            question: "Можно ли использовать Next.js без SSR?",
            answer: "Да. Можно использовать SSG или даже CSR через 'use client'. Но теряется главное преимущество Next.js.",
        },
        {
            question: "Что лучше для портфолио: React или Next.js?",
            answer: "Next.js. Портфолио — публичный сайт, который должен индексироваться. Плюс знание Next.js — более востребованный навык.",
        },
        {
            question: "Сколько стоит миграция с React на Next.js?",
            answer: "От 100 000₽ для среднего проекта. Срок: 2-4 недели. Окупается за первую неделю за счёт роста SEO и конверсии.",
        },
    ],

    ctaTitle: "Разработка на Next.js от 30 000 ₽ — React или Next?",
    ctaSubtitle: "Бесплатная консультация — поможем выбрать оптимальную технологию для вашего проекта и оценим стоимость.",
    ctaSource: "article-nextjs-vs-react-cta",

    structuredData: makeArticleSchema(
        "nextjs-vs-react",
        "Next.js vs React: когда и что использовать",
        "Next.js vs React: сравнение производительности, SEO, стоимости. Реальные кейсы миграции с ROI 480-520%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "В чём разница между Next.js и React?", text: "React — UI-библиотека, Next.js — полноценный фреймворк с SSR, маршрутизацией, оптимизациями и деплоем из коробки." },
            { name: "Когда выбирать React вместо Next.js?", text: "Для внутренних дашбордов без SEO, мобильных приложений (React Native), Electron-приложений." },
            { name: "Next.js быстрее React?", text: "Да. LCP: 1.1 сек vs 4.1 сек. FCP: 0.5 сек vs 2.4 сек. Bundle size: -67%." },
            { name: "Сколько стоит миграция с React на Next.js?", text: "От 100 000₽. Срок: 2-4 недели. Окупается за первую неделю." },
            { name: "React умирает?", text: "Нет. React развивается в сторону фреймворков (Next.js, Remix). Знание Next.js — более востребованный навык." },
            { name: "Next.js лучше для SEO?", text: "Да. SSR = мгновенная индексация. В проектах: +520% органического трафика после миграции." },
        ],
        5400,
    ),

    internalLinks: [
        { anchor: "разработка на Next.js", url: "/nextjs-razrabotka", context: "Полное руководство по Next.js" },
        { anchor: "SEO-оптимизация на Next.js", url: "/blog/nextjs-seo-optimizaciya", context: "SEO на Next.js" },
        { anchor: "SaaS-разработка на Next.js", url: "/blog/saas-razrabotka-nextjs", context: "SaaS на Next.js" },
        { anchor: "создание сайта на Next.js", url: "/blog/sozdanie-sajta-nextjs", context: "Пошаговое руководство" },
        { anchor: "заказать разработку", url: "/nextjs-razrabotka", context: "Услуги разработки" },
    ],
};
