import { Article } from './types';

import { articlePriyomZayavok } from './priyom-zayavok';
import { articleInternetMagazin } from './internet-magazin';
import { articleZapisKlientov } from './zapis-klientov';
import { articlePythonBot } from './python-bot';
import { articleAiBot } from './ai-bot';
import { articleBotDlyaBiznesa } from './bot-dlya-biznesa';
import { articleStoimostRazrabotki } from './stoimost-razrabotki';
import { articleRazrabotkaPodKlyuch } from './razrabotka-pod-klyuch';
import { articleBotProdazhi } from './bot-prodazhi';
import { articleAiBotSozdanie } from './ai-bot-sozdanie';

/* Новые статьи (июль 2026) */
import { articleTelegramWebApp } from './telegram-webapp';
import { articleBotIliPrilozhenie } from './bot-ili-prilozhenie';
import { articleRazrabotkaSNulya } from './razrabotka-s-nulya';
import { articleZakazatBota } from './zakazat-bota';
import { articleBotPriyomZakazov } from './bot-priyom-zakazov';
import { articleTelegramBotDlyaPriyomaZakazov2 } from './telegram-bot-dlya-priyoma-zakazov-2';

/* Новые статьи (август 2026) */
import { articleStoimostTelegramBota } from './stoimost-telegram-bota';
import { articleTelegramBotDlyaMagazina } from './telegram-bot-dlya-magazina';
import { articleBotDlyaZapisiKlientov } from './bot-dlya-zapisi-klientov';
import { articleTelegramBotIliPrilozhenieDlyaBiznesa } from './telegram-bot-ili-mobilnoe-prilozhenie-dlya-biznesa';
import { articleKakTelegramBotUvelichivaetProdazhi } from './kak-telegram-bot-uvelichivaet-prodazhi';
import { articleTelegramMiniAppChtoEto } from './telegram-mini-app-chto-eto';
import { articleAiogramVsPyrogram } from './aiogram-vs-pyrogram';

/* Cluster 2: Автоматизация бизнеса */
import { cluster2Articles } from './cluster2/registry';

export const articles: Article[] = [
    /* Cluster 1: Telegram боты */
    articlePriyomZayavok,
    articleInternetMagazin,
    articleZapisKlientov,
    articlePythonBot,
    articleAiBot,
    articleBotDlyaBiznesa,
    articleStoimostRazrabotki,
    articleRazrabotkaPodKlyuch,
    articleBotProdazhi,
    articleAiBotSozdanie,
    /* Новые статьи (июль 2026) */
    articleTelegramWebApp,
    articleBotIliPrilozhenie,
    articleRazrabotkaSNulya,
    articleZakazatBota,
    articleBotPriyomZakazov,
    /* Новые статьи (август 2026) */
    articleStoimostTelegramBota,
    articleTelegramBotDlyaMagazina,
    articleBotDlyaZapisiKlientov,
    articleTelegramBotIliPrilozhenieDlyaBiznesa,
    articleKakTelegramBotUvelichivaetProdazhi,
    /* Новые статьи (август 2026 — продолжение) */
    articleTelegramMiniAppChtoEto,
    articleAiogramVsPyrogram,
    articleTelegramBotDlyaPriyomaZakazov2,
    /* Cluster 2: Автоматизация бизнеса */
    ...cluster2Articles,
];

export const getArticleBySlug = (slug: string): Article | undefined =>
    articles.find((a) => a.slug === slug);

export const getAllSlugs = (): string[] =>
    articles.map((a) => a.slug);
