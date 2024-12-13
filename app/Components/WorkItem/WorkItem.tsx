import { WorkItemProps } from "./WorkItem.props";
import styles from './WorkItem.module.css';

import Image from "next/image";

import cn from 'classnames';


export const WorkItem = ({ work, className, ...props }: WorkItemProps): JSX.Element => {


    return (
        <div className={cn(className, styles['work'])} {...props}>

            {work.image && <Image src={work.image}
                alt=""
                width={100}
                height={100}
                style={{ objectFit: 'cover' }}
                sizes="100" />}

            <div className={styles['layer']}>

                <div className={styles['text-wrapper']}>

                    <div className={styles['title']}>{work.title}</div>

                    <div className={styles['short-text']}>{work.short_text}</div>
                    
                </div>


            </div>


        </div>
    );
};
