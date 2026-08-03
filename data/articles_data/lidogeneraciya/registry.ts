import { Article } from '../types';

import { articleKakNajtiKlientovVTelegram } from './kak-najti-klientov-v-telegram';
import { articleParserTelegramKanalov } from './parser-telegram-kanalov';
import { articleLidogeneraciyaTelegramKakEtoRabotaet } from './lidogeneraciya-telegram-kak-eto-rabotaet';
import { articleSborBazyKlientovTelegram } from './sbor-bazy-klientov-telegram';
import { articleMassovayaRassylkaTelegram } from './massovaya-rassylka-telegram';

export const lidogeneraciyaArticles: Article[] = [
    articleKakNajtiKlientovVTelegram,
    articleParserTelegramKanalov,
    articleLidogeneraciyaTelegramKakEtoRabotaet,
    articleSborBazyKlientovTelegram,
    articleMassovayaRassylkaTelegram,
];
