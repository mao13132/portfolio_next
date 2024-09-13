import { PortfolioWrapperProps } from "./PortfolioWrapper.props";

import styles from './PortfolioWrapper.module.css';

import cn from 'classnames';
import { ProjectsPortfolio } from "./ProjectsPortfolio/ProjectsPortfolio";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";

export const PortfolioWrapper = ({ className, ...props }: PortfolioWrapperProps): JSX.Element => {
    return (
        <section className={cn(className, styles['portfolio-wrapper'])} id="portfolio" {...props}>
            
            <HeadingTitle title="Lates" spanTitle="Projects" />

            <div className={styles['container']}>

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

            </div>





        </section>
    );
};
