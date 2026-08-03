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
   HUB PAGE: Next.js разработка
   /blog/nextjs-razrabotka
   Кластер F — 3 запроса, 116 показов/мес
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/nextjs-razrabotka`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const plannedArticles = [
    {
        slug: 'razrabotka-na-nextjs',
        title: 'Разработка на Next.js: полный гайд для заказчика',
        description: 'Что такое Next.js и почему он подходит для коммерческих проектов. SSR, SSG, ISR — когда что использовать.',
        moneyPage: '/nextjs-razrabotka',
    },
    {
        slug: 'seo-na-nextjs',
        title: 'SEO на Next.js: как получить максимум из поисковых систем',
        description: 'Встроенная SEO-оптимизация Next.js: мета-теги, structured data, sitemap, рендеринг на сервере, Core Web Vitals.',
        moneyPage: '/nextjs-razrabotka',
    },
    {
        slug: 'saas-na-nextjs',
        title: 'SaaS на Next.js: архитектура и лучшие практики',
        description: 'Как построить SaaS-платформу на Next.js: аутентификация, multi-tenancy, подписки, дашборды, деплой.',
        moneyPage: '/nextjs-razrabotka',
    },
    {
        slug: 'nextjs-vs-react',
        title: 'Next.js vs React: что выбрать для вашего проекта',
        description: 'Сравнение Next.js и чистого React: рендеринг, SEO, производительность, экосистема, когда что использовать.',
        moneyPage: '/nextjs-razrabotka',
    },
    {
        slug: 'sozdanie-sajta-na-nextjs',
        title: 'Создание сайта на Next.js: от дизайна до деплоя',
        description: 'Пошаговый процесс создания сайта на Next.js: проектирование, дизайн, разработка, тестирование, запуск.',
        moneyPage: '/nextjs-razrabotka',
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Next.js разработка: полное руководство | DimaRazrab",
            "description": "Всё о разработке на Next.js: SEO, SaaS, архитектура, SSR/SSG. 5 руководств от практикующего разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Next.js разработка"
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
                { "@type": "ListItem", "position": 3, "name": "Next.js разработка", "item": PAGE_URL },
            ],
        },
    ],
};

export default function NextjsRazrabotkaHubPage() {
    return (
        <>
            <Head>
                <title>Next.js разработка: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё о разработке на Next.js: SEO, SaaS, архитектура, SSR/SSG, создание сайтов. 5 руководств от разработчика." />
                <meta name="keywords" content="next.js разработка, разработка на nextjs, seo nextjs, saas nextjs, nextjs vs react, создание сайта nextjs, next js разработчик" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Next.js разработка: полное руководство" />
                <meta property="og:description" content="5 руководств о разработке на Next.js: SEO, SaaS, архитектура, SSR/SSG." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Next.js разработка: полное руководство" />
                <meta name="twitter:description" content="5 руководств о разработке на Next.js: SEO, SaaS, архитектура, SSR/SSG." />
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
                            <span className={styles.breadcrumbCurrent}>Next.js разработка</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Next.js разработка:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о разработке на Next.js: SEO-оптимизация, SaaS-платформы,
                            SSR и SSG, архитектура и создание сайтов. 5 руководств от практикующего разработчика.
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
                                Почему Next.js — <span className={styles.textAccent}>лучший фреймворк</span> для веб-приложений
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Next.js — это React-фреймворк от Vercel, который стал стандартом для коммерческой веб-разработки.
                                    Он объединяет серверный рендеринг (SSR), статическую генерацию (SSG) и инкрементальную регенерацию (ISR),
                                    обеспечивая максимальную производительность и SEO-оптимизацию из коробки.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Главные преимущества Next.js: автоматическая оптимизация изображений, встроенная поддержка
                                    мета-тегов и structured data, маршрутизация на основе файловой системы, API Routes для backend-логики,
                                    и серверные компоненты для максимальной производительности. Сайты на Next.js загружаются за
                                    1-2 секунды и получают высокие оценки Core Web Vitals.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость разработки сайта на Next.js — от 30 000 ₽ за лендинг и до 500 000 ₽ за SaaS-платформу.
                                    Ниже — 5 руководств, которые помогут разобраться в теме.
                                    А если нужна помощь — <a href="/nextjs-razrabotka" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите разработку на Next.js</a> у профессионалов.
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
                                Нужен <span className={styles.textAccent}>сайт на Next.js</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — обсудим проект и подготовим точную смету за 24 часа.
                            </p>
                            <a
                                href="/nextjs-razrabotka"
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
                                Заказать сайт на Next.js →
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
                                <a href="/nextjs-razrabotka">Разработка на Next.js</a>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/python-razrabotka">Python-разработка</a>
                                <a href="/blog/razrabotka-api">Разработка API</a>
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
