import { HeaderProps } from "./Header.props";

import styles from './Header.module.css';
import { Navbar } from "../Navbar/Navbar";
import Link from "next/link";

import cn from 'classnames';
import { useEffect, useState } from "react";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const [classStiky, setClassStiky] = useState<boolean>(false);

    useEffect(() => {

        const activeStiky = function () {

            if (window.scrollY > 100) {
                setClassStiky(true);
            } else {
                setClassStiky(false);
            }

        };

        window.addEventListener('scroll', activeStiky);

        return function () {
            window.removeEventListener('scroll', activeStiky);
        };

    }, []);

    return (
        <header className={cn(styles['header'], {
            [styles['sticky']]: classStiky,
        })} {...props}>

            <Link className={styles['logo']} href={`#`}>Portfolio</Link>

            <i
                onClick={() => { setOpenMenu(oldState => !oldState) }}
                className={cn({
                    'bx bx-menu': !openMenu,
                    'bx bx-x': openMenu
                })}
                id={styles['menu-icon']}
            ></i>

            <Navbar setOpenMenu={setOpenMenu} openStatus={openMenu} />

        </header>
    );
};
