import { ButtonAuthProps } from "./ButtonAuth.props";

import styles from './ButtonAuth.module.css';

import cn from 'classnames';

export const ButtonAuth = ({ title, className, ...props }: ButtonAuthProps): JSX.Element => {
    return (
        <button type="submit" className={cn(className, styles['btn-auth'])} {...props}>
            {title}
        </button>
    );
};
