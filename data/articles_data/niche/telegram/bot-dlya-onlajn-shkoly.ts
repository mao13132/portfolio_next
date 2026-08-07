import { Article, makeArticleSchema } from '../../types';
import { botDlyaOnlajnShkolyPart1 } from './texts/bot-dlya-onlajn-shkoly-part1';
import { botDlyaOnlajnShkolyPart2 } from './texts/bot-dlya-onlajn-shkoly-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaOnlajnShkoly: Article = {
    slug: "bot-dlya-onlajn-shkoly",
    title: "Telegram бот для онлайн-школы: продажа курсов, доступы, оплата",
    metaDescription: "Telegram бот для онлайн-школы от 50 000 ₽. Продажа курсов, оплата, выдача доступов, расписание уроков. ROI 450%.. Продажа к. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для онлайн-школы, бот для курсов, автоматизация онлайн-школы, telegram бот обучение, бот для продажи курсов",
    h1: "Telegram бот для онлайн-школы: как увеличить доход на 380% через автоматизацию продаж",
    ogTitle: "Telegram бот для онлайн-школы — продажа курсов, ROI 450%",
    ogDescription: "Как онлайн-школа увеличила доход на 380% благодаря Telegram-боту. Продажа курсов, оплата, выдача доступов автоматически.",
    canonical: `${SITE_URL}/blog/bot-dlya-onlajn-shkoly`,
    heroBadge: "🎓 Онлайн-школа • Автоматизация • 2026",
    heroSubtitle: "Как онлайн-школа йоги увеличила доход на 380% за 5 месяцев. Продажа курсов через Telegram, автоматическая выдача доступов, конверсия 35%.",
    readingTime: "15 мин чтения",
    wordCount: "~4000 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему онлайн-школы теряют учеников" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота для школы" },
        { id: "case", title: "Кейс: +380% дохода" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план внедрения" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaOnlajnShkolyPart1, ...botDlyaOnlajnShkolyPart2],
    faq: [
        { question: "Ученики будут покупать курсы через Telegram?", answer: "Да. Telegram Payments позволяет оплатить картой или СБП прямо в боте. Покупка занимает 30 секунд без перехода на сторонний сайт." },
        { question: "Как бот выдаёт доступ к курсу?", answer: "Автоматически после оплаты: добавляет ученика в закрытый чат, отправляет ссылку на материалы, открывает первый урок." },
        { question: "Можно ли продавать подписки?", answer: "Да. Бот поддерживает разовые покупки и подписки. Автоматическое продление и исключение при окончании." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При среднем чеке 5 000 ₽ и 10 дополнительных продажах в месяц." },
    ],
    ctaTitle: "Хотите бота для вашей школы от 50 000 ₽ — за 10 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит конверсию в покупку до 35%",
    ctaSource: "article-shkola-cta",
    structuredData: makeArticleSchema(
        "bot-dlya-onlajn-shkoly",
        "Telegram бот для онлайн-школы: как увеличить доход на 380% через автоматизацию продаж",
        "Telegram бот для онлайн-школы от 50 000 ₽. Продажа курсов, оплата, выдача доступов.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Ученики будут покупать через Telegram?", text: "Да, оплата картой или СБП за 30 секунд." },
            { name: "Как бот выдаёт доступ?", text: "Автоматически после оплаты." },
            { name: "Как быстро окупится?", text: "За 1-2 недели." },
        ],
        4000,
        [
            { name: "Шаг 1: Подготовьте курсы", text: "Список курсов, цены, тарифы." },
            { name: "Шаг 2: Настройте оплату", text: "Telegram Payments, СБП." },
            { name: "Шаг 3: Запустите бота", text: "Тестирование на реальных учениках." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для школы", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот с оплатой", url: "/blog/telegram-bot-s-oplatoj", context: "Приём платежей через бота" },
        { anchor: "Telegram бот для продаж", url: "/blog/telegram-bot-dlya-prodazh", context: "Автоматизация воронки продаж" },
        { anchor: "стоимость разработки Telegram-бота", url: "/blog/stoimost-razrabotki", context: "Реальные цены 2026" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл создания" },
    ],
};
