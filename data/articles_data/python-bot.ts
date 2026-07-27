import { Article, makeArticleSchema } from './types';

export const articlePythonBot: Article = {
    slug: "kak-sdelat-telegram-bota-na-python",
    title: "Как сделать Telegram бота на Python — пошаговое руководство 2025 | DimaRazrab",
    metaDescription: "Пошаговое руководство: как сделать Telegram бота на Python с нуля. Aiogram, python-telegram-bot, webhook, база данных. Код, примеры, деплой.",
    keywords: "как сделать телеграм бота на python, telegram бот python, создать бота telegram python, python telegram бот урок, aiogram tutorial, разработка telegram бота python, бот telegram python пошагово",
    h1: "Как сделать Telegram бота на Python: пошаговое руководство для начинающих",
    ogTitle: "Как сделать Telegram бота на Python — пошаговое руководство",
    ogDescription: "Полный гайд по созданию Telegram-бота на Python: от регистрации бота до деплоя на сервер. Aiogram 3, база данных, webhook.",
    canonical: "https://dima-razrab.com/blog/kak-sdelat-telegram-bota-na-python",
    heroBadge: "🐍 Python • Пошаговый гайд • 2025",
    heroSubtitle: "Научитесь создавать Telegram-ботов на Python с нуля. От простого echo-бота до полноценного приложения с базой данных и деплоем.",
    readingTime: "18 мин чтения",
    wordCount: "~4500 слов",
    publishDate: "2025-03-01",
    modifiedDate: "2025-07-27",
    author: "Дмитрий Малышев",

    toc: [
        { id: "why-python", title: "Почему Python для ботов" },
        { id: "preparation", title: "Подготовка окружения" },
        { id: "botfather", title: "Регистрация бота в BotFather" },
        { id: "first-bot", title: "Первый бот: Hello World" },
        { id: "frameworks", title: "Обзор фреймворков" },
        { id: "aiogram", title: "Бот на Aiogram 3" },
        { id: "handlers", title: "Хендлеры и команды" },
        { id: "keyboards", title: "Клавиатуры и кнопки" },
        { id: "database", title: "Подключение базы данных" },
        { id: "states", title: "Машина состояний (FSM)" },
        { id: "webhook", title: "Webhook vs Polling" },
        { id: "deploy", title: "Деплой на сервер" },
        { id: "errors", title: "Обработка ошибок" },
        { id: "faq", title: "Частые вопросы" },
    ],

    sections: [
        {
            id: "why-python",
            title: "Почему Python — лучший язык для Telegram-ботов",
            content: `Python — самый популярный язык для разработки Telegram-ботов, и на это есть веские причины.

Во-первых, простота синтаксиса. Python читается почти как английский текст. Даже если вы новичок в программировании, вы сможете написать работающего бота за несколько часов.

Во-вторых, богатая экосистема. Для Telegram есть несколько成熟 фреймворков: aiogram, python-telegram-bot, telebot (pyTelegramBotAPI). Каждый решает разные задачи — от простых ботов до сложных систем с middleware и FSM.

В-третьих, огромное сообщество. Тысячи готовых примеров, туториалов и библиотек. Если у вас возникнет проблема — ответ уже есть на Stack Overflow или в Telegram-каналах разработчиков.

В-четвёртых, интеграции. Python легко интегрируется с базами данных (PostgreSQL, MongoDB, SQLite), платёжными системами, CRM, API внешних сервисов. Это позволяет создавать не просто ботов, а полноценные бизнес-инструменты.

По данным GitHub, более 60% всех Telegram-ботов написаны на Python. Это значит, что вам доступны готовые решения для практически любой задачи.`,
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

Шаг 3: BotFather спросит username бота — это уникальный идентификатор, который заканчивается на «bot». Например: my_shop_2025_bot.

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
                    content: `import asyncio\nfrom aiogram import Bot, Dispatcher, Router, F\nfrom aiogram.types import Message\n\nBOT_TOKEN = \"ВАШ_ТОКЕН\"\n\nbot = Bot(token=BOT_TOKEN)\ndp = Dispatcher()\nrouter = Router()\n\n@router.message(F.text == \"/start\")\nasync def cmd_start(message: Message):\n    await message.answer(\"Привет! Я ваш первый бот! 🤖\")\n\ndp.include_router(router)\n\nasync def main():\n    await dp.start_polling(bot)\n\nif __name__ == \"__main__\":\n    asyncio.run(main())\n\nЗапустите: python main.py. Откройте Telegram, найдите своего бота и отправьте /start. Бот ответит!`,
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
                    content: `Асинхронный фреймворк, самый популярный в 2025 году. Поддерживает FSM (машину состояний), middleware, роутеры, inline-кнопки, медиа-группы. Быстрый, хорошо документированный, активное сообщество. Идеален для ботов любой сложности — от простых до enterprise-уровня. Работает на asyncio.`,
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
            content: `Хендлеры — это функции, которые реагируют на действия пользователя. В Aiogram 3 хендлеры регистрируются через роутеры.`,
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
        },
        {
            id: "keyboards",
            title: "Клавиатуры и кнопки в Telegram-боте",
            content: `Клавиатуры — основной способ взаимодействия с пользователем. В Telegram есть два типа клавиатур.`,
            subsections: [
                {
                    title: "Reply-клавиатуры (обычные кнопки)",
                    content: `Reply-клавиатура появляется вместо стандартной клавиатуры ввода. Кнопки отправляют текст как обычное сообщение.\n\nfrom aiogram.types import ReplyKeyboardMarkup, KeyboardButton\n\nmain_menu_kb = ReplyKeyboardMarkup(\n    keyboard=[\n        [KeyboardButton(text=\"📋 Меню\"), KeyboardButton(text=\"📞 Контакты\")],\n        [KeyboardButton(text=\"🛒 Корзина\"), KeyboardButton(text=\"❓ Помощь\")],\n    ],\n    resize_keyboard=True,  # Автоматический размер\n)\n\nawait message.answer(\"Выберите действие:\", reply_markup=main_menu_kb)`,
                },
                {
                    title: "Inline-клавиатуры",
                    content: `Inline-клавиатура прикрепляется к сообщению. Кнопки не отправляют текст, а генерируют callback-запрос.\n\nfrom aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton\n\nproducts_kb = InlineKeyboardMarkup(\n    inline_keyboard=[\n        [InlineKeyboardButton(text=\"Товар 1 — 1000₽\", callback_data=\"product_1\")],\n        [InlineKeyboardButton(text=\"Товар 2 — 2000₽\", callback_data=\"product_2\")],\n        [InlineKeyboardButton(text=\"🛒 В корзину\", callback_data=\"add_to_cart\")],\n    ]\n)\n\nawait message.answer(\"Выберите товар:\", reply_markup=products_kb)`,
                },
            ],
        },
        {
            id: "database",
            title: "Подключение базы данных: SQLAlchemy + PostgreSQL",
            content: `Любой серьёзный бот работает с базой данных. Без неё вы не сможете хранить пользователей, заказы, товары и настройки.

Для работы с БД используем SQLAlchemy — самый популярный ORM для Python. Он позволяет работать с таблицами через Python-объекты, без написания SQL-запросов.

Установка: pip install sqlalchemy asyncpg\n\nМодель пользователя:\n\nfrom sqlalchemy import Column, Integer, BigInteger, String, DateTime\nfrom sqlalchemy.ext.declarative import declarative_base\nfrom datetime import datetime\n\nBase = declarative_base()\n\nclass User(Base):\n    __tablename__ = \"users\"\n    \n    id = Column(Integer, primary_key=True)\n    telegram_id = Column(BigInteger, unique=True, nullable=False)\n    username = Column(String, nullable=True)\n    full_name = Column(String, nullable=True)\n    created_at = Column(DateTime, default=datetime.utcnow)\n\nПодключение к базе:\n\nfrom sqlalchemy.ext.asyncio import create_async_engine, AsyncSession\nfrom sqlalchemy.orm import sessionmaker\n\nDATABASE_URL = \"postgresql+asyncpg://user:password@localhost:5432/bot_db\"\n\nengine = create_async_engine(DATABASE_URL)\nasync_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)\n\nВ middleware создаём сессию для каждого сообщения и передаём её в хендлер.这样 хендлер может обращаться к базе данных без глобальных переменных.`,
        },
        {
            id: "states",
            title: "Машина состояний (FSM): сбор данных пошагово",
            content: `FSM (Finite State Machine) — это механизм, который позволяет собирать данные от пользователя пошагово. Например: «Введите имя» → «Введите телефон» → «Выберите услугу» → «Подтвердите заказ».

В Aiogram 3 FSM реализован через классы состояний:\n\nfrom aiogram.fsm.state import State, StatesGroup\n\nclass OrderStates(StatesGroup):\n    waiting_for_name = State()\n    waiting_for_phone = State()\n    waiting_for_address = State()\n    confirmation = State()\n\nХендлер, запускающий FSM:\n\n@router.message(F.text == \"🛒 Оформить заказ\")\nasync def start_order(message: Message, state: FSMContext):\n    await state.set_state(OrderStates.waiting_for_name)\n    await message.answer(\"Как вас зовут?\")\n\nХендлер для следующего шага:\n\n@router.message(OrderStates.waiting_for_name)\nasync def process_name(message: Message, state: FSMContext):\n    await state.update_data(name=message.text)\n    await state.set_state(OrderStates.waiting_for_phone)\n    await message.answer(\"Введите номер телефона:\")\n\nПолучение данных:\n\n@router.message(OrderStates.waiting_for_phone)\nasync def process_phone(message: Message, state: FSMContext):\n    data = await state.get_data()\n    name = data[\"name\"]\n    phone = message.text\n    await state.clear()  # Очищаем состояние\n    await message.answer(f\"Заказ оформлен!\\nИмя: {name}\\nТелефон: {phone}\")`,
        },
        {
            id: "webhook",
            title: "Webhook vs Polling: какой режим запуска выбрать",
            content: `Telegram-бот может работать в двух режимах: polling и webhook. Выбор зависит от задач.`,
            subsections: [
                {
                    title: "Polling (опрос)",
                    content: `Бот периодически опрашивает сервер Telegram: «Есть новые сообщения?». Прост в настройке, не требует сервера с публичным IP. Идеален для разработки и небольших ботов. Минус: небольшая задержка (1-2 секунды), нагрузка на сервер при большом количестве пользователей.\n\nЗапуск: await dp.start_polling(bot)`,
                },
                {
                    title: "Webhook (вебхук)",
                    content: `Telegram отправляет сообщения на ваш сервер сразу при их поступлении. Мгновенная реакция, меньше нагрузки. Требует сервер с публичным IP и HTTPS-сертификатом. Идеален для продакшена и ботов с большой нагрузкой.\n\nНастройка webhook в Aiogram 3:\n\nfrom aiogram.webhook.aiohttp_server import setup_application\nfrom aiohttp import web\n\napp = web.Application()\ndp.startup.register(on_startup)\nsetup_application(app, dp, path=\"/webhook\")\nweb.run_app(app, host=\"0.0.0.0\", port=8443)\n\nTelegram отправит POST-запрос на https://your-server.com/webhook при каждом сообщении.`,
                },
            ],
        },
        {
            id: "deploy",
            title: "Деплой Telegram-бота на сервер",
            content: `После разработки бота нужно разместить его на сервере, чтобы он работал 24/7.`,
            subsections: [
                {
                    title: "VPS (рекомендуемый способ)",
                    content: `Арендуйте VPS: Timeweb от 149₽/мес, Selectel от 200₽/мес, Hetzner от 4€/мес. Установите Ubuntu 22.04, Python 3.10+, создайте systemd-сервис для автозапуска бота при перезагрузке сервера.\n\nПример systemd-сервиса:\n[Unit]\nDescription=Telegram Bot\nAfter=network.target\n\n[Service]\nUser=botuser\nWorkingDirectory=/home/botuser/bot\nExecStart=/home/botuser/bot/venv/bin/python main.py\nRestart=always\n\n[Install]\nWantedBy=multi-user.target\n\nКоманды: sudo systemctl enable bot && sudo systemctl start bot`,
                },
                {
                    title: "Railway / Render",
                    content: `Бесплатные платформы для деплоя. Подключаете GitHub-репозиторий — бот деплоится автоматически. Не нужно настраивать сервер вручную. Ограничения: бесплатный тариф имеет лимит часов работы (500 часов/мес на Railway). Хорошо для прототипов и учебных проектов.`,
                },
                {
                    title: "Docker",
                    content: `Docker контейнеризирует приложение: бот работает одинаково на любом сервере. Создайте Dockerfile:\n\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"python\", \"main.py\"]\n\nСоберите образ: docker build -t mybot .\nЗапустите: docker run -d --name mybot mybot`,
                },
            ],
        },
        {
            id: "errors",
            title: "Обработка ошибок и логирование",
            content: `Продакшен-бот должен gracefully обрабатывать ошибки. Вот основные практики.

Логирование: используйте модуль logging вместо print(). Логи записываются в файл и помогают отладить проблемы в продакшене.\n\nimport logging\nlogging.basicConfig(level=logging.INFO, filename=\"bot.log\")\nlogger = logging.getLogger(__name__)\n\n@router.message()\nasync def handle_all(message: Message):\n    try:\n        # Логика обработки\n        pass\n    except Exception as e:\n        logger.error(f\"Ошибка: {e}\", exc_info=True)\n        await message.answer(\"Произошла ошибка. Попробуйте позже.\")\n\nГлобальный обработчик ошибок:\n\n@dp.error()\nasync def error_handler(event: ErrorEvent):\n    logger.critical(f\"Критическая ошибка: {event.exception}\")\n    return True  # Подавить ошибку\n\nRetry при сетевых ошибках: используйте aiohttp с автоматическим retry для запросов к внешним API. Не позволяйте временному сбою сети сломать весь диалог.`,
        },
    ],

    faq: [
        {
            question: "Сколько времени нужно, чтобы научиться делать ботов на Python?",
            answer: "Если вы уже знаете Python базово — 1-2 дня на изучение aiogram и создание первого бота. Если Python не знаете — 1-2 недели на основы языка, затем 1-2 дня на бота.",
        },
        {
            question: "Бесплатно ли создание Telegram-бота?",
            answer: "Да! Регистрация бота через BotFather бесплатна. Библиотеки Python — open source. Для хостинга можно использовать бесплатные платы (Railway, Render) или дешёвый VPS (от 149₽/мес).",
        },
        {
            question: "Можно ли сделать бота без знания программирования?",
            answer: "Можно через конструкторы ботов (BotHelp, Manybot), но они сильно ограничены. Для бизнес-бота с CRM, оплатой и аналитикой нужна кастомная разработка.",
        },
        {
            question: "Какой фреймворк лучше: aiogram или python-telegram-bot?",
            answer: "Для большинства проектов рекомендую aiogram 3. Он быстрее (асинхронный), лучше документирован, больше готовых примеров на русском языке.",
        },
        {
            question: "Нужен ли мне сервер для бота?",
            answer: "Для разработки и тестирования — нет, достаточно вашего компьютера. Для продакшена (бот работает 24/7) — нужен сервер или хостинг. VPS от 149₽/мес.",
        },
        {
            question: "Python или Node.js — что лучше для Telegram-бота?",
            answer: "Python проще для начинающих, больше готовых решений и библиотек для Telegram. Node.js быстрее для real-time приложений. Для 90% ботов Python — оптимальный выбор.",
        },
    ],

    ctaTitle: "Нужен профессиональный Telegram-бот?",
    ctaSubtitle: "Создам бота на Python с базой данных, CRM-интеграцией и деплоем на сервер. Бесплатная оценка проекта.",
    ctaSource: "article-python-cta",

    structuredData: makeArticleSchema(
        "kak-sdelat-telegram-bota-na-python",
        "Как сделать Telegram бота на Python — пошаговое руководство 2025",
        "Пошаговое руководство: как сделать Telegram бота на Python с нуля. Aiogram 3, база данных, webhook, деплой.",
        "2025-03-01",
        "2025-07-27",
        [
            { name: "Сколько времени нужно чтобы научиться делать ботов на Python?", text: "1-2 дня если знаете Python, 1-2 недели если нет." },
            { name: "Бесплатно ли создание Telegram-бота?", text: "Да. Регистрация бесплатна, библиотеки open source, хостинг от 149₽/мес." },
            { name: "Можно ли сделать бота без знания программирования?", text: "Через конструкторы можно, но они ограничены. Для бизнеса нужна кастомная разработка." },
            { name: "Какой фреймворк лучше: aiogram или python-telegram-bot?", text: "Для большинства проектов рекомендую aiogram 3." },
            { name: "Нужен ли сервер для бота?", text: "Для продакшена — нужен VPS от 149₽/мес. Для тестирования — достаточно компьютера." },
        ],
        4500,
    ),
    internalLinks: [
        { anchor: "заказать разработку бота на Python", url: "/razrabotka-botov", context: "Не хотите разбираться сами?" },
        { anchor: "создать AI бота в Telegram", url: "/blog/kak-sozdat-ai-bot-telegram", context: "Хотите добавить искусственный интеллект?" },
        { anchor: "разработка бота под ключ", url: "/blog/razrabotka-telegram-bota-pod-klyuch", context: "Полный цикл от идеи до запуска" },
    ],
};
