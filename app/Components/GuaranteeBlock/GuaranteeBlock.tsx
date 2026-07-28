'use client';

import { motion } from 'framer-motion';
import styles from './GuaranteeBlock.module.css';
import cn from 'classnames';

interface GuaranteeBlockProps {
    className?: string;
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' }
    }),
};

const guarantees = [
    {
        icon: 'bx bx-shield-quarter',
        title: 'Исправлю за свой счёт',
        text: 'Если в течение 30 дней после сдачи что-то пойдёт не так по ТЗ — исправлю бесплатно',
    },
    {
        icon: 'bx bx-conversation',
        title: 'Консультации включены',
        text: 'Отвечу на любые вопросы по проекту. Обучу вас и команду работе с готовым продуктом',
    },
    {
        icon: 'bx bx-code-alt',
        title: 'Полный исходный код',
        text: 'Весь код — ваш. Никаких скрытых подписок, лицензий или привязок ко мне как разработчику',
    },
    {
        icon: 'bx bx-timer',
        title: 'Соблюдение сроков',
        text: 'Фиксированные сроки в договоре. Если задержка по моей вине — скидка 10%',
    },
];

export const GuaranteeBlock = ({ className }: GuaranteeBlockProps): JSX.Element => {
    return (
        <section className={cn(styles['guarantee-section'], className)} id="guarantee">

            {/* Neon glow effects */}
            <div className={styles['neon-glow-left']} />
            <div className={styles['neon-glow-right']} />

            <div className={styles['guarantee-container']}>

                <motion.div
                    className={styles['guarantee-header']}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className={styles['shield-wrapper']}>
                        <div className={styles['shield-ring']} />
                        <div className={styles['shield-ring-2']} />
                        <i className='bx bx-shield' />
                    </div>

                    <h2 className={styles['guarantee-title']}>
                        Моя <span className={styles['neon-text']}>гарантия</span> вам
                    </h2>
                    <p className={styles['guarantee-subtitle']}>
                        Я настолько уверен в качестве своей работы, что даю простую гарантию:
                        <strong> работает — вы получаете результат. Не работает — я исправляю за свой счёт.</strong>
                    </p>
                </motion.div>

                <div className={styles['guarantee-main']}>

                    {/* Big neon number */}
                    <motion.div
                        className={styles['neon-number-block']}
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles['neon-number']}>30</div>
                        <div className={styles['neon-number-label']}>дней бесплатной<br />поддержки</div>
                        <div className={styles['neon-line']} />
                    </motion.div>

                    {/* Guarantee cards */}
                    <div className={styles['guarantee-grid']}>
                        {guarantees.map((item, i) => (
                            <motion.div
                                key={i}
                                className={styles['guarantee-card']}
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className={styles['card-icon']}>
                                    <i className={item.icon} />
                                </div>
                                <div className={styles['card-content']}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom tagline */}
                <motion.div
                    className={styles['risk-tagline']}
                    variants={fadeUp}
                    custom={guarantees.length + 1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className={styles['tagline-inner']}>
                        <i className='bx bx-check-circle' />
                        <span>Вы ничем не рискуете. <strong>Риск на мне.</strong></span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
