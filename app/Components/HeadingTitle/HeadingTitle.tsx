import styles from './HeadingTitle.module.css';

import cn from 'classnames';
import { HeadingTitleProps } from './HeadingTitle.props';

import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';

export const HeadingTitle = forwardRef(({ spanTitle, title, className, tag = 'h2', ...props }: HeadingTitleProps, ref: ForwardedRef<HTMLHeadingElement>): JSX.Element => {
    const Tag = tag;
    return (
        <Tag ref={ref} className={cn(className, styles["heading"])} {...props}>{title}<span>{spanTitle}</span></Tag>
    );
});

export const MHeadingTitle = motion(HeadingTitle);
