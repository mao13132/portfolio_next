import { HeaderProps } from "./Header.props";

import styles from './Header.module.css';
import { Navbar } from "../Navbar/Navbar";
import Link from "next/link";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <header className={styles['header']} {...props}>

            <Link className={styles['logo']} href={`#`}>Portfolio</Link>

            <i className='bx bx-menu' id={styles['menu-icon']}></i>

            <Navbar />

        </header>
    );
};
