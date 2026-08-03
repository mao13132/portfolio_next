import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { fadeUp } from '@/app/Components/Landing/animations';
import styles from './blog.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   HUB PAGE: Python-разработка
   /blog/python-razrabotka
   Кластер E — 10 запросов, 223 показов/мес
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/python-razrabotka`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const plannedArticles = [
    {
        slug: 'python-razrabotka-pod-klyuch',
        title: 'Python-разработка под ключ: от идеи до запуска',
        description: 'Полный цикл Python-разработки: проектирование, разработка, тестирование, деплой. Что нужно знать заказчику.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'fastapi-dlya-biznesa',
        title: 'FastAPI для бизнеса: почему это лучший выбор для API',
        description: 'Преимущества FastAPI для коммерческих проектов: скорость разработки, производительность, автоматическая документация.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'avtomatizaciya-biznesa-na-python',
        title: 'Автоматизация бизнеса на Python: скрипты и интеграции',
        description: 'Как Python автоматизирует бизнес-процессы: парсинг, интеграции, ETL, cron-задачи, работа с API.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'parsing-na-zakaz-python',
        title: 'Парсинг на заказ на Python: что нужно знать',
        description: 'Заказ парсера на Python: техническое задание, сроки, стоимость, выбор технологий и подходов.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'django-vs-fastapi',
        title: 'Django vs FastAPI: какой фреймворк выбрать',
        description: 'Сравнение Django и FastAPI: когда использовать каждый, плюсы и минусы, реальные кейсы из проектов.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'backend-razrabotka-python',
        title: 'Backend-разработка на Python: архитектура и лучшие практики',
        description: 'Проектирование backend на Python: архитектурные паттерны, микросервисы, базы данных, кеширование, безопасность.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'obrabotka-dannyh-python',
        title: 'Обработка данных на Python: pandas, аналитика, визуализация',
        description: 'Python для обработки данных: pandas, numpy, matplotlib. ETL-пайплайны, аналитические отчёты, дашборды.',
        moneyPage: '/python-razrabotka',
    },
    {
        slug: 'telegram-bot-na-python',
        title: 'Telegram-бот на Python: с чего начать',
        description: 'Разработка Telegram-бота на Python: aiogram vs pyrogram, архитектура, базы данных, деплой и мониторинг.',
        moneyPage: '/python-razrabotka',
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Python-разработка: полное руководство | DimaRazrab",
            "description": "Всё о Python-разработке: FastAPI, Django, парсинг, автоматизация, backend, обработка данных. 8 руководств от практикующего разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Python-разработка"
            },
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}#website`,
            "url": SITE_URL,
            "name": "DimaRazrab — Разработка Telegram-ботов",
            "inLanguage": "ru-RU",
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${PAGE_URL}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Блог", "item": `${SITE_URL}/blog` },
                { "@type": "ListItem", "position": 3, "name": "Python-разработка", "item": PAGE_URL },
            ],
        },
    ],
};

