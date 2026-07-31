Я бы предложил совсем другой подход.

Не «100 статей», а:

10 сильных страниц услуг (каждая оптимизирована под коммерческие запросы);
5–10 больших хабов по основным направлениям;
50–100 поддерживающих статей, каждая связана с одним из хабов и одной услугой;
20–30 кейсов с реальными задачами и решениями;
грамотная внутренняя перелинковка между всем этим.

Это уже похоже не на блог, а на тематический ресурс, который поисковые системы начинают воспринимать как авторитетный.


# Цель на 3-5 дет
8–12 коммерческих страниц (услуги);
15–25 хабов по крупным направлениям;
80–150 локомотивных статей;
200–400 поддерживающих статей;
30–50 кейсов;
FAQ, глоссарий и страницы сравнения.

# Инструкция по созданию SEO-статей и кластеров

> Руководство для создания новых SEO-кластеров, статей и hub-страниц.
> Основано на реальном опыте и лучших практиках проекта DimaRazrab.

---

## 1. Архитектура SEO-кластера

### Структура кластера

```
        /blog/[hub-slug]  ← HUB-СТРАНИЦА (агрегатор темы)
                    ↑ ссылки на все статьи
    ┌───────────────┼───────────────┬───────────────┐
    │               │               │               │
 /blog/          /blog/          /blog/          /blog/
 статья-1        статья-2        статья-3        статья-4
 (локомотив)     (локомотив)     (локомотив)     (спутник)
 Ч: 300+         Ч: 200+         Ч: 150+         Ч: 70+
    │               │               │               │
    └───────────────┴───────┬───────┴───────────────┘
                            │
                    /blog/статья-5
                    (спутник, Ч: 60+)
                            │
                    MONEY PAGE
                    (коммерческая страница)
```

### Роли страниц

| Роль | Описание | Приоритет в sitemap |
|------|----------|-------------------|
| **Money Page** | Коммерческая страница с формой заявки | 0.8-0.9 |
| **Hub Page** | Агрегатор темы со ссылками на все статьи | 0.9 |
| **Локомотив** | Статья с высокой частотностью (150+) | 0.8 |
| **Спутник** | Статья с нишевой частотностью (60-150) | 0.7 |

### Правило перелинковки

1. **Каждая статья → 2-3 соседние статьи** того же кластера
2. **Каждая статья → money page** (коммерческая страница)
3. **Каждая статья → 1-2 статьи** другого кластера (cross-link)
4. **Hub → все статьи** кластера + money page + ссылка на другой hub

---

## 2. Структура файлов

### Для каждого кластера

```
data/articles_data/clusterN/
├── registry.ts                          # Реестр статей кластера
├── [slug-1].ts                          # Доменная логика статьи 1
├── [slug-2].ts                          # Доменная логика статьи 2
└── texts/
    ├── [slug-1]-part1.ts                # Секции 1-6 статьи 1
    ├── [slug-1]-part2.ts                # Секции 7-12 статьи 1
    ├── [slug-2]-part1.ts                # Секции 1-6 статьи 2
    └── [slug-2]-part2.ts                # Секции 7-12 статьи 2
```

### Hub-страница

```
pages/blog/[hub-slug].tsx                # Hub-страница кластера
```

### Регистрация

```
data/articles_data/registry.ts           # Основной реестр (импортирует clusterN/registry.ts)
data/articles.ts                         # Переэкспорт типов и функций
```

---

## 3. Доменный файл статьи (`[slug].ts`)

### Структура

