import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import styles from './razrabotka-api.module.css';

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
const PAGE_URL = `${SITE_URL}/razrabotka-api`;
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
            "name": "Разработка API и интеграций на заказ — REST, GraphQL, Webhook | DimaRazrab",
            "description": "Разработка REST API, GraphQL, Webhook-интеграций на Python (FastAPI, Django). Интеграция с 1С, amoCRM, маркетплейсами. Бесплатная поддержка 30 дней.",
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
                { "@type": "ListItem", "position": 2, "name": "Разработка API и интеграций", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Разработка API и интеграций",
            "description": "Создание REST API на Python (FastAPI, Django REST Framework), GraphQL API, Webhook-интеграций. Интеграция с 1С, amoCRM, Битрикс24, маркетплейсами, платёжными системами.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Разработка API",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["REST API", "GraphQL", "FastAPI", "Django REST Framework", "API интеграция", "1С интеграция", "Webhook", "Swagger", "OpenAPI"]
            },
            "serviceType": "Разработка API и интеграций на заказ",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги разработки API",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "REST API на FastAPI",
                            "description": "Высокопроизводительное REST API на Python FastAPI с автоматической документацией. Срок 5-10 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Интеграция с внешними сервисами",
                            "description": "Подключение 1С, amoCRM, Битрикс24, маркетплейсов и платёжных систем через API. Срок 7-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Webhook и автоматизация",
                            "description": "Настройка Webhook для мгновенной реакции на события внешних систем. Срок 3-7 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "GraphQL API",
                            "description": "Разработка гибкого GraphQL API для сложных фронтенд-приложений. Срок 10-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Документация API (Swagger, OpenAPI)",
                            "description": "Автоматическая и ручная документация API в формате Swagger/OpenAPI. Срок 2-3 дня."
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
                    "name": "Сколько стоит разработка REST API?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Базовое REST API от 25 000 ₽. Сложная система с интеграциями — от 60 000 ₽. Точная стоимость зависит от количества эндпоинтов и сложности бизнес-логики."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие технологии используете для создания API?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Основной стек: Python, FastAPI, Django REST Framework. База данных: PostgreSQL, Redis для кэширования. Развёртывание: Docker, Nginx. Все API получают автоматическую документацию Swagger."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Можно ли интегрировать API с 1С?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, интеграция с 1С через REST API — одна из самых частых задач. Настраиваю обмен данными в реальном времени: заказы, товары, остатки, документы."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько времени занимает разработка API?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Простое API с 5-10 эндпоинтами — 5-7 дней. Средняя сложность с интеграциями — 2-3 недели. Сложная система с множеством сервисов — 4-6 недель."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Чем отличается REST API от GraphQL?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "REST API — стандартный подход с фиксированными эндпоинтами, подходит для большинства задач. GraphQL — гибкий запрос данных, идеален для сложных фронтендов, где нужно получать разные наборы данных одним запросом."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Предоставляете ли документацию к API?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, каждый проект получает автоматическую документацию Swagger/OpenAPI, а также описание всех эндпоинтов, параметров и примеров запросов. Бесплатная поддержка 30 дней."
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
                text: `[${source}] ${task || 'Заявка с лендинга "Разработка API и интеграций"'}`,
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
                {loading ? 'Отправка...' : 'Заказать разработку API'}
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

