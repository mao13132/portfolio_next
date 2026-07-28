'use client';

import { motion } from 'framer-motion';
import styles from './PainPoints.module.css';
import cn from 'classnames';

interface PainPointsProps {
    className?: string;
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
    }),
};

const pains = [
    {
        icon: 'bx bx-time-five',
        text: 'Тратите часы на рутинные задачи, которые можно автоматизировать?',
    },
    {
        icon: 'bx bx-money-withdraw',
        text: 'Идея есть, но нет разработчика, который бы её реализовал?',
    },
    {
        icon: 'bx bx-message-square-x',
        text: 'Упускаете клиентов, потому что не успеваете отвечать вовремя?',
    },
    {
        icon: 'bx bx-purchase-tag-alt',
        text: 'Пробовали найти подрядчика — но все дорогие или ненадёжные?',
    },
    {
        icon: 'bx bx-error-circle',
        text: 'Уже заказывали разработку, но результат не оправдал ожидания?',
    },
];

export const PainPoints = ({ className }: PainPointsProps): JSX.Element => {
    return (
        <section className={cn(styles['pain-section'], className)} id="pain">

            <motion.div
                className={styles['pain-header']}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <span className={styles['pain-label']}>Узнаёте себя?</span>
                <h2 className={styles['pain-title']}>
                    Эти проблемы <span className={styles['accent']}> знакомы?</span>
                </h2>
                <p className={styles['pain-subtitle']}>
                    Большинство моих клиентов приходят именно с такими ситуациями.
                    И я помогаю их решить.
                </p>
            </motion.div>

            <div className={styles['pain-grid']}>
                {pains.map((pain, i) => (
                    <motion.div
                        key={i}
                        className={styles['pain-card']}
                        variants={fadeUp}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles['pain-icon']}>
                            <i className={pain.icon} />
                        </div>
                        <p className={styles['pain-text']}>{pain.text}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className={styles['pain-cta']}
                variants={fadeUp}
                custom={pains.length}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <p>
                    Если хотя бы один пункт про вас — давайте обсудим.
                    <br />
                    <strong>Бесплатная консультация</strong> — разберём вашу задачу и предложу решение.
                </p>
            </motion.div>

        </section>
    );
};
