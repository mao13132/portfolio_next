import { PortfolioWrapperProps } from "./PortfolioWrapper.props";

import styles from './PortfolioWrapper.module.css';

import cn from 'classnames';
import { ProjectsPortfolio } from "./ProjectsPortfolio/ProjectsPortfolio";
import { HeadingTitle, MHeadingTitle } from "../HeadingTitle/HeadingTitle";

import { motion } from "framer-motion";
import { projectsAnimation, titleProjectsAnimation } from "./animationsPortfolio";

export const PortfolioWrapper = ({ className, ...props }: PortfolioWrapperProps): JSX.Element => {
    return (
        <section className={cn(className, styles['portfolio-wrapper'])} id="portfolio" {...props}>

            <MHeadingTitle
                transition={{ duration: 2 }}
                variants={titleProjectsAnimation}
                initial="hidden"
                whileInView="visible"

                title="Lates" spanTitle="Projects" />

            <motion.div
                transition={{ duration: 2 }}
                variants={projectsAnimation}
                initial="hidden"
                whileInView="visible"

                className={styles['container']}>

                <ProjectsPortfolio
                    image={`/1.jpg`}
                    title="Web Dising"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ut non alias adipisci molestias? Dolores iste totam vitae atque, necessitatibus, quia, itaque a dolorem explicabo dolor animi asperiores quam cumque?"
                    link="#"
                    icon='bx bx-link-external'
                />

                <ProjectsPortfolio
                    image={`/2.jpg`}
                    title="Web Dising"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ut non alias adipisci molestias? Dolores iste totam vitae atque, necessitatibus, quia, itaque a dolorem explicabo dolor animi asperiores quam cumque?"
                    link="#"
                    icon='bx bx-link-external'
                />

                <ProjectsPortfolio
                    image={`/3.jpg`}
                    title="Web Dising"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ut non alias adipisci molestias? Dolores iste totam vitae atque, necessitatibus, quia, itaque a dolorem explicabo dolor animi asperiores quam cumque?"
                    link="#"
                    icon='bx bx-link-external'
                />

                <ProjectsPortfolio
                    image={`/3.jpg`}
                    title="Web Dising"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ut non alias adipisci molestias? Dolores iste totam vitae atque, necessitatibus, quia, itaque a dolorem explicabo dolor animi asperiores quam cumque?"
                    link="#"
                    icon='bx bx-link-external'
                />

                <ProjectsPortfolio
                    image={`/3.jpg`}
                    title="Web Dising"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ut non alias adipisci molestias? Dolores iste totam vitae atque, necessitatibus, quia, itaque a dolorem explicabo dolor animi asperiores quam cumque?"
                    link="#"
                    icon='bx bx-link-external'
                />

                <ProjectsPortfolio
                    image={`/3.jpg`}
                    title="Web Dising"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione ut non alias adipisci molestias? Dolores iste totam vitae atque, necessitatibus, quia, itaque a dolorem explicabo dolor animi asperiores quam cumque?"
                    link="#"
                    icon='bx bx-link-external'
                />

            </motion.div>





        </section>
    );
};
