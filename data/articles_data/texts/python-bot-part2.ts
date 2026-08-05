import { ArticleSection } from '../types';

/* ============================================================
   Статья: pythonBot
   Часть 2/2: Секции 8-13
   ============================================================ */

export const pythonBotPart2: ArticleSection[] = [
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

Установка: pip install sqlalchemy asyncpg\n\nМодель пользователя:\n\nfrom sqlalchemy import Column, Integer, BigInteger, String, DateTime\nfrom sqlalchemy.ext.declarative import declarative_base\nfrom datetime import datetime\n\nBase = declarative_base()\n\nclass User(Base):\n    __tablename__ = \"users\"\n    \n    id = Column(Integer, primary_key=True)\n    telegram_id = Column(BigInteger, unique=True, nullable=False)\n    username = Column(String, nullable=True)\n    full_name = Column(String, nullable=True)\n    created_at = Column(DateTime, default=datetime.utcnow)\n\nПодключение к базе:\n\nfrom sqlalchemy.ext.asyncio import create_async_engine, AsyncSession\nfrom sqlalchemy.orm import sessionmaker\n\nDATABASE_URL = \"postgresql+asyncpg://user:password@localhost:5432/bot_db\"\n\nengine = create_async_engine(DATABASE_URL)\nasync_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)\n\nВ middleware создаём сессию для каждого сообщения и передаём её в хендлер. Таким образом хендлер может обращаться к базе данных без глобальных переменных.

> 💰 **Хотите точную смету?** Расскажите о задаче — подготовлю оценку за 24 часа. [Заказать оценку](/razrabotka-botov).`,
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

Логирование: используйте модуль logging вместо print(). Логи записываются в файл и помогают отладить проблемы в продакшене.\n\nimport logging\nlogging.basicConfig(level=logging.INFO, filename=\"bot.log\")\nlogger = logging.getLogger(__name__)\n\n@router.message()\nasync def handle_all(message: Message):\n    try:\n        # Логика обработки\n        pass\n    except Exception as e:\n        logger.error(f\"Ошибка: {e}\", exc_info=True)\n        await message.answer(\"Произошла ошибка. Попробуйте позже.\")\n\nГлобальный обработчик ошибок:\n\n@dp.error()\nasync def error_handler(event: ErrorEvent):\n    logger.critical(f\"Критическая ошибка: {event.exception}\")\n    return True  # Подавить ошибку\n\nRetry при сетевых ошибках: используйте aiohttp с автоматическим retry для запросов к внешним API. Не позволяйте временному сбою сети сломать весь диалог.\n\n:::readmore\nЧитать дальше\n• [Aiogram vs Pyrogram](/blog/aiogram-vs-pyrogram)\n• [Telegram бот для бизнеса](/blog/telegram-bot-dlya-biznesa)\n• [Стоимость разработки Telegram бота](/blog/stoimost-razrabotki)\n• [AI Telegram бот для бизнеса](/blog/ai-telegram-bot-dlya-biznesa)\n• [Python-разработка под ключ](/blog/python-razrabotka-pod-klyuch)\n• [Заказать разработку Telegram-бота →](/razrabotka-botov)\n:::\n\n:::conversion\n**Готовы заказать Telegram-бота?**\n✅ Бесплатная консультация\n✅ Бесплатная поддержка 30 дней\n✅ Полный исходный код на Python\n[Написать мне в Telegram прямо сейчас →](https://t.me/developer_telegrams)\n:::`,
        }
];
