import { LoginProps } from "./Login.props";
import styles from './Login.module.css';

import cn from 'classnames';
import { Auth } from "../Auth";
import { InputAuth } from "../InputAuth/InputAuth";
import Link from "next/link";
import { ButtonAuth } from "../ButtonAuth/ButtonAuth";


export const Login = ({ className, ...props }: LoginProps): JSX.Element => {
    return (
        <Auth
            title="Login"
        >

            <div className={cn(className, styles['login'])} {...props}>

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

                <div className={styles['forgot']}>
                        <label className={styles['forgot-row']}>
                            <input type="checkbox" />
                            Запомнить меня
                        </label>
                    <Link href={`#`}>Забыл пароль</Link>
                </div>



                <ButtonAuth title="Вход" />

                <div className={styles['login-reg']}>
                    <p>Уже есть аккаунт?</p>
                    <Link href={`#`}>Регистрация</Link>
                </div>

            </div>


        </Auth>
    );
};
