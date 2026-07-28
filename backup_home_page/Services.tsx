import { ServicesProps } from "./Services.props";

import styles from './Services.module.css';

import cn from 'classnames';
import { ButtonLink } from "../../ButtonLink/ButtonLink";

export const Services = ({ icon, link, text, textLink, title, className, ...props }: ServicesProps): JSX.Element => {
    return (
        <div className={cn(className, styles['service-box'])} {...props}>
            <i className={icon}></i>

            <h3>{title}</h3>

            <p>
                {text}
            </p>

            <ButtonLink link={link} text={textLink} />
        </div>
    );
};
