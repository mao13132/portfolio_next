/**
 * seo-tools/fix-meta-tags.js
 * ИИ-куратор: все значения title и metaDescription составлены вручную
 * на основе wordstat-данных и реальных кейсов.
 * 
 * Запуск: node seo-tools/fix-meta-tags.js
 * Затем: node seo-tools/check-seo-meta.js (должно быть 0 ошибок)
 */

const fs = require('fs');
const path = require('path');
const {
    C, ARTICLES_DIR,
    findDomainFiles,
    extractString,
} = require('./lib/parser');

// ═══════════════════════════════════════════
//  МАППИНГ ИСПРАВЛЕНИЙ (ИИ-курированные данные)
// ═══════════════════════════════════════════
// Формат: slug → { title?, metaDescription? }
// Только те поля, которые нужно исправить

const FIXES = {
    // ─── AI (ai/) ───
    "ai-agenty-dlya-biznesa": {
        title: "AI-агенты для бизнеса: автоматизация с кейсами | DimaRazrab",
        metaDescription: "AI-агенты для бизнеса: автоматизация продаж, поддержки, контента. Реальные кейсы с ROI 380-520%. Разработка от 60 000 ₽. Бесплатная консультация →",
    },
    "ai-bot-telegram-chatgpt": {
        metaDescription: "AI-бот в Telegram на базе ChatGPT: создание, настройка, кейсы с ROI 400-520%. Автоматизация поддержки и продаж. Разработка от 30 000 ₽. Заказать →",
    },
    "ai-dlya-obrabotki-dokumentov": {
        title: "AI для обработки документов: кейсы и автоматизация | DimaRazrab",
        metaDescription: "AI для обработки документов: OCR, классификация, извлечение данных с ИИ. Кейсы ROI 380-420%. Внедрение от 60 000 ₽. Бесплатная консультация →",
    },
    "chatgpt-dlya-biznesa": {
        title: "ChatGPT для бизнеса: 10 применений с кейсами | DimaRazrab",
        metaDescription: "ChatGPT для бизнеса: 10 способов применения с кейсами ROI 400-520%. Автоматизация контента, поддержки, продаж. Внедрение от 30 000 ₽. Заказать →",
    },
    "integraciya-openai-api": {
        metaDescription: "Интеграция OpenAI API: пошаговое руководство с кейсами ROI 400-520%. GPT-4o, DALL-E, Whisper. Разработка от 30 000 ₽. Бесплатная оценка →",
    },
    "nejroseti-dlya-avtomatizacii": {
        metaDescription: "Нейросети для автоматизации бизнеса: обработка текстов, изображений, данных с ИИ. Кейсы ROI 400-450%. Внедрение от 30 000 ₽. Оценка бесплатно →",
    },

    // ─── Корневые файлы (data/articles_data/) ───
    "ai-bot-dlya-vedeniya-telegram-kanala": {
        title: "AI-бот для Telegram-канала: автопостинг | DimaRazrab",
        metaDescription: "AI-бот для ведения Telegram-канала: генерация контента, автопостинг, модерация. Автоматизация с помощью ИИ. Разработка от 30 000 ₽. Заказать →",
    },
    "kak-sozdat-ai-bot-telegram": {
        title: "Как создать AI бота в Telegram: руководство | DimaRazrab",
        metaDescription: "Как создать AI бота в Telegram с ChatGPT: пошаговое руководство, интеграция GPT, промпт-инжиниринг, RAG. Код и деплой. 2026. Консультация →",
    },
    "aiogram-vs-pyrogram": {
        title: "Aiogram vs Pyrogram: выбор фреймворка для бота | DimaRazrab",
        metaDescription: "Сравнение Aiogram и Pyrogram для разработки Telegram ботов. Плюсы, минусы, примеры кода. Какой фреймворк лучше для бизнеса. Консультация →",
    },
    "bot-dlya-avtomatizacii-prodazh": {
        metaDescription: "Бот для автоматизации продаж в Telegram: воронка, квалификация лидов, приём заказов 24/7. Реальные кейсы с ROI 300-520%. Заказать от 25 000 ₽ →",
    },
    "bot-dlya-biznesa": {
        metaDescription: "Telegram бот для бизнеса: автоматизация продаж, поддержки, маркетинга. Реальные примеры по отраслям. Руководство по внедрению и расчёт ROI от 15 000 ₽ →",
    },
    "bot-dlya-zapisi-klientov": {
        metaDescription: "Telegram бот для онлайн-записи клиентов в салон красоты, клинику, фитнес. Автоматизация 24/7 без пропущенных заявок. Заказать бота от 25 000 ₽ →",
    },
    "bot-ili-prilozhenie": {
        title: "Telegram бот или приложение: что выбрать | DimaRazrab",
        metaDescription: "Telegram бот или мобильное приложение: честное сравнение по стоимости, срокам, конверсии. Когда бот лучше приложения и наоборот. Расчёт бесплатно →",
    },
    "bot-menedzher-po-prodazham": {
        title: "Telegram бот менеджер по продажам: автоматизация | DimaRazrab",
        metaDescription: "Telegram бот как менеджер по продажам: квалификация лидов, презентация товаров, обработка возражений, закрытие сделок. Примеры и кейсы. От 30 000 ₽ →",
    },
    "bot-obratnoj-svyazi-telegram": {
        metaDescription: "Telegram бот обратной связи: сбор отзывов, опросы, NPS, жалобы. Автоматический сбор обратной связи от клиентов. Примеры и кейсы. Заказать →",
    },
    "bot-priyom-zakazov": {
        title: "Telegram бот для приёма заказов: автоматизация | DimaRazrab",
    },
    "bot-prodazhi": {
        metaDescription: "Telegram бот для продаж: воронка, квалификация лидов, обработка возражений, cross-sell. Увеличьте выручку на 40-70% с помощью автоматизации. От 25 000 ₽ →",
    },
    "bot-telegram-dlya-kurerov": {
        title: "Telegram бот для курьеров: автоматизация доставки | DimaRazrab",
        metaDescription: "Telegram бот для курьеров: уведомления, отслеживание заказов, маршруты. Автоматизация доставки для ресторанов и магазинов. Заказать от 30 000 ₽ →",
    },
    "internet-magazin": {
        title: "Telegram бот для интернет-магазина: каталог | DimaRazrab",
        metaDescription: "Telegram-бот как интернет-магазин: каталог товаров, корзина, оплата, доставка. Полное руководство по созданию магазина в Telegram. От 30 000 ₽ →",
    },
    "kak-bystro-otvechat-klientam": {
        metaDescription: "Автоматические ответы клиентам в Telegram: бот-помощник, автоответчик, шаблоны сообщений. Увеличьте конверсию на 30-50%. Бесплатная консультация →",
    },
    "kak-telegram-bot-uvelichivaet-prodazhi": {
        metaDescription: "Реальные примеры как Telegram бот увеличивает продажи на 380-500%. 4 кейса из портфолио с цифрами, ROI и результатами. Заказать бота от 25 000 ₽ →",
    },
    "korporativnyj-telegram-bot": {
        title: "Корпоративный Telegram бот: процессы и связь | DimaRazrab",
        metaDescription: "Корпоративный Telegram бот: отчёты, задачи, согласования, HR-процессы. Автоматизация внутренних процессов компании. Примеры и кейсы. От 40 000 ₽ →",
    },
    "lichnyj-kabinet-v-telegram-bote": {
        title: "Личный кабинет в Telegram боте: реализация | DimaRazrab",
        metaDescription: "Личный кабинет в Telegram боте: история заказов, баланс, профиль, уведомления. Как реализовать для магазина и сервиса. Примеры и кейсы. От 30 000 ₽ →",
    },
    "nastrojka-telegram-bota": {
        metaDescription: "Настройка Telegram бота: webhook, команды, кнопки, база данных. Пошаговое руководство с примерами кода на Python. Бесплатная консультация. 2026 →",
    },
    "razrabotka-bota-dlya-telegram": {
        metaDescription: "Разработка бота для Telegram: как выбрать разработчика, красные флаги, реальные кейсы с ROI 300-600%. Бесплатная консультация. От 25 000 ₽ →",
    },
    "razrabotka-pod-klyuch": {
        metaDescription: "Разработка Telegram бота под ключ: анализ, проектирование, разработка, тестирование, запуск. Полный цикл с гарантией результата. От 30 000 ₽ →",
    },
    "razrabotka-s-nulya": {
        title: "Разработка Telegram-бота с нуля: руководство | DimaRazrab",
        metaDescription: "Разработка Telegram-бота с нуля: пошаговое руководство от идеи до запуска. Какие технологии выбрать, сколько стоит, как избежать ошибок. От 25 000 ₽ →",
    },
    "stoimost-razrabotki": {
        title: "Стоимость разработки Telegram бота: цены | DimaRazrab",
        metaDescription: "Сколько стоит разработка Telegram бота: от простого до сложного. Реальные цены, от чего зависит стоимость, как сэкономить. Калькулятор и примеры →",
    },
    "stoimost-telegram-bota": {
        metaDescription: "Стоимость разработки Telegram бота: от простого до сложного. Реальные цены от 25 000 ₽, сроки, факторы стоимости. Калькулятор. Заказать →",
    },
    "telegram-bot-dlya-avito": {
        title: "Telegram бот для Авито: автоматизация | DimaRazrab",
        metaDescription: "Telegram бот для Авито: уведомления о сообщениях, автоматические ответы, мониторинг конкурентов. Как автоматизировать продажи. Примеры. От 25 000 ₽ →",
    },
    "telegram-bot-dlya-magazina": {
        metaDescription: "Telegram бот для магазина: приём заказов, каталог товаров, оплата, уведомления. Полное руководство по автоматизации продаж. Заказать от 30 000 ₽ →",
    },
    "telegram-bot-dlya-priyoma-zakazov-2": {
        metaDescription: "Telegram бот для приёма заказов: каталог, корзина, оплата, уведомления. Автоматизация доставки еды и товаров. Реальные кейсы. Заказать от 30 000 ₽ →",
    },
    "telegram-bot-dlya-wildberries": {
        title: "Telegram бот для Wildberries: мониторинг | DimaRazrab",
        metaDescription: "Telegram бот для Wildberries: мониторинг цен, уведомления о заказах, аналитика продаж. Автоматизация работы с WB через бота. Примеры. От 25 000 ₽ →",
    },
    "telegram-bot-ili-mobilnoe-prilozhenie-dlya-biznesa": {
        title: "Telegram бот или приложение: что выбрать | DimaRazrab",
        metaDescription: "Telegram бот vs мобильное приложение: сравнение стоимости, сроков, функциональности. Что лучше для малого бизнеса. Реальные примеры. Расчёт →",
    },
    "telegram-bot-rassylka": {
        metaDescription: "Telegram бот рассылка: виды рассылок, настройка, сегментация, как не попасть под бан. Реальные кейсы с ROI 380-450%. Заказать от 25 000 ₽ →",
    },
    "telegram-bot-s-oplatoj": {
        metaDescription: "Telegram бот с оплатой: ЮKassa, СБП, Stripe. Пошаговая инструкция по настройке, юридические аспекты, реальные кейсы. Заказать от 30 000 ₽ →",
    },
    "telegram-mini-app-chto-eto": {
        metaDescription: "Telegram Mini App — веб-приложение внутри Telegram. Когда нужно бизнесу, сколько стоит, примеры и кейсы. Разработка Mini App от 50 000 ₽ →",
    },
    "telegram-webapp-razrabotka": {
        metaDescription: "Telegram WebApp разработка: что это, когда нужен, сколько стоит. Пошаговое руководство по созданию WebApp в Telegram-боте. Примеры. От 50 000 ₽ →",
    },
    "zakazat-telegram-bota": {
        title: "Заказать Telegram бота: как выбрать разработчика | DimaRazrab",
        metaDescription: "Заказать Telegram бота: как выбрать разработчика, сколько стоит, что спрашивать, как не попасть на мошенников. Чек-лист и советы от разработчика →",
    },
    "zapis-klientov": {
        metaDescription: "Telegram-бот для онлайн-записи клиентов: салоны красоты, клиники, фитнес, автосервис. Заменяет звонки и формы. Работает 24/7. От 25 000 ₽ →",
    },
    "konstruktory-telegram-botov": {
        title: "Конструкторы Telegram-ботов: обзор платформ | DimaRazrab",
    },

    // ─── API (api/) ───
    "api-integraciya-1s": {
        title: "API-интеграция с 1С: обмен данными онлайн | DimaRazrab",
        metaDescription: "API-интеграция с 1С: автоматический обмен товарами, ценами, остатками, заказами. Реальные кейсы с ROI 300-380%. От 50 000 ₽. Консультация →",
    },
    "fastapi-dlya-api": {
        metaDescription: "FastAPI для разработки API: высокая производительность, автодокументация, асинхронность. Реальные кейсы с ROI 420-680%. От 50 000 ₽. Оценка →",
    },
    "integraciya-api-dostavki": {
        metaDescription: "Интеграция API доставки от 15 000 ₽. СДЭК, Почта России, Boxberry, Деловые Линии. Автоматический расчёт стоимости и отслеживание. Оценка →",
    },
    "integraciya-api-marketplejsov": {
        title: "Интеграция API маркетплейсов: Ozon, WB, Avito | DimaRazrab",
        metaDescription: "Интеграция API маркетплейсов от 15 000 ₽. Ozon, WB, Avito, Яндекс.Маркет. Автоматизация заказов, остатков, цен. Реальные кейсы. Оценка →",
    },
    "integraciya-api-s-crm": {
        metaDescription: "Интеграция API с CRM от 20 000 ₽. amoCRM, Битrix24, Яндекс.Коннект. Автоматическая передача лидов из Telegram. Реальные кейсы. Оценка →",
    },
    "integraciya-api-s-sajtom": {
        metaDescription: "Интеграция API с сайтом: платёжные системы, CRM, маркетплейсы, геосервисы. Реальные кейсы с ROI 380-680%. От 30 000 ₽. Бесплатная оценка →",
    },
    "integraciya-nichevyh-api": {
        title: "Интеграция нишевых API: банки и сервисы | DimaRazrab",
        metaDescription: "Интеграция нишевых API от 15 000 ₽. Банковские API, Контур, Честный знак, WhatsApp Business. Автоматизация бизнес-процессов. Оценка бесплатно →",
    },
    "razrabotka-rest-api": {
        metaDescription: "Разработка REST API: проектирование, разработка, деплой. FastAPI, Django, PostgreSQL. Реальные кейсы с ROI 420-680%. От 50 000 ₽. Оценка →",
    },
    "webhook-integraciya": {
        metaDescription: "Webhook-интеграция: автоматизация событий, мгновенные уведомления, обработка данных. Реальные кейсы с ROI 300-420%. От 30 000 ₽. Консультация →",
    },

    // ─── Cluster2 (cluster2/) ───
    "ai-agenty-dlya-biznesa-cluster2": {
        // Этот slug дублируется с ai/ файлом — обрабатываем отдельно ниже
    },
    "ai-avtomatizaciya-biznesa": {
        metaDescription: "AI автоматизация бизнеса: ChatGPT для продаж и поддержки, генерация контента, аналитика. Пошаговый план, реальные кейсы. Обсудите проект. От 30 000 ₽ →",
    },
    "analiz-avtomatizacii-biznes-processov": {
        title: "Анализ автоматизации бизнес-процессов: аудит | DimaRazrab",
        metaDescription: "Анализ и аудит бизнес-процессов перед автоматизацией: методы, инструменты, BPMN. Пошаговый план с примерами. Бесплатная консультация. От 30 000 ₽ →",
    },
    "avtomatizaciya-biznesa-pod-klyuch": {
        title: "Автоматизация бизнеса под ключ: этапы и цены | DimaRazrab",
        metaDescription: "Автоматизация бизнеса под ключ: этапы, стоимость от 30 000 ₽, 3 реальных кейса с ROI 300-520%, договор, гарантии. Бесплатный аудит вашего бизнеса →",
    },
    "avtomatizaciya-klientov": {
        title: "Автоматизация клиентов: удержание и база | DimaRazrab",
        metaDescription: "Автоматизация клиентской базы: CRM, Telegram-бот, напоминания. Как не терять клиентов и увеличить повторные продажи. 3 кейса с ROI. Аудит →",
    },
    "avtomatizaciya-malogo-biznesa": {
        metaDescription: "Автоматизация малого бизнеса: реальные кейсы с ROI 300-520%, инструменты от 0 ₽, пошаговый план на 30 дней. Telegram-бот, CRM, рассылки. Аудит →",
    },
    "avtomatizaciya-otdela-prodazh": {
        metaDescription: "Автоматизация отдела продаж: CRM, Telegram-боты, воронка, лидогенерация. Пошаговый план с реальными кейсами и ROI 300-520%. Заказать от 30 000 ₽ →",
    },
    "avtomatizaciya-voronki-prodazh": {
        title: "Автоматизация воронки продаж: рост конверсии | DimaRazrab",
        metaDescription: "Автоматизация воронки продаж: Telegram-бот, CRM, триггерные сообщения. Как увеличить конверсию и не терять лиды. 3 кейса. Бесплатный аудит →",
    },
    "chto-mozhno-avtomatizirovat-v-malom-biznese": {
        metaDescription: "Что можно автоматизировать в малом бизнесе: запись клиентов, продажи, маркетинг, документооборот. 4 кейса с ROI 300-520%. Бесплатный аудит. От 15 000 ₽ →",
    },
    "cifrovizaciya-malogo-biznesa": {
        title: "Цифровизация малого бизнеса: с чего начать | DimaRazrab",
        metaDescription: "Цифровизация малого бизнеса: пошаговый план, инструменты, реальные кейсы. Как внедрить автоматизацию за 2-4 недели. Бесплатный аудит. От 15 000 ₽ →",
    },
    "crm-dlya-malogo-biznesa": {
        metaDescription: "CRM для малого бизнеса: готовые vs кастомные решения, стоимость, кейсы с ROI 300-580%. Заказать CRM от 80 000 ₽. Бесплатная консультация →",
    },
    "integraciya-crm-s-telegram": {
        title: "Интеграция CRM с Telegram: руководство и кейсы | DimaRazrab",
        metaDescription: "Как интегрировать CRM с Telegram: автоматические заявки, уведомления, аналитика. 3 кейса с ROI 300-580%. Стоимость от 50 000 ₽. Заказать →",
    },
    "kak-vnedrit-chatgpt-v-biznes": {
        metaDescription: "Как внедрить ChatGPT и AI в бизнес: 7 способов, пошаговый план, реальные кейсы с ROI 400-520%. Стоимость от 20 000 ₽. Бесплатная консультация →",
    },
    "nejroseti-dlya-biznesa": {
        metaDescription: "Нейросети для бизнеса: генерация контента, аналитика, автоматизация с ROI 300-520%. Реальные кейсы. Внедрить AI от 20 000 ₽. Консультация →",
    },
    "primery-avtomatizacii-biznesa": {
        title: "Примеры автоматизации бизнеса: 4 кейса с ROI | DimaRazrab",
        metaDescription: "Примеры автоматизации бизнеса: салон, Avito, SMM-агентство, SEO. Реальные кейсы из портфолио с цифрами и ROI 300-520%. Бесплатный аудит →",
    },
    "razrabotka-crm-erp": {
        metaDescription: "Разработка CRM и ERP на заказ от 80 000 ₽. Отличия CRM от ERP, этапы внедрения, кейсы с ROI 300%. Бесплатная оценка за 24 часа. Консультация →",
    },
    "razrabotka-crm-pod-klyuch": {
        metaDescription: "Разработка CRM-системы под ключ: этапы, функции, технологии, стоимость от 80 000 ₽. Реальные кейсы с ROI 380-580%. Бесплатная консультация →",
    },
    "sistema-avtomatizacii-biznes-processov": {
        title: "Система автоматизации БП: выбор и внедрение | DimaRazrab",
        metaDescription: "Обзор систем автоматизации бизнес-процессов: какие бывают, как выбрать, сколько стоит. Сравнение 5 решений. Бесплатная консультация. От 30 000 ₽ →",
    },

    // ─── Конструкторы (konstruktory/) ───
    "sozdanie-sajta-na-1s-bitrix": {
        title: "1С-Битрикс: создание сайта на заказ | DimaRazrab",
        metaDescription: "Создание сайта на 1С-Битрикс от 150 000 ₽. Интеграция с 1С, CRM Битрикс24. Интернет-магазины, корпоративные сайты. Реальные кейсы. Оценка →",
    },
    "sozdanie-sajta-na-tilda-konstruktor": {
        title: "Tilda конструктор: создание сайтов на заказ | DimaRazrab",
        metaDescription: "Заказать сайт на Tilda от 10 000 ₽. Лендинги, портфолио, интернет-магазины. API-интеграции. Сроки от 1 дня. Реальные кейсы. Оценка бесплатно →",
    },
    "sozdanie-sajta-na-wordpress": {
        title: "WordPress разработка: создание сайтов на заказ | DimaRazrab",
        metaDescription: "Создание сайтов на WordPress от 15 000 ₽. Elementor, WooCommerce, SEO-оптимизация. Сроки от 3 дней. Реальные кейсы. Оценка бесплатно →",
    },

    // ─── Лидогенерация (lidogeneraciya/) ───
    "kak-najti-klientov-v-telegram": {
        metaDescription: "Как найти клиентов в Telegram: автоматический поиск лидов, мониторинг чатов, сбор контактов. Реальные кейсы с ROI 500-780%. От 30 000 ₽ →",
    },
    "lidogeneraciya-telegram-kak-eto-rabotaet": {
        title: "Лидогенерация в Telegram: как работает поиск | DimaRazrab",
        metaDescription: "Лидогенерация в Telegram: как работает автоматический поиск лидов. Этапы, технологии, реальные кейсы с ROI 300-500%. От 30 000 ₽. Консультация →",
    },
    "massovaya-rassylka-telegram": {
        metaDescription: "Массовая рассылка в Telegram: автоматические рассылки, сегментация, A/B тестирование. Реальные кейсы с ROI 400-780%. От 30 000 ₽. Заказать →",
    },
    "parser-telegram-kanalov": {
        metaDescription: "Парсер Telegram-каналов: сбор участников, контактов, сообщений. Реальные кейсы с ROI 500-780%. Разработка от 50 000 ₽. Бесплатная консультация →",
    },
    "sbor-bazy-klientov-telegram": {
        title: "Как собрать базу клиентов в Telegram | DimaRazrab",
        metaDescription: "Сбор базы клиентов в Telegram: автоматический парсинг каналов, ML-фильтрация, экспорт в CRM. Реальные кейсы с ROI 500-780%. От 30 000 ₽ →",
    },

    // ─── Мобильные (mobile/) ───
    "krossplatformennaya-razrabotka-prilozhenij": {
        title: "Кроссплатформенная разработка: Flutter vs React | DimaRazrab",
        metaDescription: "Кроссплатформенная разработка на Flutter и React Native. iOS + Android от 300 000 ₽. Экономия 30-50%. Реальные кейсы. Оценка бесплатно →",
    },
    "razrabotka-mobilnyh-prilozhenij": {
        title: "Разработка мобильных приложений: стоимость | DimaRazrab",
        metaDescription: "Разработка мобильных приложений от 300 000 ₽. Flutter, React Native. iOS + Android. Кейсы с ROI 340%. Бесплатная оценка. Консультация →",
    },
    "razrabotka-prilozhenij-android-ios": {
        metaDescription: "Разработка приложений для Android и iOS. Kotlin, Swift, Flutter, React Native. Нативная vs кроссплатформа. Кейсы. Оценка от 300 000 ₽ →",
    },
    "razrabotka-prilozhenij-dlya-biznesa": {
        title: "Мобильное приложение для бизнеса: когда нужно | DimaRazrab",
        metaDescription: "Разработка мобильных приложений для бизнеса от 300 000 ₽. Интеграция с CRM, 1С, платёжными системами. ROI 200-500%. Реальные кейсы →",
    },
    "skolko-stoit-mobilnoe-prilozhenie": {
        title: "Сколько стоит мобильное приложение: разбор | DimaRazrab",
        metaDescription: "Сколько стоит мобильное приложение? Разбор от 150 000 до 5 000 000 ₽. Кроссплатформа vs нативная. Реальные кейсы. Бесплатная оценка →",
    },

    // ─── Next.js (nextjs/) ───
    "nextjs-seo-optimizaciya": {
        metaDescription: "SEO-оптимизация на Next.js: SSR, Core Web Vitals, structured data, мета-теги. Кейсы с +520% трафика. SEO-аудит бесплатно. Консультация. 2026 →",
    },
    "nextjs-vs-react": {
        metaDescription: "Next.js vs React: сравнение производительности, SEO, стоимости. Реальные кейсы миграции с ROI 480-520%. Консультация бесплатно. От 80 000 ₽ →",
    },
    "razrabotka-na-nextjs": {
        metaDescription: "Разработка на Next.js: SSR, SSG, ISR, API Routes. Реальные кейсы с ROI 480-680%. Создание сайтов и SaaS от 80 000 ₽. Консультация →",
    },
    "saas-razrabotka-nextjs": {
        metaDescription: "SaaS-разработка на Next.js: архитектура, стек, мультитенантность, биллинг. Кейсы с ROI 480-680%. Создание SaaS от 200 000 ₽. Консультация →",
    },
    "sozdanie-sajta-nextjs": {
        metaDescription: "Создание сайта на Next.js: пошаговое руководство от идеи до запуска. Кейсы с ROI 480-680%. Создание сайта от 80 000 ₽. Бесплатная оценка →",
    },

    // ─── Парсеры (parsery/) ───
    "analitika-marketplejsov": {
        metaDescription: "Аналитика маркетплейсов: сбор данных, метрики, дашборды для селлеров. Реальные кейсы с ROI 380-420%. Разработка от 60 000 ₽. Консультация →",
    },
    "api-wildberries-rukovodstvo": {
        metaDescription: "API Wildberries: полное руководство по интеграции. Endpoints, авторизация, примеры кода на Python. Реальные кейсы. Разработка от 30 000 ₽ →",
    },
    "monitoring-cen-marketplejsov": {
        metaDescription: "Мониторинг цен на Wildberries, Ozon, AliExpress. Автоматизация ценообразования с ROI 320-650%. Разработка от 30 000 ₽. Бесплатная оценка →",
    },
    "parser-avito": {
        metaDescription: "Парсер Avito: сбор объявлений, контактов, цен конкурентов. Реальные кейсы с ROI 280-780%. Разработка парсера от 30 000 ₽. Консультация →",
    },
    "parser-dannyh": {
        title: "Парсинг данных: сбор и анализ информации | DimaRazrab",
        metaDescription: "Парсинг данных от 15 000 ₽. Сбор информации с сайтов, маркетплейсов, соцсетей. Python, Selenium, API. Реальные кейсы. Оценка бесплатно →",
    },
    "parser-otzyvov": {
        metaDescription: "Парсер отзывов от 20 000 ₽. Сбор и анализ отзывов WB, Ozon, Яндекс Карты. Мониторинг репутации, тональности. Кейсы. Оценка бесплатно →",
    },
    "parser-ozon": {
        metaDescription: "Парсер Ozon: сбор данных через API и скрейпинг товаров, цен, характеристик. Реальные кейсы с ROI 380%. Разработка от 30 000 ₽. Оценка →",
    },
    "parser-wildberries": {
        metaDescription: "Парсер Wildberries: сбор данных о товарах, ценах, позициях, отзывов. Реальные кейсы с ROI 380-420%. Разработка от 30 000 ₽. Оценка →",
    },

    // ─── Python (python/) ───
    "django-vs-fastapi-vs-flask": {
        metaDescription: "Django vs FastAPI vs Flask: подробное сравнение с примерами кода. Кейсы с ROI 380-680%. Какой Python-фреймворк выбрать. Консультация бесплатно →",
    },
    "fastapi-razrabotka": {
        metaDescription: "FastAPI разработка: высокопроизводительные API, микросервисы, ML serving. Кейсы с ROI 420-680%. Бесплатная консультация. От 40 000 ₽ →",
    },
    "python-avtomatizaciya-biznesa": {
        metaDescription: "Python для автоматизации бизнеса: скрипты, парсинг, интеграции. Кейсы с ROI 280-520%. Экономия 6-16 часов в день. Бесплатная консультация →",
    },
    "python-backend-razrabotka": {
        metaDescription: "Python backend разработка: архитектура, Django, FastAPI, деплой. Кейсы с ROI 320-680%. Бесплатная консультация. От 40 000 ₽. Заказать →",
    },
    "python-obrabotka-dannyh": {
        metaDescription: "Python для обработки данных: pandas, аналитика, дашборды, ETL-пайплайны. Кейсы с ROI 420-450%. Автоматизация отчётов. Бесплатная оценка →",
    },
    "python-parsing-na-zakaz": {
        metaDescription: "Python-парсинг на заказ: сбор данных, мониторинг цен, обход защиты. Кейсы с ROI 280-320%. От 15 000 ₽. Бесплатная консультация. Заказать →",
    },
    "python-razrabotka-pod-klyuch": {
        metaDescription: "Python-разработка под ключ: backend, API, парсеры, автоматизация. Реальные кейсы с ROI 320-680%. Бесплатная консультация. От 30 000 ₽ →",
    },
    "python-telegram-bot-razrabotka": {
        metaDescription: "Разработка Telegram-бота на Python: aiogram, архитектура, кейсы. ROI 300-500%. Запись клиентов, лидогенерация, уведомления. От 30 000 ₽ →",
    },
    "kak-sdelat-telegram-bota-na-python": {
        title: "Как сделать Telegram бота на Python: гайд | DimaRazrab",
        metaDescription: "Пошаговое руководство: как сделать Telegram бота на Python с нуля. Aiogram, python-telegram-bot, webhook, база данных. Код и деплой. 2026 →",
    },

    // ─── Склад (sklad/) ───
    "avtomatizaciya-sklada-1s": {
        title: "Автоматизация склада на 1С: возможности | DimaRazrab",
        metaDescription: "Автоматизация склада на 1С от 100 000 ₽. 1С:Комплексная автоматизация, штрихкоды, ТСД, инвентаризация. ROI 200-350%. Реальные кейсы →",
    },
    "avtomatizaciya-sklada-marketplejsy": {
        metaDescription: "Автоматизация склада для маркетплейсов от 100 000 ₽. FBS, FBO, DBS модели. Интеграция с WB, Ozon, 1С. ROI 300-450%. Реальные кейсы →",
    },
    "avtomatizaciya-sklada": {
        title: "Автоматизация склада: системы и технологии | DimaRazrab",
        metaDescription: "Автоматизация склада от 100 000 ₽. WMS, штрихкоды, ТСД, интеграция с 1С. ROI 200-380%. Реальные кейсы. Оценка бесплатно. Консультация →",
    },
    "wms-sistemy-avtomatizacii": {
        title: "WMS-системы: автоматизация складского учёта | DimaRazrab",
        metaDescription: "WMS системы от 100 000 ₽. Автоматизация склада: ячеечное хранение, комплектация, инвентаризация. ROI 200-420%. Реальные кейсы. Оценка →",
    },

    // ─── Веб (veb/) ───
    "razrabotka-sajta-pod-klyuch-veb": {
        metaDescription: "Разработка сайта под ключ: от дизайна до запуска. Стоимость от 50 000 ₽. Next.js, Python, FastAPI. Реальные кейсы. Бесплатная оценка за 24ч →",
    },
    "sajty-na-zakaz": {
        metaDescription: "Сайты на заказ от 15 000 ₽. Виды: лендинг, каталог, интернет-магазин, корпоративный. Реальные кейсы и цены. Бесплатная оценка за 24 часа →",
    },
    "sozdanie-internet-magazina": {
        title: "Создание интернет-магазина: стоимость и этапы | DimaRazrab",
        metaDescription: "Создание интернет-магазина на заказ от 80 000 ₽. Shopify, WooCommerce, 1С-Битрикс, кастом. Реальные кейсы. Оценка бесплатно. Консультация →",
    },
    "sozdanie-lendinga": {
        metaDescription: "Создание лендинга под ключ: Tilda, WordPress, код. Стоимость от 15 000 ₽. Реальные примеры конверсии 5-12%. Бесплатная консультация. От 3 дней →",
    },
    "sozdanie-sajta-kataloga": {
        metaDescription: "Создание сайта-каталога на заказ от 40 000 ₽. Фильтры, карточки товаров, интеграция с 1С. Примеры и кейсы. Бесплатная оценка. Консультация →",
    },
    "zakazat-sajt-na-bitrix": {
        metaDescription: "Заказать сайт на 1С-Битрикс от 50 000 ₽. Шаблон vs кастомная разработка. Интеграция с 1С и CRM. Реальные кейсы. Бесплатная оценка →",
    },
    "zakazat-sajt-na-tilde": {
        title: "Заказать сайт на Tilda: стоимость и примеры | DimaRazrab",
        metaDescription: "Заказать сайт на Tilda от 10 000 ₽. Лендинг, каталог, магазин. Когда Tilda выгоднее кода. Примеры и кейсы. Консультация бесплатно. От 1 дня →",
    },

    // ─── Cluster2 файлы с дублирующимся slug (обращаемся по filePath) ───
};

