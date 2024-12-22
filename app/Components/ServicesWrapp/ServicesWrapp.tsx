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
                        icon="bx bxl-telegram"
                        title="Любая логика в TG"
                        text="Создаю умных и надёжных помощников для бизнеса. 
                        Будь то автоматизация заказов, уведомления, интеграция с CRM или что-то уникальное – ваш бот будет работать безупречно"
                        link={`#portfolio`}
                        textLink="Кейсы"
                    />

                    <Services
                        icon="bx bxs-store-alt"
                        title="Автоматизация маркетплейсов"
                        text="Оптимизирую управление вашим магазином на маркетплейсах, автоматизирую сбор аналитики, управление заказами и даже работу с отзывами. 
                        Всё, чтобы вы фокусировались на масштабировании бизнеса"
                        link={`#portfolio`}
                        textLink="Кейсы"
                    />

                    <Services
                        icon="bx bxs-planet"
                        title="Сервисы. Сайты"
                        text="Разрабатываю современные и быстрые веб-приложения, которые привлекают клиентов и увеличивают конверсию"
                        link={`#portfolio`}
                        textLink="Кейсы"
                    />


                </motion.div>

            </motion.div>

        </section>
    );
};
