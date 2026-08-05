import { Article, makeArticleSchema } from '../types';
import { lidogeneraciyaTelegramKakEtoRabotaetPart1 } from './texts/lidogeneraciya-telegram-kak-eto-rabotaet-part1';
import { lidogeneraciyaTelegramKakEtoRabotaetPart2 } from './texts/lidogeneraciya-telegram-kak-eto-rabotaet-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleLidogeneraciyaTelegramKakEtoRabotaet: Article = {
    slug: "lidogeneraciya-telegram-kak-eto-rabotaet",
    title: "Автоматический поиск клиентов: полное руководство — кейсы",
    metaDescription: "Автоматический поиск клиентов от 30 000 ₽. Автоматический поиск клиентов в Telegram, парсинг каналов и рассылки, от 5 дней. Бесплатная оценка за 24 часа →",
    keywords: "лидогенерация telegram, как работает лидогенерация, поиск лидов telegram, автоматический поиск клиентов, лидогенерация как работает",
    h1: "Лидогенерация в Telegram: как работает автоматический поиск",
    ogTitle: "Лидогенерация в Telegram — как работает автоматический поиск лидов",
    ogDescription: "Полное руководство по лидогенерации в Telegram: этапы, технологии, кейсы. ROI 300-500%. Разработка от 30 000 ₽.",
    canonical: `${SITE_URL}/blog/lidogeneraciya-telegram-kak-eto-rabotaet`,
    heroBadge: "🎯 Лидогенерация • Telegram • Автоматизация",
    heroSubtitle: "Полное руководство: как работает автоматическая лидогенерация в Telegram. Три реальных кейса из моей практики с ROI 300-500%.",
    readingTime: "18 мин чтения",
    wordCount: "~5000 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "what-is-leadgen", title: "Что такое лидогенерация в Telegram" },
        { id: "stages", title: "Этапы лидогенерации" },
        { id: "technologies", title: "Технологии для лидогенерации" },
        { id: "case-leads-from-telegram", title: "Кейс: Лидогенерация для психолога" },
        { id: "case-sapis-cllientov", title: "Кейс: Автоматизация записи клиентов" },
        { id: "case-yoga", title: "Кейс: Лидогенерация для школы йоги" },
        { id: "best-practices", title: "Лучшие практики" },
        { id: "cost", title: "Стоимость системы" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...lidogeneraciyaTelegramKakEtoRabotaetPart1, ...lidogeneraciyaTelegramKakEtoRabotaetPart2],

    faq: [
        {
            question: "В чём разница между лидогенерацией и спамом?",
            answer: "Лидогенерация — это ответ на конкретный запрос клиента. Спам — массовая рассылка нерелевантных сообщений. Разница принципиальная.",
        },
        {
            question: "Для каких ниш работает лидогенерация в Telegram?",
            answer: "Для любых услуг: IT, маркетинг, дизайн, юриспруденция, бухгалтерия, образование, недвижимость, здоровье, красота.",
        },
        {
            question: "Сколько клиентов можно получить в месяц?",
            answer: "30-100 клиентов для популярных ниш, 10-30 для узких. При среднем чеке 30 000-100 000₽ — 300 000-3 000 000₽/мес.",
        },
        {
            question: "Нужно ли постоянно отвечать клиентам?",
            answer: "Первый контакт автоматизируется (шаблон + ChatGPT). Дальнейшее общение — вручную. Автоматизация экономит 80% времени.",
        },
        {
            question: "Как избежать блокировки аккаунта?",
            answer: "Не спамить, не писать в личку без запроса, использовать персонализированные ответы, соблюдать лимиты Telegram.",
        },
        {
            question: "Что лучше: лидогенерация или контекстная реклама?",
            answer: "Лидогенерация дешевле в 5-10 раз и эффективнее в 3-5 раз. Оптимально — использовать оба канала.",
        },
    ],

    ctaTitle: "Хотите лидогенерацию в Telegram от 7 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — разберём вашу нишу, подберём подход и оценим стоимость.",
    ctaSource: "article-leadgen-tg-cta",

    structuredData: makeArticleSchema(
        "lidogeneraciya-telegram-kak-eto-rabotaet",
        "Лидогенерация в Telegram: как работает автоматический поиск",
        "Лидогенерация в Telegram: как работает автоматический поиск лидов. Этапы, технологии, кейсы с ROI 300-500%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Что такое лидогенерация в Telegram?", text: "Процесс автоматического поиска и сбора потенциальных клиентов из Telegram-каналов, чатов и групп." },
            { name: "В чём разница между лидогенерацией и спамом?", text: "Лидогенерация — ответ на конкретный запрос. Спам — массовая рассылка нерелевантных сообщений." },
            { name: "Сколько стоит система лидогенерации?", text: "Базовая: 30 000–60 000 ₽. Средняя: 60 000–200 000 ₽. Сложная: 200 000–500 000 ₽." },
            { name: "Сколько клиентов можно получить?", text: "30-100 клиентов в месяц для популярных ниш. ROI 300-500%." },
            { name: "Для каких ниш работает?", text: "Для любых услуг: IT, маркетинг, юриспруденция, образование, здоровье, красота." },
            { name: "Что лучше: лидогенерация или реклама?", text: "Лидогенерация дешевле в 5-10 раз и эффективнее в 3-5 раз." },
        ],
        5000,
    ),

    internalLinks: [
        { anchor: "заказать бота для лидогенерации", url: "/lidogeneraciya-telegram", context: "Разработка ботов для лидогенерации" },
        { anchor: "как найти клиентов в Telegram", url: "/blog/kak-najti-klientov-v-telegram", context: "Руководство по поиску клиентов" },
        { anchor: "парсер Telegram-каналов", url: "/blog/parser-telegram-kanalov", context: "Сбор данных из каналов" },
        { anchor: "разработка ботов", url: "/razrabotka-botov", context: "Telegram-боты для бизнеса" },
        { anchor: "разработка на Python", url: "/blog/python-razrabotka", context: "Python для автоматизации" },
    ],
};
