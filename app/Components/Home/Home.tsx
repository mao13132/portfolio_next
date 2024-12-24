import { HomeProps } from "./Home.props";
import styles from './Home.module.css';
import { SocialMedia } from "../SocialMedia/SocialMedia";
import Image from "next/image";
import Typed from 'typed.js';

import { motion } from "framer-motion";

import cn from 'classnames';
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { useEffect, useRef } from "react";
import { imageHomeAnimation, nameTextAnimation, otherTextAnimation, textBlockAnimation } from "./animationHome";
import { ButtonLinkPulse } from "../ButtonLinkPulse/ButtonLinkPulse";



export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
    const multiText = useRef(null);

    useEffect(() => {
        const typed = new Typed(multiText.current, {
            strings: ['разработчик Telegram ботов', 'маркетплейс автоматизатор', 'Backend разработчик', 'Frontend разработчик', 'SEO оптимизатор'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed.destroy();
        }
    }, []);

    return (
        <section {...props} className={cn(styles['home'], className)} id="home">

            <motion.div
                transition={{ duration: 1 }}
                initial="hidden"
                whileInView="visible"

                variants={textBlockAnimation}

                className={styles['home-content']}
            >
                <h3 className={styles['hello']}>Приветствую, меня зовут</h3>

                <motion.h1

                    transition={{ duration: 1.2 }}
                    variants={nameTextAnimation}
                >Дмитрий Малышев</motion.h1>

                <div className={styles['multi-wrapper']}>
                    <motion.h3>Я <span className={styles['move-h3']} ref={multiText}></span></motion.h3>
                </div>

                <motion.p
                    transition={{ duration: 1.2 }}
                    variants={otherTextAnimation}
                    className={styles['text']}

                >Профессиональный разработчик с опытом создания высокоэффективных и удобных решений, которые экономят ваше время и деньги. Погружаюсь в задачи бизнеса и создаю инструменты, которые приносят результат</motion.p>

                <div className={styles['actions']}>

                    <SocialMedia />

                    <ButtonLinkPulse link={`#contact`} text={`Написать мне`} />

                </div>


            </motion.div>

            <motion.div
                transition={{ duration: 1.2 }}
                initial="hidden"
                whileInView="visible"
                variants={imageHomeAnimation}

                className={styles['home-img']}>

                <Image src={`/home.png`}
                    priority
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

            </motion.div>

        </section>
    );
};
