import styles from './HeadingTitle.module.css';

import cn from 'classnames';
import { HeadingTitleProps } from './HeadingTitle.props';

export const HeadingTitle = ({ spanTitle, title, className, ...props }: HeadingTitleProps): JSX.Element => {
    return (

        <h2 className={cn(className, styles["heading"])} {...props}>{title}<span>{spanTitle}</span></h2>
    );
};
