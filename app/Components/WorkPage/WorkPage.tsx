import { WorkPageProps } from "./WorkPage.props";
import { AppContext } from "@/app/Context/app.context";

import styles from './WorkPage.module.css';

import index_styles from '@/app/Components/Index/Idex.module.css';

import cn from 'classnames';
import { useContext } from "react";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { HeaderCategory } from "../HeaderCategory/HeaderCategory";
import { Footer } from "../Footer/Footer";
import { Contacts } from "../Contacts/Contacts";
import { motion } from 'framer-motion';
import { descriptionsAnimation } from "./animationsDescriptions";

export const WorkPage = ({ className, ...props }: WorkPageProps): JSX.Element => {
    const { work } = useContext(AppContext);

    return (
        <div className={cn(className, styles['wrapper'])} {...props}>

            <HeaderCategory />

            <div className={cn(index_styles['section'], styles['main'])}>

                <div className={styles['title-row']}>
                    <HeadingTitle className={styles['title']} title='' spanTitle={work?.title || ``} />

                    <div className={styles['text']}>{work?.text || ``}</div>

                </div>

                <div className={styles['video-wrapper']}>
                    <iframe className={styles['video']} src={work?.video} frameBorder="0" allow="clipboard-write; autoplay" allowFullScreen></iframe>
                </div>

                <motion.div
                    transition={{ duration: 1 }}
                    variants={descriptionsAnimation}
                    initial="hidden"
                    whileInView="visible"
                    className={styles['desc-wrapper']}>

                    <div className={styles['descriptions']} dangerouslySetInnerHTML={{ __html: work?.descriptions || `` }} />
                </motion.div>

            </div>

            <Contacts className={styles['section']} />

            <Footer className={styles['footer']} />

        </div>
    );
};
