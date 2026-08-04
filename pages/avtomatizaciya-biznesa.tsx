import Head from 'next/head';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import { ParticlesBg } from '@/app/Components/Landing/ParticlesBg';
import { LeadForm } from '@/app/Components/Landing/LeadForm';
import { FaqItem } from '@/app/Components/Landing/FaqItem';
import { LandingHeader } from '@/app/Components/Landing/LandingHeader';
import { LandingFooter } from '@/app/Components/Landing/LandingFooter';
import { LandingStickyCta } from '@/app/Components/Landing/LandingStickyCta';
import { PortfolioPopup } from '@/app/Components/Landing/PortfolioPopup';
import { TelegramFloat } from '@/app/Components/Landing/TelegramFloat';
import { ScrollProgressBar } from '@/app/Components/Landing/ScrollProgressBar';
import { ClickComponent } from '@/app/Components/ClickComponent/ClickComponent';
import { AnimatedCounter } from '@/app/Components/Landing/AnimatedCounter';
import { ExitIntentPopup } from '@/app/Components/Landing/ExitIntentPopup';
import { GrandSlamOffer } from '@/app/Components/Landing/GrandSlamOffer';
import { LandingQuiz } from '@/app/Components/Landing/LandingQuiz';
import { fadeUp, scaleIn } from '@/app/Components/Landing/animations';
import { Breadcrumbs } from '@/app/Components/Landing/Breadcrumbs/Breadcrumbs';

import s from './avtomatizaciya-biznesa.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/avtomatizaciya-biznesa`;
const OG_IMAGE = `${SITE_URL}/media/og_desc.jpg`;

const NAV_LINKS = [
    { href: '#solutions', label: 'Решения' },
    { href: '#industries', label: 'Отрасли' },
    { href: '#offers', label: 'Пакеты' },
    { href: '#process', label: 'Как работаем' },
    { href: '#faq', label: 'FAQ' },
];

