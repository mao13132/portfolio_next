import { ButtonLinkPulseProps } from "./ButtonLinkPulse.props";

import { motion } from "framer-motion";

import styles from './ButtonLinkPulse.module.css';

import cn from 'classnames';
import Link from "next/link";
import { pulseAnimationOne, pulseAnimationThree, pulseAnimationTwo } from "./pulseAnimations";

export const ButtonLinkPulse = ({ link, text, className, ...props }: ButtonLinkPulseProps): JSX.Element => {
    return (
        <Link href={link} className={cn(styles['btn'], className)} {...props}>

            <span className={styles['pulse']} />
            
            <span className={styles['pulse']} />
            
            <span className={styles['pulse']} />

            {text}

        </Link>
    );
};
