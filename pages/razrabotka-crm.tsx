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

import s from './razrabotka-crm.module.css';
import ls from '@/app/Components/Landing/landing.module.css';

/* ── Constants ── */
const SITE_URL = 'https://dima-razrab.com';
const PAGE_URL = `${SITE_URL}/razrabotka-crm`;
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
            "name": "Разработка CRM на заказ — автоматизация продаж | Дмитрий Малышев",
            "description": "Разработка CRM-систем на заказ для бизнеса. Автоматизация продаж, воронки, аналитика, интеграции. Гарантия результата.",
            "inLanguage": "ru-RU",
            "isPartOf": { "@id": `${SITE_URL}#website` },
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
            "name": "Разработка CRM на заказ",
            "description": "Создание CRM-систем для автоматизации продаж, управления клиентской базой, воронками продаж и аналитикой.",
            "provider": {
                "@type": "ProfessionalService",
                "name": "Дмитрий Малышев — Разработка CRM",
                "url": SITE_URL,
                "priceRange": "$$",
                "areaServed": { "@type": "Country", "name": "Россия" },
                "knowsAbout": ["CRM разработка", "Автоматизация продаж", "Воронка продаж", "Управление клиентами", "Лидогенерация"]
            },
            "serviceType": "Разработка CRM-систем",
            "areaServed": { "@type": "Country", "name": "Россия" },
        },
        {
            "@type": "FAQPage",
            "@id": `${PAGE_URL}#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Сколько стоит разработка CRM?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Зависит от сложности. Простая CRM — от 2 недель. Средняя с интеграциями — 1-2 месяца. Сложная корпоративная — 2-4 месяца. После бесплатной консультации получите точную смету." }
                },
                {
                    "@type": "Question",
                    "name": "Чем кастомная CRM лучше amoCRM или Битрикс24?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Кастомная CRM заточена под ваши процессы на 100%. Нет лишних функций, нет платы за пользователей, полный контроль над данными. Стоимость владения ниже через 6-12 месяцев." }
                },
                {
                    "@type": "Question",
                    "name": "Можно ли перенести данные из amoCRM/Битрикс?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Да, мигрирую все данные: контакты, сделки, историю переписки, задачи. Без потери данных и простоев в работе." }
                },
                {
                    "@type": "Question",
                    "name": "Какие интеграции возможны?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Телефония (Zadarma, Mango), email, Telegram, WhatsApp, сайт, 1С, склад, маркетплейсы, платёжные системы — любые API-интеграции." }
                },
                {
                    "@type": "Question",
                    "name": "CRM будет работать на моём сервере?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Да, размещаю на вашем VPS или dedicated-сервере. Данные полностью под вашим контролем. Возможен и облачный вариант." }
                },
                {
                    "@type": "Question",
                    "name": "Дадите ли вы обучение?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Да, обучаю всю команду работе с CRM. Делаю видеоинструкции и документацию. Бесплатная поддержка 30-90 дней после запуска." }
                },
            ]
        }
    ]
};

/* ── PAGE ── */
export default function RazrabotkaCrmPage() {
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const scrollToForm = useCallback(() => {
        document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    return (
        <>
            <Head>
                <title>Разработка CRM на заказ — автоматизация продаж | Дмитрий Малышев</title>
                <meta name="description" content="Разработка CRM-систем на заказ: автоматизация продаж, воронки, аналитика, интеграции с 1С и телефонией. От 2 недель. Бесплатная поддержка. Гарантия." />
                <meta name="keywords" content="разработка CRM, создать CRM, CRM на заказ, разработка crm системы, автоматизация продаж, crm для бизнеса, кастомная crm, разработка crm для бизнеса, разработка crm систем для бизнеса, разработка crm системы на заказ, разработка crm erp, разработка crm стоимость, заказы на разработку crm, разработка сайтов и crm" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={PAGE_URL} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Дмитрий Малышев — Разработка CRM" />
                <meta property="og:title" content="Разработка CRM на заказ — автоматизация продаж" />
                <meta property="og:description" content="Разработка CRM-систем на заказ. Автоматизация продаж, воронки, аналитика. От 2 недель. Гарантия." />
                <meta property="og:url" content={PAGE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Разработка CRM на заказ — автоматизация продаж" />
                <meta name="twitter:description" content="Разработка CRM-систем на заказ. От 2 недель. Гарантия." />
                <meta name="twitter:image" content={OG_IMAGE} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            </Head>

            <ClickComponent />
            <LandingHeader navLinks={NAV_LINKS} />

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
                                Разработка CRM, которая{' '}
                                <span className={ls.heroHighlight}>увеличивает продажи</span>{' '}
                                на 40-200%
                            </motion.h1>

                            <motion.p className={ls.heroSubtitle}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}>
                                Создаю CRM-системы, заточенные под ваши бизнес-процессы: воронки продаж,
                                автоматизация, аналитика, интеграции. Никаких лишних функций — только то, что приносит деньги.
                            </motion.p>

                            <motion.div className={ls.heroBullets}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.45 }}>
                                {['MVP от 2 недель', 'Миграция из amoCRM/Битрикс бесплатно', 'Без платы за пользователей'].map((b, i) => (
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
                                subtitle="Расскажите о бизнесе — предложу CRM-решение и смету"
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
                        <h2 className={ls.sectionTitle}>Проблемы без <span className={ls.textAccent}>нормальной CRM</span></h2>
                        <p className={ls.sectionSubtitle}>Знакомые ситуации? Одна CRM решает все сразу</p>
                    </motion.div>

                    <div className={ls.painGrid}>
                        {[
                            { icon: 'bx-spreadsheet', text: 'Клиенты записаны в Excel, тетрадках и головах менеджеров. Увольнение = потеря базы' },
                            { icon: 'bx-money-withdraw', text: 'Платите 500-3000 ₽/мес за каждого пользователя amoCRM или Битрикс24' },
                            { icon: 'bx-error-circle', text: 'Менеджеры забывают перезвонить, теряют заявки, не ведут воронку — вы теряете 30-50% сделок' },
                            { icon: 'bx-bar-chart-alt-2', text: 'Нет аналитики: не знаете, сколько стоит лид, какая конверсия, где «узкое горлышко»' },
                            { icon: 'bx-link-x', text: 'CRM не интегрирована с сайтом, телефонией и мессенджерами — данные вручную' },
                            { icon: 'bx-customize', text: 'Готовая CRM не подходит под ваши процессы — приходится подстраивать бизнес под систему' },
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
                        <h2 className={ls.sectionTitle}>Что даёт <span className={ls.textAccent}>кастомная CRM</span></h2>
                        <p className={ls.sectionSubtitle}>Система, которая работает на вас, а не вы на неё</p>
                    </motion.div>

                    <div className={ls.benefitsGrid}>
                        {[
                            { icon: 'bx-trending-up', title: 'Рост продаж на 40-200%', desc: 'Ни один лид не теряется. Автоматические напоминания, воронки, скоринг лидов. Менеджеры продают, а не ищут контакты.' },
                            { icon: 'bx-wallet', title: 'Экономия на лицензиях', desc: 'Нет платы за пользователей. Одноразовая инвестиция — CRM работает бесплатно. Окупаемость за 3-6 месяцев.' },
                            { icon: 'bx-customize', title: 'Заточено под ваш бизнес', desc: 'Только ваши поля, ваши этапы воронки, ваши отчёты. Без 90% лишних функций, которые вы не используете.' },
                            { icon: 'bx-link', title: 'Все интеграции в одном месте', desc: 'Сайт, телефония, Telegram, WhatsApp, email, 1С, склад — всё автоматически попадает в CRM.' },
                            { icon: 'bx-data', title: 'Полная аналитика', desc: 'Стоимость лида, конверсия воронки, выручка по менеджерам, ROI рекламы — все метрики в дашборде.' },
                            { icon: 'bx-shield', title: 'Данные под вашим контролем', desc: 'CRM на вашем сервере. Никто не получит доступ к вашей клиентской базе. Полная конфиденциальность.' },
                        ].map((b, i) => (
                            <motion.div key={i} className={ls.benefitCard} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.benefitIcon}><i className={`bx ${b.icon}`} /></div>
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                                {i === 0 && <div className={`${ls.diagonalBadge} ${ls.diagonalBadgeCyan}`}>ROI</div>}
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
                            <h2>Знаете, какая CRM вам нужна?</h2>
                            <p>Опишите бизнес-процессы — получите решение и смету за 30 минут</p>
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
                        <p className={ls.sectionSubtitle}>Каждый пакет включает разработку, тестирование и поддержку</p>
                    </motion.div>

                    <div className={ls.offersGrid}>
                        {/* Standard */}
                        <motion.div className={ls.offerCard} variants={scaleIn} custom={0}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={ls.offerHeader}>
                                <span className={ls.offerBadge}>Базовый</span>
                                <h3 className={ls.offerName}>Standard</h3>
                                <p className={ls.offerFor}>Для малого бизнеса и стартапов</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' /> Контакты, сделки, воронка</li>
                                <li><i className='bx bx-check' /> Задачи и напоминания</li>
                                <li><i className='bx bx-check' /> Базовая аналитика</li>
                                <li><i className='bx bx-check' /> Интеграция с сайтом</li>
                                <li><i className='bx bx-check' /> Срок: 2-3 недели</li>
                                <li><i className='bx bx-check' /> Поддержка 30 дней</li>
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
                                <p className={ls.offerFor}>Для растущих команд 5-50 чел.</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' /> Всё из Standard</li>
                                <li><i className='bx bx-check' /> Роли и права доступа</li>
                                <li><i className='bx bx-check' /> Телефония + мессенджеры</li>
                                <li><i className='bx bx-check' /> Отчёты и дашборды</li>
                                <li><i className='bx bx-check' /> Интеграция с 1С</li>
                                <li><i className='bx bx-check' /> Срок: 4-6 недель</li>
                                <li><i className='bx bx-check' /> Поддержка 60 дней</li>
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
                                <p className={ls.offerFor}>Корпоративная CRM / ERP</p>
                            </div>
                            <ul className={ls.offerFeatures}>
                                <li><i className='bx bx-check' /> Всё из Professional</li>
                                <li><i className='bx bx-check' /> AI-скоринг лидов</li>
                                <li><i className='bx bx-check' /> Мультиворонки</li>
                                <li><i className='bx bx-check' /> Склад + документооборот</li>
                                <li><i className='bx bx-check' /> Личный менеджер</li>
                                <li><i className='bx bx-check' /> Срок: 6-10 недель</li>
                                <li><i className='bx bx-check' /> Поддержка 90 дней</li>
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
                        <p className={ls.sectionSubtitle}>Прозрачный процесс — вы контролируете каждый этап</p>
                    </motion.div>

                    <div className={ls.processGrid}>
                        {[
                            { num: '01', icon: 'bx-conversation', title: 'Аудит процессов', desc: 'Интервью с командой, анализ воронки, выявление узких мест. Формируем ТЗ.' },
                            { num: '02', icon: 'bx-sitemap', title: 'Проектирование', desc: 'Схема данных, воронки, роли, интерфейсы. Согласовываем до начала разработки.' },
                            { num: '03', icon: 'bx-code-alt', title: 'Разработка', desc: 'Итеративная разработка с еженедельными демо. Каждую неделю — рабочий модуль.' },
                            { num: '04', icon: 'bx-transfer', title: 'Миграция данных', desc: 'Перенос данных из Excel, amoCRM, Битрикс или другой системы без потерь.' },
                            { num: '05', icon: 'bx-support', title: 'Запуск и обучение', desc: 'Внедрение, обучение команды, бесплатная поддержка 30-90 дней.' },
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
                            { icon: 'bx-shield', title: 'Гарантия на код — 6 мес', desc: 'Баги в моём коде исправляю бесплатно в течение гарантийного срока.' },
                            { icon: 'bx-transfer', title: 'Безопасная миграция', desc: 'Гарантирую сохранность всех данных при переносе из другой системы.' },
                            { icon: 'bx-time', title: 'Соблюдение сроков', desc: 'Фиксируем дедлайн в договоре. Задержка — скидка 10% за каждую неделю.' },
                            { icon: 'bx-lock-alt', title: 'NDA и конфиденциальность', desc: 'Ваша клиентская база и бизнес-процессы останутся только вашими.' },
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
                        <h2 className={ls.sectionTitle}>Примеры <span className={ls.textAccent}>внедрённых CRM</span></h2>
                    </motion.div>

                    <div className={ls.portfolioGrid}>
                        {[
                            { title: 'CRM для агентства недвижимости', desc: 'Воронки, скоринг лидов, интеграция с порталами. Конверсия выросла на 60%.', tech: 'Python, FastAPI, React, PostgreSQL', category: 'Недвижимость' },
                            { title: 'CRM для автосалона', desc: 'Учёт машин, тест-драйвы, воронка продаж. Время обработки лида — с 2ч до 15 мин.', tech: 'Python, Django, Vue.js, PostgreSQL', category: 'Авто' },
                            { title: 'CRM для стоматологии', desc: 'Запись, история пациентов, финансовая аналитика. Рост повторных визитов на 45%.', tech: 'Node.js, React, MongoDB', category: 'Медицина' },
                            { title: 'CRM для оптовой торговли', desc: 'Заказы, склад, дебиторка, интеграция с 1С. Автоматизация 80% рутины.', tech: 'Python, Django, Celery, PostgreSQL', category: 'Торговля' },
                            { title: 'CRM для маркетингового агентства', desc: 'Проекты, тайм-трекинг, счета, KPI команды. Прозрачность на 100%.', tech: 'Next.js, Node.js, PostgreSQL', category: 'Маркетинг' },
                            { title: 'CRM для фитнес-клуба', desc: 'Абонементы, расписание, тренеры, финансовая аналитика. Отток — минус 30%.', tech: 'Python, FastAPI, React, Redis', category: 'Фитнес' },
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
                        <h2 className={ls.sectionTitle}>Результаты <span className={ls.textAccent}>наших CRM</span></h2>
                    </motion.div>

                    <div className={ls.statsGrid}>
                        {[
                            { end: 15, suffix: '+', label: 'CRM внедрено' },
                            { end: 40, suffix: '%', label: 'Средний рост продаж' },
                            { end: 6, suffix: ' мес', label: 'Макс. окупаемость' },
                            { end: 100, suffix: '%', label: 'Данных под контролем' },
                        ].map((st, i) => (
                            <motion.div key={i} className={ls.statCard} variants={scaleIn} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={ls.statNum}><AnimatedCounter end={st.end} suffix={st.suffix} /></div>
                                <div className={ls.statLabel}>{st.label}</div>
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
                            { q: 'Сколько стоит разработка CRM?', a: 'Зависит от сложности. Простая CRM — от 2 недель. Средняя с интеграциями — 1-2 месяца. Сложная корпоративная — 2-4 месяца. После бесплатной консультации получите точную смету.' },
                            { q: 'Чем кастомная CRM лучше amoCRM или Битрикс24?', a: 'Кастомная CRM заточена под ваши процессы на 100%. Нет лишних функций, нет платы за пользователей, полный контроль над данными. Стоимость владения ниже через 6-12 месяцев.' },
                            { q: 'Можно ли перенести данные из amoCRM/Битрикс?', a: 'Да, мигрирую все данные: контакты, сделки, историю переписки, задачи. Без потери данных и простоев в работе.' },
                            { q: 'Какие интеграции возможны?', a: 'Телефония (Zadarma, Mango), email, Telegram, WhatsApp, сайт, 1С, склад, маркетплейсы, платёжные системы — любые API-интеграции.' },
                            { q: 'CRM будет работать на моём сервере?', a: 'Да, размещаю на вашем VPS или dedicated-сервере. Данные полностью под вашим контролем. Возможен и облачный вариант.' },
                            { q: 'Дадите ли вы обучение?', a: 'Да, обучаю всю команду работе с CRM. Делаю видеоинструкции и документацию. Бесплатная поддержка 30-90 дней после запуска.' },
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
                        <h2 className={ls.finalCtaTitle}>Готовы перестать терять клиентов?</h2>
                        <p className={ls.finalCtaSubtitle}>Оставьте заявку — обсудим вашу CRM бесплатно и без обязательств.</p>
                    </motion.div>
                    <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <LeadForm source="final-cta" pageUrl={PAGE_URL} title="Обсудить CRM бесплатно" />
                    </motion.div>
                </div>
            </section>

            {/* ═══════ GRAND SLAM OFFER ═══════ */}
            <GrandSlamOffer scrollToForm={scrollToForm} />

            {/* ═══════ QUIZ ═══════ */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <motion.div className={ls.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={ls.sectionTitle}>Не знаете <span className={ls.textAccent}>какая CRM нужна?</span></h2>
                        <p className={ls.sectionSubtitle}>Ответьте на 3 вопроса — подберу решение за 30 секунд</p>
                    </motion.div>
                    <LandingQuiz
                        source="crm-quiz"
                        pageUrl={PAGE_URL}
                        title="Подберём CRM за 30 секунд"
                        questions={[
                            { question: 'Какой у вас бизнес?', options: ['Интернет-магазин', 'Услуги / B2B', 'Производство', 'Другое'] },
                            { question: 'Сколько менеджеров?', options: ['1-3', '4-10', '11-30', '30+'] },
                            { question: 'Что самое важное?', options: ['Воронка продаж', 'Интеграция с сайтом', 'Аналитика и отчёты', 'Автоматизация рутины'] },
                        ]}
                    />
                </div>
            </section>

            <LandingFooter />

            {/* ═══════ SEO CONTENT ═══════ */}
            <section className={ls.section}>
                <div className={ls.container}>
                    <div className={s.seoContent}>
                        <h2 className={s.seoH2}>Разработка CRM-систем для бизнеса</h2>

                        <p>Разработка CRM — это создание системы управления взаимоотношениями с клиентами, которая автоматизирует продажи, маркетинг и сервис. В отличие от готовых решений (amoCRM, Битрикс24), кастомная CRM разрабатывается под конкретные бизнес-процессы компании и не содержит лишнего функционала.</p>

                        <h3 className={s.seoH3}>Зачем заказывать разработку CRM системы на заказ</h3>
                        <p>Разработка CRM системы на заказ позволяет получить инструмент, идеально подходящий под ваши процессы. Готовые CRM предлагают сотни функций, из которых реально используются 10-20%. За остальное вы платите ежемесячную подписку. Кастомная CRM — эторазовая инвестиция: вы платите за разработку и получаете систему без абонентской платы.</p>
                        <p>Разработка CRM для бизнеса — это не просто «база клиентов». Это полноценная система с воронкой продаж, автоматическими напоминаниями, аналитикой, интеграцией с сайтом, телефонией и мессенджерами. Стоимость разработки CRM окупается за 3-6 месяцев за счёт роста конверсии и экономии на подписках.</p>

                        <h3 className={s.seoH3}>Разработка CRM ERP: комплексный подход</h3>
                        <p>Разработка CRM ERP — это объединение управления клиентами (CRM) с управлением ресурсами предприятия (ERP): склад, финансы, производство, HR. Такой подход создаёт единую экосистему, где данные автоматически текут между отделами. Менеджер создаёт заказ — склад резервирует товар, бухгалтерия формирует счёт, аналитика обновляется в реальном времени.</p>

                        <h3 className={s.seoH3}>Разработка CRM систем для бизнеса: что входит</h3>
                        <p>Разработка CRM систем для бизнеса включает:</p>
                        <ul className={s.seoList}>
                            <li><strong>Воронка продаж</strong> — визуализация этапов сделки, автоматическое перемещение, прогноз выручки</li>
                            <li><strong>Контактная база</strong> — история всех взаимодействий с клиентом: звонки, письма, встречи, заказы</li>
                            <li><strong>Автоматизация</strong> — автоматические письма, напоминания, распределение лидов, скоринг</li>
                            <li><strong>Аналитика и отчёты</strong> — дашборды, конверсия воронки, выручка по менеджерам, ROI рекламы</li>
                            <li><strong>Интеграции</strong> — 1С, телефония (Zadarma, Mango), email, Telegram, WhatsApp, сайт</li>
                            <li><strong>Мобильный доступ</strong> — адаптивный интерфейс для работы с телефона или планшета</li>
                        </ul>

                        <h3 className={s.seoH3}>Разработка CRM стоимость: от чего зависит цена</h3>
                        <p>Разработка CRM стоимость зависит от количества модулей, интеграций и сложности бизнес-логики. Простая CRM с воронкой и контактной базой — от 50 000 ₽. Средняя CRM с аналитикой, интеграциями и ролями — от 150 000 ₽. Комплексная CRM ERP — от 300 000 ₽. После бесплатного аудита вы получаете точную смету с фиксированной ценой.</p>

                        <h3 className={s.seoH3}>Разработка сайтов и CRM: единая экосистема</h3>
                        <p>Разработка сайтов и CRM как единой системы — это максимальная эффективность. Заявки с сайта автоматически попадают в CRM, менеджер видит откуда пришёл клиент, какие страницы смотрел, что интересовало. Это позволяет персонализировать обработку и увеличить конверсию на 30-50%.</p>

                        <h3 className={s.seoH3}>Заказы на разработку CRM: как начать</h3>
                        <p>Заказы на разработку CRM начинаются с бесплатной консультации. Вы описываете свои бизнес-процессы, я предлагаю оптимальную архитектуру и точную смету. Не нужно знать технические термины — я перевожу ваши задачи на язык решений. После согласования — разработка с еженедельными демо, тестирование, запуск и обучение команды.</p>

                        <div className={s.seoInternalLinks}>
                            <h3>Другие наши услуги</h3>
                            <div className={s.seoLinksGrid}>
                                <a href="/razrabotka-botov">Разработка ботов</a>
                                <a href="/razrabotka-servisov">Разработка сервисов</a>
                                <a href="/avtomatizaciya-biznesa">Автоматизация бизнеса</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingStickyCta scrollToFormId="hero-form" label="Обсудить CRM" />
            <PortfolioPopup isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
            <ScrollProgressBar />
            <TelegramFloat />
            <ExitIntentPopup onCtaClick={scrollToForm} />
        </>
    );
}
