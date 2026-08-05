import { Article } from '../types';

import { articleParserWildberries } from './parser-wildberries';
import { articleParserOzon } from './parser-ozon';
import { articleMonitoringCenMarketplejsov } from './monitoring-cen-marketplejsov';
import { articleParserAvito } from './parser-avito';
import { articleRepricerWildberries } from './repricer-wildberries';
import { articleApiWildberriesRukovodstvo } from './api-wildberries-rukovodstvo';
import { articleAnalitikaMarketplejsov } from './analitika-marketplejsov';
import { articleParserDannih } from './parser-dannyh';
import { articleParserOtzyvov } from './parser-otzyvov';

export const parseryArticles: Article[] = [
    articleParserWildberries,
    articleParserOzon,
    articleMonitoringCenMarketplejsov,
    articleParserAvito,
    articleRepricerWildberries,
    articleApiWildberriesRukovodstvo,
    articleAnalitikaMarketplejsov,
    articleParserDannih,
    articleParserOtzyvov,
];
