import { Article, makeArticleSchema } from '../../types';
import { botDlyaRieltoraPart1 } from './texts/bot-dlya-rieltora-part1';
import { botDlyaRieltoraPart2 } from './texts/bot-dlya-rieltora-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaRieltora: Article = {
    slug: "bot-dlya-rieltora",
    title: "Telegram бот для риелтора: мониторинг, CRM, запись на показы",
    metaDescription: "Telegram бот для риелтора от 45 000 ₽. Мониторинг 15+ площадок 24/7, CRM, ипотечный калькулятор, запись на показы. ROI 420%. Бесплатная оценка →",
    keywords: "telegram бот для риелтора, бот для агентства недвижимости, автоматизация риелтора, мониторинг недвижимости telegram, бот недвижимость",
    h1: "Telegram бот для риелтора: мониторинг 15+ площадок 24/7 и увеличение сделок на 180%",
    ogTitle: "Telegram бот для риелтора — мониторинг и CRM, ROI 420%",
    ogDescription: "Как агентство недвижимости увеличило сделки на 180% благодаря Telegram-боту. Мониторинг 15+ площадок, CRM, запись на показы.",
    canonical: `${SITE_URL}/blog/bot-dlya-rieltora`,
    heroBadge: "🏠 Недвижимость • Автоматизация • 2026",
    heroSubtitle: "Как риелторское агентство увеличило сделки на 180% за 2 месяца. Мониторинг 15+ площадок 24/7, CRM, запись на показы.",
    readingTime: "15 мин чтения",
    wordCount: "~4000 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",
    toc: [
        { id: "problem", title: "Почему риелторы теряют сделки" },
        { id: "how-bot-works", title: "Как бот работает изнутри" },
        { id: "features", title: "Функции бота для риелтора" },
        { id: "case", title: "Кейс: +180% сделок" },
        { id: "cost", title: "Стоимость бота" },
        { id: "implementation", title: "Пошаговый план внедрения" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],
    sections: [...botDlyaRieltoraPart1, ...botDlyaRieltoraPart2],
    faq: [
        { question: "Какие площадки мониторит бот?", answer: "ЦИАН, Авито, ДомКлик, Яндекс.Недвижимость и 10+ других. Количество площадок настраивается." },
        { question: "Как часто бот проверяет площадки?", answer: "Каждые 15 минут. Вы получаете уведомление сразу после появления нового объекта по вашим критериям." },
        { question: "Можно ли настроить фильтры поиска?", answer: "Да. Район, цена, площадь, этаж, количество комнат, метро. У каждого риелтора свои фильтры." },
        { question: "Бот заменит риелтора?", answer: "Нет. Бот автоматизирует рутину (мониторинг, CRM, напоминания) — риелтор focuses на работе с клиентами и закрытии сделок." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. При средней комиссии 150 000 ₽ и 1 дополнительной сделке в месяц." },
    ],
    ctaTitle: "Хотите бота для агентства от 45 000 ₽ — за 10 дней?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит сделки на 180%",
    ctaSource: "article-rieltor-cta",
    structuredData: makeArticleSchema(
        "bot-dlya-rieltora",
        "Telegram бот для риелтора: мониторинг 15+ площадок 24/7 и увеличение сделок на 180%",
        "Telegram бот для риелтора от 45 000 ₽. Мониторинг 15+ площадок, CRM, запись на показы.",
        "2026-08-06", "2026-08-06",
        [
            { name: "Какие площадки мониторит бот?", text: "ЦИАН, Авито, ДомКлик, Яндекс.Недвижимость и 10+ других." },
            { name: "Как часто проверяет?", text: "Каждые 15 минут." },
            { name: "Как быстро окупится?", text: "За 1-2 недели." },
        ],
        4000,
        [
            { name: "Шаг 1: Определите площадки", text: "Какие площадки используете." },
            { name: "Шаг 2: Настройте фильтры", text: "Районы, бюджеты, типы объектов." },
            { name: "Шаг 3: Запустите бота", text: "Тестирование на реальных объектах." },
        ],
    ),
    internalLinks: [
        { anchor: "заказать бота для риелтора", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Какие задачи решают боты" },
        { anchor: "Telegram бот для Avito", url: "/blog/telegram-bot-dlya-avito", context: "Автоматизация продаж на Avito" },
        { anchor: "стоимость разработки Telegram-бота", url: "/blog/stoimost-razrabotki", context: "Реальные цены 2026" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл создания" },
    ],
};
