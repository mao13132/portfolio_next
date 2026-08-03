import { Article } from '../types';

import { articleChatgptDlyaBiznesa } from './chatgpt-dlya-biznesa';
import { articleAiAgentyDlyaBiznesa } from './ai-agenty-dlya-biznesa';
import { articleIntegraciyaOpenaiApi } from './integraciya-openai-api';
import { articleAiBotTelegramChatgpt } from './ai-bot-telegram-chatgpt';
import { articleNejrosetiDlyaAvtomatizacii } from './nejroseti-dlya-avtomatizacii';
import { articleAiDlyaObrabotkiDokumentov } from './ai-dlya-obrabotki-dokumentov';

export const aiArticles: Article[] = [
    articleChatgptDlyaBiznesa,
    articleAiAgentyDlyaBiznesa,
    articleIntegraciyaOpenaiApi,
    articleAiBotTelegramChatgpt,
    articleNejrosetiDlyaAvtomatizacii,
    articleAiDlyaObrabotkiDokumentov,
];
