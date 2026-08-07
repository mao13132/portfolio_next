import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { telegramBotyArticles } from '@/data/articles';
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
   HUB PAGE: Telegram боты для бизнеса
   /blog/telegram-boty
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/telegram-boty`;

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
            "name": "Telegram боты для бизнеса: полное руководство | DimaRazrab",
            "description": "Всё о Telegram-ботах для бизнеса: автоматизация продаж, приём заявок, интернет-магазин, запись клиентов, AI-боты. 10 подробных руководств от практикующего разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Telegram боты для бизнеса"
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
                { "@type": "ListItem", "position": 3, "name": "Telegram боты для бизнеса", "item": PAGE_URL },
            ],
        },
    ],
};

export default function TelegramBotyHubPage() {
    return (
        <>
            <Head>
                <title>Telegram боты для бизнеса: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё о Telegram-ботах для бизнеса: автоматизация продаж, приём заявок, интернет-магазин, запись клиентов, AI-боты. 10 подробных руководств с примерами и кейсами от практикующего разработчика." />
                <meta name="keywords" content="telegram боты для бизнеса, автоматизация telegram бот, создание telegram бота, разработка ботов telegram, telegram бот продажи, telegram бот заявки, telegram бот магазин, ai бот telegram, стоимость telegram бота, telegram бот под ключ" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Telegram боты для бизнеса: полное руководство" />
                <meta property="og:description" content="10 подробных руководств о Telegram-ботах для бизнеса: продажи, заявки, магазин, запись, AI. Примеры, кейсы, расчёт стоимости." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Telegram боты для бизнеса: полное руководство" />
                <meta name="twitter:description" content="10 подробных руководств о Telegram-ботах для бизнеса: продажи, заявки, магазин, запись, AI. Примеры, кейсы, расчёт стоимости." />
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
                        {/* Breadcrumbs */}
                        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
                            <Link href="/">Главная</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <Link href="/blog">Блог</Link>
                            <span className={styles.breadcrumbSep}>›</span>
                            <span className={styles.breadcrumbCurrent}>Telegram боты для бизнеса</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Telegram боты для бизнеса:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о Telegram-ботах для автоматизации бизнеса: от приёма заявок
                            до интернет-магазина, WebApp и AI-помощников. 27 подробных руководств с примерами,
                            кейсами и расчётами ROI от практикующего разработчика.
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
                                Почему Telegram-боты — <span className={styles.textAccent}>must have</span> для бизнеса в 2025 году
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Telegram-боты превратились из экспериментальной технологии в обязательный инструмент для бизнеса любого масштаба.
                                    По данным Telegram, мессенджер ежемесячно используют более 950 миллионов человек, а в России и СНГ это основной
                                    канал деловой коммуникации. Клиенты уже здесь — остаётся только автоматизировать общение с ними.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Что умеет современный Telegram-бот? Практически всё: принимать заявки круглосуточно, вести клиента по воронке
                                    продаж, показывать каталог товаров с корзиной и оплатой, записывать на услуги с автоматическими напоминаниями,
                                    отвечать на вопросы с помощью искусственного интеллекта и интегрироваться с CRM, платёжными системами и
                                    аналитикой. Один бот заменяет 3-5 менеджеров и работает 24/7 без перерывов, больничных и отпусков.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Главное преимущество Telegram-бота перед классическим сайтом — это формат диалога. Вместо того чтобы заставлять
                                    клиента заполнять длинную форму с 10 полями, бот задаёт вопросы по одному, предлагает варианты ответов и
                                    формирует персонализированное предложение. Конверсия в заявку через бота на 40-70% выше, чем через классическую
                                    форму на сайте, а средний чек увеличивается на 15-25% за счёт перекрёстных продаж.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость разработки Telegram-бота стартует от 15 000 ₽ за простого помощника и доходит до 250 000 ₽ за
                                    полноценную платформу с каталогом, оплатой, аналитикой и AI. Сроки — от 3 до 30 дней. При этом окупаемость
                                    составляет от 1 до 30 дней в зависимости от ниши и среднего чека.
                                </p>
                                <p>
                                    Ниже — 27 подробных руководств, которые помогут разобраться в теме: от выбора технологии до расчёта
                                    стоимости, создания WebApp и внедрения AI. Каждая статья — это 3500-4800 слов практической информации с примерами,
                                    кейсами и пошаговыми планами. А если нужна помощь — <a href="/razrabotka-botov" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите разработку бота</a> у профессионалов.
                                </p>
                            </div>
                        </motion.div>

                        {/* ═══════ ARTICLES GRID ═══════ */}
                        <div className={styles.articlesGrid}>
                            {telegramBotyArticles.map((article, idx) => (
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

                        {/* ═══════ NICHE ARTICLES SECTION ═══════ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                maxWidth: 800,
                                margin: '60px auto',
                                background: 'var(--lp-glass-bg)',
                                border: '1px solid var(--lp-glass-border)',
                                borderRadius: 'var(--lp-radius-lg)',
                                padding: '40px 36px',
                                backdropFilter: 'blur(var(--lp-glass-blur))',
                                WebkitBackdropFilter: 'blur(var(--lp-glass-blur))',
                            }}
                        >
                            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: 'var(--lp-text)' }}>
                                🏭 Боты для <span className={styles.textAccent}>конкретных отраслей</span>
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '20px', lineHeight: 1.7 }}>
                                {nicheArticles.length} подробных руководств по Telegram-ботам для конкретных ниш:
                                салоны красоты, рестораны, аптеки, юристы, фитнес, доставка и ещё 48 отраслей.
                                Каждая статья — реальный кейс с цифрами ROI и пошаговым планом внедрения.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                                {nicheArticles.slice(0, 12).map((a) => (
                                    <Link
                                        key={a.slug}
                                        href={`/blog/${a.slug}`}
                                        style={{
                                            display: 'inline-block',
                                            padding: '6px 14px',
                                            background: 'rgba(0, 212, 255, 0.1)',
                                            border: '1px solid rgba(0, 212, 255, 0.2)',
                                            borderRadius: '20px',
                                            color: 'var(--lp-cyan)',
                                            fontSize: '13px',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {a.heroBadge?.split('•')[0]?.trim() || a.title.split(':')[0]}
                                    </Link>
                                ))}
                            </div>
                            <a
                                href="/blog/telegram-boty-dlya-otraslej"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 28px',
                                    background: 'rgba(0, 212, 255, 0.15)',
                                    border: '1px solid var(--lp-cyan)',
                                    borderRadius: 'var(--lp-radius-sm)',
                                    color: 'var(--lp-cyan)',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Все {nicheArticles.length} нишевых статей →
                            </a>
                        </motion.div>

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
                                Готовы <span className={styles.textAccent}>заказать бота</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — расскажу, как бот решит вашу задачу,
                                и подготовлю точную смету за 24 часа.
                            </p>
                            <a
                                href="/razrabotka-botov"
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
                                Заказать разработку бота →
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
                                <h4>Блог</h4>
                                <CollapsibleLinks maxVisible={6}>
                                    {telegramBotyArticles.map((a) => (
                                        <a key={a.slug} href={`/blog/${a.slug}`}>
                                            {a.h1.split(':')[0]}
                                        </a>
                                    ))}
                                </CollapsibleLinks>
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
