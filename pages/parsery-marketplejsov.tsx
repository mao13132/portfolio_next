import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { ExitIntentPopup } from '@/app/Components/Landing/ExitIntentPopup';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';
import styles from './parsery-marketplejsov.module.css';

/* ============================================================
   TYPES
   ============================================================ */

interface Particle {
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; hue: number;
}

/* ============================================================
   CONSTANTS
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/parsery-marketplejsov`;
const OG_IMAGE = `${SITE_URL}/media/og_desc.jpg`;

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number = 0) => ({
        opacity: 1, scale: 1,
        transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' }
    }),
};

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Парсеры и автоматизация маркетплейсов — Wildberries, Ozon, Avito | DimaRazrab",
            "description": "Разработка парсеров и автоматизация маркетплейсов. Мониторинг цен, repricer, аналитика. Бесплатная поддержка 30 дней. Обсудите проект!",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}#website`,
            "url": SITE_URL,
            "name": "Портфолио Дмитрия Малышева",
            "inLanguage": "ru-RU"
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${PAGE_URL}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Парсеры маркетплейсов", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Парсеры и автоматизация маркетплейсов",
            "description": "Разработка парсеров данных, мониторинг цен конкурентов, repricer, аналитические дашборды для Wildberries, Ozon и Avito.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Парсеры маркетплейсов",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["Парсер Wildberries", "Парсер Ozon", "Парсер Avito", "Мониторинг цен", "Repricer", "Автоматизация маркетплейсов"]
            },
            "serviceType": "Разработка парсеров и автоматизация маркетплейсов",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги парсинга маркетплейсов",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Парсер данных (базовый)",
                            "description": "Сбор данных о товарах, ценах, рейтингах. Срок 3-5 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Мониторинг цен конкурентов",
                            "description": "Автоматический мониторинг цен конкурентов с уведомлениями. Срок 5-7 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Repricer (автоизменение цен)",
                            "description": "Автоматическое изменение цен на основе конкурентов. Срок 7-10 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Полная автоматизация маркетплейса",
                            "description": "Комплексная автоматизация: парсинг, repricer, аналитика, управление карточками. Срок 2-4 недели."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Аналитическая панель (дашборд)",
                            "description": "Визуализация данных, отчёты, KPI. Срок 2-3 недели."
                        }
                    }
                ]
            }
        },
        {
            "@type": "FAQPage",
            "@id": `${PAGE_URL}#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Сколько стоит парсер Wildberries?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Базовый парсер от 15 000 ₽. Полная система с мониторингом и уведомлениями — от 30 000 ₽."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие данные можно собрать с маркетплейсов?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Названия, цены, рейтинги, отзывы, позиции в выдаче, данные о продажах."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Парсинг маркетплейсов легален?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, при работе через официальный API. Я использую API Wildberries, Ozon и Avito."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько времени занимает разработка?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Базовый парсер 3-5 дней, сложная система 2-4 недели."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Можно ли парсить несколько маркетплейсов одновременно?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, я разрабатываю мультиплатформенные решения для парсинга WB, Ozon, Avito и других площадок одновременно."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Нужно ли обновлять парсер?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "API маркетплейсов иногда меняются. Бесплатная поддержка 30 дней, далее — по договорённости."
                    }
                }
            ]
        }
    ]
};

/* ============================================================
   PARTICLES COMPONENT
   ============================================================ */

const ParticlesBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const count = Math.min(80, Math.floor(window.innerWidth / 18));
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() > 0.5 ? 180 : 270,
        }));

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouse);

        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;

        const animate = (time: number) => {
            animRef.current = requestAnimationFrame(animate);
            if (time - lastTime < interval) return;
            lastTime = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            particles.forEach(p => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = (200 - dist) / 200 * 0.015;
                    p.vx += dx / dist * force;
                    p.vy += dy / dist * force;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                p.vx *= 0.999;
                p.vy *= 0.999;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity * 0.15})`;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 220, 255, ${0.08 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        animRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.particlesCanvas} />;
};

/* ============================================================
   LEAD FORM COMPONENT
   ============================================================ */

interface LeadFormProps {
    source: string;
    title?: string;
    subtitle?: string;
    compact?: boolean;
}

const LeadForm = ({ source, title, subtitle, compact = false }: LeadFormProps) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [task, setTask] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!contact.trim()) {
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
                name: name || 'Лид с лендинга',
                telegram: contact,
                phone: '',
                email: '',
                text: `[${source}] ${task || 'Заявка с лендинга "Парсеры маркетплейсов"'}`,
                url: `${PAGE_URL}#${source}`,
            }));

            setName('');
            setContact('');
            setTask('');
            setPrivacy(false);
            setSuccess(true);
        } catch {
            setError('Ошибка отправки. Попробуйте написать в Telegram: @developer_telegrams');
        }
        setLoading(false);
    };

    if (success) {
        return (
            <motion.div
                className={styles.formSuccess}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.successIcon}>✓</div>
                <h3>Заявка отправлена!</h3>
                <p>Свяжусь с вами в течение 30 минут в рабочее время</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`${styles.leadForm} ${compact ? styles.leadFormCompact : ''}`}>
            {title && <h3 className={styles.formTitle}>{title}</h3>}
            {subtitle && <p className={styles.formSubtitle}>{subtitle}</p>}

            <div className={styles.formGroup}>
                <input
                    type="text"
                    placeholder="Ваше имя (необязательно)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={styles.formInput}
                    autoComplete="name"
                />
            </div>

            <div className={styles.formGroup}>
                <input
                    type="tel"
                    placeholder="Телефон или Telegram *"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    className={styles.formInput}
                    required
                    autoComplete="tel"
                />
            </div>

            {!compact && (
                <div className={styles.formGroup}>
                    <textarea
                        placeholder="Опишите задачу (необязательно)"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        className={styles.formTextarea}
                        rows={3}
                    />
                </div>
            )}

            <label className={styles.privacyLabel}>
                <input
                    type="checkbox"
                    checked={privacy}
                    onChange={e => setPrivacy(e.target.checked)}
                    required
                />
                <span>
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                        политикой обработки персональных данных
                    </a>
                </span>
            </label>

            {error && <div className={styles.formError}>{error}</div>}

            <button
                type="submit"
                className={styles.formButton}
                disabled={loading}
            >
                {loading ? 'Отправка...' : 'Обсудить проект бесплатно'}
            </button>
        </form>
    );
};

/* ============================================================
   FAQ ITEM COMPONENT
   ============================================================ */

interface FaqItemProps {
    question: string;
    answer: string;
    index: number;
}

const FaqItem = ({ question, answer, index }: FaqItemProps) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className={styles.faqItem}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <button className={styles.faqQuestion} onClick={() => setOpen(!open)}>
                <span>{question}</span>
                <span className={`${styles.faqArrow} ${open ? styles.faqArrowOpen : ''}`}>›</span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.faqAnswer}
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */

