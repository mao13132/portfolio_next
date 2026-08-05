import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { PortfolioPopup } from '@/app/Components/Landing/PortfolioPopup';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ExitIntentPopup } from '@/app/Components/Landing/ExitIntentPopup';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';
import { Calculator } from '@/app/Components/Calculator/Calculator';
import { botCalculator } from '@/app/Components/Calculator/calculatorData';
import styles from './razrabotka-botov.module.css';

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
const PAGE_URL = `${SITE_URL}/razrabotka-botov`;
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
            "name": "Разработка ботов на заказ — Telegram, WhatsApp, Viber | Дмитрий Малышев",
            "description": "Профессиональная разработка ботов на заказ для бизнеса. Telegram-боты, WhatsApp-боты, Viber-боты. Автоматизация продаж, поддержки и маркетинга. Гарантия результата.",
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
                { "@type": "ListItem", "position": 2, "name": "Разработка ботов", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Разработка ботов на заказ",
            "description": "Создание Telegram-ботов, WhatsApp-ботов и Viber-ботов для автоматизации бизнеса. Продажи, поддержка, маркетинг, рассылки.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Разработка ботов",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["Telegram боты", "WhatsApp боты", "Viber боты", "Чат-боты", "Автоматизация бизнеса"]
            },
            "serviceType": "Разработка чат-ботов",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Пакеты разработки ботов",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Standard — Базовый бот",
                            "description": "Базовая логика, стандартные интеграции, срок 7-10 дней, поддержка 30 дней"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Professional — Продвинутый бот",
                            "description": "Мультиплатформа, аналитика, приоритетная разработка, поддержка 60 дней"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Premium — Комплексный бот",
                            "description": "Сложная логика, CRM, неограниченные интеграции, поддержка 90 дней, личный менеджер"
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
                    "name": "Сколько времени занимает разработка бота?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Простой бот — от 3 дней. Средний проект — 7-14 дней. Сложный бот с интеграциями — 14-30 дней. Точные сроки определяем после обсуждения задачи."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько стоит разработка бота?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Стоимость зависит от сложности проекта. После бесплатной консультации вы получите точную смету. Мы не завышаем цены — вы платите только за реальную работу."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Что входит в бесплатную поддержку?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Исправление багов, мелкие доработки, консультации по использованию, мониторинг работоспособности. Срок поддержки зависит от выбранного пакета — от 30 до 90 дней."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Могу ли я заказать бота, если не разбираюсь в технических деталях?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Конечно! Вам нужно только описать задачу бизнес-языком. Мы сами предложим оптимальное решение, а после запуска обучим вас работе с ботом."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие гарантии вы даёте?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Гарантируем выполнение всех согласованных функций. Бесплатная поддержка после запуска. Если бот не работает как обещано — исправим за свой счёт."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Бот будет работать на моём телефоне?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Нет, бот работает на сервере 24/7 независимо от вашего телефона или компьютера. Он отвечает клиентам даже когда вы спите."
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

        // Create particles
        const count = Math.min(80, Math.floor(window.innerWidth / 18));
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() > 0.5 ? 180 : 270, // cyan or purple
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
                // Mouse attraction
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

                // Wrap around edges
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                // Friction
                p.vx *= 0.999;
                p.vy *= 0.999;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity * 0.15})`;
                ctx.fill();
            });

            // Draw connections
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
   USE SCROLL ANIMATION HOOK
   ============================================================ */

const useScrollAnimation = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return { ref, isVisible };
};

/* ============================================================
   LEAD FORM COMPONENT (REUSABLE)
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
                text: `[${source}] ${task || 'Заявка с лендинга "Разработка ботов"'}`,
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

export default function RazrabotkaBotovPage() {
    const [headerSolid, setHeaderSolid] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);

    // Scroll handler for header
    useEffect(() => {
        const handler = () => setHeaderSolid(window.scrollY > 50);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Smooth scroll to form
    const scrollToForm = useCallback(() => {
        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    // Breadcrumb
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Разработка ботов", "item": PAGE_URL }
        ]
    };

    return (
        <>
            <ClickComponent />
            <Head>
                <title>Разработка Telegram-ботов на заказ — боты для бизнеса | DimaRazrab</title>
                <meta
                    name="description"
                    content="Создаю Telegram-ботов для бизнеса. Бесплатная поддержка 30 дней. Быстрые сроки, доступные цены от 25 000 ₽. Обсудите проект в Telegram!"
                />
                <meta name="keywords" content="разработка ботов, заказать бота, telegram бот на заказ, чат бот разработка, бот для бизнеса, автоматизация, whatsapp бот, создание ботов, разработка telegram бота, разработка телеграм бота, разработка бота для telegram, разработка бота telegram python, telegram бот на python, разработка ботов telegram python, разработка тг ботов, разработка чат ботов, разработка чат ботов telegram, разработчик telegram бота, заказать разработку телеграм бота, заказать разработку чат бота, телеграм бот заказать, сделать телеграм бота, создание бота telegram python, создание чат бота telegram python, чат бот telegram python" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Дмитрий Малышев — Разработка ботов" />
                <meta property="og:title" content="Разработка Telegram-ботов на заказ — боты для бизнеса | DimaRazrab" />
                <meta property="og:description" content="Создаю Telegram-ботов для бизнеса. Бесплатная поддержка 30 дней. Быстрые сроки, доступные цены от 25 000 ₽. Обсудите проект в Telegram!" />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Разработка Telegram-ботов на заказ — боты для бизнеса | DimaRazrab" />
                <meta name="twitter:description" content="Создаю Telegram-ботов для бизнеса. Бесплатная поддержка 30 дней. Быстрые сроки, доступные цены от 25 000 ₽." />
                <meta name="twitter:image" content={OG_IMAGE} />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
            </Head>

            {/* ============ HEADER ============ */}
            <header className={`${styles.header} ${headerSolid ? styles.headerSolid : ''}`}>
                <div className={styles.headerInner}>
                    <a href="/" className={styles.logo}>
                        <span className={styles.logoAccent}>D</span>imaRazrab
                    </a>

                    <nav className={`${styles.nav} ${mobileMenu ? styles.navOpen : ''}`}>
                        <a href="#benefits" onClick={() => setMobileMenu(false)}>Преимущества</a>
                        <a href="#offers" onClick={() => setMobileMenu(false)}>Пакеты</a>
                        <a href="#process" onClick={() => setMobileMenu(false)}>Как работаем</a>
                        <a href="#portfolio" onClick={() => setMobileMenu(false)}>Портфолио</a>
                        <a href="#faq" onClick={() => setMobileMenu(false)}>FAQ</a>
                        <a href="/kalkulyator-stoimosti" onClick={() => setMobileMenu(false)}>Калькулятор</a>
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

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 0' }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Разработка ботов' },
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
                                ⚡ Бесплатная консультация • Ответ за 30 минут
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                            >
                                Разработка ботов, которые{' '}
                                <span className={styles.heroHighlight}>приносят клиентов</span>{' '}
                                и автоматизируют бизнес
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                Создаю Telegram, WhatsApp и Viber ботов, которые работают 24/7:
                                отвечают клиентам, принимают заказы, автоматизируют продажи и
                                сокращают расходы на персонал до 60%.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.45 }}
                            >
                                {['От 3 дней на разработку', 'Бесплатная поддержка до 90 дней', 'Гарантия результата'].map((b, i) => (
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
                                subtitle="Расскажите о задаче — предложу решение и смету"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Diagonal accent */}
                <div className={styles.diagonalDivider} />
            </section>

            {/* ============ PAIN POINTS ============ */}
            <section className={styles.section} id="pain">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Узнаёте <span className={styles.textAccent}>себя?</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Эти проблемы решает один хорошо спроектированный бот
                        </p>
                    </motion.div>

                    <div className={styles.painGrid}>
                        {[
                            { icon: 'bx-money-withdraw', text: 'Менеджеры не успевают отвечать клиентам — вы теряете 40% заявок в нерабочее время' },
                            { icon: 'bx-time-five', text: 'Однотипные вопросы отнимают часы рабочего времени каждый день' },
                            { icon: 'bx-trending-down', text: 'Конверсия сайта падает — клиенты уходят, не дождавшись ответа' },
                            { icon: 'bx-user-x', text: 'Найм дополнительных сотрудников обходится в 50 000-150 000 ₽/мес на каждого' },
                            { icon: 'bx-error-circle', text: 'Человеческие ошибки при обработке заказов и передаче данных' },
                            { icon: 'bx-lock', text: 'Конкуренты уже используют ботов и перехватывают ваших клиентов' },
                        ].map((pain, i) => (
                            <motion.div
                                key={i}
                                className={styles.painCard}
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <i className={`bx ${pain.icon}`} />
                                <p>{pain.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ BENEFITS / SOLUTIONS ============ */}
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
                            Что даст бот <span className={styles.textAccent}>вашему бизнесу</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Конкретные результаты, которые вы получите после запуска
                        </p>
                    </motion.div>

                    <div className={styles.benefitsGrid}>
                        {[
                            { icon: 'bx-bot', title: 'Работает 24/7 без выходных', desc: 'Бот отвечает клиентам мгновенно в любое время — вы не теряете ни одну заявку, даже ночью и в праздники.' },
                            { icon: 'bx-line-chart', title: 'Рост конверсии до 300%', desc: 'Мгновенный ответ увеличивает вероятность покупки. Клиент не уходит к конкуренту, пока ждёт ответ менеджера.' },
                            { icon: 'bx-wallet', title: 'Экономия до 60% на персонале', desc: 'Один бот заменяет 3-5 менеджеров по обработке типовых запросов. ROI — уже в первый месяц.' },
                            { icon: 'bx-target-lock', title: 'Автоматизация воронки продаж', desc: 'Бот квалифицирует лиды, собирает контакты, отправляет КП и переводит на менеджера только горячих клиентов.' },
                            { icon: 'bx-data', title: 'Аналитика и контроль', desc: 'Полная статистика: сколько клиентов обратилось, что спрашивали, где теряются. Данные для принятия решений.' },
                            { icon: 'bx-shield-quarter', title: 'Интеграция с вашими системами', desc: 'CRM, amoCRM, 1С, Google Таблицы, платежи — бот подключается к любым сервисам, которые вы используете.' },
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
                                {/* Diagonal accent on card */}
                                {i % 3 === 0 && <div className={styles.cardDiagonalBadge}>HOT</div>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ INTERMEDIATE FORM ============ */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.midFormWrapper}
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles.midFormContent}>
                            <h2>Уже знаете, какой бот вам нужен?</h2>
                            <p>Опишите задачу — получите смету и сроки за 30 минут</p>
                        </div>
                        <LeadForm source="mid-page" compact />
                    </motion.div>
                </div>
            </section>

            {/* ============ OFFERS (3 TARIFFS) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="offers">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Выберите свой <span className={styles.textAccent}>пакет</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Каждый пакет включает полный цикл: от идеи до запуска и поддержки
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* Standard */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Базовый</span>
                                <h3 className={styles.offerName}>Standard</h3>
                                <p className={styles.offerFor}>Для старта и тестирования гипотезы</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> 1 платформа (Telegram / WhatsApp / Viber)</li>
                                <li><i className='bx bx-check' /> Базовая логика и сценарии</li>
                                <li><i className='bx bx-check' /> Стандартные интеграции</li>
                                <li><i className='bx bx-check' /> Срок: 7-10 рабочих дней</li>
                                <li><i className='bx bx-check' /> Бесплатная поддержка 30 дней</li>
                                <li><i className='bx bx-check' /> Обучение работе с ботом</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Оставить заявку
                                </button>
                                <span className={styles.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>

                        {/* Professional — POPULAR */}
                        <motion.div
                            className={`${styles.offerCard} ${styles.offerCardPopular}`}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.popularBadge}>★ Популярный</div>
                            <div className={styles.offerDiagonalAccent}>PRO</div>
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Продвинутый</span>
                                <h3 className={styles.offerName}>Professional</h3>
                                <p className={styles.offerFor}>Для роста продаж и автоматизации</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> До 3 платформ одновременно</li>
                                <li><i className='bx bx-check' /> Продвинутая логика и воронки</li>
                                <li><i className='bx bx-check' /> Интеграция с CRM / amoCRM / 1С</li>
                                <li><i className='bx bx-check' /> Аналитика и дашборд</li>
                                <li><i className='bx bx-check' /> Приоритетная разработка: 5-7 дней</li>
                                <li><i className='bx bx-check' /> Бесплатная поддержка 60 дней</li>
                                <li><i className='bx bx-check' /> A/B тестирование сценариев</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Оставить заявку
                                </button>
                                <span className={styles.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>

                        {/* Premium */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerDiagonalAccent}>VIP</div>
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Комплексный</span>
                                <h3 className={styles.offerName}>Premium</h3>
                                <p className={styles.offerFor}>Максимум возможностей и поддержки</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Все платформы + Web Widget</li>
                                <li><i className='bx bx-check' /> Сложная бизнес-логика без ограничений</li>
                                <li><i className='bx bx-check' /> Неограниченные интеграции</li>
                                <li><i className='bx bx-check' /> AI / GPT интеграция</li>
                                <li><i className='bx bx-check' /> Личный менеджер проекта</li>
                                <li><i className='bx bx-check' /> Бесплатная поддержка 90 дней</li>
                                <li><i className='bx bx-check' /> Приоритет 24/7</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Оставить заявку
                                </button>
                                <span className={styles.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ PROCESS ============ */}
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
                            Как мы <span className={styles.textAccent}>работаем</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Прозрачный процесс — вы всегда знаете, на каком этапе проект
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx-conversation', title: 'Бесплатная консультация', desc: 'Обсуждаем задачу, цели и ожидания. Анализируем вашу нишу и конкурентов. Предлагаю оптимальное решение.' },
                            { num: '02', icon: 'bx-file', title: 'Техническое задание', desc: 'Составляю детальное ТЗ с описанием всех функций, сценариев и интеграций. Вы точно знаете, что получите.' },
                            { num: '03', icon: 'bx-code-alt', title: 'Разработка и тестирование', desc: 'Пишу код, тестирую все сценарии, проверяю работу в реальных условиях. Промежуточные демо на каждом этапе.' },
                            { num: '04', icon: 'bx-rocket', title: 'Запуск и обучение', desc: 'Разворачиваю бота на продакшене, настраиваю аналитику, обучаю вашу команду работе с ним.' },
                            { num: '05', icon: 'bx-support', title: 'Поддержка и развитие', desc: 'Бесплатная поддержка 30-90 дней. Дорабатываю, оптимизирую, масштабирую по мере роста бизнеса.' },
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

            {/* ============ GUARANTEES ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="guarantees">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Мои <span className={styles.textAccent}>гарантии</span> вам
                        </h2>
                    </motion.div>

                    <div className={styles.guaranteesGrid}>
                        {[
                            { icon: 'bx-shield', title: 'Гарантия результата', desc: 'Если бот не работает как описано в ТЗ — исправлю за свой счёт. Без доплат и отговорок.' },
                            { icon: 'bx-revision', title: 'Бесплатные правки', desc: 'В течение всего срока поддержки — любые доработки и исправления без дополнительной оплаты.' },
                            { icon: 'bx-time', title: 'Соблюдение сроков', desc: 'Фиксируем дедлайн в договоре. Если задержка с моей стороны — скидка 10% за каждую неделю.' },
                            { icon: 'bx-lock-alt', title: 'Конфиденциальность', desc: 'NDA по запросу. Ваш код и данные — только ваши. Не передаю третьим лицам.' },
                        ].map((g, i) => (
                            <motion.div
                                key={i}
                                className={styles.guaranteeCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <i className={`bx ${g.icon}`} />
                                <h3>{g.title}</h3>
                                <p>{g.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ PORTFOLIO ============ */}
            <section className={styles.section} id="portfolio">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Примеры <span className={styles.textAccent}>выполненных проектов</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Более 2000 реализованных проектов. Вот некоторые из них:
                        </p>
                    </motion.div>

                    <div className={styles.portfolioGrid}>
                        {[
                            { title: 'Бот для ресторана', desc: 'Приём заказов, бронирование столиков, меню с фото. Рост онлайн-заказов на 180%.', tech: 'Python, Telegram API, PostgreSQL', category: 'HoReCa' },
                            { title: 'Бот-магазин одежды', desc: 'Каталог, фильтры, корзина, оплата. Конверсия 12% — в 3 раза выше сайта.', tech: 'Python, aiogram, Stripe', category: 'E-commerce' },
                            { title: 'Бот поддержки клиентов', desc: 'Ответы на 85% вопросов без участия операторов. Экономия 200 000 ₽/мес.', tech: 'Python, OpenAI GPT, CRM', category: 'Support' },
                            { title: 'Бот для фитнес-клуба', desc: 'Запись на тренировки, напоминания, программа лояльности. Возврат 40% клиентов.', tech: 'Python, Telegram API, 1C', category: 'Fitness' },
                            { title: 'Бот для агентства недвижимости', desc: 'Подбор объектов, запись на просмотр, квалификация лидов. +60% конверсия.', tech: 'Python, amoCRM API', category: 'Real Estate' },
                            { title: 'Бот-квиз для маркетинга', desc: 'Интерактивный опрос с персональным предложением. 35% заполненных анкет.', tech: 'Python, Telegram API, Sheets', category: 'Marketing' },
                        ].map((project, i) => (
                            <motion.div
                                key={i}
                                className={styles.portfolioCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className={styles.portfolioCategory}>{project.category}</div>
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className={styles.portfolioTech}>{project.tech}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className={styles.portfolioCta}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <button className={styles.linkButton} onClick={() => setPortfolioOpen(true)}>
                            Смотреть все проекты →
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ============ SOCIAL PROOF ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="results">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Цифры говорят <span className={styles.textAccent}>за нас</span>
                        </h2>
                    </motion.div>

                    <div className={styles.statsGrid}>
                        {[
                            { num: '2000+', label: 'Проектов выполнено' },
                            { num: '5+', label: 'Лет опыта разработки' },
                            { num: '98%', label: 'Клиентов довольны' },
                            { num: '24ч', label: 'Среднее время ответа' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                className={styles.statCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className={styles.statNum}>{s.num}</div>
                                <div className={styles.statLabel}>{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section className={styles.section} id="faq">
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
                            Ответы на вопросы, которые задают 90% клиентов перед заказом
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            { q: 'Сколько времени занимает разработка бота?', a: 'Простой бот — от 3 дней. Средний проект — 7-14 дней. Сложный бот с интеграциями — 14-30 дней. Точные сроки определяем после обсуждения задачи.' },
                            { q: 'Сколько стоит разработка бота?', a: 'Стоимость зависит от сложности проекта. После бесплатной консультации вы получите точную смету. Мы не завышаем цены — вы платите только за реальную работу.' },
                            { q: 'Что входит в бесплатную поддержку?', a: 'Исправление багов, мелкие доработки, консультации по использованию, мониторинг работоспособности. Срок поддержки зависит от выбранного пакета — от 30 до 90 дней.' },
                            { q: 'Могу ли я заказать бота, если не разбираюсь в технических деталях?', a: 'Конечно! Вам нужно только описать задачу бизнес-языком. Мы сами предложим оптимальное решение, а после запуска обучим вас работе с ботом.' },
                            { q: 'Какие гарантии вы даёте?', a: 'Гарантируем выполнение всех согласованных функций. Бесплатная поддержка после запуска. Если бот не работает как обещано — исправим за свой счёт.' },
                            { q: 'Бот будет работать на моём телефоне?', a: 'Нет, бот работает на сервере 24/7 независимо от вашего телефона или компьютера. Он отвечает клиентам даже когда вы спите.' },
                        ].map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <Calculator config={botCalculator} />

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
                            Готовы автоматизировать бизнес и увеличить продажи?
                        </h2>
                        <p className={styles.finalCtaSubtitle}>
                            Оставьте заявку — обсудим ваш проект бесплатно и без обязательств.
                            Ответ в течение 30 минут в рабочее время.
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
                                Разработка ботов, автоматизация и веб-приложения для бизнеса.
                            </p>
                        </div>
                        <div>
                            <h4>Навигация</h4>
                            <a href="/">Главная</a>
                            <a href="#benefits">Преимущества</a>
                            <a href="#offers">Пакеты</a>
                            <a href="#portfolio">Портфолио</a>
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
                        <h2 className={styles.seoH2}>Разработка Telegram-ботов на Python</h2>

                        <p>Разработка Telegram-ботов — одно из самых востребованных направлений в автоматизации бизнеса. Telegram-бот на Python позволяет автоматизировать обработку заявок, консультации клиентов, приём заказов, рассылки и десятки других задач. В отличие от живых менеджеров, бот работает 24/7, не ошибается и мгновенно отвечает — даже в 3 часа ночи.</p>

                        <h3 className={styles.seoH3}>Зачем заказать разработку Telegram-бота</h3>
                        <p>Заказать разработку телеграм-бота выгодно по нескольким причинам. Во-первых, это экономия: один бот заменяет 3-5 менеджеров по обработке типовых запросов. Во-вторых, скорость: бот отвечает за секунды, а не минуты — конверсия растёт на 40-200%. В-третьих, масштабируемость: бот обрабатывает тысячи обращений одновременно без потери качества.</p>
                        <p>Разработка телеграм-бота на заказ — это не просто написание кода. Это проектирование бизнес-логики: какие вопросы задавать клиенту, как квалифицировать лиды, когда передавать заявку менеджеру, какую аналитику собирать. Поэтому важно обратиться к опытному разработчику ботов, а не просто «сделать телеграм-бота» на конструкторе.</p>

                        <h3 className={styles.seoH3}>Разработка бота Telegram на Python: технологии</h3>
                        <p>Разработка бота Telegram на Python — самый популярный стек для чат-ботов. Python предлагает богатый набор библиотек: aiogram, python-telegram-bot, Telethon. Я использую <strong>aiogram 3.x</strong> — асинхронный фреймворк, который выдерживает тысячи одновременных пользователей. Для хранения данных — PostgreSQL, для кэширования — Redis, для фоновых задач — Celery.</p>
                        <p>Создание чат-бота Telegram на Python включает: настройку webhook, реализацию диалоговых сценариев, интеграцию с внешними API (платежи, CRM, аналитика), административную панель для управления контентом и статистику использования.</p>

                        <h3 className={styles.seoH3}>Что умеют наши боты</h3>
                        <p>Разработка чат-ботов Telegram — это не только ответы на вопросы. Вот что умеют наши боты:</p>
                        <ul className={styles.seoList}>
                            <li><strong>Приём заказов</strong> — каталог товаров, корзина, оплата прямо в Telegram</li>
                            <li><strong>Квалификация лидов</strong> — бот задаёт вопросы, определяет «горячего» клиента и передаёт менеджеру</li>
                            <li><strong>Рассылки</strong> — сегментированные рассылки по интересам, геолокации, истории покупок</li>
                            <li><strong>Поддержка 24/7</strong> — ответы на частые вопросы, тикет-система, эскалация на оператора</li>
                            <li><strong>Запись и бронирование</strong> — на услуги, мероприятия, столики в ресторане</li>
                            <li><strong>Опросы и квизы</strong> — сбор обратной связи, маркетинговые исследования, геймификация</li>
                            <li><strong>Интеграции</strong> — CRM (amoCRM, Битрикс), 1С, Google Sheets, платежные системы</li>
                        </ul>

                        <h3 className={styles.seoH3}>Сколько стоит разработка ботов</h3>
                        <p>Стоимость разработки ботов зависит от сложности. Простой бот-визитка с меню и ответами — от 15 000 ₽. Бот с воронкой продаж и интеграцией CRM — от 40 000 ₽. Сложный бот с каталогом, оплатой и аналитикой — от 80 000 ₽. После бесплатной консультации вы получите точную смету.</p>
                        <p>Разработчики ботов часто занижают сроки и бюджет. Я фиксирую стоимость и сроки в договоре, а также даю бесплатную поддержку 30-90 дней после запуска.</p>

                        <h3 className={styles.seoH3}>Как заказать разработку чат-бота</h3>
                        <p>Чтобы заказать разработку чат-бота, достаточно описать задачу. Не нужно знать технические термины — расскажите бизнес-языком: что должен делать бот, для кого, с какими системами интегрироваться. Я предложу оптимальное решение и точную смету.</p>
                        <p>Разработчик чат-ботов — это не только программист, но и аналитик, который помогает понять, какие процессы выгоднее автоматизировать первыми. Если вы не знаете, с чего начать — просто напишите, имы вместе определим приоритеты.</p>

                        <h3 className={styles.seoH3}>Почему выбирают нас</h3>
                        <p>Разработчики ботов — это рынок, где важно не только качество кода, но и понимание бизнеса. Я не просто «пишу ботов» — я помогаю увеличить продажи, сократить расходы и автоматизировать рутину. Более 50 реализованных проектов, бесплатная поддержка, полный исходный код и гарантия результата.</p>

                        {/* Internal links for SEO */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Полезные статьи из блога</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/blog/telegram-bot-dlya-biznesa">Telegram бот для бизнеса: руководство</a>
                                <a href="/blog/stoimost-razrabotki">Сколько стоит разработка бота</a>
                                <a href="/blog/telegram-bot-dlya-priyoma-zayavok">Бот для приёма заявок</a>
                                <a href="/blog/telegram-bot-dlya-prodazh">Бот для продаж: увеличьте выручку</a>
                                <a href="/blog/ai-telegram-bot-dlya-biznesa">AI Telegram бот для бизнеса</a>
                                <a href="/blog/telegram-boty">Все статьи о Telegram-ботах</a>
                            </div>
                            <h3 style={{ marginTop: '24px' }}>Другие наши услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                                <a href="/razrabotka-crm">Разработка CRM</a>
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

            <PortfolioPopup isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
            <ScrollProgressBar />
            <TelegramFloat />
            <ExitIntentPopup onCtaClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
        </>
    );
}
