import { Article, makeArticleSchema } from '../types';
import { crmMalogoPart1 } from './texts/crm-malogo-part1';
import { crmMalogoPart2 } from './texts/crm-malogo-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleCrmDlyaMalogoBiznesa: Article = {
    slug: "crm-dlya-malogo-biznesa",
    title: "Автоматизация бизнес процессов и разработка прикладных решений",
    metaDescription: "Автоматизация бизнес процессов и разработка прикладных решений от 80 000 ₽. Кастомная CRM для вашего бизнеса, интеграция с 1С,. Бесплатная оценка за 24 часа →",
    keywords: "crm для малого бизнеса, разработка crm для бизнеса, crm внедрение разработка, crm разработка бизнес процессов, crm под ключ, разработка crm систем, заказать crm",
    h1: "CRM для малого бизнеса: зачем нужна, как выбрать и сколько стоит",
    ogTitle: "CRM для малого бизнеса: зачем нужна и как выбрать",
    ogDescription: "Полное руководство: когда малому бизнесу нужна CRM, готовые vs кастомные решения, стоимость, кейсы с ROI 300-580%.",
    canonical: `${SITE_URL}/blog/crm-dlya-malogo-biznesa`,
    heroBadge: "⚙️ CRM • Малый бизнес • Автоматизация",
    heroSubtitle: "Полное руководство по CRM для малого бизнеса: когда нужна, как выбрать, готовые vs кастомные решения. Реальные кейсы с цифрами и ROI.",
    readingTime: "18 мин чтения",
    wordCount: "~5000 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "when-crm", title: "Когда малому бизнесу нужна CRM" },
        { id: "ready-vs-custom", title: "Готовые vs кастомные CRM" },
        { id: "features", title: "Функции CRM для малого бизнеса" },
        { id: "cases", title: "Кейсы из моей практики" },
        { id: "choose", title: "Как выбрать CRM" },
        { id: "cost", title: "Стоимость CRM" },
        { id: "implementation", title: "Как внедрить CRM" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...crmMalogoPart1, ...crmMalogoPart2],

    faq: [
        {
            question: "Какую CRM выбрать для малого бизнеса?",
            answer: "Для типовых процессов — AmoCRM или Bitrix24. Для уникальных — кастомная разработка.",
        },
        {
            question: "Сколько стоит CRM для малого бизнеса?",
            answer: "Готовая: от 990₽/мес за пользователя. Кастомная: от 80 000₽ разработка + 300₽/мес хостинг.",
        },
        {
            question: "Нужна ли CRM, если я работаю один?",
            answer: "До 10 клиентов/неделю — достаточно Excel. Больше 20 — CRM нужна для контроля.",
        },
        {
            question: "Как перенести данные из Excel в CRM?",
            answer: "Импорт из CSV/Excel. Карточки клиентов загружаются автоматически за 1-2 дня.",
        },
        {
            question: "CRM работает с Telegram?",
            answer: "Да. Готовые CRM имеют интеграцию. Кастомная CRM может включать Telegram-бота.",
        },
        {
            question: "Сколько времени занимает внедрение?",
            answer: "Готовая: 1-2 недели. Кастомная: 1-3 месяца. MVP: 3-4 недели.",
        },
    ],

    ctaTitle: "Готовы внедрить CRM в свой бизнес?",
    ctaSubtitle: "Бесплатная консультация — определим, какая CRM подходит именно вам, и посчитаем ROI",
    ctaSource: "article-crm-malogo-cta",

    structuredData: makeArticleSchema(
        "crm-dlya-malogo-biznesa",
        "CRM для малого бизнеса: зачем нужна и как выбрать",
        "CRM для малого бизнеса: готовые vs кастомные решения, стоимость, кейсы с ROI 300-580%. Заказать CRM от 80 000 ₽.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Какую CRM выбрать для малого бизнеса?", text: "Для типовых процессов — AmoCRM или Bitrix24. Для уникальных — кастомная разработка." },
            { name: "Сколько стоит CRM?", text: "Готовая: от 990₽/мес за пользователя. Кастомная: от 80 000₽ разработка." },
            { name: "Нужна ли CRM одиночке?", text: "До 10 клиентов/неделю — достаточно Excel. Больше 20 — CRM нужна." },
            { name: "Как перенести данные из Excel?", text: "Импорт из CSV/Excel автоматически за 1-2 дня." },
            { name: "CRM работает с Telegram?", text: "Да. Готовые CRM имеют интеграцию. Кастомная может включать Telegram-бота." },
            { name: "Сколько времени на внедрение?", text: "Готовая: 1-2 недели. Кастомная: 1-3 месяца. MVP: 3-4 недели." },
        ],
        5000,
    ),
    internalLinks: [
        { anchor: "разработка CRM под ключ", url: "/blog/razrabotka-crm-pod-klyuch", context: "Полное руководство по разработке CRM" },
        { anchor: "заказать разработку CRM", url: "/razrabotka-crm", context: "Коммерческая страница CRM" },
        { anchor: "интеграция CRM с Telegram", url: "/blog/integraciya-crm-s-telegram", context: "Как связать CRM и Telegram" },
        { anchor: "автоматизация бизнеса", url: "/avtomatizaciya-biznesa", context: "Комплексная автоматизация" },
        { anchor: "разработка Telegram-ботов", url: "/razrabotka-botov", context: "Заказать бота для бизнеса" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Комплексная автоматизация малого бизнеса" },
        { anchor: "что можно автоматизировать", url: "/blog/chto-mozhno-avtomatizirovat-v-malom-biznese", context: "10 процессов для автоматизации" },
        { anchor: "автоматизация документооборота", url: "/blog/avtomatizaciya-dokumentooborota", context: "Электронный документооборот" },
    ],
};
