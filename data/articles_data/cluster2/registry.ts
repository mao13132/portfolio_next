import { Article } from '../types';

import { articleAvtomatizaciyaMalogoBiznesa } from './avtomatizaciya-malogo-biznesa';
import { articleAiAvtomatizaciyaBiznesa } from './ai-avtomatizaciya-biznesa';
import { articleAvtomatizaciyaOtdelaProdazh } from './avtomatizaciya-otdela-prodazh';
import { articlePrimeryAvtomatizacii } from './primery-avtomatizacii-biznesa';
import { articleAvtomatizaciyaPodKlyuch } from './avtomatizaciya-biznesa-pod-klyuch';

export const cluster2Articles: Article[] = [
    articleAvtomatizaciyaMalogoBiznesa,
    articleAiAvtomatizaciyaBiznesa,
    articleAvtomatizaciyaOtdelaProdazh,
    articlePrimeryAvtomatizacii,
    articleAvtomatizaciyaPodKlyuch,
];
