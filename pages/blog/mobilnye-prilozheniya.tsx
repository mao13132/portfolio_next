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
   HUB PAGE: Мобильные приложения
   /blog/mobilnye-prilozheniya
   Кластер J — разработка мобильных приложений
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/mobilnye-prilozheniya`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const plannedArticles = [
    {
        slug: 'razrabotka-mobilnyh-prilozhenij',
        title: 'Разработка мобильных приложений: технологии, стоимость, этапы',
        description: 'Полное руководство: Flutter, React Native, нативная разработка. Стоимость от 300 000 ₽. Кейсы с ROI 340%.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'skolko-stoit-mobilnoe-prilozhenie',
        title: 'Сколько стоит мобильное приложение: разбор по типам',
        description: 'Детальный разбор стоимости: от 150 000 ₽ до 5 000 000 ₽. Скрытые расходы, как сэкономить 30-60%.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'krossplatformennaya-razrabotka-prilozhenij',
        title: 'Кроссплатформенная разработка: Flutter vs React Native',
        description: 'Сравнение Flutter и React Native. Когда что выбирать. Экономия 30-50% бюджета.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'razrabotka-prilozhenij-dlya-biznesa',
        title: 'Разработка приложения для бизнеса: когда это нужно',
        description: 'Интеграции с CRM, 1С, AI-функции. Когда мобильное приложение приносит реальный доход.',
        moneyPage: '/razrabotka-servisov',
    },
    {
        slug: 'razrabotka-prilozhenij-android-ios',
        title: 'Разработка для Android и iOS: нативная vs кроссплатформа',
        description: 'Kotlin, Swift, Flutter, React Native. Сравнение подходов и выбор оптимального решения.',
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
            "name": "Мобильные приложения: разработка, технологии, стоимость | DimaRazrab",
            "description": "Полное руководство по разработке мобильных приложений: Flutter, React Native, нативная разработка. Стоимость, этапы, кейсы.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Разработка мобильных приложений"
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
                { "@type": "ListItem", "position": 3, "name": "Мобильные приложения", "item": PAGE_URL },
            ],
        },
    ],
};

export default function MobilnyePrilozheniyaHubPage() {
    return (
        <>
            <Head>
                <title>Мобильные приложения: разработка, технологии, стоимость | DimaRazrab</title>
                <meta name="description" content="Полное руководство по разработке мобильных приложений: Flutter, React Native, нативная разработка. Стоимость от 300 000 ₽. 5 руководств от разработчика." />
                <meta name="keywords" content="разработка мобильных приложений, flutter разработка, react native, создание мобильных приложений, мобильное приложение на заказ, кроссплатформенная разработка" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Мобильные приложения: разработка, технологии, стоимость" />
                <meta property="og:description" content="5 руководств о разработке мобильных приложений: Flutter, React Native, нативная разработка. Стоимость, этапы, кейсы." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Мобильные приложения: разработка, технологии, стоимость" />
                <meta name="twitter:description" content="5 руководств о разработке мобильных приложений: Flutter, React Native, нативная разработка." />
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
                            <span className={styles.breadcrumbCurrent}>Мобильные приложения</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Мобильные приложения:
                            <br /><span className={styles.textAccent}>разработка и технологии</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о разработке мобильных приложений: Flutter, React Native,
                            нативная разработка, стоимость, этапы. 5 руководств от практикующего разработчика.
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
                                Зачем бизнесу <span className={styles.textAccent}>мобильное приложение</span> в 2026 году
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Средний пользователь проводит 4-5 часов в день в мобильных приложениях. Конверсия
                                    в приложении в 2-3 раза выше, чем на мобильном сайте. Push-уведомления работают
                                    в 5-7 раз лучше email. Для бизнеса это прямой канал связи с клиентом.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Кроссплатформенная разработка (Flutter, React Native) позволила сократить стоимость
                                    создания приложения для iOS и Android на 30-50%. MVP можно запустить за 2-3 месяца
                                    от 300 000 ₽ и проверить гипотезу на реальных пользователях.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Ниже — 5 руководств, которые помогут разобраться в технологиях, стоимости и этапах
                                    разработки мобильных приложений. А если нужна помощь —
                                    <a href="/razrabotka-servisov" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите разработку</a> у профессионалов.
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
                                    <Link href={`/blog/${article.slug}`} className={styles.articleCardLink}>
                                        <div className={styles.articleCardTop}>
                                            <span className={styles.articleCardBadge}>
                                                📱 Мобильные
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
                                                Подробное руководство
                                            </span>
                                            <span className={styles.articleCardReadMore}>
                                                Читать <i className="bx bx-right-arrow-alt" />
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
                                Нужно <span className={styles.textAccent}>мобильное приложение</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — определим платформу, функциональность и рассчитаем стоимость за 48 часов.
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
                                Заказать приложение →
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
                                <a href="/blog">Блог</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/razrabotka-api">Разработка API</a>
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