export default function PythonRazrabotkaHubPage() {
    return (
        <>
            <Head>
                <title>Python-разработка: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё о Python-разработке: FastAPI, Django, парсинг, автоматизация, backend, обработка данных. 8 руководств от разработчика." />
                <meta name="keywords" content="python разработка, python под ключ, fastapi разработка, django разработка, парсинг python, автоматизация python, backend python, обработка данных python" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Python-разработка: полное руководство" />
                <meta property="og:description" content="8 руководств о Python-разработке: FastAPI, Django, парсинг, автоматизация, backend, обработка данных." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Python-разработка: полное руководство" />
                <meta name="twitter:description" content="8 руководств о Python-разработке: FastAPI, Django, парсинг, автоматизация, backend." />
                <meta name="twitter:image" content={`${SITE_URL}/media/og_desc.jpg`} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className={styles.root}>
                <ClickComponent />
                <LandingHeader navLinks={NAV_LINKS} />
                <ScrollProgressBar />

                {/* ═══════ HERO ═══════ */}
                <section className={styles.hero}>
                    <ParticlesBg />
                    <div className={styles.heroGlow1} />
                    <div className={styles.heroGlow2} />

                    <div className={styles.container}>
                        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
                            <Link href="/">Главная</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <Link href="/blog">Блог</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <span className={styles.breadcrumbCurrent}>Python-разработка</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Python-разработка:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о Python-разработке: от выбора фреймворка до построения backend,
                            парсинга и автоматизации. 8 руководств от практикующего разработчика.
                        </motion.p>
                    </div>

                    <div className={styles.diagonalDivider} />
                </section>

                {/* ═══════ INTRO SEO TEXT ═══════ */}
                <section className={styles.articlesSection}>
                    <div className={styles.container}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                maxWidth: 800,
                                margin: '0 auto 60px',
                                background: 'var(--lp-glass-bg)',
                                border: '1px solid var(--lp-glass-border)',
                                borderRadius: 'var(--lp-radius-lg)',
                                padding: '40px 36px',
                                backdropFilter: 'blur(var(--lp-glass-blur))',
                                WebkitBackdropFilter: 'blur(var(--lp-glass-blur))',
                            }}
                        >
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', color: 'var(--lp-text)' }}>
                                Почему Python — <span className={styles.textAccent}>лидер</span> среди языков для автоматизации и backend
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Python — самый универсальный язык программирования для бизнеса. Он используется для
                                    backend-разработки (FastAPI, Django), парсинга данных, автоматизации бизнес-процессов,
                                    обработки и анализа данных, создания Telegram-ботов и AI-интеграций. По данным Stack Overflow,
                                    Python стабильно входит в тройку самых популярных языков в мире.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Главное преимущество Python — скорость разработки. Прототип готов за 1-3 дня, MVP — за 1-2 недели.
                                    Богатая экосистема библиотек (pandas, FastAPI, SQLAlchemy, aiogram) позволяет решать задачи
                                    любой сложности без изобретения велосипеда. Python идеально подходит для стартапов и
                                    малого бизнеса, где скорость вывода продукта на рынок критична.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость Python-разработки стартует от 15 000 ₽ за скрипт и доходит до 500 000 ₽ за
                                    полноценный backend. Ниже — 8 руководств, которые помогут разобраться в теме.
                                    А если нужна помощь — <a href="/python-razrabotka" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите разработку на Python</a> у профессионалов.
                                </p>
                            </div>
                        </motion.div>

                        {/* ═══════ ARTICLES GRID ═══════ */}
                        <div className={styles.articlesGrid}>
                            {plannedArticles.map((article, idx) => (
                                <motion.article
                                    key={article.slug}
                                    className={styles.articleCard}
                                    variants={fadeUp}
                                    custom={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <div className={styles.articleCardLink}>
                                        <div className={styles.articleCardTop}>
                                            <span className={styles.articleCardBadge}>
                                                📝 Скоро
                                            </span>
                                        </div>

                                        <h2 className={styles.articleCardTitle}>
                                            {article.title}
                                        </h2>

                                        <p className={styles.articleCardDesc}>
                                            {article.description}
                                        </p>

                                        <div className={styles.articleCardMeta}>
                                            <span style={{ color: 'var(--lp-text-dim)' }}>
                                                Готовится к публикации
                                            </span>
                                            <span className={styles.articleCardReadMore}>
                                                Скоро <i className="bx bx-right-arrow-alt" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* ═══════ CTA ═══════ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                maxWidth: 700,
                                margin: '60px auto 0',
                                textAlign: 'center',
                                background: 'var(--lp-glass-bg)',
                                border: '1px solid var(--lp-glass-border)',
                                borderRadius: 'var(--lp-radius-lg)',
                                padding: '40px 36px',
                                backdropFilter: 'blur(var(--lp-glass-blur))',
                                WebkitBackdropFilter: 'blur(var(--lp-glass-blur))',
                            }}
                        >
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: 'var(--lp-text)' }}>
                                Нужна <span className={styles.textAccent}>разработка на Python</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — обсудим вашу задачу и подготовим точную смету за 24 часа.
                            </p>
                            <a
                                href="/python-razrabotka"
                                style={{
                                    display: 'inline-block',
                                    padding: '14px 36px',
                                    background: 'linear-gradient(135deg, var(--lp-cyan), var(--lp-purple))',
                                    borderRadius: 'var(--lp-radius-sm)',
                                    color: '#fff',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Заказать разработку на Python →
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ FOOTER ═══════ */}
                <footer className={styles.footer}>
                    <div className={styles.containerWide}>
                        <div className={styles.footerGrid}>
                            <div>
                                <a href="/" className={ls.logo}>
                                    <span className={ls.logoAccent}>D</span>imaRazrab
                                </a>
                                <p className={styles.footerDesc}>
                                    Разработка ботов, сервисов, автоматизация и веб-приложения для бизнеса.
                                </p>
                            </div>
                            <div>
                                <h4>Навигация</h4>
                                <a href="/">Главная</a>
                                <a href="/python-razrabotka">Python-разработка</a>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/razrabotka-api">Разработка API</a>
                                <a href="/blog/parsery-marketplejsov">Парсеры маркетплейсов</a>
                                <a href="/blog">Все статьи блога</a>
                            </div>
                            <div>
                                <h4>Связаться</h4>
                                <a href="https://t.me/developer_telegrams" target="_blank" rel="noopener noreferrer">
                                    Telegram: @developer_telegrams
                                </a>
                                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                                    Политика конфиденциальности
                                </a>
                            </div>
                        </div>
                        <div className={styles.footerBottom}>
                            <p>© {new Date().getFullYear()} Дмитрий Малышев. Все права защищены.</p>
                            <p>Самозанятый • Малышев Дмитрий • ИНН: 511690069470</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
