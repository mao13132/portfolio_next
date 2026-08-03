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

import s from './razrabotka-servisov.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ── Constants ── */
const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/razrabotka-servisov`;
const OG_IMAGE = `${SITE_URL}/media/og_desc.jpg`;

const NAV_LINKS = [
    { href: '#benefits', label: 'Преимущества' },
    { href: '#offers', label: 'Пакеты' },
    { href: '#process', label: 'Как работаем' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#faq', label: 'FAQ' },
];

/* ── JSON-LD ── */
const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${PAGE_URL}#webpage`,
            "url": PAGE_URL,
            "name": "Разработка сервисов на заказ — Web, SaaS, API | Дмитрий Малышев",
            "description": "Профессиональная разработка сервисов: SaaS-платформы, API, веб-сервисы, автоматизация бизнес-процессов. Гарантия результата.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
            "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}#website`,
            "url": SITE_URL,
            "name": "Портфолио Дмитрия Малышева",
            "inLanguage": "ru-RU"
        },
        {
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            "name": "Разработка сервисов на заказ",
            "description": "Создание SaaS-платформ, REST API, веб-сервисов, микросервисов и систем автоматизации для бизнеса.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Разработка сервисов",
                "url": SITE_URL,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["SaaS разработка", "REST API", "Микросервисы", "Web-сервисы", "Автоматизация"]
            },
            "serviceType": "Разработка сервисов",
            "areaServed": { "@type": "Country", "name": "Россия" },
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${PAGE_URL}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Разработка сервисов", "item": PAGE_URL }
            ]
        },
        {
            "@type": "FAQPage",
            "@id": `${PAGE_URL}#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Сколько времени занимает разработка сервиса?",
                    "acceptedAnswer": { "@type": "Answer", "text": "MVP — от 2 недель. Средний проект — 1-2 месяца. Сложная SaaS-платформа — 2-4 месяца. Точные сроки определяем после анализа задачи." }
                },
                {
                    "@type": "Question",
                    "name": "Что входит в разработку сервиса?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Анализ требований, проектирование архитектуры, разработка backend и frontend, тестирование,деплой на сервер, документация и поддержка." }
                },
                {
                    "@type": "Question",
                    "name": "Какие технологии вы используете?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Python (Django, FastAPI), Node.js, React, Next.js, PostgreSQL, Redis, Docker, AWS/VPS. Выбор стека под задачу." }
                },
                {
                    "@type": "Question",
                    "name": "Выдаёте ли вы исходный код?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Да, полный исходный код передаётся вам. Вы не привязаны к одному подрядчику." }
                },
                {
                    "@type": "Question",
                    "name": "Какие гарантии вы даёте?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Гарантия на код — 6 месяцев. Бесплатная поддержка 30-90 дней. Исправление багов за наш счёт в течение гарантийного периода." }
                },
            ]
        }
    ]
};

/* ── NAV ── */

/* ── PAGE ── */
export default function RazrabotkaServisovPage() {
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const scrollToForm = useCallback(() => {
        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    return (
        <>
            <Head>
                <title>Разработка веб-сервисов на заказ — SaaS, дашборды, API | DimaRazrab</title>
                <meta name="description" content="Разработка веб-приложений и сервисов на Next.js и Python. Бесплатная поддержка 30 дней. Обсудите проект!" />
                <meta name="keywords" content="разработка сервисов, создание сервиса, SaaS разработка, разработка API, веб-сервис на заказ, автоматизация бизнеса, микросервисы" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content="Разработка веб-сервисов на заказ — SaaS, дашборды, API | DimaRazrab" />
                <meta property="og:description" content="Разработка веб-приложений и сервисов на Next.js и Python. Бесплатная поддержка 30 дней. Обсудите проект!" />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Разработка веб-сервисов на заказ — SaaS, дашборды, API | DimaRazrab" />
                <meta name="twitter:description" content="Разработка веб-приложений и сервисов на Next.js и Python. Бесплатная поддержка 30 дней." />
                <meta name="twitter:image" content={OG_IMAGE} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            </Head>

            <ClickComponent />
            <LandingHeader navLinks={NAV_LINKS} />

            <div className={ls.container} style={{ paddingTop: 16 }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Разработка сервисов' },
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
                            <motion.div className={ls.heroBadge}
                                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}>
                                ⚡ Бесплатная консультация • Ответ за 30 минут
                            </motion.div>

                            <motion.h1 className={ls.heroTitle}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}>
                                Разработка сервисов, которые{' '}
                                <span className={ls.heroHighlight}>масштабируют бизнес</span>
                            </motion.h1>

                            <motion.p className={ls.heroSubtitle}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}>
                                Создаю SaaS-платформы, REST API, веб-сервисы и системы автоматизации,
                                которые обрабатывают тысячи запросов и растут вместе с вашим бизнесом.
                            </motion.p>

                            <motion.div className={ls.heroBullets}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.45 }}>
                                {['MVP от 2 недель', 'Бесплатная поддержка до 90 дней', 'Полный исходный код — ваш'].map((b, i) => (
                                    <div key={i} className={ls.heroBullet}>
                                        <span className={ls.heroBulletIcon}>✓</span>
                                        {b}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div className={ls.heroFormWrapper} id="hero-form"
                            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            <LeadForm
                                source="hero"
                                pageUrl={PAGE_URL}
                                title="Получить бесплатную консультацию"
                                subtitle="Расскажите о задаче — предложу архитектуру и смету"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className={ls.diagonalDivider} />
            </section>

            {/* ═══════ PAIN POINTS ═══════ */}
            <section className={ls.section} id="pain">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Проблемы, которые <span className={ls.textAccent}>решает сервис</span></h2>
                        <p className={ls.sectionSubtitle}>Без автоматизации вы теряете время, деньги и клиентов</p>
                    </motion.div>

                    <div className={ls.painGrid}>
                        {[
                            { icon: 'bx-task', text: 'Ручная обработка данных отнимает часы — сотрудники заняты рутиной вместо развития' },
                            { icon: 'bx-error', text: 'Ошибки при вводе данных вручную приводят к потерям и недовольству клиентов' },
                            { icon: 'bx-money-withdraw', text: 'Готовые SaaS-решения стоят дорого и не подходят под ваши процессы на 100%' },
                            { icon: 'bx-bar-chart-alt-2', text: 'Нет единой системы — данные разрознены, аналитика невозможна, решения наугад' },
                            { icon: 'bx-time-five', text: 'Интеграция между сервисами не работает, сотрудники копируют данные вручную' },
                            { icon: 'bx-trending-down', text: 'Конкуренты автоматизировались и быстрее выходят на рынок с новыми продуктами' },
                        ].map((p, i) => (
                            <motion.div key={i} className={ls.painCard} variants={fadeUp} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <i className={`bx ${p.icon}`} />
                                <p>{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ BENEFITS ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`} id="benefits">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Что даст <span className={ls.textAccent}>кастомный сервис</span></h2>
                        <p className={ls.sectionSubtitle}>Решение, заточенное именно под ваши процессы</p>
                    </motion.div>

                    <div className={ls.benefitsGrid}>
                        {[
                            { icon: 'bx-cog', title: 'Автоматизация процессов', desc: 'Сервис берёт на себя рутину: обработку заказов, расчёты, отчёты, уведомления. Сотрудники занимаются делом.' },
                            { icon: 'bx-line-chart', title: 'Масштабируемость', desc: 'Архитектура проектируется под рост: от 100 до 100 000 пользователей без переписывания кода.' },
                            { icon: 'bx-link', title: 'Интеграция с вашими системами', desc: 'CRM, 1С, платёжные системы, мессенджеры, email — всё работает как единый организм.' },
                            { icon: 'bx-data', title: 'Единое хранилище данных', desc: 'Все данные в одном месте. Аналитика, дашборды, экспорт отчётов в один клик.' },
                            { icon: 'bx-shield', title: 'Безопасность и контроль', desc: 'Роли доступа, аудит действий, шифрование, backups. Полный контроль над данными.' },
                            { icon: 'bx-wallet', title: 'Экономия от 200 000 ₽/мес', desc: 'Один сервис заменяет несколько подписок на SaaS и снижает нагрузку на персонал.' },
                        ].map((b, i) => (
                            <motion.div key={i} className={ls.benefitCard} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.benefitIcon}><i className={`bx ${b.icon}`} /></div>
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                                {i === 0 && <div className={`${ls.diagonalBadge} ${ls.diagonalBadgeCyan}`}>TOP</div>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ MID FORM ═══════ */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <motion.div className={ls.midFormWrapper} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={ls.midFormContent}>
                            <h2>Знаете, какой сервис нужен?</h2>
                            <p>Опишите задачу — получите архитектурное решение и смету за 30 минут</p>
                        </div>
                        <LeadForm source="mid-page" pageUrl={PAGE_URL} compact />
                    </motion.div>
                </div>
            </section>

            {/* ═══════ OFFERS ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`} id="offers">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Выберите свой <span className={ls.textAccent}>пакет</span></h2>
                        <p className={ls.sectionSubtitle}>Каждый пакет включает полный цикл: от архитектуры до запуска</p>
                    </motion.div>

                    <div className={ls.offersGrid}>
                        {/* Standard */}
                        <motion.div className={ls.offerCard} variants={scaleIn} custom={0}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Базовый</span>
                                <h3 className={ls.offerName}>Standard</h3>
                                <p className={ls.offerFor}>MVP или простой сервис</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' />Backend + базовый frontend</li>
                                <li><i className='bx bx-check' />REST API</li>
                                <li><i className='bx bx-check' />База данных + авторизация</li>
                                <li><i className='bx bx-check' />Срок: 2-4 недели</li>
                                <li><i className='bx bx-check' />Бесплатная поддержка 30 дней</li>
                                <li><i className='bx bx-check' />Деплой на ваш сервер</li>
                            </ul>
                            <div className={ls.offerAction}>
                                <button className={ls.offerButton} onClick={scrollToForm}>Оставить заявку</button>
                                <span className={ls.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>

                        {/* Professional */}
                        <motion.div className={`${ls.offerCard} ${ls.offerCardPopular}`} variants={scaleIn} custom={1}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.popularBadge}>★ Популярный</div>
                            <div className={ls.offerDiagonalAccent}>PRO</div>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Продвинутый</span>
                                <h3 className={ls.offerName}>Professional</h3>
                                <p className={ls.offerFor}>Полноценный сервис с интеграциями</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' />Backend + адаптивный frontend</li>
                                <li><i className='bx bx-check' />REST + GraphQL API</li>
                                <li><i className='bx bx-check' />Интеграции: CRM, 1С, платежи</li>
                                <li><i className='bx bx-check' />Админ-панель + аналитика</li>
                                <li><i className='bx bx-check' />Срок: 4-8 недель</li>
                                <li><i className='bx bx-check' />Бесплатная поддержка 60 дней</li>
                                <li><i className='bx bx-check' />CI/CD + Docker</li>
                            </ul>
                            <div className={ls.offerAction}>
                                <button className={`${ls.offerButton} ${ls.offerButtonPrimary}`} onClick={scrollToForm}>Оставить заявку</button>
                                <span className={ls.offerNote}>Обсудим стоимость бесплатно</span>
                            </div>
                        </motion.div>

                        {/* Premium */}
                        <motion.div className={ls.offerCard} variants={scaleIn} custom={2}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.offerDiagonalAccent}>VIP</div>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Комплексный</span>
                                <h3 className={ls.offerName}>Premium</h3>
                                <p className={ls.offerFor}>SaaS-платформа / микросервисы</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' />Микросервисная архитектура</li>
                                <li><i className='bx bx-check' />AI / ML интеграция</li>
                                <li><i className='bx bx-check' />Неограниченные интеграции</li>
                                <li><i className='bx bx-check' />Мультирегиональный деплой</li>
                                <li><i className='bx bx-check' />Личный менеджер проекта</li>
                                <li><i className='bx bx-check' />Бесплатная поддержка 90 дней</li>
                                <li><i className='bx bx-check' />Масштабирование под нагрузку</li>
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
            <section className={ls.section} id="process">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Как мы <span className={ls.textAccent}>работаем</span></h2>
                        <p className={ls.sectionSubtitle}>Прозрачный процесс от идеи до продакшена</p>
                    </motion.div>

                    <div className={ls.processGrid}>
                        {[
                            { num: '01', icon: 'bx-conversation', title: 'Анализ требований', desc: 'Интервью, исследование ниши, формирование бизнес-требований и приоритетов.' },
                            { num: '02', icon: 'bx-sitemap', title: 'Проектирование', desc: 'Архитектура, схема БД, API-контракты, вайрфреймы. Вы видите систему до кода.' },
                            { num: '03', icon: 'bx-code-alt', title: 'Разработка', desc: 'Итеративная разработка с еженедельными демо. Каждую неделю — рабочий кусок системы.' },
                            { num: '04', icon: 'bx-test-tube', title: 'Тестирование', desc: 'Unit-тесты, интеграционные тесты, нагрузочное тестирование. Код без багов.' },
                            { num: '05', icon: 'bx-rocket', title: 'Запуск и поддержка', desc: 'Деплой, мониторинг, обучение команды, бесплатная поддержка 30-90 дней.' },
                        ].map((step, i) => (
                            <motion.div key={i} className={ls.processStep} variants={fadeUp} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.processNum}>{step.num}</div>
                                <div className={ls.processIcon}><i className={`bx ${step.icon}`} /></div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ GUARANTEES ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`} id="guarantees">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Мои <span className={ls.textAccent}>гарантии</span> вам</h2>
                    </motion.div>

                    <div className={ls.guaranteesGrid}>
                        {[
                            { icon: 'bx-shield', title: 'Гарантия на код — 6 мес', desc: 'Если найдёте баг в моём коде — исправлю бесплатно в течение гарантийного срока.' },
                            { icon: 'bx-revision', title: 'Бесплатные правки', desc: 'В течение срока поддержки — любые доработки и исправления без доплаты.' },
                            { icon: 'bx-time', title: 'Соблюдение сроков', desc: 'Фиксируем дедлайн в договоре. Задержка с моей стороны — скидка 10% за неделю.' },
                            { icon: 'bx-lock-alt', title: 'NDA и конфиденциальность', desc: 'Подпишу NDA. Ваш код, данные и бизнес-логика — только ваши.' },
                        ].map((g, i) => (
                            <motion.div key={i} className={ls.guaranteeCard} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <i className={`bx ${g.icon}`} />
                                <h3>{g.title}</h3>
                                <p>{g.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ PORTFOLIO ═══════ */}
            <section className={ls.section} id="portfolio">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Примеры <span className={ls.textAccent}>выполненных проектов</span></h2>
                    </motion.div>

                    <div className={ls.portfolioGrid}>
                        {[
                            { title: 'SaaS-платформа для HR', desc: 'Система подбора персонала с AI-скринингом резюме. 500+ компаний-клиентов.', tech: 'Python, FastAPI, React, PostgreSQL', category: 'SaaS' },
                            { title: 'API для финтех-стартапа', desc: 'REST API для обработки платежей. 10 000+ транзакций/день, 99.9% uptime.', tech: 'Node.js, Express, Redis, Docker', category: 'API' },
                            { title: 'Система автоматизации логистики', desc: 'Маршрутизация доставки, трекинг, интеграция с 1С. Снижение затрат на 30%.', tech: 'Python, Django, Celery, PostgreSQL', category: 'Automation' },
                            { title: 'CRM для агентства недвижимости', desc: 'Кастомная CRM с воронками, аналитикой и интеграцией с порталами.', tech: 'Python, FastAPI, Vue.js, MongoDB', category: 'CRM' },
                            { title: 'Платформа онлайн-обучения', desc: 'LMS с видеокурсами, тестами, сертификатами. 10 000+ студентов.', tech: 'Next.js, Node.js, PostgreSQL, S3', category: 'EdTech' },
                            { title: 'Микросервис для аналитики', desc: 'Сбор и обработка данных из 15 источников. Дашборды в реальном времени.', tech: 'Python, Kafka, ClickHouse, Docker', category: 'Analytics' },
                        ].map((p, i) => (
                            <motion.div key={i} className={ls.portfolioCard} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.portfolioCategory}>{p.category}</div>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                                <div className={ls.portfolioTech}>{p.tech}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className={ls.portfolioCta} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <button className={ls.linkButton} onClick={() => setPortfolioOpen(true)}>
                            Смотреть все работы →
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ STATS ═══════ */}
            <section className={`${ls.section} ${ls.sectionDark}`} id="results">
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Цифры говорят <span className={ls.textAccent}>за нас</span></h2>
                    </motion.div>

                    <div className={ls.statsGrid}>
                        {[
                            { end: 50, suffix: '+', label: 'Сервисов запущено' },
                            { end: 99, suffix: '.9%', label: 'Uptime в продакшене' },
                            { end: 5, suffix: '+', label: 'Лет опыта' },
                            { end: 24, suffix: 'ч', label: 'Среднее время ответа' },
                        ].map((s, i) => (
                            <motion.div key={i} className={ls.statCard} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.statNum}><AnimatedCounter end={s.end} suffix={s.suffix} /></div>
                                <div className={ls.statLabel}>{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
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
                            { q: 'Сколько времени занимает разработка сервиса?', a: 'MVP — от 2 недель. Средний проект — 1-2 месяца. Сложная SaaS-платформа — 2-4 месяца. Точные сроки определяем после анализа задачи.' },
                            { q: 'Что входит в разработку?', a: 'Анализ требований, проектирование архитектуры, разработка backend и frontend, тестирование, деплой на сервер, документация и поддержка.' },
                            { q: 'Какие технологии вы используете?', a: 'Python (Django, FastAPI), Node.js, React, Next.js, PostgreSQL, Redis, Docker, AWS/VPS. Выбор стека под задачу.' },
                            { q: 'Выдаёте ли вы исходный код?', a: 'Да, полный исходный код передаётся вам. Вы не привязаны к одному подрядчику.' },
                            { q: 'Какие гарантии вы даёте?', a: 'Гарантия на код — 6 месяцев. Бесплатная поддержка 30-90 дней. Исправление багов за наш счёт в течение гарантийного периода.' },
                            { q: 'Можно ли начать с MVP?', a: 'Конечно! Рекомендую: сначала MVP за 2-4 недели, тестирование на реальных пользователях, потом масштабирование.' },
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
                        <h2 className={ls.finalCtaTitle}>Готовы автоматизировать бизнес с помощью сервиса?</h2>
                        <p className={ls.finalCtaSubtitle}>Оставьте заявку — обсудим ваш проект бесплатно и без обязательств.</p>
                    </motion.div>
                    <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <LeadForm source="final-cta" pageUrl={PAGE_URL} title="Обсудить проект бесплатно" />
                    </motion.div>
                </div>
            </section>

            {/* ═══════ GRAND SLAM OFFER ═══════ */}
            <GrandSlamOffer scrollToForm={scrollToForm} />

            {/* ═══════ QUIZ ═══════ */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Не знаете <span className={ls.textAccent}>какой сервис нужен?</span></h2>
                        <p className={ls.sectionSubtitle}>Ответьте на 3 вопроса — подберу решение за 30 секунд</p>
                    </motion.div>
                    <LandingQuiz
                        source="servis-quiz"
                        pageUrl={PAGE_URL}
                        title="Подберём сервис за 30 секунд"
                        questions={[
                            { question: 'Какая задача?', options: ['Автоматизация процессов', 'Интеграция систем', 'Аналитика и данные', 'SaaS-платформа'] },
                            { question: 'Сколько пользователей?', options: ['До 100', '100-1000', '1000-10000', '10000+'] },
                            { question: 'Нужна ли интеграция с 1С?', options: ['Да, обязательно', 'Возможно позже', 'Нет, не нужно'] },
                        ]}
                    />
                </div>
            </section>

            <LandingFooter />

            {/* ═══════ SEO CONTENT ═══════ */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <div className={s.seoContent}>
                        <h2 className={s.seoH2}>Разработка сервисов и SaaS-платформ на заказ</h2>

                        <p>Разработка сервисов — это создание программных платформ, которые решают бизнес-задачи: от автоматизации внутренних процессов до предоставления SaaS-решений тысячам пользователей. Веб-сервис на заказ позволяет получить продукт, заточенный под конкретные нужды бизнеса, с полным контролем над данными и архитектурой.</p>

                        <h3 className={s.seoH3}>Разработка web-сервисов: что это такое</h3>
                        <p>Разработка web-сервисов включает создание серверной части (backend), клиентского интерфейса (frontend), базы данных, API и инфраструктуры. Backend обрабатывает бизнес-логику, хранит данные и предоставляет API. Frontend — это интерфейс, с которым взаимодействуют пользователи. API связывает всё воедино и позволяет интегрировать сервис с внешними системами.</p>
                        <p>Разработка backend сервиса — это ядро любого проекта. Я использую Python (Django, FastAPI) и Node.js — проверенные технологии, которые выдерживают нагрузку от стартапа до корпорации. Для базы данных — PostgreSQL, для кэширования — Redis, для фоновых задач — Celery.</p>

                        <h3 className={s.seoH3}>SaaS разработка: создание облачных платформ</h3>
                        <p>SaaS разработка — это создание программного обеспечения как услуги. Пользователи не скачивают приложение, а работают через браузер, платя подписку. SaaS-модель позволяет масштабировать бизнес: один продукт обслуживает тысячи клиентов без пропорционального роста затрат.</p>
                        <p>Создание сервиса SaaS включает: мультиарендность (каждый клиент — изолированное пространство), платёжную систему (Stripe, ЮKassa), административную панель, аналитику использования, систему тарифов и ограничений по подписке.</p>

                        <h3 className={s.seoH3}>Разработка API: связующее звено систем</h3>
                        <p>Разработка API — это создание программного интерфейса, через который системы обмениваются данными. REST API — самый популярный подход: понятный, масштабируемый, документируемый. GraphQL — альтернатива для сложных запросов с гибкой выборкой данных.</p>
                        <p>Разработка REST API включает: проектирование эндпоинтов, аутентификацию (JWT, OAuth2), валидацию данных, документацию (Swagger/OpenAPI), версионирование, rate limiting и мониторинг. Качественный API — фундамент для мобильных приложений, фронтендов и интеграций.</p>

                        <h3 className={s.seoH3}>Микросервисная архитектура</h3>
                        <p>Разработка сервисов на архитектуре микросервисов — это разбиение монолитного приложения на независимые компоненты. Каждый микросервис отвечает за одну задачу: авторизация, платежи, уведомления, аналитика. Они общаются через очереди сообщений (RabbitMQ, Kafka) и REST API.</p>
                        <p>Преимущества: независимое масштабирование (только нагруженный сервис), отказоустойчивость (сбой одного не ломает весь сервис), технологическая гибкость (разные сервисы на разных языках). Подходит для проектов с нагрузкой от 10 000+ пользователей.</p>

                        <h3 className={s.seoH3}>Стоимость разработки сервиса</h3>
                        <p>Стоимость зависит от сложности. Простой REST API — от 40 000 ₽. SaaS-платформа с мультиарендностью — от 200 000 ₽. Микросервисная система — от 500 000 ₽. После бесплатной консультации получите точную смету с фиксированной ценой и сроками.</p>

                        <h3 className={s.seoH3}>Почему выбирают нас для разработки сервисов</h3>
                        <p>Разработка сервисов — это не только код, но и проектирование архитектуры, которая будет работать годы. Я не просто «пишу сервисы» — я проектирую системы, которые масштабируются, не падают под нагрузкой и легко развиваются. Полный исходный код, бесплатная поддержка, гарантия на код 6 месяцев.</p>

                        <div className={s.seoInternalLinks}>
                            <h3>Другие наши услуги</h3>
                            <div className={s.seoLinksGrid}>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-crm">Разработка CRM</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingStickyCta scrollToFormId="hero-form" label="Обсудить сервис" />
            <PortfolioPopup isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
            <ScrollProgressBar />
            <TelegramFloat />
            <ExitIntentPopup onCtaClick={scrollToForm} />
        </>
    );
}
