# Архитектура сайта как граф (Topic Cluster Model)

> Стратегия построения сайта для максимального SEO-трафика и конверсии.
> Дата: Август 2026
> Сайт: https://dima-razrab.com

---

## 1. Модель: Сайт как топический граф

Поисковые системы (Google, Яндекс) оценивают не отдельные страницы, а **тематическую глубину сайта**. Сайт, где 8-15 статей раскрывают одну тему с разных сторон, получает **Topical Authority** — статус эксперта в данной области.

### Три типа узлов графа

```
┌─────────────────────────────────────────────────────────────┐
│                     MONEY PAGE (Landing)                     │
│  /python-razrabotka, /razrabotka-botov, /parsery-marketplejsov │
│  Коммерческая страница с CTA, ценами, формой заявки          │
│  Цель: конверсия в заявку                                    │
└────────────────────────┬────────────────────────────────────┘
                         │ все статьи кластера ссылаются сюда
┌────────────────────────┴────────────────────────────────────┐
│                     HUB PAGE (Cluster Hub)                   │
│  /blog/python-razrabotka, /blog/avtomatizaciya-biznesa       │
│  Обзорная страница кластера со списком всех статей           │
│  Schema.org: CollectionPage, BreadcrumbList                  │
│  Цель: установить тематическую иерархию                      │
└────────────────────────┬────────────────────────────────────┘
                         │ хаб ссылается на статьи и обратно
┌────────────────────────┴────────────────────────────────────┐
│                     SPOKE ARTICLES (Deep Content)            │
│  /blog/python-razrabotka-pod-klyuch                          │
│  /blog/fastapi-razrabotka                                    │
│  /blog/python-avtomatizaciya-biznesa                         │
│  Глубокие статьи 8000+ символов с кейсами и таблицами        │
│  Schema.org: Article, FAQPage                                │
│  Цель: занять позиции по длинным запросам, передать вес      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Связи между узлами (рёбра графа)

### 2.1. Spoke → Money Page (2-3 ссылки на статью)

Каждая статья кластера ссылается на свою Money Page через `internalLinks`:

```typescript
internalLinks: [
    { anchor: "заказать Python-разработку", url: "/python-razrabotka", context: "..." },
    { anchor: "разработка API на Python", url: "/razrabotka-api", context: "..." },
]
```

**Эффект:** PageRank от 8 статей концентрируется на Money Page → рост позиций коммерческой страницы.

### 2.2. Spoke ↔ Hub (взаимные ссылки)

- Hub Page перечисляет все статьи кластера с краткими описаниями
- Каждая статья ссылается на Hub Page (хлебные крошки, навигация)

**Эффект:** Hub Page получает вес от всех spoke-статей → растёт авторитет кластера.

### 2.3. Spoke → Spoke (внутри кластера, 2-3 ссылки)

Статьи одного кластера ссылаются друг на друга контекстуально:

```markdown
Подробнее о [мониторинге цен на маркетплейсах](/blog/monitoring-cen-marketplejsov).
```

**Эффект:** Усиливает тематическую связность, помогает поисковику понять глубину экспертизы.

### 2.4. Cross-cluster links (1-2 ссылки на статью)

Статьи **разных** кластеров ссылаются друг на друга:

```markdown
# В статье Python-кластера:
Для автоматизации бизнеса можно использовать [Telegram-бота](/blog/telegram-bot-dlya-biznesa).

