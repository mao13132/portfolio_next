import { WorkPageProps } from "./WorkPage.props";
import { AppContext } from "@/app/Context/app.context";

import styles from './WorkPage.module.css';

import index_styles from '@/app/Components/Index/Idex.module.css';

import cn from 'classnames';
import { useContext } from "react";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { HeaderCategory } from "../HeaderCategory/HeaderCategory";
import { Footer } from "../Footer/Footer";

export const WorkPage = ({ className, ...props }: WorkPageProps): JSX.Element => {
    const { work } = useContext(AppContext);

    return (
        <div className={cn(className, styles['wrapper'])} {...props}>

            <HeaderCategory />

            <div className={cn(index_styles['section'], styles['main'])}>

                <div className={styles['title-row']}>

                    <HeadingTitle className={styles['h1']} title={'Мои работы по категории:'} spanTitle='' />
                    <HeadingTitle className={styles['title']} title='' spanTitle={work?.title || ``} />

                    <div className={styles['description']}>{`описание`}</div>

                </div>

              

            </div>

            <Footer className={styles['footer']} />

        </div>
    );
};
