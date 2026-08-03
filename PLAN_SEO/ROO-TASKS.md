# 📋 ROO-TASKS — Трекер задач SEO-плана

> ✅ **Семантика верифицирована Wordstat** (август 2026)
> Реальные данные: 145 запросов, 39 630 показов/мес
> Файл: [`PLAN_SEO/WORDS/CLEAN_ALL.md`](WORDS/CLEAN_ALL.md)
> Детали: [`PLAN_SEO/01-SEMANTIC-CORE.md`](01-SEMANTIC-CORE.md)

> RooCode: читай этот файл в начале каждой сессии.
> Найди первую задачу `[ ]`, выполни её, поставь `[x]`.
> Если задача большая — поставь `[-]` и допиши в конце что именно сделано.

> ⚠️ **ГЛАВНОЕ ПРАВИЛО: НИКАКИХ ВЫДУМАННЫХ ДАННЫХ!**
> Перед написанием ЛЮБОЙ статьи — прочитай `PLAN_SEO/WORDSTAT-RULES.md`.
> Все цифры в статьях ДОЛЖНЫ быть основаны на реальных данных Wordstat или реальных кейсах.
> Если данных нет — НЕ ПИШЕМ статью, пока не проверим.

> 📋 **Прогон по чеклисту:** Кластер A (Telegram-боты) — ✅ прогнан. Кластер D (Автоматизация) — в очереди.

---

## 🔴 Фаза 1: Фундамент (Неделя 1-2)

### Техническая оптимизация
- [x] ~~Проверить что robots.txt существует и корректен~~ **НЕ НУЖНО — на бекенде (FastAPI)**
- [x] ~~Проверить что sitemap.xml динамический и содержит все страницы~~ **НЕ НУЖНО — на бекенде (FastAPI)**
- [x] Проверить мета-теги (title, description) на ВСЕХ существующих страницах ✅ 03.08.2026: title+description на ВСЕХ 25+ страницах (главная, 10 лендингов, 9 hub-страниц, blog/index, [slug], work/[slug], category/[slug], 404, privacy)
- [x] Добавить Open Graph теги на все страницы ✅ 03.08.26: og:type, og:title, og:description, og:url, og:image + Twitter card на ВСЕХ страницах
- [x] Проверить canonical URLs ✅ 03.08.2026: `<link rel="canonical">` на ВСЕХ страницах
- [x] Добавить Schema.org разметку (Organization, Service, BreadcrumbList) ✅ 03.08.2026: JSON-LD на ВСЕХ страницах (ProfessionalService, WebPage, Service, BreadcrumbList, CollectionPage, Article, FAQPage, CreativeWork)
- [ ] Проверить скорость загрузки (LCP, FID, CLS)
- [ ] Проверить мобильную адаптацию всех страниц
- [x] Добавить alt теги ко всем изображениям ✅ 03.08.2026: все `<img>` в компонентах имеют alt
- [x] Проверить 404 страницу ✅ 03.08.2026: красивая 404 с noindex,nofollow, canonical
- [x] Добавить хлебные крошки на все страницы ✅ 03.08.2026: создан Breadcrumbs компонент, добавлен на 10 коммерческих лендингов + WorkPage + Category + login/register noindex

### Коммерческие страницы (приоритетные)
- [ ] Создать страницу /parsery-marketplejsov (Парсеры маркетплейсов)
- [ ] Создать страницу /lidogeneraciya-telegram (Лидогенерация из Telegram)
- [ ] Создать страницу /razrabotka-api (Разработка API)
- [ ] Создать страницу /ai-avtomatizaciya (AI автоматизация)
- [ ] Создать страницу /python-razrabotka (Python разработка)
- [ ] Создать страницу /nextjs-razrabotka (Next.js разработка)

### Hub-страницы (агрегаторы кластеров)
- [ ] Создать hub-страницу /blog/telegram-boty (если нет)
- [ ] Создать hub-страницу /blog/avtomatizaciya-biznesa (если нет)
- [ ] Создать hub-страницу /blog/parsery-i-dannye
- [ ] Создать hub-страницу /blog/lidogeneraciya
- [ ] Создать hub-страницу /blog/python-razrabotka
- [ ] Создать hub-страницу /blog/nextjs-razrabotka
- [ ] Создать hub-страницу /blog/ai-i-neyroseti
- [ ] Создать hub-страницу /blog/api-i-integracii
- [ ] Создать hub-страницу /blog/veb-razrabotka

---

## 🟡 Фаза 2: Контентный удар (Неделя 3-6)

### 📋 Прогон существующих статей по ARTICLE-CHECKLIST.md

> Кластер A (Telegram-боты) — ✅ Уже прогнан
> Кластер D (Автоматизация бизнеса) — нужно прогнать

