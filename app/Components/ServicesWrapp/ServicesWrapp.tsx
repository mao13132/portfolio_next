import { ServicesWrappProps } from "./ServicesWrapp.props";

import styles from './ServicesWrapp.module.css';

import cn from 'classnames';
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { Services } from "./Services/Services";

export const ServicesWrapp = ({ className, ...props }: ServicesWrappProps): JSX.Element => {
    return (
        <section className={cn(className, styles['services'])} {...props}>

            <h2 className={styles['heading']}>Our <span>Services</span></h2>

            <div className={styles['service-container']}>
                <Services
                    icon="bx bx-paint"
                    title="Graphic Desing"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Quod molestiae, reiciendis dolor impedit ratione iusto nesciunt.
                        Porro quisquam exercitationem, harum numquam recusandae ipsa perspiciatis
                        vitae, laboriosam at rerum impedit! Magni!"
                    link={`#`}
                    textLink="Read More"
                />

                <Services
                    icon="bx bx-code-alt"
                    title="Web Development"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Quod molestiae, reiciendis dolor impedit ratione iusto nesciunt.
                        Porro quisquam exercitationem, harum numquam recusandae ipsa perspiciatis
                        vitae, laboriosam at rerum impedit! Magni!"
                    link={`#`}
                    textLink="Read More"
                />

                <Services
                    icon="bx bx-bar-chart-alt"
                    title="Digital Marketing"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Quod molestiae, reiciendis dolor impedit ratione iusto nesciunt.
                        Porro quisquam exercitationem, harum numquam recusandae ipsa perspiciatis
                        vitae, laboriosam at rerum impedit! Magni!"
                    link={`#`}
                    textLink="Read More"
                />


            </div>

        </section>
    );
};
