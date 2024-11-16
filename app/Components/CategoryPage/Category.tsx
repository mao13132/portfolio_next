import { CategoryPageProps } from "./CategoryPage.props";
import { AppContext } from "@/app/Context/app.context";

import styles from './CategoryPage.module.css';

import index_styles from '@/app/Components/Index/Idex.module.css';

import cn from 'classnames';
import { useContext } from "react";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { WorkItem } from "../WorkItem/WorkItem";
import { HeaderCategory } from "../HeaderCategory/HeaderCategory";

export const Category = ({ className, ...props }: CategoryPageProps): JSX.Element => {
    const { works, current_category } = useContext(AppContext);

    return (
        <div className={cn(className, styles['wrapper'])} {...props}>

            <HeaderCategory />

            <div className={cn(index_styles['section'], styles['main'])}>

                <HeadingTitle className={styles['h1']} title={``} spanTitle={current_category?.title || ''} />

                <div className={styles['works-wrapper']} >

                    {works && works?.length > 0 && works?.map(work => <WorkItem key={work.id} work={work} />)}

                </div>

            </div>

        </div>
    );
};
