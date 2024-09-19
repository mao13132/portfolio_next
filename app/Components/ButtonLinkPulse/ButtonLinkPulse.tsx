import { ButtonLinkPulseProps } from "./ButtonLinkPulse.props";

import styles from './ButtonLinkPulse.module.css';

import cn from 'classnames';
import Link from "next/link";

export const ButtonLinkPulse = ({ link, text, className }: ButtonLinkPulseProps): JSX.Element => {
    return (
        <Link href={link} className={cn(styles['btn'], className)}>

            <span className={styles['pulse']} />

            <span className={styles['pulse']} />

            <span className={styles['pulse']} />

            {text}

        </Link>
    );
};
