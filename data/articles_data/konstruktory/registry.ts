import { Article } from '../types';

import { articleSozdanieSajtaNaWordpress } from './sozdanie-sajta-na-wordpress';
import { articleSozdanieSajtaNa1sBitrix } from './sozdanie-sajta-na-1s-bitrix';
import { articleSozdanieSajtaNaTildaKonstruktor } from './sozdanie-sajta-na-tilda-konstruktor';

export const konstruktoryArticles: Article[] = [
    articleSozdanieSajtaNaWordpress,
    articleSozdanieSajtaNa1sBitrix,
    articleSozdanieSajtaNaTildaKonstruktor,
];
