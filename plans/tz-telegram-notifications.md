# ТЗ: Улучшение Telegram-уведомлений на бэкенде

> Дата: 2026-08-05  
> Статус: В работе  
> Приоритет: Высокий

---

## 1. Контекст

Фронтенд отправляет заявки на два эндпоинта:
- `POST /contact` — формы обратной связи (LeadForm, ArticleTemplate, Contacts, LandingQuiz)
- `POST /quiz` — квизы (Quiz)

В payload теперь добавлено поле `attribution` с Journey Chain данными (маршрут, устройство, UTM, поведение на сайте).

Текущие проблемы:
- Длинные сообщения могут превышать лимит Telegram (4096 символов)
- Нет обработки ошибок при недоступности Telegram API
- Нет retry-механизма
- Нет форматирования — сообщения приходят «сырыми»

---

## 2. Требования

### 2.1. Разбивка длинных сообщений

**Лимит Telegram Bot API:** 4096 символов на одно сообщение `sendMessage`.

**Реализация:**
```
Если текст > 4096 символов:
  1. Разбить на части по ~4000 символов (с запасом)
  2. Разбивать по границам абзацев (\n\n), а не посередине слова
  3. Отправлять части последовательно с задержкой 100мс между ними
  4. Каждая часть кроме первой помечается: "📄 Продолжение..."
  5. Каждая часть кроме последней помечается: "➡️ См. следующее сообщение"
```

**Критично:** не ломать существующие заявки — если сообщение < 4096, отправлять как раньше одним сообщением.

### 2.2. Форматирование сообщений

**Требования:**
- Без HTML/Markdown тегов (parse_mode не использовать или использовать `MarkdownV2`)
- Со смайликами-эмодзи для структурирования
- Время в московском часовом поясе (UTC+3)
- Читаемая структура для быстрого просмотра на телефоне

**Шаблон сообщения для `/contact`:**

```
🆕 Новая заявка

👤 Имя: Иван
📱 Контакт: @ivan
📝 Задача: Нужен бот для магазина

🔗 Страница: /razrabotka-botov#cta-bottom
🕐 Время: 05.08.2026, 18:30 (МСК)

📊 Путь клиента:
  1️⃣ /blog/telegram-bot-dlya-biznesa — 3 мин, 82% прочитано
  2️⃣ /razrabotka-botov — 45 сек, 60% прочитано

📱 Устройство: Десктоп, Chrome, Windows
🌐 Источник: yandex.ru
🏷 UTM: source=yandex, campaign=blog_telegram
🔁 Визитов: 3 | Первый визит: 20.07.2026

📋 Форма:
  • Порядок полей: contact → task
  • Время заполнения: 45 сек
  • Попыток отправки: 1
```

**Шаблон для `/quiz`:**

```
🎯 Новая заявка из квиза

📱 Контакт: @ivan
📋 Ответы:
  1️⃣ Какой бизнес? → Интернет-магазин
  2️⃣ Какая задача? → Приём заказов

🔗 Страница: /razrabotka-botov#quiz
🕐 Время: 05.08.2026, 18:30 (МСК)

📊 Путь клиента:
  1️⃣ /blog/telegram-bot-dlya-biznesa — 3 мин, 82%
  2️⃣ /razrabotka-botov — 45 сек, 60%

📱 Устройство: Мобильный, Chrome, Android
🌐 Источник: yandex.ru
🔁 Визитов: 3
```

### 2.3. Время в московском часовом поясе

```python
from datetime import datetime, timezone, timedelta

MSK = timezone(timedelta(hours=3))

def get_msk_time() -> str:
    return datetime.now(MSK).strftime("%d.%m.%Y, %H:%M (МСК)")
```

Если `attribution` содержит `firstVisit` / `lastVisit` — тоже конвертировать в МСК.

### 2.4. Retry-механизм

**Параметры:**
- Максимум 3 попытки
- Экспоненциальная задержка: 1с, 3с, 9с
- Retry только на ошибки: `429` (Too Many Requests), `500`, `502`, `503`, `504`, `ConnectionError`, `Timeout`
- НЕ retry на: `400` (Bad Request), `401`, `403`

**Псевдокод:**
```python
async def send_with_retry(send_func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return await send_func()
        except RetryableError as e:
            if attempt == max_retries - 1:
                raise
            delay = 3 ** attempt  # 1, 3, 9 сек
            await asyncio.sleep(delay)
```

### 2.5. Обработка ошибок (не падать!)

**Принцип:** Telegram — это уведомление, а не критичная бизнес-логика. Если Telegram недоступен:

1. Заявка **всё равно сохраняется** в БД/CRM (если есть)
2. Ошибка логируется, но **не возвращается клиенту** как 500
3. Клиент получает успешный ответ (200/201)
4. Ошибка отправки в Telegram — **в фоне**, не блокирует ответ

**Реализация:**
```python
async def process_lead(data: dict):
    # 1. Сохраняем заявку (КРИТИЧНО — не в try/except!)
    lead_id = await save_to_database(data)
    
    # 2. Отправляем в Telegram (НЕКРИТИЧНО — в try/except)
    try:
        await send_telegram_notification(data)
    except Exception as e:
        logger.error(f"Telegram notification failed for lead {lead_id}: {e}")
        # Не пробрасываем ошибку — заявка уже сохранена
    
    # 3. Возвращаем успех клиенту
    return {"status": "ok", "id": lead_id}
```

### 2.6. Rate Limiting

Telegram лимит: ~30 сообщений/сек в один чат, ~20 сообщений/мин в одну группу.

**Реализация:**
- Очередь сообщений с rate limiter
- Если много заявок одновременно — буферизировать и отправлять с задержкой

---

## 3. Структура данных на входе

