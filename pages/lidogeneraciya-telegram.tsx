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
import styles from './lidogeneraciya-telegram.module.css';

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
const PAGE_URL = `${SITE_URL}/lidogeneraciya-telegram`;
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
            "name": "Лидогенерация в Telegram — поиск клиентов автоматически | DimaRazrab",
            "description": "Автоматический поиск лидов и клиентов в Telegram. Парсинг каналов, мониторинг ключевых слов, сбор контактов. Бесплатная поддержка 30 дней.",
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
                { "@type": "ListItem", "position": 2, "name": "Лидогенерация в Telegram", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Лидогенерация и поиск клиентов в Telegram",
            "description": "Автоматический поиск лидов и клиентов в Telegram: парсинг каналов, мониторинг ключевых слов, сбор контактов, массовая рассылка.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Лидогенерация Telegram",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["Лидогенерация Telegram", "Парсер Telegram", "Поиск клиентов Telegram", "Сбор контактов Telegram", "Массовая рассылка Telegram"]
            },
            "serviceType": "Лидогенерация и поиск клиентов в Telegram",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги лидогенерации в Telegram",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Мониторинг ключевых слов в Telegram",
                            "description": "Автоматический мониторинг сообщений в каналах и группах по ключевым словам. Срок 3-5 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Парсинг участников каналов и групп",
                            "description": "Сбор данных участников целевых каналов и групп. Срок 5-7 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Бот для сбора лидов с фильтрацией",
                            "description": "Автоматический сбор и фильтрация лидов по заданным критериям. Срок 7-10 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Система массовой рассылки",
                            "description": "Автоматическая рассылка сообщений целевой аудитории. Срок 5-7 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Полная система лидогенерации",
                            "description": "Комплексная система: парсинг, мониторинг, фильтрация, рассылка. Срок 2-3 недели."
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
                    "name": "Как найти клиентов в Telegram автоматически?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Использую парсинг каналов и групп, мониторинг ключевых слов и автоматическую фильтрацию по критериям."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько стоит лидогенерация в Telegram?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Мониторинг от 10 000 ₽, полная система от 35 000 ₽. Точная стоимость зависит от объёма и сложности."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Легален ли сбор контактов в Telegram?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Сбор публичных данных (username, открытые профили) легален. Спам-рассылки нарушают закон — я настраиваю этичные методы контакта."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько лидов можно собрать в день?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "В среднем 15-50 целевых лидов в день в зависимости от ниши и настроек фильтрации."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Как обеспечить качество лидов?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Использую многоуровневую фильтрацию: по активности, количеству подписок, ключевым словам в профиле и сообщениях."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Можно ли интегрировать с CRM?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, лиды автоматически загружаются в Google Sheets, amoCRM, Битрикс24 или любую другую систему."
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
                text: `[${source}] ${task || 'Заявка с лендинга "Лидогенерация в Telegram"'}`,
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

