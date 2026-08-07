import { Article, makeArticleSchema } from '../../types';
import { botDlyaAvtoslonaPart1 } from './texts/bot-dlya-avtoslona-part1';
import { botDlyaAvtoslonaPart2 } from './texts/bot-dlya-avtoslona-part2';


const SITE_URL = 'https://dima-razrab.com';

export const articleBotDlyaAvtosalona: Article = {
    slug: "bot-dlya-avtoslona",
    title: "Telegram бот для автосалона: каталог, тест-драйв, trade-in",
    metaDescription: "Telegram бот для автосалона от 40 000 ₽. Каталог авто, запись на тест-драйв, trade-in, follow-up. Бесплатная оценка за 24 часа →",
    keywords: "telegram бот для автосалона, бот автосалон, автоматизация автосалона, telegram бот тест-драйв",
    h1: "Telegram бот для автосалона: как увеличить тест-драйвы на 200% и продажи на 150%",
    ogTitle: "Telegram бот для автосалона — каталог 24/7",
    ogDescription: "Как автосалон увеличил тест-драйвы на 200% благодаря Telegram-боту. Каталог, запись, trade-in.",
    canonical: `${SITE_URL}/blog/bot-dlya-avtoslona`,
    heroBadge: "🚗 Автосалон • Автоматизация • 2026",
    heroSubtitle: "Как автосалон увеличил тест-драйвы на 200% за 2 месяца. Каталог, запись, trade-in.",
    readingTime: "13 мин чтения",
    wordCount: "~3200 слов",
    publishDate: "2026-08-06",
    modifiedDate: "2026-08-06",
    author: "Дмитрий Малышев",

    toc: [
        { id: "problem", title: "Почему автосалоны теряют клиентов" },
        { id: "how-bot-works", title: "Как бот работает" },
        { id: "features", title: "Функции бота" },
        { id: "case", title: "Кейс: +200% тест-драйвов" },
        { id: "cost", title: "Стоимость" },
        { id: "implementation", title: "Пошаговый план" },
        { id: "readmore", title: "Читать дальше" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [...botDlyaAvtoslonaPart1, ...botDlyaAvtoslonaPart2],

    faq: [
        { question: "Клиенты будут смотреть каталог в Telegram?", answer: "Да. Telegram удобнее сайта: быстрая загрузка, фильтры, запись." },
        { question: "Как бот работает с trade-in?", answer: "Клиент загружает фото, менеджер оценивает за 1-2 часа." },
        { question: "Как быстро окупится бот?", answer: "За 1-2 недели. Одна дополнительная продажа = 100 000-500 000 ₽." },
    ],

    ctaTitle: "Хотите бота для автосалона от 40 000 ₽?",
    ctaSubtitle: "Бесплатная консультация — покажу, как бот увеличит тест-драйвы на 200%",
    ctaSource: "article-avtoslon-cta",

    structuredData: makeArticleSchema("bot-dlya-avtoslona", "Telegram бот для автосалона", "Telegram бот для автосалона от 40 000 ₽.", "2026-08-06", "2026-08-06", [
        { name: "Клиенты будут смотреть каталог в Telegram?", text: "Да, Telegram удобнее сайта." },
        { name: "Как бот работает с trade-in?", text: "Клиент загружает фото, менеджер оценивает." },
        { name: "Как быстро окупится бот?", text: "За 1-2 недели." },
    ], 3200, [
        { name: "Шаг 1: Анализ каталога", text: "Модели, цены, расписание." },
        { name: "Шаг 2: Разработка", text: "Создаём бота с каталогом." },
        { name: "Шаг 3: Запуск", text: "Тестирование, запуск." },
    ]),
    internalLinks: [
        { anchor: "заказать бота для автосалона", url: "/razrabotka-botov", context: "Получите расчёт стоимости" },
        { anchor: "Telegram бот для автодилера", url: "/blog/bot-dlya-avtodilera", context: "Автоматизация автодилера" },
        { anchor: "Telegram бот для бизнеса", url: "/blog/telegram-bot-dlya-biznesa", context: "Задачи ботов" },
        { anchor: "стоимость разработки", url: "/blog/stoimost-razrabotki", context: "Реальные цены" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл" },
        { anchor: "автоматизация малого бизнеса", url: "/blog/avtomatizaciya-malogo-biznesa", context: "Автоматизация" },
    ],
};
