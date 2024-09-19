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

                    title="Обо "
                    spanTitle="мне" />

                <h3>Full-stack Developer</h3>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Hic, ratione delectus nostrum enim laudantium nam quod quo
                    quos est incidunt iure velit dolore amet quam blanditiis consequuntur sunt vero asperiores!
                </p>

                <div className={styles['about-btn']}><ButtonLink link={`#`} text={`Read More`} /></div>


            </motion.div>

        </section>
    );
};
