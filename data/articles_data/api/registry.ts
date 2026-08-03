import { Article } from '../types';

import { articleRazrabotkaRestApi } from './razrabotka-rest-api';
import { articleIntegraciyaApiSSajtom } from './integraciya-api-s-sajtom';
import { articleWebhookIntegraciya } from './webhook-integraciya';
import { articleApiIntegraciya1S } from './api-integraciya-1s';
import { articleFastapiDlyaApi } from './fastapi-dlya-api';

export const apiArticles: Article[] = [
    articleRazrabotkaRestApi,
    articleIntegraciyaApiSSajtom,
    articleWebhookIntegraciya,
    articleApiIntegraciya1S,
    articleFastapiDlyaApi,
];