```typescript
import { Article, makeArticleSchema } from '../types';
import { slugPart1 } from './texts/slug-part1';
import { slugPart2 } from './texts/slug-part2';

const SITE_URL = 'https://dima-razrab.com';

export const articleSlugName: Article = {
    // ═══════ МЕТАДАННЫЕ ═══════
    slug: "url-slug-stati",
    title: "Заголовок для title: описание 2026 | DimaRazrab",
    metaDescription: "Описание 150-160 символов с ключевыми словами.",
    keywords: "ключ1, ключ2, ключ3, ключ4, ключ5, ключ6, ключ7, ключ8",
    h1: "Полный заголовок H1 статьи",
    ogTitle: "Заголовок для соцсетей (короче)",
    ogDescription: "Описание для соцсетей (1-2 предложения).",
    canonical: `${SITE_URL}/blog/url-slug-stati`,
    heroBadge: "🏷️ Категория • Тип • 2026",
    heroSubtitle: "Подзаголовок: краткое описание того, что узнает читатель.",
    readingTime: "20 мин чтения",
    wordCount: "~8000 слов",
    publishDate: "2026-07-30",
    modifiedDate: "2026-07-30",
    author: "Дмитрий Малышев",

    // ═══════ ОГЛАВЛЕНИЕ (TOC) ═══════
    toc: [
        { id: "section-id-1", title: "Короткий заголовок для ToC" },
        { id: "section-id-2", title: "Короткий заголовок для ToC" },
        // ... 10-12 пунктов
    ],

    // ═══════ СЕКЦИИ (импортируются из texts/) ═══════
    sections: [...slugPart1, ...slugPart2],

    // ═══════ FAQ (5-6 вопросов) ═══════
    faq: [
        {
            question: "Вопрос на естественном языке?",
            answer: "Краткий, ёмкий ответ (2-3 предложения).",
        },
        // ... 5-6 вопросов
    ],

    // ═══════ CTA ═══════
    ctaTitle: "Готовы [действие]?",
    ctaSubtitle: "Бесплатная консультация — [преимущество]",
    ctaSource: "article-slug-cta",

    // ═══════ HOWTO STEPS (для пошаговых статей) ═══════
    howToSteps: [
        { name: "Шаг 1: Название", text: "Краткое описание шага." },
        { name: "Шаг 2: Название", text: "Краткое описание шага." },
        // ... 4-7 шагов
    ],

    // ═══════ STRUCTURED DATA ═══════
    structuredData: makeArticleSchema(
        "url-slug-stati",
        "Полный заголовок H1",
        "Meta description",
        "2026-07-30",  // publishDate
        "2026-07-30",  // modifiedDate
        [
            { name: "Вопрос 1?", text: "Ответ 1" },
            { name: "Вопрос 2?", text: "Ответ 2" },
            // ... 4-6 вопросов (дублируют faq)
        ],
        8000,  // wordCount
        [      // howToSteps (опционально)
            { name: "Шаг 1", text: "Описание" },
            { name: "Шаг 2", text: "Описание" },
        ],
    ),

    // ═══════ ВНУТРЕННИЕ ССЫЛКИ ═══════
    internalLinks: [
        { anchor: "ключевая фраза для money page", url: "/money-page", context: "Призыв к действию" },
        { anchor: "ключевая фраза статьи кластера", url: "/blog/slug-sosedney-stati", context: "Контекст ссылки" },
        { anchor: "ключевая фраза другого кластера", url: "/blog/slug-drugoy-stati", context: "Контекст ссылки" },
    ],
};
```

---

## 4. Текстовые файлы (`texts/[slug]-partN.ts`)

### Структура

```typescript
import { ArticleSection } from '../../types';

/* ============================================================
   Статья: Название статьи
   Часть N/M: Секции X-Y
   ============================================================ */

export const slugPartN: ArticleSection[] = [
    {
        id: "section-id",           // Совпадает с toc.id
        title: "Заголовок H2 секции",
        content: `Основной текст секции.

Много текста с конкретными цифрами, примерами, кейсами.

**Жирный текст** для акцентов.

- Пункт 1
- Пункт 2
- Пункт 3

| Заголовок | Заголовок |
|-----------|-----------|
| Данные    | Данные    |`,

        // Подсекции (опционально)
        subsections: [
            {
                title: "Заголовок H3 подсекции",
                content: `Текст подсекции.`,
            },
        ],
    },
    // ... ещё секции
];
```

### Правила контента

