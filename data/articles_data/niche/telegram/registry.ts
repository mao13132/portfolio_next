import { Article } from '../../types';
/* Уровень 1: Отрасли с реальными кейсами (20) */
import { articleBotDlyaSalonaKrasoty } from './bot-dlya-salona-krasoty';
import { articleBotDlyaPsihologa } from './bot-dlya-psihologa';
import { articleBotDlyaVetkliniki } from './bot-dlya-vetkliniki';
import { articleBotDlyaRieltora } from './bot-dlya-rieltora';
import { articleBotDlyaOnlajnShkoly } from './bot-dlya-onlajn-shkoly';
import { articleBotDlyaFitnesa } from './bot-dlya-fitnesa';
import { articleBotDlyaStomatologii } from './bot-dlya-stomatologii';
import { articleBotDlyaRestorana } from './bot-dlya-restorana';
import { articleBotDlyaSeleraWb } from './bot-dlya-selera-wb';
import { articleBotDlyaSeleraOzon } from './bot-dlya-selera-ozon';
import { articleBotDlyaTuragentstva } from './bot-dlya-turagentstva';
import { articleBotDlyaSmmAgentstva } from './bot-dlya-smm-agentstva';
import { articleBotDlyaDizajnStudii } from './bot-dlya-dizajn-studii';
import { articleBotDlyaMarketingovogoAgentstva } from './bot-dlya-marketingovogo-agentstva';
import { articleBotDlyaObrazovatelnogoSoobshchestva } from './bot-dlya-obrazovatelnogo-soobshchestva';
import { articleBotDlyaDropshippinga } from './bot-dlya-dropshippinga';
import { articleBotDlyaAvtodilera } from './bot-dlya-avtodilera';
import { articleBotDlyaKibersporta } from './bot-dlya-kibersporta';
import { articleBotDlyaStudiiZagara } from './bot-dlya-studii-zagara';
import { articleBotDlyaAvitoProdavca } from './bot-dlya-avito-prodavca';
/* Уровень 2: Крупные отрасли с высоким чеком (15) */
import { articleBotDlyaYurista } from './bot-dlya-yurista';
import { articleBotDlyaBuhgaltera } from './bot-dlya-buhgaltera';
import { articleBotDlyaRepetitora } from './bot-dlya-repetitora';
import { articleBotDlyaFotografa } from './bot-dlya-fotografa';
import { articleBotDlyaKoucha } from './bot-dlya-koucha';
import { articleBotDlyaKlininga } from './bot-dlya-klininga';
import { articleBotDlyaStrojki } from './bot-dlya-strojki';
import { articleBotDlyaMedkliniki } from './bot-dlya-medkliniki';
import { articleBotDlyaAvtosalona } from './bot-dlya-avtoslona';
import { articleBotDlyaHimchistki } from './bot-dlya-himchistki';
import { articleBotDlyaParikmaxerskoj } from './bot-dlya-parikmaxerskoj';
import { articleBotDlyaBarbershopa } from './bot-dlya-barbershopa';
import { articleBotDlyaMassazha } from './bot-dlya-massazha';
import { articleBotDlyaDetskogoSada } from './bot-dlya-detskogo-sada';
import { articleBotDlyaLogistiki } from './bot-dlya-logistiki';
/* Уровень 3: Нишевые отрасли (19) */
import { articleBotDlyaNotariusa } from './bot-dlya-notariusa';
import { articleBotDlyaRemontaTekhniki } from './bot-dlya-remonta-tekhniki';
import { articleBotDlyaAtele } from './bot-dlya-atelye';
import { articleBotDlyaTsvetochnogo } from './bot-dlya-tsvetochnogo';
import { articleBotDlyaPekarni } from './bot-dlya-pekarni';
import { articleBotDlyaTrenera } from './bot-dlya-trenera';
import { articleBotDlyaJogaStudii } from './bot-dlya-joga-studii';
import { articleBotDlyaTancev } from './bot-dlya-tancev';
import { articleBotDlyaMuzyki } from './bot-dlya-muzyki';
import { articleBotDlyaVideografa } from './bot-dlya-videografa';
import { articleBotDlyaSvadby } from './bot-dlya-svadby';
import { articleBotDlyaEventa } from './bot-dlya-eventa';
import { articleBotDlyaHr } from './bot-dlya-hr';
import { articleBotDlyaStrahovki } from './bot-dlya-strahovki';
import { articleBotDlyaProkata } from './bot-dlya-prokata';
import { articleBotDlyaMebeli } from './bot-dlya-mebeli';
import { articleBotDlyaDostavkiEdy } from './bot-dlya-dostavki-edy';
import { articleBotDlyaApteki } from './bot-dlya-apteki';
import { articleBotDlyaAvtoservisa } from './bot-dlya-avtoservisa';

export const nicheArticles: Article[] = [
    /* Уровень 1: 20 статей */
    articleBotDlyaSalonaKrasoty,
    articleBotDlyaPsihologa,
    articleBotDlyaVetkliniki,
    articleBotDlyaRieltora,
    articleBotDlyaOnlajnShkoly,
    articleBotDlyaFitnesa,
    articleBotDlyaStomatologii,
    articleBotDlyaRestorana,
    articleBotDlyaSeleraWb,
    articleBotDlyaSeleraOzon,
    articleBotDlyaTuragentstva,
    articleBotDlyaSmmAgentstva,
    articleBotDlyaDizajnStudii,
    articleBotDlyaMarketingovogoAgentstva,
    articleBotDlyaObrazovatelnogoSoobshchestva,
    articleBotDlyaDropshippinga,
    articleBotDlyaAvtodilera,
    articleBotDlyaKibersporta,
    articleBotDlyaStudiiZagara,
    articleBotDlyaAvitoProdavca,
    /* Уровень 2: 15 статей */
    articleBotDlyaYurista,
    articleBotDlyaBuhgaltera,
    articleBotDlyaRepetitora,
    articleBotDlyaFotografa,
    articleBotDlyaKoucha,
    articleBotDlyaKlininga,
    articleBotDlyaStrojki,
    articleBotDlyaMedkliniki,
    articleBotDlyaAvtosalona,
    articleBotDlyaHimchistki,
    articleBotDlyaParikmaxerskoj,
    articleBotDlyaBarbershopa,
    articleBotDlyaMassazha,
    articleBotDlyaDetskogoSada,
    articleBotDlyaLogistiki,
    /* Уровень 3: 19 статей */
    articleBotDlyaNotariusa,
    articleBotDlyaRemontaTekhniki,
    articleBotDlyaAtele,
    articleBotDlyaTsvetochnogo,
    articleBotDlyaPekarni,
    articleBotDlyaTrenera,
    articleBotDlyaJogaStudii,
    articleBotDlyaTancev,
    articleBotDlyaMuzyki,
    articleBotDlyaVideografa,
    articleBotDlyaSvadby,
    articleBotDlyaEventa,
    articleBotDlyaHr,
    articleBotDlyaStrahovki,
    articleBotDlyaProkata,
    articleBotDlyaMebeli,
    articleBotDlyaDostavkiEdy,
    articleBotDlyaApteki,
    articleBotDlyaAvtoservisa,
];
