import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { articles } from '@/data/articles';
import { telegramBotyArticles } from '@/data/articles_data/registry';
import { cluster2Articles } from '@/data/articles_data/cluster2/registry';
import { parseryArticles } from '@/data/articles_data/parsery/registry';
import { lidogeneraciyaArticles } from '@/data/articles_data/lidogeneraciya/registry';
import { apiArticles } from '@/data/articles_data/api/registry';
import { aiArticles } from '@/data/articles_data/ai/registry';
import { pythonArticles } from '@/data/articles_data/python/registry';
import { nextjsArticles } from '@/data/articles_data/nextjs/registry';
import { vebArticles } from '@/data/articles_data/veb/registry';
import { mobileArticles } from '@/data/articles_data/mobile/registry';
import { konstruktoryArticles } from '@/data/articles_data/konstruktory/registry';
import { skladArticles } from '@/data/articles_data/sklad/registry';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import styles from './blog.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   SUPER HUB: Блог — все статьи по кластерам
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

const ALL_KEY = 'all';

const clusters = [
    {
        key: 'telegram-boty',
        title: 'Telegram боты',
        emoji: '🤖',
        description: 'Полное руководство по Telegram-ботам: от приёма заявок до интернет-магазина и AI-помощников.',
        hubUrl: '/blog/telegram-boty',
        color: '#00d4ff',
        articles: telegramBotyArticles,
    },
    {
        key: 'avtomatizaciya-biznesa',
        title: 'Автоматизация бизнеса',
        emoji: '⚡',
        description: 'Как автоматизировать продажи, маркетинг, склад и финансы. Пошаговые планы и реальные кейсы.',
        hubUrl: '/blog/avtomatizaciya-biznesa',
        color: '#a855f7',
        articles: cluster2Articles,
    },
    {
        key: 'parsery-marketplejsov',
        title: 'Парсинг маркетплейсов',
        emoji: '📊',
        description: 'Парсеры Wildberries, Ozon, Avito. Мониторинг цен, аналика конкурентов, автоматизация.',
        hubUrl: '/blog/parsery-marketplejsov',
        color: '#f59e0b',
        articles: parseryArticles,
    },
    {
        key: 'lidogeneraciya-telegram',
        title: 'Лидогенерация в Telegram',
        emoji: '🎯',
        description: 'Как находить клиентов в Telegram: парсинг каналов, рассылки, сбор базы, генерация лидов.',
        hubUrl: '/blog/lidogeneraciya-telegram',
        color: '#10b981',
        articles: lidogeneraciyaArticles,
    },
    {
        key: 'razrabotka-api',
        title: 'Разработка API',
        emoji: '🔗',
        description: 'REST API, webhook-интеграции, интеграция с 1С, FastAPI. Технические руководства.',
        hubUrl: '/blog/razrabotka-api',
        color: '#3b82f6',
        articles: apiArticles,
    },
    {
        key: 'ai-integracii',
        title: 'AI-интеграции',
        emoji: '🧠',
        description: 'ChatGPT для бизнеса, AI-агенты, интеграция OpenAI API, нейросети для автоматизации.',
        hubUrl: '/blog/ai-integracii',
        color: '#ec4899',
        articles: aiArticles,
    },
    {
        key: 'python-razrabotka',
        title: 'Python-разработка',
        emoji: '🐍',
        description: 'Python под ключ: FastAPI, Django, парсинг, обработка данных, Telegram-боты на Python.',
        hubUrl: '/blog/python-razrabotka',
        color: '#22c55e',
        articles: pythonArticles,
    },
    {
        key: 'nextjs-razrabotka',
        title: 'Next.js разработка',
        emoji: '▲',
        description: 'Next.js, React, SaaS-разработка, SEO-оптимизация, создание современных сайтов.',
        hubUrl: '/blog/nextjs-razrabotka',
        color: '#f97316',
        articles: nextjsArticles,
    },
    {
        key: 'veb-razrabotka',
        title: 'Веб-разработка',
        emoji: '🌐',
        description: 'Создание сайтов, лендингов, веб-приложений. Стоимость, платформы, этапы разработки.',
        hubUrl: '/blog/veb-razrabotka',
        color: '#06b6d4',
        articles: vebArticles,
    },
    {
        key: 'mobilnye-prilozheniya',
        title: 'Мобильные приложения',
        emoji: '📱',
        description: 'Разработка мобильных приложений: Flutter, React Native, нативные. Стоимость, этапы, кейсы.',
        hubUrl: '/blog/mobilnye-prilozheniya',
        color: '#8b5cf6',
        articles: mobileArticles,
    },
    {
        key: 'konstruktory',
        title: 'Конструкторы и CMS',
        emoji: '🛠️',
        description: 'Создание сайтов на WordPress, 1С-Битрикс, Tilda. Стоимость, особенности, кейсы.',
        hubUrl: '/blog/veb-razrabotka',
        color: '#f43f5e',
        articles: konstruktoryArticles,
    },
    {
        key: 'sklad',
        title: 'Автоматизация склада',
        emoji: '📦',
        description: 'WMS-системы, штрихкоды, ТСД, интеграция с 1С и маркетплейсами. Автоматизация FBS.',
        hubUrl: '/blog/avtomatizaciya-biznesa',
        color: '#14b8a6',
        articles: skladArticles,
    },
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

// Карточка статьи — без тяжёлых анимаций, только CSS hover
const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
    <article className={styles.articleCard}>
        <Link href={`/blog/${article.slug}`} className={styles.articleCardLink}>
            <div className={styles.articleCardTop}>
                <span className={styles.articleCardBadge}>
                    <i className="bx bx-time-five" />
                    {article.readingTime}
                </span>
                <span className={styles.articleCardWords}>{article.wordCount}</span>
            </div>
            <h3 className={styles.articleCardTitle}>{article.h1.split(':')[0]}</h3>
            <p className={styles.articleCardSubtitle}>
                {article.h1.split(':')[1]?.trim() || article.heroSubtitle}
            </p>
            <p className={styles.articleCardDesc}>{article.metaDescription}</p>
            <div className={styles.articleCardMeta}>
                <span>
                    <i className="bx bx-calendar" />
                    {new Date(article.modifiedDate).toLocaleDateString('ru-RU', {
                        year: 'numeric', month: 'short', day: 'numeric',
                    })}
                </span>
                <span className={styles.articleCardReadMore}>
                    Читать <i className="bx bx-right-arrow-alt" />
                </span>
            </div>
        </Link>
    </article>
);

