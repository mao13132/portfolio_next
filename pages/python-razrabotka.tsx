import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { GuaranteeBlock } from '@/app/Components/GuaranteeBlock/GuaranteeBlock';
import styles from './python-razrabotka.module.css';

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
const PAGE_URL = `${SITE_URL}/python-razrabotka`;
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
   STRUCTURED DATA (Schema.org Service + FAQPage)
   ============================================================ */

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Python-разработчик на заказ — бэкенд, API, автоматизация | DimaRazrab",
            "description": "Заказать Python-разработчика: бэкенд на FastAPI/Django, парсинг данных, автоматизация бизнес-процессов, Telegram-боты. Фиксированная цена, поддержка 30 дней.",
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
                { "@type": "ListItem", "position": 2, "name": "Python-разработка", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Python-разработка на заказ",
            "description": "Разработка на Python: бэкенд на FastAPI и Django, парсинг данных, автоматизация бизнес-процессов, Telegram-боты, API-интеграции. Фиксированная цена, поддержка 30 дней.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Python-разработчик",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["Python", "FastAPI", "Django", "Flask", "PostgreSQL", "Redis", "Docker", "Selenium", "BeautifulSoup", "Celery", "Telegram Bot API", "REST API", "Парсинг", "Автоматизация"]
            },
            "serviceType": "Python-разработка на заказ",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги Python-разработки",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Backend-разработка на FastAPI/Django",
                            "description": "Высокопроизводительный бэкенд на Python с REST API, авторизацией, документацией Swagger. Срок 7-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Парсинг и сбор данных",
                            "description": "Автоматический сбор данных с любых сайтов: маркетплейсы, каталоги, базы данных. Срок 5-10 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Автоматизация бизнес-процессов",
                            "description": "Python-скрипты и сервисы для автоматизации рутинных операций: ценообразование, синхронизация, отчёты. Срок 5-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Telegram-боты на Python",
                            "description": "Разработка Telegram-ботов на aiogram/Pyrogram с интеграцией CRM, платёжных систем, парсинга. Срок 7-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "API-разработка и интеграции",
                            "description": "REST API на FastAPI/Django, интеграция с 1С, amoCRM, маркетплейсами, платёжными системами. Срок 7-14 дней."
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
                    "name": "Сколько стоит заказать Python-разработчика?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Простой скрипт или парсер — от 15 000 ₽. Backend-сервис на FastAPI — от 25 000 ₽. Сложная система с ML и интеграциями — от 80 000 ₽. Точная стоимость зависит от объёма задачи."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какой стек технологий используете для Python-проектов?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Основной стек: Python 3.10+, FastAPI, Django, Flask. База данных: PostgreSQL, Redis. Парсинг: Selenium, BeautifulSoup, Scrapy. Очереди: Celery. Развёртывание: Docker, Nginx, Linux."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько времени занимает разработка на Python?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Простой парсер или скрипт — 3-5 дней. Backend-сервис средней сложности — 2-3 недели. Сложная система с ML и множеством интеграций — 4-8 недель."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Можно ли заказать парсинг данных на Python?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, парсинг — одно из ключевых направлений. Собираю данные с маркетплейсов (WB, Ozon, Avito), каталогов, новостных сайтов. Результат в формате JSON, Excel или Google Sheets."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Делаете ли Telegram-ботов на Python?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, разрабатываю Telegram-ботов на aiogram и Pyrogram. Интеграция с CRM, платёжными системами, парсингом, ChatGPT API. Подробнее на странице /razrabotka-botov."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Предоставляете ли поддержку после сдачи проекта?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, бесплатная поддержка 30 дней после сдачи. Включает исправление багов, оптимизацию производительности, консультации. Далее — по договорённости."
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
                text: `[${source}] ${task || 'Заявка с лендинга "Python-разработка на заказ"'}`,
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
                {loading ? 'Отправка...' : 'Обсудить проект в Telegram'}
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

