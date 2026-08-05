import { Article, makeArticleSchema } from '../types';
import { kakNajtiKlientovVTelegramPart1 } from './texts/kak-najti-klientov-v-telegram-part1';
import { kakNajtiKlientovVTelegramPart2 } from './texts/kak-najti-klientov-v-telegram-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleKakNajtiKlientovVTelegram: Article = {
    slug: "kak-najti-klientov-v-telegram",
    title: "Автоматический поиск клиентов: полное руководство — кейсы",
    metaDescription: "Автоматический поиск клиентов от 30 000 ₽. Автоматический поиск клиентов в Telegram, парсинг каналов и рассылки, от 5 дней. Бесплатная оценка за 24 часа →",
    keywords: "как найти клиентов в telegram, поиск клиентов telegram, лидогенерация telegram, сбор контактов telegram, мониторинг чатов telegram",
    h1: "Как найти клиентов в Telegram: автоматический поиск лидов",
    ogTitle: "Как найти клиентов в Telegram — автоматический поиск лидов с ROI 500%",
    ogDescription: "Как автоматизировать поиск клиентов в Telegram. Мониторинг чатов, сбор контактов, ML-фильтрация. 3 реальных кейса.",
    canonical: `${SITE_URL}/blog/kak-najti-klientov-v-telegram`,
    heroBadge: "🎯 Лидогенерация • Telegram • Клиенты",
    heroSubtitle: "Полное руководство: как автоматически находить клиентов в Telegram. Три реальных кейса из моей практики с ROI 500-780%.",
    readingTime: "17 мин чтения",
    wordCount: "~4800 слов",
    publishDate: "2026-08-02",
    modifiedDate: "2026-08-02",
    author: "Дмитрий Малышев",

    toc: [
        { id: "why-telegram", title: "Почему Telegram для поиска клиентов" },
        { id: "methods", title: "Методы поиска клиентов" },
        { id: "how-bot-works", title: "Как работает бот для поиска" },
        { id: "case-leads-from-telegram", title: "Кейс: Поиск клиентов для психолога" },
        { id: "case-people-pars", title: "Кейс: Сбор контактов для агентства" },
        { id: "case-referal-agent", title: "Кейс: Реферальная система" },
        { id: "how-to-start", title: "Как начать: пошаговый план" },
        { id: "cost", title: "Стоимость разработки" },
        { id: "faq", title: "Частые вопросы" },
        { id: "conclusion", title: "Заключение" },
    ],

    sections: [...kakNajtiKlientovVTelegramPart1, ...kakNajtiKlientovVTelegramPart2],

    faq: [
        {
            question: "Это легально — мониторить чаты и собирать контакты?",
            answer: "Да, мониторинг открытых чатов и каналов легален. Это открытая информация. Важно не отправлять спам, а предлагать релевантные услуги.",
        },
        {
            question: "Как быстро приходят первые клиенты?",
            answer: "Первые лиды появляются в день запуска. Конверсия 15-25% при быстром отклике (до 5 минут).",
        },
        {
            question: "Сколько лидов бот находит в день?",
            answer: "Для популярных ниш: 10-30 лидов в день. Для узких ниш: 3-10 лидов. Качество важнее количества.",
        },
        {
            question: "Бот может заблокировать Telegram?",
            answer: "При грамотной реализации — нет. Используем официальные API, соблюдаем лимиты, не спамим.",
        },
        {
            question: "Нужно ли отвечать клиентам вручную?",
            answer: "Первый контакт можно автоматизировать через шаблоны, но дальнейшее общение — вручную. Автоматизация помогает найти клиента, а не продать.",
        },
        {
            question: "Для каких ниш это работает?",
            answer: "Для любых услуг: IT, маркетинг, дизайн, юриспруденция, бухгалтерия, образование, недвижимость, здоровье, красота.",
        },
    ],

    ctaTitle: "Хотите автоматический поиск клиентов в Telegram?",
    ctaSubtitle: "Бесплатная консультация — разберём вашу нишу, подберём подход и оценим стоимость бота.",
    ctaSource: "article-leads-tg-cta",

    structuredData: makeArticleSchema(
        "kak-najti-klientov-v-telegram",
        "Как найти клиентов в Telegram: автоматический поиск лидов",
        "Как найти клиентов в Telegram: автоматический поиск лидов, мониторинг чатов. Реальные кейсы с ROI 500-780%.",
        "2026-08-02", "2026-08-02",
        [
            { name: "Как найти клиентов в Telegram?", text: "Автоматический мониторинг чатов по ключевым словам с мгновенными уведомлениями о новых запросах." },
            { name: "Это легально?", text: "Да, мониторинг открытых чатов легален. Это открытая информация." },
            { name: "Сколько стоит бот для поиска клиентов?", text: "Базовый: 30 000–60 000 ₽. Средний: 60 000–150 000 ₽. Сложный: 150 000–350 000 ₽." },
            { name: "Сколько лидов находит бот в день?", text: "10-30 лидов для популярных ниш, 3-10 для узких ниш." },
            { name: "Как быстро окупается?", text: "ROI 500-780% за 1-2 месяца. Первые лиды в день запуска." },
            { name: "Для каких ниш работает?", text: "Для любых услуг: IT, маркетинг, юриспруденция, образование, здоровье, красота." },
        ],
        4800,
    ),

    internalLinks: [
        { anchor: "заказать бота для лидогенерации", url: "/lidogeneraciya-telegram", context: "Разработка ботов для лидогенерации" },
        { anchor: "парсер Telegram-каналов", url: "/blog/parser-telegram-kanalov", context: "Сбор данных из каналов" },
        { anchor: "лидогенерация в Telegram", url: "/blog/lidogeneraciya-telegram-kak-eto-rabotaet", context: "Как работает лидогенерация" },
        { anchor: "разработка ботов", url: "/razrabotka-botov", context: "Telegram-боты для бизнеса" },
        { anchor: "разработка на Python", url: "/blog/python-razrabotka", context: "Python для автоматизации" },
    ],
};
