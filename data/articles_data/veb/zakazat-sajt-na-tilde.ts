import { Article, makeArticleSchema } from '../types';
import { zakazatSajtNaTildePart1 } from './texts/zakazat-sajt-na-tilde-part1';
import { zakazatSajtNaTildePart2 } from './texts/zakazat-sajt-na-tilde-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleZakazatSajtNaTilde: Article = {
    slug: "zakazat-sajt-na-tilde",
    title: "Заказать сайт на тильде: разработка от 10 000 ₽, от 1 дня",
    metaDescription: "Заказать сайт на Tilda от 10 000 ₽. Лендинг, визитка, каталог. Дизайн, SEO, запуск за 3 дня. Бесплатная оценка за 24 часа →",
    keywords: "заказать сайт на тильде, заказы на сайты на тильде, сделаю сайт на заказ на тильде, заказать сайт на тильде под ключ, сколько стоит заказать сайт на тильде, создание сайтов на тильде заказать, тильда создание лендингов, разработка на tilda, разработка сайта на tilda, заказ сайта на тильда",
    h1: "Заказать сайт на Tilda: стоимость, сроки, когда это выгодно",
    ogTitle: "Заказать сайт на Tilda: стоимость от 10 000 ₽, сроки, плюсы и минусы",
    ogDescription: "Полное руководство: когда Tilda — лучший выбор, стоимость от 10 000 ₽, Tilda vs код, реальные кейсы.",
    canonical: `${SITE_URL}/blog/zakazat-sajt-na-tilde`,
    heroBadge: "🖥️ Веб-разработка • Tilda • Конструкторы",
    heroSubtitle: "Полное руководство: когда Tilda — лучший выбор, стоимость от 10 000 ₽, плюсы и минусы. Tilda vs код. Реальные кейсы.",
    readingTime: "16 мин чтения",
    wordCount: "~4000 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-tilda", title: "Что такое Tilda" },
        { id: "when-tilda-best", title: "Когда Tilda — лучший выбор" },
        { id: "when-not-tilda", title: "Когда Tilda НЕ подходит" },
        { id: "cost", title: "Стоимость сайта на Tilda" },
        { id: "creation-process", title: "Этапы создания" },
        { id: "tilda-vs-code", title: "Tilda vs код" },
        { id: "cases", title: "Кейсы" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...zakazatSajtNaTildePart1, ...zakazatSajtNaTildePart2],

    faq: [
        {
            question: "Сколько стоит заказать сайт на Tilda?",
            answer: "Простой лендинг — от 10 000 ₽. Средний с анимациями — 20 000–35 000 ₽. Сайт-визитка — 15 000–35 000 ₽. Плюс тариф Tilda от 600 ₽/мес.",
        },
        {
            question: "Tilda или WordPress — что лучше?",
            answer: "Tilda — для быстрого и красивого результата. WordPress — для гибкости и SEO. Если простой лендинг — Tilda. Если блог или сложный сайт — WordPress.",
        },
        {
            question: "Можно ли потом перенести сайт с Tilda?",
            answer: "Да, но это фактически создание с нуля. Tilda позволяет экспортировать HTML, но он неоптимален. Стоимость миграции — от 30 000 ₽.",
        },
        {
            question: "Нужно ли уметь программировать?",
            answer: "Нет. Tilda — конструктор с визуальным редактором. После запуска можно самостоятельно менять тексты и добавлять страницы.",
        },
        {
            question: "Tilda или Wix — что лучше?",
            answer: "Для российского рынка Tilda лучше: русская поддержка, интеграции с amoCRM и российскими сервисами.",
        },
        {
            question: "Какой тариф Tilda выбрать?",
            answer: "Для одного сайта — «Персональ» (600 ₽/мес). Для нескольких — «Бизнес» (1 000 ₽/мес). Бесплатный — только для тестирования.",
        },
    ],

    ctaTitle: "Хотите сайт на Tilda за 3 дня от 10 000 ₽?",
    ctaSubtitle: "Создам лендинг на Tilda без программиста — быстро, с SEO и мобильной адаптацией. Бесплатная оценка за 24 часа.",
    ctaSource: "article-zakazat-sajt-na-tilde-cta",

    structuredData: makeArticleSchema(
        "zakazat-sajt-na-tilde",
        "Заказать сайт на Tilda: стоимость, примеры, плюсы и минусы",
        "Заказать сайт на Tilda от 10 000 ₽. Лендинг, каталог, магазин. Когда Tilda выгоднее кода.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько стоит сайт на Tilda?", text: "Лендинг от 10 000 ₽, визитка от 15 000 ₽, каталог от 20 000 ₽. Плюс тариф от 600 ₽/мес." },
            { name: "Tilda или код?", text: "Tilda для быстрого старта (от 10K ₽), код для SEO и производительности (от 30K ₽)." },
            { name: "Можно ли перенести с Tilda?", text: "Да, но это создание с нуля. От 30 000 ₽." },
            { name: "Нужно ли программировать?", text: "Нет. Tilda — визуальный конструктор." },
            { name: "Какой тариф выбрать?", text: "Персональ (600 ₽/мес) для одного сайта." },
            { name: "Сроки создания?", text: "1-7 дней." },
        ],
        4000,
    ),

    internalLinks: [
        { anchor: "заказать сайт на Tilda", url: "/razrabotka-servisov", context: "Разработка сервисов и сайтов" },
        { anchor: "создание лендинга", url: "/blog/sozdanie-lendinga", context: "Полное руководство по лендингам" },
        { anchor: "сайты на заказ", url: "/blog/sajty-na-zakaz", context: "Обзор всех типов сайтов" },
        { anchor: "разработка сайта под ключ", url: "/blog/razrabotka-sajta-pod-klyuch-veb", context: "Кастомная разработка вместо конструктора" },
        { anchor: "заказать сайт на 1С-Битрикс", url: "/blog/zakazat-sajt-na-bitrix", context: "Альтернатива для сложных проектов" },
        { anchor: "создание сайта-каталога", url: "/blog/sozdanie-sajta-kataloga", context: "Каталог на Tilda или коде" },
        { anchor: "разработка на Next.js", url: "/blog/sozdanie-sajta-nextjs", context: "Современный фреймворк для сайтов" },
        { anchor: "интеграция API", url: "/razrabotka-api", context: "Подключение платёжных систем и CRM" },
    ],
};
