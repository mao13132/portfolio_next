import { ForwardedRef, forwardRef } from "react";
import { InputAuthProps } from "./InputAuth.props";

import styles from './InputAuth.module.css';

import cn from 'classnames';

export const InputAuth = forwardRef(({ type, error, icon, className, ...props }: InputAuthProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={cn(className, styles['wrapper-input'])} {...props}>

            <i className={`bx ${icon}`} ></i>

            <input className={cn({
                [styles['input']]: type !== 'checkbox',
            })} type={type} id="input" placeholder={type} ref={ref} />

            {error && <div className={styles['error']}>{error}</div>}

        </div>
    );
});

InputAuth.displayName = 'InputAuth';
