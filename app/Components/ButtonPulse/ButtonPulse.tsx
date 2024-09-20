import styles from './ButtonPulse.module.css';

import cn from 'classnames';
import { ButtonPulseProps } from './ButtonPulse.props';

export const ButtonPulse = ({ isLoad, text, className, ...props }: ButtonPulseProps): JSX.Element => {
    return (
        <button disabled={isLoad} type='submit'
            className={cn(className, styles['btn'], {
                [styles['disable']]: isLoad,
            })}

            {...props}>

            {text}

            {!isLoad && <><span className={styles['pulse']} />

                <span className={styles['pulse']} />

                <span className={styles['pulse']} /></>}


        </button>
    );
};
