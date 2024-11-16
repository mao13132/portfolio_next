import { CategoryPageProps } from "./CategoryPage.props";
import { AppContext } from "@/app/Context/app.context";

import styles from './CategoryPage.module.css';

import cn from 'classnames';
import { useContext } from "react";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { WorkItem } from "../WorkItem/WorkItem";

export const Category = ({ className, ...props }: CategoryPageProps): JSX.Element => {
    const { works, category: categorys, current_category } = useContext(AppContext);

    /* debugger */

    return (
        <div className={cn(className, styles['wrapper'])} {...props}>
            <HeadingTitle title={current_category?.title || ''} spanTitle="" />

            <div className={styles['works-wrapper']}>

                {works && works?.length > 0 && works?.map(work => <WorkItem key={work.id} work={work} />)}
                
            </div>

        </div>
    );
};
