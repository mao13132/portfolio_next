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
   HUB PAGE: Веб-разработка
   /blog/veb-razrabotka
   Кластер I — Веб-разработка
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/veb-razrabotka`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

/* Planned articles for this cluster */
const plannedArticles = [
    {
        slug: 'sajty-na-zakaz',
        title: 'Сайты на заказ: полное руководство по выбору разработчика и стоимости',
        description: 'Виды сайтов на заказ, стоимость от 15 000 ₽, этапы разработки, как выбрать разработчика. Реальные кейсы и конкретные цифры.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'sozdanie-lendinga',
        title: 'Создание лендинга: полное руководство по стоимости, платформам и конверсии',
        description: 'Как создать лендинг с конверсией 5-12%. Tilda vs WordPress vs код. Стоимость от 15 000 ₽. Этапы разработки, AI-инструменты, реальные кейсы.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'sozdanie-internet-magazina',
        title: 'Создание интернет-магазина на заказ: стоимость, платформы и этапы разработки',
        description: 'WooCommerce, Shopify, 1С-Битрикс, кастом. Стоимость от 80 000 ₽. Интеграции с 1С, CRM, платёжными системами. Реальные кейсы.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'sozdanie-sajta-kataloga',
        title: 'Создание сайта-каталога на заказ: стоимость, функции, примеры',
        description: 'Фильтры, карточки товаров, интеграция с 1С. Стоимость от 40 000 ₽. Отличия от интернет-магазина. Реальные кейсы.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'zakazat-sajt-na-tilde',
        title: 'Заказать сайт на Tilda: стоимость, сроки, когда это выгодно',
        description: 'Когда Tilda — лучший выбор, стоимость от 10 000 ₽, Tilda vs код. Реальные кейсы и примеры.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'zakazat-sajt-na-bitrix',
        title: 'Заказать сайт на 1С-Битрикс: стоимость, шаблоны и кастомная разработка',
        description: 'Шаблон vs кастом, интеграция с 1С, стоимость от 50 000 ₽. Реальные кейсы и примеры.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'razrabotka-sajta-pod-klyuch-veb',
        title: 'Разработка сайта под ключ: полное руководство по стоимости и этапам',
        description: 'Что входит в разработку сайта под ключ. Этапы, стоимость от 50 000 ₽, технологический стек (Next.js, Django, FastAPI). Реальные кейсы.',
        moneyPage: '/razrabotka-servisov',
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Веб-разработка: создание сайтов и приложений | DimaRazrab",
            "description": "Всё о веб-разработке: создание лендингов, корпоративных сайтов, веб-приложений. Стоимость, этапы, технологии, реальные кейсы. 7 подробных руководств от практикующего разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Веб-разработка"
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
                { "@type": "ListItem", "position": 3, "name": "Веб-разработка", "item": PAGE_URL },
            ],
        },
    ],
};

export default function VebRazrabotkaHubPage() {
    return (
        <>
            <Head>
                <title>Веб-разработка: создание сайтов и приложений | DimaRazrab</title>
                <meta name="description" content="Всё о веб-разработке: создание лендингов, корпоративных сайтов, веб-приложений. Стоимость, этапы, технологии, реальные кейсы от разработчика." />
                <meta name="keywords" content="веб-разработка, создание сайтов, разработка сайта под ключ, создание лендинга, корпоративный сайт, веб-приложения, Next.js, Django, FastAPI" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Веб-разработка: создание сайтов и приложений" />
                <meta property="og:description" content="7 руководств о веб-разработке: создание лендингов, корпоративных сайтов, веб-приложений. Стоимость, этапы, кейсы." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Веб-разработка: создание сайтов и приложений" />
                <meta name="twitter:description" content="7 руководств о веб-разработке: создание лендингов, корпоративных сайтов, веб-приложений." />
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
                            <span className={styles.breadcrumbCurrent}>Веб-разработка</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Веб-разработка: создание сайтов,
                            <br /><span className={styles.textAccent}>лендингов и веб-приложений</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о разработке сайтов: от создания лендинга с высокой конверсией
                            до полноценного веб-приложения на Next.js и Python. 7 руководств от практикующего разработчика.
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
                                Зачем бизнесу <span className={styles.textAccent}>профессиональная веб-разработка</span>
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Веб-разработка — это не просто «сделать сайт». Это создание инструмента, который приводит клиентов,
                                    автоматизирует процессы и увеличивает прибыль. Правильно разработанный сайт конвертирует
                                    5-12% посетителей в заявки, загружается менее чем за 1 секунду и занимает топовые позиции в поиске.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Современный стек технологий — Next.js для фронтенда, Python (Django, FastAPI) для бэкенда —
                                    обеспечивает максимальную производительность, SEO-оптимизацию и масштабируемость.
                                    Стоимость разработки стартует от 15 000 ₽ для лендинга и от 50 000 ₽ для сайта под ключ.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Ниже — 7 подробных руководств, которые помогут разобраться в теме.
                                    А если нужна помощь — <a href="/razrabotka-servisov" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите разработку</a> у профессионалов.
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
                                Нужен <span className={styles.textAccent}>сайт для бизнеса</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — разберём вашу задачу и подготовим точную смету за 24 часа.
                            </p>
                            <a
                                href="/razrabotka-servisov"
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
                                Заказать разработку сайта →
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
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/python-razrabotka">Python-разработка</a>
                                <a href="/blog/nextjs-razrabotka">Next.js-разработка</a>
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
