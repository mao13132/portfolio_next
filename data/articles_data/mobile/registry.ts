import { Article } from '../types';

import { articleRazrabotkaMobilnihPrilozhenij } from './razrabotka-mobilnyh-prilozhenij';
import { articleSkolkoStoitMobilnoePrilozhenie } from './skolko-stoit-mobilnoe-prilozhenie';
import { articleKrossplatformennayaRazrabotka } from './krossplatformennaya-razrabotka-prilozhenij';
import { articleRazrabotkaPrilozhenijDlyaBiznesa } from './razrabotka-prilozhenij-dlya-biznesa';
import { articleRazrabotkaPrilozhenijAndroidIos } from './razrabotka-prilozhenij-android-ios';

export const mobileArticles: Article[] = [
    articleRazrabotkaMobilnihPrilozhenij,
    articleSkolkoStoitMobilnoePrilozhenie,
    articleKrossplatformennayaRazrabotka,
    articleRazrabotkaPrilozhenijDlyaBiznesa,
    articleRazrabotkaPrilozhenijAndroidIos,
];
