import { ArticleSection } from '../types';

/* ============================================================
   Статья: pythonBot
   Часть 1/2: Секции 1-7
   ============================================================ */

export const pythonBotPart1: ArticleSection[] = [
{
            id: "why-python",
            title: "Почему Python — лучший язык для Telegram-ботов",
            content: `Python — самый популярный язык для разработки Telegram-ботов, и на это есть веские причины.

Во-первых, простота синтаксиса. Python читается почти как английский текст. Даже если вы новичок в программировании, вы сможете написать работающего бота за несколько часов.

Во-вторых, богатая экосистема. Для Telegram есть несколько зрелых фреймворков: aiogram, python-telegram-bot, telebot (pyTelegramBotAPI). Каждый решает разные задачи — от простых ботов до сложных систем с middleware и FSM.

В-третьих, огромное сообщество. Тысячи готовых примеров, туториалов и библиотек. Если у вас возникнет проблема — ответ уже есть на Stack Overflow или в Telegram-каналах разработчиков.

В-четвёртых, интеграции. Python легко интегрируется с базами данных (PostgreSQL, MongoDB, SQLite), платёжными системами, CRM, API внешних сервисов. Это позволяет создавать не просто ботов, а полноценные бизнес-инструменты.

По данным GitHub, более 60% всех Telegram-ботов написаны на Python. Это значит, что вам доступны готовые решения для практически любой задачи.

Вот сводная таблица стоимости разработки бота на Python:

| Тип бота | Функции | Цена | Сроки |
|----------|---------|------|-------|
| Простой | Приветствие, FAQ, кнопки, сбор контактов | 15 000 — 40 000 ₽ | 3-5 дней |
| Средний | + база данных, CRM, калькуляция | 40 000 — 100 000 ₽ | 1-2 недели |
| Сложный | + магазин, оплата, WebApp, AI | 100 000 — 300 000 ₽ | 2-4 недели |`,
        },
{
            id: "preparation",
            title: "Подготовка рабочего окружения",
            content: `Прежде чем писать код, нужно подготовить инструменты. Вот что вам понадобится.`,
            subsections: [
                {
                    title: "Установка Python",
                    content: `Скачайте Python 3.10+ с официального сайта python.org. При установке на Windows обязательно поставьте галочку «Add Python to PATH». Проверьте установку: откройте терминал и введите python --version. Должно показать версию 3.10 или выше.`,
                },
                {
                    title: "Создание виртуального окружения",
                    content: `Виртуальное окружение изолирует зависимости проекта. Создайте его командой: python -m venv venv. Активируйте: на Windows — venv\\Scripts\\activate, на Mac/Linux — source venv/bin/activate. После активации в терминале появится префикс (venv).`,
                },
                {
                    title: "Установка библиотек",
                    content: `Установите aiogram — самый популярный асинхронный фреймворк для Telegram-ботов: pip install aiogram. Для работы с базой данных: pip install sqlalchemy asyncpg (PostgreSQL) или aiosqlite (SQLite). Для переменных окружения: pip install python-dotenv.`,
                },
                {
                    title: "Структура проекта",
                    content: `Создайте следующую структуру каталогов:\n\nbot/\n├── main.py — точка входа\n├── config.py — конфигурация\n├── handlers/ — обработчики команд\n│   ├── __init__.py\n│   └── start.py\n├── keyboards/ — клавиатуры\n│   ├── __init__.py\n│   └── inline.py\n├── database/ — работа с БД\n│   ├── __init__.py\n│   └── models.py\n└── .env — переменные окружения\n\nТакая структура позволяет масштабировать проект без хаоса в коде.`,
                },
            ],
        },
{
            id: "botfather",
            title: "Регистрация бота в BotFather: получение токена",
            content: `Каждый Telegram-бот проходит через BotFather — официальный бот Telegram для создания и управления ботами.

Шаг 1: Откройте Telegram и найдите @BotFather. Нажмите «Start».

Шаг 2: Отправьте команду /newbot. BotFather спросит имя бота — это отображаемое имя, которое увидят пользователи. Например: «Мой Магазин Бот».

Шаг 3: BotFather спросит username бота — это уникальный идентификатор, который заканчивается на «bot». Например: my_shop_2026_bot.

Шаг 4: BotFather выдаст токен — длинную строку вида 123456789:ABCdefGHIjklMNOpqrsTUVwxyz. Это ключ доступа к вашему боту. НИКОМУ его не показывайте и не публикуйте в открытом доступе.

Шаг 5: Сохраните токен в файл .env в корне проекта:\nBOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz\n\nЧерез BotFather также можно: установить аватар (/setuserpic), описание (/setdescription), команды бота (/setcommands), включить inline-режим (/setinline).`,
        },
{
            id: "first-bot",
            title: "Ваш первый Telegram-бот на Python: Hello World",
            content: `Начнём с самого простого бота, который отвечает на команду /start. Создайте файл main.py.`,
            subsections: [
                {
                    title: "Минимальный код бота",
                    content: `import asyncio\nfrom aiogram import Bot, Dispatcher, Router, F\nfrom aiogram.types import Message\n\nBOT_TOKEN = \"ВАШ_ТОКЕН\"\n\nbot = Bot(token=BOT_TOKEN)\ndp = Dispatcher()\nrouter = Router()\n\n@router.message(F.text == \"/start\")\nasync def cmd_start(message: Message):\n    await message.answer(\"Привет! Я ваш первый бот! 🤖\")\n\ndp.include_router(router)\n\nasync def main():\n    await dp.start_polling(bot)\n\nif __name__ == \"__main__\":\n    asyncio.run(main())\n\nЗапустите: python main.py. Откройте Telegram, найдите своего бота и отправьте /start. Бот ответит!\n\n:::compare\n❌ Без бота\n• Ручные ответы на сообщения 24/7\n• Теряете клиентов в нерабочее время\n• Тратите часы на рутину\n\n✅ С Telegram-ботом\n• Автоматические ответы 24/7\n• Ни один клиент не потерян\n• Вы занимаетесь бизнесом, а не перепиской\n:::\n\n:::conversion\n**Хотите бота, но не хотите разбираться сами?**
Я разработаю бота на Python под ваш бизнес с бесплатной поддержкой 30 дней.
Стоимость от 15 000 ₽. Сроки от 3 дней.
[Обсудить проект →](https://t.me/dima_razrab)\n:::`,
                },
                {
                    title: "Разбор кода",
                    content: `Bot — объект, представляющий вашего бота. Принимает токен от BotFather.\n\nDispatcher — диспетчер, который маршрутизирует входящие сообщения к нужным обработчикам.\n\nRouter — группирует хендлеры. Можно создать несколько роутеров для разных модулей (start, help, admin).\n\n@router.message — декоратор, который регистрирует функцию-обработчик для текстовых сообщений.\n\nF.text == "/start" — фильтр. Хендлер сработает только если текст сообщения равен "/start".\n\nstart_polling — запускает бота в режиме polling (постоянно опрашивает сервер Telegram на наличие новых сообщений).`,
                },
            ],
        },
{
            id: "frameworks",
            title: "Обзор фреймворков: какой выбрать для Telegram-бота",
            content: `В экосистеме Python для Telegram есть три основных фреймворка. Каждый имеет свои сильные стороны.`,
            subsections: [
                {
                    title: "Aiogram 3 (рекомендуемый)",
                    content: `Асинхронный фреймворк, самый популярный в 2026 году. Поддерживает FSM (машину состояний), middleware, роутеры, inline-кнопки, медиа-группы. Быстрый, хорошо документированный, активное сообщество. Идеален для ботов любой сложности — от простых до enterprise-уровня. Работает на asyncio.`,
                },
                {
                    title: "python-telegram-bot",
                    content: `Один из старейших фреймворков. С версии 20+ стал полностью асинхронным. Хорошая документация, стабильный API. Подходит для тех, кто предпочитает классический ООП-подход. Менее популярен в русскоязычном сообществе, чем aiogram.`,
                },
                {
                    title: "Telebot (pyTelegramBotAPI)",
                    content: `Самый простой фреймворк для начинающих. Синхронный, декоративный API. Минимум boilerplate кода. Но не подходит для сложных проектов: нет FSM, слабая поддержка middleware, медленнее асинхронных аналогов. Хорош для прототипов и учебных проектов.`,
                },
            ],
        },
{
            id: "aiogram",
            title: "Полноценный бот на Aiogram 3: пошаговая разработка",
            content: `Теперь создадим бота с реальной функциональностью: приветствие, меню, обработка команд, работа с базой данных. Используем Aiogram 3 — самый мощный и гибкий фреймворк.

Структура проекта:\n\nbot/\n├── main.py — запуск бота\n├── config.py — настройки из .env\n├── handlers/\n│   ├── __init__.py\n│   ├── start.py — команда /start\n│   ├── help.py — команда /help\n│   └── echo.py — эхо-ответ\n├── keyboards/\n│   ├── __init__.py\n│   └── main_menu.py — главное меню\n├── database/\n│   ├── __init__.py\n│   ├── engine.py — подключение к БД\n│   └── models.py — модели таблиц\n├── middlewares/\n│   └── db.py — middleware для сессий\n├── .env — токен и настройки\n└── requirements.txt — зависимости\n\nТакая структура позволяет разрабатывать бота в команде и легко добавлять новые функции.`,
        },
{
            id: "handlers",
            title: "Хендлеры: обработка команд и сообщений",
            content: `Хендлеры — это функции, которые реагируют на действия пользователя. В Aiogram 3 хендлеры регистрируются через роутеры.

:::conversion
**Не хотите разбираться в коде?**
Я разработаю профессионального Telegram-бота на Python с полным исходным кодом.
Стоимость от 15 000 ₽. Сроки от 3 дней.
[Обсудить проект →](https://t.me/dima_razrab)
:::`,
            subsections: [
                {
                    title: "Обработка команд",
                    content: `Команды — это сообщения, начинающиеся с /. Примеры: /start, /help, /menu, /order. Обработчик команды:\n\n@router.message(Command(\"start\"))\nasync def cmd_start(message: Message):\n    await message.answer(\"Добро пожаловать!\", reply_markup=main_menu_kb())\n\n@router.message(Command(\"help\"))\nasync def cmd_help(message: Message):\n    await message.answer(\"Доступные команды:\\n/start — начать\\n/menu — меню\\n/help — помощь\")`,
                },
                {
                    title: "Обработка текстовых сообщений",
                    content: `Для обработки обычного текста используйте фильтры:\n\n@router.message(F.text == \"📋 Меню\")\nasync def show_menu(message: Message):\n    await message.answer(\"Выберите категорию:\", reply_markup=categories_kb())\n\n@router.message(F.text)\nasync def echo(message: Message):\n    await message.answer(f\"Вы написали: {message.text}\")\n\nВажно: хендлеры обрабатываются сверху вниз. Ставьте более специфичные фильтры выше общих, иначе общий хендлер «съест» все сообщения.`,
                },
                {
                    title: "Callback-хендлеры (кнопки)",
                    content: `Когда пользователь нажимает инлайн-кнопку, генерируется callback_query:\n\n@router.callback_query(F.data.startswith(\"category_\"))\nasync def show_category(callback: CallbackQuery):\n    category_id = callback.data.split(\"_\")[1]\n    # Получаем товары из БД\n    products = await get_products_by_category(category_id)\n    await callback.message.answer(f\"Товары категории {category_id}:\")\n    await callback.answer()  # Обязательно! Убирает «часики» на кнопке`,
                },
            ],
        }
];
