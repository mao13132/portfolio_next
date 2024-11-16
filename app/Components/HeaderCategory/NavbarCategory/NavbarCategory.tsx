import { NavbarCategoryProps } from "./NavbarCategory.props";

import styles from './NavbarCategory.module.css';
import Link from "next/link";

import cn from 'classnames';
import { useContext } from "react";
import { AppContext } from "@/app/Context/app.context";

export const NavbarCategory = ({ setOpenMenu, openStatus, closeStatus, className, ...props }: NavbarCategoryProps): JSX.Element => {

    const { category, slug } = useContext(AppContext);

    return (
        <nav className={cn(styles['navbar'], {
            [styles['open']]: openStatus,
            [styles['close']]: closeStatus,
        })} {...props}>
            {category.length > 0 &&
                category.map((cat, idx) => <Link key={idx} onClick={
                    () => setOpenMenu(false)} href={`/category/${cat.slug}`} className={cn(
                        {
                            [styles['active']]: slug === cat.slug,
                        }
                    )}>{cat.title}</Link>)}

        </nav>
    );
};
