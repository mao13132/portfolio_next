import Head from 'next/head';
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosClassic } from '@/app/Components/utils/interceptor';
import { getContact } from '@/app/Components/utils/url.config';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { GuaranteeBlock } from '@/app/Components/GuaranteeBlock/GuaranteeBlock';
import styles from './ai-integracii.module.css';

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
const PAGE_URL = `${SITE_URL}/ai-integracii`;
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
            "name": "AI-интеграции для бизнеса — ChatGPT, нейросети, AI-агенты | DimaRazrab",
            "description": "Внедрение ChatGPT и AI в бизнес-процессы: AI-агенты, автоматизация с нейросетями, интеграция OpenAI API. Увеличение прибыли до 520% ROI.",
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
                { "@type": "ListItem", "position": 2, "name": "AI-интеграции для бизнеса", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "AI-интеграции для бизнеса",
            "description": "Внедрение искусственного интеллекта в бизнес-процессы: интеграция ChatGPT и OpenAI API, создание AI-агентов, автоматизация с нейросетями, разработка AI-ботов. Увеличение эффективности до 520% ROI.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — AI-интеграции",
                "url": SITE_URL,
                "image": OG_IMAGE,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["ChatGPT интеграция", "OpenAI API", "AI-агенты", "нейросети для бизнеса", "автоматизация с ИИ", "LangChain", "CrewAI", "Python", "FastAPI", "GPT-4"]
            },
            "serviceType": "AI-интеграции и автоматизация бизнеса с ИИ",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги AI-интеграций",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Интеграция ChatGPT / OpenAI API",
                            "description": "Подключение ChatGPT, GPT-4, DALL-E к вашим бизнес-процессам. API-интеграция с существующими системами. Срок 5-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI-агенты для продаж и поддержки",
                            "description": "Автономные AI-агенты, которые обрабатывают заявки, консультируют клиентов и закрывают сделки 24/7. Срок 14-21 день."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI-боты для Telegram",
                            "description": "Интеллектуальные Telegram-боты на базе ChatGPT с генерацией контента, аналитикой и автоматизацией. Срок 7-14 дней."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Обработка документов нейросетями",
                            "description": "Автоматическая классификация, извлечение данных и анализ документов с помощью AI. Срок 10-21 день."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Генерация контента с помощью ИИ",
                            "description": "Системы автоматической генерации текстов, изображений и медиаконтента через нейросети. Срок 7-14 дней."
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
                    "name": "Сколько стоит внедрение AI в бизнес?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Стоимость зависит от задачи. Интеграция ChatGPT в существующий бот — от 25 000 ₽. AI-агент для продаж — от 80 000 ₽. Полная автоматизация бизнес-процесса с AI — от 150 000 ₽. Точная оценка бесплатно за 30 минут."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какие задачи решает интеграция ChatGPT в бизнес?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "ChatGPT интеграция позволяет автоматизировать: обработку заявок и консультации клиентов 24/7, генерацию контента (тексты, описания, посты), анализ документов и данных, создание персонализированных рекомендаций, автоматический рерайт и перевод текстов."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Что такое AI-агент и чем он отличается от бота?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AI-агент — это автономная система на базе ИИ, которая самостоятельно принимает решения и выполняет цепочку действий. В отличие от простого бота с готовыми ответами, AI-агент анализирует контекст, запоминает историю взаимодействий и адаптирует поведение. Используется для продаж, поддержки и аналитики."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Какой ROI от внедрения AI в бизнес?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "По моей практике: ИИ-ассистент дизайн-агентства — ROI 520%, AI контент-маркетинг — ROI 400%, крипто-аналитика с ML — ROI 450%. В среднем внедрение AI окупается за 2-4 месяца за счёт экономии времени и увеличения конверсии."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Безопасно ли использовать ChatGPT для обработки данных клиентов?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Да, при правильной настройке. Я использую OpenAI API с опцией отключения обучения на данных (data opt-out), шифрование передачи данных, локальное хранение конфиденциальной информации и фильтрацию персональных данных перед отправкой в API. Все решения соответствуют 152-ФЗ."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Сколько времени занимает внедрение AI?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Простая интеграция ChatGPT в Telegram-бота — 5-7 дней. AI-агент с обучением — 2-3 недели. Полная автоматизация бизнес-процесса с нейросетями — 3-6 недель. Бесплатная поддержка 30 дней после запуска."
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
            hue: Math.random() > 0.5 ? 270 : 180,
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
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 150)})`;
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
                text: `[${source}] ${task || 'Заявка с лендинга "AI-интеграции для бизнеса"'}`,
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
                {loading ? 'Отправка...' : 'Внедрить AI в ваш бизнес'}
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

export default function AiIntegraciiPage() {
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
                <title>AI-интеграции для бизнеса — ChatGPT, нейросети, AI-агенты | DimaRazrab</title>
                <meta
                    name="description"
                    content="Внедрение ChatGPT и AI в бизнес: AI-агенты, автоматизация с нейросетями, интеграция OpenAI API. ROI до 520%. Бесплатная оценка за 30 минут!"
                />
                <meta name="keywords" content="внедрение искусственного интеллекта в бизнес, интеграция chatgpt, управление внедрением искусственного интеллекта в бизнес, разработка ai бота, создание ai помощника, автоматизация бизнеса с ai, разработка ai чат ботов" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="AI-интеграции для бизнеса — ChatGPT, нейросети, AI-агенты | DimaRazrab" />
                <meta property="og:description" content="Внедрение ChatGPT и AI в бизнес: AI-агенты, автоматизация с нейросетями, интеграция OpenAI API. ROI до 520%. Бесплатная оценка!" />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="AI-интеграции для бизнеса — ChatGPT, нейросети, AI-агенты | DimaRazrab" />
                <meta name="twitter:description" content="Внедрение ChatGPT и AI в бизнес: AI-агенты, автоматизация с нейросетями, интеграция OpenAI API. ROI до 520%." />
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
                        <a href="#tech" onClick={() => setMobileMenu(false)}>Технологии</a>
                        <a href="#process" onClick={() => setMobileMenu(false)}>Процесс</a>
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
                    { label: 'AI-интеграции' },
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
                                🤖 ChatGPT • GPT-4 • Нейросети • AI-агенты • Бесплатная консультация
                            </motion.div>

                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <span className={styles.heroHighlight}>AI-интеграции</span> для бизнеса — ChatGPT, нейросети, AI-агенты
                            </motion.h1>

                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Внедряю искусственный интеллект в бизнес-процессы: интеграция ChatGPT, создание AI-агентов, автоматизация с нейросетями.
                                Увеличиваю прибыль до 520% ROI за счёт автоматизации рутинных задач.
                            </motion.p>

                            <motion.div
                                className={styles.heroBullets}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.45 }}
                            >
                                {[
                                    'Интеграция ChatGPT / GPT-4 в ваши системы',
                                    'AI-агенты для продаж и поддержки 24/7',
                                    'Автоматизация контента через нейросети',
                                    'ROI от 400% — окупаемость за 2-3 месяца',
                                    'Бесплатная поддержка 30 дней после запуска',
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
                                    style={{ maxWidth: 340 }}
                                >
                                    Внедрить AI в ваш бизнес
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
                                title="Обсудим AI для вашего бизнеса?"
                                subtitle="Опишите задачу — рассчитаю стоимость и ROI за 30 минут"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className={styles.diagonalDivider} />
            </section>

            {/* ============ УСЛУГИ (H2: Что я предлагаю) ============ */}
            <section className={`${styles.section} ${styles.sectionDark}`} id="offers">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Что я предлагаю</h2>
                        <p className={styles.sectionSubtitle}>
                            Полный спектр AI-интеграций для бизнеса: от ChatGPT до автономных AI-агентов
                        </p>
                    </motion.div>

                    <div className={styles.offersGrid}>
                        {/* Интеграция ChatGPT / OpenAI API */}
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
                                <span className={styles.offerBadge}>ChatGPT</span>
                                <h3 className={styles.offerName}>Интеграция ChatGPT / OpenAI API</h3>
                                <p className={styles.offerFor}>Для автоматизации общения, генерации контента и анализа данных</p>
                            </div>
                            <div className={styles.offerPrice}>от 25 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 5-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Подключение GPT-4, GPT-4o, DALL-E к вашим системам</li>
                                <li><i className='bx bx-check' /> Настройка промптов и системных инструкций под ваш бизнес</li>
                                <li><i className='bx bx-check' /> Интеграция с Telegram, сайтом, CRM</li>
                                <li><i className='bx bx-check' /> Контекстная память и история диалогов</li>
                                <li><i className='bx bx-check' /> Фильтрация и модерация контента</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={`${styles.offerButton} ${styles.offerButtonPrimary}`} onClick={scrollToForm}>
                                    Заказать интеграцию ChatGPT
                                </button>
                                <span className={styles.offerNote}>Бесплатная оценка за 30 минут</span>
                            </div>
                        </motion.div>

                        {/* AI-агенты для продаж и поддержки */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>AI-агенты</span>
                                <h3 className={styles.offerName}>AI-агенты для продаж и поддержки</h3>
                                <p className={styles.offerFor}>Автономные системы, которые работают 24/7 без участия человека</p>
                            </div>
                            <div className={styles.offerPrice}>от 80 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 14-21 день</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Обработка заявок и квалификация лидов</li>
                                <li><i className='bx bx-check' /> Персонализированные ответы на основе данных CRM</li>
                                <li><i className='bx bx-check' /> Многошаговые сценарии продаж</li>
                                <li><i className='bx bx-check' /> Интеграция с amoCRM, Битрикс24</li>
                                <li><i className='bx bx-check' /> Аналитика эффективности и A/B тестирование</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать AI-агента
                                </button>
                            </div>
                        </motion.div>

                        {/* AI-боты для Telegram */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Telegram</span>
                                <h3 className={styles.offerName}>AI-боты для Telegram</h3>
                                <p className={styles.offerFor}>Интеллектуальные боты с ChatGPT для автоматизации и продаж</p>
                            </div>
                            <div className={styles.offerPrice}>от 35 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 7-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> ChatGPT-бот с контекстной памятью</li>
                                <li><i className='bx bx-check' /> Генерация контента и изображений</li>
                                <li><i className='bx bx-check' /> Нейрокомментинг и продвижение</li>
                                <li><i className='bx bx-check' /> Обработка документов и анализ данных</li>
                                <li><i className='bx bx-check' /> Админ-панель и аналитика</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать AI-бота
                                </button>
                            </div>
                        </motion.div>

                        {/* Обработка документов нейросетями */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Документы</span>
                                <h3 className={styles.offerName}>Обработка документов нейросетями</h3>
                                <p className={styles.offerFor}>Автоматический анализ, классификация и извлечение данных</p>
                            </div>
                            <div className={styles.offerPrice}>от 50 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 10-21 день</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Извлечение данных из договоров, счетов, отчётов</li>
                                <li><i className='bx bx-check' /> Автоматическая классификация документов</li>
                                <li><i className='bx bx-check' /> Суммаризация длинных текстов</li>
                                <li><i className='bx bx-check' /> Распознавание и структурирование данных</li>
                                <li><i className='bx bx-check' /> Интеграция с Google Docs, 1С</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать обработку
                                </button>
                            </div>
                        </motion.div>

                        {/* Генерация контента с помощью ИИ */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Контент</span>
                                <h3 className={styles.offerName}>Генерация контента с помощью ИИ</h3>
                                <p className={styles.offerFor}>Автоматическое создание текстов, изображений и медиа</p>
                            </div>
                            <div className={styles.offerPrice}>от 30 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 7-14 дней</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Генерация постов, статей, описаний товаров</li>
                                <li><i className='bx bx-check' /> Создание изображений через DALL-E / Stable Diffusion</li>
                                <li><i className='bx bx-check' /> Рерайт и уникализация контента</li>
                                <li><i className='bx bx-check' /> Автопостинг в социальные сети</li>
                                <li><i className='bx bx-check' /> Персонализация под аудиторию</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Заказать генерацию
                                </button>
                            </div>
                        </motion.div>

                        {/* Автоматизация бизнеса с AI */}
                        <motion.div
                            className={styles.offerCard}
                            variants={scaleIn}
                            custom={5}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.offerHeader}>
                                <span className={styles.offerBadge}>Автоматизация</span>
                                <h3 className={styles.offerName}>Автоматизация бизнеса с AI</h3>
                                <p className={styles.offerFor}>Комплексное внедрение ИИ во все бизнес-процессы</p>
                            </div>
                            <div className={styles.offerPrice}>от 150 000 ₽</div>
                            <span className={styles.offerTime}>Срок: 3-6 недель</span>
                            <ul className={styles.offerFeatures}>
                                <li><i className='bx bx-check' /> Аудит бизнес-процессов и выявление точек применения AI</li>
                                <li><i className='bx bx-check' /> Интеграция нескольких AI-моделей в единую систему</li>
                                <li><i className='bx bx-check' /> LangChain, CrewAI для сложных цепочек</li>
                                <li><i className='bx bx-check' /> Мониторинг, логирование, аналитика</li>
                                <li><i className='bx bx-check' /> Обучение команды и документация</li>
                            </ul>
                            <div className={styles.offerAction}>
                                <button className={styles.offerButton} onClick={scrollToForm}>
                                    Обсудить автоматизацию
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ КЕЙСЫ (H2: Кейсы из портфолио) ============ */}
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
                            Реальные проекты внедрения AI с измеримыми бизнес-результатами
                        </p>
                    </motion.div>

                    <div className={styles.portfolioGrid}>
                        {/* chat_gpt_tg — ИИ-ассистент дизайн-агентства */}
                        <motion.a
                            href="/work/chat_gpt_tg"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>ChatGPT + DALL-E</span>
                            <h3>ИИ-ассистент дизайн-агентства</h3>
                            <p>Интеллектуальный ассистент на базе ChatGPT и DALL-E для генерации концептов, текстов и презентаций. Рост производительности на 280%, снижение себестоимости на 60%, ROI 520%.</p>
                            <span className={styles.portfolioTech}>Python • OpenAI GPT API • DALL-E API • Telegram Bot API • PostgreSQL</span>
                        </motion.a>

                        {/* chatgpt_goroskop — AI контент-маркетинг астролога */}
                        <motion.a
                            href="/work/chatgpt_goroskop"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>AI контент</span>
                            <h3>AI контент-маркетинг астролога</h3>
                            <p>Система автоматической генерации персонализированного контента через ChatGPT API. Доход вырос на 250%, рост аудитории на 180%, ROI 400% за 3 месяца.</p>
                            <span className={styles.portfolioTech}>Python • OpenAI GPT API • Telegram Bot API • Instagram API • Celery</span>
                        </motion.a>

                        {/* neiro_hair — Изменение прически через ИИ */}
                        <motion.a
                            href="/work/neiro_hair"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>Нейросети</span>
                            <h3>Изменение прически через ИИ</h3>
                            <p>Telegram-бот с нейросетью для изменения причёсок, цвета волос и стиля на фотографиях. Модуль оплаты, личный кабинет, админ-панель.</p>
                            <span className={styles.portfolioTech}>Python • Нейросети обработки изображений • Telegram Bot API • Платёжные системы</span>
                        </motion.a>

                        {/* oxprotocol — Крипто-аналитика с ML */}
                        <motion.a
                            href="/work/oxprotocol"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>ML + AI</span>
                            <h3>Крипто-аналитика с машинным обучением</h3>
                            <p>Парсинг 15+ крипто-платформ через API, сбор 5000+ комментариев/день, анализ настроений с BERT. Точность прогнозов 80%, ROI 450%.</p>
                            <span className={styles.portfolioTech}>Python • Selenium • BERT • Telegram API • PostgreSQL • Redis</span>
                        </motion.a>

                        {/* bankless — Криптоаналитика с ML */}
                        <motion.a
                            href="/work/bankless"
                            className={styles.portfolioCard}
                            variants={fadeUp}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.portfolioCategory}>ML + Парсинг</span>
                            <h3>Аналитика крипторынка с ML</h3>
                            <p>Обработка 15 000+ постов/день с ML-анализом настроений. Точность прогнозов 87%, ROI 420% за 6 месяцев. Увеличение прибыльности на 280%.</p>
                            <span className={styles.portfolioTech}>Python • Selenium • TensorFlow • scikit-learn • Telegram Bot API • PostgreSQL</span>
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
            <section className={`${styles.section} ${styles.sectionDark}`} id="tech">
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionTitle}>Технологии</h2>
                        <p className={styles.sectionSubtitle}>
                            Современные инструменты для внедрения AI в бизнес
                        </p>
                    </motion.div>

                    <div className={styles.techGrid}>
                        {[
                            { icon: 'bx bx-brain', title: 'OpenAI API, GPT-4', desc: 'Языковые модели для генерации текста и анализа' },
                            { icon: 'bx bxl-openai', title: 'DALL-E 3', desc: 'Генерация изображений нейросетью' },
                            { icon: 'bx bx-link-alt', title: 'LangChain', desc: 'Фреймворк для AI-цепочек и агентов' },
                            { icon: 'bx bx-group', title: 'CrewAI', desc: 'Мультиагентные системы' },
                            { icon: 'bx bxl-python', title: 'Python', desc: 'Основной язык AI-разработки' },
                            { icon: 'bx bx-zap', title: 'FastAPI', desc: 'Высокопроизводительный API-сервер' },
                            { icon: 'bx bx-data', title: 'PostgreSQL', desc: 'Хранение данных и векторных эмбеддингов' },
                            { icon: 'bx bx-bot', title: 'Telegram Bot API', desc: 'Интеграция AI в Telegram' },
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
                        <h2 className={styles.sectionTitle}>Процесс внедрения AI</h2>
                        <p className={styles.sectionSubtitle}>
                            Пошаговый подход от анализа задачи до запуска в production
                        </p>
                    </motion.div>

                    <div className={styles.processGrid}>
                        {[
                            { num: '01', icon: 'bx bx-search-alt', title: 'Аудит', desc: 'Анализирую ваши бизнес-процессы, нахожу точки применения AI с максимальным ROI' },
                            { num: '02', icon: 'bx bx-test-tube', title: 'Пилот', desc: 'Запускаю MVP на одном процессе, замеряю реальные метрики и экономию' },
                            { num: '03', icon: 'bx bx-code-alt', title: 'Разработка', desc: 'Полноценная интеграция: API, промпты, логика, тесты, документация' },
                            { num: '04', icon: 'bx bx-rocket', title: 'Запуск', desc: 'Docker, мониторинг, обучение команды, бесплатная поддержка 30 дней' },
                            { num: '05', icon: 'bx bx-line-chart', title: 'Масштабирование', desc: 'Расширение AI на новые процессы на основе данных пилота' },
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
                        <h2 className={styles.sectionTitle}>Стоимость</h2>
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
                                    <td>Интеграция ChatGPT в Telegram-бота</td>
                                    <td className={styles.pricingPrice}>от 25 000 ₽</td>
                                    <td className={styles.pricingTime}>5-7 дней</td>
                                </tr>
                                <tr>
                                    <td>AI-бот с контекстной памятью и аналитикой</td>
                                    <td className={styles.pricingPrice}>от 45 000 ₽</td>
                                    <td className={styles.pricingTime}>10-14 дней</td>
                                </tr>
                                <tr>
                                    <td>AI-агент для продаж / поддержки</td>
                                    <td className={styles.pricingPrice}>от 80 000 ₽</td>
                                    <td className={styles.pricingTime}>14-21 день</td>
                                </tr>
                                <tr>
                                    <td>Генерация контента через нейросети</td>
                                    <td className={styles.pricingPrice}>от 30 000 ₽</td>
                                    <td className={styles.pricingTime}>7-14 дней</td>
                                </tr>
                                <tr>
                                    <td>Обработка документов с AI</td>
                                    <td className={styles.pricingPrice}>от 50 000 ₽</td>
                                    <td className={styles.pricingTime}>10-21 день</td>
                                </tr>
                                <tr>
                                    <td>Нейрокомментинг / AI-продвижение</td>
                                    <td className={styles.pricingPrice}>от 35 000 ₽</td>
                                    <td className={styles.pricingTime}>7-10 дней</td>
                                </tr>
                                <tr>
                                    <td>ML-модель (анализ настроений, классификация)</td>
                                    <td className={styles.pricingPrice}>от 100 000 ₽</td>
                                    <td className={styles.pricingTime}>3-4 недели</td>
                                </tr>
                                <tr>
                                    <td>Полная автоматизация бизнеса с AI</td>
                                    <td className={styles.pricingPrice}>от 150 000 ₽</td>
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
                            <h2>Готовы внедрить AI в ваш бизнес?</h2>
                            <p>
                                Расскажите о задаче — подготовлю техническое решение и точную оценку ROI за 30 минут.
                                Без обязательств. Бесплатно.
                            </p>
                        </div>
                        <LeadForm
                            source="mid-form"
                            title="Внедрить AI в ваш бизнес"
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
                            Ответы на популярные вопросы о внедрении AI в бизнес
                        </p>
                    </motion.div>

                    <div className={styles.faqList}>
                        {[
                            {
                                q: 'Сколько стоит внедрение AI в бизнес?',
                                a: 'Стоимость зависит от задачи. Интеграция ChatGPT в существующий бот — от 25 000 ₽. AI-агент для продаж — от 80 000 ₽. Полная автоматизация бизнес-процесса с AI — от 150 000 ₽. Точная оценка бесплатно за 30 минут.'
                            },
                            {
                                q: 'Какие задачи решает интеграция ChatGPT в бизнес?',
                                a: 'ChatGPT интеграция позволяет автоматизировать: обработку заявок и консультации клиентов 24/7, генерацию контента (тексты, описания, посты), анализ документов и данных, создание персонализированных рекомендаций, автоматический рерайт и перевод текстов.'
                            },
                            {
                                q: 'Что такое AI-агент и чем он отличается от бота?',
                                a: 'AI-агент — это автономная система на базе ИИ, которая самостоятельно принимает решения и выполняет цепочку действий. В отличие от простого бота с готовыми ответами, AI-агент анализирует контекст, запоминает историю взаимодействий и адаптирует поведение. Используется для продаж, поддержки и аналитики.'
                            },
                            {
                                q: 'Какой ROI от внедрения AI в бизнес?',
                                a: 'По моей практике: ИИ-ассистент дизайн-агентства — ROI 520%, AI контент-маркетинг — ROI 400%, крипто-аналитика с ML — ROI 450%. В среднем внедрение AI окупается за 2-4 месяца за счёт экономии времени и увеличения конверсии.'
                            },
                            {
                                q: 'Безопасно ли использовать ChatGPT для обработки данных клиентов?',
                                a: 'Да, при правильной настройке. Я использую OpenAI API с опцией отключения обучения на данных (data opt-out), шифрование передачи данных, локальное хранение конфиденциальной информации и фильтрацию персональных данных перед отправкой в API. Все решения соответствуют 152-ФЗ.'
                            },
                            {
                                q: 'Сколько времени занимает внедрение AI?',
                                a: 'Простая интеграция ChatGPT в Telegram-бота — 5-7 дней. AI-агент с обучением — 2-3 недели. Полная автоматизация бизнес-процесса с нейросетями — 3-6 недель. Бесплатная поддержка 30 дней после запуска.'
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
                        <h2 className={styles.seoH2}>AI-интеграции для бизнеса: полное руководство по внедрению искусственного интеллекта</h2>

                        <p>
                            <strong>Внедрение искусственного интеллекта в бизнес</strong> — это не тренд будущего, а реальность сегодня.
                            По данным McKinsey, компании, внедрившие AI, увеличивают прибыль на 20-30% в первый год.
                            Однако 70% проектов по AI-трансформации терпят неудачу из-за неправильного подхода:
                            пытаются применить AI ко всему сразу вместо точечного внедрения в процессы с максимальным ROI.
                        </p>
                        <p>
                            Я занимаюсь <strong>управлением внедрением искусственного интеллекта в бизнес</strong> с 2022 года.
                            За это время реализовал более 15 проектов с ROI от 300% до 520%. Мой подход — начинать с пилота
                            на одном процессе, замерять реальные метрики и только потом масштабировать. Это снижает риски
                            и даёт быстрый результат.
                        </p>

                        <h3 className={styles.seoH3}>Интеграция ChatGPT в бизнес: что можно автоматизировать</h3>
                        <p>
                            <strong>Интеграция ChatGPT</strong> — самый быстрый способ начать использовать AI в бизнесе.
                            Языковая модель GPT-4 способна обрабатывать естественный язык на уровне эксперта,
                            что открывает возможности для автоматизации десятков процессов:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Обработка заявок и консультации клиентов 24/7</strong> — AI-агент отвечает на вопросы клиентов,
                            квалифицирует лиды и передаёт горячие заявки менеджерам. В моём кейсе дизайн-агентства это увеличило
                            конверсию на 45% и сэкономило 35 часов в неделю</li>
                            <li><strong>Генерация контента</strong> — автоматическое создание текстов для блогов, соцсетей, рассылок.
                            В кейсе астролога ChatGPT API генерирует персонализированные гороскопы, увеличив аудиторию на 180%</li>
                            <li><strong>Анализ документов и данных</strong> — извлечение ключевой информации из договоров, отчётов,
                            писем. Суммаризация длинных документов в краткие выводы</li>
                            <li><strong>Рерайт и уникализация контента</strong> — автоматическая переработка текстов для уникальности
                            с сохранением смысла. В кейсе с рерайтером контента это увеличило охват канала в 3 раза</li>
                            <li><strong>Нейрокомментинг</strong> — AI анализирует посты и пишет осмысленные комментарии для
                            привлечения аудитории. Работает 24/7 без участия человека</li>
                        </ul>

                        <h3 className={styles.seoH3}>Разработка AI-бота: от идеи до запуска</h3>
                        <p>
                            <strong>Разработка AI бота</strong> — это не просто подключение ChatGPT к Telegram.
                            Это проектирование системы, которая понимает контекст, помнит историю диалогов,
                            интегрируется с вашими базами данных и CRM. Вот что входит в разработку:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Проектирование диалоговых сценариев</strong> — определение целей бота, типичных вопросов,
                            ответов и маршрутов диалога. Системные промпты настраиваются под специфику вашего бизнеса</li>
                            <li><strong>Контекстная память</strong> — бот помнит историю взаимодействий с каждым пользователем,
                            что позволяет давать персонализированные ответы и не повторять вопросы</li>
                            <li><strong>Интеграция с внешними системами</strong> — подключение к CRM (amoCRM, Битрикс24),
                            базам знаний, платежным системам, Google Sheets</li>
                            <li><strong>Модерация и фильтрация</strong> — система предотвращает генерацию нежелательного контента,
                            фильтрует персональные данные перед отправкой в API</li>
                            <li><strong>Аналитика и мониторинг</strong> — отслеживание метрик: количество диалогов, конверсия,
                            средний рейтинг удовлетворённости, популярные вопросы</li>
                        </ul>
                        <p>
                            В кейсе <strong>ChatGPT-психолога</strong> (проект psyho_tg) бот работает с убеждениями клиентов:
                            идентифицирует негативные установки через ChatGPT и генерирует позитивные замены.
                            Бот отправляет персонализированные утверждения по расписанию, поддерживая эффект
                            от работы с психологом между сеансами.
                        </p>

                        <h3 className={styles.seoH3}>Создание AI помощника для бизнеса: кейсы</h3>
                        <p>
                            <strong>Создание AI помощника</strong> — это комплексная задача, которая включает выбор модели,
                            настройку промптов, интеграцию с бизнес-системами и тестирование. Вот реальные примеры
                            из моего портфолио:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>ИИ-ассистент дизайн-агентства</strong> (chat_gpt_tg) — система на базе ChatGPT и DALL-E
                            для генерации концептов, текстов и презентаций. Экономия 35 часов/неделю, рост производительности
                            на 280%, ROI 520%. Стоимость проекта окупилась за 3 месяца</li>
                            <li><strong>AI контент-маркетинг астролога</strong> (chatgpt_goroskop) — автоматическая генерация
                            персонализированных гороскопов через ChatGPT API с автопостингом. Доход вырос на 250%,
                            аудитория на 180%, ROI 400%</li>
                            <li><strong>Крипто-аналитика с ML</strong> (oxprotocol) — система парсинга 15+ платформ с анализом
                            настроений через BERT. 5000+ комментариев/день, точность прогнозов 80%, ROI 450%</li>
                            <li><strong>Изменение прически через ИИ</strong> (neiro_hair) — Telegram-бот с нейросетью для обработки
                            фотографий: смена причёски, цвета волос, улучшение кожи. Модуль оплаты, личный кабинет</li>
                        </ul>

                        <h3 className={styles.seoH3}>Автоматизация бизнеса с AI: управление внедрением</h3>
                        <p>
                            <strong>Автоматизация бизнеса с AI</strong> требует системного подхода. Нельзя просто подключить ChatGPT
                            к первому попавшемуся процессу и ожидать результата. Управление внедрением включает:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Аудит бизнес-процессов</strong> — выявление процессов, где AI даст максимальный эффект.
                            Это не всегда очевидно: иногда автоматизация второстепенного процесса даёт больший ROI,
                            чем попытка автоматизировать основной</li>
                            <li><strong>Пилотный проект</strong> — запуск MVP на одном процессе с чёткими метриками.
                            Это позволяет замерить реальный ROI до масштабных инвестиций</li>
                            <li><strong>Выбор технологий</strong> — GPT-4 для сложных задач, GPT-3.5-turbo для массовых
                            (в 10 раз дешевле). LangChain для цепочек агентов. CrewAI для мультиагентных систем.
                            FastAPI для высокопроизводительных API</li>
                            <li><strong>Обучение и поддержка</strong> — подготовка команды к работе с AI-системами,
                            документация, бесплатная поддержка 30 дней после запуска</li>
                        </ul>
                        <p>
                            В кейсе <strong>криптоаналитики с Bankless</strong> (bankless) система обрабатывает 15 000+ постов
                            ежедневно с ML-анализом настроений (TensorFlow + scikit-learn). Точность прогнозов 87%,
                            ROI 420% за 6 месяцев. Фонд увеличил управляемые активы до 125 млн ₽, сократив команду
                            аналитиков с 4 до 1 человека.
                        </p>

                        <h3 className={styles.seoH3}>Разработка AI чат-ботов: технологический стек</h3>
                        <p>
                            Для <strong>разработки AI чат-ботов</strong> я использую проверенный стек технологий:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>OpenAI API (GPT-4, GPT-4o)</strong> — основные языковые модели для генерации текста,
                            анализа данных и диалогового взаимодействия. GPT-4o — самая быстрая и качественная модель</li>
                            <li><strong>LangChain</strong> — фреймворк для построения сложных AI-цепочек: RAG (поиск по базе знаний),
                            агенты с инструментами, цепочки рассуждений</li>
                            <li><strong>CrewAI</strong> — фреймворк для создания мультиагентных систем, где несколько AI-агентов
                            сотрудничают для решения сложных задач</li>
                            <li><strong>Python + FastAPI</strong> — высокопроизводительный бэкенд для AI-сервисов.
                            Асинхронная обработка, автоматическая документация Swagger</li>
                            <li><strong>PostgreSQL + pgvector</strong> — хранение данных и векторных эмбеддингов для
                            семантического поиска по базе знаний</li>
                            <li><strong>Redis</strong> — кэширование ответов AI для снижения стоимости и ускорения откликов</li>
                            <li><strong>Docker</strong> — контейнеризация для воспроизводимого развёртывания на любом сервере</li>
                        </ul>

                        <h3 className={styles.seoH3}>Нейросети для бизнеса: практическое применение</h3>
                        <p>
                            <strong>Нейросети для бизнеса</strong> — это не только ChatGPT. В зависимости от задачи
                            используются разные типы моделей:
                        </p>
                        <ul className={styles.seoList}>
                            <li><strong>Языковые модели (LLM)</strong> — GPT-4, Claude, Llama для текстов, диалогов,
                            анализа данных, генерации кода</li>
                            <li><strong>Генеративные модели изображений</strong> — DALL-E 3, Stable Diffusion, Midjourney API
                            для создания визуального контента, дизайна, рекламных материалов</li>
                            <li><strong>Модели анализа настроений</strong> — BERT, RoBERTa для классификации тональности
                            текстов, мониторинга репутации, анализа отзывов</li>
                            <li><strong>Модели обработки изображений</strong> — для распознавания объектов, изменения стиля,
                            улучшения качества фотографий (как в кейсе neiro_hair)</li>
                            <li><strong>Рекомендательные системы</strong> — персонализация контента, товаров, услуг
                            на основе поведения пользователя</li>
                        </ul>

                        {/* Внутренние ссылки */}
                        <div className={styles.seoInternalLinks}>
                            <h3>Связанные услуги</h3>
                            <div className={styles.seoLinksGrid}>
                                <a href="/razrabotka-botov">Разработка Telegram-ботов</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                                <a href="/razrabotka-api">Разработка API</a>
                                <a href="/razrabotka-servisov">Веб-сервисы</a>
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
                            Готовы <span className={styles.textAccent}>внедрить AI</span> в ваш бизнес?
                        </h2>
                        <p className={styles.finalCtaSubtitle}>
                            Расскажите о задаче — подготовлю техническое решение и точную оценку ROI за 30 минут. Без обязательств.
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
                            title="Внедрить AI в ваш бизнес"
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
                                AI-интеграции, разработка Telegram-ботов, автоматизация бизнеса и веб-сервисы на Python.
                            </p>
                        </div>
                        <div>
                            <h4>Услуги</h4>
                            <a href="/ai-integracii">AI-интеграции</a>
                            <a href="/razrabotka-botov">Telegram-боты</a>
                            <a href="/razrabotka-api">Разработка API</a>
                            <a href="/razrabotka-crm">CRM системы</a>
                        </div>
                        <div>
                            <h4>Направления</h4>
                            <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            <a href="/parsery-marketplejsov">Парсеры маркетплейсов</a>
                            <a href="/lidogeneraciya-telegram">Лидогенерация</a>
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
                        <p>AI-интеграции для бизнеса на заказ</p>
                    </div>
                </div>
            </footer>

            {/* ============ STICKY CTA (MOBILE) ============ */}
            <div className={styles.stickyCta}>
                <button className={styles.stickyCtaButton} onClick={scrollToForm}>
                    <i className='bx bx-bot' />
                    Внедрить AI в бизнес
                </button>
            </div>

            <TelegramFloat />
        </>
    );
}
