import { ArticleSection } from '../types';

/* ============================================================
   Статья: aiogramPyrogram
   Часть 2/2: Секции 5-7
   ============================================================ */

export const aiogramPyrogramPart2: ArticleSection[] = [
{
            id: "code-examples",
            title: "Примеры кода на обоих фреймворках",
            content: `Покажу реализацию одной и той же задачи — обработка команды /start с кнопкой — на обоих фреймворках. Это позволит оценить стиль и сложность кода.`,
            subsections: [
                {
                    title: "Aiogram 3.x: обработка /start",
                    content: `Пример на Aiogram 3.x с использованием роутера, фильтров и inline-клавиатуры:

\`\`\`python
from aiogram import Bot, Dispatcher, Router, F
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import CommandStart
import asyncio

bot = Bot(token="YOUR_BOT_TOKEN")
dp = Dispatcher()
router = Router()

@router.message(CommandStart())
async def cmd_start(message: Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📋 Каталог", callback_data="catalog")],
        [InlineKeyboardButton(text="📞 Контакты", callback_data="contacts")],
    ])
    await message.answer(
        f"Привет, {message.from_user.first_name}! Выберите раздел:",
        reply_markup=keyboard,
    )

@router.callback_query(F.data == "catalog")
async def show_catalog(callback):
    await callback.message.edit_text("Загружаю каталог...")
    # Бизнес-логика загрузки каталога
    await callback.answer()

dp.include_router(router)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

**Ключевые особенности Aiogram:** Router для модульности, \`CommandStart\` фильтр вместо строкового сравнения, \`F.data\` для callback-кнопок. Код декларативный — видно всю логику обработки.`,
                },
                {
                    title: "Pyrogram: обработка /start",
                    content: `Тот же функционал на Pyrogram:

\`\`\`python
from pyrogram import Client, filters
from pyrogram.types import (
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
)

app = Client("my_bot", bot_token="YOUR_BOT_TOKEN")

@app.on_message(filters.command("start") & filters.private)
async def cmd_start(client, message):
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton("📋 Каталог", callback_data="catalog")],
        [InlineKeyboardButton("📞 Контакты", callback_data="contacts")],
    ])
    await message.reply(
        f"Привет, {message.from_user.first_name}! Выберите раздел:",
        reply_markup=keyboard,
    )

@app.on_callback_query(filters.regex("^catalog$"))
async def show_catalog(client, callback: CallbackQuery):
    await callback.message.edit_text("Загружаю каталог...")
    # Бизнес-логика загрузки каталога
    await callback.answer()

app.run()
\`\`\`

**Ключевые особенности Pyrogram:** декораторы \`@app.on_message\` и \`@app.on_callback_query\`, \`filters.command\` и \`filters.regex\` для фильтрации. Код компактнее, но при масштабировании все хендлеры в одном файле — нужна ручная организация.`,
                },
                {
                    title: "Что выбрать для вашего проекта",
                    content: `Оба примера делают одно и то же, но стиль отличается. Aiogram требует больше boilerplate (Dispatcher, Router, include_router), но это окупается на масштабных проектах — модульность, middleware, FSM. Pyrogram быстрее стартует для простых ботов, но при росте сложности приходится писать собственные абстракции.

**Моё правило:** если бот работает только как бот (принимает команды, отправляет сообщения, обрабатывает кнопки) — использую Aiogram. Если нужен доступ к пользовательским аккаунтам или мониторинг чужих каналов — Pyrogram.

:::readmore
Читать дальше
• [Как сделать Telegram-бота на Python](/blog/kak-sdelat-telegram-bota-na-python)
• [Telegram Mini App — что это](/blog/telegram-mini-app-chto-eto)
• [Стоимость разработки Telegram-бота](/blog/stoimost-razrabotki)
• [Telegram бот для бизнеса](/blog/telegram-bot-dlya-biznesa)
• [Python-разработка под ключ](/blog/python-razrabotka-pod-klyuch)
• [Заказать разработку Telegram-бота →](/razrabotka-botov)
:::

:::conversion
**Готовы заказать Telegram-бота на Python?**
✅ Бесплатная консультация
✅ Бесплатная поддержка 30 дней
✅ Быстрые сроки — от 5 дней
[Написать мне в Telegram прямо сейчас →](https://t.me/dima_razrab)
:::`,
                },
            ],
        },
{
            id: "cases",
            title: "Кейсы из моей практики",
            content: `Все три проекта ниже построены на Python — том языке, для которого созданы Aiogram и Pyrogram. Каждый кейс демонстрирует, какой фреймворк подходит для конкретной бизнес-задачи.`,
            subsections: [
                {
                    title: "Кейс 1: Салон красоты — Aiogram для записи клиентов",
                    content: `**Задача:** Салон красоты с 3 мастерами терял клиентов из-за неудобной записи по телефону. Администратор тратил 4 часа в день только на запись клиентов, а 30% записавшихся не приходили без предупреждения.

**Почему Aiogram:** Для записи клиентов нужна машина состояний (FSM) — пошаговый диалог «выбор услуги → выбор мастера → выбор даты → подтверждение». Aiogram имеет встроенную FSM, что сократило разработку на 40% по сравнению с Pyrogram, где FSM пришлось бы писать вручную.

**Результаты за 3 месяца:**
- Доход вырос на 40% — с 180 000 ₽ до 252 000 ₽/мес
- Экономия времени: 4 часа/день
- Пропуски снизились на 85% — с 30% до 4,5%
- Предоплаты выросли в 3 раза
- ROI проекта: 300%

**Технологии:** Python, aiogram, PostgreSQL, Telegram Bot API.

:::compare
❌ До автоматизации
• 4 часа/день на запись клиентов
• 30% записавшихся не приходят
• Путаница в расписании, двойные записи

✅ После внедрения бота на Aiogram
• Доход вырос на 40% — с 180 000 ₽ до 252 000 ₽/мес
• no-show снижен на 85% (с 30% до 4,5%)
• ROI: 300%, окупаемость: 2 месяца
:::

:::conversion
**Хотите такой же результат?**
Бесплатная консультация — разберём вашу задачу и предложим решение.
[Написать в Telegram →](https://t.me/dima_razrab)
:::

[Подробнее о проекте →](/work/sapis_cllientov)`,
                },
                {
                    title: "Кейс 2: Психологическая практика — Pyrogram для мониторинга чатов",
                    content: `**Задача:** Частный психолог тратила 4 часа в день на поиск клиентов в Telegram-чатах. Находила всего 2–3 заявки в неделю вручную.

**Почему Pyrogram:** Для мониторинга сообщений в чужих чатах нужен Client API — Bot API не имеет доступа к сообщениям в группах, куда бот не добавлен. Pyrogram через MTProto-протокол позволяет читать публичные чаты и фильтровать сообщения по ключевым словам в реальном времени.

**Результаты за 4 месяца:**
- Рост клиентской базы на 320% — с 25 до 105 клиентов
- Находит 15–20 лидов ежедневно — против 2–3 в неделю вручную
- Доход вырос на 280% — с 120 000 ₽ до 456 000 ₽/мес
- Конверсия в клиентов: 25%
- ROI проекта: 500%

**Технологии:** Python, Pyrogram (MTProto), PostgreSQL, Redis, регулярные выражения для фильтрации.

[Подробнее о проекте →](/work/leads_from_telegram)`,
                },
                {
                    title: "Кейс 3: Образовательная платформа — Pyrogram для многопоточного мониторинга",
                    content: `**Задача:** Образовательная платформа с 15 000 студентов теряла клиентов из-за низкой посещаемости (60%) и отсутствия уведомлений об изменениях в расписании.

**Почему Pyrogram:** Мониторинг 650+ расписаний университетов требовал одновременной обработки большого количества источников. MTProto-протокол Pyrogram обеспечивает прямое соединение с серверами Telegram без HTTP-накладных расходов, что критично при многопоточном мониторинге и массовой отправке уведомлений 12 500 пользователям.

**Результаты за 4 месяца:**
- Вовлечённость студентов выросла на 85% — с 40% до 74%
- Посещаемость увеличилась на 40% — с 60% до 84%
- Доход от подписок вырос на 220% — с 450 000 ₽ до 1 440 000 ₽/мес
- Время реакции на изменения: менее 1 минуты
- ROI проекта: 380%

**Технологии:** Python, Pyrogram (asyncio, многопоточность), PostgreSQL, Redis, платежные системы.

[Подробнее о проекте →](/work/university_tg)`,
                },
            ],
        },
{
            id: "cost",
            title: "Стоимость разработки бота на Aiogram и Pyrogram",
            content: `Стоимость зависит не от фреймворка, а от сложности бизнес-логики. Вот реальные диапазоны из моей практики:

**Простой бот (Aiogram или Pyrogram):**
- Приём заявок, простые команды, кнопки
- Стоимость: 25 000–50 000 ₽
- Срок: 1–2 недели

**Бот средней сложности (обычно Aiogram):**
- Запись клиентов, каталог, оплата, FSM, админ-панель
- Стоимость: 50 000–100 000 ₽
- Срок: 2–4 недели

**Сложный бот (Aiogram + Pyrogram):**
- Мониторинг каналов, парсинг, многопоточность, интеграции с CRM
- Стоимость: 100 000–250 000 ₽
- Срок: 4–8 недель

**Комбинированные проекты.** В некоторых проектах я использую оба фреймворка одновременно: Pyrogram для мониторинга и сбора данных, Aiogram для клиентского интерфейса. Это даёт лучший результат, чем использование одного фреймворка в ущерб возможностям.

Стоимость бота окупается за 1–4 месяца благодаря экономии времени и росту продаж.

> 💰 **Хотите узнать стоимость?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/razrabotka-botov).`,
        }
];
