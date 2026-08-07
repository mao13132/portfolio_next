import { Article, makeArticleSchema } from '../../types';
import { botDlyaStrojkiPart1 } from './texts/bot-dlya-strojki-part1';
import { botDlyaStrojkiPart2 } from './texts/bot-dlya-strojki-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaStrojki: Article = {
    slug: "bot-dlya-strojki",
    title: "Telegram бот для строительной компании: калькулятор, замер, контроль",
    metaDescription: "Telegram бот для строительной компании от 40 000 ₽. Калькулятор, запись на замер, портфолио, контроль объектов.. Калькулято. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для строительной компании, бот строительство, автоматизация стройки, telegram бот ремонт, бот калькулятор ремонт",
    h1: "Telegram бот для строительной компании: как увеличить заявки на 200% с помощью калькулятора",
    ogTitle: "Telegram бот для строительной компании — калькулятор 24/7",
    ogDescription: "Как строительная компания увеличила заявки на 200% благодаря Telegram-боту. Калькулятор, запись, контроль объектов.",
    canonical: `${SITE_URL}/blog/bot-dlya-strojki`,
    heroBadge: "🏗️ Строительство • Автоматизация • 2026",
    heroSubtitle: "Как строительная компания увеличила заявки на 200% за 2 месяца. Калькулятор, запись на замер, контроль объектов.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему строительные компании теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% заявок" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaStrojkiPart1, ...botDlyaStrojkiPart2],

    faq: [
        { question: "Калькулятор точно рассчитает стоимость?", answer: "Да, точность 90%. Учитывает площадь, тип работ, материалы, сроки." },
        { question: "Клиенты будут пользоваться ботом?", answer: "Да. 80% клиентов уже в Telegram. Бот удобнее звонка: калькулятор, запись, контроль — всё в одном месте." },
        { question: "Как бот показывает статус работ?", answer: "Личный кабинет: статус работ, фотоотчёты, график платежей, документы." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. Одна дополнительная заявка = 100 000-500 000 ₽." },
    ],

    ctaTitle: "Хотите бота для строительной компании от 40 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит заявки на 200%",
    ctaSource: "article-strojka-cta",

    structuredData: makeArticleSchema("bot-dlya-strojki", "Telegram бот для строительной компании", "Telegram бот для строительной компании от 40 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Калькулятор точно рассчитает?", text: "Да, точность 90%." },
        { name: "Как бот показывает статус работ?", text: "Личный кабинет с фотоотчётами." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 3200, [
        { name: "Шаг 1: Анализ услуг", text: "Изучаем цены, портфолио." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с калькулятором." },
        { name: "Шаг 3: Запуск", text: "Тестирование, запуск." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для строительной компании", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
        { anchor: "Telegram бот для клининга", url: "/blog/bot-dlya-klininga", context: "Автоматизация заказов" },
    ],
};