export default function RazrabotkaApiPage() {
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
                <title>Разработка API и интеграций на заказ — REST, GraphQL, Webhook | DimaRazrab</title>
                <meta
                    name="description"
                    content="Создание REST API на FastAPI и Django. Интеграция с 1С, amoCRM, маркетплейсами. Документация Swagger. Бесплатная поддержка 30 дней. Обсудите проект!"
                />
                <meta name="keywords" content="разработка api, api интеграция, rest api создание, разработка rest api, 1с интеграция api, сервис интеграции api, разработка api приложений, интеграция 1с через api, fastapi разработка, django rest framework" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Разработка API и интеграций на заказ — REST, GraphQL, Webhook | DimaRazrab" />
                <meta property="og:description" content="Создание REST API на FastAPI и Django. Интеграция с 1С, amoCRM, маркетплейсами. Документация Swagger. Бесплатная поддержка 30 дней." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Разработка API и интеграций на заказ — REST, GraphQL, Webhook | DimaRazrab" />
                <meta name="twitter:description" content="Создание REST API на FastAPI и Django. Интеграция с 1С, amoCRM, маркетплейсами. Документация Swagger." />
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
                        <a href="#integrations" onClick={() => setMobileMenu(false)}>Интеграции</a>
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
                                ⚡ REST API • GraphQL • Webhook • Бесплатная консультация
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                Разработка <span className={styles.heroHighlight}>API и интеграций</span> на заказ
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Создаю REST API на FastAPI и Django, интегрирую с 1С, amoCRM, маркетплейсами и платёжными системами. Каждый проект получает документацию Swagger и бесплатную поддержку 30 дней.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                            >
                                {[
                                    'REST API на FastAPI — скорость разработки x3',
                                    'Интеграция с 1С, amoCRM, Битрикс24',
                                    'Документация Swagger/OpenAPI в комплекте',
                                    'Docker + Nginx — готово к продакшену',
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
                                    Заказать API в Telegram
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
                                title="Обсудим ваш API?"
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
                        <h2 className={styles.sectionTitle}>Услуги по разработке API</h2>
                        <p className={styles.sectionSubtitle}>
                            Полный цикл: от проектирования архитектуры до развёртывания на сервере с документацией
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* REST API на FastAPI */}
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
                                <span className={styles.offerBadge}>REST API</span>
                                <h3 className={styles.offerName}>REST API на Python (FastAPI, Django)</h3>
                                <p className={styles.offerFor}>Для веб-приложений, мобильных приложений и микросервисов</p>
                            </div>
                            <div className={styles.offerPrice}>от 25 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 5-10 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> FastAPI — асинхронная обработка, скорость в 3 раза выше Flask</li>
                                <li><i className='bx bx-check' /> Автоматическая документация Swagger и ReDoc</li>
                                <li><i className='bx bx-check' /> JWT-авторизация, роли, ограничение запросов</li>
                                <li><i className='bx bx-check' /> Валидация данных через Pydantic</li>
                                <li><i className='bx bx-check' /> Тесты на каждый эндпоинт</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Заказать REST API
                                </button>
                                <span className={styles.offerNote}>Бесплатная оценка за 30 минут</span>
                            </div>
                        </motion.div>

                        {/* Интеграции */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Интеграции</span>
                                <h3 className={styles.offerName}>Интеграция с внешними сервисами</h3>
                                <p className={styles.offerFor}>1С, amoCRM, Битрикс24, маркетплейсы, платёжные системы</p>
                            </div>
                            <div className={styles.offerPrice}>от 35 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 7-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Двусторонний обмен данными с 1С</li>
                                <li><i className='bx bx-check' /> Интеграция с CRM (amoCRM, Битрикс24)</li>
                                <li><i className='bx bx-check' /> API маркетплейсов (WB, Ozon, Avito)</li>
                                <li><i className='bx bx-check' /> Платёжные системы (ЮKassa, Stripe, Robokassa)</li>
                                <li><i className='bx bx-check' /> Мониторинг и логирование интеграций</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать интеграцию
                                </button>
                            </div>
                        </motion.div>

                        {/* Webhook и автоматизация */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Webhook</span>
                                <h3 className={styles.offerName}>Webhook и автоматизация</h3>
                                <p className={styles.offerFor}>Мгновенная реакция на события внешних систем</p>
                            </div>
                            <div className={styles.offerPrice}>от 15 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 3-7 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Приём Webhook от любых сервисов</li>
                                <li><i className='bx bx-check' /> Отправка Webhook при событиях</li>
                                <li><i className='bx bx-check' /> Очередь сообщений (Redis, Celery)</li>
                                <li><i className='bx bx-check' /> Автоматическая обработка событий</li>
                                <li><i className='bx bx-check' /> Логирование и повторная доставка</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать Webhook
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ ИНТЕГРАЦИИ (H2) ============ */}
            <section className={styles.section} id="integrations">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Интеграции с внешними системами</h2>
                        <p className={styles.sectionSubtitle}>
                            Подключаю API популярных сервисов для автоматизации вашего бизнеса
                        </p>
                    </motion.div>

                    <div className={styles.integrationsGrid}>
                        {[
                            { icon: 'bx bx-building', title: '1С:Предприятие', desc: 'Обмен заказами, товарами, остатками через REST API' },
                            { icon: 'bx bx-bot', title: 'amoCRM', desc: 'Создание и обновление сделок, контактов, задач' },
                            { icon: 'bx bx-task', title: 'Битрикс24', desc: 'CRM, задачи, документы, роботы через API' },
                            { icon: 'bx bx-store', title: 'Wildberries', desc: 'API селлера: заказы, остатки, аналитика, ценообразование' },
                            { icon: 'bx bx-cart', title: 'Ozon', desc: 'API Seller: товары, заказы, финансы, аналитика' },
                            { icon: 'bx bx-list-check', title: 'Avito', desc: 'API Pro: управление объявлениями, сообщениями, статистика' },
                            { icon: 'bx bx-credit-card', title: 'ЮKassa / Stripe', desc: 'Приём платежей, вебхуки, возвраты, подписки' },
                            { icon: 'bx bxl-telegram', title: 'Telegram', desc: 'Bot API, Webhook, Mini App, платежи' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={styles.integrationCard}
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

            {/* ============ КЕЙСЫ (H2) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="portfolio">
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
                            Реальные проекты разработки API и интеграций с измеримыми результатами
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

                        {/* documents_google */}
                        <motion.a
                            href="/work/documents_google"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Google API</span>
                            <h3>Система документооборота для IT-компании</h3>
                            <p>Интеграция Google Drive API и Telegram для управления доступом к 1200+ документам. Экономия 20 часов/неделю, ROI 380%.</p>
                            <span className={styles.portfolioTech}>Python • Google Drive API • Telegram Bot API • PostgreSQL • Redis • Docker</span>
                        </motion.a>

                        {/* oxprotocol */}
                        <motion.a
                            href="/work/oxprotocol"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>API интеграции</span>
                            <h3>Система аналитики крипто-настроений</h3>
                            <p>Парсинг 15+ крипто-платформ через API, сбор 5000+ комментариев/день. Прибыльность выросла на 180%, ROI 450%.</p>
                            <span className={styles.portfolioTech}>Python • Selenium • BERT • Telegram API • PostgreSQL • Redis</span>
                        </motion.a>

                        {/* bankless */}
                        <motion.a
                            href="/work/bankless"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>API парсинг</span>
                            <h3>Аналитика криптовалютного рынка</h3>
                            <p>Автоматизированная система сбора данных с защищённых платформ. Обработка 15 000+ постов/день, ROI 420% за 6 месяцев.</p>
                            <span className={styles.portfolioTech}>Python • Selenium • TensorFlow • Telegram Bot API • PostgreSQL</span>
                        </motion.a>

                        {/* auto_market_tg */}
                        <motion.a
                            href="/work/auto_market_tg"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>API маркетплейсов</span>
                            <h3>Автоматизация WB, Ozon, Yandex, Aliexpress</h3>
                            <p>Универсальный бот с интеграцией API 5 маркетплейсов: сбор заказов, генерация сборочных листов, управление остатками.</p>
                            <span className={styles.portfolioTech}>Python • WB API • Ozon API • Telegram Bot API • PostgreSQL</span>
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
            <section className={styles.section}>
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
                            Современные инструменты для надёжных и масштабируемых API
                        </p>
                    </motion.div>

                    <div className={styles.techGrid}>
                        {[
                            { icon: 'bx bxl-python', title: 'Python 3.11+', desc: 'Основной язык разработки' },
                            { icon: 'bx bx-zap', title: 'FastAPI', desc: 'Асинхронный фреймворк для API' },
                            { icon: 'bx bx-code-block', title: 'Django REST', desc: 'Фреймворк для сложных проектов' },
                            { icon: 'bx bx-data', title: 'PostgreSQL', desc: 'Надёжная реляционная БД' },
                            { icon: 'bx bx-timer', title: 'Redis', desc: 'Кэширование и очереди' },
                            { icon: 'bx bxl-docker', title: 'Docker', desc: 'Контейнеризация приложений' },
                            { icon: 'bx bx-server', title: 'Nginx', desc: 'Reverse proxy и балансировка' },
                            { icon: 'bx bx-file', title: 'Swagger / OpenAPI', desc: 'Автоматическая документация' },
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
            <section className={`${styles.section} ${styles.sectionDark}`} id="process">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Процесс разработки API</h2>
                        <p className={styles.sectionSubtitle}>
                            Прозрачный процесс от идеи до запуска в production
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx bx-conversation', title: 'Анализ', desc: 'Разбираю задачу, определяю эндпоинты, формирую ТЗ' },
                            { num: '02', icon: 'bx bx-sitemap', title: 'Проектирование', desc: 'Архитектура API, схема данных, выбор технологий' },
                            { num: '03', icon: 'bx bx-code-alt', title: 'Разработка', desc: 'Код, тесты, документация Swagger на каждом этапе' },
                            { num: '04', icon: 'bx bx-test-tube', title: 'Тестирование', desc: 'Unit-тесты, интеграционные тесты, нагрузочное тестирование' },
                            { num: '05', icon: 'bx bx-rocket', title: 'Запуск', desc: 'Docker, CI/CD, мониторинг, бесплатная поддержка 30 дней' },
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
            <section className={styles.section} id="pricing">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Стоимость разработки API</h2>
                        <p className={styles.sectionSubtitle}>
                            Фиксированная цена после анализа задачи. Оплата поэтапно
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
                                    <td>REST API (базовое, 5-10 эндпоинтов)</td>
                                    <td className={styles.pricingPrice}>от 25 000 ₽</td>
                                    <td className={styles.pricingTime}>5-7 дней</td>
                                </tr>
                                <tr>
                                    <td>REST API (средней сложности, 15-30 эндпоинтов)</td>
                                    <td className={styles.pricingPrice}>от 50 000 ₽</td>
                                    <td className={styles.pricingTime}>10-14 дней</td>
                                </tr>
                                <tr>
                                    <td>GraphQL API</td>
                                    <td className={styles.pricingPrice}>от 60 000 ₽</td>
                                    <td className={styles.pricingTime}>10-14 дней</td>
                                </tr>
                                <tr>
                                    <td>Интеграция с 1С</td>
                                    <td className={styles.pricingPrice}>от 35 000 ₽</td>
                                    <td className={styles.pricingTime}>7-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Интеграция с amoCRM / Битрикс24</td>
                                    <td className={styles.pricingPrice}>от 30 000 ₽</td>
                                    <td className={styles.pricingTime}>5-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Интеграция с маркетплейсами (WB, Ozon)</td>
                                    <td className={styles.pricingPrice}>от 40 000 ₽</td>
                                    <td className={styles.pricingTime}>7-14 дней</td>
                                </tr>
                                <tr>
                                    <td>Webhook-система</td>
                                    <td className={styles.pricingPrice}>от 15 000 ₽</td>
                                    <td className={styles.pricingTime}>3-7 дней</td>
                                </tr>
                                <tr>
                                    <td>Документация API (Swagger + описание)</td>
                                    <td className={styles.pricingPrice}>от 10 000 ₽</td>
                                    <td className={styles.pricingTime}>2-3 дня</td>
                                </tr>
                                <tr>
                                    <td>Полная система API + интеграции</td>
                                    <td className={styles.pricingPrice}>от 80 000 ₽</td>
                                    <td className={styles.pricingTime}>3-6 недель</td>
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
            <section className={`${styles.section} ${styles.sectionDark}`}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.midFormWrapper}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles.midFormContent}>
                            <h2>Нужно API для вашего проекта?</h2>
                            <p>
                                Расскажите о задаче — подготовлю техническое решение и точную оценку стоимости за 30 минут.
                                Без обязательств. Бесплатно.
                            </p>
                        </div>
                        <LeadForm
                            source="mid-form"
                            title="Заказать разработку API"
                            subtitle="Ответьте в течение 30 минут"
                            compact
                        />
                    </motion.div>
                </div>
            </section>

            {/* ============ FAQ (H2) ============ */}
            <section className={styles.section} id="faq">
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
                            Ответы на популярные вопросы о разработке API и интеграций
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            {
                                q: 'Сколько стоит разработка REST API?',
                                a: 'Базовое REST API от 25 000 ₽. Сложная система с интеграциями — от 60 000 ₽. Точная стоимость зависит от количества эндпоинтов и сложности бизнес-логики.'
                            },
                            {
                                q: 'Какие технологии используете для создания API?',
                                a: 'Основной стек: Python, FastAPI, Django REST Framework. База данных: PostgreSQL, Redis для кэширования. Развёртывание: Docker, Nginx. Все API получают автоматическую документацию Swagger.'
                            },
                            {
                                q: 'Можно ли интегрировать API с 1С?',
                                a: 'Да, интеграция с 1С через REST API — одна из самых частых задач. Настраиваю обмен данными в реальном времени: заказы, товары, остатки, документы.'
                            },
                            {
                                q: 'Сколько времени занимает разработка API?',
                                a: 'Простое API с 5-10 эндпоинтами — 5-7 дней. Средняя сложность с интеграциями — 2-3 недели. Сложная система с множеством сервисов — 4-6 недель.'
                            },
                            {
                                q: 'Чем отличается REST API от GraphQL?',
                                a: 'REST API — стандартный подход с фиксированными эндпоинтами, подходит для большинства задач. GraphQL — гибкий запрос данных, идеален для сложных фронтендов, где нужно получать разные наборы данных одним запросом.'
                            },
                            {
                                q: 'Предоставляете ли документацию к API?',
                                a: 'Да, каждый проект получает автоматическую документацию Swagger/OpenAPI, а также описание всех эндпоинтов, параметров и примеров запросов. Бесплатная поддержка 30 дней.'
                            },
                        ].map((item, i) => (
                            <FaqItem key={i} question={item.q} answer={item.a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ SEO КОНТЕНТ ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`}>
                <div className={styles.container}>
                    <div className={styles.seoContent}>
                        <h2 className={styles.seoH2}>Разработка API и интеграций: полное руководство</h2>

                        <p>
                            <strong>Разработка API</strong> — это создание программного интерфейса, который позволяет различным системам обмениваться данными.
                            В современном бизнесе API интеграция стала необходимостью: без неё невозможно автоматизировать процессы,
                            связать CRM с сайтом или настроить обмен данными между маркетплейсами и внутренними системами.
                        </p>

                        <h3 className={styles.seoH3}>Что такое REST API и зачем оно нужно бизнесу</h3>
                        <p>
                            <strong>REST API</strong> (Representational State Transfer) — архитектурный стиль для создания веб-сервисов.
                            Это стандарт де-факто для разработки API приложений, который используют Google, Facebook, Amazon и тысячи других компаний.
                            REST API позволяет фронтенд-приложениям (сайтам, мобильным приложениям, Telegram-ботам) получать данные от сервера
                            и отправлять обратно — создавать заказы, обновлять профили, загружать файлы.
                        </p>
                        <p>
                            Основные преимущества <strong>создания REST API</strong>:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Масштабируемость</strong> — один API может обслуживать десятки приложений одновременно</li>
                            <li><strong>Безопасность</strong> — централизованная авторизация, валидация данных, ограничение запросов</li>
                            <li><strong>Независимость</strong> — фронтенд и бэкенд развиваются независимо друг от друга</li>
                            <li><strong>Документируемость</strong> — автоматическая документация Swagger/OpenAPI</li>
                            <li><strong>Производительность</strong> — с FastAPI скорость обработки в 3 раза выше, чем у Flask</li>
                        </ul>

                        <h3 className={styles.seoH3}>Интеграция 1С через API: как это работает</h3>
                        <p>
                            <strong>Интеграция 1С через API</strong> — одна из самых востребованных задач в российском бизнесе.
                            1С:Предприятие хранит критически важные данные: заказы, товары, остатки, финансовые документы.
                            Без автоматического обмена данными сотрудники тратят часы на ручной ввод информации,
                            что приводит к ошибкам и потере клиентов.
                        </p>
                        <p>
                            Я настраиваю <strong>1С интеграцию API</strong> через REST-интерфейс, который позволяет:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Автоматически выгружать заказы</strong> из интернет-магазина или маркетплейса в 1С</li>
                            <li><strong>Синхронизировать остатки</strong> товаров между 1С, сайтом и маркетплейсами в реальном времени</li>
                            <li><strong>Обновлять цены</strong> на основе данных из 1С</li>
                            <li><strong>Создавать документы</strong> (счёт-фактуры, накладные) автоматически</li>
                            <li><strong>Отправлять уведомления</strong> менеджерам о новых заказах через Telegram</li>
                        </ul>
                        <p>
                            Время разработки интеграции с 1С через API составляет от 7 до 14 дней в зависимости от количества
                            обмениваемых данных и сложности бизнес-логики. Стоимость — от 35 000 ₽.
                        </p>

                        <h3 className={styles.seoH3}>Сервис интеграции API: подключение CRM и маркетплейсов</h3>
                        <p>
                            <strong>Сервис интеграции API</strong> — это программный слой, который связывает разные системы между собой.
                            Чаще всего я интегрирую:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>amoCRM и Битрикс24</strong> — автоматическое создание сделок из форм на сайте, Telegram-бота или маркетплейса</li>
                            <li><strong>Wildberries и Ozon</strong> — получение заказов, обновление остатков, мониторинг цен через API селлера</li>
                            <li><strong>Платёжные системы</strong> — ЮKassa, Stripe, Robokassa для приёма платежей и обработки вебхуков</li>
                            <li><strong>Google Sheets и Telegram</strong> — экспорт данных, уведомления, управление через бота</li>
                        </ul>
                        <p>
                            Каждая интеграция проектируется с учётом отказоустойчивости: автоматические повторы при ошибках,
                            логирование всех запросов, мониторинг доступности внешних сервисов.
                        </p>

                        <h3 className={styles.seoH3}>REST API создание: стек технологий</h3>
                        <p>
                            Для <strong>создания REST API</strong> я использую проверенный стек технологий на Python:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>FastAPI</strong> — асинхронный фреймворк, который в 3 раза быстрее Flask. Автоматическая генерация Swagger-документации, валидация через Pydantic, поддержка WebSocket</li>
                            <li><strong>Django REST Framework</strong> — для сложных проектов с готовой админкой, ORM, системой миграций</li>
                            <li><strong>PostgreSQL</strong> — надёжная реляционная база данных с поддержкой JSON, полнотекстового поиска и расширений</li>
                            <li><strong>Redis</strong> — кэширование, очереди задач, хранение сессий</li>
                            <li><strong>Celery</strong> — асинхронная обработка фоновых задач (отправка писем, генерация отчётов)</li>
                            <li><strong>Docker</strong> — контейнеризация для воспроизводимого развёртывания</li>
                            <li><strong>Nginx</strong> — reverse proxy, балансировка нагрузки, SSL-termination</li>
                        </ul>

                        <h3 className={styles.seoH3}>Разработка REST API: процесс и гарантии</h3>
                        <p>
                            Процесс <strong>разработки REST API</strong> включает 5 этапов: анализ требований, проектирование архитектуры,
                            написание кода с тестами, нагрузочное тестирование и запуск в production. Каждый проект получает
                            автоматическую документацию Swagger/OpenAPI, которая позволяет фронтенд-разработчикам сразу начать
                            работу с API без дополнительных вопросов.
                        </p>
                        <p>
                            Я предоставляю <strong>бесплатную поддержку 30 дней</strong> после сдачи проекта. Это включает исправление багов,
                            оптимизацию производительности и консультации по масштабированию. Оплата производится поэтапно:
                            50% предоплата, 50% после приёмки.
                        </p>

                        <h3 className={styles.seoH3}>Документация API: Swagger и OpenAPI</h3>
                        <p>
                            <strong>Документация API</strong> — критически важная часть любого проекта. Без неё фронтенд-разработчики
                            тратят дни на разбирательство с эндпоинтами, а новые члены команды не могут быстро подключиться к проекту.
                        </p>
                        <p>
                            Каждый мой проект получает документацию в формате <strong>Swagger/OpenAPI</strong>, которая включает:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Интерактивный UI</strong> — можно тестировать API прямо в браузере</li>
                            <li><strong>Описание всех эндпоинтов</strong> — URL, метод, параметры, ответы, коды ошибок</li>
                            <li><strong>Примеры запросов</strong> — curl, Python, JavaScript</li>
                            <li><strong>Схемы данных</strong> — модели запросов и ответов с описанием полей</li>
                            <li><strong>Авторизация</strong> — описание методов аутентификации (JWT, API Key, OAuth2)</li>
                        </ul>

                        <h3 className={styles.seoH3}>Webhook и автоматизация бизнес-процессов</h3>
                        <p>
                            <strong>Webhook</strong> — механизм мгновенного уведомления системы о событии. В отличие от постоянного
                            опроса API (polling), webhook экономит ресурсы сервера и обеспечивает мгновенную реакцию.
                        </p>
                        <p>
                            Типичные сценарии использования webhook:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Оплата заказа</strong> — платёжная система отправляет webhook → заказ автоматически переводится в статус «оплачен» → товар резервируется</li>
                            <li><strong>Новый лид</strong> — форма на сайте отправляет webhook → лид создаётся в CRM → менеджер получает уведомление в Telegram</li>
                            <li><strong>Изменение статуса доставки</strong> → клиент получает уведомление → обновляется трекинг в личном кабинете</li>
                            <li><strong>Поступление товара на склад WB</strong> → автоматически обновляются остатки на сайте</li>
                        </ul>

                        {/* Внутренние ссылки */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Связанные услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-servisov">Разработка веб-сервисов</a>
                                <a href="/razrabotka-crm">Разработка CRM</a>
                                <a href="/razrabotka-botov">Разработка Telegram-ботов</a>
                                <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                            Готовы обсудить ваш <span className={styles.textAccent}>API проект</span>?
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
                            title="Заказать разработку API"
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
                                Разработка API, веб-сервисов, Telegram-ботов и автоматизация бизнес-процессов на Python.
                            </p>
                        </div>
                        <div>
                            <h4>Услуги</h4>
                            <a href="/razrabotka-api">Разработка API</a>
                            <a href="/razrabotka-servisov">Веб-сервисы</a>
                            <a href="/razrabotka-crm">CRM системы</a>
                            <a href="/razrabotka-botov">Telegram-боты</a>
                        </div>
                        <div>
                            <h4>Направления</h4>
                            <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                            <a href="/lidogeneraciya-telegram">Лидогенерация</a>
                            <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
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
                        <p>Разработка API и интеграций на заказ</p>
                    </div>
                </div>
            </footer>

            {/* ============ STICKY CTA (MOBILE) ============ */}
            <div className={styles.stickyCta}>
                <button className={styles.stickyCtaButton} onClick={scrollToForm}>
                    <i className='bx bxl-telegram' />
                    Заказать API в Telegram
                </button>
            </div>
        </>
    );
}
