import { CategoryPageProps } from "./CategoryPage.props";
import { AppContext } from "@/app/Context/app.context";

import styles from './CategoryPage.module.css';

import index_styles from '@/app/Components/Index/Idex.module.css';

import cn from 'classnames';
import { useContext } from "react";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { WorkItem } from "../WorkItem/WorkItem";
import { HeaderCategory } from "../HeaderCategory/HeaderCategory";
import { Footer } from "../Footer/Footer";

export const Category = ({ className, ...props }: CategoryPageProps): JSX.Element => {
    const { works, current_category } = useContext(AppContext);

    return (
        <div className={cn(className, styles['wrapper'])} {...props}>

            <HeaderCategory />

            <div className={cn(index_styles['section'], styles['main'])}>

                <div className={styles['title-row']}>

                    <HeadingTitle className={styles['h1']} title={'Мои работы по категории:'} spanTitle='' />
                    <HeadingTitle className={styles['title']} title='' spanTitle={current_category?.title || ''} />

                    <div className={styles['description']}>{current_category?.description}</div>

                </div>

                <div className={styles['works-wrapper']} >

                    {works && (works?.length > 0 && works?.map(work => <WorkItem key={work.id} work={work} />))}

                </div>

            </div>

            <Footer className={styles['footer']} />

        </div>
    );
};
