import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ExitIntentPopup } from '@/app/Components/Landing/ExitIntentPopup';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';
import { Calculator } from '@/app/Components/Calculator/Calculator';
import { botCalculator, siteCalculator, parserCalculator } from '@/app/Components/Calculator/calculatorData';
import type { CalculatorConfig } from '@/app/Components/Calculator/calculatorData';
import styles from './kalkulyator-stoimosti.module.css';

/* ============================================================
   TYPES
   ============================================================ */

interface Particle {
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; hue: number;
}

type TabKey = 'bots' | 'sites' | 'parsers';

interface TabConfig {
    key: TabKey;
    label: string;
    icon: string;
    config: CalculatorConfig;
}

/* ============================================================
   CONSTANTS
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/kalkulyator-stoimosti`;
const OG_IMAGE = `${SITE_URL}/media/og_desc.jpg`;

const TABS: TabConfig[] = [
    { key: 'bots', label: 'Боты', icon: '🤖', config: botCalculator },
    { key: 'sites', label: 'Сайты', icon: '🌐', config: siteCalculator },
    { key: 'parsers', label: 'Парсеры', icon: '📊', config: parserCalculator },
];

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
            "name": "Калькулятор стоимости разработки: сайт, Telegram-бот, парсер | DimaRazrab",
            "description": "Рассчитайте стоимость разработки за 30 секунд. Telegram-бот от 7 000 ₽, сайт от 10 000 ₽, парсер от 10 000 ₽. Точная смета за 24 часа.",
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
                { "@type": "ListItem", "position": 2, "name": "Калькулятор стоимости", "item": PAGE_URL }
            ]
        },
        {
            "@type": "WebApplication",
            "@id": `${PAGE_URL}#calculator`,
            "name": "Калькулятор стоимости разработки",
            "description": "Интерактивный калькулятор для расчёта стоимости разработки Telegram-бота, сайта или парсера. Выберите тип проекта и дополнительные функции.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "url": PAGE_URL,
            "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "7000",
                "highPrice": "100000",
                "priceCurrency": "RUB",
                "offerCount": "3"
            },
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Разработка",
                "url": SITE_URL
            }
        },
        {
            "@type": "FAQPage",
            "@id": `${PAGE_URL}#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Сколько стоит разработка Telegram-бота?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Стоимость разработки Telegram-бота начинается от 7 000 ₽ за базового бота с меню и FAQ. Бот средней сложности с записью и напоминаниями — от 15 000 ₽. Сложный бот с CRM, AI и аналитикой — от 40 000 ₽. Точная цена зависит от набора функций и интеграций."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Из чего складывается стоимость сайта?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Стоимость сайта зависит от типа (лендинг, визитка, корпоративный, интернет-магазин), количества страниц, дизайна, интеграций (CRM, платёжные системы) и дополнительных функций (SEO, мультиязычность, админ-панель). Лендинг от 10 000 ₽, интернет-магазин от 50 000 ₽."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько времени занимает разработка?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Простой проект — 3-5 рабочих дней. Средний проект — 7-14 дней. Сложный проект с множеством интеграций — 14-21 день. Точные сроки определяем после обсуждения задачи и фиксируем в договоре."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Можно ли сэкономить на разработке?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, можно начать с базовой версии и постепенно добавлять функции. Также экономия достигается за счёт чёткого ТЗ и приоритизации функций. Однако экономить на качестве разработки не стоит — переделка обходится дороже."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Что лучше: фрилансер или студия?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Фрилансер — это персональный подход, гибкость и ниже стоимость. Студия — больше ресурсов, но выше цена и менее гибкий процесс. Для большинства проектов фрилансер с опытом — оптимальный выбор по соотношению цена/качество."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие гарантии вы предоставляете?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Гарантируем выполнение всех согласованных функций по ТЗ. Бесплатная поддержка 30-90 дней после запуска. Фиксация сроков и стоимости в договоре. Если проект не соответствует ТЗ — исправляем за свой счёт."
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
                name: name || 'Лид с калькулятора',
                telegram: contact,
                phone: '',
                email: '',
                text: `[${source}] ${task || 'Заявка со страницы калькулятора стоимости'}`,
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
                {loading ? 'Отправка...' : 'Получить точную смету'}
            </button>
        </form>
    );
};

/* ============================================================
   MAIN PAGE COMPONENT
   ============================================================ */

