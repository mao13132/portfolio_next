import { ProjectsPortfolioProps } from "./ProjectsPortfolio.props";

import styles from './ProjectsPortfolio.module.css';

import cn from 'classnames';
import Image from "next/image";
import Link from "next/link";

export const ProjectsPortfolio = ({ icon, image, link, text, title, className, ...props }: ProjectsPortfolioProps): JSX.Element => {
    return (
        <div className={cn(className, styles["box"])} {...props}>
            <Link href={link} className={styles['wrapp']}>
                <Image src={image}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

                <div className={styles['layer']}>
                        <h4>{title}</h4>

                        {/* <p>{text}</p>

                        <i className={icon} ></i> */}

                </div>
            </Link>
        </div>
    );
};
