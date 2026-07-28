import { HomeProps } from "./Home.props";
import styles from './Home.module.css';
import { SocialMedia } from "../SocialMedia/SocialMedia";
import Image from "next/image";

import { motion } from "framer-motion";

import cn from 'classnames';
import { ButtonLinkPulse } from "../ButtonLinkPulse/ButtonLinkPulse";
import { HomeParticles } from "./HomeParticles";
import { fadeUp } from "./animationHome";


export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
    return (
        <section {...props} className={cn(styles['home'], className)} id="home">

            {/* Particles background */}
            <HomeParticles />

            {/* Glow orbs */}
            <div className={styles['glow-1']} />
            <div className={styles['glow-2']} />

            <motion.div
                transition={{ duration: 1 }}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}

                className={styles['home-content']}
            >
                <motion.div
                    className={styles['badge']}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    variants={fadeUp}
                >
                    <span className={styles['badge-dot']} />
                    Бесплатная консультация · Ответ за 2 часа
                </motion.div>

                <motion.h1
                    transition={{ duration: 1, delay: 0.3 }}
                    variants={fadeUp}
                    className={styles['hero-title']}
                >
                    Есть идея?{' '}
                    <span className={styles['gradient-text']}>Превращу</span>
                    <br />
                    в работающий продукт
                </motion.h1>

                <motion.p
                    transition={{ duration: 1, delay: 0.5 }}
                    variants={fadeUp}
                    className={styles['hero-subtitle']}
                >
                    Разрабатываю Telegram-боты, сайты, сервисы и любые IT-решения под ключ.
                    Расскажите, что вы хотите — я скажу, как это сделать и сколько стоит.
                </motion.p>

                <motion.div
                    className={styles['stats-row']}
                    transition={{ duration: 1, delay: 0.7 }}
                    variants={fadeUp}
                >
                    <div className={styles['stat']}>
                        <span className={styles['stat-number']}>500+</span>
                        <span className={styles['stat-label']}>проектов</span>
                    </div>
                    <div className={styles['stat-divider']} />
                    <div className={styles['stat']}>
                        <span className={styles['stat-number']}>14</span>
                        <span className={styles['stat-label']}>дней средний срок</span>
                    </div>
                    <div className={styles['stat-divider']} />
                    <div className={styles['stat']}>
                        <span className={styles['stat-number']}>30</span>
                        <span className={styles['stat-label']}>дней поддержки</span>
                    </div>
                </motion.div>

                <motion.div
                    className={styles['actions']}
                    transition={{ duration: 1, delay: 0.9 }}
                    variants={fadeUp}
                >
                    <div className={styles['btns']}>
                        <ButtonLinkPulse link={`#contact`} text={`Обсудить проект бесплатно`} />
                        <ButtonLinkPulse link={`#portfolio`} text={`Посмотреть работы`} />
                    </div>

                    <SocialMedia />
                </motion.div>

            </motion.div>

            <motion.div
                transition={{ duration: 1.2, delay: 0.4 }}
                initial="hidden"
                whileInView="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                }}

                className={styles['home-img']}>

                <Image src={`/home.png`}
                    priority
                    alt="Разработка IT-решений"
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

            </motion.div>

        </section>
    );
};
