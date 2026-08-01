# Чеклист технической оптимизации — DimaRazrab.com

> Технический SEO-аудит для сайта на Next.js (Pages Router).
> Дата: Август 2026
> Сайт: https://dima-razrab.com

---

## 1. robots.txt

### Текущее состояние: ❌ ОТСУТСТВУЕТ

### Что нужно сделать:

Создать файл `public/robots.txt`:

```
User-agent: *
Allow: /

# Закрыть служебные страницы
Disallow: /api/
Disallow: /login
Disallow: /register
Disallow: /_next/

# Яндекс-бот
User-agent: Yandex
Allow: /

# Sitemap
Sitemap: https://dima-razrab.com/sitemap.xml
```

### Критичность: 🔴 КРИТИЧНО
Без robots.txt поисковые роботы могут не знать о sitemap и некорректно сканировать сайт.

---

## 2. Sitemap.xml

### Текущее состояние: ❌ Статический файл в `plans/sitemap.xml`, НЕ динамический

### Что нужно сделать:

**Вариант А (рекомендуемый):** Использовать библиотеку `next-sitemap`

```bash
npm install next-sitemap
```

Создать `next-sitemap.config.js`:
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://dima-razrab.com',
    generateRobotsTxt: false, // robots.txt уже создан вручную
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/api/*', '/login', '/register', '/_next/*'],
    transform: async (config, path) => {
        // Коммерческие страницы — высокий приоритет
        const commercialPages = [
            '/razrabotka-botov',
            '/razrabotka-servisov',
            '/razrabotka-crm',
            '/avtomatizaciya-biznesа',
            '/parsery-marketplejsov',
            '/lidogeneraciya-telegram',
            '/razrabotka-python',
            '/razrabotka-nextjs',
            '/ai-integracii',
            '/razrabotka-api',
        ];
        
        if (commercialPages.includes(path)) {
            return {
                loc: path,
                changefreq: 'monthly',
                priority: 0.9,
                lastmod: new Date().toISOString(),
            };
        }
        
        // Hub-страницы блога
        if (path.startsWith('/blog/') && !path.includes('/blog/')?.split('/').length > 2) {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }
        
        // Статьи блога
        if (path.startsWith('/blog/')) {
            return {
                loc: path,
                changefreq: 'monthly',
                priority: 0.7,
                lastmod: new Date().toISOString(),
            };
        }
        
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: new Date().toISOString(),
        };
    },
};
```

Добавить в `package.json`:
```json
{
    "scripts": {
        "postbuild": "next-sitemap"
    }
}
```

**Вариант Б:** Динамический sitemap через `pages/sitemap.xml.tsx`

```typescript
// pages/sitemap.xml.tsx
import { GetServerSideProps } from 'next';
import { articles } from '../data/articles_data/registry';

const SITE_URL = 'https://dima-razrab.com';

function generateSiteMap() {
    const commercialPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/razrabotka-botov', priority: '0.9', changefreq: 'monthly' },
        { url: '/razrabotka-servisov', priority: '0.8', changefreq: 'monthly' },
        { url: '/razrabotka-crm', priority: '0.8', changefreq: 'monthly' },
        { url: '/avtomatizaciya-biznesа', priority: '0.8', changefreq: 'monthly' },
        { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    ];

    const blogPages = articles.map((article) => ({
        url: `/blog/${article.slug}`,
        priority: '0.7',
        changefreq: 'monthly',
    }));

    const allPages = [...commercialPages, ...blogPages];

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages
            .map(({ url, priority, changefreq }) => `
                <url>
                    <loc>${SITE_URL}${url}</loc>
                    <changefreq>${changefreq}</changefreq>
                    <priority>${priority}</priority>
                </url>
            `)
            .join('')}
    </urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return { props: {} };
};

export default function SiteMap() {}
```

### Критичность: 🔴 КРИТИЧНО
Без sitemap поисковые системы не знают о всех страницах сайта.

---

## 3. Мета-теги

### Текущее состояние: ✅ Настроено на коммерческих страницах и статьях

### Что проверить:

| Элемент | Требование | Где проверить |
|---------|-----------|---------------|
| `<title>` | Уникальный для каждой страницы, 50-70 символов, содержит ключевое слово | Каждая страница |
| `<meta name="description">` | Уникальный, 150-160 символов, содержит CTA | Каждая страница |
| `<meta name="keywords">` | Ключевые слова через запятую (не критично для Яндекса) | Каждая страница |
| `<link rel="canonical">` | Указывает на основной URL страницы | Каждая страница |

### Шаблон title для коммерческих страниц:
```
[Услуга] на заказ — [Краткое описание] | DimaRazrab
```

Примеры:
- `Разработка Telegram-ботов на заказ — боты для бизнеса | DimaRazrab`
- `Парсеры маркетплейсов — Wildberries, Ozon, Avito | DimaRazrab`
- `Python-разработчик на заказ — бэкенд, API, автоматизация | DimaRazrab`

### Шаблон description для коммерческих страниц:
```
[Что предлагаю]. [Преимущество 1]. [Преимущество 2]. [CTA].
```

Пример:
```
Разработка Telegram-ботов для бизнеса. Бесплатная поддержка 30 дней. 
Быстрые сроки, доступные цены. Обсудите проект в Telegram!
```

### Критичность: 🟡 ВАЖНО

---

## 4. Open Graph теги

### Текущее состояние: ✅ Настроено

### Что проверить:

```html
<meta property="og:title" content="Заголовок для соцсетей" />
<meta property="og:description" content="Описание для соцсетей" />
<meta property="og:image" content="https://dima-razrab.com/media/og_desc.jpg" />
<meta property="og:url" content="https://dima-razrab.com/page-url" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="ru_RU" />
<meta property="og:site_name" content="DimaRazrab" />
```

### Требования к OG-изображению:
- Размер: 1200×630 px
- Формат: JPG или PNG
- Текст читаемый на мобильных
- Логотип или название сайта

### Критичность: 🟡 ВАЖНО

---

## 5. Canonical URLs

### Текущее состояние: ✅ Настроено

### Что проверить:
- Каждая страница имеет `<link rel="canonical" href="..." />`
- Canonical URL указывает на основную версию (без параметров)
- Нет дублей с/без trailing slash
- Нет дублей с/без www

### Критичность: 🟡 ВАЖНО

---

## 6. Структурированные данные (Schema.org)

### Текущее состояние: ✅ Article + FAQPage + BreadcrumbList на статьях

### Что нужно добавить:

**Для коммерческих страниц — Schema.org Service:**
```json
{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Разработка Telegram-ботов на заказ",
    "description": "Создаю Telegram-ботов для бизнеса: приём заказов, запись клиентов, рассылки, оплата",
    "provider": {
        "@type": "Person",
        "name": "Дмитрий Малышев",
        "url": "https://dima-razrab.com"
    },
    "areaServed": "RU",
    "serviceType": "Разработка программного обеспечения",
    "offers": {
        "@type": "Offer",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "25000",
            "priceCurrency": "RUB",
            "minPrice": "25000"
        }
    }
}
```

**Для главной страницы — Schema.org ProfessionalService:**
```json
{
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DimaRazrab",
    "description": "Фриланс-разработчик: Telegram-боты, Python, Next.js, автоматизация бизнеса",
    "url": "https://dima-razrab.com",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "RU"
    },
    "priceRange": "от 25000 RUB",
    "openingHours": "Mo-Su 09:00-21:00"
}
```

**Для всех страниц — BreadcrumbList:**
```json
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Главная",
            "item": "https://dima-razrab.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Разработка ботов",
            "item": "https://dima-razrab.com/razrabotka-botov"
        }
    ]
}
```

### Проверка валидности:
- https://search.google.com/test/rich-results
- https://validator.schema.org/

### Критичность: 🟡 ВАЖНО

---

## 7. Скорость загрузки (Core Web Vitals)

### Текущее состояние: ⚠️ НЕ ПРОВЕРЕНО

### Что проверить:

| Метрика | Целевое значение | Инструмент |
|---------|-----------------|------------|
| LCP (Largest Contentful Paint) | < 2.5 сек | PageSpeed Insights |
| FID (First Input Delay) | < 100 мс | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |
| TTFB (Time to First Byte) | < 800 мс | WebPageTest |
| FCP (First Contentful Paint) | < 1.8 сек | PageSpeed Insights |

### Что оптимизировать в Next.js:

**7.1. Изображения:**
- Использовать `next/image` вместо `<img>`
- Формат WebP/AVIF
- Lazy loading для изображений ниже fold
- Размер изображений не более 200KB

**7.2. Шрифты:**
- Использовать `next/font` (уже настроено в проекте)
- Subset шрифтов (только кириллица + латиница)
- Preload критичных шрифтов

**7.3. JavaScript:**
- Динамические импорты для тяжёлых компонентов (`dynamic()`)
- Отключить неиспользуемые библиотеки
- Tree shaking

**7.4. CSS:**
- Критичный CSS inline
- Удалить неиспользуемые стили
- CSS Modules (уже используется)

**7.5. Кеширование:**
- Кеширование статических страниц (ISR/SSG)
- CDN для статики
- Cache-Control заголовки

### Критичность: 🟡 ВАЖНО

---

## 8. Мобильная адаптация

### Текущее состояние: ⚠️ Предположительно настроено (Next.js по умолчанию)

### Что проверить:
- viewport meta тег: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Текст читаемый без зума (минимум 16px)
- Кнопки и ссылки кликабельные (минимум 44×44 px)
- Нет горизонтальной прокрутки
- Pop-ups не перекрывают контент на мобильных
- Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

### Критичность: 🟡 ВАЖНО

---

## 9. Хлебные крошки (Breadcrumbs)

### Текущее состояние: ⚠️ Частично (BreadcrumbList Schema есть, визуальные крошки — проверить)

### Что нужно:
- Визуальные хлебные крошки на каждой странице
- Schema.org BreadcrumbList (уже есть на статьях)
- Структура: Главная → Раздел → Статья

Пример для статьи:
```
Главная → Блог → Telegram-боты → Как создать бота для бизнеса
```

### Критичность: 🟢 НИЗКАЯ

---

## 10. Внутренняя перелинковка

### Текущее состояние: ⚠️ Частично (related articles, но нет контекстных ссылок)

### Что нужно:

**10.1. Контекстные ссылки в статьях:**
- Каждая статья содержит 2-3 ссылки на другие статьи кластера
- Каждая статья содержит 1-2 ссылки на money page
- Анкоры — ключевые фразы (не «подробнее»)

**10.2. Блок «Полезные статьи» на коммерческих страницах:**
- 3-5 ссылок на релевантные статьи
- С кратким описанием

**10.3. Hub-страницы:**
- Ссылки на все статьи кластера
- Ссылка на money page
- Ссылка на другой hub (cross-link)

**10.4. Футер:**
- Ссылки на все коммерческие страницы
- Ссылки на hub-страницы

### Критичность: 🔴 КРИТИЧНО
Внутренняя перелинковка — один из самых важных факторов ранжирования.

---

## 11. Alt теги для изображений

### Текущее состояние: ⚠️ НЕ ПРОВЕРЕНО

### Требования:
- Каждое изображение имеет атрибут `alt`
- Alt описывает содержание изображения
- Содержит ключевое слово (где уместно)
- Не длиннее 125 символов

### Пример:
```html
<img src="/media/telegram-bot-example.jpg" 
     alt="Пример Telegram-бота для приёма заказов в интернет-магазине" />
```

### Критичность: 🟡 ВАЖНО

---

## 12. ЧПУ URL (Человекопонятные URL)

### Текущее состояние: ✅ Настроено

### Требования:
- URL на транслите (английские буквы)
- Без спецсимволов и ID
- Содержат ключевое слово
- Не слишком длинные

### Примеры правильных URL:
- `/razrabotka-botov` ✅
- `/blog/parser-wildberries` ✅
- `/blog/chatgpt-dlya-biznesa` ✅

### Примеры неправильных URL:
- `/page?id=123` ❌
- `/blog/2026/08/01/article-title` ❌ (слишком длинный)

### Критичность: 🟡 ВАЖНО

---

## 13. 404 страница

### Текущее состояние: ⚠️ НЕ ПРОВЕРЕНО

### Что нужно:
- Кастомная 404 страница (Next.js: `pages/404.tsx`)
- Информативное сообщение
- Ссылки на основные страницы
- Форма поиска (опционально)
- Не возвращает 200 статус (проверить!)

### Критичность: 🟡 ВАЖНО

---

## 14. Редиректы

### Текущее состояние: ⚠️ НЕ ПРОВЕРЕНО

### Что проверить:
- 301 редирект с non-www на www (или наоборот)
- 301 редирект с HTTP на HTTPS
- Нет цепочек редиректов
- Нет битых ссылок (404)
- Редиректы с/без trailing slash

### В Next.js (middleware.ts):
```typescript
// middleware.ts — уже существует в проекте
// Проверить, что редиректы настроены корректно
```

### Критичность: 🟡 ВАЖНО

---

## 15. Дополнительные проверки

### 15.1. Заголовки безопасности
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 15.2. Lang атрибут
```html
<html lang="ru">
```

### 15.3. Favicon
- Все размеры favicon (16x16, 32x32, 192x192, 512x512)
- Apple touch icon
- webmanifest

### 15.4. RSS лента (опционально)
- Для блога — RSS-лента с последними статьями

### 15.5. Hreflang (если планируется мультиязычность)
```html
<link rel="alternate" hreflang="ru" href="https://dima-razrab.com/page" />
```

---

## Сводная таблица

| # | Элемент | Статус | Критичность |
|---|---------|--------|-------------|
| 1 | robots.txt | ❌ Отсутствует | 🔴 Критично |
| 2 | Sitemap.xml | ❌ Не динамический | 🔴 Критично |
| 3 | Мета-теги | ✅ Настроено | 🟡 Важно |
| 4 | Open Graph | ✅ Настроено | 🟡 Важно |
| 5 | Canonical | ✅ Настроено | 🟡 Важно |
| 6 | Schema.org | ⚠️ Частично | 🟡 Важно |
| 7 | Core Web Vitals | ⚠️ Не проверено | 🟡 Важно |
| 8 | Мобильная адаптация | ⚠️ Предположительно | 🟡 Важно |
| 9 | Хлебные крошки | ⚠️ Частично | 🟢 Низкая |
| 10 | Внутренняя перелинковка | ⚠️ Частично | 🔴 Критично |
| 11 | Alt теги | ⚠️ Не проверено | 🟡 Важно |
| 12 | ЧПУ URL | ✅ Настроено | 🟡 Важно |
| 13 | 404 страница | ⚠️ Не проверено | 🟡 Важно |
| 14 | Редиректы | ⚠️ Не проверено | 🟡 Важно |
| 15 | Безопасность | ⚠️ Не проверено | 🟢 Низкая |

### Приоритет исправления:
1. 🔴 robots.txt + sitemap + перелинковка — сделать немедленно
2. 🟡 Schema.org + мета-теги + скорость — сделать в первые 2 месяца
3. 🟢 Хлебные крошки + безопасность — сделать по мере возможности

---

*Документ создан: Август 2026. Проверять ежемесячно.*
