import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';
import styles from './nextjs-razrabotka.module.css';

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
const PAGE_URL = `${SITE_URL}/nextjs-razrabotka`;
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
            "name": "Разработка на Next.js — веб-приложения, SaaS, лендинги | DimaRazrab",
            "description": "Профессиональная разработка на Next.js 14+: SSR, SSG, серверные компоненты. Веб-приложения, SaaS, лендинги, интернет-магазины. TypeScript, Tailwind CSS. Бесплатная поддержка 30 дней.",
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
                { "@type": "ListItem", "position": 2, "name": "Разработка на Next.js", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Разработка на Next.js",
            "description": "Создание веб-приложений на Next.js 14+ с SSR/SSG, серверными компонентами, TypeScript и Tailwind CSS. SaaS-платформы, корпоративные сайты, лендинги, интернет-магазины, дашборды.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Next.js разработчик",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["Next.js", "React", "TypeScript", "SSR", "SSG", "Server Components", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"]
            },
            "serviceType": "Разработка веб-приложений на Next.js",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги Next.js разработки",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Корпоративный сайт на Next.js",
                            "description": "SSR/SSG корпоративный сайт с SEO-оптимизацией, адаптивной вёрсткой и CMS. Срок 10-15 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "SaaS-платформа на Next.js",
                            "description": "Полнофункциональная SaaS-платформа с авторизацией, дашбордом, подписками и API. Срок 4-8 недель."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Лендинг на Next.js",
                            "description": "Высококонверсионный лендинг с SSR для максимальной скорости загрузки и SEO. Срок 5-10 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Интернет-магазин на Next.js",
                            "description": "E-commerce с SSR, каталогом, корзиной, оплатой и админ-панелью. Срок 3-6 недель."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Дашборд и админ-панель на Next.js",
                            "description": "Аналитическая панель с графиками, фильтрами, экспортом данных и управлением пользователями. Срок 2-4 недели."
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
                    "name": "Сколько стоит разработка сайта на Next.js?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Лендинг на Next.js — от 35 000 ₽. Корпоративный сайт — от 60 000 ₽. SaaS-платформа — от 120 000 ₽. Интернет-магазин — от 100 000 ₽. Точная стоимость зависит от объёма функционала и сложности интеграций."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Почему Next.js лучше обычного React?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Next.js добавляет серверный рендеринг (SSR), статическую генерацию (SSG), автоматическую маршрутизацию, оптимизацию изображений и встроенные API-маршруты. Это критически важно для SEO, скорости загрузки и пользовательского опыта."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие сроки разработки на Next.js?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Лендинг — 5-10 дней. Корпоративный сайт с CMS — 2-3 недели. SaaS-платформа — 4-8 недель. Интернет-магазин — 3-6 недель. Точные сроки определяю после анализа ТЗ."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Используете ли TypeScript и Tailwind CSS?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, все проекты разрабатываю на TypeScript для типобезопасности и Tailwind CSS для быстрой стилизации. Это стандарт моего стека для Next.js-проектов."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Как обеспечиваете SEO-оптимизацию в Next.js?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Next.js из коробки поддерживает SSR и SSG, что обеспечивает индексируемость контента поисковиками. Дополнительно настраиваю мета-теги, Open Graph, Schema.org, sitemap.xml, robots.txt, оптимизацию Core Web Vitals и структурированные данные."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Предоставляете ли поддержку после запуска?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, бесплатная поддержка 30 дней после сдачи проекта. Включает исправление багов, оптимизацию производительности и консультации. Далее — договор на ежемесячную поддержку по фиксированной стоимости."
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
                text: `[${source}] ${task || 'Заявка с лендинга "Разработка на Next.js"'}`,
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
                {loading ? 'Отправка...' : 'Заказать сайт на Next.js'}
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

export default function NextjsRazrabotkaPage() {
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
                <title>Разработка на Next.js — веб-приложения, SaaS, лендинги | DimaRazrab</title>
                <meta
                    name="description"
                    content="Профессиональная Next.js разработка: SSR, SSG, серверные компоненты. SaaS, корпоративные сайты, лендинги. TypeScript, Tailwind CSS. Бесплатная поддержка 30 дней."
                />
                <meta name="keywords" content="next js разработка, next js разработчик, разработка на next.js, nextjs разработка, создание сайта next.js, next.js разработчик на заказ, next js и figma разработке code сайта" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Разработка на Next.js — веб-приложения, SaaS, лендинги | DimaRazrab" />
                <meta property="og:description" content="Next.js разработка: SSR, SSG, серверные компоненты. SaaS, корпоративные сайты, лендинги. TypeScript, Tailwind CSS. Бесплатная поддержка 30 дней." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Разработка на Next.js — веб-приложения, SaaS, лендинги | DimaRazrab" />
                <meta name="twitter:description" content="Next.js разработка: SSR, SSG, серверные компоненты. SaaS, корпоративные сайты, лендинги. Бесплатная поддержка 30 дней." />
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
                        <a href="#benefits" onClick={() => setMobileMenu(false)}>Преимущества</a>
                        <a href="#offers" onClick={() => setMobileMenu(false)}>Услуги</a>
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
                    { label: 'Next.js разработка' },
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
                                ⚡ Next.js 14+ • SSR/SSG • TypeScript • Бесплатная консультация
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <span className={styles.heroHighlight}>Разработка на Next.js</span> — веб-приложения, SaaS, лендинги
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Создаю высокопроизводительные веб-приложения на Next.js с серверным рендерингом (SSR), статической генерацией (SSG) и серверными компонентами. TypeScript, Tailwind CSS, Prisma — полный современный стек. Бесплатная поддержка 30 дней.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                            >
                                {[
                                    'SEO-оптимизация из коробки — SSR, SSG, мета-теги',
                                    'Скорость загрузки < 1 секунды — Core Web Vitals 90+',
                                    'TypeScript + Tailwind CSS — типобезопасность и скорость',
                                    'Prisma + PostgreSQL — надёжный бэкенд',
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
                                    Заказать сайт на Next.js
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
                                title="Обсудим ваш проект на Next.js?"
                                subtitle="Опишите задачу — рассчитаю стоимость и сроки за 30 минут"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className={styles.diagonalDivider} />
            </section>

            {/* ============ ПОЧЕМУ NEXT.JS (H2) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="benefits">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Почему Next.js</h2>
                        <p className={styles.sectionSubtitle}>
                            Современный фреймворк React для production-ready приложений с SEO и максимальной производительностью
                        </p>
                    </motion.div>

                    <div className={styles.benefitsGrid}>
                        {/* SEO-оптимизация из коробки */}
                        <motion.div
                            className={styles.benefitCard}
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.benefitIcon}>
                                <i className='bx bx-search-alt' />
                            </div>
                            <h3>SEO-оптимизация из коробки (SSR/SSG)</h3>
                            <p>
                                Серверный рендеринг (SSR) и статическая генерация (SSG) обеспечивают полную индексируемость контента поисковыми системами.
                                Страницы отдаются с готовым HTML — Google и Яндекс видят весь контент без JavaScript.
                                Автоматическая генерация sitemap.xml, robots.txt, Open Graph и Schema.org.
                            </p>
                        </motion.div>

                        {/* Высокая производительность */}
                        <motion.div
                            className={styles.benefitCard}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.benefitIcon}>
                                <i className='bx bx-zap' />
                            </div>
                            <h3>Высокая производительность</h3>
                            <p>
                                Серверные компоненты React 18 снижают размер JavaScript-бандла на 40-60%.
                                Автоматическая оптимизация изображений через next/image, ленивая загрузка шрифтов,
                                встроенное кэширование и Edge Runtime. Core Web Vitals 90+ из коробки.
                            </p>
                        </motion.div>

                        {/* Масштабируемость */}
                        <motion.div
                            className={styles.benefitCard}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.benefitIcon}>
                                <i className='bx bx-line-chart' />
                            </div>
                            <h3>Масштабируемость</h3>
                            <p>
                                Архитектура App Router с серверными компонентами позволяет масштабировать приложение
                                от лендинга до SaaS-платформы с тысячами пользователей. Поддержка ISR (Incremental Static Regeneration),
                                middleware, API Routes и интеграция с любым бэкендом.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ ЧТО Я РАЗРАБАТЫВАЮ (H2) ============ */}
            <section className={styles.section} id="offers">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Что я разрабатываю на Next.js</h2>
                        <p className={styles.sectionSubtitle}>
                            Полный спектр веб-приложений — от лендингов до сложных SaaS-платформ
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* Корпоративные сайты */}
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
                                <span className={styles.offerBadge}>Корпоративные сайты</span>
                                <h3 className={styles.offerName}>Корпоративные сайты</h3>
                                <p className={styles.offerFor}>Для компаний, стартапов и профессиональных услуг</p>
                            </div>
                            <div className={styles.offerPrice}>от 60 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 10-15 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> SSR/SSG для мгновенной загрузки и SEO</li>
                                <li><i className='bx bx-check' /> Интеграция с CMS (Strapi, Sanity, Headless WordPress)</li>
                                <li><i className='bx bx-check' /> Адаптивная вёрстка на Tailwind CSS</li>
                                <li><i className='bx bx-check' /> Мультиязычность (i18n)</li>
                                <li><i className='bx bx-check' /> Анимации на Framer Motion</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Заказать корпоративный сайт
                                </button>
                                <span className={styles.offerNote}>Бесплатная оценка за 30 минут</span>
                            </div>
                        </motion.div>

                        {/* SaaS-платформы */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>SaaS</span>
                                <h3 className={styles.offerName}>SaaS-платформы</h3>
                                <p className={styles.offerFor}>Полнофункциональные сервисы с подписками и API</p>
                            </div>
                            <div className={styles.offerPrice}>от 120 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 4-8 недель</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Авторизация (NextAuth.js, JWT, OAuth)</li>
                                <li><i className='bx bx-check' /> Дашборды с аналитикой и графиками</li>
                                <li><i className='bx bx-check' /> Система подписок и биллинга</li>
                                <li><i className='bx bx-check' /> API Routes + внешнее REST/GraphQL API</li>
                                <li><i className='bx bx-check' /> Роли и права доступа (RBAC)</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать SaaS
                                </button>
                            </div>
                        </motion.div>

                        {/* Лендинги */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Лендинги</span>
                                <h3 className={styles.offerName}>Лендинги и промо-страницы</h3>
                                <p className={styles.offerFor}>Высококонверсионные посадочные страницы</p>
                            </div>
                            <div className={styles.offerPrice}>от 35 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 5-10 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> SSG для максимальной скорости загрузки</li>
                                <li><i className='bx bx-check' /> Формы захвата лидов с отправкой в Telegram</li>
                                <li><i className='bx bx-check' /> A/B тестируемые элементы</li>
                                <li><i className='bx bx-check' /> Интеграция с аналитикой (Метрика, GA4)</li>
                                <li><i className='bx bx-check' /> Анимации и интерактивные элементы</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать лендинг
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Второй ряд */}
                    <div className={styles.offersGrid} style={{ marginTop: 24 }}>
                        {/* Интернет-магазины */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>E-commerce</span>
                                <h3 className={styles.offerName}>Интернет-магазины</h3>
                                <p className={styles.offerFor}>Каталог, корзина, оплата, админ-панель</p>
                            </div>
                            <div className={styles.offerPrice}>от 100 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 3-6 недель</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> SSR каталога для SEO-индексации товаров</li>
                                <li><i className='bx bx-check' /> Корзина, оформление заказа, оплата (ЮKassa, Stripe)</li>
                                <li><i className='bx bx-check' /> Админ-панель для управления товарами</li>
                                <li><i className='bx bx-check' /> Фильтры, поиск, сортировка с ISR</li>
                                <li><i className='bx bx-check' /> Интеграция с 1С, маркетплейсами</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать магазин
                                </button>
                            </div>
                        </motion.div>

                        {/* Дашборды и админ-панели */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Дашборды</span>
                                <h3 className={styles.offerName}>Дашборды и админ-панели</h3>
                                <p className={styles.offerFor}>Аналитика, управление данными, отчёты</p>
                            </div>
                            <div className={styles.offerPrice}>от 80 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 2-4 недели</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Интерактивные графики (Recharts, Chart.js)</li>
                                <li><i className='bx bx-check' /> Таблицы с фильтрацией, сортировкой, пагинацией</li>
                                <li><i className='bx bx-check' /> Экорт данных в Excel, CSV, PDF</li>
                                <li><i className='bx bx-check' /> Real-time обновления через WebSocket</li>
                                <li><i className='bx bx-check' /> Управление пользователями и ролями</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать дашборд
                                </button>
                            </div>
                        </motion.div>

                        {/* Telegram Mini Apps */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={5}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Mini Apps</span>
                                <h3 className={styles.offerName}>Telegram Mini Apps</h3>
                                <p className={styles.offerFor}>Веб-приложения внутри Telegram</p>
                            </div>
                            <div className={styles.offerPrice}>от 50 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 2-4 недели</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Интеграция с Telegram Web App API</li>
                                <li><i className='bx bx-check' /> Авторизация через Telegram</li>
                                <li><i className='bx bx-check' /> Платежи через Telegram Stars и внешние системы</li>
                                <li><i className='bx bx-check' /> Нативный look & feel в Telegram</li>
                                <li><i className='bx bx-check' /> Уведомления через Telegram Bot API</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать Mini App
                                </button>
                            </div>
                        </motion.div>
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
                            Реальные проекты Next.js разработки с измеримыми бизнес-результатами
                        </p>
                    </motion.div>

                    <div className={styles.portfolioGrid}>
                        {/* next_js_django — платформа знакомств */}
                        <motion.a
                            href="/work/next_js_django"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Next.js + Django</span>
                            <h3>Платформа знакомств с высокой конверсией</h3>
                            <p>
                                Высокопроизводительная платформа знакомств с SSR и ML-алгоритмами подбора.
                                Конверсия регистрации выросла на 340%, время сессии — на 280%, выручка — на 450%.
                                Органический трафик вырос на 520%, стоимость привлечения снизилась на 79%.
                            </p>
                            <span className={styles.portfolioTech}>Next.js • React • TypeScript • Django REST • PostgreSQL • TensorFlow • PWA</span>
                        </motion.a>

                        {/* next_js_cinema — стриминговая платформа */}
                        <motion.a
                            href="/work/next_js_cinema"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Next.js + SSR</span>
                            <h3>Стриминговая платформа с высокой монетизацией</h3>
                            <p>
                                Стриминговая платформа с SSR и ML-рекомендациями. Время просмотра выросло на 420%,
                                конверсия в подписки — на 380%, выручка — на 650%. Органический трафик вырос с 15% до 68%.
                                Загрузка страниц сократилась с 8-12 сек до 1.2 сек.
                            </p>
                            <span className={styles.portfolioTech}>Next.js • React • TypeScript • Node.js • PostgreSQL • TensorFlow • FFmpeg • PWA</span>
                        </motion.a>

                        {/* fastapi_nextjs_markets — маркетплейсы */}
                        <motion.a
                            href="/work/fastapi_nextjs_markets"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Next.js + FastAPI</span>
                            <h3>Платформа автоматизации маркетплейсов</h3>
                            <p>
                                Комплексная система управления товарами на WB и Ozon с SSR.
                                Рост продаж на 520%, увеличение прибыли на 340%, экономия времени на 85%.
                                Ассортимент вырос с 1200 до 5760 товаров, ROI 680% за 4 месяца.
                            </p>
                            <span className={styles.portfolioTech}>Next.js SSR • FastAPI • Python • PostgreSQL • Redis • Celery • Docker</span>
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
                            Современные инструменты для надёжных и масштабируемых веб-приложений на Next.js
                        </p>
                    </motion.div>

                    <div className={styles.techGrid}>
                        {[
                            { icon: 'bx bxl-react', title: 'Next.js 14+', desc: 'App Router, SSR, SSG, ISR, Server Components' },
                            { icon: 'bx bxl-react', title: 'React 18', desc: 'Concurrent Features, Suspense, Server Components' },
                            { icon: 'bx bxl-typescript', title: 'TypeScript', desc: 'Типобезопасность и автодополнение' },
                            { icon: 'bx bxl-tailwind-css', title: 'Tailwind CSS', desc: 'Утилитарный CSS-фреймворк' },
                            { icon: 'bx bx-data', title: 'Prisma', desc: 'Type-safe ORM для PostgreSQL' },
                            { icon: 'bx bx-data', title: 'PostgreSQL', desc: 'Надёжная реляционная база данных' },
                            { icon: 'bx bxl-docker', title: 'Docker', desc: 'Контейнеризация и развёртывание' },
                            { icon: 'bx bx-server', title: 'Vercel / VPS', desc: 'Хостинг с CDN и автоматическим CI/CD' },
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
                        <h2 className={styles.sectionTitle}>Процесс разработки</h2>
                        <p className={styles.sectionSubtitle}>
                            Прозрачный процесс от идеи до запуска в production
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx bx-conversation', title: 'Анализ', desc: 'Разбираю задачу, определяю функционал, формирую ТЗ и оценку' },
                            { num: '02', icon: 'bx bx-palette', title: 'Дизайн в коде', desc: 'Figma → Next.js + Tailwind. Адаптивная вёрстка с первого дня' },
                            { num: '03', icon: 'bx bx-code-alt', title: 'Разработка', desc: 'TypeScript, React, Prisma, API Routes. SSR/SSG по задаче' },
                            { num: '04', icon: 'bx bx-test-tube', title: 'Тестирование', desc: 'Lighthouse 90+, проверка SEO, кросс-браузерность, мобильные' },
                            { num: '05', icon: 'bx bx-rocket', title: 'Запуск', desc: 'Vercel или VPS, CI/CD, мониторинг, бесплатная поддержка 30 дней' },
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
                        <h2 className={styles.sectionTitle}>Стоимость разработки на Next.js</h2>
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
                                    <td>Лендинг на Next.js (SSG)</td>
                                    <td className={styles.pricingPrice}>от 35 000 ₽</td>
                                    <td className={styles.pricingTime}>5-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Корпоративный сайт с CMS</td>
                                    <td className={styles.pricingPrice}>от 60 000 ₽</td>
                                    <td className={styles.pricingTime}>10-15 дней</td>
                                </tr>
                                <tr>
                                    <td>Дашборд / админ-панель</td>
                                    <td className={styles.pricingPrice}>от 80 000 ₽</td>
                                    <td className={styles.pricingTime}>2-4 недели</td>
                                </tr>
                                <tr>
                                    <td>Интернет-магазин (SSR)</td>
                                    <td className={styles.pricingPrice}>от 100 000 ₽</td>
                                    <td className={styles.pricingTime}>3-6 недель</td>
                                </tr>
                                <tr>
                                    <td>SaaS-платформа</td>
                                    <td className={styles.pricingPrice}>от 120 000 ₽</td>
                                    <td className={styles.pricingTime}>4-8 недель</td>
                                </tr>
                                <tr>
                                    <td>Telegram Mini App</td>
                                    <td className={styles.pricingPrice}>от 50 000 ₽</td>
                                    <td className={styles.pricingTime}>2-4 недели</td>
                                </tr>
                                <tr>
                                    <td>Миграция с CRA/Vite на Next.js</td>
                                    <td className={styles.pricingPrice}>от 40 000 ₽</td>
                                    <td className={styles.pricingTime}>1-3 недели</td>
                                </tr>
                                <tr>
                                    <td>Next.js + Figma (вёрстка по макету)</td>
                                    <td className={styles.pricingPrice}>от 30 000 ₽</td>
                                    <td className={styles.pricingTime}>5-10 дней</td>
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
                            <h2>Нужен сайт или приложение на Next.js?</h2>
                            <p>
                                Расскажите о задаче — подготовлю техническое решение и точную оценку стоимости за 30 минут.
                                Без обязательств. Бесплатно.
                            </p>
                        </div>
                        <LeadForm
                            source="mid-form"
                            title="Заказать Next.js разработку"
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
                            Ответы на популярные вопросы о Next.js разработке
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            {
                                q: 'Сколько стоит разработка сайта на Next.js?',
                                a: 'Лендинг на Next.js — от 35 000 ₽. Корпоративный сайт — от 60 000 ₽. SaaS-платформа — от 120 000 ₽. Интернет-магазин — от 100 000 ₽. Точная стоимость зависит от объёма функционала и сложности интеграций.'
                            },
                            {
                                q: 'Почему Next.js лучше обычного React?',
                                a: 'Next.js добавляет серверный рендеринг (SSR), статическую генерацию (SSG), автоматическую маршрутизацию, оптимизацию изображений и встроенные API-маршруты. Это критически важно для SEO, скорости загрузки и пользовательского опыта.'
                            },
                            {
                                q: 'Какие сроки разработки на Next.js?',
                                a: 'Лендинг — 5-10 дней. Корпоративный сайт с CMS — 2-3 недели. SaaS-платформа — 4-8 недель. Интернет-магазин — 3-6 недель. Точные сроки определяю после анализа ТЗ.'
                            },
                            {
                                q: 'Используете ли TypeScript и Tailwind CSS?',
                                a: 'Да, все проекты разрабатываю на TypeScript для типобезопасности и Tailwind CSS для быстрой стилизации. Это стандарт моего стека для Next.js-проектов.'
                            },
                            {
                                q: 'Как обеспечиваете SEO-оптимизацию в Next.js?',
                                a: 'Next.js из коробки поддерживает SSR и SSG, что обеспечивает индексируемость контента поисковиками. Дополнительно настраиваю мета-теги, Open Graph, Schema.org, sitemap.xml, robots.txt, оптимизацию Core Web Vitals и структурированные данные.'
                            },
                            {
                                q: 'Предоставляете ли поддержку после запуска?',
                                a: 'Да, бесплатная поддержка 30 дней после сдачи проекта. Включает исправление багов, оптимизацию производительности и консультации. Далее — договор на ежемесячную поддержку по фиксированной стоимости.'
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
                        <h2 className={styles.seoH2}>Разработка на Next.js: полное руководство</h2>

                        <p>
                            <strong>Разработка на Next.js</strong> — это создание современных веб-приложений на React-фреймворке от Vercel,
                            который сочетает серверный рендеринг (SSR), статическую генерацию (SSG) и серверные компоненты React 18.
                            Next.js стал стандартом для production-ready приложений, которые требуют высокой производительности и SEO-оптимизации.
                            Компании вроде Netflix, Twitch, TikTok и Nike используют Next.js для своих веб-платформ.
                        </p>

                        <h3 className={styles.seoH3}>Почему Next.js — лучший выбор для коммерческих проектов</h3>
                        <p>
                            <strong>Next.js разработка</strong> позволяет создавать приложения, которые мгновенно загружаются и отлично
                            индексируются поисковыми системами. В отличие от клиентского React (Create React App, Vite), Next.js
                            отдаёт готовый HTML на сервере, что критически важно для SEO. Поисковые роботы Google и Яндекс видят
                            полный контент страницы без необходимости выполнения JavaScript.
                        </p>
                        <p>
                            Основные преимущества <strong>Next.js разработки</strong> для бизнеса:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>SEO из коробки</strong> — SSR и SSG обеспечивают полную индексируемость. Страницы попадают в поисковую выдачу в течение дней, а не недель</li>
                            <li><strong>Скорость загрузки</strong> — серверный рендеринг + автоматическая оптимизация изображений = Core Web Vitals 90+. Google ранжирует быстрые сайты выше</li>
                            <li><strong>Масштабируемость</strong> — от лендинга до SaaS с тысячами пользователей без смены фреймворка</li>
                            <li><strong>Экосистема</strong> — тысячи готовых библиотек, Vercel для мгновенного деплоя, интеграция с любым API</li>
                            <li><strong>Будущее React</strong> — серверные компоненты, Suspense, streaming SSR — всё это уже в Next.js</li>
                        </ul>

                        <h3 className={styles.seoH3}>Next.js + Figma: разработка сайта по макету</h3>
                        <p>
                            Одна из самых частых задач — <strong>Next.js и Figma в разработке кода сайта</strong>. Вы предоставляете
                            дизайн-макет в Figma, а я превращаю его в пиксельно точный, адаптивный и быстрый сайт на Next.js + Tailwind CSS.
                            Такой подход позволяет получить production-ready код за 5-10 дней, с идеальным соответствием дизайну
                            и полной SEO-оптимизацией.
                        </p>
                        <p>
                            Процесс <strong>Figma → Next.js разработки</strong> включает:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Анализ макета</strong> — изучаю дизайн-систему, компоненты, типографику, цвета</li>
                            <li><strong>Адаптивная вёрстка</strong> — Tailwind CSS с мобильного-first подхода. Все брейкпоинты из Figma</li>
                            <li><strong>Интерактивность</strong> — анимации на Framer Motion, hover-эффекты, модальные окна</li>
                            <li><strong>Оптимизация</strong> — next/image для изображений, lazy loading, оптимизация шрифтов</li>
                            <li><strong>SEO-разметка</strong> — мета-теги, Open Graph, Schema.org, семантический HTML</li>
                        </ul>

                        <h3 className={styles.seoH3}>SSR, SSG и серверные компоненты: когда что использовать</h3>
                        <p>
                            <strong>Next.js разработчик</strong> должен понимать, когда использовать каждый метод рендеринга:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>SSG (Static Site Generation)</strong> — для страниц, которые редко меняются: лендинги, блоги, документация. Генерируются при сборке, отдаются мгновенно через CDN</li>
                            <li><strong>SSR (Server-Side Rendering)</strong> — для динамического контента: каталог товаров, профили пользователей, поисковая выдача. Рендерятся на сервере при каждом запросе</li>
                            <li><strong>ISR (Incremental Static Regeneration)</strong> — гибрид SSG и SSR: статические страницы обновляются в фоне без пересборки. Идеально для контента, который обновляется раз в час-день</li>
                            <li><strong>Server Components</strong> — компоненты React, которые рендерятся на сервере и не попадают в клиентский бандл. Снижают размер JS на 40-60%</li>
                        </ul>

                        <h3 className={styles.seoH3}>Next.js разработчик: стек технологий</h3>
                        <p>
                            Мой стек для <strong>Next.js разработки</strong> включает проверенные технологии:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Next.js 14+</strong> — App Router, Server Components, Streaming SSR, Metadata API</li>
                            <li><strong>React 18</strong> — Concurrent Features, Suspense, useTransition, useDeferredValue</li>
                            <li><strong>TypeScript</strong> — строгая типизация, автодополнение, рефакторинг без страха</li>
                            <li><strong>Tailwind CSS</strong> — утилитарный CSS для быстрой стилизации. PurgeCSS удаляет неиспользуемые стили</li>
                            <li><strong>Prisma</strong> — type-safe ORM для PostgreSQL, миграции, сидинг данных</li>
                            <li><strong>NextAuth.js</strong> — авторизация через Google, GitHub, Telegram, credentials</li>
                            <li><strong>Zustand / React Query</strong> — управление состоянием и серверным кэшем</li>
                            <li><strong>Framer Motion</strong> — анимации и микроинтеракции</li>
                        </ul>

                        <h3 className={styles.seoH3}>Процесс Next.js разработки и гарантии</h3>
                        <p>
                            Процесс <strong>разработки на Next.js</strong> включает 5 этапов: анализ требований, дизайн в коде (Figma → Tailwind),
                            разработка с TypeScript, тестирование (Lighthouse 90+) и запуск на Vercel или VPS с CI/CD.
                            Каждый проект получает бесплатную поддержку 30 дней, которая включает исправление багов,
                            оптимизацию производительности и консультации по масштабированию.
                        </p>
                        <p>
                            Оплата производится поэтапно: 50% предоплата, 50% после приёмки.
                            Фиксированная цена — никаких сюрпризов в процессе разработки.
                        </p>

                        <h3 className={styles.seoH3}>Миграция на Next.js с других фреймворков</h3>
                        <p>
                            Если ваш текущий сайт работает на Create React App, Vite, Vue или обычном HTML/CSS, я могу выполнить
                            <strong> миграцию на Next.js</strong> с сохранением функционала и улучшением SEO. Миграция включает:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Аудит текущего сайта</strong> — анализ архитектуры, SEO-позиций, скорости загрузки</li>
                            <li><strong>Пошаговая миграция</strong> — можно мигрировать постранично, без даунтайма</li>
                            <li><strong>Настройка редиректов</strong> — 301-редиректы для сохранения SEO-позиций</li>
                            <li><strong>Перенос контента</strong> — сохранение всего контента и структуры URL</li>
                            <li><strong>Улучшение SEO</strong> — SSR вместо CSR даёт мгновенный прирост в поисковой выдаче</li>
                        </ul>

                        {/* Внутренние ссылки */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Связанные услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-servisov">Разработка веб-сервисов</a>
                                <a href="/razrabotka-api">Разработка API</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                                <a href="/razrabotka-botov">Telegram Mini Apps</a>
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
                            Готовы обсудить ваш <span className={styles.textAccent}>проект на Next.js</span>?
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
                            title="Заказать сайт на Next.js"
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
                                Разработка на Next.js, веб-сервисов, Telegram-ботов и автоматизация бизнес-процессов.
                            </p>
                        </div>
                        <div>
                            <h4>Услуги</h4>
                            <a href="/nextjs-razrabotka">Next.js разработка</a>
                            <a href="/razrabotka-servisov">Веб-сервисы</a>
                            <a href="/razrabotka-api">API разработка</a>
                            <a href="/razrabotka-botov">Telegram-боты</a>
                        </div>
                        <div>
                            <h4>Направления</h4>
                            <a href="/python-razrabotka">Python разработка</a>
                            <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            <a href="/ai-integracii">AI интеграции</a>
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
                        <p>Next.js разработка на заказ — веб-приложения, SaaS, лендинги</p>
                    </div>
                </div>
            </footer>

            {/* ============ STICKY CTA (MOBILE) ============ */}
            <div className={styles.stickyCta}>
                <button className={styles.stickyCtaButton} onClick={scrollToForm}>
                    <i className='bx bxl-telegram' />
                    Заказать сайт на Next.js
                </button>
            </div>
        </>
    );
}
