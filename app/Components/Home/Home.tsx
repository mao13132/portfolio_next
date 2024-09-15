import { HomeProps } from "./Home.props";
import styles from './Home.module.css';
import { SocialMedia } from "../SocialMedia/SocialMedia";
import Image from "next/image";
import Typed from 'typed.js';

import cn from 'classnames';
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { useEffect, useRef } from "react";


export const Home = ({ className, ...props }: HomeProps): JSX.Element => {
    const multiText = useRef(null);

    useEffect(() => {
        const typed = new Typed(multiText.current, {
            strings: ['Frontend разработчик', 'разработчик Telegram ботов', 'Backend разработчик', 'SEO оптимизатор', 'Маркетплейс автоматизатор'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed.destroy();
        }
    }, []);

    return (
        <section {...props} className={cn(styles['home'], className)} id="home">

            <div className={styles['home-content']}>
                <h3>Hello, It's Me</h3>

                <h1>Dmitry Malyshev <span>Full Stack Developer</span></h1>

                <h3>Я <span className={styles['move-h3']} ref={multiText}></span></h3>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat dolore ea unde nulla voluptatibus quos delectus quam doloremque, debitis eligendi tenetur veniam aliquid repudiandae? Aliquid expedita deserunt
                    itaque aspernatur omnis.</p>

                <SocialMedia />

                <ButtonLink link={`#`} text={`Donwloan CV`} />

            </div>

            <div className={styles['home-img']}>

                <Image src={`/home.png`}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

            </div>

        </section>
    );
};