export default function ParseryMarketplejsovPage() {
    const [headerSolid, setHeaderSolid] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handler = () => setHeaderSolid(window.scrollY > 50);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const scrollToForm = useCallback(() => {
        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    return (
        <>
            <ClickComponent />
            <Head>
                <title>Парсеры маркетплейсов — Wildberries, Ozon, Avito | DimaRazrab</title>
                <meta
                    name="description"
                    content="Разработка парсеров и автоматизация маркетплейсов. Мониторинг цен, repricer, аналитика. Бесплатная поддержка 30 дней. Обсудите проект!"
                />
                <meta name="keywords" content="парсер wildberries, парсер ozon, парсер avito, мониторинг цен wildberries, автоматизация маркетплейсов, автоматизация wildberries, ozon автоматизация, repricer, парсер маркетплейсов, сбор данных маркетплейсы" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Парсеры маркетплейсов — Wildberries, Ozon, Avito | DimaRazrab" />
                <meta property="og:description" content="Разработка парсеров и автоматизация маркетплейсов. Мониторинг цен, repricer, аналитика. Бесплатная поддержка 30 дней. Обсудите проект!" />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Парсеры маркетплейсов — Wildberries, Ozon, Avito | DimaRazrab" />
                <meta name="twitter:description" content="Разработка парсеров и автоматизация маркетплейсов. Мониторинг цен, repricer, аналитика. Бесплатная поддержка 30 дней." />
                <meta name="twitter:image" content={OG_IMAGE} />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            {/* ============ HEADER ============ */}
            <header className={`${styles.header} ${headerSolid ? styles.headerSolid : ''}`}>
                <div className={styles.headerInner}>
                    <a href="/" className={styles.logo}>
                        <span className={styles.logoAccent}>D</span>imaRazrab
                    </a>

                    <nav className={`${styles.nav} ${mobileMenu ? styles.navOpen : ''}`}>
                        <a href="#offers" onClick={() => setMobileMenu(false)}>Услуги</a>
                        <a href="#target" onClick={() => setMobileMenu(false)}>Для кого</a>
                        <a href="#process" onClick={() => setMobileMenu(false)}>Как работаем</a>
                        <a href="#portfolio" onClick={() => setMobileMenu(false)}>Кейсы</a>
                        <a href="#pricing" onClick={() => setMobileMenu(false)}>Стоимость</a>
                        <a href="#faq" onClick={() => setMobileMenu(false)}>FAQ</a>
                    </nav>

                    <a href="tel:+79648325336" className={styles.headerPhone}>
                        <i className='bx bx-phone' />
                        Связаться
                    </a>

                    <button
                        className={styles.burger}
                        onClick={() => setMobileMenu(!mobileMenu)}
                        aria-label="Меню"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </header>

            <div className={styles.container} style={{ paddingTop: 16 }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Парсеры маркетплейсов' },
                ]} />
            </div>

            {/* ============ HERO ============ */}
            <section className={styles.hero}>
                <ParticlesBg />

                <div className={styles.heroGlow1} />
                <div className={styles.heroGlow2} />

                <div className={styles.container}>
                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            <motion.div
                                className={styles.heroBadge}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                ⚡ Wildberries • Ozon • Avito • Бесплатная консультация
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                            >
                                Парсеры и автоматизация{' '}
                                <span className={styles.heroHighlight}>маркетплейсов</span>{' '}
                                — Wildberries, Ozon, Avito
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                Разрабатываю парсеры данных, системы мониторинга цен,
                                repricer и аналитические дашборды. Работаю через официальный
                                API — легально и надёжно.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.45 }}
                            >
                                {['Работа через API (легально)', 'Бесплатная поддержка 30 дней', 'От 3 дней на разработку'].map((b, i) => (
                                    <div key={i} className={styles.heroBullet}>
                                        <span className={styles.heroBulletIcon}>✓</span>
                                        {b}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div
                            className={styles.heroFormWrapper}
                            id="hero-form"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <LeadForm
                                source="hero"
                                title="Получить бесплатную консультацию"
                                subtitle="Расскажите о задаче — предложу решение и смету за 30 минут"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className={styles.diagonalDivider} />
            </section>

            {/* ============ ЧТО ПРЕДЛАГАЮ (УСЛУГИ) ============ */}
            <section className={styles.section} id="offers">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Что я <span className={styles.textAccent}>предлагаю</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Полный спектр услуг по парсингу и автоматизации маркетплейсов
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* Парсинг товаров и цен */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Парсинг</span>
                                <h3 className={styles.offerName}>Парсинг товаров и цен</h3>
                                <p className={styles.offerFor}>Сбор данных о товарах, ценах, рейтингах и отзывах</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Сбор карточек товаров</li>
                                <li><i className='bx bx-check' /> Мониторинг цен в реальном времени</li>
                                <li><i className='bx bx-check' /> Экспорт в Excel / Google Таблицы</li>
                                <li><i className='bx bx-check' /> Автоматическое обновление данных</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Мониторинг конкурентов */}
                        <motion.div
                            className={`${styles.offerCard} ${styles.offerCardPopular}`}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.popularBadge}>★ Популярный</div>
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Аналитика</span>
                                <h3 className={styles.offerName}>Мониторинг конкурентов</h3>
                                <p className={styles.offerFor}>Отслеживание цен, ассортимента и стратегий конкурентов</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Автоматический мониторинг 24/7</li>
                                <li><i className='bx bx-check' /> Уведомления об изменениях цен</li>
                                <li><i className='bx bx-check' /> История изменений</li>
                                <li><i className='bx bx-check' /> Отчёты и графики</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Repricer */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Автоматизация</span>
                                <h3 className={styles.offerName}>Repricer — автоизменение цен</h3>
                                <p className={styles.offerFor}>Автоматическая корректировка цен на основе данных конкурентов</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Правила ценообразования</li>
                                <li><i className='bx bx-check' /> Автоматическое изменение через API</li>
                                <li><i className='bx bx-check' /> Защита минимальной цены</li>
                                <li><i className='bx bx-check' /> A/B тестирование цен</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Сбор аналитики */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Аналитика</span>
                                <h3 className={styles.offerName}>Сбор аналитики и отчётов</h3>
                                <p className={styles.offerFor}>Дашборды с ключевыми метриками для принятия решений</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Визуализация данных</li>
                                <li><i className='bx bx-check' /> KPI и метрики продаж</li>
                                <li><i className='bx bx-check' /> Автоматические отчёты</li>
                                <li><i className='bx bx-check' /> Интеграция с Google Sheets</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Управление карточками */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Управление</span>
                                <h3 className={styles.offerName}>Управление карточками товаров</h3>
                                <p className={styles.offerFor}>Массовое обновление карточек, оптимизация контента</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Массовое обновление цен</li>
                                <li><i className='bx bx-check' /> Управление остатками</li>
                                <li><i className='bx bx-check' /> Оптимизация описаний</li>
                                <li><i className='bx bx-check' /> Генерация сборочных листов</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ ДЛЯ КОГО ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="target">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Для кого <span className={styles.textAccent}>это</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Решения для продавцов, агентств и менеджеров маркетплейсов
                        </p>
                    </motion.div>

                    <div className={styles.targetGrid}>
                        {[
                            { icon: 'bx-store', title: 'Селлеры Wildberries и Ozon', desc: 'Автоматизируйте мониторинг цен конкурентов, repricer и управление карточками товаров. Увеличьте прибыль и сократите ручной труд.' },
                            { icon: 'bx-cart', title: 'Продавцы на Avito', desc: 'Собирайте данные о конкурентах, отслеживайте цены и автоматизируйте публикацию объявлений. Экономьте часы каждый день.' },
                            { icon: 'bx-building', title: 'Агентства и маркетплейс-менеджеры', desc: 'Масштабируйте управление клиентами: аналитика, автоматизация отчётов, мультиаккаунтинг. Управляйте десятками магазинов из одной системы.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={styles.targetCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <i className={`bx ${item.icon}`} />
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ КАК ЭТО РАБОТАЕТ ============ */}
            <section className={styles.section} id="process">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Как <span className={styles.textAccent}>это работает</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Прозрачный процесс от обсуждения до запуска
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx-conversation', title: 'Анализ задачи', desc: 'Обсуждаем ваши цели, анализируем нишу и конкурентов. Определяем, какие данные нужны и как часто обновлять.' },
                            { num: '02', icon: 'bx-code-alt', title: 'Разработка парсера', desc: 'Пишу код парсера с учётом всех нюансов API маркетплейсов. Тестирую на реальных данных.' },
                            { num: '03', icon: 'bx-cog', title: 'Настройка автоматизации', desc: 'Настраиваю расписание, уведомления, экспорт данных. Интегрирую с вашими системами.' },
                            { num: '04', icon: 'bx-rocket', title: 'Запуск и поддержка', desc: 'Запускаю парсер на продакшене. Бесплатная поддержка 30 дней — исправления и доработки.' },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className={styles.processStep}
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className={styles.processNum}>{step.num}</div>
                                <div className={styles.processIcon}>
                                    <i className={`bx ${step.icon}`} />
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ ПРИМЕРЫ РЕШЕНИЙ (КЕЙСЫ) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="portfolio">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Примеры <span className={styles.textAccent}>решений</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Реализованные проекты по парсингу и автоматизации маркетплейсов
                        </p>
                    </motion.div>

                    <div className={styles.portfolioGrid}>
                        {[
                            { slug: 'seo_wb_tg', title: 'SEO позиции артикула на WB', desc: 'Бот проверяет и отслеживает Online в многопоточном режиме SEO позицию артикула по ключевым запросам.', category: 'SEO / WB' },
                            { slug: 'wb_limits_tg', title: 'Мониторинг поставок WB', desc: 'Поставщик с оборотом 15 млн₽/месяц увеличил эффективность поставок на 180%.', category: 'Поставки / WB' },
                            { slug: 'statistic_marketplace_tg', title: 'Аналитика маркетплейсов', desc: 'Система аналитики для сети из 12 магазинов на WB/Ozon. Экономия 25 часов/неделю.', category: 'Аналитика' },
                            { slug: 'business_ozon', title: 'Аналитика Ozon', desc: 'Рост продаж на 290%, экономия 8 часов/день. Полная автоматизация аналитики.', category: 'Аналитика / Ozon' },
                            { slug: 'django_push_price', title: 'Ценообразование маркетплейсов', desc: 'Сокращение времени на ценообразование на 95%, увеличение прибыли на 180%.', category: 'Repricer' },
                            { slug: 'auto_market_tg', title: 'Мультиплатформа WB/Ozon/Yandex/Ali', desc: 'Сбор заказов, генерация сборочных листов для 4 маркетплейсов одновременно.', category: 'Мультиплатформа' },
                            { slug: 'sima_land_tg', title: 'Дропшиппинг Sima-Land', desc: 'Синхронизация 15,000+ товаров, экономия 40 часов/неделю. Автоматизация дропшиппинга.', category: 'Дропшиппинг' },
                        ].map((project, i) => (
                            <motion.a
                                key={i}
                                href={`https://dima-razrab.com/work/${project.slug}`}
                                className={styles.portfolioCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className={styles.portfolioCategory}>{project.category}</div>
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className={styles.portfolioTech}>Смотреть кейс →</div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ ТЕХНОЛОГИИ ============ */}
            <section className={styles.section} id="tech">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.textAccent}>Технологии</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Современный стек для надёжных и быстрых парсеров
                        </p>
                    </motion.div>

                    <div className={styles.techGrid}>
                        {[
                            { icon: 'bxl-python', name: 'Python', desc: 'Основной язык разработки' },
                            { icon: 'bx-data', name: 'PostgreSQL', desc: 'Надёжное хранение данных' },
                            { icon: 'bx-broadcast', name: 'Redis', desc: 'Кэширование и очереди' },
                            { icon: 'bxl-telegram', name: 'Telegram API', desc: 'Уведомления и боты' },
                            { icon: 'bx-spreadsheet', name: 'Google Sheets', desc: 'Экспорт и отчёты' },
                            { icon: 'bxl-docker', name: 'Docker', desc: 'Контейнеризация' },
                            { icon: 'bx-cloud', name: 'Cloud', desc: 'Облачный хостинг 24/7' },
                            { icon: 'bx-link', name: 'REST API', desc: 'WB, Ozon, Avito API' },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                className={styles.techCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <i className={`bx ${tech.icon}`} />
                                <h4>{tech.name}</h4>
                                <p>{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ ПОЧЕМУ ВЫБИРАЮТ МЕНЯ ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="benefits">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Почему выбирают <span className={styles.textAccent}>меня</span>
                        </h2>
                    </motion.div>

                    <div className={styles.benefitsGrid}>
                        {[
                            { icon: 'bx-shield', title: 'Легальная работа через API', desc: 'Использую официальные API Wildberries, Ozon и Avito. Никаких серых схем — ваш парсер не заблокируют.' },
                            { icon: 'bx-time', title: 'Быстрые сроки', desc: 'Базовый парсер за 3-5 дней. Система мониторинга за неделю. Не затягиваю проекты.' },
                            { icon: 'bx-support', title: 'Бесплатная поддержка 30 дней', desc: 'Исправляю баги, обновляю при изменениях API, консультирую. Без дополнительной оплаты.' },
                            { icon: 'bx-code-block', title: 'Чистый и документированный код', desc: 'Вы получаете полный исходный код с документацией. Сможете поддерживать и развивать самостоятельно.' },
                            { icon: 'bx-trending-up', title: 'Проверенный опыт', desc: 'Более 50 реализованных проектов автоматизации. Работаю с маркетплейсами с 2020 года.' },
                            { icon: 'bx-dollar', title: 'Прозрачная стоимость', desc: 'Фиксирую цену и сроки до начала работы. Никаких скрытых платежей и доплат.' },
                        ].map((b, i) => (
                            <motion.div
                                key={i}
                                className={styles.benefitCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className={styles.benefitIcon}>
                                    <i className={`bx ${b.icon}`} />
                                </div>
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ СТОИМОСТЬ ============ */}
            <section className={styles.section} id="pricing">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.textAccent}>Стоимость</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Прозрачные цены — фиксируем стоимость до начала работы
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.pricingTableWrapper}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <table className={styles.pricingTable}>
                            <thead>
                                <tr>
                                    <th>Услуга</th>
                                    <th>Цена</th>
                                    <th>Сроки</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Парсер данных (базовый)</td>
                                    <td className={styles.pricingPrice}>от 15 000 ₽</td>
                                    <td className={styles.pricingTime}>3-5 дней</td>
                                </tr>
                                <tr>
                                    <td>Мониторинг цен конкурентов</td>
                                    <td className={styles.pricingPrice}>от 25 000 ₽</td>
                                    <td className={styles.pricingTime}>5-7 дней</td>
                                </tr>
                                <tr>
                                    <td>Repricer (автоизменение цен)</td>
                                    <td className={styles.pricingPrice}>от 30 000 ₽</td>
                                    <td className={styles.pricingTime}>7-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Полная автоматизация маркетплейса</td>
                                    <td className={styles.pricingPrice}>от 50 000 ₽</td>
                                    <td className={styles.pricingTime}>2-4 недели</td>
                                </tr>
                                <tr>
                                    <td>Аналитическая панель (дашборд)</td>
                                    <td className={styles.pricingPrice}>от 40 000 ₽</td>
                                    <td className={styles.pricingTime}>2-3 недели</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>

                    <motion.div
                        className={styles.portfolioCta}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <button className={styles.linkButton} onClick={scrollToForm}>
                            Обсудить проект бесплатно →
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="faq">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Частые <span className={styles.textAccent}>вопросы</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Ответы на вопросы, которые задают перед заказом парсера
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            { q: 'Сколько стоит парсер Wildberries?', a: 'Базовый парсер от 15 000 ₽. Полная система с мониторингом и уведомлениями — от 30 000 ₽.' },
                            { q: 'Какие данные можно собрать с маркетплейсов?', a: 'Названия, цены, рейтинги, отзывы, позиции в выдаче, данные о продажах.' },
                            { q: 'Парсинг маркетплейсов легален?', a: 'Да, при работе через официальный API. Я использую API Wildberries, Ozon и Avito.' },
                            { q: 'Сколько времени занимает разработка?', a: 'Базовый парсер 3-5 дней, сложная система 2-4 недели.' },
                            { q: 'Можно ли парсить несколько маркетплейсов одновременно?', a: 'Да, я разрабатываю мультиплатформенные решения для парсинга WB, Ozon, Avito и других площадок одновременно.' },
                            { q: 'Нужно ли обновлять парсер?', a: 'API маркетплейсов иногда меняются. Бесплатная поддержка 30 дней, далее — по договорённости.' },
                        ].map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ FINAL CTA ============ */}
            <section className={styles.finalCta}>
                <div className={styles.finalCtaGlow} />
                <div className={styles.container}>
                    <motion.div
                        className={styles.finalCtaContent}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.finalCtaTitle}>
                            Готовы заказать парсер маркетплейса?
                        </h2>
                        <p className={styles.finalCtaSubtitle}>
                            ✅ Бесплатная консультация<br />
                            ✅ Бесплатная поддержка 30 дней<br />
                            ✅ Работаю через API (легально)
                        </p>
                        <p className={styles.finalCtaSubtitle} style={{ marginTop: '16px', fontWeight: 600, color: '#00d4ff' }}>
                            Напишите мне в Telegram прямо сейчас →
                        </p>
                    </motion.div>

                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <LeadForm source="final-cta" title="Обсудить проект бесплатно" />
                    </motion.div>
                </div>
            </section>

            {/* ============ FOOTER ============ */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.footerGrid}>
                        <div>
                            <a href="/" className={styles.logo}>
                                <span className={styles.logoAccent}>D</span>imaRazrab
                            </a>
                            <p className={styles.footerDesc}>
                                Разработка парсеров, автоматизация маркетплейсов и веб-приложения для бизнеса.
                            </p>
                        </div>
                        <div>
                            <h4>Навигация</h4>
                            <a href="/">Главная</a>
                            <a href="#offers">Услуги</a>
                            <a href="#portfolio">Кейсы</a>
                            <a href="#pricing">Стоимость</a>
                        </div>
                        <div>
                            <h4>Информация</h4>
                            <a href="/privacy" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
                        </div>
                        <div>
                            <h4>Связаться</h4>
                            <a href="https://t.me/developer_telegrams" target="_blank" rel="noopener noreferrer">
                                Telegram: @developer_telegrams
                            </a>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>© {new Date().getFullYear()} Дмитрий Малышев. Все права защищены.</p>
                        <p>ИП / Самозанятый • ИНН: XXXXXXXXXX • ОГРНИП: XXXXXXXXXXXXX</p>
                    </div>
                </div>
            </footer>

            {/* ============ SEO CONTENT BLOCK ============ */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <h2 className={styles.seoH2}>Парсеры маркетплейсов — Wildberries, Ozon, Avito</h2>

                        <p>Парсер маркетплейсов — это программное решение, которое автоматически собирает данные с торговых площадок: цены товаров, рейтинги, отзывы, позиции в выдаче и многое другое. В условиях жёсткой конкуренции на Wildberries, Ozon и Avito парсинг данных стал необходимостью для каждого продавца, который хочет оставаться на шаг впереди.</p>

                        <h3 className={styles.seoH3}>Зачем нужен парсер Wildberries</h3>
                        <p>Парсер Wildberries позволяет в автоматическом режиме отслеживать цены конкурентов, изменения в ассортименте, позиции товаров в поисковой выдаче. Это экономит десятки часов ручной работы в неделю и даёт объективную картину рынка. Селлеры, использующие парсинг данных, увеличивают прибыль на 30-180% за счёт оптимизации ценообразования.</p>

                        <h3 className={styles.seoH3}>Автоматизация маркетплейсов</h3>
                        <p>Автоматизация маркетплейсов включает в себя не только парсинг, но и repricer (автоматическое изменение цен), мониторинг поставок, управление карточками товаров и аналитику. Система автоматизации Wildberries и Ozon позволяет сократить время на рутинные операции на 90-95%, освобождая время для стратегических задач.</p>

                        <h3 className={styles.seoH3}>Парсер Ozon и мониторинг цен</h3>
                        <p>Парсер Ozon собирает данные о ценах, продажах и рейтингах конкурентов. Мониторинг цен Wildberries и Ozon в реальном времени позволяет мгновенно реагировать на изменения рынка. Система уведомлений оповещает о снижении цен конкурентами, что даёт возможность оперативно скорректировать свою стратегию.</p>

                        <h3 className={styles.seoH3}>Repricer — автоматическое ценообразование</h3>
                        <p>Repricer для маркетплейсов — это система, которая автоматически корректирует цены ваших товаров на основе данных о ценах конкурентов. Вы задаёте правила (минимальная/максимальная цена, желаемая маржа, стратегия), а система делает всё остальное. Результат — рост прибыли на 30-180% без ручного труда.</p>

                        <h3 className={styles.seoH3}>Технологии разработки парсеров</h3>
                        <p>Для разработки парсеров маркетплейсов я использую Python — самый популярный язык для сбора и обработки данных. Работаю через официальные API Wildberries, Ozon и Avito, что гарантирует легальность и стабильность работы. Данные хранятся в PostgreSQL, для кэширования используется Redis, для уведомлений — Telegram API.</p>

                        {/* Internal links for SEO */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Другие наши услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-botov">Разработка Telegram-ботов</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ STICKY CTA (MOBILE) ============ */}
            <div className={styles.stickyCta}>
                <button className={styles.stickyCtaButton} onClick={scrollToForm}>
                    <i className='bx bx-message-dots' />
                    Обсудить проект
                </button>
            </div>

            <ScrollProgressBar />
            <TelegramFloat />
            <ExitIntentPopup onCtaClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
        </>
    );
}