// Отдельно обрабатываем файл cluster2/ai-agenty-dlya-biznesa.ts
// (slug дублируется с ai/ai-agenty-dlya-biznesa.ts)
const CLUSTER2_FIXES = {
    "cluster2/ai-agenty-dlya-biznesa.ts": {
        metaDescription: "AI-агенты для бизнеса: автоматизация продаж, поддержки, контента с ROI 300-520%. Реальные кейсы. Разработка AI-агента от 30 000 ₽. Консультация →",
    },
};

// ═══════════════════════════════════════════
//  ЛОГИКА ПРИМЕНЕНИЯ
// ═══════════════════════════════════════════

function applyFix(content, fieldName, newValue) {
    // Ищем строку с полем и заменяем значение
    // Поддерживаем форматы: field: "value", field: `value`
    const singleQuoteRegex = new RegExp(
        `(${fieldName}\\s*:\\s*)"([^"]*)"`,
        'm'
    );
    if (singleQuoteRegex.test(content)) {
        return content.replace(singleQuoteRegex, `$1"${newValue}"`);
    }

    // Обратные кавычки
    const backtickRegex = new RegExp(
        `(${fieldName}\\s*:\\s*)\`([^\`]*)\``,
        'ms'
    );
    if (backtickRegex.test(content)) {
        return content.replace(backtickRegex, `$1\`${newValue}\``);
    }

    return content;
}

