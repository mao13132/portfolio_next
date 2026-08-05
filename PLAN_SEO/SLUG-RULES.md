# 🔑 Правила работы со Slug

> **Slug** — это уникальный идентификатор статьи, который используется в URL.
> Например: slug `sajty-na-zakaz` → URL `/blog/sajty-na-zakaz`

---

## ⚠️ ГЛАВНОЕ ПРАВИЛО

**Slug определяется в domain файле статьи в поле `slug:`. Это ЕДИНСТВЕННЫЙ источник правды.**

```typescript
// data/articles_data/veb/sajty-na-zakaz.ts
export const articleSajtyNaZakaz: Article = {
    slug: "sajty-na-zakaz",  // ← ЭТО SLUG. Всегда берём отсюда.
    title: "...",
    ...
};
```

---

## ❌ Частые ошибки (AI и люди путают)

### 1. Slug ≠ Имя файла

| Поле | Пример |
|------|--------|
| **Slug** (в domain файле) | `razrabotka-telegram-bota-pod-klyuch` |
| **Имя файла** | `razrabotka-pod-klyuch.ts` |
| **Правильный URL** | `/blog/razrabotka-telegram-bota-pod-klyuch` |
| **НЕПРАВИЛЬНЫЙ URL** | `/blog/razrabotka-pod-klyuch` ❌ |

**Проверяй slug в domain файле, а не имя файла!**

### 2. Slug ≠ Имя text part файла

| Поле | Пример |
|------|--------|
| **Slug** (в domain файле) | `ai-agenty-dlya-biznesa` |
| **Text part файл** | `ai-agenty-part1.ts` |
| **Правильный URL** | `/blog/ai-agenty-dlya-biznesa` |
| **НЕПРАВИЛЬНЫЙ URL** | `/blog/ai-agenty` ❌ |

**Text part файлы — это технические файлы с контентом, НЕ определяют URL!**

### 3. Кириллица в URL

| Правильно | Неправильно |
|-----------|-------------|
| `/razrabotka-servisov` | `/razrabotka-servisов` ❌ |
| `/razrabotka-botov` | `/razrabotka-botов` ❌ |

**URL всегда на латинице!** Кириллические «о», «а», «с», «е» выглядят как латинские, но это РАЗНЫЕ символы.

---

## 📋 Как найти slug статьи

### Способ 1: Прочитать domain файл
```bash
# Найти slug в файле
grep -r "slug:" data/articles_data/veb/sajty-na-zakaz.ts
# → slug: "sajty-na-zakaz"
```

### Способ 2: Посмотреть в registry
Каждый кластер имеет registry.ts который экспортирует статьи:
- `data/articles_data/registry.ts` — главный
- `data/articles_data/veb/registry.ts` — кластер veb
- `data/articles_data/api/registry.ts` — кластер API
- и т.д.

### Способ 3: Список всех slug'ов
```bash
node -e "const{getAllSlugs}=require('./data/articles');console.log(getAllSlugs().join('\n'))"
```

---

## 🗺️ Маппинг: slug → URL → файл

| Slug | URL | Domain файл | Text parts |
|------|-----|-------------|------------|
| `sajty-na-zakaz` | `/blog/sajty-na-zakaz` | `veb/sajty-na-zakaz.ts` | `veb/texts/sajty-na-zakaz-part1.ts` |
| `ai-agenty-dlya-biznesa` | `/blog/ai-agenty-dlya-biznesa` | `ai/ai-agenty-dlya-biznesa.ts` | `ai/texts/ai-agenty-part1.ts` |
| `razrabotka-telegram-bota-pod-klyuch` | `/blog/razrabotka-telegram-bota-pod-klyuch` | `razrabotka-pod-klyuch.ts` | `texts/razrabotka-pod-klyuch-part1.ts` |

**Обрати внимание:** имена text parts НЕ совпадают со slug! Это нормально.

---

## 🔗 Как строить внутренние ссылки

### Правильно:
```typescript
internalLinks: [
    { anchor: "сайты на заказ", url: "/blog/sajty-na-zakaz", context: "..." },
    // ↑ slug из domain файла, НЕ имя файла
]
```

### В тексте (template literal):
```markdown
Подробнее о [создании лендинга](/blog/sozdanie-lendinga).
// ↑ slug из domain файла
```

### Неправильно:
```markdown
Подробнее о [создании лендинга](/blog/sozdanie-lendinga-part1).  ❌
// ↑ это имя text part файла, НЕ slug!
```

---

## ✅ Чеклист перед коммитом

- [ ] Slug в URL совпадает с `slug:` в domain файле?
- [ ] Нет кириллицы в URL? (проверь `/razrabotka-servisов` → `/razrabotka-servisov`)
- [ ] Internal links используют slug, а не имя файла?
- [ ] Text part имена не используются как URL?

---

## 🛠️ Автоматическая проверка

```bash
# Проверка кириллицы в URL
node check-cjk.js

# Проверка битых ссылок (slug не существует)
node check-links.js

# Проверка перелинковки (сироты)
node seo-tools/check-internal-links.js

# Общий дашборд
node seo-tools/seo-dashboard.js
```

---

*Создано: 5 августа 2026. Причина: 5+ ошибок с slug за одну сессию.*
