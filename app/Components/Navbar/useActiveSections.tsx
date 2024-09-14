import { useEffect } from "react";

import styles from './Navbar.module.css';

export const useActiveSections = () => {

    useEffect(() => {
        let sections = document.querySelectorAll('section');

        let navLinks = document.querySelectorAll('nav a');

        window.onscroll = () => {
            sections.forEach(sec => {

                let top = window.scrollY;

                let offset = sec.offsetTop - 150;

                let height = sec.offsetHeight;

                let id = sec.getAttribute('id');

                if (top >= offset && top < offset + height) {

                    navLinks.forEach(link => {

                        link.classList.remove(styles['active']);

                        document.querySelector('nav a[href*=' + id + ']')?.classList.add(styles['active']);

                    });
                };

            });
        };


    }, []);

};
