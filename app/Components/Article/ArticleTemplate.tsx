import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, articles } from '@/data/articles';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { fadeUp, scaleIn } from '@/app/Components/Landing/animations';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { PortfolioPopup } from '@/app/Components/Landing/PortfolioPopup';
import styles from './Article.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ============================================================
   TYPES
   ============================================================ */

interface ArticleTemplateProps {
    article: Article;
}

/* ============================================================
   NAV LINKS
   ============================================================ */

const NAV_LINKS = [
    { href: '/#about', label: 'Обо мне' },
    { href: '/#services', label: 'Услуги' },
    { href: '/#portfolio', label: 'Портфолио' },
    { href: '/blog', label: 'Блог' },
    { href: '/#contacts', label: 'Контакты' },
];

/* ============================================================
   RENDER CONTENT WITH PARAGRAPHS
   ============================================================ */

const renderContent = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
        // Handle bullet lists
        if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
            const items = paragraph.split('\n').filter(l => l.trim().startsWith('•') || l.trim().startsWith('-'));
            return (
                <ul key={i} style={{ listStyle: 'none', padding: 0, margin: '12px 0' }}>
                    {items.map((item, j) => (
                        <li key={j} style={{
                            padding: '6px 0 6px 24px',
                            position: 'relative',
                            color: 'var(--lp-text-muted)',
                            fontSize: '16px',
                        }}>
                            <span style={{
                                position: 'absolute',
                                left: 0,
                                color: 'var(--lp-cyan)',
                                fontWeight: 700,
                            }}>›</span>
                            {item.replace(/^[•\-]\s*/, '')}
                        </li>
                    ))}
                </ul>
            );
        }
        // Handle numbered lists (like "1. text\n2. text")
        if (/^\d+\./.test(paragraph.trim())) {
            const items = paragraph.split('\n').filter(l => /^\d+\./.test(l.trim()));
            return (
                <ol key={i} style={{ listStyle: 'none', padding: 0, margin: '12px 0', counterReset: 'item' }}>
                    {items.map((item, j) => (
                        <li key={j} style={{
                            padding: '6px 0 6px 32px',
                            position: 'relative',
                            color: 'var(--lp-text-muted)',
                            fontSize: '16px',
                            counterIncrement: 'item',
                        }}>
                            <span style={{
                                position: 'absolute',
                                left: 0,
                                color: 'var(--lp-cyan)',
                                fontWeight: 700,
                                fontSize: '14px',
                            }}>{j + 1}.</span>
                            {item.replace(/^\d+\.\s*/, '')}
                        </li>
                    ))}
                </ol>
            );
        }
        return <p key={i}>{paragraph}</p>;
    });
};

/* ============================================================
   ARTICLE TEMPLATE COMPONENT
   ============================================================ */

