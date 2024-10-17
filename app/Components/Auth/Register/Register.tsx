import { RegisterProps } from "./Register.props";
import styles from './Register.module.css';

import cn from 'classnames';
import { Auth } from "../Auth";
import { InputAuth } from "../InputAuth/InputAuth";
import Link from "next/link";
import { ButtonAuth } from "../ButtonAuth/ButtonAuth";


export const Register = ({ className, ...props }: RegisterProps): JSX.Element => {
    return (
        <Auth
            title="Регистрация"
        >

            <div className={cn(className, styles['register'])} {...props}>

                <div className={styles['input-container']}>

                    <InputAuth
                        type="email"
                        icon="bx-envelope"
                    /* error={`Обязателен для заполнения`} */
                    />

                    <InputAuth
                        type="password"
                        icon="bx-lock-alt"
                    /* error={`Обязателен для заполнения`} */
                    />

                </div>
                
                <ButtonAuth title="Зарегистрировать" />

            </div>


        </Auth>
    );
};