function runFixMetaTags() {
    console.log(`\n${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  🔧 ИСПРАВЛЕНИЕ МЕТА-ТЕГОВ${C.reset}`);
    console.log(`${C.bold}${C.cyan}═══════════════════════════════════════════${C.reset}\n`);

    const domainFiles = findDomainFiles(ARTICLES_DIR);
    console.log(`${C.dim}Найдено domain-файлов: ${domainFiles.length}${C.reset}\n`);

    let fixedCount = 0;
    let skippedCount = 0;
    const changes = [];

    for (const filePath of domainFiles) {
        const relPath = path.relative(ARTICLES_DIR, filePath);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Извлекаем slug
        const slugMatch = content.match(/slug\s*:\s*"([^"]*)"/);
        if (!slugMatch) continue;
        const slug = slugMatch[1];

        // Определяем fixes для этого файла
        let fix = FIXES[slug];
        
        // Проверяем cluster2 дубликаты
        if (!fix || Object.keys(fix).length === 0) {
            for (const [pattern, clusterFix] of Object.entries(CLUSTER2_FIXES)) {
                if (relPath === pattern || relPath.replace(/\\/g, '/') === pattern) {
                    fix = clusterFix;
                    break;
                }
            }
        }

        if (!fix || Object.keys(fix).length === 0) {
            skippedCount++;
            continue;
        }

        let fileChanged = false;

        // Применяем title
        if (fix.title) {
            const oldContent = content;
            content = applyFix(content, 'title', fix.title);
            if (content !== oldContent) {
                const oldTitle = oldContent.match(/title\s*:\s*"([^"]*)"/)?.[1] || '';
                changes.push({
                    file: relPath,
                    field: 'title',
                    oldLen: oldTitle.length,
                    newLen: fix.title.length,
                    oldValue: oldTitle,
                    newValue: fix.title,
                });
                fileChanged = true;
            }
        }

        // Применяем metaDescription
        if (fix.metaDescription) {
            const oldContent = content;
            content = applyFix(content, 'metaDescription', fix.metaDescription);
            if (content !== oldContent) {
                const oldDesc = oldContent.match(/metaDescription\s*:\s*"([^"]*)"/)?.[1] || '';
                changes.push({
                    file: relPath,
                    field: 'metaDescription',
                    oldLen: oldDesc.length,
                    newLen: fix.metaDescription.length,
                    oldValue: oldDesc,
                    newValue: fix.metaDescription,
                });
                fileChanged = true;
            }
        }

        if (fileChanged) {
            fs.writeFileSync(filePath, content, 'utf-8');
            fixedCount++;
        }
    }

    // ─── Отчёт ───
    console.log(`${C.bold}${C.green}✅ Исправлено файлов: ${fixedCount}${C.reset}`);
    console.log(`${C.dim}Пропущено (не требуют исправлений): ${skippedCount}${C.reset}`);
    console.log(`${C.dim}Всего изменений полей: ${changes.length}${C.reset}\n`);

    console.log(`${C.bold}📋 Детализация изменений:${C.reset}\n`);
    for (const ch of changes) {
        const dir = ch.field === 'title' ? '🏷️' : '📝';
        const color = ch.newLen >= 50 && ch.newLen <= 160 ? C.green : C.red;
        console.log(`  ${dir} ${C.dim}${ch.file}${C.reset}`);
        console.log(`     ${ch.field}: ${C.dim}[${ch.oldLen}]${C.reset} → ${color}[${ch.newLen}]${C.reset}`);
        if (ch.field === 'title') {
            console.log(`     ${C.dim}→ ${ch.newValue}${C.reset}`);
        }
        console.log('');
    }

    return { fixedCount, changes };
}

if (require.main === module) {
    runFixMetaTags();
}

module.exports = { runFixMetaTags, FIXES, CLUSTER2_FIXES };
