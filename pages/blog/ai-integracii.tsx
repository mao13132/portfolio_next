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
   HUB PAGE: AI-интеграции
   /blog/ai-integracii
   Кластер G — 7 запросов, 606 показов/мес
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/blog/ai-integracii`;

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

const plannedArticles = [
    {
        slug: 'chatgpt-dlya-biznesa',
        title: 'ChatGPT для бизнеса: как внедрить AI в рабочие процессы',
        description: 'Практическое руководство по использованию ChatGPT в бизнесе: автоматизация текстов, поддержка, аналитика, генерация контента.',
        moneyPage: '/ai-integracii',
    },
    {
        slug: 'ai-agenty-dlya-biznesa',
        title: 'AI-агенты для бизнеса: автоматизация без ограничений',
        description: 'Что такое AI-агенты и как они работают. Автономные системы для продаж, поддержки, анализа данных и принятия решений.',
        moneyPage: '/ai-integracii',
    },
    {
        slug: 'integraciya-openai-api',
        title: 'Интеграция OpenAI API: пошаговое руководство для разработчиков',
        description: 'Как интегрировать OpenAI API в ваш продукт: настройка, промпт-инжиниринг, обработка ошибок, оптимизация затрат.',
        moneyPage: '/ai-integracii',
    },
    {
        slug: 'ai-bot-telegram-chatgpt',
        title: 'AI-бот в Telegram с ChatGPT: создание и настройка',
        description: 'Как создать Telegram-бота на базе ChatGPT: архитектура, контекст диалога, модерация, монетизация.',
        moneyPage: '/ai-integracii',
    },
    {
        slug: 'nejroseti-dlya-avtomatizacii',
        title: 'Нейросети для автоматизации бизнеса: реальные кейсы',
        description: 'Практические примеры использования нейросетей: обработка документов, распознавание, классификация, прогнозирование.',
        moneyPage: '/ai-integracii',
    },
    {
        slug: 'ai-dlya-obrabotki-dokumentov',
        title: 'AI для обработки документов: автоматизация бумажной работы',
        description: 'Как AI обрабатывает документы: извлечение данных, классификация, суммаризация, проверка на ошибки.',
        moneyPage: '/ai-integracii',
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "AI-интеграции для бизнеса: полное руководство | DimaRazrab",
            "description": "Всё об AI-интеграциях: ChatGPT для бизнеса, AI-агенты, OpenAI API, нейросети, обработка документов. 6 руководств от разработчика.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "about": {
                "@type": "Thing",
                "name": "AI-интеграции для бизнеса"
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
                { "@type": "ListItem", "position": 3, "name": "AI-интеграции", "item": PAGE_URL },
            ],
        },
    ],
};

export default function AiIntegraciiHubPage() {
    return (
        <>
            <Head>
                <title>AI-интеграции для бизнеса: полное руководство | DimaRazrab</title>
                <meta name="description" content="Всё об AI-интеграциях: ChatGPT для бизнеса, AI-агенты, OpenAI API, нейросети, обработка документов. 6 руководств от разработчика." />
                <meta name="keywords" content="ai интеграции, chatgpt для бизнеса, ai агенты, openai api интеграция, ai бот telegram, нейросети автоматизация, ai обработка документов" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="AI-интеграции для бизнеса: полное руководство" />
                <meta property="og:description" content="6 руководств об AI-интеграциях: ChatGPT, AI-агенты, OpenAI API, нейросети, обработка документов." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="AI-интеграции для бизнеса: полное руководство" />
                <meta name="twitter:description" content="6 руководств об AI-интеграциях: ChatGPT, AI-агенты, OpenAI API, нейросети." />
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
                            <span className={styles.breadcrumbCurrent}>AI-интеграции</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            AI-интеграции для бизнеса:
                            <br /><span className={styles.textAccent}>полное руководство</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Всё, что нужно знать об AI-интеграциях: ChatGPT для бизнеса, AI-агенты, интеграция OpenAI API,
                            нейросети для автоматизации. 6 руководств от практикующего разработчика.
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
                                AI — это не <span className={styles.textAccent}>будущее</span>, а настоящее
                            </h2>
                            <div style={{ fontSize: '16px', color: 'var(--lp-text-muted)', lineHeight: 1.8 }}>
                                <p style={{ marginBottom: '16px' }}>
                                    Искусственный интеллект перестал быть хайпом и стал рабочим инструментом для бизнеса.
                                    ChatGPT, Claude, Gemini и другие модели уже используются для автоматизации поддержки,
                                    генерации контента, анализа данных и обработки документов. Компании, которые внедрили AI,
                                    снижают операционные расходы на 20-40% и увеличивают скорость обработки задач в 5-10 раз.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    AI-агенты — это следующий шаг. В отличие от простых чат-ботов, агенты самостоятельно
                                    принимают решения, используют инструменты и выполняют многошаговые задачи. Они могут
                                    вести переговоры с клиентами, анализировать рынок, готовить отчёты и управлять
                                    рабочими процессами без участия человека.
                                </p>
                                <p style={{ marginBottom: '16px' }}>
                                    Стоимость интеграции AI стартует от 10 000 ₽ за простую интеграцию с ChatGPT и доходит
                                    до 200 000 ₽ за комплексного AI-агента. Ниже — 6 руководств, которые помогут разобраться.
                                    А если нужна помощь — <a href="/ai-integracii" style={{ color: 'var(--lp-cyan)', textDecoration: 'none', fontWeight: 600 }}>закажите AI-интеграцию</a> у профессионалов.
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
                                Нужна <span className={styles.textAccent}>AI-интеграция</span>?
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--lp-text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                                Бесплатная консультация — определим, какие AI-решения подойдут для вашего бизнеса, и подготовим смету за 24 часа.
                            </p>
                            <a
                                href="/ai-integracii"
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
                                Заказать AI-интеграцию →
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
                                <a href="/ai-integracii">AI-интеграции</a>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                            </div>
                            <div>
                                <h4>Другие кластеры</h4>
                                <a href="/blog/lidogeneraciya-telegram">Лидогенерация в Telegram</a>
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
