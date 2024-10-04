import { AuthProps } from "./Auth.props";
import styles from './Auth.module.css';

import cn from 'classnames';


export const Auth = ({ title, children, className, ...props }: AuthProps): JSX.Element => {
    return (
        <div className={cn(className, styles['auth'])} {...props}>

            <div className={styles['auth-wrapper']}>

                <h2>{title}</h2>

                {children}

            </div>
            
        </div>
    );
};
