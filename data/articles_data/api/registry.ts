import { Article } from '../types';

import { articleRazrabotkaRestApi } from './razrabotka-rest-api';
import { articleIntegraciyaApiSSajtom } from './integraciya-api-s-sajtom';
import { articleWebhookIntegraciya } from './webhook-integraciya';
import { articleApiIntegraciya1S } from './api-integraciya-1s';
import { articleFastapiDlyaApi } from './fastapi-dlya-api';
import { articleIntegraciyaApiMarketplejsov } from './integraciya-api-marketplejsov';
import { articleIntegraciyaApiDostavki } from './integraciya-api-dostavki';
import { articleIntegraciyaApiSCrm } from './integraciya-api-s-crm';
import { articleIntegraciyaNichevyhApi } from './integraciya-nichevyh-api';

export const apiArticles: Article[] = [
    articleRazrabotkaRestApi,
    articleIntegraciyaApiSSajtom,
    articleWebhookIntegraciya,
    articleApiIntegraciya1S,
    articleFastapiDlyaApi,
    articleIntegraciyaApiMarketplejsov,
    articleIntegraciyaApiDostavki,
    articleIntegraciyaApiSCrm,
    articleIntegraciyaNichevyhApi,
];
