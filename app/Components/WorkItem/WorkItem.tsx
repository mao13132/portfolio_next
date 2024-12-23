import { WorkItemProps } from "./WorkItem.props";
import styles from './WorkItem.module.css';

import Image from "next/image";

import cn from 'classnames';
import Link from "next/link";


export const WorkItem = ({ work, className, ...props }: WorkItemProps): JSX.Element => {


    return (
        <div className={cn(className, styles['work'])} {...props}>
            <Link href={`${process.env.NEXT_PUBLIC_FRONTEND}/work/${work.slug}`} className={styles['work']}>

                {work.image && <Image src={`${process.env.NEXT_PUBLIC_FRONTEND}/${work.image}`}
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
            </Link>

        </div>
    );
};
