import { Article } from '../types';

import { articleAvtomatizaciyaSklada } from './avtomatizaciya-sklada';
import { articleAvtomatizaciyaSklada1s } from './avtomatizaciya-sklada-1s';
import { articleWmsSistemyAvtomatizacii } from './wms-sistemy-avtomatizacii';
import { articleAvtomatizaciyaSkladaMarketplejsy } from './avtomatizaciya-sklada-marketplejsy';

export const skladArticles: Article[] = [
    articleAvtomatizaciyaSklada,
    articleAvtomatizaciyaSklada1s,
    articleWmsSistemyAvtomatizacii,
    articleAvtomatizaciyaSkladaMarketplejsy,
];