const ARTICLES = [
    { href: '/blog/avtomatizaciya-zayavok', icon: 'bx-file', title: 'Автоматизация заявок', desc: 'Как автоматизировать обработку заявок и увеличить конверсию' },
    { href: '/blog/avtomatizaciya-klientov', icon: 'bx-user-check', title: 'Автоматизация клиентов', desc: 'Управление клиентской базой и автоматическая сегментация' },
    { href: '/blog/sistema-avtomatizacii-biznes-processov', icon: 'bx-cog', title: 'Системы автоматизации БП', desc: 'Обзор систем автоматизации бизнес-процессов' },
    { href: '/blog/avtomatizaciya-voronki-prodazh', icon: 'bx-line-chart', title: 'Автоматизация воронки продаж', desc: 'Настройка автоматической воронки от лида до сделки' },
    { href: '/blog/cifrovizaciya-malogo-biznesa', icon: 'bx-rocket', title: 'Цифровизация малого бизнеса', desc: 'Пошаговое руководство по цифровой трансформации' },
    { href: '/blog/avtomatizaciya-malogo-biznesa', icon: 'bx-store', title: 'Автоматизация малого бизнеса', desc: 'Практические решения для малого бизнеса' },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Автоматизация бизнеса на заказ — CRM, склад, финансы, маркетинг | Дмитрий Малышев",
            "description": "Комплексная автоматизация бизнеса на заказ: CRM, склад, финансы, маркетинг, HR, производство. Внедрение под ключ с гарантией. Для малого, среднего и крупного бизнеса.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "relatedLink": ARTICLES.map(a => `${SITE_URL}${a.href}`),
            "hasPart": ARTICLES.map(a => `${SITE_URL}${a.href}`),
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
                { "@type": "ListItem", "position": 2, "name": "Автоматизация бизнеса", "item": PAGE_URL }
            ]
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Автоматизация бизнеса на заказ",
            "description": "Комплексная автоматизация бизнес-процессов: CRM, складской учёт, финансы, маркетинг, HR, производство. Внедрение под ключ для малого, среднего и крупного бизнеса.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Автоматизация бизнеса",
                "url": SITE_URL,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": [
                    "Автоматизация бизнеса", "CRM системы", "ERP системы",
                    "Автоматизация склада", "Автоматизация маркетинга",
                    "Бизнес-аналитика", "Интеграция систем", "ИИ для бизнеса"
                ]
            },
            "serviceType": "Автоматизация бизнес-процессов",
            "areaServed": { "@type": "Country", "name": "Россия" },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги автоматизации",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизация CRM и продаж" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизация склада и логистики" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизация финансов и бухгалтерии" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизация маркетинга" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизация HR и найма" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизация производства" } },
                ]
            }
        },
        {
            "@type": "FAQPage",
            "@id": `${PAGE_URL}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "Сколько стоит автоматизация бизнеса?", "acceptedAnswer": { "@type": "Answer", "text": "Стоимость зависит от объёма. Автоматизация одного процесса — от 2 недель. Комплексная автоматизация — от 1-3 месяцев. После бесплатного аудита получите точную смету." } },
                { "@type": "Question", "name": "С чего начать автоматизацию бизнеса?", "acceptedAnswer": { "@type": "Answer", "text": "Начните с бесплатной консультации. Я проанализирую ваши бизнес-процессы, выявлю узкие места и предложу план автоматизации с приоритетами." } },
                { "@type": "Question", "name": "Какие процессы выгоднее всего автоматизировать?", "acceptedAnswer": { "@type": "Answer", "text": "Первыми автоматизируют: обработку заявок, воронку продаж, складской учёт, отчётность и рассылки. Эти процессы дают самый быстрый ROI — окупаемость за 1-3 месяца." } },
                { "@type": "Question", "name": "Нужно ли мне разбираться в IT для автоматизации?", "acceptedAnswer": { "@type": "Answer", "text": "Нет. Вам нужно только описать бизнес-процессы словами. Всё техническое — на мне. После внедрения обучаю вашу команду." } },
                { "@type": "Question", "name": "Вы работаете с малым бизнесом?", "acceptedAnswer": { "@type": "Answer", "text": "Да! Автоматизация малого бизнеса — мой основной фокус. Даже 1-2 автоматизированных процесса могут увеличить прибыль на 30-50%." } },
                { "@type": "Question", "name": "Какие гарантии вы даёте?", "acceptedAnswer": { "@type": "Answer", "text": "Гарантия на код 6 месяцев. Бесплатная поддержка 30-90 дней. Фиксированные сроки в договоре. Полный исходный код — ваши права." } },
            ]
        }
    ]
};

export default function AvtomatizaciyaBiznesaPage() {
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const scrollToForm = useCallback(() => {
        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    return (
        <>
            <Head>
                <title>Автоматизация бизнеса на заказ — боты, CRM, процессы | DimaRazrab</title>
                <meta name="description" content="Автоматизация бизнес-процессов с помощью ботов и скриптов. Экономия времени и денег. Обсудите задачу!" />
                <meta name="keywords" content="автоматизация бизнеса, автоматизация бизнес процессов, автоматизация бизнеса под ключ, система автоматизации бизнеса, автоматизация малого бизнеса, автоматизация управления бизнесом, комплексная автоматизация бизнеса, услуги автоматизации бизнеса, агентство автоматизации бизнеса, разработка автоматизации бизнес процессов, внедрение автоматизации бизнес процессов, автоматизация внутренних бизнес процессов, автоматизация корпоративных бизнес процессов, системы автоматизации бизнеса, компания по автоматизации бизнеса, автоматизация малого и среднего бизнеса, автоматизация бизнеса разработка" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Автоматизация бизнеса на заказ — боты, CRM, процессы | DimaRazrab" />
                <meta property="og:description" content="Автоматизация бизнес-процессов с помощью ботов и скриптов. Экономия времени и денег. Обсудите задачу!" />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Автоматизация бизнеса на заказ — боты, CRM, процессы | DimaRazrab" />
                <meta name="twitter:description" content="Автоматизация бизнес-процессов с помощью ботов и скриптов. Экономия времени и денег." />
                <meta name="twitter:image" content={OG_IMAGE} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            </Head>

            <ClickComponent />
            <LandingHeader navLinks={NAV_LINKS} />
            <ScrollProgressBar />

            <div className={ls.container} style={{ paddingTop: 16 }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Автоматизация бизнеса' },
                ]} />
            </div>

            {/* ═══════ HERO ═══════ */}
            <section className={ls.hero}>
                <ParticlesBg />
                <div className={ls.heroGlow1} />
                <div className={ls.heroGlow2} />

                <div className={ls.container}>
                    <div className={ls.heroGrid}>
                        <div className={ls.heroContent}>
                            <motion.div className={ls.heroBadge} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                ⚡ Бесплатный аудит бизнес-процессов • Ответ за 30 минут
                            </motion.div>

                            <motion.h1 className={ls.heroTitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
                                Комплексная автоматизация бизнеса{' '}
                                <span className={ls.heroHighlight}>под ключ</span>
                            </motion.h1>

                            <motion.p className={ls.heroSubtitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                                Автоматизирую бизнес-процессы: от CRM и продаж до склада, финансов и маркетинга.
                                Помогаю понять, что именно нужно вашему бизнесу — и внедряю решение, которое окупается за 1-3 месяца.
                            </motion.p>

                            <motion.div className={ls.heroBullets} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>
                                {['Бесплатный аудит бизнес-процессов', 'Внедрение под ключ с обучением команды', 'Окупаемость за 1-3 месяца'].map((b, i) => (
                                    <div key={i} className={ls.heroBullet}>
                                        <span className={ls.heroBulletIcon}>✓</span>
                                        {b}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div className={ls.heroFormWrapper} id="hero-form" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                            <LeadForm source="hero" pageUrl={PAGE_URL} title="Получить бесплатный аудит" subtitle="Расскажите о бизнесе — покажу, что можно автоматизировать" />
                        </motion.div>
                    </div>
                </div>

                <div className={`${ls.heroDiagonalRibbon} ${ls.ribbonGreenCyan}`}><span>AI • CRM • ERP</span></div>
                <div className={ls.diagonalDivider} />
            </section>

            {/* ═══════ PAIN POINTS ═══════ */}
            <section className={ls.section} id="pain">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Признаки того, что бизнесу <span className={ls.textAccent}>нужна автоматизация</span></h2>
                        <p className={ls.sectionSubtitle}>Если узнаёте хотя бы 3 пункта — вы теряете деньги каждый день</p>
                    </motion.div>

                    <div className={ls.painGrid}>
                        {[
                            { icon: 'bx-spreadsheet', text: 'Данные в Excel, тетрадках и головах сотрудников. Увольнение = потеря клиентской базы' },
                            { icon: 'bx-time-five', text: 'Сотрудники тратят 60-80% времени на рутину: копирование данных, отчёты, переписка' },
                            { icon: 'bx-error-circle', text: 'Ошибки при ручном вводе: неправильные заказы, потери заявок, пересортица на складе' },
                            { icon: 'bx-money-withdraw', text: 'Платите за 5-10 разных сервисов: CRM, склад, рассылки, аналитика — и всё не связано' },
                            { icon: 'bx-bar-chart-alt-2', text: 'Нет единой картины: не знаете реальную маржинальность, ROI рекламы, загрузку сотрудников' },
                            { icon: 'bx-trending-down', text: 'Конкуренты автоматизировались и работают быстрее, дешевле, с лучшим сервисом' },
                        ].map((p, i) => (
                            <motion.div key={i} className={ls.painCard} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <i className={`bx ${p.icon}`} /><p>{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SOLUTIONS BY TYPE ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`} id="solutions">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Что мы <span className={ls.textAccent}>автоматизируем</span></h2>
                        <p className={ls.sectionSubtitle}>Комплексная автоматизация бизнес-процессов под ключ</p>
                    </motion.div>

                    <div className={ls.benefitsGrid}>
                        {[
                            { icon: 'bx-user-pin', title: 'CRM и продажи', desc: 'Воронки, лиды, сделки, автоматические напоминания, скоринг. Ни один клиент не теряется. Рост конверсии на 40-200%.' },
                            { icon: 'bx-package', title: 'Склад и логистика', desc: 'Учёт товаров, автоматические заказы поставщикам, инвентаризация, трекинг доставки. Минус пересортица и простои.' },
                            { icon: 'bx-dollar', title: 'Финансы и бухгалтерия', desc: 'Автоматические расчёты, счета, акты, отчёты. Интеграция с 1С и банками. Экономия 20-40 часов в месяц.' },
                            { icon: 'bx-megaphone', title: 'Маркетинг и рассылки', desc: 'Email, SMS, Telegram, WhatsApp — автоматические цепочки, сегментация, A/B тесты. Рост повторных продаж на 30%.' },
                            { icon: 'bx-group', title: 'HR и найм', desc: 'Воронка кандидатов, автоматический скрининг, расписание, табель, расчёт зарплаты. Экономия HR-менеджера.' },
                            { icon: 'bx-cog', title: 'Производство', desc: 'Планирование, контроль качества, учёт материалов, себестоимость. Прозрачность всего цикла производства.' },
                        ].map((b, i) => (
                            <motion.div key={i} className={ls.benefitCard} variants={scaleIn} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.benefitIcon}><i className={`bx ${b.icon}`} /></div>
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ INDUSTRIES ═══════ */}
            <section className={ls.section} id="industries">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Автоматизация <span className={ls.textAccent}>по отраслям</span></h2>
                        <p className={ls.sectionSubtitle}>Опыт в десятках отраслей — знаю специфику вашего бизнеса</p>
                    </motion.div>

                    <div className={s.industriesGrid}>
                        {[
                            { icon: 'bx-store', name: 'E-commerce и маркетплейсы', desc: 'Автоматизация заказов, склада, выгрузки на WB/OZON, аналитика продаж' },
                            { icon: 'bx-restaurant', name: 'HoReCa и доставка', desc: 'Приём заказов, бронирование, кухня, доставка, лояльность' },
                            { icon: 'bx-building', name: 'Недвижимость', desc: 'CRM, показы, воронка, интеграция с порталами, документооборот' },
                            { icon: 'bx-car', name: 'Автобизнес', desc: 'Автосервис, автосалон: записи, запчасти, история ремонтов' },
                            { icon: 'bx-clinic', name: 'Медицина и клиники', desc: 'Запись пациентов, история болезней, расписание врачей, финансы' },
                            { icon: 'bx-dumbbell', name: 'Фитнес и спорт', desc: 'Абонементы, расписание, тренеры, удержание клиентов' },
                            { icon: 'bx-home', name: 'Производство', desc: 'Планирование, контроль, склад материалов, себестоимость' },
                            { icon: 'bx-truck', name: 'Логистика и транспорт', desc: 'Маршрутизация, трекинг, документооборот, расчёт стоимости' },
                            { icon: 'bx-graduation', name: 'Образование', desc: 'Запись на курсы, расписание, прогресс учеников, финансы' },
                        ].map((ind, i) => (
                            <motion.div key={i} className={s.industryCard} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <i className={`bx ${ind.icon}`} />
                                <h3>{ind.name}</h3>
                                <p>{ind.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ MID FORM ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`}>
                <div className={ls.container}>
                    <motion.div className={ls.midFormWrapper} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={ls.midFormContent}>
                            <h2>Помогу понять, что именно автоматизировать</h2>
                            <p>Бесплатный аудит — проанализирую ваши процессы и покажу, где вы теряете деньги</p>
                        </div>
                        <LeadForm source="mid-page" pageUrl={PAGE_URL} compact />
                    </motion.div>
                </div>
            </section>

            {/* ═══════ OFFERS ═══════ */}
            <section className={ls.section} id="offers">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Пакеты <span className={ls.textAccent}>автоматизации</span></h2>
                    </motion.div>

                    <div className={ls.offersGrid}>
                        <motion.div className={ls.offerCard} variants={scaleIn} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Базовый</span>
                                <h3 className={ls.offerName}>Standard</h3>
                                <p className={ls.offerFor}>1-2 процесса</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' /> Автоматизация 1-2 процессов</li>
                                <li><i className='bx bx-check' /> CRM или склад или финансы</li>
                                <li><i className='bx bx-check' /> Интеграция с 1 сервисом</li>
                                <li><i className='bx bx-check' /> Обучение команды</li>
                                <li><i className='bx bx-check' /> Срок: 2-4 недели</li>
                                <li><i className='bx bx-check' /> Поддержка 30 дней</li>
                            </ul>
                            <div className={ls.offerAction}>
                                <button className={ls.offerButton} onClick={scrollToForm}>Оставить заявку</button>
                                <span className={ls.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>

                        <motion.div className={`${ls.offerCard} ${ls.offerCardPopular}`} variants={scaleIn} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.popularBadge}>★ Популярный</div>
                            <div className={ls.offerDiagonalAccent}>PRO</div>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Комплексный</span>
                                <h3 className={ls.offerName}>Professional</h3>
                                <p className={ls.offerFor}>3-5 процессов</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' /> Автоматизация 3-5 процессов</li>
                                <li><i className='bx bx-check' /> CRM + склад + финансы + маркетинг</li>
                                <li><i className='bx bx-check' /> Интеграция с 1С, телефонией, мессенджерами</li>
                                <li><i className='bx bx-check' /> Дашборды и аналитика</li>
                                <li><i className='bx bx-check' /> Срок: 4-8 недель</li>
                                <li><i className='bx bx-check' /> Поддержка 60 дней</li>
                                <li><i className='bx bx-check' /> Обучение + документация</li>
                            </ul>
                            <div className={ls.offerAction}>
                                <button className={`${ls.offerButton} ${ls.offerButtonPrimary}`} onClick={scrollToForm}>Оставить заявку</button>
                                <span className={ls.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>

                        <motion.div className={ls.offerCard} variants={scaleIn} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.offerDiagonalAccent}>VIP</div>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Максимум</span>
                                <h3 className={ls.offerName}>Premium</h3>
                                <p className={ls.offerFor}>Полная автоматизация</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' /> Все процессы без ограничений</li>
                                <li><i className='bx bx-check' /> CRM + ERP + BI + AI</li>
                                <li><i className='bx bx-check' /> Неограниченные интеграции</li>
                                <li><i className='bx bx-check' /> AI-аналитика и прогнозирование</li>
                                <li><i className='bx bx-check' /> Личный менеджер проекта</li>
                                <li><i className='bx bx-check' /> Поддержка 90 дней</li>
                                <li><i className='bx bx-check' /> Масштабирование под рост</li>
                            </ul>
                            <div className={ls.offerAction}>
                                <button className={ls.offerButton} onClick={scrollToForm}>Оставить заявку</button>
                                <span className={ls.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ PROCESS ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`} id="process">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Как проходит <span className={ls.textAccent}>внедрение</span></h2>
                    </motion.div>

                    <div className={ls.processGrid}>
                        {[
                            { num: '01', icon: 'bx-search', title: 'Аудит процессов', desc: 'Интервью с командой, карта процессов, выявление узких мест. Вы точно поймёте, где теряете деньги.' },
                            { num: '02', icon: 'bx-sitemap', title: 'Проектирование', desc: 'План автоматизации с приоритетами. Что автоматизировать первым длямаксимального ROI.' },
                            { num: '03', icon: 'bx-code-alt', title: 'Разработка', desc: 'Итеративная разработка с еженедельными демо. Каждую неделю — рабочий результат.' },
                            { num: '04', icon: 'bx-transfer', title: 'Внедрение', desc: 'Миграция данных, интеграция с вашими системами, тестирование с реальными пользователями.' },
                            { num: '05', icon: 'bx-support', title: 'Обучение и поддержка', desc: 'Обучаю команду, делаю инструкции, поддерживаю 30-90 дней после запуска.' },
                        ].map((step, i) => (
                            <motion.div key={i} className={ls.processStep} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.processNum}>{step.num}</div>
                                <div className={ls.processIcon}><i className={`bx ${step.icon}`} /></div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ GRAND SLAM OFFER ═══════ */}
            <GrandSlamOffer scrollToForm={scrollToForm} />

            {/* ═══════ PORTFOLIO ═══════ */}
            <section className={ls.section} id="portfolio">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Примеры <span className={ls.textAccent}>автоматизации</span></h2>
                    </motion.div>

                    <div className={ls.portfolioGrid}>
                        {[
                            { title: 'CRM + склад для интернет-магазина', desc: 'Автоматизация заказов, остатков, выгрузки на маркетплейсы. Экономия 80 часов/мес.', tech: 'Python, Django, PostgreSQL', category: 'E-commerce' },
                            { title: 'Система для ресторана', desc: 'Заказы, бронирование, кухня, доставка, аналитика. Рост выручки на 35%.', tech: 'Python, FastAPI, React', category: 'HoReCa' },
                            { title: 'CRM + документооборот для B2B', desc: 'Воронка, счета, акты, интеграция с 1С. Время обработки — с 2ч до 15 мин.', tech: 'Python, Django, Celery', category: 'B2B' },
                            { title: 'Автоматизация склада', desc: 'Учёт, инвентаризация, авто-закупки. Пересортица — минус 95%.', tech: 'Python, FastAPI, PostgreSQL', category: 'Логистика' },
                            { title: 'HR-система для компании 200 чел', desc: 'Найм, адаптация, расписание, ЗП, KPI. Экономия HR-отдела 50%.', tech: 'Next.js, Node.js, PostgreSQL', category: 'HR' },
                            { title: 'Маркетинг-автоматизация', desc: 'Email + Telegram + SMS цепочки. Рост повторных продаж на 40%.', tech: 'Python, Redis, Celery', category: 'Маркетинг' },
                        ].map((p, i) => (
                            <motion.div key={i} className={ls.portfolioCard} variants={scaleIn} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.portfolioCategory}>{p.category}</div>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                                <div className={ls.portfolioTech}>{p.tech}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className={ls.portfolioCta} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <button className={ls.linkButton} onClick={() => setPortfolioOpen(true)}>Смотреть все работы →</button>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ STATS ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`}>
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Результаты <span className={ls.textAccent}>наших клиентов</span></h2>
                    </motion.div>

                    <div className={ls.statsGrid}>
                        {[
                            { end: 50, suffix: '+', label: 'Проектов автоматизации' },
                            { end: 40, suffix: '%', label: 'Средний рост выручки' },
                            { end: 80, suffix: ' ч', label: 'Экономия в месяц' },
                            { end: 3, suffix: ' мес', label: 'Макс. окупаемость' },
                        ].map((st, i) => (
                            <motion.div key={i} className={ls.statCard} variants={scaleIn} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.statNum}><AnimatedCounter end={st.end} suffix={st.suffix} /></div>
                                <div className={ls.statLabel}>{st.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ QUIZ ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`}>
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Не знаете, <span className={ls.textAccent}>с чего начать?</span></h2>
                        <p className={ls.sectionSubtitle}>Ответьте на 3 вопроса — покажу, что автоматизировать первым</p>
                    </motion.div>
                    <LandingQuiz
                        source="auto-quiz"
                        pageUrl={PAGE_URL}
                        title="Что автоматизировать первым?"
                        questions={[
                            { question: 'Какая главная боль?', options: ['Теряем клиентов', 'Рутина съедает время', 'Нет контроля и аналитики', 'Дорогие подписки на сервисы'] },
                            { question: 'Сколько сотрудников?', options: ['1-5', '6-20', '21-50', '50+'] },
                            { question: 'Что используете сейчас?', options: ['Excel и тетрадки', 'amoCRM / Битрикс', '1С', 'Ничего системного'] },
                        ]}
                    />
                </div>
            </section>

            {/* ═══════ USEFUL ARTICLES ═══════ */}
            <section className={ls.section} id="articles">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Полезные статьи об <span className={ls.textAccent}>автоматизации бизнеса</span></h2>
                        <p className={ls.sectionSubtitle}>Читайте наши подробные руководства по автоматизации бизнес-процессов</p>
                    </motion.div>

                    <div className={s.articlesGrid}>
                        {ARTICLES.map((a, i) => (
                            <motion.a key={i} href={a.href} className={s.articleCard} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <i className={`bx ${a.icon} ${s.articleCardIcon}`} />
                                <h3>{a.title}</h3>
                                <p>{a.desc}</p>
                            </motion.a>
                        ))}
                    </div>

                    <motion.div style={{ textAlign: 'center' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <a href="/blog/avtomatizaciya-biznesa" className={s.articleHubLink}>
                            <i className='bx bx-book-open' />
                            Все статьи об автоматизации →
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ FAQ ═══════ */}
            <section className={ls.section} id="faq">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Частые <span className={ls.textAccent}>вопросы</span></h2>
                    </motion.div>

                    <div className={ls.faqList}>
                        {[
                            { q: 'Сколько стоит автоматизация бизнеса?', a: 'Зависит от объёма. Автоматизация одного процесса — от 2 недель. Комплексная автоматизация — от 1-3 месяцев. После бесплатного аудита получите точную смету.' },
                            { q: 'С чего начать автоматизацию бизнеса?', a: 'Начните с бесплатной консультации. Я проанализирую ваши бизнес-процессы, выявлю узкие места и предложу план автоматизации с приоритетами.' },
                            { q: 'Какие процессы выгоднее всего автоматизировать?', a: 'Первыми автоматизируют: обработку заявок, воронку продаж, складской учёт, отчётность и рассылки. Эти процессы даютсамый быстрый ROI — окупаемость за 1-3 месяца.' },
                            { q: 'Нужно ли мне разбираться в IT?', a: 'Нет. Вам нужно только описать бизнес-процессы словами. Всё техническое — на мне. После внедрения обучаю вашу команду.' },
                            { q: 'Вы работаете с малым бизнесом?', a: 'Да! Автоматизация малого бизнеса — мой основной фокус. Даже 1-2 автоматизированных процесса могут увеличить прибыль на 30-50%.' },
                            { q: 'Какие гарантии вы даёте?', a: 'Гарантия на код 6 месяцев. Бесплатная поддержка 30-90 дней. Фиксированные сроки в договоре. Полный исходный код — ваши права.' },
                        ].map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ FINAL CTA ═══════ */}
            <section className={ls.finalCta}>
                <div className={ls.finalCtaGlow} />
                <div className={ls.container}>
                    <motion.div className={ls.finalCtaContent} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.finalCtaTitle}>Готовы перестать терять деньги на рутине?</h2>
                        <p className={ls.finalCtaSubtitle}>Оставьте заявку — бесплатный аудит ваших бизнес-процессов и план автоматизации.</p>
                    </motion.div>
                    <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <LeadForm source="final-cta" pageUrl={PAGE_URL} title="Получить бесплатный аудит" />
                    </motion.div>
                </div>
            </section>

            {/* Internal links for SEO */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <div className={s.internalLinks}>
                        <h3>Наши услуги</h3>
                        <div className={s.linksGrid}>
                            <a href="/razrabotka-botov">Разработка ботов</a>
                            <a href="/razrabotka-servisov">Разработка сервисов</a>
                            <a href="/razrabotka-crm">Разработка CRM</a>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />

            {/* ═══════ SEO CONTENT ═══════ */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <div className={s.seoContent}>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className={s.seoH2}>Автоматизация бизнеса: полное руководство</h2>

                            <p>Автоматизация бизнеса — это внедрение цифровых систем для выполнения рутинных операций без участия человека. Согласно исследованию McKinsey, до 45% рабочих задач можно автоматизировать с помощью существующих технологий. Это не только экономия времени и денег, но и конкурентное преимущество, которое позволяет масштабировать бизнес без пропорционального роста штата.</p>

                            <h3 className={s.seoH3}>Зачем нужна автоматизация бизнес-процессов</h3>
                            <p>Автоматизация бизнес-процессов решает три ключевые проблемы: <strong>человеческие ошибки</strong> (ручной ввод данных — источник 30% всех ошибок в компаниях), <strong>потеря времени</strong> (сотрудники тратят 60-80% времени на задачи, которые может делать программа) и <strong>отсутствие контроля</strong> (без системы невозможно точно знать, что происходит в компании).</p>
                            <p>Комплексная автоматизация бизнеса затрагивает все направления: от первичного контакта с клиентом до финальной отгрузки и аналитики. Система автоматизации бизнеса объединяет CRM, склад, финансы, маркетинг и HR в единый организм, где данные текут автоматически между отделами.</p>

                            <h3 className={s.seoH3}>Что можно автоматизировать в малом бизнесе</h3>
                            <p>Автоматизация малого бизнеса начинается с самых «дорогих» процессов. Вот что приносит самый быстрый ROI:</p>
                            <ul className={s.seoList}>
                                <li><strong>Обработка заявок и продажи</strong> — автоматическая квалификация лидов, распределение по менеджерам, напоминания о звонках. Экономия: 20-40 часов/мес.</li>
                                <li><strong>Складской учёт</strong> — автоматический учёт остатков, уведомления о заканчивающихся товарах, генерация заказов поставщикам. Экономия: 15-30 часов/мес.</li>
                                <li><strong>Рассылки и маркетинг</strong> — автоматические цепочки писем, поздравления с днём рождения, реактивация «спящих» клиентов. Рост повторных продаж: 20-40%.</li>
                                <li><strong>Финансовая отчётность</strong> — автоматическое формирование счетов, актов, сверок. Интеграция с 1С и банком. Экономия: 10-20 часов/мес.</li>
                            </ul>

                            <h3 className={s.seoH3}>Системы автоматизации для среднего и крупного бизнеса</h3>
                            <p>Автоматизация бизнес-процессов среднего и крупного бизнеса требует более комплексного подхода. Системы автоматизации бизнеса для корпоративного сегмента включают: управление цепочками поставок (SCM), управление взаимоотношениями с клиентами (CRM), управление ресурсами предприятия (ERP) и бизнес-аналитику (BI).</p>
                            <p>Комплексная автоматизация бизнес-процессов включает интеграцию всех этих систем между собой. Данные из CRM автоматически попадают в бухгалтерию, складские остатки влияют на производственный план, маркетинговая аналитика связана с продажами. Это создаёт единую картину бизнеса в реальном времени.</p>

                            <h3 className={s.seoH3}>Внедрение автоматизации: с чего начать</h3>
                            <p>Внедрение автоматизации бизнес-процессов — это не разовый проект, а итеративный процесс. Рекомендуемый порядок:</p>
                            <ol className={s.seoList}>
                                <li><strong>Аудит текущих процессов</strong> — карта того, как работает бизнес сейчас. Где узкие места, где теряется время и деньги.</li>
                                <li><strong>Приоритизация</strong> — какие процессы автоматизировать первыми для максимальной отдачи. Обычно это обработка заявок и воронка продаж.</li>
                                <li><strong>MVP</strong> — минимальная рабочая версия за 2-4 недели. Быстрый результат, быстрое обучение.</li>
                                <li><strong>Масштабирование</strong> — добавление новых процессов, интеграций, аналитики.</li>
                            </ol>

                            <h3 className={s.seoH3}>Стоимость автоматизации бизнеса</h3>
                            <p>Стоимость зависит от объёма и сложности. Автоматизация одного процесса (например, CRM) — от 50 000 ₽. Комплексная автоматизация бизнеса под ключ — от 150 000 до 500 000 ₽. Окупаемость — от 1 до 6 месяцев за счёт экономии рабочего времени и роста продаж.</p>
                            <p>Услуги автоматизации бизнеса от агентства или компании — это инвестиция, а не расход. По данным Deloitte, компании, внедрившие автоматизацию, получают ROI 200-300% в первый год.</p>

                            <h3 className={s.seoH3}>Почему выбирают нас</h3>
                            <p>Как компания по автоматизации бизнеса, мы предлагаем не просто разработку, а полное сопровождение: от аудита до обучения. Мы помогаем понять, что именно нужно вашему бизнесу — и внедряем решение, которое реально работает. Автоматизация внутренних бизнес-процессов, корпоративных бизнес-процессов, малого и среднего бизнеса — наша специализация.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <LandingStickyCta scrollToFormId="hero-form" label="Получить аудит" />
            <PortfolioPopup isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
            <TelegramFloat />
            <ExitIntentPopup onCtaClick={scrollToForm} />
        </>
    );
}