export default function KalkulyatorStoimostiPage() {
    const [headerSolid, setHeaderSolid] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [activeTab, setActiveTab] = useState<TabKey>('bots');

    useEffect(() => {
        const handler = () => setHeaderSolid(window.scrollY > 50);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const currentTab = TABS.find(t => t.key === activeTab) ?? TABS[0];

    return (
        <>
            <ClickComponent />
            <Head>
                <title>Калькулятор стоимости разработки: сайт, Telegram-бот, парсер | DimaRazrab</title>
                <meta
                    name="description"
                    content="Рассчитайте стоимость разработки за 30 секунд. Telegram-бот от 7 000 ₽, сайт от 10 000 ₽, парсер от 10 000 ₽. Точная смета за 24 часа →"
                />
                <meta name="keywords" content="калькулятор стоимости разработки, рассчитать стоимость сайта, сколько стоит telegram бот, стоимость парсера, калькулятор разработки, цена разработки сайта, цена разработки бота, стоимость создания сайта, заказать разработку, смета разработки" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Дмитрий Малышев — Разработка" />
                <meta property="og:title" content="Калькулятор стоимости разработки: сайт, Telegram-бот, парсер | DimaRazrab" />
                <meta property="og:description" content="Рассчитайте стоимость разработки за 30 секунд. Telegram-бот от 7 000 ₽, сайт от 10 000 ₽, парсер от 10 000 ₽." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Калькулятор стоимости разработки: сайт, Telegram-бот, парсер | DimaRazrab" />
                <meta name="twitter:description" content="Рассчитайте стоимость разработки за 30 секунд. Telegram-бот от 7 000 ₽, сайт от 10 000 ₽, парсер от 10 000 ₽." />
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
                        <a href="#calculator" onClick={() => setMobileMenu(false)}>Калькулятор</a>
                        <a href="#pricing-info" onClick={() => setMobileMenu(false)}>Цены</a>
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

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 0' }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Калькулятор стоимости' },
                ]} />
            </div>

            {/* ============ HERO ============ */}
            <section className={styles.hero}>
                <ParticlesBg />

                <div className={styles.heroGlow1} />
                <div className={styles.heroGlow2} />

                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <motion.div
                            className={styles.heroBadge}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            ⚡ Рассчитайте за 30 секунд • Без регистрации
                        </motion.div>

                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            Рассчитайте стоимость разработки{' '}
                            <span className={styles.heroHighlight}>за 30 секунд</span>
                        </motion.h1>

                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            Выберите тип проекта и получите мгновенный расчёт.
                            Telegram-бот от 7 000 ₽, сайт от 10 000 ₽, парсер от 10 000 ₽.
                        </motion.p>
                    </div>
                </div>

                <div className={styles.diagonalDivider} />
            </section>

            {/* ============ CALCULATOR WITH TABS ============ */}
            <section className={styles.section} id="calculator">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Выберите тип <span className={styles.textAccent}>проекта</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Переключайте вкладки и настраивайте параметры — цена обновляется мгновенно
                        </p>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        className={styles.tabsContainer}
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {TABS.map(tab => (
                            <button
                                key={tab.key}
                                className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ''}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                <span className={styles.tabIcon}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Calculator */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={styles.tabContent}
                        >
                            <Calculator config={currentTab.config} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ============ SEO: КАК ФОРМИРУЕТСЯ СТОИМОСТЬ ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="pricing-info">
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.seoH2}>
                                Как формируется <span className={styles.textAccent}>стоимость разработки</span>
                            </h2>
                            <p className={styles.seoP}>
                                Стоимость разработки цифрового продукта зависит от множества факторов: тип проекта, количество функций, сложность интеграций, дизайн и сроки. Понимание этих факторов поможет вам составить реалистичный бюджет и получить максимальную отдачу от вложений.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className={styles.seoH3}>Основные факторы стоимости</h3>
                            <ul className={styles.seoList}>
                                <li><strong>Тип проекта</strong> — базовый бот, лендинг или простой парсер стоят значительно меньше, чем сложный сервис с десятками интеграций</li>
                                <li><strong>Количество функций</strong> — каждая дополнительная функция (оплата, рассылки, AI) увеличивает стоимость на фиксированную сумму</li>
                                <li><strong>Интеграции</strong> — подключение к CRM, платёжным системам, маркетплейсам требует дополнительного времени на разработку и тестирование</li>
                                <li><strong>Дизайн</strong> — кастомный дизайн дороже типового, но значительно повышает конверсию</li>
                                <li><strong>Сроки</strong> — срочные проекты могут стоить дороже из-за приоритетной разработки</li>
                                <li><strong>Поддержка</strong> — бесплатная поддержка 30-90 дней включена в стоимость, продлённая поддержка — отдельная статья расходов</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className={styles.seoH3}>Почему цены прозрачны</h3>
                            <p className={styles.seoP}>
                                Я не завышаю цены и не скрываю стоимость за «индивидуальным расчётом». Калькулятор выше показывает реальные цены на разработку. Финальная смета может отличаться на 10-15% в зависимости от деталей проекта, но вы всегда знаете порядок суммы до начала работы. Стоимость фиксируется в договоре — никаких доплат без вашего согласия.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SEO: СТОИМОСТЬ TELEGRAM-БОТА ============ */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.seoH2}>
                                Сколько стоит <span className={styles.textAccent}>Telegram-бот в 2026 году</span>
                            </h2>
                            <p className={styles.seoP}>
                                <a href="/razrabotka-botov">Разработка Telegram-бота</a> — одно из самых доступных решений для автоматизации бизнеса. Бот работает 24/7, не требует зарплаты и мгновенно отвечает клиентам. Вот типичные цены на рынке разработки ботов в 2026 году:
                            </p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <table className={styles.priceTable}>
                                <thead>
                                    <tr>
                                        <th>Тип бота</th>
                                        <th>Функции</th>
                                        <th>Срок</th>
                                        <th>Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Информационный</strong></td>
                                        <td>Меню, FAQ, квиз, заявка</td>
                                        <td>3-5 дней</td>
                                        <td><strong>от 7 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Бот-визитка</strong></td>
                                        <td>+ каталог, карточки товаров</td>
                                        <td>5-7 дней</td>
                                        <td><strong>от 12 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Бот для записи</strong></td>
                                        <td>+ календарь, напоминания, валидация</td>
                                        <td>7-10 дней</td>
                                        <td><strong>от 15 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Бот-магазин</strong></td>
                                        <td>+ корзина, оплата, уведомления</td>
                                        <td>10-14 дней</td>
                                        <td><strong>от 25 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Бот с CRM и AI</strong></td>
                                        <td>+ CRM, ChatGPT, аналитика, админка</td>
                                        <td>14-21 день</td>
                                        <td><strong>от 40 000 ₽</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <p className={styles.seoP}>
                                Стоимость Telegram-бота на Python с использованием aiogram 3.x включает: разработку бизнес-логики, настройку сервера, интеграции с внешними API, тестирование и бесплатную поддержку 30-90 дней. Подробнее — на странице <a href="/razrabotka-botov">разработки ботов</a>.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SEO: СТОИМОСТЬ САЙТА ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.seoH2}>
                                Сколько стоит <span className={styles.textAccent}>создание сайта</span>
                            </h2>
                            <p className={styles.seoP}>
                                <a href="/razrabotka-servisov">Создание сайта</a> — это инвестиция в онлайн-присутствие вашего бизнеса. Стоимость зависит от типа сайта, количества страниц и интеграций. Вот актуальные цены на <a href="/blog/sajty-na-zakaz">сайты на заказ</a> в 2026 году:
                            </p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <table className={styles.priceTable}>
                                <thead>
                                    <tr>
                                        <th>Тип сайта</th>
                                        <th>Описание</th>
                                        <th>Срок</th>
                                        <th>Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Лендинг</strong></td>
                                        <td>1 страница, форма захвата, адаптив</td>
                                        <td>3-5 дней</td>
                                        <td><strong>от 10 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Сайт-визитка</strong></td>
                                        <td>3-5 страниц, навигация, формы</td>
                                        <td>5-7 дней</td>
                                        <td><strong>от 15 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Корпоративный сайт</strong></td>
                                        <td>10+ страниц, SEO, админка</td>
                                        <td>10-14 дней</td>
                                        <td><strong>от 30 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Интернет-магазин</strong></td>
                                        <td>Каталог, корзина, оплата, фильтры</td>
                                        <td>14-21 день</td>
                                        <td><strong>от 50 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Веб-сервис / SaaS</strong></td>
                                        <td>Личные кабинеты, API, сложная логика</td>
                                        <td>21-30 дней</td>
                                        <td><strong>от 80 000 ₽</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <p className={styles.seoP}>
                                Создание <a href="/blog/sozdanie-lendinga">лендинга на заказ</a> — самый быстрый способ запустить онлайн-присутствие. Корпоративный сайт подходит для компаний, которым нужна SEO-оптимизация и контент-маркетинг. Интернет-магазин оправдан, если вы продаёте физические или цифровые товары. Подробнее — на странице <a href="/razrabotka-servisov">разработки сервисов</a>.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SEO: СТОИМОСТЬ ПАРСЕРА ============ */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.seoH2}>
                                Сколько стоит <span className={styles.textAccent}>парсер данных</span>
                            </h2>
                            <p className={styles.seoP}>
                                <a href="/parsery-marketplejsov">Парсер данных</a> — это инструмент для автоматического сбора информации с сайтов, маркетплейсов и других источников. Парсеры экономят часы ручного труда и позволяют принимать решения на основе актуальных данных. Вот цены на <a href="/blog/parser-wildberries">парсеры маркетплейсов</a> и других источников:
                            </p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <table className={styles.priceTable}>
                                <thead>
                                    <tr>
                                        <th>Тип парсера</th>
                                        <th>Возможности</th>
                                        <th>Срок</th>
                                        <th>Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Простой парсер</strong></td>
                                        <td>1 источник, экспорт CSV/Excel</td>
                                        <td>3-5 дней</td>
                                        <td><strong>от 10 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Парсер средней сложности</strong></td>
                                        <td>Несколько источников, база данных, расписание</td>
                                        <td>7-10 дней</td>
                                        <td><strong>от 20 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Сложный парсер</strong></td>
                                        <td>API, аналитика, дашборд, repricer</td>
                                        <td>14-21 день</td>
                                        <td><strong>от 35 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Мониторинг цен</strong></td>
                                        <td>Отслеживание изменений 24/7, алерты</td>
                                        <td>7-14 дней</td>
                                        <td><strong>от 25 000 ₽</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Repricer</strong></td>
                                        <td>Автоматическое изменение цен по правилам</td>
                                        <td>14-21 день</td>
                                        <td><strong>от 45 000 ₽</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <p className={styles.seoP}>
                                Парсер для Wildberries, Ozon или Яндекс.Маркета позволяет отслеживать цены конкурентов, анализировать отзывы, мониторить остатки и управлять ассортиментом. ROI парсера окупается в первую неделю использования за счёт оптимизации ценовой стратегии.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ SEO: ПОЧЕМУ НЕ СТОИТ ЭКОНОМИТЬ ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h2 className={styles.seoH2}>
                                Почему не стоит экономить на <span className={styles.textAccent}>разработке</span>
                            </h2>
                            <p className={styles.seoP}>
                                Экономия на разработке — одна из самых частых ошибок предпринимателей. Дешёвый конструктор или фрилансер без опыта могут сэкономить 20-30% бюджета, но создадут продукт, который не решает бизнес-задачи. Вот почему важно инвестировать в качественную разработку:
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.advantagesGrid}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { title: 'Переделка дороже создания', desc: 'По статистике, 60% дешёвых проектов переделываются в течение года. Стоимость переделки обычно в 2-3 раза выше первоначальной разработки с нуля.' },
                                { title: 'Конверсия зависит от качества', desc: 'Профессиональный лендинг конвертирует в 3-5 раз лучше, чем шаблонный. Один процент конверсии может приносить десятки тысяч рублей в месяц.' },
                                { title: 'Безопасность и стабильность', desc: 'Дешёвый код содержит уязвимости и баги. Утечка данных клиентов — это не только репутационные потери, но и шрафы по 152-ФЗ.' },
                                { title: 'Масштабируемость', desc: 'Качественная архитектура позволяет добавлять функции без переписывания всего проекта. Дешёвый код «ломается» при первых 100 пользователях.' },
                            ].map((card, i) => (
                                <div key={i} className={styles.advantageCard}>
                                    <h4>{card.title}</h4>
                                    <p>{card.desc}</p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <p className={styles.seoP}>
                                Опытный <a href="/razrabotka-botov">разработчик</a> не просто пишет код — он проектирует решение под вашу бизнес-модель, учитывает масштабирование и обеспечивает долгосрочную поддержку. Это инвестиция, которая окупается в первые месяцы работы продукта.
                            </p>
                            <p className={styles.seoP}>
                                Если бюджет ограничен — лучше начать с MVP (минимально жизнеспособного продукта) и постепенно развивать его, чем заказать дешёвый «полный» продукт, который не будет работать. Используйте <a href="/blog/razrabotka-mobilnyh-prilozhenij">современные технологии</a> и итеративный подход — это самый надёжный путь к успеху.
                            </p>
                        </motion.div>
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
                            Ответы на вопросы, которые задают перед заказом разработки
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            { q: 'Сколько стоит разработка Telegram-бота?', a: 'Стоимость разработки Telegram-бота начинается от 7 000 ₽ за базового бота с меню и FAQ. Бот средней сложности с записью и напоминаниями — от 15 000 ₽. Сложный бот с CRM, AI и аналитикой — от 40 000 ₽. Точная цена зависит от набора функций и интеграций.' },
                            { q: 'Из чего складывается стоимость сайта?', a: 'Стоимость сайта зависит от типа (лендинг, визитка, корпоративный, интернет-магазин), количества страниц, дизайна, интеграций (CRM, платёжные системы) и дополнительных функций (SEO, мультиязычность, админ-панель). Лендинг от 10 000 ₽, интернет-магазин от 50 000 ₽.' },
                            { q: 'Сколько времени занимает разработка?', a: 'Простой проект — 3-5 рабочих дней. Средний проект — 7-14 дней. Сложный проект с множеством интеграций — 14-21 день. Точные сроки определяем после обсуждения задачи и фиксируем в договоре.' },
                            { q: 'Можно ли сэкономить на разработке?', a: 'Да, можно начать с базовой версии и постепенно добавлять функции. Также экономия достигается за счёт чёткого ТЗ и приоритизации функций. Однако экономить на качестве разработки не стоит — переделка обходится дороже.' },
                            { q: 'Что лучше: фрилансер или студия?', a: 'Фрилансер — это персональный подход, гибкость и ниже стоимость. Студия — больше ресурсов, но выше цена и менее гибкий процесс. Для большинства проектов фрилансер с опытом — оптимальный выбор по соотношению цена/качество.' },
                            { q: 'Какие гарантии вы предоставляете?', a: 'Гарантируем выполнение всех согласованных функций по ТЗ. Бесплатная поддержка 30-90 дней после запуска. Фиксация сроков и стоимости в договоре. Если проект не соответствует ТЗ — исправляем за свой счёт.' },
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
                            Не хотите считать? Напишите мне — подготовлю точную смету за 24 часа
                        </h2>
                        <p className={styles.finalCtaSubtitle}>
                            Опишите задачу — рассчитаю стоимость, предложу оптимальное решение
                            и отвечу на все вопросы. Без обязательств.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <LeadForm source="final-cta" title="Получить точную смету" />
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
                                Разработка ботов, сайтов, парсеров и автоматизация бизнеса.
                            </p>
                        </div>
                        <div>
                            <h4>Навигация</h4>
                            <a href="/">Главная</a>
                            <a href="/razrabotka-botov">Разработка ботов</a>
                            <a href="/razrabotka-servisov">Разработка сайтов</a>
                            <a href="/parsery-marketplejsov">Парсеры</a>
                        </div>
                        <div>
                            <h4>Инструменты</h4>
                            <a href="/kalkulyator-stoimosti">Калькулятор стоимости</a>
                            <a href="#calculator">Рассчитать бота</a>
                            <a href="#calculator">Рассчитать сайт</a>
                            <a href="#calculator">Рассчитать парсер</a>
                        </div>
                        <div>
                            <h4>Связаться</h4>
                            <a href="https://t.me/developer_telegrams" target="_blank" rel="noopener noreferrer">
                                Telegram: @developer_telegrams
                            </a>
                            <a href="tel:+79648325336">+7 (964) 832-53-36</a>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>&copy; {new Date().getFullYear()} Дмитрий Малышев. Все права защищены.</p>
                        <p>ИП / Самозанятый &bull; ИНН: XXXXXXXXXX &bull; ОГРНИП: XXXXXXXXXXXXX</p>
                    </div>
                </div>
            </footer>

            {/* ============ STICKY CTA (MOBILE) ============ */}
            <div className={styles.stickyCta}>
                <a href="#calculator" className={styles.stickyCtaButton}>
                    <i className='bx bx-calculator' />
                    Рассчитать стоимость
                </a>
            </div>

            <ScrollProgressBar />
            <TelegramFloat />
            <ExitIntentPopup onCtaClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
        </>
    );
}
