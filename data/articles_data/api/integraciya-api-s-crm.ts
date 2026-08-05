import { Article, makeArticleSchema } from '../types';
import { integraciyaApiSCrmPart1 } from './texts/integraciya-api-s-crm-part1';
import { integraciyaApiSCrmPart2 } from './texts/integraciya-api-s-crm-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleIntegraciyaApiSCrm: Article = {
    slug: "integraciya-api-s-crm",
    title: "Яндекс маркет интеграция API: заказать от 80 000 ₽, от 21 дня",
    metaDescription: "Интеграция яндекс маркет интеграция api от 80 000 ₽. Кастомная CRM для вашего бизнеса, интеграция с 1С, Telegram и amoCRM. Бесплатная оценка за 24 часа →",
    keywords: "интеграция api crm, битрикс интеграция api, api интеграция яндекс, amoCRM api интеграция, интеграция crm api, crm api интеграция",
    h1: "Интеграция API с CRM-системами: amoCRM, Битrix24, Яндекс",
    ogTitle: "Интеграция API с CRM — amoCRM, Битrix24 с ROI 680%",
    ogDescription: "Как интегрировать API с CRM для автоматизации продаж. amoCRM, Битrix24, Яндекс.Коннект. 3 реальных кейса с конкретными цифрами.",
    canonical: `${SITE_URL}/blog/integraciya-api-s-crm`,
    heroBadge: "📊 CRM • API • Продажи",
    heroSubtitle: "Полное руководство по интеграции API с CRM: amoCRM, Битrix24, Яндекс.Коннект. Три реальных кейса с ROI 200-680%.",
    readingTime: "19 мин чтения",
    wordCount: "~5400 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "zachem-integraciya-crm", title: "Зачем интегрировать API с CRM" },
        { id: "obzor-crm", title: "Обзор CRM-систем" },
        { id: "etapy-integracii-crm", title: "Этапы интеграции" },
        { id: "avtomatizaciya-voronki", title: "Автоматизация воронки продаж" },
        { id: "integraciya-s-istochnikami", title: "Интеграция с источниками лидов" },
        { id: "technologies-crm", title: "Технологии для интеграции" },
        { id: "stoimost-crm", title: "Стоимость интеграции" },
        { id: "keys-crm", title: "Кейсы из портфолио" },
        { id: "oshibki-crm", title: "Типичные ошибки" },
        { id: "faq-crm", title: "Частые вопросы" },
        { id: "conclusion-crm", title: "Заключение" },
    ],

    sections: [...integraciyaApiSCrmPart1, ...integraciyaApiSCrmPart2],

    faq: [
        {
            question: "Сколько стоит интеграция API с CRM?",
            answer: "Базовая интеграция с одним источником лидов — от 20 000 ₽. Комплексная интеграция с несколькими источниками и 1С — от 80 000 ₽.",
        },
        {
            question: "Какую CRM выбрать для интеграции?",
            answer: "amoCRM — для продаж и маркетинга. Битrix24 — для комплексной автоматизации. Яндекс.Коннект — для простого учёта.",
        },
        {
            question: "Сколько времени занимает интеграция?",
            answer: "Базовая: 5-10 дней. Средняя: 2-4 недели. Комплексная: 4-8 недель.",
        },
        {
            question: "Можно ли интегрировать CRM с Telegram-ботом?",
            answer: "Да, Telegram-бот собирает лиды и автоматически передаёт их в CRM через API.",
        },
        {
            question: "Как быстро окупается интеграция?",
            answer: "ROI 200-680% за 1-3 месяца за счёт снижения потери лидов и увеличения конверсии.",
        },
    ],

    ctaTitle: "Хотите интеграцию API с CRM от 15 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — определим задачи, выберем CRM и оценим стоимость интеграции. От 20 000 ₽.",
    ctaSource: "article-crm-cta",

    structuredData: makeArticleSchema(
        "integraciya-api-s-crm",
        "Интеграция API с CRM-системами: amoCRM, Битrix24, Яндекс",
        "Интеграция API с CRM от 20 000 ₽. amoCRM, Битrix24, Яндекс.Коннект. Автоматическая передача лидов. Реальные кейсы.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько стоит интеграция API с CRM?", text: "Базовая: от 20 000 ₽. Средняя: 35 000–80 000 ₽. Комплексная: 80 000–200 000 ₽." },
            { name: "Какую CRM выбрать?", text: "amoCRM — для продаж. Битrix24 — для комплексной автоматизации. Яндекс.Коннект — для простого учёта." },
            { name: "Сколько времени занимает интеграция?", text: "Базовая: 5-10 дней. Средняя: 2-4 недели. Комплексная: 4-8 недель." },
            { name: "Как быстро окупается интеграция?", text: "ROI 200-680% за 1-3 месяца за счёт снижения потери лидов и увеличения конверсии." },
            { name: "Можно ли интегрировать CRM с Telegram?", text: "Да, Telegram-бот собирает лиды и автоматически передаёт их в CRM через API." },
            { name: "Что автоматизирует интеграция с CRM?", text: "Передачу лидов, перемещение по воронке, уведомления, задачи, рассылки." },
        ],
        5400,
    ),

    internalLinks: [
        { anchor: "заказать интеграцию API с CRM", url: "/razrabotka-api", context: "Интеграция CRM для бизнеса" },
        { anchor: "интеграция API маркетплейсов", url: "/blog/integraciya-api-marketplejsov", context: "Автоматизация маркетплейсов" },
        { anchor: "интеграция API с сайтом", url: "/blog/integraciya-api-s-sajtom", context: "Подключение API к фронтенду" },
        { anchor: "webhook-интеграция", url: "/blog/webhook-integraciya", context: "Мгновенные уведомления" },
        { anchor: "интеграция API доставки", url: "/blog/integraciya-api-dostavki", context: "Автоматизация доставки" },
        { anchor: "разработка REST API", url: "/blog/razrabotka-rest-api", context: "Создание API-сервисов" },
        { anchor: "FastAPI для разработки API", url: "/blog/fastapi-dlya-api", context: "Почему FastAPI" },
    ],
};
