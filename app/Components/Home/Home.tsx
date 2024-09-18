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



export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
    const multiText = useRef(null);

    useEffect(() => {
        const typed = new Typed(multiText.current, {
            strings: ['Frontend разработчик', 'разработчик Telegram ботов', 'Backend разработчик', 'SEO оптимизатор', 'Маркетплейс автоматизатор'],
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
                <h3>Hello, It's Me</h3>

                <motion.h1

                    transition={{ duration: 1.2 }}
                    variants={nameTextAnimation}
                >Dmitry Malyshev</motion.h1>

                <motion.h3>Я <span className={styles['move-h3']} ref={multiText}></span></motion.h3>

                <motion.p
                    transition={{ duration: 1.2 }}
                    variants={otherTextAnimation}
                >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat dolore ea unde nulla voluptatibus quos delectus quam doloremque, debitis eligendi tenetur veniam aliquid repudiandae? Aliquid expedita deserunt
                    itaque aspernatur omnis.</motion.p>

                <SocialMedia />

                <ButtonLink link={`#`} text={`Donwloan CV`} />

            </motion.div>

            <motion.div
                transition={{ duration: 1 }}
                initial="hidden"
                whileInView="visible"
                variants={imageHomeAnimation}

                className={styles['home-img']}>

                <Image src={`/home.png`}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

            </motion.div>

        </section>
    );
};
