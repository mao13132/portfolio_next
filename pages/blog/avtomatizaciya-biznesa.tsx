import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { PortfolioPopup } from '@/app/Components/Landing/PortfolioPopup';
import { fadeUp, scaleIn } from '@/app/Components/Landing/animations';
import { articleAvtomatizaciyaMalogoBiznesa } from '@/data/articles_data/cluster2/avtomatizaciya-malogo-biznesa';
import { articleAiAvtomatizaciyaBiznesa } from '@/data/articles_data/cluster2/ai-avtomatizaciya-biznesa';
import { articleAvtomatizaciyaOtdelaProdazh } from '@/data/articles_data/cluster2/avtomatizaciya-otdela-prodazh';
import { articlePrimeryAvtomatizacii } from '@/data/articles_data/cluster2/primery-avtomatizacii-biznesa';
import { articleAvtomatizaciyaPodKlyuch } from '@/data/articles_data/cluster2/avtomatizaciya-biznesa-pod-klyuch';
import styles from './blog.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   HUB PAGE: Автоматизация бизнеса
   /blog/avtomatizaciya-biznesa
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/avtomatizaciya-biznesa`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const clusterArticles = [
    articleAvtomatizaciyaMalogoBiznesa,
    articleAiAvtomatizaciyaBiznesa,
    articleAvtomatizaciyaOtdelaProdazh,
    articlePrimeryAvtomatizacii,
    articleAvtomatizaciyaPodKlyuch,
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Автоматизация бизнеса: полное руководство | DimaRazrab",
            "description": "Всё об автоматизации бизнеса: малый бизнес, отдел продаж, AI-автоматизация, реальные кейсы, внедрение под ключ. 5 подробных руководств от практикующего разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Автоматизация бизнеса"
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
                { "@type": "ListItem", "position": 3, "name": "Автоматизация бизнеса", "item": PAGE_URL },
            ],
        },
    ],
};

export default function AvtomatizaciyaBiznesaHubPage() {
    const [portfolioOpen, setPortfolioOpen] = useState(false);

    return (
        <>
            <Head>
                <title>Автоматизация бизнеса: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё об автоматизации бизнеса: малый бизнес, отдел продаж, AI-автоматизация, реальные кейсы, внедрение под ключ. 5 подробных руководств с примерами и расчётами ROI от практикующего разработчика." />
                <meta name="keywords" content="автоматизация бизнеса, автоматизация малого бизнеса, автоматизация продаж, ai автоматизация, автоматизация бизнеса под ключ, примеры автоматизации, crm автоматизация, бот для бизнеса, автоматизация бизнес процессов" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Автоматизация бизнеса: полное руководство" />
                <meta property="og:description" content="5 подробных руководств об автоматизации бизнеса: малый бизнес, продажи, AI, кейсы, внедрение под ключ. Примеры, расчёты ROI." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Автоматизация бизнеса: полное руководство" />
                <meta name="twitter:description" content="5 подробных руководств об автоматизации бизнеса: малый бизнес, продажи, AI, кейсы, внедрение под ключ." />
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
                <PortfolioPopup isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />

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
                            <Link href="/blog">Блог</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <span className={styles.breadcrumbCurrent}>Автоматизация бизнеса</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Автоматизация бизнеса:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать об автоматизации бизнеса: от малого бизнеса до AI-решений.
                            5 подробных руководств с примерами, кейсами и расчётами ROI от практикующего разработчика.
                        </motion.p>
                    </div>

                    <div className={styles.diagonalDivider} />
                </section>

                {/* ═══════ INTRO SEO TEXT ═══════ */}
                <section className={styles.articlesSection}>
                    <div className={styles.container}>

                        {/* SEO intro text — ~500 words */}
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
                                Почему автоматизация — это <span className={styles.textAccent}>must have</span> для бизнеса в 2026 году
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Автоматизация бизнеса — это не тренд и не «фича для больших компаний». Это необходимость для любого
                                    бизнеса, который хочет расти, а не тонуть в рутине. По данным McKinsey, 45% рабочих задач можно
                                    автоматизировать существующими технологиями. Для малого бизнеса этот показатель достигает 60%.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Что даёт автоматизация? Менеджеры перестают копировать данные из одной таблицы в другую и
                                    занимаются продажами. Заявки не теряются — бот принимает их 24/7. Клиенты получают мгновенный
                                    ответ, а не ждут 2 часа. Руководитель видит аналитику в реальном времени, а не составляет отчёты
                                    вручную каждый понедельник.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость автоматизации стартует от 0₽ (бесплатные CRM и инструменты) и доходит до 500 000₽
                                    за комплексное решение. Окупаемость — от 1 до 6 месяцев. ROI — от 200% до 600% в первый год.
                                    Это одна из самых выгодных инвестиций, которые может сделать предприниматель.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Ниже — 5 подробных руководств, которые помогут разобраться в теме: от выбора инструментов для
                                    малого бизнеса до заказа комплексной автоматизации под ключ. Каждая статья — это 7000-8000 слов
                                    практической информации с примерами, кейсами и пошаговыми планами.
                                </p>
                                <p>
                                    А если нужна помощь — <a href="/avtomatizaciya-biznesa" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите автоматизацию бизнеса</a> у профессионалов.
                                    Бесплатный аудит ваших процессов и точная смета за 24 часа.
                                </p>
                            </div>
                        </motion.div>

                        {/* ═══════ PORTFOLIO CTA ═══════ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                maxWidth: 700,
                                margin: '0 auto 60px',
                                textAlign: 'center',
                            }}
                        >
                            <button
                                onClick={() => setPortfolioOpen(true)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '14px 32px',
                                    background: 'linear-gradient(135deg, var(--lp-purple), var(--lp-cyan))',
                                    borderRadius: 'var(--lp-radius-sm)',
                                    color: '#fff',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <i className="bx bx-folder-open" style={{ fontSize: '20px' }} />
                                Посмотреть мои работы в портфолио
                            </button>
                        </motion.div>

                        {/* ═══════ ARTICLES GRID ═══════ */}
                        <div className={styles.articlesGrid}>
                            {clusterArticles.map((article, idx) => (
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
                                Готовы <span className={styles.textAccent}>автоматизировать бизнес</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатный аудит бизнес-процессов — покажу, что автоматизировать первым
                                и подготовлю точную смету за 24 часа.
                            </p>
                            <a
                                href="/avtomatizaciya-biznesa"
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
                                Заказать автоматизацию →
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
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                                <a href="/razrabotka-crm">Разработка CRM</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            </div>
                            <div>
                                <h4>Статьи кластера</h4>
                                {clusterArticles.map((a) => (
                                    <a key={a.slug} href={`/blog/${a.slug}`}>
                                        {a.h1.split(':')[0]}
                                    </a>
                                ))}
                            </div>
                            <div>
                                <h4>Другой кластер</h4>
                                <a href="/blog/telegram-boty">Telegram боты для бизнеса</a>
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
