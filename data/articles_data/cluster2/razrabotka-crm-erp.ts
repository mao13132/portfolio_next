import { Article, makeArticleSchema } from '../types';
import { razrabotkaCrmErpPart1 } from './texts/razrabotka-crm-erp-part1';
import { razrabotkaCrmErpPart2 } from './texts/razrabotka-crm-erp-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleRazrabotkaCrmErp: Article = {
    slug: "razrabotka-crm-erp",
    title: "Разработка систем автоматизации бизнес процессов: цена от 80 000 ₽,",
    metaDescription: "Разработка систем автоматизации бизнес процессов от 80 000 ₽. Кастомная CRM для вашего бизнеса, интеграция с 1С, Telegram и. Бесплатная оценка за 24 часа →",
    keywords: "разработка crm erp, разработка erp систем crm, crm внедрение разработка, разработка crm для юридической компании, разработка crm систем",
    h1: "Разработка CRM и ERP систем: отличия, стоимость и этапы внедрения",
    ogTitle: "Разработка CRM и ERP систем — отличия, стоимость, кейсы",
    ogDescription: "Полное руководство: отличия CRM от ERP, этапы разработки, стоимость, кейсы с ROI 300-580%. CRM от 80 000 ₽, CRM + ERP от 150 000 ₽.",
    canonical: `${SITE_URL}/blog/razrabotka-crm-erp`,
    heroBadge: "⚙️ CRM • ERP • Автоматизация",
    heroSubtitle: "Полное руководство по разработке CRM и ERP систем: отличия, этапы, стоимость, кейсы из моей практики. Узнайте, какая система нужна вашему бизнесу.",
    readingTime: "22 мин чтения",
    wordCount: "~5500 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-crm-erp", title: "Что такое CRM и ERP" },
        { id: "crm-vs-erp", title: "CRM vs ERP: отличия" },
        { id: "when-crm-when-erp", title: "Когда нужна CRM, а когда ERP" },
        { id: "stages", title: "Этапы разработки CRM/ERP" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "crm-law", title: "CRM для юридической компании" },
        { id: "mistakes", title: "Внедрение CRM: типичные ошибки" },
        { id: "cases", title: "Кейсы из портфолио" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...razrabotkaCrmErpPart1, ...razrabotkaCrmErpPart2],

    faq: [
        {
            question: "Чем отличается CRM от ERP простыми словами?",
            answer: "CRM работает с клиентами: кто купил, кто на каком этапе воронки, сколько звонков сделал менеджер. ERP работает с ресурсами: сколько товара на складе, какие расходы, хватает ли сырья. CRM увеличивает доход, ERP снижает расходы.",
        },
        {
            question: "Сколько стоит разработка CRM и ERP одновременно?",
            answer: "Базовая связка CRM + ERP: 150 000–250 000 ₽. Средняя (со складом, финансами, производством): 250 000–400 000 ₽. Полная экосистема: 400 000–500 000+ ₽.",
        },
        {
            question: "Можно ли начать с CRM, а потом добавить ERP?",
            answer: "Да, это рекомендуемый подход. Начинаю с CRM: ключевые функции за 3-5 недель. Потом добавляю ERP-модули. Так быстрее, дешевле и с меньшим риском.",
        },
        {
            question: "CRM и ERP можно интегрировать с Telegram?",
            answer: "Да. Telegram-бот может показывать аналитику продаж из CRM, уведомлять о критических остатках на складе из ERP, принимать заявки от клиентов.",
        },
        {
            question: "Сколько времени занимает разработка CRM и ERP?",
            answer: "Простая CRM: 3-5 недель. CRM средней сложности: 5-10 недель. CRM + ERP (базовая): 6-10 недель. Полная экосистема: 2-4 месяца.",
        },
        {
            question: "Что лучше — 1С или кастомная ERP?",
            answer: "1С — стандарт для бухгалтерского учёта в России. Если нужен только бухучёт — 1С достаточен. Если нужна полная ERP с кастомной логикой — кастомная разработка. Кастомная ERP интегрируется с 1С через API.",
        },
    ],

    ctaTitle: "Нужна CRM или ERP от 80 000 ₽?",
    ctaSubtitle: "Разработка CRM от 80 000 ₽, CRM + ERP от 150 000 ₽. Бесплатная оценка вашего проекта за 24 часа.",
    ctaSource: "article-crm-erp-cta",

    structuredData: makeArticleSchema(
        "razrabotka-crm-erp",
        "Разработка CRM и ERP систем: отличия, стоимость, примеры",
        "Разработка CRM и ERP на заказ от 80 000 ₽. Отличия CRM от ERP, этапы внедрения, кейсы с ROI 300%.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Чем отличается CRM от ERP?", text: "CRM работает с клиентами (продажи, воронка). ERP работает с ресурсами (склад, финансы, производство). CRM увеличивает доход, ERP снижает расходы." },
            { name: "Сколько стоит CRM и ERP?", text: "CRM на заказ: 80 000–300 000 ₽. CRM + ERP: 150 000–500 000 ₽. Внедрение готовой CRM: 30 000–100 000 ₽." },
            { name: "Можно ли начать с CRM, потом добавить ERP?", text: "Да. Начинаю с CRM за 3-5 недель, потом добавляю ERP-модули. Рекомендуемый подход." },
            { name: "Сколько времени на разработку?", text: "Простая CRM: 3-5 недель. CRM + ERP: 6-10 недель. Полная экосистема: 2-4 месяца." },
            { name: "CRM для юридической компании — особенности?", text: "Нужны: учёт дел, календарь судов, хранение документов, time tracking, генерация документов. Стоимость: 100 000–400 000 ₽." },
            { name: "Что лучше — 1С или кастомная ERP?", text: "1С для бухучёта. Кастомная ERP для полной автоматизации. Интеграция через API." },
        ],
        5500,
    ),

    internalLinks: [
        { anchor: "заказать разработку CRM", url: "/razrabotka-crm", context: "Коммерческая страница CRM" },
        { anchor: "разработка CRM под ключ", url: "/blog/razrabotka-crm-pod-klyuch", context: "Полное руководство по разработке CRM" },
        { anchor: "CRM для малого бизнеса", url: "/blog/crm-dlya-malogo-biznesa", context: "Готовые vs кастомные решения" },
        { anchor: "интеграция API с CRM", url: "/blog/integraciya-api-s-crm", context: "API-интеграции для CRM" },
        { anchor: "автоматизация бизнеса", url: "/avtomatizaciya-biznesa", context: "Комплексная автоматизация" },
        { anchor: "интеграция CRM с Telegram", url: "/blog/integraciya-crm-s-telegram", context: "Уведомления и управление из мессенджера" },
        { anchor: "заказать разработку CRM", url: "/razrabotka-crm", context: "Страница заказа CRM (money page)" },
        { anchor: "разработка CRM под ключ", url: "/blog/razrabotka-crm-pod-klyuch", context: "Кастомная CRM для бизнеса" },
    ],
};
