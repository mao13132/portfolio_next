import { NavbarProps } from "./Navbar.props";

import styles from './Navbar.module.css';
import Link from "next/link";
import { useActiveSections } from "./useActiveSections";

import cn from 'classnames';

export const Navbar = ({ setOpenMenu, openStatus, className, ...props }: NavbarProps): JSX.Element => {

    useActiveSections();

    return (
        <nav className={cn(styles['navbar'], {
            [styles['active']]: openStatus,
        })} {...props}>
            <Link onClick={() => setOpenMenu(false)} href={`#home`} className={styles['active']}>Home</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#about`}>About</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#services`}>Services</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#portfolio`}>Portfolio</Link>
            <Link onClick={() => setOpenMenu(false)} href={`#contact`}>Contact</Link>
        </nav>
    );
};
