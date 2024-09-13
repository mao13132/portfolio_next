import { AboutProps } from "./About.props";

import styles from './About.module.css';

import cn from 'classnames';
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink/ButtonLink";

export const About = ({ className, ...props }: AboutProps): JSX.Element => {
    return (
        <section className={cn(className, styles['about'])} {...props} id="about">

            <div className={styles['about-img']}>

                <Image src={`/home.png`}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                    sizes="100" />

            </div>

            <div className={styles['content']}>

                <h2 className={styles['heading']}>About <span>Me</span></h2>

                <h3>Frontend Developer</h3>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Hic, ratione delectus nostrum enim laudantium nam quod quo
                    quos est incidunt iure velit dolore amet quam blanditiis consequuntur sunt vero asperiores!
                </p>

                <ButtonLink link={`#`} text={`Read More`} />

            </div>

        </section>
    );
};