export default function LidogeneraciyaTelegramPage() {
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
                <title>Лидогенерация в Telegram — поиск клиентов автоматически | DimaRazrab</title>
                <meta
                    name="description"
                    content="Автоматический поиск лидов и клиентов в Telegram. Парсинг каналов, мониторинг ключевых слов, сбор контактов. Бесплатная поддержка 30 дней."
                />
                <meta name="keywords" content="лидогенерация telegram, парсер telegram, поиск лидов в telegram, сбор контактов telegram, поиск клиентов telegram, база клиентов telegram, лидогенерация бот, парсер участников telegram, массовая рассылка telegram, заказать лидогенерацию telegram" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Лидогенерация в Telegram — поиск клиентов автоматически | DimaRazrab" />
                <meta property="og:description" content="Автоматический поиск лидов и клиентов в Telegram. Парсинг каналов, мониторинг ключевых слов, сбор контактов. Бесплатная поддержка 30 дней." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Лидогенерация в Telegram — поиск клиентов автоматически | DimaRazrab" />
                <meta name="twitter:description" content="Автоматический поиск лидов и клиентов в Telegram. Парсинг каналов, мониторинг ключевых слов, сбор контактов. Бесплатная поддержка 30 дней." />
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
                        <a href="#problem" onClick={() => setMobileMenu(false)}>Проблема</a>
                        <a href="#process" onClick={() => setMobileMenu(false)}>Как работаем</a>
                        <a href="#portfolio" onClick={() => setMobileMenu(false)}>Кейсы</a>
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

            <div className={styles.container} style={{ paddingTop: 16 }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Лидогенерация в Telegram' },
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
                                ⚡ Telegram • Автоматизация • 15-50 лидов в день
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                            >
                                Поиск лидов и клиентов в{' '}
                                <span className={styles.heroHighlight}>Telegram</span>{' '}
                                — автоматическая лидогенерация
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                Автоматически нахожу клиентов в Telegram: парсинг каналов,
                                мониторинг ключевых слов, сбор контактов и рассылка.
                                15-50 целевых лидов ежедневно.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.45 }}
                            >
                                {['15-50 лидов в день', 'Бесплатная поддержка 30 дней', 'Интеграция с CRM'].map((b, i) => (
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

            {/* ============ ПРОБЛЕМА ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="problem">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Проблема: как <span className={styles.textAccent}>найти клиентов</span> в Telegram
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Telegram — крупнейшая площадка для B2B и B2C коммуникаций в России. 
                            Но как найти именно тех, кто нужен вашему бизнесу?
                        </p>
                    </motion.div>

                    <div className={styles.problemGrid}>
                        <motion.div
                            className={styles.problemCard}
                            variants={scaleIn}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.problemCardIcon}>
                                <i className='bx bx-time-five' />
                            </div>
                            <h3>Ручной поиск — долго и неэффективно</h3>
                            <p>
                                Часы рутинного поиска по каналам и группам. Вы просматриваете сотни сообщений,
                                вручную копируете контакты, тратите время на проверку неактуальных данных.
                                Результат — 3-5 лидов за целый день работы.
                            </p>
                        </motion.div>

                        <motion.div
                            className={styles.problemCard}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={`${styles.problemCardIcon} ${styles.problemCardIconGreen}`}>
                                <i className='bx bx-bot' />
                            </div>
                            <h3>Автоматизация — быстрый результат</h3>
                            <p>
                                Бот сканирует 500+ каналов, фильтрует по критериям и собирает
                                контакты 24/7. Вы получаете 15-50 целевых лидов ежедневно.
                                Стоимость лида снижается в 5-10 раз по сравнению с ручным поиском.
                            </p>
                        </motion.div>
                    </div>
                </div>
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
                            Полный спектр услуг по лидогенерации и поиску клиентов в Telegram
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* Мониторинг ключевых слов */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Мониторинг</span>
                                <h3 className={styles.offerName}>Мониторинг ключевых слов в Telegram</h3>
                                <p className={styles.offerFor}>Автоматический мониторинг сообщений по ключевым словам в каналах и группах</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Мониторинг 500+ каналов</li>
                                <li><i className='bx bx-check' /> Уведомления в реальном времени</li>
                                <li><i className='bx bx-check' /> Фильтрация по критериям</li>
                                <li><i className='bx bx-check' /> Экспорт в Google Sheets</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Парсинг участников */}
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
                                <span className={styles.offerBadge}>Парсинг</span>
                                <h3 className={styles.offerName}>Парсинг участников каналов и групп</h3>
                                <p className={styles.offerFor}>Сбор данных участников целевых каналов и групп с фильтрацией</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Сбор username и профилей</li>
                                <li><i className='bx bx-check' /> Фильтрация по активности</li>
                                <li><i className='bx bx-check' /> Массовый сбор из 100+ каналов</li>
                                <li><i className='bx bx-check' /> Автоматическое обновление базы</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Сбор контактов */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Контакты</span>
                                <h3 className={styles.offerName}>Сбор контактов и username</h3>
                                <p className={styles.offerFor}>Автоматический сбор контактов целевой аудитории с детальной фильтрацией</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Username, bio, ссылки</li>
                                <li><i className='bx bx-check' /> Фильтр по ключевым словам</li>
                                <li><i className='bx bx-check' /> Дедупликация данных</li>
                                <li><i className='bx bx-check' /> Экспорт в CRM</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Автоматическая рассылка */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Рассылка</span>
                                <h3 className={styles.offerName}>Автоматическая рассылка</h3>
                                <p className={styles.offerFor}>Массовая рассылка сообщений по собранной базе с персонализацией</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Персонализация сообщений</li>
                                <li><i className='bx bx-check' /> Ограничение скорости</li>
                                <li><i className='bx bx-check' /> A/B тестирование текстов</li>
                                <li><i className='bx bx-check' /> Статистика доставки</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать
                                </button>
                            </div>
                        </motion.div>

                        {/* Telegram-бот для лидогенерации */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Бот</span>
                                <h3 className={styles.offerName}>Telegram-бот для лидогенерации</h3>
                                <p className={styles.offerFor}>Полноценный бот, который находит, фильтрует и собирает лиды автоматически</p>
                            </div>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Автоматический поиск 24/7</li>
                                <li><i className='bx bx-check' /> Многоуровневая фильтрация</li>
                                <li><i className='bx bx-check' /> Интеграция с CRM</li>
                                <li><i className='bx bx-check' /> Дашборд и аналитика</li>
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

            {/* ============ КАК ЭТО РАБОТАЕТ ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="process">
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
                            Прозрачный процесс от обсуждения до запуска системы лидогенерации
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx-target-lock', title: 'Определяем целевую аудиторию', desc: 'Анализируем вашу нишу, определяем ключевые слова, каналы и группы, где находятся ваши потенциальные клиенты.' },
                            { num: '02', icon: 'bx-cog', title: 'Настраиваем мониторинг', desc: 'Настраиваем парсинг каналов, мониторинг ключевых слов, фильтры по активности и профилю.' },
                            { num: '03', icon: 'bx-filter', title: 'Собираем и фильтруем лиды', desc: 'Бот собирает данные 24/7, фильтрует по заданным критериям и формирует чистую базу лидов.' },
                            { num: '04', icon: 'bx-send', title: 'Автоматический контакт', desc: 'Настраиваем автоматическую рассылку или выгружаем лиды в CRM для ручной обработки.' },
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
                            Примеры <span className={styles.textAccent}>решений</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Реализованные проекты по лидогенерации и автоматизации поиска клиентов в Telegram
                        </p>
                    </motion.div>

                    <div className={styles.portfolioGrid}>
                        {[
                            {
                                slug: 'leads_from_telegram',
                                title: 'Поиск клиентов для психологической практики',
                                desc: 'Частный психолог увеличил клиентскую базу на 320% за 4 месяца. Бот находит 15-20 потенциальных клиентов ежедневно.',
                                category: 'Лидогенерация',
                                metrics: ['+320% клиентов', 'ROI 500%'],
                            },
                            {
                                slug: 'people_pars',
                                title: 'Лидогенерация для маркетингового агентства',
                                desc: 'Увеличение базы лидов на 650% за 2 месяца. Бот собирает данные из 500+ Telegram каналов. Стоимость лида снизилась в 8 раз.',
                                category: 'Парсинг / Лиды',
                                metrics: ['+650% лидов', 'ROI 780%'],
                            },
                            {
                                slug: 'support_tg',
                                title: 'Система стимулирования отзывов для WB-селлера',
                                desc: 'Увеличение отзывов на 450%, рейтинг с 4.2 до 4.8. Автоматическая система сбора и стимулирования отзывов.',
                                category: 'Отзывы / WB',
                                metrics: ['+450% отзывов', 'ROI 380%'],
                            },
                            {
                                slug: 'referal_agent',
                                title: 'Реферальная система для агентства недвижимости',
                                desc: 'Привлечение клиентов и агентов через реферальную систему с начислением бонусов. Автоматический учёт и аналитика.',
                                category: 'Реферальная система',
                                metrics: ['Автоматизация', 'Аналитика'],
                            },
                        ].map((project, i) => (
                            <motion.a
                                key={i}
                                href={`${SITE_URL}/work/${project.slug}`}
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
                                <div>
                                    {project.metrics.map((m, j) => (
                                        <span key={j} className={styles.portfolioMetric}>{m}</span>
                                    ))}
                                </div>
                                <div className={styles.portfolioTech}>Смотреть кейс →</div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ СТАТИСТИКА ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="stats">
                <div className={styles.container}>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.sectionHeader}
                    >
                        <h2 className={styles.sectionTitle}>
                            Почему это <span className={styles.textAccent}>работает</span>
                        </h2>
                    </motion.div>

                    <div className={styles.statsGrid}>
                        {[
                            { value: '15-50', label: 'Лидов в день' },
                            { value: '500+', label: 'Каналов мониторинга' },
                            { value: 'в 8 раз', label: 'Дешевле ручного поиска' },
                            { value: '24/7', label: 'Автоматическая работа' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className={styles.statCard}
                                variants={scaleIn}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
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
                                    <td>Мониторинг ключевых слов в Telegram</td>
                                    <td className={styles.pricingPrice}>от 10 000 ₽</td>
                                    <td className={styles.pricingTime}>3-5 дней</td>
                                </tr>
                                <tr>
                                    <td>Парсинг участников каналов и групп</td>
                                    <td className={styles.pricingPrice}>от 15 000 ₽</td>
                                    <td className={styles.pricingTime}>5-7 дней</td>
                                </tr>
                                <tr>
                                    <td>Бот для сбора лидов с фильтрацией</td>
                                    <td className={styles.pricingPrice}>от 20 000 ₽</td>
                                    <td className={styles.pricingTime}>7-10 дней</td>
                                </tr>
                                <tr>
                                    <td>Система массовой рассылки</td>
                                    <td className={styles.pricingPrice}>от 15 000 ₽</td>
                                    <td className={styles.pricingTime}>5-7 дней</td>
                                </tr>
                                <tr>
                                    <td>Полная система лидогенерации</td>
                                    <td className={styles.pricingPrice}>от 35 000 ₽</td>
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
                            { icon: 'bx-target-lock', title: 'Точная фильтрация', desc: 'Многоуровневая фильтрация по активности, подпискам, ключевым словам в профиле и сообщениях. Только целевые лиды.' },
                            { icon: 'bx-time', title: 'Быстрые сроки', desc: 'Базовый мониторинг за 3-5 дней. Полная система лидогенерации за 2-3 недели. Не затягиваю проекты.' },
                            { icon: 'bx-support', title: 'Бесплатная поддержка 30 дней', desc: 'Исправляю баги, обновляю фильтры, консультирую. Без дополнительной оплаты.' },
                            { icon: 'bx-code-block', title: 'Чистый и документированный код', desc: 'Вы получаете полный исходный код с документацией. Сможете поддерживать и развивать самостоятельно.' },
                            { icon: 'bx-link', title: 'Интеграция с CRM', desc: 'Автоматическая выгрузка лидов в Google Sheets, amoCRM, Битрикс24 или любую другую систему.' },
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
                            Ответы на вопросы, которые задают перед заказом лидогенерации
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            { q: 'Как найти клиентов в Telegram автоматически?', a: 'Использую парсинг каналов и групп, мониторинг ключевых слов и автоматическую фильтрацию по критериям.' },
                            { q: 'Сколько стоит лидогенерация в Telegram?', a: 'Мониторинг от 10 000 ₽, полная система от 35 000 ₽. Точная стоимость зависит от объёма и сложности.' },
                            { q: 'Легален ли сбор контактов в Telegram?', a: 'Сбор публичных данных (username, открытые профили) легален. Спам-рассылки нарушают закон — я настраиваю этичные методы контакта.' },
                            { q: 'Сколько лидов можно собрать в день?', a: 'В среднем 15-50 целевых лидов в день в зависимости от ниши и настроек фильтрации.' },
                            { q: 'Как обеспечить качество лидов?', a: 'Использую многоуровневую фильтрацию: по активности, количеству подписок, ключевым словам в профиле и сообщениях.' },
                            { q: 'Можно ли интегрировать с CRM?', a: 'Да, лиды автоматически загружаются в Google Sheets, amoCRM, Битрикс24 или любую другую систему.' },
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
                            Готовы автоматизировать поиск клиентов?
                        </h2>
                        <p className={styles.finalCtaSubtitle}>
                            ✅ Бесплатная консультация<br />
                            ✅ Бесплатная поддержка 30 дней<br />
                            ✅ 15-50 лидов в день
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
                                Разработка Telegram-ботов, лидогенерация, автоматизация бизнеса и веб-приложения.
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
                        <h2 className={styles.seoH2}>Лидогенерация в Telegram — поиск клиентов автоматически</h2>

                        <p>Лидогенерация в Telegram — это процесс автоматического поиска и сбора потенциальных клиентов в мессенджере Telegram. С более чем 800 миллионами активных пользователей Telegram стал одной из крупнейших платформ для B2B и B2C коммуникаций в России и СНГ. Автоматизация поиска клиентов позволяет находить 15-50 целевых лидов ежедневно без ручного труда.</p>

                        <h3 className={styles.seoH3}>Парсер Telegram — автоматический сбор данных</h3>
                        <p>Парсер Telegram — это программное решение, которое автоматически собирает данные участников каналов и групп: username, информацию из профиля, активность. Парсинг участников Telegram позволяет за несколько часов собрать базу из тысяч потенциальных клиентов, которые уже заинтересованы в вашей тематике.</p>

                        <h3 className={styles.seoH3}>Поиск лидов в Telegram через мониторинг ключевых слов</h3>
                        <p>Мониторинг ключевых слов в Telegram — это автоматический поиск сообщений, содержащих определённые слова и фразы. Система сканирует 500+ каналов и групп, находя сообщения, где пользователи ищут товары или услуги. Это позволяет находить «горячих» лидов, которые уже заинтересованы в покупке.</p>

                        <h3 className={styles.seoH3}>Сбор контактов Telegram и база клиентов</h3>
                        <p>Сбор контактов Telegram включает автоматическое извлечение username, ссылок на профили и другой публичной информации. Собранная база клиентов проходит многоуровневую фильтрацию: по активности, количеству подписок, ключевым словам в профиле. Результат — чистая база целевых лидов, готовых к контакту.</p>

                        <h3 className={styles.seoH3}>Массовая рассылка Telegram и лидогенерация бот</h3>
                        <p>Массовая рассылка Telegram позволяет автоматически отправлять персонализированные сообщения по собранной базе. Лидогенерация бот — это комплексное решение, которое совмещает парсинг, фильтрацию и рассылку в единой системе. Бот работает 24/7, находя новых клиентов без вашего участия.</p>

                        {/* Internal links for SEO */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Другие наши услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-botov">Разработка Telegram-ботов</a>
                                <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
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
