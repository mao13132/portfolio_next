# SEO-стратегия: система привлечения трафика для Telegram-ботов

## Текущее состояние

### Есть:
- 10 SEO-статей (~3500-4500 слов каждая)
- 4 коммерческие страницы: `/razrabotka-botov`, `/razrabotka-servisov`, `/razrabotka-crm`, `/avtomatizaciya-biznesa`
- Блог `/blog` с карточками статей
- Schema.org (Article + FAQPage + BreadcrumbList)
- Meta теги, OG, canonical
- Футер со ссылками на все статьи
- «Похожие статьи» внизу каждой статьи

### Нет (критично для трафика):
- **Sitemap.xml** — поисковики не знают о всех страницах
- **Хаб-страницы** — нет страниц-кластеров
- **Контекстные внутренние ссылки** в тексте статей
- **Перелинковка статьи → коммерческая страница**
- **Стратегия «статья-локомотив → коммерческая страница»**

---

## Архитектура SEO-системы

```
                    ┌─────────────────────────┐
                    │    КОММЕРЧЕСКАЯ СТРАНИЦА  │
                    │    /razrabotka-botov      │
                    │    (деньги, конверсия)    │
                    └────────────┬────────────┘
                                 │ ссылки из всех статей
                    ┌────────────┴────────────┐
                    │      ХАБ-СТРАНИЦА        │
                    │   /blog/telegram-boty     │
                    │   (агрегатор темы)        │
                    └────────────┬────────────┘
                                 │ ссылки
              ┌──────────────────┼──────────────────┐
              │                  │                  │
    ┌─────────┴──────┐ ┌────────┴───────┐ ┌───────┴────────┐
    │ ЛОКОМОТИВ #1   │ │ ЛОКОМОТИВ #2   │ │ ЛОКОМОТИВ #3   │
    │ /blog/...biznes │ │ /blog/...price │ │ /blog/...python│
    │ частота 38      │ │ частота 58     │ │ частота 35     │
    └────────┬───────┘ └───────┬────────┘ └───────┬────────┘
             │                 │                   │
    ┌────────┴─────────────────┴───────────────────┴────────┐
    │              СТАТЬИ-СПУТНИКИ (3500+ слов)              │
    │  приём заявок │ магазин │ запись │ продажи │ AI │ ...  │
    └────────────────────────────────────────────────────────┘
```

### Роли страниц:

**1. Коммерческая страница (money page)** — `/razrabotka-botov`
- Цель: конверсия в заявку
- На неё ведут ссылки ВСЕХ статей
- Ранжируется по ВЧ запросам: «разработка telegram бота», «заказать бота»

**2. Хаб-страница (hub)** — `/blog/telegram-boty` (НОВАЯ)
- Цель: агрегировать тему, передать вес
- Содержит: описание темы + ссылки на все статьи кластера
- Ранжируется по СЧ: «telegram боты», «боты для бизнеса»

**3. Статья-локомотив (locomotive)** — высокочастотные статьи
- `/blog/telegram-bot-dlya-biznesa` (38)
- `/blog/skolko-stoit-razrabotka-telegram-bota` (58)
- `/blog/kak-sdelat-telegram-bota-na-python` (35)
- `/blog/kak-sozdat-ai-bot-telegram` (32)
- Цель: привлечь максимум трафика по ВЧ/СЧ

**4. Статья-спутник (supporting)** — нишевые статьи
- Приём заявок, магазин, запись, продажи, AI, под ключ
- Цель: привлечь НЧ трафик + передать вес локомотивам

---

## Что реализовать

### 1. Sitemap.xml (КРИТИЧНО)
- Автоматическая генерация через `next-sitemap` или кастомный `getServerSideProps`
- Включает: главную, коммерческие страницы, блог, каждую статью
- Приоритеты: коммерческие = 0.9, локомотивы = 0.8, спутники = 0.7

### 2. Хаб-страница `/blog/telegram-boty`
- H1: «Telegram боты для бизнеса: полное руководство»
- Описание темы (500 слов)
- Карточки всех статей с кратким описанием
- Ссылка на коммерческую страницу `/razrabotka-botov`
- Schema.org: CollectionPage

### 3. Контекстные ссылки в статьях
- В тексте каждой статьи 2-3 ссылки на другие статьи кластера
- 1-2 ссылки на коммерческую `/razrabotka-botov`
- Анкоры — ключевые фразы (не «подробнее тут»)

### 4. Ссылки из статей на коммерческую страницу
- В CTA-секции каждой статьи: ссылка на `/razrabotka-botov`
- В тексте: «Заказать разработку бота → /razrabotka-botov»

### 5. Обновить статьи с перелинковкой
- Каждая статья ссылается на 2-3 связанные статьи (в тексте, не только в related)
- Каждая статья ссылается на `/razrabotka-botov`

### 6. robots.txt
- Разрешить индексацию всех страниц
- Указать sitemap.xml

---

## Приоритет реализации

1. **Sitemap.xml** — без него поисковики не знают о страницах
2. **robots.txt** — базовая настройка
3. **Хаб-страница** — агрегатор кластера
4. **Контекстные ссылки в статьях** — передача веса
5. **Ссылки на коммерческую** — конверсия трафика в заявки

---

## Ожидаемый результат

При правильной реализации:
- Через 2-4 недели: поисковики проиндексируют все страницы
- Через 1-3 месяца: статьи начнут ранжироваться по НЧ запросам
- Через 3-6 месяцев: локомотивы выйдут в топ по СЧ запросам
- Через 6-12 месяцев: стабильный органический трафик 500-2000 визитов/мес

---

## Sitemap URLs

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Главная -->
  <url>
    <loc>https://dima-razrab.ru/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Коммерческие страницы -->
  <url>
    <loc>https://dima-razrab.ru/razrabotka-botov</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/razrabotka-servisov</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/razrabotka-crm</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/avtomatizaciya-biznesa</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Блог -->
  <url>
    <loc>https://dima-razrab.ru/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Хаб-страница -->
  <url>
    <loc>https://dima-razrab.ru/blog/telegram-boty</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Статьи блога -->
  <url>
    <loc>https://dima-razrab.ru/blog/telegram-bot-dlya-biznesa</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/skolko-stoit-razrabotka-telegram-bota</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/kak-sdelat-telegram-bota-na-python</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/telegram-bot-dlya-priyoma-zayavok</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/telegram-bot-dlya-internet-magazina</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/telegram-bot-dlya-zapisi-klientov</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/telegram-bot-dlya-prodazh</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/ai-telegram-bot-dlya-biznesa</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/razrabotka-telegram-bota-pod-klyuch</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dima-razrab.ru/blog/kak-sozdat-ai-bot-telegram</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Прочее -->
  <url>
    <loc>https://dima-razrab.ru/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>
```

---

## robots.txt

```
User-agent: *
Allow: /

Sitemap: https://dima-razrab.ru/sitemap.xml

# Disallow admin/API routes
Disallow: /api/
Disallow: /login
Disallow: /register
Disallow: /_next/
```
