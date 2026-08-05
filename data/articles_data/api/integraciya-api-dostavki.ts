import { Article, makeArticleSchema } from '../types';
import { integraciyaApiDostavkiPart1 } from './texts/integraciya-api-dostavki-part1';
import { integraciyaApiDostavkiPart2 } from './texts/integraciya-api-dostavki-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleIntegraciyaApiDostavki: Article = {
    slug: "integraciya-api-dostavki",
    title: "Интеграция API доставки: СДЭК, Почта России, Boxberry | DimaRazrab",
    metaDescription: "Интеграция API доставки от 15 000 ₽. СДЭК, Почта России, Boxberry, Деловые Линии. Автоматический расчёт стоимости и отслеживание. Оценка бесплатно →",
    keywords: "сдэк api интеграция, интеграция api доставки, api доставки интеграция, интеграция сдэк api, почта россии api интеграция, boxberry api интеграция",
    h1: "Интеграция API доставки: СДЭК, Почта России, Boxberry — полное руководство",
    ogTitle: "Интеграция API доставки — СДЭК, Почта России, Boxberry с ROI 340%",
    ogDescription: "Как интегрировать API служб доставки для автоматизации логистики. СДЭК, Почта России, Boxberry. 3 реальных кейса с конкретными цифрами.",
    canonical: `${SITE_URL}/blog/integraciya-api-dostavki`,
    heroBadge: "🚚 Доставка • API • Автоматизация",
    heroSubtitle: "Полное руководство по интеграции API доставки: СДЭК, Почта России, Boxberry, Деловые Линии. Три реальных кейса с ROI 200-680%.",
    readingTime: "18 мин чтения",
    wordCount: "~5200 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "zachem-integraciya-dostavki", title: "Зачем нужна интеграция с доставкой" },
        { id: "obzor-api-dostavki", title: "Обзор API служб доставки" },
        { id: "etapy-integracii-dostavki", title: "Этапы интеграции" },
        { id: "kalkulyator-dostavki", title: "Калькулятор доставки на сайте" },
        { id: "otslezhivanie-dostavki", title: "Отслеживание доставки" },
        { id: "technologies-dostavki", title: "Технологии для интеграции" },
        { id: "stoimost-dostavki", title: "Стоимость интеграции" },
        { id: "keys-dostavki", title: "Кейсы из портфолио" },
        { id: "oshibki-dostavki", title: "Типичные ошибки" },
        { id: "faq-dostavki", title: "Частые вопросы" },
        { id: "conclusion-dostavki", title: "Заключение" },
    ],

    sections: [...integraciyaApiDostavkiPart1, ...integraciyaApiDostavkiPart2],

    faq: [
        {
            question: "Сколько стоит интеграция API доставки?",
            answer: "Базовая интеграция с одной службой — от 15 000 ₽. Комплексная интеграция с несколькими службами и 1С — от 60 000 ₽.",
        },
        {
            question: "Какие службы доставки можно интегрировать?",
            answer: "СДЭК, Почта России, Boxberry, Деловые Линии, DPD, Энергия, ПЭК — все крупные службы имеют API.",
        },
        {
            question: "Сколько времени занимает интеграция?",
            answer: "Базовая: 5-10 дней. Средняя: 2-3 недели. Комплексная: 3-6 недель.",
        },
        {
            question: "Можно ли показывать калькулятор доставки на сайте?",
            answer: "Да, калькулятор запрашивает стоимость у нескольких служб и показывает сравнение с кэшированием.",
        },
        {
            question: "Как быстро окупается интеграция?",
            answer: "ROI 200-340% за 1-3 месяца за счёт экономии времени и роста конверсии.",
        },
    ],

    ctaTitle: "Хотите автоматизировать доставку через API?",
    ctaSubtitle: "Бесплатная консультация — определим задачи, подберём службы доставки и оценим стоимость интеграции. От 15 000 ₽.",
    ctaSource: "article-dostavka-cta",

    structuredData: makeArticleSchema(
        "integraciya-api-dostavki",
        "Интеграция API доставки: СДЭК, Почта России, Boxberry — полное руководство",
        "Интеграция API доставки от 15 000 ₽. СДЭК, Почта России, Boxberry, Деловые Линии. Автоматический расчёт стоимости и отслеживание.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько стоит интеграция API доставки?", text: "Базовая: от 15 000 ₽. Средняя: 30 000–60 000 ₽. Комплексная: 60 000–150 000 ₽." },
            { name: "Какие службы доставки можно интегрировать?", text: "СДЭК, Почта России, Boxberry, Деловые Линии, DPD — все крупные службы имеют API." },
            { name: "Сколько времени занимает интеграция?", text: "Базовая: 5-10 дней. Средняя: 2-3 недели. Комплексная: 3-6 недель." },
            { name: "Как быстро окупается интеграция?", text: "ROI 200-340% за 1-3 месяца за счёт экономии времени и роста конверсии." },
            { name: "Можно ли показать калькулятор доставки на сайте?", text: "Да, калькулятор запрашивает стоимость у нескольких служб и показывает сравнение." },
            { name: "Что автоматизирует API доставки?", text: "Расчёт стоимости, создание заказов, отслеживание, печать этикеток, уведомления." },
        ],
        5200,
    ),

    internalLinks: [
        { anchor: "заказать интеграцию API доставки", url: "/razrabotka-api", context: "Интеграция доставки для бизнеса" },
        { anchor: "интеграция API маркетплейсов", url: "/blog/integraciya-api-marketplejsov", context: "Автоматизация маркетплейсов" },
        { anchor: "интеграция API с сайтом", url: "/blog/integraciya-api-s-sajtom", context: "Подключение API к фронтенду" },
        { anchor: "webhook-интеграция", url: "/blog/webhook-integraciya", context: "Мгновенные уведомления" },
        { anchor: "интеграция API с CRM", url: "/blog/integraciya-api-s-crm", context: "Связь с CRM" },
        { anchor: "разработка REST API", url: "/blog/razrabotka-rest-api", context: "Создание API-сервисов" },
        { anchor: "FastAPI для разработки API", url: "/blog/fastapi-dlya-api", context: "Почему FastAPI" },
    ],
};
