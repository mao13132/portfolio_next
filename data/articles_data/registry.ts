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
    /* Cluster 2: Автоматизация бизнеса */
    ...cluster2Articles,
];

export const getArticleBySlug = (slug: string): Article | undefined =>
    articles.find((a) => a.slug === slug);

export const getAllSlugs = (): string[] =>
    articles.map((a) => a.slug);
