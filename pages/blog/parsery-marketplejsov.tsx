import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { fadeUp } from '@/app/Components/Landing/animations';
import styles from './blog.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   HUB PAGE: Парсинг маркетплейсов
   /blog/parsery-marketplejsov
   Кластер B — 46 запросов, ~3,680 показов/мес
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/parsery-marketplejsov`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

/* Planned articles for this cluster (stubs until content is written) */
const plannedArticles = [
    {
        slug: 'parser-wildberries',
        title: 'Парсер Wildberries: как собрать данные о товарах',
        description: 'Пошаговое руководство по парсингу товаров Wildberries: цены, остатки, отзывы, продажи. Python + API Wildberries.',
        moneyPage: '/parsery-marketplejsov',
    },
    {
        slug: 'parser-ozon',
        title: 'Парсер Ozon: сбор данных и аналитика',
        description: 'Как парсить товары Ozon: мониторинг цен конкурентов, анализ ассортимента, автоматический сбор данных через API.',
        moneyPage: '/parsery-marketplejsov',
    },
    {
        slug: 'parser-avito',
        title: 'Парсер Avito: автоматический сбор объявлений',
        description: 'Руководство по парсингу Avito: сбор контактов, мониторинг новых объявлений, фильтрация по параметрам.',
        moneyPage: '/parsery-marketplejsov',
    },
    {
        slug: 'monitoring-cen-marketplejsov',
        title: 'Мониторинг цен на маркетплейсах',
        description: 'Как настроить автоматический мониторинг цен Wildberries и Ozon. Уведомления, дашборды, аналитика.',
        moneyPage: '/parsery-marketplejsov',
    },
    {
        slug: 'repricer-dlya-marketplejsov',
        title: 'Repricer: автоматическое изменение цен на маркетплейсах',
        description: 'Что такое repricer и как он помогает продавцам. Автоматическая реакция на цены конкурентов.',
        moneyPage: '/parsery-marketplejsov',
    },
    {
        slug: 'api-wildberries-dlya-sellerov',
        title: 'API Wildberries для селлеров: полный гайд',
        description: 'Как использовать API Wildberries для автоматизации: аналитика, управление товарами, отчёты о продажах.',
        moneyPage: '/parsery-marketplejsov',
    },
    {
        slug: 'analitika-marketplejsov',
        title: 'Аналитика маркетплейсов: инструменты и метрики',
        description: 'Обзор инструментов аналитики Wildberries, Ozon, Avito. Как принимать решения на основе данных.',
        moneyPage: '/parsery-marketplejsov',
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Парсинг маркетплейсов: полное руководство | DimaRazrab",
            "description": "Всё о парсинге маркетплейсов: Wildberries, Ozon, Avito. Мониторинг цен, repricer, аналитика, API. 7 подробных руководств от практикующего разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Парсинг маркетплейсов"
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
                { "@type": "ListItem", "position": 3, "name": "Парсинг маркетплейсов", "item": PAGE_URL },
            ],
        },
    ],
};

export default function ParseryMarketplejsovHubPage() {
    return (
        <>
            <Head>
                <title>Парсинг маркетплейсов: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё о парсинге маркетплейсов: Wildberries, Ozon, Avito. Мониторинг цен, repricer, аналитика, API. 7 руководств от разработчика." />
                <meta name="keywords" content="парсер wildberries, парсер ozon, парсер avito, мониторинг цен маркетплейс, repricer, api wildberries, аналитика маркетплейсов, парсинг товаров" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Парсинг маркетплейсов: полное руководство" />
                <meta property="og:description" content="7 руководств о парсинге маркетплейсов: Wildberries, Ozon, Avito. Мониторинг цен, repricer, аналитика." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Парсинг маркетплейсов: полное руководство" />
                <meta name="twitter:description" content="7 руководств о парсинге маркетплейсов: Wildberries, Ozon, Avito. Мониторинг цен, repricer, аналитика." />
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
                            <span className={styles.breadcrumbCurrent}>Парсинг маркетплейсов</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Парсинг маркетплейсов:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о парсинге маркетплейсов: от сбора данных Wildberries и Ozon
                            до автоматического repricer и аналитики. 7 руководств от практикующего разработчика.
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
                                Зачем парсить маркетплейсы в <span className={styles.textAccent}>2026 году</span>
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Парсинг маркетплейсов — это ключ к конкурентному преимуществу на Wildberries, Ozon и Avito.
                                    Селлеры, которые принимают решения на основе данных, а не интуиции, увеличивают прибыль на 30-80%.
                                    Автоматический сбор цен, мониторинг остатков конкурентов, анализ отзывов и трендов — всё это
                                    доступно с помощью правильно настроенного парсера.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Ручной мониторинг — это десятки часов в неделю на копирование данных в таблицы. Автоматический
                                    парсер делает это за минуты и работает 24/7. Repricer автоматически корректирует цены в ответ
                                    на действия конкурентов, а аналитические дашборды показывают реальную картину рынка.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость разработки парсера стартует от 15 000 ₽, а окупаемость — от 1 до 7 дней.
                                    Ниже — 7 руководств, которые помогут разобраться в теме.
                                    А если нужна помощь — <a href="/parsery-marketplejsov" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите парсер</a> у профессионалов.
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
                                Нужен <span className={styles.textAccent}>парсер маркетплейсов</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — разберём вашу задачу и подготовим точную смету за 24 часа.
                            </p>
                            <a
                                href="/parsery-marketplejsov"
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
                                Заказать парсер →
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
                                <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/python-razrabotka">Python-разработка</a>
                                <a href="/blog/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
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

            <TelegramFloat />
        </>
    );
}