export default function BlogIndexPage() {
    const [activeCluster, setActiveCluster] = useState(ALL_KEY);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    }, []);

    // Фильтрация статей
    const filteredClusters = useMemo(() => {
        return clusters.map(cluster => {
            const filtered = cluster.articles.filter(a => {
                if (!searchQuery) return true;
                const text = `${a.h1} ${a.metaDescription} ${a.keywords}`.toLowerCase();
                return text.includes(searchQuery);
            });
            return { ...cluster, filteredArticles: filtered };
        }).filter(cluster => cluster.filteredArticles.length > 0);
    }, [searchQuery]);

    // Кластеры для отображения (с учётом активного таба)
    const visibleClusters = useMemo(() => {
        if (activeCluster === ALL_KEY) return filteredClusters;
        return filteredClusters.filter(c => c.key === activeCluster);
    }, [activeCluster, filteredClusters]);

    const totalArticles = articles.length;

    return (
        <>
            <Head>
                <title>Блог о Telegram-ботах и автоматизации бизнеса | DimaRazrab</title>
                <meta name="description" content={`${totalArticles} подробных руководств о Telegram-ботах, автоматизации бизнеса и разработке. Кейсы, расчёт стоимости, пошаговые планы от практикующего разработчика.`} />
                <meta name="keywords" content="блог о telegram ботах, автоматизация бизнеса статьи, разработка ботов руководство, telegram бот для бизнеса, чат-боты статьи, автоматизация малого бизнеса, ai автоматизация, парсинг маркетплейсов, лидогенерация telegram, разработка api, python разработка, nextjs разработка" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Блог о Telegram-ботах и автоматизации бизнеса" />
                <meta property="og:description" content={`${totalArticles} руководств о Telegram-ботах, автоматизации и разработке. Кейсы, расчёты, пошаговые планы.`} />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Блог о Telegram-ботах и автоматизации бизнеса" />
                <meta name="twitter:description" content={`${totalArticles} руководств о Telegram-ботах, автоматизации и разработке.`} />
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
                            <span className={styles.breadcrumbCurrent}>Блог</span>
                        </nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Блог о <span className={styles.textAccent}>Telegram-ботах</span>
                            <br />и автоматизации бизнеса
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            {totalArticles} руководств с примерами, кейсами и расчётами по {clusters.length} темам.
                        </motion.p>

                        {/* Статистика */}
                        <motion.div
                            className={styles.heroStats}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNum}>{totalArticles}</span>
                                <span className={styles.heroStatLabel}>статей</span>
                            </div>
                            <div className={styles.heroStatDivider} />
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNum}>{clusters.length}</span>
                                <span className={styles.heroStatLabel}>тем</span>
                            </div>
                            <div className={styles.heroStatDivider} />
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNum}>100+</span>
                                <span className={styles.heroStatLabel}>мин чтения</span>
                            </div>
                        </motion.div>
                    </div>

                    <div className={styles.diagonalDivider} />
                </section>

                {/* ═══════ НАВИГАЦИЯ + ПОИСК ═══════ */}
                <section className={styles.navSection}>
                    <div className={styles.container}>
                        <div className={styles.navInner}>
                            {/* Поиск */}
                            <div className={styles.searchWrap}>
                                <i className={`bx bx-search ${styles.searchIcon}`} />
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Найти статью..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                {searchQuery && (
                                    <button
                                        className={styles.searchClear}
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Очистить поиск"
                                    >
                                        <i className="bx bx-x" />
                                    </button>
                                )}
                            </div>

                            {/* Табы кластеров */}
                            <div className={styles.tabsWrap} role="tablist" aria-label="Темы блога">
                                <button
                                    role="tab"
                                    aria-selected={activeCluster === ALL_KEY}
                                    className={`${styles.tab} ${activeCluster === ALL_KEY ? styles.tabActive : ''}`}
                                    onClick={() => setActiveCluster(ALL_KEY)}
                                >
                                    Все статьи
                                </button>
                                {clusters.map(cluster => (
                                    <button
                                        key={cluster.key}
                                        role="tab"
                                        aria-selected={activeCluster === cluster.key}
                                        className={`${styles.tab} ${activeCluster === cluster.key ? styles.tabActive : ''}`}
                                        style={activeCluster === cluster.key ? { '--tab-color': cluster.color } as React.CSSProperties : undefined}
                                        onClick={() => setActiveCluster(cluster.key)}
                                    >
                                        <span className={styles.tabEmoji}>{cluster.emoji}</span>
                                        {cluster.title}
                                        <span className={styles.tabCount}>{cluster.articles.length}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════ СТАТЬИ ═══════ */}
                <section className={styles.articlesSection}>
                    <div className={styles.container}>
                        {visibleClusters.map((cluster) => (
                            <div key={cluster.key} className={styles.clusterBlock}>
                                {/* Заголовок кластера (показывается только в режиме "Все") */}
                                {activeCluster === ALL_KEY && (
                                    <div className={styles.clusterHeader}>
                                        <div className={styles.clusterHeaderLeft}>
                                            <span className={styles.clusterEmoji}>{cluster.emoji}</span>
                                            <div>
                                                <h2 className={styles.clusterTitle}>
                                                    <span className={styles.textAccent}>{cluster.title}</span>
                                                </h2>
                                                <p className={styles.clusterDesc}>{cluster.description}</p>
                                            </div>
                                        </div>
                                        <Link href={cluster.hubUrl} className={styles.clusterHubLink}>
                                            Все статьи <i className="bx bx-right-arrow-alt" />
                                        </Link>
                                    </div>
                                )}

                                {/* Если конкретный таб — показываем описание кластера */}
                                {activeCluster !== ALL_KEY && (
                                    <div className={styles.clusterHeaderSingle}>
                                        <p className={styles.clusterDesc}>{cluster.description}</p>
                                        <Link href={cluster.hubUrl} className={styles.clusterHubLink}>
                                            <i className="bx bx-link-alt" /> Хаб-страница кластера
                                        </Link>
                                    </div>
                                )}

                                {/* Сетка статей */}
                                <div className={styles.articlesGrid}>
                                    {cluster.filteredArticles.map((article) => (
                                        <ArticleCard key={article.slug} article={article} />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Пустой результат поиска */}
                        {visibleClusters.length === 0 && (
                            <div className={styles.emptyState}>
                                <i className="bx bx-search-alt" />
                                <h3>Ничего не найдено</h3>
                                <p>Попробуйте другой запрос или выберите тему выше.</p>
                                <button
                                    className={styles.emptyReset}
                                    onClick={() => { setSearchQuery(''); setActiveCluster(ALL_KEY); }}
                                >
                                    Сбросить фильтры
                                </button>
                            </div>
                        )}

                        {/* ═══════ SEO: скрытые ссылки на все кластеры ═══════ */}
                        <nav className={styles.seoClusterNav} aria-label="Все темы блога">
                            <h2>Темы блога</h2>
                            <ul>
                                {clusters.map(c => (
                                    <li key={c.key}>
                                        <a href={c.hubUrl}>{c.title}</a>
                                        <ul>
                                            {c.articles.map(a => (
                                                <li key={a.slug}>
                                                    <a href={`/blog/${a.slug}`}>{a.h1.split(':')[0]}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* ═══════ CTA ═══════ */}
                        <div className={styles.ctaBlock}>
                            <h2>
                                Нужна помощь с <span className={styles.textAccent}>ботом или автоматизацией</span>?
                            </h2>
                            <p>
                                Бесплатная консультация — расскажу, как бот или автоматизация решит вашу задачу,
                                и подготовлю точную смету за 24 часа.
                            </p>
                            <a href="/razrabotka-botov" className={styles.ctaBtn}>
                                Заказать разработку →
                            </a>
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
                                {clusters.map(c => (
                                    <a key={c.key} href={c.hubUrl}>{c.title}</a>
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