- **Объём:** 7000-8000 слов на статью (по 600-800 слов на секцию)
- **10-12 секций** на статью
- **Конкретные цифры:** цены, сроки, ROI, проценты
- **Реальные кейсы:** «До/после» с бизнесом
- **Таблицы:** сравнение инструментов, расценок
- **Маркированные списки:** для перечислений
- **Подзаголовки H3:** в subsections для структуры
- **Год:** всегда текущий (2026), не 2025!
- **Язык:** русский, без китайских символов!
- **Тон:** экспертный, но понятный «как для ребёнка»

---

## 5. Hub-страница (`pages/blog/[hub-slug].tsx`)

### Обязательные элементы

1. **SEO Head:** title, description, keywords, OG, canonical, JSON-LD (CollectionPage + BreadcrumbList)
2. **Hero секция:** H1, подзаголовок, breadcrumbs
3. **SEO-вступление:** ~500 слов о теме кластера
4. **Кнопка PortfolioPopup:** «Посмотреть мои работы»
5. **Сетка карточек статей:** все статьи кластера с превью
6. **CTA блок:** ссылка на money page
7. **Footer:** навигация + ссылки на статьи кластера + ссылка на другой hub

### Schema.org для hub

```typescript
const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "CollectionPage", ... },
        { "@type": "WebSite", ... },
        { "@type": "BreadcrumbList", ... },
    ],
};
```

---

## 6. Регистрация кластера

### clusterN/registry.ts

```typescript
import { Article } from '../types';
import { articleSlug1 } from './slug-1';
import { articleSlug2 } from './slug-2';

export const clusterNArticles: Article[] = [
    articleSlug1,
    articleSlug2,
];
```

### Основной registry.ts

```typescript
import { clusterNArticles } from './clusterN/registry';

export const articles: Article[] = [
    /* Cluster 1: Telegram боты */
    ...cluster1Articles,
    /* Cluster N: Название кластера */
    ...clusterNArticles,
];
```

---

## 7. Schema.org — что генерируется автоматически

| Schema | Где генерируется | Для каких страниц |
|--------|-----------------|-------------------|
| **Article** | `makeArticleSchema()` | Все статьи |
| **FAQPage** | `makeArticleSchema()` | Все статьи |
| **BreadcrumbList** | `makeArticleSchema()` | Все статьи |
| **HowTo** | `makeArticleSchema()` (8-й параметр) | Статьи с пошаговыми планами |
| **CollectionPage** | Hub-страница (вручную) | Hub-страницы |
| **WebPage** | `makeArticleSchema()` / Landing pages | Коммерческие страницы |
| **Service** | Landing pages (вручную) | Коммерческие страницы |

### Как добавить HowTo schema

В доменном файле статьи:
1. Добавьте поле `howToSteps` с массивом шагов
2. Передайте шаги 8-м параметром в `makeArticleSchema()`

```typescript
howToSteps: [
    { name: "Шаг 1: Название", text: "Описание шага." },
    { name: "Шаг 2: Название", text: "Описание шага." },
],

structuredData: makeArticleSchema(
    slug, title, desc, publish, modify, faq, wordCount,
    [   // ← 8-й параметр: howToSteps
        { name: "Шаг 1: Название", text: "Описание шага." },
    ],
),
```

---

## 8. Sitemap — URL для добавления

При создании нового кластера добавьте на бекенд:

**Hub:**
```
https://dima-razrab.com/blog/[hub-slug]
```
priority: 0.9, changefreq: weekly

**Локомотивы:**
```
https://dima-razrab.com/blog/[статья-1]
https://dima-razrab.com/blog/[статья-2]
```
priority: 0.8, changefreq: monthly

**Спутники:**
```
https://dima-razrab.com/blog/[статья-3]
```
priority: 0.7, changefreq: monthly

---

## 9. Чек-лист перед публикацией

### Контент
- [ ] 7000-8000 слов на статью
- [ ] 10-12 секций с H2
- [ ] Подсекции с H3 где нужно
- [ ] Конкретные цифры и примеры
- [ ] Реальные кейсы «до/после»
- [ ] Таблицы сравнения
- [ ] Год 2026 (не 2025!)
- [ ] Нет китайских символов!
- [ ] 5-6 FAQ вопросов

