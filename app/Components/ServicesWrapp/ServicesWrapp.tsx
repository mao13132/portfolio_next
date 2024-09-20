import { ServicesWrappProps } from "./ServicesWrapp.props";

import styles from './ServicesWrapp.module.css';

import cn from 'classnames';
import { Services } from "./Services/Services";
import { MHeadingTitle } from "../HeadingTitle/HeadingTitle";
import { motion } from "framer-motion";
import { servicesAnimation, titleServiceAnimation } from "./animationsServices";

export const ServicesWrapp = ({ className, ...props }: ServicesWrappProps): JSX.Element => {
    return (
        <section className={cn(className, styles['services'])} id="services" {...props}>

            <motion.div
                initial="hidden"
                whileInView="visible"

                className={styles['block-wrapper']}>

                <MHeadingTitle
                    transition={{ duration: 1 }}
                    variants={titleServiceAnimation}
                    viewport={{ once: true }}

                    title="Мои " spanTitle="навыки" />

                <motion.div
                    variants={servicesAnimation}
                    transition={{ duration: 2 }}
                    viewport={{ once: true }}

                    className={styles['service-container']}>
                    <Services
                        icon="bx bx-paint"
                        title="Graphic Desing"
                        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Quod molestiae, reiciendis dolor impedit ratione iusto nesciunt.
                            Porro quisquam exercitationem, harum numquam recusandae ipsa perspiciatis
                            vitae, laboriosam at rerum impedit! Magni!"
                        link={`#`}
                        textLink="Read More"
                    />

                    <Services
                        icon="bx bx-code-alt"
                        title="Web Development"
                        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Quod molestiae, reiciendis dolor impedit ratione iusto nesciunt.
                            Porro quisquam exercitationem, harum numquam recusandae ipsa perspiciatis
                            vitae, laboriosam at rerum impedit! Magni!"
                        link={`#`}
                        textLink="Read More"
                    />

                    <Services
                        icon="bx bx-bar-chart-alt"
                        title="Digital Marketing"
                        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Quod molestiae, reiciendis dolor impedit ratione iusto nesciunt.
                            Porro quisquam exercitationem, harum numquam recusandae ipsa perspiciatis
                            vitae, laboriosam at rerum impedit! Magni!"
                        link={`#`}
                        textLink="Read More"
                    />


                </motion.div>

            </motion.div>

        </section>
    );
};