# В статье парсеров:
Парсер легко написать на [Python](/blog/python-razrabotka-pod-klyuch).
```

**Эффект:** Создаёт связный граф сайта → поисковик видит экспертизу во всех связанных темах → рост Trust.

---

## 3. Текущие кластеры сайта

| # | Кластер | Hub Page URL | Money Page(s) | Кол-во статей |
|---|---------|-------------|---------------|---------------|
| 1 | Telegram боты | `/blog/telegram-boty` | `/razrabotka-botov` | 20+ |
| 2 | Автоматизация бизнеса | `/blog/avtomatizaciya-biznesa` | `/avtomatizaciya-biznesa` | 8+ |
| 3 | Парсинг маркетплейсов | `/blog/parsery-marketplejsov` | `/parsery-marketplejsov` | 7 |
| 4 | Лидогенерация Telegram | `/blog/lidogeneraciya-telegram` | `/lidogeneraciya-telegram` | 3+ |
| 5 | API интеграции | `/blog/razrabotka-api` | `/razrabotka-api` | 5 |
| 6 | AI интеграции | `/blog/ai-integracii` | `/ai-integracii` | 6 |
| 7 | **Python разработка** | `/blog/python-razrabotka` | `/python-razrabotka` | **8 (создаём)** |
| 8 | Next.js разработка | `/blog/nextjs-razrabotka` | `/nextjs-razrabotka` | в планах |

### Суперхаб: /blog

Главная страница блога ([`pages/blog/index.tsx`](pages/blog/index.tsx)) — суперхаб, который связывает все кластеры:

```
/blog (Super Hub)
  ├── /blog/telegram-boty (Hub 1)
  │     ├── /blog/telegram-bot-dlya-biznesa (Spoke)
  │     ├── /blog/stoimost-telegram-bota (Spoke)
  │     └── ...
  ├── /blog/avtomatizaciya-biznesa (Hub 2)
  │     ├── /blog/ai-avtomatizaciya-biznesa (Spoke)
  │     └── ...
  ├── /blog/parsery-marketplejsov (Hub 3)
  │     ├── /blog/parser-wildberries (Spoke)
  │     └── ...
  └── /blog/python-razrabotka (Hub 7)
        ├── /blog/python-razrabotka-pod-klyuch (Spoke)
        ├── /blog/fastapi-razrabotka (Spoke)
        └── ...
```

---

## 4. Организация файлов pages/

### 4.1. Текущая структура (не раздувается)

```
pages/
├── _app.tsx                    # Общий App
├── _document.tsx               # Document
├── 404.tsx                     # 404
├── index.tsx                   # Главная
├── login.tsx                   # Авторизация
├── register.tsx                # Регистрация
├── privacy.tsx                 # Политика
│
├── python-razrabotka.tsx       # Money Page (Landing)
├── razrabotka-botov.tsx        # Money Page (Landing)
├── razrabotka-api.tsx          # Money Page (Landing)
├── parsery-marketplejsov.tsx   # Money Page (Landing)
├── avtomatizaciya-biznesa.tsx  # Money Page (Landing)
├── ai-integracii.tsx           # Money Page (Landing)
├── nextjs-razrabotka.tsx       # Money Page (Landing)
├── razrabotka-crm.tsx          # Money Page (Landing)
├── razrabotka-servisov.tsx     # Money Page (Landing)
├── lidogeneraciya-telegram.tsx # Money Page (Landing)
│
├── blog/
│   ├── index.tsx               # Super Hub (/blog)
│   ├── [slug].tsx              # Динамический роут для ВСЕХ статей
│   ├── telegram-boty.tsx       # Hub Page кластера 1
│   ├── avtomatizaciya-biznesa.tsx  # Hub Page кластера 2
│   ├── parsery-marketplejsov.tsx   # Hub Page кластера 3
│   ├── lidogeneraciya-telegram.tsx # Hub Page кластера 4
│   ├── razrabotka-api.tsx      # Hub Page кластера 5
│   ├── ai-integracii.tsx       # Hub Page кластера 6
│   └── python-razrabotka.tsx   # Hub Page кластера 7
│
├── category/
│   └── [slug].tsx              # Категории (если нужны)
│
└── work/
    └── [slug].tsx              # Кейсы из портфолио
