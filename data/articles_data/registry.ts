import { Article } from './types';

import { articlePriyomZayavok } from './priyom-zayavok';
import { articleInternetMagazin } from './internet-magazin';
import { articlePythonBot } from './python-bot';
import { articleAiBot } from './ai-bot';
import { articleBotDlyaBiznesa } from './bot-dlya-biznesa';
import { articleStoimostRazrabotki } from './stoimost-razrabotki';
import { articleRazrabotkaPodKlyuch } from './razrabotka-pod-klyuch';
import { articleBotProdazhi } from './bot-prodazhi';
import { articleAiBotSozdanie } from './ai-bot-sozdanie';

/* Новые статьи (июль 2026) */
import { articleTelegramWebApp } from './telegram-webapp';
import { articleRazrabotkaSNulya } from './razrabotka-s-nulya';
import { articleZakazatBota } from './zakazat-bota';
import { articleBotPriyomZakazov } from './bot-priyom-zakazov';
import { articleTelegramBotDlyaPriyomaZakazov2 } from './telegram-bot-dlya-priyoma-zakazov-2';

/* Новые статьи (август 2026) */
import { articleTelegramBotDlyaMagazina } from './telegram-bot-dlya-magazina';
import { articleBotDlyaZapisiKlientov } from './bot-dlya-zapisi-klientov';
import { articleTelegramBotIliPrilozhenieDlyaBiznesa } from './telegram-bot-ili-mobilnoe-prilozhenie-dlya-biznesa';
import { articleKakTelegramBotUvelichivaetProdazhi } from './kak-telegram-bot-uvelichivaet-prodazhi';
import { articleTelegramMiniAppChtoEto } from './telegram-mini-app-chto-eto';
import { articleAiogramVsPyrogram } from './aiogram-vs-pyrogram';

/* Новые статьи (август 2026 — финальные) */
import { articleRazrabotkaBDlyaTelegram } from './razrabotka-bota-dlya-telegram';
import { articleTelegramBotSOplatoj } from './telegram-bot-s-oplatoj';
import { articleTelegramBotRassylka } from './telegram-bot-rassylka';
import { articleBotDlyaAvtomatizaciiProdazh } from './bot-dlya-avtomatizacii-prodazh';
import { articleNastrojkaTelegramBota } from './nastrojka-telegram-bota';
import { articleLichnyjTelegramBot } from './lichnyj-telegram-bot';

/* Новые статьи (август 2026 — Telegram-ботов кластер) */
import { articleKakBystroOtvechatKlientam } from './kak-bystro-otvechat-klientam';
import { articleSozdanieINastrojkaTelegramKanalovIBotov } from './sozdanie-i-nastrojka-telegram-kanalov-i-botov';

/* Новые статьи (август 2026 — Telegram-ботов кластер, часть 2) */
import { articleKonstruktoryTelegramBotov } from './konstruktory-telegram-botov';
import { articleLichnyjKabinetVBote } from './lichnyj-kabinet-v-telegram-bote';
import { articleBotObratnojSvyazi } from './bot-obratnoj-svyazi-telegram';

/* Новые статьи (август 2026 — Telegram-ботов кластер, часть 3) */
import { articleBotTelegramDlyaKurerov } from './bot-telegram-dlya-kurerov';
import { articleKorporativnyjTelegramBot } from './korporativnyj-telegram-bot';
import { articleTelegramBotDlyaWildberries } from './telegram-bot-dlya-wildberries';

/* Новые статьи (август 2026 — Telegram-ботов кластер, финальный пакет) */
import { articleTelegramBotDlyaAvito } from './telegram-bot-dlya-avito';
import { articleAiBotDlyaVedeniyaTelegramKanala } from './ai-bot-dlya-vedeniya-telegram-kanala';
import { articleBotMenedzherPoProdazham } from './bot-menedzher-po-prodazham';

/* Cluster 2: Автоматизация бизнеса */
import { cluster2Articles } from './cluster2/registry';

/* Cluster B: Парсинг маркетплейсов */
import { parseryArticles } from './parsery/registry';

/* Cluster C: Лидогенерация в Telegram */
import { lidogeneraciyaArticles } from './lidogeneraciya/registry';