#### Кластер D: Автоматизация бизнеса (10 статей) — ПРОВЕРИТЬ ПО ЧЕКЛИСТУ
- [x] Прогон статьи: avtomatizaciya-malogo-biznesa (data/articles_data/cluster2/) ✅ 02.08.2026: убрана выдуманная статистика (Deloitte/HubSpot/McKinsey), добавлены реальные кейсы (sapis_cllientov ROI 300%, avito_payments ROI 520%, bosslike ROI 520%, seo_booster ROI 450%), добавлены внутренние ссылки и conversion/readmore блоки, переструктурировано под 02-PAGE-PLAN.md
- [x] Прогон статьи: ai-avtomatizaciya-biznesa (data/articles_data/cluster2/) ✅ 02.08.2026: заменены выдуманные кейсы (интернет-магазин, кофейня) на реальные (chat_gpt_tg ROI 520%, chatgpt_goroskop ROI 400%), добавлены 3 :::conversion блока, :::readmore, внутренние ссылки на /avtomatizaciya-biznesа, /blog/nejroseti-dlya-biznesa, /blog/kak-vnedrit-chatgpt-v-biznes, обновлена metaDescription до 150+ символов с CTA
- [x] Прогон статьи: avtomatizaciya-otdela-prodazh (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts, добавлены 3 реальных кейса (leads_from_telegram ROI 500%, auto_approve_tg ROI 450%, chat_gpt_tg ROI 520%) с /work/ ссылками, убраны 2 выдуманных кейса («IT-компания», «агентство недвижимости»), добавлены 2 :::conversion + 1 :::readmore, добавлены внутренние ссылки на /blog/crm-dlya-malogo-biznesa и /blog/integraciya-crm-s-telegram, metaDescription расширена до 150+ символов с CTA, секции расширены до 12 H2
- [x] Прогон статьи: primery-avtomatizacii-biznesa (data/articles_data/cluster2/) ✅ 02.08.2026: заменены все 9 выдуманных кейсов на 4 реальных из портфолио (sapis_cllientov ROI 300%, avito_payments ROI 520%, bosslike ROI 520%, seo_booster ROI 450%) с /work/ ссылками, добавлены 3 таблицы сравнения, 2 :::conversion + 1 :::readmore, 7 внутренних ссылок (/avtomatizaciya-biznesа x2, /blog/avtomatizaciya-malogo-biznesa, /blog/avtomatizaciya-otdela-prodazh, /blog/avtomatizaciya-biznesa-pod-klyuch, /razrabotka-botov, /blog/crm-dlya-malogo-biznesa, /blog/integraciya-crm-s-telegram), заголовок скорректирован с "15 кейсов" на "4 реальных кейса", добавлены паттерны по отраслям и пошаговый план
- [x] Прогон статьи: avtomatizaciya-biznesa-pod-klyuch (data/articles_data/cluster2/) ✅ 02.08.2026: добавлены 3 реальных кейса (sapis_cllientov ROI 300%, avito_payments ROI 520%, documents_google ROI 380%) с /work/ ссылками, добавлены 2 кейса в текст (bosslike ROI 520% в how-to-choose, seo_booster ROI 450% в guarantees+mistakes), добавлены 2 :::conversion + 1 :::readmore, обновлены внутренние ссылки до 8 (money page /avtomatizaciya-biznesa x2, /blog/avtomatizaciya-malogo-biznesa, /blog/primery-avtomatizacii-biznesa, /razrabotka-botov, /work/sapis_cllientov, /work/avito_payments, /work/documents_google), добавлена новая секция "real-cases" в toc, structuredData FAQ расширен до 6 вопросов, metaDescription обновлена до 155 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: cto-mozhno-avtomatizirovat-v-malom-biznese (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (cto-mozhno-part1.ts + cto-mozhno-part2.ts), контент расширен до 8000+ символов, добавлены 4 реальных кейса (sapis_cllientov ROI 300%, avito_payments ROI 520%, bosslike ROI 520%, seo_booster ROI 450%) с /work/ ссылками и таблицами До/После, добавлены 2 :::conversion + 1 :::readmore, обновлены внутренние ссылки до 8 (/avtomatizaciya-biznesа x2, /blog/avtomatizaciya-malogo-biznesa, /blog/primery-avtomatizacii-biznesa, /blog/avtomatizaciya-otdela-prodazh, /razrabotka-botov, /blog/crm-dlya-malogo-biznesa, /blog/integraciya-crm-s-telegram), добавлены сводные таблицы (10 процессов, кейсы, стоимость, приоритеты), metaDescription расширена до 155 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: avtomatizaciya-dokumentooborota (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (dokumentooborota-part1.ts + dokumentooborota-part2.ts), контент расширен с таблицами (сравнение подходов SaaS/Кастом/Гибрид, стоимость по уровням, сводная таблица кейсов), добавлены 3 реальных кейса (documents_google ROI 380%, django_tan ROI 580%, rab_dom ROI 380%) с /work/ ссылками, добавлены 2 :::conversion + 1 :::readmore, обновлены внутренние ссылки до 8 (/avtomatizaciya-biznesa x2 money page, /blog/crm-dlya-malogo-biznesa, /razrabotka-crm, /razrabotka-servisov, /blog/avtomatizaciya-malogo-biznesa, /blog/primery-avtomatizacii-biznesa, /blog/integraciya-crm-s-telegram), добавлена секция "conclusion" в toc, metaDescription расширена до 155 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: integraciya-crm-s-telegram (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (integraciya-crm-telegram-part1.ts + integraciya-crm-telegram-part2.ts), контент расширен до 8000+ символов, добавлены 5 таблиц (сравнение До/После, CRM-системы, сценарии бизнеса, сводная кейсов, пакеты стоимости), добавлены 3 реальных кейса (sapis_cllientov ROI 300%, university_tg ROI 380%, django_tan ROI 580%) с /work/ ссылками, добавлены 2 :::conversion + 1 :::readmore, добавлена новая секция "scenarios" и "mistakes", обновлены внутренние ссылки до 8 (/avtomatizaciya-biznesa x2 money page, /razrabotka-crm, /razrabotka-botov, /blog/crm-dlya-malogo-biznesa, /blog/avtomatizaciya-otdela-prodazh, /blog/chto-mozhno-avtomatizirovat-v-malom-biznese, /blog/avtomatizaciya-malogo-biznesa, /blog/razrabotka-crm-pod-klyuch), metaDescription расширена до 155 символов с CTA, toc расширен до 10 секций, modifiedDate 2026-08-02
- [x] Прогон статьи: crm-dlya-malogo-biznesa (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (crm-malogo-part1.ts + crm-malogo-part2.ts), заменён кейс university_tg на rab_dom (ROI 380%), добавлены 3 таблицы (сигналы CRM, готовые vs кастомные, TCO за 3 года), 2 :::conversion + 1 :::readmore, новая секция "implementation" (пошаговый план внедрения), итого 9 H2 секций, обновлены внутренние ссылки до 8 (/razrabotka-crm, /avtomatizaciya-biznesа, /blog/integraciya-crm-s-telegram, /blog/razrabotka-crm-pod-klyuch, /razrabotka-botov, /blog/avtomatizaciya-malogo-biznesa, /blog/chto-mozhno-avtomatizirovat-v-malom-biznese, /blog/avtomatizaciya-dokumentooborota), metaDescription расширена до 155 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: razrabotka-crm-pod-klyuch (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (pod-klyuch-crm-part1.ts + pod-klyuch-crm-part2.ts), заменён кейс sapis_cllientov на documents_google (ROI 380%), добавлены 4 таблицы (готовые vs кастомные CRM, этапы разработки, стоимости CRM, типичные ошибки), 2 :::conversion + 1 :::readmore, новая секция "mistakes" (типичные ошибки), итого 9 H2 секций, обновлены внутренние ссылки до 8 (/razrabotka-crm, /avtomatizaciya-biznesа, /blog/crm-dlya-malogo-biznesa, /blog/integraciya-crm-s-telegram, /razrabotka-servisov, /blog/avtomatizaciya-dokumentooborota, /blog/primery-avtomatizacii-biznesa, /blog/telegram-mini-app-chto-eto), metaDescription расширена до 160 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: kak-vnedrit-chatgpt-v-biznes (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (chatgpt-biznes-part1.ts + chatgpt-biznes-part2.ts), добавлены 3 таблицы (7 способов ChatGPT, пошаговый план, стоимость интеграции), 2 :::conversion + 1 :::readmore, новая секция "conclusion" (заключение), итого 9 H2 секций, обновлены внутренние ссылки до 8 (/razrabotka-botov, /avtomatizaciya-biznesа, /blog/ai-avtomatizaciya-biznesa, /blog/nejroseti-dlya-biznesa, /blog/ai-agenty-dlya-biznesa, /blog/avtomatizaciya-otdela-prodazh, /blog/stoimost-telegram-bota, /blog/primery-avtomatizacii-biznesa), metaDescription расширена до 160 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: nejroseti-dlya-biznesa (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (nejroseti-part1.ts + nejroseti-part2.ts), добавлены 3 таблицы (выбор технологии, стоимость внедрения по уровням, модели для бизнеса), 2 :::conversion + 1 :::readmore, новая секция "conclusion" (заключение), итого 8 H2 секций, обновлены внутренние ссылки до 8 (/avtomatizaciya-biznesа, /razrabotka-botov, /blog/kak-vnedrit-chatgpt-v-biznes, /blog/ai-avtomatizaciya-biznesa, /blog/ai-agenty-dlya-biznesa, /blog/avtomatizaciya-otdela-prodazh, /blog/primery-avtomatizacii-biznesa, /blog/crm-dlya-malogo-biznesa), metaDescription расширена до 160 символов с CTA, modifiedDate 2026-08-02
- [x] Прогон статьи: ai-agenty-dlya-biznesa (data/articles_data/cluster2/) ✅ 02.08.2026: доменный файл рефакторен на импорт из text parts (ai-agenty-part1.ts + ai-agenty-part2.ts), добавлены 3 таблицы (бот vs AI-агент, типы агентов, стоимость разработки, выбор модели, этапы внедрения), 2 :::conversion + 1 :::readmore, новая секция "faq" (6 вопросов в sections) + "conclusion" (заключение), итого 9 H2 секций, обновлены внутренние ссылки до 8 (/razrabotka-botov, /avtomatizaciya-biznesа, /blog/ai-avtomatizaciya-biznesa, /blog/nejroseti-dlya-biznesa, /blog/kak-vnedrit-chatgpt-v-biznes, /blog/avtomatizaciya-otdela-prodazh, /blog/primery-avtomatizacii-biznesa, /blog/crm-dlya-malogo-biznesa), metaDescription расширена до 160 символов с CTA, modifiedDate 2026-08-02

### Статьи: Telegram-боты (кластер A, ★★★) — ✅ Wordstat (57 запросов, ~18 590 показов/мес)

**Статус кластера:** 23 статьи опубликованы, text parts обновлены 03.08.2026, перелинковка обновлена 03.08.2026

- [x] Статья: Telegram бот для приёма заявок — полное руководство → slug: `telegram-bot-dlya-priyoma-zayavok` (файл: `data/articles_data/priyom-zayavok.ts`)
- [x] Статья: Telegram бот для интернет-магазина — каталог, заказы, оплата → slug: `telegram-bot-dlya-internet-magazina` (файл: `data/articles_data/internet-magazin.ts`)
- [x] Статья: Telegram бот для записи клиентов — онлайн-запись 24/7 → slug: `telegram-bot-dlya-zapisi-klientov` (файл: `data/articles_data/zapis-klientov.ts`)
- [x] Статья: Как сделать Telegram бота на Python — пошаговое руководство → slug: `kak-sdelat-telegram-bota-na-python` (файл: `data/articles_data/python-bot.ts`)
- [x] Статья: AI Telegram бот для бизнеса — разработка ИИ ботов → slug: `ai-telegram-bot-dlya-biznesa` (файл: `data/articles_data/ai-bot.ts`)
- [x] Статья: Telegram бот для бизнеса: возможности и примеры → slug: `telegram-bot-dlya-biznesa` (файл: `data/articles_data/bot-dlya-biznesa.ts`)
- [x] Статья: Сколько стоит разработка Telegram бота — реальные цены 2026 → slug: `skolko-stoit-razrabotka-telegram-bota` (файл: `data/articles_data/stoimost-razrabotki.ts`)
- [x] Статья: Разработка Telegram бота под ключ — от идеи до запуска → slug: `razrabotka-telegram-bota-pod-klyuch` (файл: `data/articles_data/razrabotka-pod-klyuch.ts`)
- [x] Статья: Telegram бот для продаж: увеличьте выручку на 40-70% → slug: `telegram-bot-dlya-prodazh` (файл: `data/articles_data/bot-prodazhi.ts`)
- [x] Статья: Как создать AI бота в Telegram — пошаговое руководство → slug: `kak-sozdat-ai-bot-telegram` (файл: `data/articles_data/ai-bot-sozdanie.ts`)
- [x] Статья: Telegram WebApp разработка — полное руководство 2026 → slug: `telegram-webapp-razrabotka` (файл: `data/articles_data/telegram-webapp.ts`)
- [x] Статья: Telegram бот или мобильное приложение — что выбрать в 2026 → slug: `telegram-bot-ili-mobilnoe-prilozhenie` (файл: `data/articles_data/bot-ili-prilozhenie.ts`)
- [x] Статья: Разработка Telegram-бота с нуля — пошаговое руководство → slug: `razrabotka-telegram-bota-s-nulya` (файл: `data/articles_data/razrabotka-s-nulya.ts`)
- [x] Статья: Заказать Telegram бота — как выбрать разработчика → slug: `zakazat-telegram-bota` (файл: `data/articles_data/zakazat-bota.ts`)
- [x] Статья: Telegram бот для приёма заказов — автоматизация продаж → slug: `telegram-bot-dlya-priyoma-zakazov` (файл: `data/articles_data/bot-priyom-zakazov.ts`)
- [x] Статья: Стоимость разработки Telegram бота: реальные цены 2026 → slug: `stoimost-telegram-bota` (файл: `data/articles_data/stoimost-telegram-bota.ts`)
- [x] Статья: Telegram бот для магазина: приём заказов и продажи → slug: `telegram-bot-dlya-magazina` (файл: `data/articles_data/telegram-bot-dlya-magazina.ts`)
- [x] Статья: Telegram бот для записи клиентов: салон, клиника, сервис → slug: `bot-dlya-zapisi-klientov` (файл: `data/articles_data/bot-dlya-zapisi-klientov.ts`)
- [x] Статья: Telegram бот или мобильное приложение: что выбрать для бизнеса → slug: `telegram-bot-ili-mobilnoe-prilozhenie-dlya-biznesa` (файл: `data/articles_data/telegram-bot-ili-mobilnoe-prilozhenie-dlya-biznesa.ts`)
- [x] Статья: Как Telegram бот увеличивает продажи: кейсы и примеры → slug: `kak-telegram-bot-uvelichivaet-prodazhi` (файл: `data/articles_data/kak-telegram-bot-uvelichivaet-prodazhi.ts`)
- [x] Статья: Telegram Mini App: что это и когда нужно бизнесу → slug: `telegram-mini-app-chto-eto` (файл: `data/articles_data/telegram-mini-app-chto-eto.ts`)
- [x] Статья: Aiogram vs Pyrogram: какой фреймворк выбрать для Telegram бота → slug: `aiogram-vs-pyrogram` (файл: `data/articles_data/aiogram-vs-pyrogram.ts`)
- [x] Статья: Telegram бот для приёма заказов: доставка, еда, товары → slug: `telegram-bot-dlya-priyoma-zakazov-2` (файл: `data/articles_data/telegram-bot-dlya-priyoma-zakazov-2.ts`)

**Непокрытые запросы ★★★ (требуют новых статей):**
- [ ] Статья: Разработка бота для Telegram: как выбрать подрядчика (запрос: «разработка бота для telegram» 58, «разработчик telegram бота» 28, «написать бота для telegram» 74)
- [ ] Статья: Telegram бот с оплатой: приём платежей в боте (запрос: «бот оплаты telegram» 119)
- [ ] Статья: Telegram бот рассылка: настройка автоматических сообщений (запрос: «telegram бот рассылка» 41)
- [ ] Статья: Бот для автоматизации продаж в Telegram (запрос: «бот для автоматизации продаж» 22)

### Статьи: Парсинг маркетплейсов (кластер B, ★★★) — ⚠️ Мало данных Wordstat (3 запроса, 170 показов) — нужны доп. запросы
- [ ] Статья: Парсер Wildberries: что можно собирать и зачем
- [ ] Статья: Парсер Ozon: мониторинг цен и товаров
- [ ] Статья: Парсер Avito: сбор объявлений и контактов
- [ ] Статья: Мониторинг цен на маркетплейсах: как это работает
- [ ] Статья: Repricer для Wildberries: автоматическая переоценка
- [ ] Статья: API Wildberries для продавцов: полное руководство
- [ ] Статья: Как анализировать конкурентов на маркетплейсах

### Статьи: Лидогенерация (кластер C, ★★★) — ❌ Нет данных Wordstat
- [ ] Статья: Как искать клиентов в Telegram: парсеры и боты
- [ ] Статья: Сбор контактов в Telegram: этично и эффективно
- [ ] Статья: Лидогенерация через Telegram-бота: как настроить
- [ ] Статья: Мониторинг Telegram каналов: находим клиентов автоматически
- [ ] Статья: База клиентов из Telegram: как собрать и использовать

### Статьи: Автоматизация бизнеса (кластер D, ★★) — ✅ Wordstat (60 запросов, 19 283 показов/мес)
- [ ] Статья: Что можно автоматизировать в малом бизнесе
- [ ] Статья: Автоматизация отдела продаж: пошаговый план
- [ ] Статья: Интеграция CRM с Telegram: зачем и как
- [ ] Статья: Автоматизация документооборота: примеры и инструменты
- [ ] Статья: Роботизация бизнес-процессов: с чего начать

### Статьи: Python (кластер E, ★★) — ✅ Wordstat (10 запросов, 223 показов/мес)
- [ ] Статья: Python для автоматизации бизнеса: примеры
- [ ] Статья: FastAPI: почему это лучший выбор для API
- [ ] Статья: Python скрипты для бизнеса: 10 полезных примеров
- [ ] Статья: Django vs FastAPI: что выбрать для проекта

### Статьи: Next.js (кластер F, ★★) — ✅ Wordstat (1 запрос, 44 показов/мес) — мало данных!
- [ ] Статья: Почему Next.js лучше React для коммерческих проектов
- [ ] Статья: Next.js vs Nuxt.js: сравнение фреймворков
- [ ] Статья: Когда нужен SSR: примеры из практики

### Статьи: AI (кластер G, ★★) — ✅ Wordstat (7 запросов, 606 показов/мес)
- [ ] Статья: Как внедрить ChatGPT в бизнес-процессы
- [ ] Статья: AI агенты: что это и кому нужно
- [ ] Статья: Нейросети для бизнеса: реальные примеры автоматизации
- [ ] Статья: GPT интеграция с Telegram ботом: как сделать

### Статьи: API (кластер H, ★) — ❌ Нет данных Wordstat
- [ ] Статья: Что такое API и зачем оно бизнесу
- [ ] Статья: Интеграция API с сайтом: пошаговое руководство
- [ ] Статья: REST API vs GraphQL: что выбрать

### Статьи: Веб-разработка (кластер I, ★) — ❌ Нет данных Wordstat
- [ ] Статья: Сколько стоит создание сайта в 2025 году
- [ ] Статья: Лендинг или многостраничный сайт: что выбрать
- [ ] Статья: SaaS разработка: с чего начать

---

## 🟠 Фаза 2.5: Интеграция кейсов из портфолио (Неделя 4-5)

> Маппинг работ → статьи/страницы: [`PLAN_SEO/WORKS-MAP.md`](WORKS-MAP.md)
> Цель: повысить E-E-A-T и конверсию за счёт реальных кейсов с цифрами

### Вставка кейсов в коммерческие страницы
- [ ] Вставить 3-5 кейсов на /razrabotka-botov (sapis_cllientov, leads_from_telegram, yoga_tg, vet_tg, kz_posolstvo)
- [ ] Вставить 3-5 кейсов на /avtomatizaciya-biznesa (bosslike, seo_booster, documents_google, django_tan, avito_payments)
- [ ] Вставить 2-3 кейса на /razrabotka-crm (django_tan, rab_dom, sapis_cllientov)
- [ ] Вставить 2-3 кейса на /razrabotka-servisov (documents_google, django_tan, next_js_django)
- [ ] Вставить 3-5 кейсов на /parsery-marketplejsov (новая: seo_wb_tg, wb_limits_tg, statistic_marketplace_tg, business_ozon, django_push_price)
- [ ] Вставить 3-4 кейса на /lidogeneraciya-telegram (новая: leads_from_telegram, people_pars, support_tg, referal_agent)
- [ ] Вставить 3-4 кейса на /ai-avtomatizaca (новая: chat_gpt_tg, chatgpt_goroskop, neiro_hair, neirocommenting)
- [ ] Вставить 2-3 кейса на /python-razrabotka (новая: fastapi_nextjs_markets, django_push_price, aggregator_django)
- [ ] Вставить 2-3 кейса на /nextjs-razrabotka (новая: next_js_django, next_js_cinema, fastapi_nextjs_markets)
- [ ] Вставить 2-3 кейса на /razrabotka-api (новая: fastapi_nextjs_markets, documents_google, oxprotocol)

### Вставка кейсов в статьи кластера A: Telegram-боты
- [ ] «Сколько стоит разработка Telegram бота» → sapis_cllientov, yoga_tg, leads_from_telegram
- [ ] «Telegram бот для магазина» → auto_market_tg, business_ozon, avito_payments
- [ ] «Telegram бот для записи клиентов» → sapis_cllientov, vet_tg, yoga_tg
- [ ] «Telegram бот для приёма заказов» → avito_payments, auto_market_tg, business_ozon
- [ ] «Telegram бот vs мобильное приложение» → next_js_django, next_js_cinema, sapis_cllientov
- [ ] «Как Telegram бот увеличивает продажи» → yoga_tg, kz_posolstvo, auto_approve_tg, chatgpt_goroskop
- [ ] «Telegram Mini App» → next_js_django, next_js_cinema, fastapi_nextjs_markets
- [ ] «Aiogram vs pyrogram» → sapis_cllientov, leads_from_telegram, university_tg

### Вставка кейсов в статьи кластера B: Парсинг маркетплейсов
- [ ] «Парсер Wildberries» → seo_wb_tg, wb_limits_tg, django_push_price
- [ ] «Парсер Ozon» → business_ozon, statistic_marketplace_tg, auto_market_tg
- [ ] «Парсер Avito» → avito_payments, auto_de, people_pars
- [ ] «Мониторинг цен на маркетплейсах» → django_push_price, aliexpress_get, sima_land_tg
- [ ] «Repricer для Wildberries» → django_push_price, seo_wb_tg, wb_limits_tg
- [ ] «API Wildberries для продавцов» → seo_wb_tg, wb_limits_tg, auto_market_tg
- [ ] «Как анализировать конкурентов на маркетплейсах» → statistic_marketplace_tg, business_ozon, auto_market_tg

### Вставка кейсов в статьи кластера C: Лидогенерация
- [ ] «Как искать клиентов в Telegram» → leads_from_telegram, people_pars, referal_agent
- [ ] «Сбор контактов в Telegram» → people_pars, leads_from_telegram, support_tg
- [ ] «Лидогенерация через Telegram-бота» → leads_from_telegram, sapis_cllientov, yoga_tg
- [ ] «Мониторинг Telegram каналов» → leads_from_telegram, people_pars, neirocommenting
- [ ] «База клиентов из Telegram» → people_pars, leads_from_telegram, referal_agent

### Вставка кейсов в статьи кластера D: Автоматизация бизнеса
- [ ] «Что можно автоматизировать в малом бизнесе» → sapis_cllientov, avito_payments, bosslike, seo_booster
- [ ] «Автоматизация отдела продаж» → leads_from_telegram, auto_approve_tg, chat_gpt_tg
- [ ] «Интеграция CRM с Telegram» → sapis_cllientov, university_tg, django_tan
- [ ] «Автоматизация документооборота» → documents_google, django_tan, rab_dom
- [ ] «Роботизация бизнес-процессов» → bosslike, seo_booster, auto_market_tg, sberbank_tg

### Вставка кейсов в статьи кластера E: Python
- [ ] «Python для автоматизации бизнеса» → fastapi_nextjs_markets, django_push_price, auto_de
- [ ] «FastAPI: почему это лучший выбор для API» → fastapi_nextjs_markets, oxprotocol, bankless
- [ ] «Python скрипты для бизнеса: 10 примеров» → ran_higs, aliexpress_get, auto_de, replace_content
- [ ] «Django vs FastAPI» → django_tan, aggregator_django, fastapi_nextjs_markets

### Вставка кейсов в статьи кластера F: Next.js
- [ ] «Почему Next.js лучше React» → next_js_django, next_js_cinema, fastapi_nextjs_markets
- [ ] «Next.js vs Nuxt.js» → next_js_django, next_js_cinema, wp_dubay
- [ ] «Когда нужен SSR» → next_js_django, next_js_cinema, fastapi_nextjs_markets

### Вставка кейсов в статьи кластера G: AI
- [ ] «Как внедрить ChatGPT в бизнес-процессы» → chatgpt_goroskop, chat_gpt_tg, psyho_tg
- [ ] «AI агенты: что это и кому нужно» → chat_gpt_tg, neirocommenting, replace_content
- [ ] «Нейросети для бизнеса: реальные примеры» → neiro_hair, chatgpt_goroskop, oxprotocol, bankless
- [ ] «GPT интеграция с Telegram ботом» → chatgpt_goroskop, psyho_tg, chat_gpt_tg

### Вставка кейсов в статьи кластера H: API
- [ ] «Что такое API и зачем оно бизнесу» → fastapi_nextjs_markets, documents_google, auto_market_tg
- [ ] «Интеграция API с сайтом» → documents_google, fastapi_nextjs_markets, oxprotocol
- [ ] «REST API vs GraphQL» → fastapi_nextjs_markets, oxprotocol, bankless

### Вставка кейсов в статьи кластера I: Веб-разработка
- [ ] «Сколько стоит создание сайта в 2025 году» → next_js_django, next_js_cinema, django_tan, wp_dubay
- [ ] «Лендинг или многостраничный сайт» → django_tan, next_js_django, rab_dom
- [ ] «SaaS разработка: с чего начать» → fastapi_nextjs_markets, next_js_django, statistic_marketplace_tg

### SEO-оптимизация страниц работ /work/{slug}
- [ ] Добавить title/description на каждую страницу /work/{slug}
- [ ] Добавить внутренние ссылки со страниц работ на коммерческие страницы (2-3 ссылки на каждую)
- [ ] Добавить breadcrumbs на страницы работ
- [ ] Добавить блок «Похожие услуги» в конец каждой страницы работы
- [ ] Добавить Schema.org разметку (CreativeWork) на страницы работ

---

## 🟢 Фаза 3: Оптимизация и рост (Месяц 2-3)

### Перелинковка
- [x] ~~Проставить внутренние ссылки между всеми статьями Telegram-ботов~~ ✅ 03.08.2026: перелинковка 23 статей кластера A, 36 text part файлов обновлено
- [ ] Проставить внутренние ссылки между статьями парсинга
- [ ] Проставить внутренние ссылки между статьями лидогенерации
- [ ] Связать все статьи с коммерческими страницами
- [ ] Добавить блок "Рекомендуемые статьи" в конец каждой статьи

### Оптимизация конверсии
- [ ] Добавить CTA-кнопки на все страницы (заказать услугу)
- [ ] Добавить виджет Telegram на все страницы
- [ ] Добавить блок "Гарантии" на коммерческие страницы
- [ ] Добавить отзывы/кейсы на коммерческие страницы
- [ ] Добавить калькулятор стоимости (quiz/form)

### Контент-маркетинг
- [ ] Адаптировать статьи для Яндекс.Дзен
- [ ] Создать карточки для соцсетей из статей
- [ ] Написать 5 гостевых статей с ссылками на сайт

---

## 📊 Статистика

| Метрика | Значение |
|---------|----------|
| Всего задач | ~145 |
| Фаза 1 (фундамент) | ~17 |
| Фаза 2 (контент) | ~47 |
| Фаза 2.5 (интеграция кейсов) | ~50 |
| Фаза 3 (оптимизация) | ~15 |
| Создано страниц (сейчас) | 28 |
| Нужно создать | ~63 |

---

## 📝 Лог выполнения

> RooCode: после выполнения задачи добавляй запись сюда

| Дата | Задача | Статус | Комментарий |
|------|--------|--------|-------------|
| 01.08.2026 | Верификация семантики через Wordstat | ✅ | 7 файлов Wordstat (966 запросов) → очищено 145 запросов, 39 630 показов/мес. Создан CLEAN_ALL.md, обновлены 01-SEMANTIC-CORE.md и ROO-TASKS.md |
| 01.08.2026 | Создание CLEAN_ALL.md | ✅ | Очищенный сводный файл с данными Wordstat по 7 кластерам |
| 01.08.2026 | Обновление 01-SEMANTIC-CORE.md | ✅ | Заменены оценочные данные на реальные Wordstat. Добавлены кластеры CRM (13 запросов), AI (7 запросов) |
| 01.08.2026 | Технический SEO-аудит | ✅ | Исправлены мета-теги на 5 страницах, добавлен Schema.org, OG, canonical, создана 404 |
| 01.08.2026 | Страница /parsery-marketplejsov | ✅ | Лендинг с 7 кейсами, FAQ, Schema.org Service + FAQPage |
| 01.08.2026 | Страница /lidogeneraciya-telegram | ✅ | Лендинг с 4 кейсами, FAQ, Schema.org Service + FAQPage |
| 01.08.2026 | WORDSTAT-RULES.md создан | ✅ | Правило: все статьи ТОЛЬКО на основе верифицированных данных |
| 01.08.2026 | ROO-TASKS обновлён | ✅ | Добавлено разделение на задачи с Wordstat и без |
| 02.08.2026 | Прогон статьи: ai-avtomatizaciya-biznesa | ✅ | Заменены 2 выдуманных кейса на реальные (chat_gpt_tg ROI 520%, chatgpt_goroskop ROI 400%). Добавлены 3 :::conversion, 1 :::readmore. Обновлены внутренние ссылки и metaDescription |
| 02.08.2026 | Прогон статьи: avtomatizaciya-otdela-prodazh | ✅ | Рефакторинг на импорт text parts. 3 реальных кейса (leads_from_telegram ROI 500%, auto_approve_tg ROI 450%, chat_gpt_tg ROI 520%). Убраны 2 выдуманных кейса. 2 :::conversion + 1 :::readmore. 9 внутренних ссылок. 12 H2 секций. metaDescription 155 символов |
| 02.08.2026 | Прогон статьи: avtomatizaciya-biznesa-pod-klyuch | ✅ | Добавлены 3 реальных кейса (sapis_cllientov ROI 300%, avito_payments ROI 520%, documents_google ROI 380%) с /work/ ссылками. 2 доп. кейса в тексте (bosslike, seo_booster). 2 :::conversion + 1 :::readmore. 8 внутренних ссылок. Новая секция real-cases. structuredData FAQ 6 вопросов. metaDescription 155 символов |
| 02.08.2026 | Прогон статьи: crm-dlya-malogo-biznesa | ✅ | Рефакторинг на импорт text parts. Заменён кейс university_tg на rab_dom (ROI 380%). 3 таблицы. 2 :::conversion + 1 :::readmore. 9 H2 секций. 8 внутренних ссылок. metaDescription 155 символов |
| 02.08.2026 | Прогон статьи: razrabotka-crm-pod-klyuch | ✅ | Рефакторинг на импорт text parts. Заменён кейс sapis_cllientov на documents_google (ROI 380%). 4 таблицы. 2 :::conversion + 1 :::readmore. 9 H2 секций. 8 внутренних ссылок. metaDescription 160 символов |
| 02.08.2026 | Прогон статьи: kak-vnedrit-chatgpt-v-biznes | ✅ | Рефакторинг на импорт text parts. 3 таблицы. 2 :::conversion + 1 :::readmore. 9 H2 секций. 8 внутренних ссылок. metaDescription 160 символов |
| 02.08.2026 | Прогон статьи: nejroseti-dlya-biznesa | ✅ | Рефакторинг на импорт text parts. 3 таблицы. 2 :::conversion + 1 :::readmore. 8 H2 секций. 8 внутренних ссылок. metaDescription 160 символов |
| 02.08.2026 | Прогон статьи: ai-agenty-dlya-biznesa | ✅ | Рефакторинг на импорт text parts. 5 таблиц. 2 :::conversion + 1 :::readmore. 9 H2 секций. 8 внутренних ссылок. metaDescription 160 символов |
| 03.08.2026 | Text parts для 23 статей кластера A | ✅ | Создано 46 text part файлов в data/articles_data/texts/ |
| 03.08.2026 | Перелинковка кластера A (23 статьи) | ✅ | 36 text part файлов обновлено, добавлены ссылки на money page, соседние статьи, кросс-кластерные ссылки, readmore и conversion блоки |
| 03.08.2026 | Проверка на CJK символы | ✅ | 225 файлов проверено, проблемы не найдены |
| 03.08.2026 | Актуализация ROO-TASKS.md — кластер A | ✅ | 23 статьи кластера A отмечены как выполненные, добавлены 4 задачи на непокрытые запросы ★★★, обновлена перелинковка, добавлен лог |
| 03.08.2026 | Аудит Фазы 1: Техническая оптимизация | ✅ | Проверены ВСЕ мета-теги, OG, canonical, Schema.org, alt, 404 — всё уже есть. Найдены 2 проблемы: login/register без noindex, нет визуальных breadcrumbs на коммерческих лендингах |
| 03.08.2026 | noindex на /login и /register | ✅ | Добавлен `<meta name="robots" content="noindex, nofollow">` + title на обе страницы |
| 03.08.2026 | Визуальные breadcrumbs на коммерческих лендингах | ✅ | Создан компонент `Breadcrumbs` (app/Components/Landing/Breadcrumbs/), добавлен на 10 лендингов: razrabotka-botov, razrabotka-crm, razrabotka-servisov, avtomatizaciya-biznesa, parsery-marketplejsov, lidogeneraciya-telegram, razrabotka-api, python-razrabotka, nextjs-razrabotka, ai-integracii. Плюс WorkPage и Category |