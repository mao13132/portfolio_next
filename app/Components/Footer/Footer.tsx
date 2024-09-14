import { FooterProps } from "./Footer.props";

import styles from './Footer.module.css';

import cn from 'classnames';
import Link from "next/link";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles['footer'])} {...props}>

            <div className={styles['text']}>

                <p>Copyright &copy; 2024 by Dmitry | All Rights Reserved.</p>

            </div>

            <div className={styles['iconTop']}>
                <Link href={`#home`}><i className='bx bx-up-arrow-alt'></i></Link>
            </div>

        </footer>
    );
};
