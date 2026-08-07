import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { nicheArticles } from '@/data/articles_data/niche/telegram/registry';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { fadeUp, scaleIn } from '@/app/Components/Landing/animations';
import { CollapsibleLinks } from '@/app/Components/CollapsibleLinks/CollapsibleLinks';
import styles from './blog.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   HUB PAGE: Telegram боты для бизнеса по отраслям
   /blog/telegram-boty-dlya-otraslej
   54 нишевых статьи
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/telegram-boty-dlya-otraslej`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

/* Группировка нишевых статей по категориям */
const nicheCategories = [
    {
        key: 'beauty',
        title: 'Красота и здоровье',
        emoji: '💇',
        slugs: ['bot-dlya-salona-krasoty', 'bot-dlya-stomatologii', 'bot-dlya-studii-zagara', 'bot-dlya-barbershopa', 'bot-dlya-parikmaxerskoj', 'bot-dlya-massazha', 'bot-dlya-medkliniki', 'bot-dlya-apteki', 'bot-dlya-vetkliniki'],
    },
    {
        key: 'education',
        title: 'Образование и развитие',
        emoji: '📚',
        slugs: ['bot-dlya-onlajn-shkoly', 'bot-dlya-repetitora', 'bot-dlya-koucha', 'bot-dlya-psihologa', 'bot-dlya-obrazovatelnogo-soobshchestva', 'bot-dlya-trenera', 'bot-dlya-joga-studii', 'bot-dlya-tancev', 'bot-dlya-muzyki'],
    },
    {
        key: 'services',
        title: 'Услуги и ремонт',
        emoji: '🔧',
        slugs: ['bot-dlya-klininga', 'bot-dlya-strojki', 'bot-dlya-himchistki', 'bot-dlya-remonta-tekhniki', 'bot-dlya-atelye', 'bot-dlya-avtoservisa', 'bot-dlya-prokata', 'bot-dlya-mebeli'],
    },
    {
        key: 'food',
        title: 'Еда и рестораны',
        emoji: '🍕',
        slugs: ['bot-dlya-restorana', 'bot-dlya-pekarni', 'bot-dlya-dostavki-edy', 'bot-dlya-tsvetochnogo'],
    },
    {
        key: 'commerce',
        title: 'Торговля и e-commerce',
        emoji: '🛒',
        slugs: ['bot-dlya-selera-wb', 'bot-dlya-selera-ozon', 'bot-dlya-avito-prodavca', 'bot-dlya-dropshippinga', 'bot-dlya-selera-wb'],
    },
    {
        key: 'auto',
        title: 'Автомобильный бизнес',
        emoji: '🚗',
        slugs: ['bot-dlya-avtodilera', 'bot-dlya-avtoslona'],
    },
    {
        key: 'agency',
        title: 'Агентства и студии',
        emoji: '🏢',
        slugs: ['bot-dlya-smm-agentstva', 'bot-dlya-dizajn-studii', 'bot-dlya-marketingovogo-agentstva', 'bot-dlya-fotografa', 'bot-dlya-videografa', 'bot-dlya-turagentstva', 'bot-dlya-svadby', 'bot-dlya-eventa', 'bot-dlya-fitnesa'],
    },
    {
        key: 'legal',
        title: 'Юриспруденция и финансы',
        emoji: '⚖️',
        slugs: ['bot-dlya-yurista', 'bot-dlya-buhgaltera', 'bot-dlya-notariusa', 'bot-dlya-strahovki', 'bot-dlya-hr', 'bot-dlya-logistiki', 'bot-dlya-kibersporta'],
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Telegram боты для бизнеса по отраслям: 54 ниши | DimaRazrab",
            "description": "54 готовых решения Telegram-ботов для бизнеса: салоны красоты, рестораны, аптеки, юристы, фитнес, доставка. Реальные кейсы с ROI от 300%.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": { "@type": "Thing", "name": "Telegram боты для бизнеса по отраслям" },
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
                { "@type": "ListItem", "position": 3, "name": "Telegram боты по отраслям", "item": PAGE_URL },
            ],
        },
    ],
};

export default function NicheTelegramBotsHubPage() {
    const articlesBySlug = new Map(nicheArticles.map(a => [a.slug, a]));

    return (
        <>
            <Head>
                <title>Telegram боты для бизнеса по отраслям: 54 ниши | DimaRazrab</title>
                <meta name="description" content="54 готовых решения Telegram-ботов для бизнеса: салоны красоты, рестораны, аптеки, юристы, фитнес, доставка, ремонт. Реальные кейсы с ROI от 300%. Бесплатная оценка." />
                <meta name="keywords" content="telegram бот для бизнеса, бот для салона красоты, бот для ресторана, бот для аптеки, бот для юриста, бот для фитнеса, telegram бот по отраслям, автоматизация бизнеса telegram" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Telegram боты для бизнеса по отраслям: 54 ниши" />
                <meta property="og:description" content="54 готовых решения Telegram-ботов для бизнеса: салоны, рестораны, аптеки, юристы, фитнес. Реальные кейсы с ROI от 300%." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Telegram боты для бизнеса по отраслям: 54 ниши" />
                <meta name="twitter:description" content="54 готовых решения Telegram-ботов для бизнеса с реальными кейсами ROI." />
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
                            <span className={styles.breadcrumbCurrent}>Telegram боты по отраслям</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Telegram боты для бизнеса
                            <br /><span className={styles.textAccent}>по отраслям: 54 ниши</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            54 готовых решения Telegram-ботов для конкретных отраслей: от салонов красоты
                            до автосервисов. Каждая статья — реальный кейс с цифрами ROI, пошаговый план
                            внедрения и расчёт стоимости.
                        </motion.p>
                    </div>

                    <div className={styles.diagonalDivider} />
                </section>

                {/* ═══════ SEO TEXT ═══════ */}
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
                                Telegram-бот для <span className={styles.textAccent}>вашей отрасли</span>
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Каждый бизнес уникален, но проблемы одни и те же: пропущенные звонки, no-show, ручная обработка заказов,
                                    отсутствие повторных клиентов. Telegram-бот решает эти проблемы для любой отрасли — от салона красоты
                                    до автосервиса.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Ниже — 54 подробных руководства для конкретных отраслей. Каждая статья содержит: анализ проблем отрасли,
                                    пошаговый сценарий работы бота, таблицу функций, реальный кейс с цифрами ROI, расчёт стоимости
                                    и пошаговый план внедрения.
                                </p>
                                <p>
                                    Нужна помощь? <a href="/razrabotka-botov" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>Закажите разработку бота</a> —
                                    бесплатная оценка за 24 часа.
                                </p>
                            </div>
                        </motion.div>

                        {/* ═══════ CATEGORIES ═══════ */}
                        {nicheCategories.map((cat) => {
                            const catArticles = cat.slugs
                                .map(slug => articlesBySlug.get(slug))
                                .filter(Boolean);

                            if (catArticles.length === 0) return null;

                            return (
                                <motion.div
                                    key={cat.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{ marginBottom: '60px' }}
                                >
                                    <h2 style={{
                                        fontSize: '28px',
                                        fontWeight: 700,
                                        marginBottom: '24px',
                                        color: 'var(--lp-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}>
                                        <span style={{ fontSize: '32px' }}>{cat.emoji}</span>
                                        {cat.title}
                                        <span style={{ fontSize: '16px', color: 'var(--lp-text-muted)', fontWeight: 400 }}>
                                            ({catArticles.length})
                                        </span>
                                    </h2>

                                    <div className={styles.articlesGrid}>
                                        {catArticles.map((article, idx) => (
                                            <motion.div
                                                key={article!.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            >
                                                <Link href={`/blog/${article!.slug}`} className={styles.articleCard}>
                                                    <div className={styles.articleCardBadge}>{article!.heroBadge}</div>
                                                    <h3 className={styles.articleCardTitle}>{article!.title}</h3>
                                                    <p className={styles.articleCardDesc}>{article!.heroSubtitle}</p>
                                                    <span className={styles.articleCardReadMore}>
                                                        Читать →
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* ═══════ CTA ═══════ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                maxWidth: 700,
                                margin: '40px auto 80px',
                                textAlign: 'center',
                                background: 'var(--lp-glass-bg)',
                                border: '1px solid var(--lp-glass-border)',
                                borderRadius: 'var(--lp-radius-lg)',
                                padding: '48px 36px',
                                backdropFilter: 'blur(var(--lp-glass-blur))',
                                WebkitBackdropFilter: 'blur(var(--lp-glass-blur))',
                            }}
                        >
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: 'var(--lp-text)' }}>
                                Не нашли свою отрасль?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Расскажите о вашем бизнесе — я предложу оптимальное решение и подготовлю
                                детальную оценку стоимости за 24 часа. Бесплатно.
                            </p>
                            <a
                                href="/razrabotka-botov"
                                style={{
                                    display: 'inline-block',
                                    padding: '16px 40px',
                                    background: 'var(--lp-cyan)',
                                    color: '#000',
                                    borderRadius: 'var(--lp-radius)',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                Заказать бота →
                            </a>
                        </motion.div>
                    </div>
                </section>

                <TelegramFloat />
            </div>
        </>
    );
}