export default function PythonRazrabotkaPage() {
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
                <title>Python-разработчик на заказ — бэкенд, API, автоматизация | DimaRazrab</title>
                <meta
                    name="description"
                    content="Заказать Python-разработчика: бэкенд на FastAPI/Django, парсинг данных, автоматизация бизнеса, Telegram-боты. Фиксированная цена. Обсудите проект!"
                />
                <meta name="keywords" content="python разработчик на заказ, найти разработчика python, python разработчик стоимость, нужен программист python, python создание сервиса, услуги программиста python, python разработчик фриланс, заказы для программистов python" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Python-разработчик на заказ — бэкенд, API, автоматизация | DimaRazrab" />
                <meta property="og:description" content="Заказать Python-разработчика: бэкенд на FastAPI/Django, парсинг данных, автоматизация бизнеса, Telegram-боты. Фиксированная цена." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Python-разработчик на заказ — бэкенд, API, автоматизация | DimaRazrab" />
                <meta name="twitter:description" content="Заказать Python-разработчика: бэкенд на FastAPI/Django, парсинг данных, автоматизация бизнеса, Telegram-боты." />
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
                        <a href="#portfolio" onClick={() => setMobileMenu(false)}>Кейсы</a>
                        <a href="#process" onClick={() => setMobileMenu(false)}>Как работаем</a>
                        <a href="#pricing" onClick={() => setMobileMenu(false)}>Стоимость</a>
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
                    { label: 'Python разработка' },
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
                                ⚡ Python 3.10+ • FastAPI • Django • Бесплатная консультация
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                Python-разработчик на заказ — <span className={styles.heroHighlight}>бэкенд, скрипты, автоматизация</span>
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Разрабатываю backend-сервисы на FastAPI и Django, парсеры данных, Telegram-ботов и системы автоматизации бизнеса. Каждый проект — фиксированная цена и бесплатная поддержка 30 дней.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                            >
                                {[
                                    'FastAPI — скорость обработки в 3 раза выше Flask',
                                    'Django — готовая админка, ORM, миграции',
                                    'Парсинг любых сайтов: Selenium, BeautifulSoup, Scrapy',
                                    'Telegram-боты на aiogram с интеграцией CRM',
                                    'Бесплатная поддержка 30 дней после сдачи',
                                ].map((text, i) => (
                                    <div key={i} className={styles.heroBullet}>
                                        <span className={styles.heroBulletIcon}>✓</span>
                                        {text}
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                style={{ marginTop: 28 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <button
                                    onClick={scrollToForm}
                                    className={styles.formButton}
                                    style={{ maxWidth: 320 }}
                                >
                                    Обсудить проект в Telegram
                                </button>
                            </motion.div>
                        </div>

                        <motion.div
                            className={styles.heroFormWrapper}
                            id="hero-form"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <LeadForm
                                source="hero"
                                title="Нужен Python-разработчик?"
                                subtitle="Опишите задачу — рассчитаю стоимость и сроки за 30 минут"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className={styles.diagonalDivider} />
            </section>

            {/* ============ УСЛУГИ (H2) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="offers">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Услуги Python-разработки</h2>
                        <p className={styles.sectionSubtitle}>
                            Полный спектр задач на Python: от простых скриптов до сложных высоконагруженных систем
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* Backend-разработка */}
                        <motion.div
                            className={`${styles.offerCard} ${styles.offerCardPopular}`}
                            variants={scaleIn}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.popularBadge}>Популярно</span>
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Backend</span>
                                <h3 className={styles.offerName}>Backend-разработка (FastAPI, Django)</h3>
                                <p className={styles.offerFor}>Веб-приложения, API, микросервисы, админ-панели</p>
                            </div>
                            <div className={styles.offerPrice}>от 25 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 7-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> FastAPI — асинхронный, в 3 раза быстрее Flask</li>
                                <li><i className='bx bx-check' /> Django — готовая админка, ORM, миграции</li>
                                <li><i className='bx bx-check' /> JWT-авторизация, роли, ограничение запросов</li>
                                <li><i className='bx bx-check' /> Автоматическая документация Swagger</li>
                                <li><i className='bx bx-check' /> Docker + Nginx — готово к продакшену</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Заказать бэкенд
                                </button>
                                <span className={styles.offerNote}>Бесплатная оценка за 30 минут</span>
                            </div>
                        </motion.div>

                        {/* Парсинг и сбор данных */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Парсинг</span>
                                <h3 className={styles.offerName}>Парсинг и сбор данных</h3>
                                <p className={styles.offerFor}>Маркетплейсы, каталоги, новостные сайты, базы данных</p>
                            </div>
                            <div className={styles.offerPrice}>от 15 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 5-10 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Selenium — обход JavaScript и Cloudflare</li>
                                <li><i className='bx bx-check' /> BeautifulSoup, Scrapy — быстрый парсинг HTML</li>
                                <li><i className='bx bx-check' /> Экспорт в JSON, Excel, Google Sheets</li>
                                <li><i className='bx bx-check' /> Прокси-ротация и обход антибот-защит</li>
                                <li><i className='bx bx-check' /> Расписание запуска (cron, Celery Beat)</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать парсинг
                                </button>
                            </div>
                        </motion.div>

                        {/* Автоматизация бизнес-процессов */}
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
                                <h3 className={styles.offerName}>Автоматизация бизнес-процессов</h3>
                                <p className={styles.offerFor}>Ценообразование, синхронизация, отчёты, мониторинг</p>
                            </div>
                            <div className={styles.offerPrice}>от 20 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 5-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Автоматическое ценообразование на маркетплейсах</li>
                                <li><i className='bx bx-check' /> Синхронизация данных между системами</li>
                                <li><i className='bx bx-check' /> Генерация отчётов и аналитика</li>
                                <li><i className='bx bx-check' /> Мониторинг цен конкурентов 24/7</li>
                                <li><i className='bx bx-check' /> Уведомления в Telegram при событиях</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать автоматизацию
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Второй ряд услуг */}
                    <div className={styles.offersGrid} style={{ marginTop: 24 }}>
                        {/* API-разработка */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>API</span>
                                <h3 className={styles.offerName}>API-разработка</h3>
                                <p className={styles.offerFor}>REST API, интеграции с 1С, CRM, маркетплейсами</p>
                            </div>
                            <div className={styles.offerPrice}>от 25 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 7-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> REST API на FastAPI с документацией Swagger</li>
                                <li><i className='bx bx-check' /> Интеграция с 1С, amoCRM, Битрикс24</li>
                                <li><i className='bx bx-check' /> API маркетплейсов: WB, Ozon, Avito</li>
                                <li><i className='bx bx-check' /> Webhook для мгновенной реакции на события</li>
                                <li><i className='bx bx-check' /> Платёжные системы: ЮKassa, Stripe</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать API
                                </button>
                            </div>
                        </motion.div>

                        {/* Telegram-боты на Python */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Telegram</span>
                                <h3 className={styles.offerName}>Telegram-боты на Python</h3>
                                <p className={styles.offerFor}>aiogram, Pyrogram, интеграции, платежи</p>
                            </div>
                            <div className={styles.offerPrice}>от 30 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 7-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> aiogram 3.x — асинхронный, современный</li>
                                <li><i className='bx bx-check' /> Интеграция с CRM и платёжными системами</li>
                                <li><i className='bx bx-check' /> Приём заказов, запись клиентов, рассылки</li>
                                <li><i className='bx bx-check' /> Админ-панель и аналитика</li>
                                <li><i className='bx bx-check' /> Подробнее: <a href="/razrabotka-botov" style={{ color: 'var(--lp-cyan)' }}>разработка ботов →</a></li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать бота
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ КЕЙСЫ (H2) ============ */}
            <section className={styles.section} id="portfolio">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Кейсы из портфолио</h2>
                        <p className={styles.sectionSubtitle}>
                            Реальные Python-проекты с измеримыми бизнес-результатами
                        </p>
                    </motion.div>

                    <div className={styles.portfolioGrid}>
                        {/* fastapi_nextjs_markets */}
                        <motion.a
                            href="/work/fastapi_nextjs_markets"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>FastAPI + Next.js</span>
                            <h3>Автоматизация маркетплейсов — платформа управления</h3>
                            <p>Комплексная система на FastAPI + Next.js SSR для автоматизации управления товарами на WB и Ozon. Рост продаж на 520%, ROI 680% за 4 месяца.</p>
                            <span className={styles.portfolioTech}>FastAPI • Next.js • PostgreSQL • Redis • Docker • Celery</span>
                        </motion.a>

                        {/* django_push_price */}
                        <motion.a
                            href="/work/django_push_price"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Django</span>
                            <h3>Автоматическое ценообразование на маркетплейсах</h3>
                            <p>Django-система управления ценами для 2,500+ SKU. Экономия 95% времени, рост прибыли на 180%, ROI 380% за 2 месяца.</p>
                            <span className={styles.portfolioTech}>Django • Python • WB API • Ozon API • PostgreSQL • Celery</span>
                        </motion.a>

                        {/* aggregator_django */}
                        <motion.a
                            href="/work/aggregator_django"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Django REST</span>
                            <h3>Управление данными сети из 15 магазинов</h3>
                            <p>Django REST система для синхронизации данных между WB и Ozon. Обработка 50,000+ товаров ежедневно, ROI 320% за 4 месяца.</p>
                            <span className={styles.portfolioTech}>Django REST Framework • PostgreSQL • Celery • Redis • WB/Ozon API</span>
                        </motion.a>

                        {/* auto_de */}
                        <motion.a
                            href="/work/auto_de"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Python + ML</span>
                            <h3>ИИ-мониторинг авторынка для автодилера</h3>
                            <p>Python-система с ML для мониторинга 15,000+ объявлений на Auto.de и Av.by. Прибыль выросла на 220%, ROI 280% за 4 месяца.</p>
                            <span className={styles.portfolioTech}>Python • Selenium • scikit-learn • Telegram Bot API • PostgreSQL</span>
                        </motion.a>

                        {/* oxprotocol */}
                        <motion.a
                            href="/work/oxprotocol"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Python + ML</span>
                            <h3>Аналитика крипто-настроений для инвестиционного фонда</h3>
                            <p>Парсинг 15+ крипто-платформ с ИИ-анализом настроений. Сбор 5000+ комментариев/день, прибыльность +180%, ROI 450%.</p>
                            <span className={styles.portfolioTech}>Python • Selenium • BERT • PostgreSQL • Redis • Прокси</span>
                        </motion.a>
                    </div>

                    <motion.div
                        className={styles.portfolioCta}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <a href="/#portfolio" className={styles.linkButton}>Все проекты в портфолио →</a>
                    </motion.div>
                </div>
            </section>

            {/* ============ ТЕХНОЛОГИИ (H2) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Технологический стек</h2>
                        <p className={styles.sectionSubtitle}>
                            Современные инструменты Python-экосистемы для надёжных и масштабируемых решений
                        </p>
                    </motion.div>

                    <div className={styles.techGrid}>
                        {[
                            { icon: 'bx bxl-python', title: 'Python 3.10+', desc: 'Основной язык разработки' },
                            { icon: 'bx bx-zap', title: 'FastAPI', desc: 'Асинхронный фреймворк для API' },
                            { icon: 'bx bx-code-block', title: 'Django', desc: 'Фреймворк для сложных проектов' },
                            { icon: 'bx bx-file', title: 'Flask', desc: 'Лёгкий фреймворк для микросервисов' },
                            { icon: 'bx bx-data', title: 'PostgreSQL', desc: 'Надёжная реляционная БД' },
                            { icon: 'bx bx-timer', title: 'Redis', desc: 'Кэширование и очереди' },
                            { icon: 'bx bxl-docker', title: 'Docker', desc: 'Контейнеризация приложений' },
                            { icon: 'bx bx-server', title: 'Linux', desc: 'Серверное администрирование' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={styles.techCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <i className={item.icon} />
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ ПРОЦЕСС (H2) ============ */}
            <section className={styles.section} id="process">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Процесс работы</h2>
                        <p className={styles.sectionSubtitle}>
                            Прозрачный процесс от идеи до запуска в production
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx bx-conversation', title: 'Анализ задачи', desc: 'Разбираю требования, определяю архитектуру, формирую ТЗ и оценку' },
                            { num: '02', icon: 'bx bx-sitemap', title: 'Проектирование', desc: 'Схема данных, выбор технологий, API-контракт' },
                            { num: '03', icon: 'bx bx-code-alt', title: 'Разработка', desc: 'Код, тесты, документация на каждом этапе' },
                            { num: '04', icon: 'bx bx-test-tube', title: 'Тестирование', desc: 'Unit-тесты, интеграционные тесты, нагрузочное тестирование' },
                            { num: '05', icon: 'bx bx-rocket', title: 'Запуск и поддержка', desc: 'Docker, CI/CD, мониторинг, бесплатная поддержка 30 дней' },
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
                                    <i className={step.icon} />
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ СТОИМОСТЬ (H2) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="pricing">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Стоимость Python-разработки</h2>
                        <p className={styles.sectionSubtitle}>
                            Фиксированная цена после анализа задачи. Оплата поэтапно: 50% предоплата, 50% после приёмки
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
                                    <th>Стоимость</th>
                                    <th>Срок</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Парсер данных (простой)</td>
                                    <td className={styles.pricingPrice}>от 15 000 ₽</td>
                                    <td className={styles.pricingTime}>3-5 дней</td>
                                </tr>
                                <tr>
                                    <td>Парсер данных (сложный, с обходом защиты)</td>
                                    <td className={styles.pricingPrice}>от 30 000 ₽</td>
                                    <td className={styles.pricingTime}>7-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Backend-сервис на FastAPI (5-15 эндпоинтов)</td>
                                    <td className={styles.pricingPrice}>от 25 000 ₽</td>
                                    <td className={styles.pricingTime}>7-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Django-приложение с админкой</td>
                                    <td className={styles.pricingPrice}>от 35 000 ₽</td>
                                    <td className={styles.pricingTime}>10-14 дней</td>
                                </tr>
                                <tr>
                                    <td>REST API с интеграциями (1С, CRM)</td>
                                    <td className={styles.pricingPrice}>от 40 000 ₽</td>
                                    <td className={styles.pricingTime}>10-14 дней</td>
                                </tr>
                                <tr>
                                    <td>Telegram-бот на Python</td>
                                    <td className={styles.pricingPrice}>от 30 000 ₽</td>
                                    <td className={styles.pricingTime}>7-14 дней</td>
                                </tr>
                                <tr>
                                    <td>Система автоматизации бизнеса</td>
                                    <td className={styles.pricingPrice}>от 50 000 ₽</td>
                                    <td className={styles.pricingTime}>2-4 недели</td>
                                </tr>
                                <tr>
                                    <td>Система с ML/ИИ (анализ данных, прогнозы)</td>
                                    <td className={styles.pricingPrice}>от 80 000 ₽</td>
                                    <td className={styles.pricingTime}>4-8 недель</td>
                                </tr>
                                <tr>
                                    <td>Комплексная система (бэкенд + парсинг + бот)</td>
                                    <td className={styles.pricingPrice}>от 100 000 ₽</td>
                                    <td className={styles.pricingTime}>4-8 недель</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>

                    <motion.div
                        style={{ textAlign: 'center', marginTop: 40 }}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <button className={styles.formButton} style={{ maxWidth: 360, margin: '0 auto' }} onClick={scrollToForm}>
                            Получить точную оценку бесплатно
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ============ MID FORM ============ */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.midFormWrapper}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles.midFormContent}>
                            <h2>Нужен Python-разработчик для вашего проекта?</h2>
                            <p>
                                Расскажите о задаче — подготовлю техническое решение и точную оценку стоимости за 30 минут.
                                Без обязательств. Бесплатно.
                            </p>
                        </div>
                        <LeadForm
                            source="mid-form"
                            title="Заказать Python-разработку"
                            subtitle="Ответьте в течение 30 минут"
                            compact
                        />
                    </motion.div>
                </div>
            </section>

            {/* ============ FAQ (H2) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="faq">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Частые вопросы</h2>
                        <p className={styles.sectionSubtitle}>
                            Ответы на популярные вопросы о Python-разработке на заказ
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            {
                                q: 'Сколько стоит заказать Python-разработчика?',
                                a: 'Простой скрипт или парсер — от 15 000 ₽. Backend-сервис на FastAPI — от 25 000 ₽. Сложная система с ML и интеграциями — от 80 000 ₽. Точная стоимость зависит от объёма задачи и рассчитывается бесплатно за 30 минут.'
                            },
                            {
                                q: 'Какой стек технологий используете для Python-проектов?',
                                a: 'Основной стек: Python 3.10+, FastAPI, Django, Flask. База данных: PostgreSQL, Redis. Парсинг: Selenium, BeautifulSoup, Scrapy. Очереди задач: Celery. Развёртывание: Docker, Nginx, Linux. Выбор зависит от задачи.'
                            },
                            {
                                q: 'Сколько времени занимает разработка на Python?',
                                a: 'Простой парсер или скрипт — 3-5 дней. Backend-сервис средней сложности — 2-3 недели. Сложная система с ML и множеством интеграций — 4-8 недель. Все сроки фиксируются в договоре.'
                            },
                            {
                                q: 'Можно ли заказать парсинг данных на Python?',
                                a: 'Да, парсинг — одно из ключевых направлений. Собираю данные с маркетплейсов (WB, Ozon, Avito), каталогов, новостных сайтов, любых веб-ресурсов. Результат в формате JSON, Excel или Google Sheets. Работаю с динамическим контентом и обхожу антибот-защиты.'
                            },
                            {
                                q: 'Делаете ли Telegram-ботов на Python?',
                                a: 'Да, разрабатываю Telegram-ботов на aiogram и Pyrogram. Интеграция с CRM, платёжными системами, парсингом данных, ChatGPT API. Приём заказов, запись клиентов, рассылки, модерация. Подробнее на странице /razrabotka-botov.'
                            },
                            {
                                q: 'Предоставляете ли поддержку после сдачи проекта?',
                                a: 'Да, бесплатная поддержка 30 дней после сдачи. Включает исправление багов, оптимизацию производительности и консультации по масштабированию. Оплата — поэтапно: 50% предоплата, 50% после приёмки.'
                            },
                        ].map((item, i) => (
                            <FaqItem key={i} question={item.q} answer={item.a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ SEO КОНТЕНТ ============ */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <h2 className={styles.seoH2}>Python-разработчик на заказ: полное руководство</h2>

                        <p>
                            <strong>Python-разработка</strong> — одно из самых востребованных направлений в IT.
                            Python используется для создания backend-сервисов, парсинга данных, автоматизации бизнес-процессов,
                            машинного обучения и разработки Telegram-ботов. Если вам нужен <strong>программист Python</strong> для
                            коммерческого проекта — я помогу реализовать задачу с фиксированной ценой и гарантией результата.
                        </p>

                        <h3 className={styles.seoH3}>Backend-разработка на FastAPI и Django</h3>
                        <p>
                            <strong>FastAPI</strong> — современный асинхронный фреймворк, который в 3 раза быстрее Flask
                            и автоматически генерирует документацию Swagger. Идеален для создания REST API, микросервисов
                            и высоконагруженных систем. <strong>Django</strong> — проверенный фреймворк с готовой админкой,
                            ORM и системой миграций, который подходит для сложных проектов с бизнес-логикой.
                        </p>
                        <p>
                            Когда вы <strong>ищете Python-разработчика</strong> для backend-задач, важно убедиться, что
                            специалист знает не только язык, но и экосистему: PostgreSQL, Redis, Docker, Celery, Nginx.
                            Я работаю с полным стеком и разворачиваю проекты на production-ready уровне.
                        </p>

                        <h3 className={styles.seoH3}>Парсинг и сбор данных на Python</h3>
                        <p>
                            <strong>Парсинг данных</strong> — одна из самых популярных задач для Python.
                            С помощью Selenium, BeautifulSoup и Scrapy я собираю данные с любых сайтов: маркетплейсов,
                            каталогов, новостных ресурсов, баз данных. Результат — структурированные данные в формате
                            JSON, Excel или Google Sheets.
                        </p>
                        <p>
                            Если вам нужен <strong>Python-разработчик для создания парсера</strong>, обратите внимание:
                            я работаю с динамическим JavaScript-контентом, обхожу Cloudflare и другие антибот-защиты,
                            настраиваю прокси-ротацию и расписание запуска. Парсеры маркетплейсов — отдельное направление,
                            где я собрал обширное портфолио (<a href="/parsery-marketplejsov" style={{ color: 'var(--lp-cyan)' }}>подробнее →</a>).
                        </p>

                        <h3 className={styles.seoH3}>Автоматизация бизнес-процессов на Python</h3>
                        <p>
                            <strong>Автоматизация</strong> — ключевое преимущество Python. Скрипты и сервисы на Python
                            позволяют автоматизировать рутинные операции: ценообразование на маркетплейсах, синхронизацию
                            данных между системами, генерацию отчётов, мониторинг конкурентов. Если вы ищете
                            <strong>программиста Python для автоматизации</strong> — это моё профильное направление.
                        </p>
                        <p>
                            Пример: система автоматического ценообразования для продавца на WB и Ozon.
                            Раньше менеджер тратил 6 часов в день на обновление цен. После автоматизации на Django —
                            20 минут, рост прибыли на 180%, ROI 380% за 2 месяца. Подробнее об автоматизации бизнеса —
                            на странице <a href="/avtomatizaciya-biznesa" style={{ color: 'var(--lp-cyan)' }}>автоматизация бизнеса →</a>.
                        </p>

                        <h3 className={styles.seoH3}>Telegram-боты на Python</h3>
                        <p>
                            <strong>Telegram-боты</strong> — популярный инструмент для бизнеса. На Python я разрабатываю
                            ботов на aiogram и Pyrogram с полным функционалом: приём заказов, запись клиентов, рассылки,
                            интеграция с CRM и платёжными системами. Боты на Python масштабируются и выдерживают
                            тысячи одновременных пользователей.
                        </p>
                        <p>
                            Если вам нужен <strong>Python-разработчик для создания Telegram-бота</strong> —
                            на моём счету десятки успешных проектов с измеримыми результатами. Подробнее —
                            на странице <a href="/razrabotka-botov" style={{ color: 'var(--lp-cyan)' }}>разработка Telegram-ботов →</a>.
                        </p>

                        <h3 className={styles.seoH3}>API-разработка и интеграции на Python</h3>
                        <p>
                            <strong>Разработка API</strong> на Python — создание программного интерфейса для обмена данными
                            между системами. FastAPI автоматически генерирует документацию Swagger, поддерживает валидацию
                            через Pydantic и асинхронную обработку запросов. Я интегрирую API с 1С, amoCRM, Битрикс24,
                            маркетплейсами и платёжными системами.
                        </p>
                        <p>
                            Если вам нужен <strong>Python-программист для создания API</strong> —
                            подробнее на странице <a href="/razrabotka-api" style={{ color: 'var(--lp-cyan)' }}>разработка API →</a>.
                        </p>

                        <h3 className={styles.seoH3}>Почему выбирают Python для коммерческих проектов</h3>
                        <p>
                            Python — универсальный язык программирования, который подходит для широкого спектра задач:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Скорость разработки</strong> — Python-код пишется в 3-5 раз быстрее, чем на Java или C++</li>
                            <li><strong>Богатая экосистема</strong> — тысячи готовых библиотек для любых задач</li>
                            <li><strong>Масштабируемость</strong> — от простых скриптов до высоконагруженных систем</li>
                            <li><strong>Сообщество</strong> — крупнейшее developer-сообщество, быстрое решение проблем</li>
                            <li><strong>ML и ИИ</strong> — стандарт де-факто для машинного обучения и анализа данных</li>
                            <li><strong>Кроссплатформенность</strong> — работает на Linux, Windows, macOS</li>
                        </ul>

                        {/* Внутренние ссылки */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Связанные услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-botov">Разработка Telegram-ботов</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                                <a href="/razrabotka-api">Разработка API</a>
                                <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <GuaranteeBlock />

            {/* ============ FINAL CTA (H2: Связаться со мной) ============ */}
            <section className={styles.finalCta} id="contact">
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
                            Готовы обсудить ваш <span className={styles.textAccent}>Python-проект</span>?
                        </h2>
                        <p className={styles.finalCtaSubtitle}>
                            Расскажите о задаче — подготовлю техническое решение и точную оценку за 30 минут. Без обязательств.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <LeadForm
                            source="final-cta"
                            title="Обсудить проект в Telegram"
                            subtitle="Отвечу в течение 30 минут в рабочее время"
                        />
                    </motion.div>

                    <motion.div
                        style={{ textAlign: 'center', marginTop: 24 }}
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <a
                            href="https://t.me/developer_telegrams"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkButton}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                        >
                            <i className='bx bxl-telegram' style={{ fontSize: 20 }} />
                            Написать в Telegram
                        </a>
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
                                Python-разработка на заказ: бэкенд, парсинг, автоматизация, Telegram-боты, API-интеграции.
                            </p>
                        </div>
                        <div>
                            <h4>Услуги</h4>
                            <a href="/python-razrabotka">Python-разработка</a>
                            <a href="/razrabotka-api">Разработка API</a>
                            <a href="/razrabotka-botov">Telegram-боты</a>
                            <a href="/razrabotka-crm">CRM системы</a>
                        </div>
                        <div>
                            <h4>Направления</h4>
                            <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                            <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            <a href="/ai-integracii">AI-интеграции</a>
                        </div>
                        <div>
                            <h4>Контакты</h4>
                            <a href="tel:+79648325336">+7 (964) 832-53-36</a>
                            <a href="https://t.me/developer_telegrams" target="_blank" rel="noopener noreferrer">Telegram</a>
                            <a href="/privacy">Политика конфиденциальности</a>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>© {new Date().getFullYear()} DimaRazrab. Все права защищены.</p>
                        <p>Python-разработка на заказ — бэкенд, парсинг, автоматизация</p>
                    </div>
                </div>
            </footer>

            {/* ============ STICKY CTA (MOBILE) ============ */}
            <div className={styles.stickyCta}>
                <button className={styles.stickyCtaButton} onClick={scrollToForm}>
                    <i className='bx bxl-telegram' />
                    Обсудить проект в Telegram
                </button>
            </div>

            <TelegramFloat />
        </>
    );
}