### SEO
- [ ] Title с ключевым словом + «| DimaRazrab»
- [ ] Meta description 150-160 символов
- [ ] Keywords 8-10 фраз через запятую
- [ ] H1 содержит основной ключ
- [ ] Canonical URL
- [ ] OG теги (title, description, image)
- [ ] robots: index, follow

### Schema
- [ ] Article schema
- [ ] FAQPage schema
- [ ] BreadcrumbList schema
- [ ] HowTo schema (если есть пошаговый план)

### Перелинковка
- [ ] 2-3 ссылки на статьи кластера
- [ ] 1-2 ссылки на другой кластер
- [ ] Ссылка на money page
- [ ] CTA секция с формой

### Hub-страница
- [ ] CollectionPage schema
- [ ] SEO-вступление ~500 слов
- [ ] Карточки всех статей кластера
- [ ] Кнопка PortfolioPopup
- [ ] CTA на money page
- [ ] Footer с навигацией

### Регистрация
- [ ] Файл в clusterN/[slug].ts
- [ ] Тексты в clusterN/texts/[slug]-part1.ts + part2.ts
- [ ] Импорт в clusterN/registry.ts
- [ ] Импорт в основной registry.ts
- [ ] URL в sitemap (на бекенде)

### Компоненты (автоматически)
- [ ] ToC sidebar с активным отслеживанием (useActiveToc)
- [ ] Share-кнопки (Telegram, VK, WhatsApp, копирование)
- [ ] PortfolioPopup в sidebar
- [ ] CTA форма с отправкой
- [ ] Похожие статьи (related articles)
- [ ] Footer со всеми статьями

---

## 10. Существующие кластеры

### Кластер 1: Telegram боты
- **Hub:** `/blog/telegram-boty`
- **Money Page:** `/razrabotka-botov`
- **Статей:** 10
- **Слаги:** priyom-zayavok, internet-magazin, zapis-klientov, python-bot, ai-bot, bot-dlya-biznesa, stoimost-razrabotki, razrabotka-pod-klyuch, bot-prodazhi, ai-bot-sozdanie

### Кластер 2: Автоматизация бизнеса
- **Hub:** `/blog/avtomatizaciya-biznesa`
- **Money Page:** `/avtomatizaciya-biznesa`
- **Статей:** 5
- **Слаги:** avtomatizaciya-malogo-biznesa, ai-avtomatizaciya-biznesa, avtomatizaciya-otdela-prodazh, primery-avtomatizacii-biznesa, avtomatizaciya-biznesa-pod-klyuch

### Потенциальные кластеры 3-4
- **Разработка CRM:** Money page `/razrabotka-crm` уже есть
- **Разработка сервисов:** Money page `/razrabotka-servisov` уже есть

---

## 11. Тип Article (справка)

```typescript
export interface Article {
    slug: string;              // URL-слаг
    title: string;             // <title>
    metaDescription: string;   // <meta description>
    keywords: string;          // <meta keywords>
    h1: string;                // H1 заголовок
    ogTitle: string;           // OG заголовок
    ogDescription: string;     // OG описание
    canonical: string;         // canonical URL
    heroBadge: string;         // Бейдж в hero
    heroSubtitle: string;      // Подзаголовок hero
    readingTime: string;       // "20 мин чтения"
    wordCount: string;         // "~8000 слов"
    publishDate: string;       // "2026-07-30"
    modifiedDate: string;      // "2026-07-30"
    author: string;            // "Дмитрий Малышев"
    toc: ArticleTOC[];         // Оглавление
    sections: ArticleSection[];// Секции статьи
    faq: ArticleFAQ[];         // FAQ
    ctaTitle: string;          // Заголовок CTA
    ctaSubtitle: string;       // Подзаголовок CTA
    ctaSource: string;         // Источник для аналитики
    structuredData: object;    // JSON-LD
    internalLinks?: InternalLink[];  // Внутренние ссылки
    howToSteps?: HowToStep[];  // Шаги HowTo (опционально)
}
```
