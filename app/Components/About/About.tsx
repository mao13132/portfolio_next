import { AboutProps } from "./About.props";

import styles from './About.module.css';

import cn from 'classnames';
import Image from "next/image";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { HeadingTitle, MHeadingTitle } from "../HeadingTitle/HeadingTitle";

import { motion } from "framer-motion";
import { ImageAboutAnimation, textAboutAnimation, titleAboutAnimation } from "./animationAbout";

export const About = ({ className, ...props }: AboutProps): JSX.Element => {
    return (
        <section className={cn(className, styles['about'])} {...props} id="about">

            <motion.div
                transition={{ duration: 1 }}
                variants={ImageAboutAnimation}
                initial="hidden"
                whileInView="visible"

                className={styles['about-img']}>

                <Image src={`/home2.png`}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

            </motion.div>

            <motion.div
                transition={{ duration: 1 }}
                variants={textAboutAnimation}
                initial="hidden"
                whileInView="visible"

                className={styles['content']}>

                <MHeadingTitle
                    transition={{ duration: 1.3 }}
                    variants={titleAboutAnimation}
                    style={{ overflow: 'hidden' }}

                    title="Почему стоит выбрать "
                    spanTitle="меня" />

                <h3>Комплексный подход</h3>

                <p>Я не просто выполняю задачи, а понимаю ваш бизнес и предлагаю решения, которые работают</p>

                <h3>Скорость и качество</h3>

                <p>Ваш проект будет готов вовремя и на высоком уровне</p>

                <h3>Прозрачность</h3>

                <p>Всегда держу вас в курсе прогресса, доступен для обсуждений и корректировок</p>

                <h3>Результат, который окупается</h3>

                <p>Работая со мной, вы получаете не только исполнителя, но и партнёра, который заботится о вашем успехе</p>

                <div className={styles['about-btn']}><ButtonLink link={`#portfolio`} text={`Мои кейсы`} /></div>


            </motion.div>

        </section>
    );
};
