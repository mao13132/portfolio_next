import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { articles } from '@/data/articles';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { fadeUp, scaleIn } from '@/app/Components/Landing/animations';
import styles from './blog.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   BLOG INDEX PAGE
   /blog
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Блог — Telegram-боты, автоматизация, разработка | DimaRazrab",
            "description": "Полезные статьи о Telegram-ботах, автоматизации бизнеса и разработке. Руководства, кейсы, советы от разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
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
                { "@type": "ListItem", "position": 2, "name": "Блог", "item": PAGE_URL },
            ],
        },
    ],
};

export default function BlogIndexPage() {
    return (
        <>
            <Head>
                <title>Блог о Telegram-ботах и автоматизации бизнеса | DimaRazrab</title>
                <meta name="description" content="Полезные статьи о Telegram-ботах, автоматизации бизнеса и разработке. Руководства, кейсы, расчёт стоимости, советы от практикующего разработчика." />
                <meta name="keywords" content="блог о telegram ботах, автоматизация бизнеса статьи, разработка ботов руководство, telegram бот для бизнеса, чат-боты статьи" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Блог о Telegram-ботах и автоматизации бизнеса" />
                <meta property="og:description" content="Полезные статьи о Telegram-ботах, автоматизации и разработке. Руководства и кейсы." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />

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
                        {/* Breadcrumbs */}
                        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
                            <Link href="/">Главная</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <span className={styles.breadcrumbCurrent}>Блог</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Блог о <span className={styles.textAccent}>Telegram-ботах</span>
                            <br />и автоматизации бизнеса
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Полезные руководства, реальные кейсы и практические советы
                            по созданию Telegram-ботов для бизнеса
                        </motion.p>
                    </div>

                    <div className={styles.diagonalDivider} />
                </section>

                {/* ═══════ ARTICLES GRID ═══════ */}
                <section className={styles.articlesSection}>
                    <div className={styles.container}>
                        <div className={styles.articlesGrid}>
                            {articles.map((article, idx) => (
                                <motion.article
                                    key={article.slug}
                                    className={styles.articleCard}
                                    variants={fadeUp}
                                    custom={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <Link href={`/blog/${article.slug}`} className={styles.articleCardLink}>
                                        <div className={styles.articleCardTop}>
                                            <span className={styles.articleCardBadge}>
                                                {article.readingTime}
                                            </span>
                                            <span className={styles.articleCardWords}>
                                                {article.wordCount}
                                            </span>
                                        </div>

                                        <h2 className={styles.articleCardTitle}>
                                            {article.h1.split(':')[0]}
                                        </h2>

                                        <p className={styles.articleCardSubtitle}>
                                            {article.h1.split(':')[1]?.trim() || article.heroSubtitle}
                                        </p>

                                        <p className={styles.articleCardDesc}>
                                            {article.metaDescription}
                                        </p>

                                        <div className={styles.articleCardMeta}>
                                            <span>
                                                <i className="bx bx-calendar" />
                                                {new Date(article.modifiedDate).toLocaleDateString('ru-RU', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <span className={styles.articleCardReadMore}>
                                                Читать статью <i className="bx bx-right-arrow-alt" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
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
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                                <a href="/razrabotka-crm">Разработка CRM</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            </div>
                            <div>
                                <h4>Блог</h4>
                                {articles.map((a) => (
                                    <a key={a.slug} href={`/blog/${a.slug}`}>
                                        {a.h1.split(':')[0]}
                                    </a>
                                ))}
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
