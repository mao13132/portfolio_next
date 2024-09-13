import { ButtonLinkProps } from "./ButtonLink.props";

import styles from './ButtonLink.module.css';

import cn from 'classnames';
import Link from "next/link";

export const ButtonLink = ({ link, text, className }: ButtonLinkProps): JSX.Element => {
    return (
        <Link href={link} className={cn(styles['btn'], className)}>
            {text}
        </Link>

    );
};
