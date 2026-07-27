import { useState, useEffect } from 'react';
import styles from './landing.module.css';

interface NavLink {
    href: string;
    label: string;
}

interface LandingHeaderProps {
    navLinks: NavLink[];
}

export const LandingHeader = ({ navLinks }: LandingHeaderProps) => {
    const [solid, setSolid] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handler = () => setSolid(window.scrollY > 50);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header className={`${styles.header} ${solid ? styles.headerSolid : ''}`}>
            <div className={styles.headerInner}>
                <a href="/" className={styles.logo}>
                    <span className={styles.logoAccent}>D</span>imaRazrab
                </a>

                <nav className={`${styles.nav} ${mobileMenu ? styles.navOpen : ''}`}>
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.href} onClick={() => setMobileMenu(false)}>
                            {link.label}
                        </a>
                    ))}
                </nav>

                <a href="tel:+79648325336" className={styles.headerPhone}>
                    <i className='bx bx-phone' />
                    Связаться
                </a>

                <button
                    className={styles.burger}
                    onClick={() => setMobileMenu(!mobileMenu)}
                    aria-label="Меню"
                >
                    <span /><span /><span />
                </button>
            </div>
        </header>
    );
};
