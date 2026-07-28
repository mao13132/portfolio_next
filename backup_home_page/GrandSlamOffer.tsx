import { motion } from 'framer-motion';
import { fadeUp, scaleIn } from './animations';
import styles from './landing.module.css';

interface GrandSlamOfferProps {
    scrollToForm: () => void;
}

export const GrandSlamOffer = ({ scrollToForm }: GrandSlamOfferProps) => {
    return (
        <section className={styles.grandSlamSection}>
            <div className={styles.container}>
                <motion.div className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className={styles.sectionTitle}>
                        Почему со мной <span className={styles.textAccent}>выгодно работать</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Я забираю на себя весь объём работ — вам остаётся только получить результат
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div className={styles.comparisonTable} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className={styles.comparisonHeader}>
                        <div className={styles.comparisonLabel} />
                        <div className={styles.comparisonCol}>
                            <span>Другие подрядчики</span>
                        </div>
                        <div className={styles.comparisonColPopular}>
                            <span className={styles.popularBadgeSmall}>★ Лучший выбор</span>
                            <span>Дмитрий Малышев</span>
                        </div>
                    </div>

                    {[
                        { label: 'Бесплатная консультация', other: false, mine: true },
                        { label: 'Бесплатный аудит проекта', other: false, mine: true },
                        { label: 'Помогу понять что вам нужно', other: false, mine: true },
                        { label: 'Установка на ваш сервер', other: 'от 5 000 ₽', mine: true },
                        { label: 'Исходный код — ваши права', other: false, mine: true },
                        { label: 'NDA по запросу', other: 'не всегда', mine: true },
                        { label: 'Бесплатная поддержка', other: '7 дней', mine: '30-90 дней' },
                        { label: 'Обучение команды', other: 'от 10 000 ₽', mine: true },
                        { label: 'Фиксированные сроки в договоре', other: false, mine: true },
                        { label: 'Еженедельные демо', other: false, mine: true },
                    ].map((row, i) => (
                        <motion.div key={i} className={styles.comparisonRow} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.comparisonLabel}>{row.label}</div>
                            <div className={styles.comparisonCell}>
                                {row.other === true && <i className='bx bx-check' />}
                                {row.other === false && <i className='bx bx-x' />}
                                {typeof row.other === 'string' && <span className={styles.comparisonTextMuted}>{row.other}</span>}
                            </div>
                            <div className={styles.comparisonCellHighlight}>
                                {row.mine === true && <i className='bx bx-check' />}
                                {typeof row.mine === 'string' && <span>{row.mine}</span>}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Guarantee Seal */}
                <motion.div className={styles.guaranteeSeal} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className={styles.sealBadge}>
                        <div className={styles.sealInner}>
                            <i className='bx bx-shield' />
                            <span>Гарантия</span>
                        </div>
                    </div>
                    <div className={styles.sealText}>
                        <h3>100% гарантия результата</h3>
                        <p>
                            Если бот/сервис/CRM не работает как описано в ТЗ — исправлю за свой счёт.
                            Бесплатная поддержка 30-90 дней. Полный исходный код. Без скрытых платежей.
                        </p>
                        <button className={styles.sealButton} onClick={scrollToForm}>
                            Обсудить проект бесплатно →
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