export const ArticleTemplate = ({ article }: ArticleTemplateProps) => {
    const [formData, setFormData] = useState({ name: '', contact: '', task: '' });
    const [privacy, setPrivacy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [portfolioOpen, setPortfolioOpen] = useState(false);

    // Related articles (exclude current)
    const relatedArticles = articles.filter(a => a.slug !== article.slug).slice(0, 2);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.contact.trim()) {
            setError('Укажите телефон или Telegram для связи');
            return;
        }
        if (!privacy) {
            setError('Необходимо согласие на обработку данных');
            return;
        }

        setLoading(true);
        try {
            await axiosClassic.post(getContact(), JSON.stringify({
                name: formData.name || 'Лид из статьи',
                telegram: formData.contact,
                phone: '',
                email: '',
                text: `[${article.ctaSource}] ${formData.task || 'Заявка из статьи'}`,
                url: `${article.canonical}#${article.ctaSource}`,
            }));

            setSuccess(true);
            setFormData({ name: '', contact: '', task: '' });
            setPrivacy(false);
        } catch {
            setError('Ошибка отправки. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    // Scroll to CTA
    const scrollToCta = () => {
        document.getElementById('article-cta')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <>
            {/* ═══════ SEO HEAD ═══════ */}
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={article.metaDescription} />
                <meta name="keywords" content={article.keywords} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={article.canonical} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="DimaRazrab — Разработка Telegram-ботов" />
                <meta property="og:title" content={article.ogTitle} />
                <meta property="og:description" content={article.ogDescription} />
                <meta property="og:url" content={article.canonical} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content="https://dima-razrab.com/media/og_desc.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="article:published_time" content={article.publishDate} />
                <meta property="article:modified_time" content={article.modifiedDate} />
                <meta property="article:author" content="Дмитрий Малышев" />
                <meta property="article:section" content="Технологии" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.ogTitle} />
                <meta name="twitter:description" content={article.ogDescription} />
                <meta name="twitter:image" content="https://dima-razrab.com/media/og_desc.jpg" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(article.structuredData) }}
                />
            </Head>

            <div className={styles.root}>
                <ClickComponent />
                <LandingHeader navLinks={NAV_LINKS} />
                <ScrollProgressBar />
                <TelegramFloat />

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
                            <span className={styles.breadcrumbCurrent}>{article.h1}</span>
                        </nav>

                        <motion.div
                            className={styles.heroBadge}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {article.heroBadge}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            {article.h1}
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            {article.heroSubtitle}
                        </motion.p>

                        <motion.div
                            className={styles.heroMeta}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                        >
                            <span><i className="bx bx-time-five" /> {article.readingTime}</span>
                            <span><i className="bx bx-text" /> {article.wordCount}</span>
                            <span><i className="bx bx-calendar" /> {new Date(article.modifiedDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span><i className="bx bx-user" /> {article.author}</span>
                        </motion.div>
                    </div>

                    <div className={styles.diagonalDivider} />
                </section>

                {/* ═══════ ARTICLE BODY ═══════ */}
                <div className={styles.containerWide}>
                    <div className={styles.articleLayout}>
                        {/* Main Content */}
                        <article className={styles.articleContent} itemScope itemType="https://schema.org/Article">
                            <meta itemProp="datePublished" content={article.publishDate} />
                            <meta itemProp="dateModified" content={article.modifiedDate} />
                            <div itemProp="author" itemScope itemType="https://schema.org/Person">
                                <meta itemProp="name" content={article.author} />
                            </div>

                            {article.sections.map((section, idx) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    className={styles.section}
                                    variants={fadeUp}
                                    custom={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                >
                                    <h2 className={styles.sectionHeading} itemProp="headline">
                                        {section.title}
                                    </h2>

                                    <div className={styles.sectionContent} itemProp="articleBody">
                                        {renderContent(section.content)}
                                    </div>

                                    {section.subsections?.map((sub, subIdx) => (
                                        <motion.div
                                            key={subIdx}
                                            className={styles.subsection}
                                            variants={scaleIn}
                                            custom={subIdx}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                        >
                                            <h3 className={styles.subsectionTitle}>{sub.title}</h3>
                                            <div className={styles.subsectionContent}>
                                                {renderContent(sub.content)}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Internal Links Block — after first section */}
                                    {idx === 0 && article.internalLinks && article.internalLinks.length > 0 && (
                                        <motion.div
                                            className={styles.internalLinksBlock}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.internalLinksTitle}>
                                                <i className="bx bx-link-alt" />
                                                Полезные материалы по теме
                                            </div>
                                            <div className={styles.internalLinksList}>
                                                {article.internalLinks.map((link, linkIdx) => (
                                                    <a
                                                        key={linkIdx}
                                                        href={link.url}
                                                        className={styles.internalLinkItem}
                                                    >
                                                        <i className={`bx ${link.url.startsWith('/razrabotka-botov') ? 'bx-briefcase' : 'bx-news'} ${styles.internalLinkIcon}`} />
                                                        <div className={styles.internalLinkContent}>
                                                            <span className={styles.internalLinkContext}>{link.context}</span>
                                                            <span className={styles.internalLinkAnchor}>{link.anchor}</span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.section>
                            ))}

                            {/* ═══════ FAQ ═══════ */}
                            <section className={styles.faqSection} id="faq">
                                <h2 className={styles.faqTitle}>
                                    Частые <span className={styles.textAccent}>вопросы</span>
                                </h2>
                                <p className={styles.faqSubtitle}>
                                    Ответы на самые популярные вопросы о {article.h1.toLowerCase().split(':')[0]}
                                </p>

                                <div className={styles.faqGrid} itemScope itemType="https://schema.org/FAQPage">
                                    {article.faq.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            className={styles.faqItem}
                                            variants={fadeUp}
                                            custom={idx}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            itemScope
                                            itemProp="mainEntity"
                                            itemType="https://schema.org/Question"
                                        >
                                            <button
                                                className={styles.faqQuestion}
                                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                                aria-expanded={openFaq === idx}
                                            >
                                                <span itemProp="name">{item.question}</span>
                                                <span className={`${styles.faqArrow} ${openFaq === idx ? styles.faqArrowOpen : ''}`}>›</span>
                                            </button>
                                            <AnimatePresence>
                                                {openFaq === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={styles.faqAnswer}
                                                        itemScope
                                                        itemProp="acceptedAnswer"
                                                        itemType="https://schema.org/Answer"
                                                    >
                                                        <div className={styles.faqAnswerInner}>
                                                            <p itemProp="text">{item.answer}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </article>

                        {/* Sidebar TOC */}
                        <aside className={styles.tocSidebar}>
                            <nav className={styles.tocCard}>
                                <h3 className={styles.tocTitle}>
                                    <i className="bx bx-list-ul" />
                                    Содержание
                                </h3>
                                <ul className={styles.tocList}>
                                    {article.toc.map((item) => (
                                        <li key={item.id} className={styles.tocItem}>
                                            <a href={`#${item.id}`} className={styles.tocLink}>
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                    <li className={styles.tocItem}>
                                        <a href="#faq" className={styles.tocLink}>
                                            Частые вопросы
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            {/* Mini CTA in sidebar */}
                            <div className={styles.tocCard} style={{ marginTop: 16 }}>
                                <button
                                    className={ls.ctaButton || ''}
                                    onClick={scrollToCta}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'linear-gradient(135deg, var(--lp-cyan), var(--lp-purple))',
                                        border: 'none',
                                        borderRadius: 'var(--lp-radius-sm)',
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        fontFamily: 'inherit',
                                        cursor: 'pointer',
                                    }}
                                >
                                    💬 Бесплатная консультация
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* ═══════ CTA FORM ═══════ */}
                <section className={styles.ctaSection} id="article-cta">
                    <div className={styles.container}>
                        <motion.div
                            className={styles.ctaCard}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.ctaTitle}>
                                {article.ctaTitle}
                            </h2>
                            <p className={styles.ctaSubtitle}>
                                {article.ctaSubtitle}
                            </p>

                            {success ? (
                                <div className={styles.ctaSuccess}>
                                    <i className="bx bx-check-circle" />
                                    <p>Заявка отправлена! Свяжусь с вами в течение 30 минут.</p>
                                </div>
                            ) : (
                                <form className={styles.ctaForm} onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        className={styles.ctaInput}
                                        placeholder="Ваше имя"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className={styles.ctaInput}
                                        placeholder="Telegram или телефон *"
                                        value={formData.contact}
                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        className={`${styles.ctaInput} ${styles.ctaTextarea}`}
                                        placeholder="Опишите задачу (необязательно)"
                                        value={formData.task}
                                        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                    />
                                    <label className={styles.ctaCheckbox}>
                                        <input
                                            type="checkbox"
                                            checked={privacy}
                                            onChange={(e) => setPrivacy(e.target.checked)}
                                        />
                                        <span>Согласен на обработку персональных данных в соответствии с <a href="/privacy" style={{ color: 'var(--lp-cyan)' }}>политикой конфиденциальности</a></span>
                                    </label>
                                    <button
                                        type="submit"
                                        className={styles.ctaButton}
                                        disabled={loading}
                                    >
                                        {loading ? 'Отправка...' : 'Получить бесплатную консультацию'}
                                    </button>
                                    {error && <p className={styles.ctaError}>{error}</p>}
                                </form>
                            )}
                            <p className={styles.ctaCommercialLink}>
                                Или посмотрите наши&nbsp;
                                <a href="/razrabotka-botov">услуги по разработке ботов</a>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════ PORTFOLIO SECTION ═══════ */}
                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <motion.div
                            className={styles.ctaCard}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.ctaTitle}>
                                Примеры <span className={styles.textAccent}>реализованных проектов</span>
                            </h2>
                            <p className={styles.ctaSubtitle}>
                                Посмотрите мои работы: Telegram-боты, сервисы, CRM и автоматизация для бизнеса
                            </p>
                            <button
                                onClick={() => setPortfolioOpen(true)}
                                style={{
                                    padding: '14px 32px',
                                    background: 'linear-gradient(135deg, var(--lp-cyan), var(--lp-purple))',
                                    border: 'none',
                                    borderRadius: 'var(--lp-radius-sm)',
                                    color: '#fff',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    fontFamily: 'inherit',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Смотреть портфолио →
                            </button>
                        </motion.div>
                    </div>
                </section>

                <PortfolioPopup isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />

                {/* ═══════ RELATED ARTICLES ═══════ */}
                {relatedArticles.length > 0 && (
                    <div className={styles.container}>
                        <section className={styles.relatedSection}>
                            <h2 className={styles.relatedTitle}>
                                Похожие <span className={styles.textAccent}>статьи</span>
                            </h2>
                            <div className={styles.relatedGrid}>
                                {relatedArticles.map((rel) => (
                                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className={styles.relatedCard}>
                                        <h3 className={styles.relatedCardTitle}>{rel.h1.split(':')[0]}</h3>
                                        <p className={styles.relatedCardDesc}>{rel.metaDescription.slice(0, 120)}...</p>
                                        <span className={styles.relatedCardLink}>
                                            Читать далее <i className="bx bx-right-arrow-alt" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

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
};
