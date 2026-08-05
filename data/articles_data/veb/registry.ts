import { Article } from '../types';

import { articleSozdanieLendinga } from './sozdanie-lendinga';
import { articleRazrabotkaSajtaPodKlyuchVeb } from './razrabotka-sajta-pod-klyuch';
import { articleSajtyNaZakaz } from './sajty-na-zakaz';
import { articleSozdanieInternetMagazina } from './sozdanie-internet-magazina';
import { articleSozdanieSajtaKataloga } from './sozdanie-sajta-kataloga';
import { articleZakazatSajtNaTilde } from './zakazat-sajt-na-tilde';
import { articleZakazatSajtNaBitrix } from './zakazat-sajt-na-bitrix';

export const vebArticles: Article[] = [
    articleSajtyNaZakaz,
    articleSozdanieLendinga,
    articleSozdanieInternetMagazina,
    articleSozdanieSajtaKataloga,
    articleZakazatSajtNaTilde,
    articleZakazatSajtNaBitrix,
    articleRazrabotkaSajtaPodKlyuchVeb,
];
