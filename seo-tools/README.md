# 🛠 SEO Tools — Инструменты диагностики

Набор Node.js-скриптов для аудита SEO-показателей сайта [dima-razrab.com](https://dima-razrab.com).

---

## Как запускать:

### Все проверки разом:
```bash
node seo-tools/seo-dashboard.js
```

### Отдельные проверки:
```bash
node seo-tools/check-internal-links.js  # Граф перелинковки
node seo-tools/check-content-quality.js # Аудит 28 критериев
node seo-tools/check-seo-meta.js        # Мета-теги
```

### Рекомендуемый порядок запуска:
1. `node seo-tools/seo-dashboard.js` — Общий обзор
2. `node seo-tools/check-content-quality.js` — Что исправить в статьях
3. `node seo-tools/check-internal-links.js` — Перелинковка
4. `node seo-tools/check-seo-meta.js` — Мета-теги

### Также есть скрипты в корне:
- `node check-cjk.js` — Проверка CJK символов
- `node check-links.js` — Проверка битых ссылок (онлайн)
- `node check-sitemap.js` — Проверка sitemap (онлайн)

---

## Структура

```
seo-tools/
├── README.md                    # Этот файл
├── seo-dashboard.js             # Общий дашборд (запускает все проверки)
├── check-internal-links.js      # Граф перелинковки
├── check-content-quality.js     # Аудит качества контента
├── check-seo-meta.js            # Аудит мета-тегов
└── lib/
    └── parser.js                # Общие утилиты парсинга .ts файлов
```

## Что проверяется:

### check-internal-links.js
- Строит граф перелинковки из всех .ts файлов в `data/articles_data/`
- Находит страницы-**сироты** (нет входящих ссылок)
- Находит страницы-**тупики** (нет исходящих ссылок)
- Показывает топ-10 страниц по количеству входящих ссылок
- Проверяет ссылки на несуществующие slug'и

### check-content-quality.js
- Проверяет **10 ключевых критериев** из ARTICLE-CHECKLIST.md:
  1. ctaTitle содержит цифры
  2. ctaSubtitle содержит конкретные цены/сроки
  3. Delegation triggers (🔧/💰/🚀) в текстах
  4. Таблицы в текстах
  5. Объём текста > 8000 символов
  6. FAQ (4-6 вопросов)
  7. InternalLinks (3-5 ссылок)
  8. StructuredData
  9. Title 50-70 символов
  10. MetaDescription 150-160 символов
- Показывает топ-10 проблемных статей
- Статистику частых проблем

### check-seo-meta.js
- Title: 50-70 символов
- MetaDescription: 150-160 символов
- Canonical: правильный формат URL
- H1: заполнен
- Keywords: заполнены
- ogTitle, ogDescription: заполнены

### seo-dashboard.js
- Запускает все проверки последовательно
- Считает общий балл сайта (0-100%)
- Выводит топ-5 приоритетных исправлений

---

## Требования

- Node.js 14+
- Не требует npm-зависимостей (только встроенные модули `fs`, `path`)
- Скрипты парсят .ts файлы как текст (regex), не требуют компиляции TypeScript