```

### 4.2. Почему НЕ раздувается

- **Статьи** — через `[slug].tsx`, один файл на все статьи
- **Money Pages** — по 1 файлу на услугу (~10-15 файлов на весь сайт)
- **Hub Pages** — по 1 файлу на кластер (~10-15 файлов на весь сайт)
- **Итого:** ~30-40 файлов в pages/ даже при 100+ статьях

### 4.3. Когда масштабировать

Когда хаб-страниц станет 15+, можно перейти на динамический роут:

```
pages/blog/
├── index.tsx
├── [slug].tsx          # Статьи (уже есть)
└── [cluster].tsx       # Хабы (вместо отдельных файлов)
```

Данные для хабов — в конфигурационном файле:

```typescript
// data/cluster-config.ts
export const clusterConfig = {
    'python-razrabotka': {
        title: 'Python-разработка',
        articles: ['python-razrabotka-pod-klyuch', 'fastapi-razrabotka', ...],
        moneyPage: '/python-razrabotka',
    },
    // ...
};
```

**Пока не нужно** — текущая архитектура масштабируется до 50+ кластеров без проблем.

---

## 5. Стратегия перелинковки для максимального SEO

### 5.1. Правила

1. **Каждая статья** → 2-3 ссылки на Money Page кластера (с ключевыми анкорами)
2. **Каждая статья** → 2-3 ссылки на соседние статьи кластера (контекстуальные)
3. **Каждая статья** → 1-2 кросс-ссылки на статьи ДРУГИХ кластеров
4. **Итого:** 5-8 внутренних ссылок на статью
5. **Анкоры** — ключевые фразы, не «тут»/«здесь»

### 5.2. Кросс-связи между кластерами

```
Python ←→ Парсеры (парсинг на Python)
Python ←→ Telegram боты (боты на Python)
Python ←→ API (FastAPI, Django REST)
Python ←→ AI (интеграция нейросетей)
Python ←→ Автоматизация (скрипты автоматизации)
Telegram боты ←→ Автоматизация (боты для автоматизации)
Telegram боты ←→ Лидогенерация (поиск клиентов через ботов)
Парсеры ←→ Автоматизация (автоматический сбор данных)
AI ←→ Автоматизация (AI-автоматизация процессов)
```

### 5.3. Эффект перелинковки

| Метрика | До перелинковки | После полной перелинковки |
|---------|----------------|--------------------------|
| Индексация страниц | 60-70% | 95-100% |
| Позиции Money Pages | ТОП-20-50 | ТОП-5-15 |
| Время на сайте | 1-2 мин | 3-5 мин |
| Глубина просмотра | 1.5 стр | 3-4 стр |
| Конверсия в заявку | 1-2% | 3-5% |

---

## 6. Schema.org и структурированные данные

### 6.1. На каждой странице

| Тип Schema | Где | Зачем |
|------------|-----|-------|
| `Article` | Каждая статья | Расширенный сниппет в поиске |
| `FAQPage` | Каждая статья (FAQ блок) | FAQ-сниппет в Яндекс/Google |
| `BreadcrumbList` | Все страницы | Хлебные крошки в поиске |
| `CollectionPage` | Hub Pages | Показывает тематическую структуру |
| `HowTo` | Пошаговые статьи | HowTo-сниппет |
| `WebSite` | Главная | Sitelinks, поиск по сайту |

### 6.2. Реализация

- `makeArticleSchema()` — в [`data/articles_data/types.ts`](data/articles_data/types.ts:75)
- BreadcrumbList — автоматически из URL
- FAQPage — из массива `faq` в доменном файле
- CollectionPage — в хаб-страницах вручную

---

## 7. Ключевые метрики для отслеживания

| Метрика | Целевое значение | Инструмент |
|---------|-----------------|------------|
| Проиндексированные страницы | 100% | Яндекс.Вебмастер, Google Search Console |
| Позиции Money Pages | ТОП-10 по ключевым запросам | Serpstat, Ahrefs |
| Органический трафик | +50% за 3 месяца после публикации кластера | Яндекс.Метрика |
| Глубина просмотра | 3+ страницы за сессию | Яндекс.Метрика |
| Конверсия в заявку | 3-5% с Money Pages | Яндекс.Метрика, цели |
| Bounce Rate | < 50% на статьях | Яндекс.Метрика |
| Время на сайте | > 3 минут на статьях | Яндекс.Метрика |

---

## 8. Порядок создания кластеров

1. ✅ Cluster 1: Telegram боты (20+ статей)
2. ✅ Cluster 2: Автоматизация бизнеса (8 статей)
3. ✅ Cluster 3: Парсинг маркетплейсов (7 статей)
4. ✅ Cluster 4: Лидогенерация Telegram (3 статей)
5. ✅ Cluster 5: API интеграции (5 статей)
6. ✅ Cluster 6: AI интеграции (6 статей)
7. 🔄 **Cluster 7: Python разработка (8 статей)** ← текущая задача
8. 📋 Cluster 8: Next.js разработка (в планах)

### После создания каждого кластера:

1. Создать доменные файлы + part1 + part2
2. Создать registry.ts для кластера
3. Подключить в общий [`data/articles_data/registry.ts`](data/articles_data/registry.ts)
4. Обновить hub page с реальными статьями (вместо plannedArticles)
5. Добавить кластер в суперхаб [`pages/blog/index.tsx`](pages/blog/index.tsx)
6. Добавить кросс-ссылки в существующие статьи соседних кластеров
7. Отправить на индексацию в Яндекс.Вебмастер

---

*Документ создан: Август 2026. Использовать как основу архитектуры при добавлении новых кластеров.*
