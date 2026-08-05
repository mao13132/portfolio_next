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
   HUB PAGE: Лидогенерация в Telegram
   /blog/lidogeneraciya-telegram
   Кластер C/L — 4 запроса + оценки
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/lidogeneraciya-telegram`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const plannedArticles = [
    {
        slug: 'kak-najti-klientov-v-telegram',
        title: 'Как найти клиентов в Telegram: 10 рабочих методов',
        description: 'Пошаговое руководство по поиску клиентов в Telegram: от мониторинга чатов до автоматической лидогенерации.',
        moneyPage: '/lidogeneraciya-telegram',
    },
    {
        slug: 'parser-kanalov-telegram',
        title: 'Парсер каналов Telegram: сбор целевой аудитории',
        description: 'Как парсить участников Telegram-каналов и групп для формирования базы потенциальных клиентов.',
        moneyPage: '/lidogeneraciya-telegram',
    },
    {
        slug: 'monitoring-klyuchevyh-slov-telegram',
        title: 'Мониторинг ключевых слов в Telegram',
        description: 'Настройка автоматического мониторинга упоминаний ключевых слов в Telegram-чатах и каналах для поиска лидов.',
        moneyPage: '/lidogeneraciya-telegram',
    },
    {
        slug: 'lidogeneraciya-telegram-avtomatizaciya',
        title: 'Лидогенерация в Telegram: полный гайд по автоматизации',
        description: 'Автоматическая лидогенерация в Telegram: парсинг, фильтрация, верификация и первый контакт с лидом.',
        moneyPage: '/lidogeneraciya-telegram',
    },
    {
        slug: 'sbora-bazy-klientov-telegram',
        title: 'Сбор базы клиентов в Telegram: пошаговая инструкция',
        description: 'Как собрать целевую базу клиентов из Telegram-каналов: инструменты, методы, этика и юридические аспекты.',
        moneyPage: '/lidogeneraciya-telegram',
    },
    {
        slug: 'massovaya-rassylka-telegram',
        title: 'Массовая рассылка в Telegram: как делать правильно',
        description: 'Гайд по массовым рассылкам в Telegram: как избежать бана, настройка сообщений, автоматизация и аналитика.',
        moneyPage: '/lidogeneraciya-telegram',
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Лидогенерация в Telegram: полное руководство | DimaRazrab",
            "description": "Всё о лидогенерации в Telegram: поиск клиентов, парсинг каналов, мониторинг ключевых слов, сбор базы, массовые рассылки. 6 руководств от разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "Лидогенерация в Telegram"
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
                { "@type": "ListItem", "position": 3, "name": "Лидогенерация в Telegram", "item": PAGE_URL },
            ],
        },
    ],
};

export default function LidogeneraciyaTelegramHubPage() {
    return (
        <>
            <Head>
                <title>Лидогенерация в Telegram: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё о лидогенерации в Telegram: поиск клиентов, парсинг каналов, мониторинг, сбор базы, рассылки. 6 руководств от разработчика." />
                <meta name="keywords" content="лидогенерация telegram, поиск клиентов telegram, парсер каналов telegram, мониторинг telegram, сбор базы клиентов, массовая рассылка telegram" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Лидогенерация в Telegram: полное руководство" />
                <meta property="og:description" content="6 руководств о лидогенерации в Telegram: поиск клиентов, парсинг, мониторинг, сбор базы, рассылки." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Лидогенерация в Telegram: полное руководство" />
                <meta name="twitter:description" content="6 руководств о лидогенерации в Telegram: поиск клиентов, парсинг, мониторинг, сбор базы, рассылки." />
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
                            <span className={styles.breadcrumbCurrent}>Лидогенерация в Telegram</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            Лидогенерация в Telegram:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать о поиске клиентов в Telegram: парсинг каналов, мониторинг
                            ключевых слов, сбор базы и автоматические рассылки. 6 руководств от практикующего разработчика.
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
                                Почему Telegram — <span className={styles.textAccent}>лучший канал</span> для лидогенерации
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Telegram — это не просто мессенджер, а мощная экосистема для бизнеса. Более 950 миллионов
                                    активных пользователей, тысячи тематических каналов и групп, где ваша целевая аудитория уже
                                    обсуждает свои проблемы и потребности. Лидогенерация в Telegram позволяет находить «горячих»
                                    клиентов, которые уже заинтересованы в вашем продукте или услуге.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Автоматическая лидогенерация работает в 10 раз быстрее ручного поиска. Парсер собирает
                                    участников целевых каналов, мониторинг находит упоминания ключевых слов в чатах, а
                                    автоматическая рассылка осуществляет первый контакт. Один такой цикл приносит от 50 до
                                    500 лидов в неделю в зависимости от ниши.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость настройки автоматической лидогенерации — от 10 000 ₽. Окупаемость — от 1 до 5 дней.
                                    Ниже — 6 руководств, которые помогут разобраться в теме.
                                    А если нужна помощь — <a href="/lidogeneraciya-telegram" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите лидогенерацию</a> у профессионалов.
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
                                Нужна <span className={styles.textAccent}>лидогенерация в Telegram</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — определим вашу целевую аудиторию и подготовим план за 24 часа.
                            </p>
                            <a
                                href="/lidogeneraciya-telegram"
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
                                Заказать лидогенерацию →
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
                                <a href="/lidogeneraciya-telegram">Лидогенерация в Telegram</a>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/telegram-boty">Telegram боты для бизнеса</a>
                                <a href="/blog/ai-integracii">AI-интеграции</a>
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
