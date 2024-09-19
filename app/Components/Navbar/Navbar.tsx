import { NavbarProps } from "./Navbar.props";

import styles from './Navbar.module.css';
import Link from "next/link";
import { useActiveSections } from "./useActiveSections";

import cn from 'classnames';

export const Navbar = ({ setOpenMenu, openStatus, closeStatus, className, ...props }: NavbarProps): JSX.Element => {

    useActiveSections();

    return (
        <nav className={cn(styles['navbar'], {
            [styles['open']]: openStatus,
            [styles['close']]: closeStatus,
        })} {...props}>
            <Link onClick={() => setOpenMenu(false)} href={`#home`} className={styles['active']}>Главная</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#about`}>Обо мне</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#services`}>Навыки</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#portfolio`}>Примеры работ</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#contact`}>Контакты</Link>
        </nav>
    );
};
