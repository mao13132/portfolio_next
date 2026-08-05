import { Article, makeArticleSchema } from '../types';
import { razrabotkaMobilnihPart1 } from './texts/razrabotka-mobilnyh-prilozhenij-part1';
import { razrabotkaMobilnihPart2 } from './texts/razrabotka-mobilnyh-prilozhenij-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleRazrabotkaMobilnihPrilozhenij: Article = {
    slug: "razrabotka-mobilnyh-prilozhenij",
    title: "Разработка мобильных приложений: технологии, стоимость, этапы | DimaRazrab",
    metaDescription: "Разработка мобильных приложений от 300 000 ₽. Flutter, React Native. iOS + Android. Кейсы с ROI 340%. Бесплатная оценка →",
    keywords: "разработка мобильных приложений, создание мобильных приложений, разработка приложений для мобильных устройств, разработка мобильных веб приложений, мобильное приложение на заказ",
    h1: "Разработка мобильных приложений: полное руководство по технологиям, стоимости и этапам",
    ogTitle: "Разработка мобильных приложений — технологии, стоимость, этапы",
    ogDescription: "Полное руководство по разработке мобильных приложений: Flutter, React Native, нативные. Стоимость от 300 000 ₽. Кейсы с ROI 340%.",
    canonical: `${SITE_URL}/blog/razrabotka-mobilnyh-prilozhenij`,
    heroBadge: "📱 Мобильные • Flutter • React Native",
    heroSubtitle: "Полное руководство: как выбрать технологию, рассчитать бюджет и запустить мобильное приложение. Реальные кейсы с конкретными цифрами.",
    readingTime: "21 мин чтения",
    wordCount: "~5800 слов",
    publishDate: "2026-08-04",
    modifiedDate: "2026-08-04",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-mobile-dev", title: "Что такое разработка мобильных приложений" },
        { id: "types", title: "Типы приложений: нативные, кроссплатформенные, гибридные" },
        { id: "technologies", title: "Технологии для разработки" },
        { id: "stages", title: "Этапы разработки" },
        { id: "cost-overview", title: "Стоимость разработки" },
        { id: "case-platform", title: "Кейс: Платформа для стриминга" },
        { id: "case-business", title: "Кейс: Бизнес-платформа" },
        { id: "app-store", title: "Публикация в App Store и Google Play" },
        { id: "support", title: "Поддержка и развитие" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...razrabotkaMobilnihPart1, ...razrabotkaMobilnihPart2],

    faq: [
        {
            question: "Сколько стоит разработка мобильного приложения?",
            answer: "Простое приложение — от 150 000 ₽. Среднее — 300 000-700 000 ₽. Сложное — 700 000-2 000 000 ₽. Кроссплатформенная разработка экономит 30-50% по сравнению с нативной.",
        },
        {
            question: "Flutter или React Native — что лучше?",
            answer: "Flutter лучше для UI-heavy приложений с кастомным дизайном. React Native лучше если команда знает JavaScript. Оба фреймворка позволяют создать приложение для iOS и Android одновременно.",
        },
        {
            question: "Сколько времени занимает разработка?",
            answer: "MVP — 2-3 месяца. Среднее приложение — 3-5 месяцев. Сложное — 6-12 месяцев. Сроки зависят от количества экранов и сложности функциональности.",
        },
        {
            question: "Нужно ли приложение для обеих платформ?",
            answer: "В 90% случаев — да. Кроссплатформенная разработка делает это доступным. Стоимость второй платформы — всего +20-30% к бюджету.",
        },
        {
            question: "Как часто нужно обновлять приложение?",
            answer: "Минимум 1 раз в 2-3 месяца. Apple и Google регулярно обновляют требования. Без обновлений приложение может быть удалено из магазина.",
        },
        {
            question: "Можно ли начать с MVP?",
            answer: "Да, и это рекомендуемый подход. MVP за 2-3 месяца от 300 000 ₽ позволяет проверить гипотезу, получить обратную связь и привлечь инвестиции.",
        },
    ],

    ctaTitle: "Нужно мобильное приложение для вашего бизнеса?",
    ctaSubtitle: "Бесплатная консультация — определим платформу, функциональность и рассчитаем стоимость. Ответ в течение 48 часов.",
    ctaSource: "article-mobile-dev-cta",

    structuredData: makeArticleSchema(
        "razrabotka-mobilnyh-prilozhenij",
        "Разработка мобильных приложений: технологии, стоимость, этапы",
        "Разработка мобильных приложений от 300 000 ₽. Flutter, React Native. iOS + Android. Кейсы с ROI 340%.",
        "2026-08-04", "2026-08-04",
        [
            { name: "Сколько стоит мобильное приложение?", text: "Простое — от 150 000 ₽. Среднее — 300 000-700 000 ₽. Сложное — от 700 000 ₽. Кроссплатформа экономит 30-50%." },
            { name: "Flutter или React Native?", text: "Flutter лучше для UI-heavy приложений. React Native лучше если команда знает JavaScript." },
            { name: "Сколько времени занимает разработка?", text: "MVP — 2-3 месяца. Среднее — 3-5 месяцев. Сложное — 6-12 месяцев." },
            { name: "Нужно ли приложение для обеих платформ?", text: "В 90% случаев — да. Кроссплатформа делает это доступным по цене." },
            { name: "Как часто обновлять приложение?", text: "Минимум 1 раз в 2-3 месяца для совместимости с обновлениями OS." },
            { name: "Можно ли начать с MVP?", text: "Да, MVP за 2-3 месяца от 300 000 ₽ — рекомендуемый подход." },
        ],
        5800,
    ),

    internalLinks: [
        { anchor: "заказать разработку приложения", url: "/razrabotka-servisov", context: "Разработка мобильных приложений" },
        { anchor: "кроссплатформенная разработка", url: "/blog/krossplatformennaya-razrabotka-prilozhenij", context: "Flutter и React Native" },
        { anchor: "стоимость мобильного приложения", url: "/blog/skolko-stoit-mobilnoe-prilozhenie", context: "Разбор цен по типам" },
        { anchor: "разработка для бизнеса", url: "/blog/razrabotka-prilozhenij-dlya-biznesa", context: "Приложения для бизнеса" },
        { anchor: "разработка на Next.js", url: "/blog/razrabotka-na-nextjs", context: "Веб-платформы на Next.js" },
        { anchor: "автоматизация бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация бизнес-процессов" },
    ],
};
