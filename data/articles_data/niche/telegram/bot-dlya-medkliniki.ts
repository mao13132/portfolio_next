import { Article, makeArticleSchema } from '../../types';
import { botDlyaMedklinikiPart1 } from './texts/bot-dlya-medkliniki-part1';
import { botDlyaMedklinikiPart2 } from './texts/bot-dlya-medkliniki-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaMedkliniki: Article = {
    slug: "bot-dlya-medkliniki",
    title: "Telegram бот для медицинской клиники: запись, напоминания, анализы",
    metaDescription: "Telegram бот для медицинской клиники от 40 000 ₽. Запись к врачу 24/7, напоминания, предоплата, результаты анализов. Бесплатная оценка →",
    keywords: "telegram бот для клиники, бот медицинская клиника, автоматизация клиники, telegram бот запись к врачу, бот запись клиника",
    h1: "Telegram бот для медицинской клиники: как увеличить запись на 200% и сократить no-show на 80%",
    ogTitle: "Telegram бот для клиники — запись 24/7",
    ogDescription: "Как медицинская клиника увеличила запись на 200% благодаря Telegram-боту. Запись, напоминания, предоплата.",
    canonical: `${SITE_URL}/blog/bot-dlya-medkliniki`,
    heroBadge: "🏥 Медицина • Автоматизация • 2026",
    heroSubtitle: "Как медицинская клиника увеличила запись на 200% за 2 месяца. Запись 24/7, напоминания, предоплата.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему клиники теряют пациентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% записи" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaMedklinikiPart1, ...botDlyaMedklinikiPart2],

    faq: [
        { question: "Пациенты будут записываться через Telegram?", answer: "Да. 80% пациентов уже в Telegram. Запись через бота удобнее звонка: не нужно ждать, можно записаться в любое время." },
        { question: "Как бот снижает no-show?", answer: "Два механизма: предоплата 30% и автоматические напоминания (за день и за час). Снижают no-show с 25% до 5%." },
        { question: "Бот может отправлять результаты анализов?", answer: "Да. Бот отправляет результаты в личный кабинет пациента. Без звонков в клинику." },
        { question: "Как быстро окупится бот для клиники?", answer: "За 1-2 недели. При 400 дополнительных записях в месяц и среднем чеке 3 000 ₽ — это 1 200 000 ₽/мес." },
    ],

    ctaTitle: "Хотите бота для клиники от 40 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит запись на 200%",
    ctaSource: "article-medklinika-cta",

    structuredData: makeArticleSchema("bot-dlya-medkliniki", "Telegram бот для медицинской клиники", "Telegram бот для клиники от 40 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Пациенты будут записываться через Telegram?", text: "Да, 80% уже в Telegram." },
        { name: "Как бот снижает no-show?", text: "Предоплата 30% + напоминания = снижение с 25% до 5%." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 3200, [
        { name: "Шаг 1: Анализ специализаций", text: "Врачи, расписание, цены." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с записью." },
        { name: "Шаг 3: Запуск", text: "QR-код в клинике." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для клиники", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для стоматологии", url: "/blog/bot-dlya-stomatologii", context: "Автоматизация стоматологии" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "Telegram бот для аптеки", url: "/blog/bot-dlya-apteki", context: "Автоматизация аптеки" },
    ],
};
