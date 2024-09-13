import { NavbarProps } from "./Navbar.props";

import styles from './Navbar.module.css';
import Link from "next/link";

export const Navbar = ({ className, ...props }: NavbarProps): JSX.Element => {
    return (
        <nav className={styles['navbar']} {...props}>
            <Link href={`#home`} className={styles['active']}>Home</Link>
            <Link href={`#about`}>About</Link>
            <Link href={`#services`}>Services</Link>
            <Link href={`#portfolio`}>Portfolio</Link> 
            <Link href={`#contact`}>Contact</Link>
        </nav>
    ); 
};