/* Cluster H2: API интеграции */
import { apiArticles } from './api/registry';

/* Cluster G: AI интеграции */
import { aiArticles } from './ai/registry';

/* Cluster E: Python разработка */
import { pythonArticles } from './python/registry';

/* Cluster F: Next.js разработка */
import { nextjsArticles } from './nextjs/registry';

/* Cluster I: Веб-разработка */
import { vebArticles } from './veb/registry';

/* Cluster J: Мобильные приложения */
import { mobileArticles } from './mobile/registry';

/* Cluster K: Конструкторы (CMS) */
import { konstruktoryArticles } from './konstruktory/registry';

/* Cluster L: Автоматизация склада */
import { skladArticles } from './sklad/registry';

/* Кластер Telegram-ботов (27 статей) */
export const telegramBotyArticles: Article[] = [
    articlePriyomZayavok,
    articleInternetMagazin,
    articlePythonBot,
    articleAiBot,
    articleBotDlyaBiznesa,
    articleStoimostRazrabotki,
    articleRazrabotkaPodKlyuch,
    articleBotProdazhi,
    articleAiBotSozdanie,
    /* Новые статьи (июль 2026) */
    articleTelegramWebApp,
    articleRazrabotkaSNulya,
    articleZakazatBota,
    articleBotPriyomZakazov,
    /* Новые статьи (август 2026) */
    articleTelegramBotDlyaMagazina,
    articleBotDlyaZapisiKlientov,
    articleTelegramBotIliPrilozhenieDlyaBiznesa,
    articleKakTelegramBotUvelichivaetProdazhi,
    /* Новые статьи (август 2026 — продолжение) */
    articleTelegramMiniAppChtoEto,
    articleAiogramVsPyrogram,
    articleTelegramBotDlyaPriyomaZakazov2,
    /* Новые статьи (август 2026 — финальные) */
    articleRazrabotkaBDlyaTelegram,
    articleTelegramBotSOplatoj,
    articleTelegramBotRassylka,
    articleBotDlyaAvtomatizaciiProdazh,
    articleNastrojkaTelegramBota,
    articleLichnyjTelegramBot,
    /* Новые статьи (август 2026 — Telegram-ботов кластер) */
    articleKakBystroOtvechatKlientam,
    articleSozdanieINastrojkaTelegramKanalovIBotov,
    /* Новые статьи (август 2026 — Telegram-ботов кластер, часть 2) */
    articleKonstruktoryTelegramBotov,
    articleLichnyjKabinetVBote,
    articleBotObratnojSvyazi,
    /* Новые статьи (август 2026 — Telegram-ботов кластер, часть 3) */
    articleBotTelegramDlyaKurerov,
    articleKorporativnyjTelegramBot,
    articleTelegramBotDlyaWildberries,
    /* Новые статьи (август 2026 — Telegram-ботов кластер, финальный пакет) */
    articleTelegramBotDlyaAvito,
    articleAiBotDlyaVedeniyaTelegramKanala,
    articleBotMenedzherPoProdazham,
];

export const articles: Article[] = [
    /* Cluster 1: Telegram боты */
    ...telegramBotyArticles,
    /* Cluster 2: Автоматизация бизнеса */
    ...cluster2Articles,
    /* Cluster B: Парсинг маркетплейсов */
    ...parseryArticles,
    /* Cluster C: Лидогенерация в Telegram */
    ...lidogeneraciyaArticles,
    /* Cluster H2: API интеграции */
    ...apiArticles,
    /* Cluster G: AI интеграции */
    ...aiArticles,
    /* Cluster E: Python разработка */
    ...pythonArticles,
    /* Cluster F: Next.js разработка */
    ...nextjsArticles,
    /* Cluster I: Веб-разработка */
    ...vebArticles,
    /* Cluster J: Мобильные приложения */
    ...mobileArticles,
    /* Cluster K: Конструкторы (CMS) */
    ...konstruktoryArticles,
    /* Cluster L: Автоматизация склада */
    ...skladArticles,
];

export const getArticleBySlug = (slug: string): Article | undefined =>
    articles.find((a) => a.slug === slug);

export const getAllSlugs = (): string[] =>
    articles.map((a) => a.slug);
