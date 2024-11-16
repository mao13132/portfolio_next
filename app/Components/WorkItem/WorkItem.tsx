import { WorkItemProps } from "./WorkItem.props";
import styles from './WorkItem.module.css';

import cn from 'classnames';


export const WorkItem = ({ work, className, ...props }: WorkItemProps): JSX.Element => {
    return (
        <div className={cn(className, styles['work'])} {...props}>

            <div className={styles['title']}>{work.title}</div>
            
            <div className={styles['short-text']}>{work.short_text}</div>

        </div>
    );
};
