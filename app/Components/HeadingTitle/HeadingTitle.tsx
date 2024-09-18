import styles from './HeadingTitle.module.css';

import cn from 'classnames';
import { HeadingTitleProps } from './HeadingTitle.props';

import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';

export const HeadingTitle = forwardRef(({ spanTitle, title, className, ...props }: HeadingTitleProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <h2 ref={ref} className={cn(className, styles["heading"])} {...props}>{title}<span>{spanTitle}</span></h2>
    );
});

export const MHeadingTitle = motion(HeadingTitle);