### `/contact` endpoint

```json
{
  "name": "Иван",
  "telegram": "@ivan",
  "phone": "",
  "email": "",
  "text": "[cta-bottom] Нужен бот для магазина",
  "url": "https://dima-razrab.com/razrabotka-botov#cta-bottom",
  "attribution": {
    "journey": [
      {
        "page": "/blog/telegram-bot-dlya-biznesa",
        "ts": 1712345600000,
        "timeOnPage": 187,
        "scrollDepth": 82,
        "ctaClicks": ["cta-bottom"]
      }
    ],
    "device": {
      "screen": "1920x1080",
      "mobile": false,
      "browser": "Chrome",
      "os": "Windows",
      "language": "ru-RU",
      "timezone": "Europe/Moscow"
    },
    "entry": {
      "referrer": "yandex.ru",
      "utm_source": "yandex",
      "utm_medium": "organic",
      "utm_campaign": null,
      "utm_term": null,
      "utm_content": null,
      "landingPage": "/blog/telegram-bot-dlya-biznesa"
    },
    "form": {
      "started": true,
      "startedAt": 1712345780000,
      "fieldOrder": ["contact", "task"],
      "timeToSubmit": 45,
      "attempts": 1
    },
    "visits": 3,
    "firstVisit": "2026-07-20T10:00:00.000Z",
    "lastVisit": "2026-08-05T15:30:00.000Z",
    "createdAt": 1712345600000
  }
}
```

**Примечание:** поле `attribution` может отсутствовать (старые клиенты, кэш). Код должен обрабатывать `attribution = null`.

### `/quiz` endpoint

```json
{
  "answers": [
    { "question": "Какой бизнес?", "answer": "Интернет-магазин" },
    { "question": "Какая задача?", "answer": "Приём заказов" }
  ],
  "contact": "@ivan",
  "source": "razrabotka-botov",
  "url": "https://dima-razrab.com/razrabotka-botov#quiz",
  "attribution": { ... }  // аналогичная структура
}
```

---

## 4. Вспомогательные функции

### 4.1. Форматирование Journey Chain

```python
def format_journey(attribution: dict) -> str:
    if not attribution or not attribution.get("journey"):
        return ""
    
    lines = ["📊 Путь клиента:"]
    for i, visit in enumerate(attribution["journey"], 1):
        page = visit["page"]
        time_s = visit.get("timeOnPage", 0)
        scroll = visit.get("scrollDepth", 0)
        cta = visit.get("ctaClicks", [])
        
        # Форматируем время
        if time_s >= 60:
            time_str = f"{time_s // 60} мин {time_s % 60} сек"
        else:
            time_str = f"{time_s} сек"
        
        emoji = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"][i-1] if i <= 9 else f"{i}."
        
        line = f"  {emoji} {page} — {time_str}, {scroll}% прочитано"
        if cta:
            line += f" (клик: {', '.join(cta)})"
        lines.append(line)
    
    return "\n".join(lines)
```

### 4.2. Форматирование Device Info

```python
def format_device(attribution: dict) -> str:
    if not attribution or not attribution.get("device"):
        return ""
    
    d = attribution["device"]
    device_type = "📱 Мобильный" if d.get("mobile") else "🖥 Десктоп"
    return f"{device_type}, {d.get('browser', '?')}, {d.get('os', '?')}"
```

### 4.3. Форматирование Entry Source

```python
def format_entry(attribution: dict) -> str:
    if not attribution or not attribution.get("entry"):
        return ""
    
    e = attribution["entry"]
    parts = []
    
    if e.get("referrer"):
        parts.append(f"🌐 Реферер: {e['referrer']}")
    
    utm_parts = []
    for key in ["utm_source", "utm_medium", "utm_campaign"]:
        if e.get(key):
            utm_parts.append(f"{key.replace('utm_', '')}={e[key]}")
    if utm_parts:
        parts.append(f"🏷 UTM: {', '.join(utm_parts)}")
    
    return "\n".join(parts)
```

---

## 5. Backward Compatibility

**Важно:** изменения не должны ломать существующие заявки.

| Ситуация | Поведение |
|----------|-----------|
| `attribution` отсутствует | Форматировать без секции «Путь клиента» |
| `journey` пустой массив | Не показывать секцию «Путь клиента» |
| `device` отсутствует | Не показывать секцию «Устройство» |
| `form` отсутствует | Не показывать секцию «Форма» |
| Сообщение < 4096 символов | Отправлять одним сообщением (как сейчас) |
| Сообщение > 4096 символов | Разбивать на части |

---

## 6. Acceptance Criteria

- [ ] Заявка с `attribution` приходит в Telegram красиво отформатированной
- [ ] Заявка без `attribution` приходит как раньше (ничего не сломано)
- [ ] Длинные сообщения (>4096) разбиваются на части
- [ ] Время указано в МСК
- [ ] Если Telegram недоступен — заявка сохраняется, клиент получает 200
- [ ] Retry: 3 попытки с экспоненциальной задержкой
- [ ] Ошибки Telegram логируются, не падают
- [ ] Rate limiting: не более 20 сообщений/мин в чат
- [ ] Все существующие эндпоинты продолжают работать

---

## 7. Тестовые кейсы

1. **Обычная заявка** — отправить с `attribution`, проверить формат
2. **Заявка без attribution** — отправить без поля, проверить что приходит как раньше
3. **Длинная заявка** — отправить текст >4096 символов, проверить разбивку
4. **Telegram недоступен** — заблокировать API, проверить что заявка сохраняется и клиент получает 200
5. **Rate limit** — отправить 25 заявок одновременно, проверить что все доходят
6. **Retry** — эмулировать 429/500, проверить retry с задержкой
