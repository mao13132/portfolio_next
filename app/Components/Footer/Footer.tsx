import { FooterProps } from "./Footer.props";

import styles from './Footer.module.css';

import cn from 'classnames';
export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles['footer'])} {...props}>

            <div className={styles['text']}>

                <p>Copyright &copy; 2025 by Dmitry | All Rights Reserved.</p>

            </div>

            <div className={styles['iconTop']}>

                <i onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className={cn('bx bx-up-arrow-alt', styles['btn'])}></i>

            </div>

        </footer>
    );
};
