import { PortfolioWrapperProps } from "./PortfolioWrapper.props";

import styles from './PortfolioWrapper.module.css';

import cn from 'classnames';
import { ProjectsPortfolio } from "./ProjectsPortfolio/ProjectsPortfolio";
import { HeadingTitle, MHeadingTitle } from "../HeadingTitle/HeadingTitle";

import { motion } from "framer-motion";
import { projectsAnimation, titleProjectsAnimation } from "./animationsPortfolio";
import { useContext } from "react";
import { AppContext } from "@/app/Context/app.context";

export const PortfolioWrapper = ({ className, ...props }: PortfolioWrapperProps): JSX.Element => {
    
    const { category } = useContext(AppContext);
    
    return (
        <section className={cn(className, styles['portfolio-wrapper'])} id="portfolio" {...props}>

            <MHeadingTitle
                transition={{ duration: 2 }}
                variants={titleProjectsAnimation}
                initial="hidden"
                whileInView="visible"
                style={{ overflow: 'hidden' }}
                className={styles['title-portfolio']}

                title="Мои работы " spanTitle="по категориям" />

            <motion.div
                transition={{ duration: 2 }}
                variants={projectsAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}

                className={styles['container']}>

                {category && category.map(cat => <ProjectsPortfolio 
                key={cat.id}
                image={cat.image}
                title={cat.title}
                text={cat.description}
                link={`${process.env.NEXT_PUBLIC_BACKEND}/${cat.slug}`}
                icon={cat.icon}

                />)}

                

            </motion.div>



        </section>
    );
};
