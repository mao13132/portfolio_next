import styles from './Contacts.module.css';

import cn from 'classnames';
import { ContactsProps, IContanct } from './Contacts.props';
import { MHeadingTitle } from '../HeadingTitle/HeadingTitle';

import { motion } from 'framer-motion';
import { errorAnimation, formContactAnimation, titleContactAnimation } from './animationsContact';

import { useForm } from 'react-hook-form';
import { useAddMessage } from './useAddMessage';
import { ButtonLinkPulse } from '../ButtonLinkPulse/ButtonLinkPulse';
import { ButtonPulse } from '../ButtonPulse/ButtonPulse';
import { useState } from 'react';

export const Contacts = ({ className, ...props }: ContactsProps): JSX.Element => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors }, setValue, getValues, control } = useForm<IContanct>();

    const { handleAddMessage } = useAddMessage({setIsLoading, setValue});

    return (
        <section className={cn(className, styles['contact-wrapper'], {
            [styles['load']]: isLoading,
        })} id='contact' {...props}>

            <MHeadingTitle

                transition={{ duration: 2 }}
                variants={titleContactAnimation}
                initial="hidden"
                whileInView="visible"

                title="Написать " spanTitle="мне" />

            <motion.form onSubmit={handleSubmit(handleAddMessage)}

                transition={{ duration: 1 }}
                variants={formContactAnimation}
                initial="hidden"
                whileInView="visible"

                className={styles['form']}

                action={`#`}>

                <div className={styles['input-box']}>

                    <div className={styles['input-wrapper']}>

                        <input

                            {...register('name', { required: 'Имя обазятельно' })}
                            type="text" placeholder='Ваше имя' />
                        {errors?.name?.message?.toString() && <motion.div

                            transition={{ duration: 1 }}
                            variants={errorAnimation}
                            initial="hidden"
                            whileInView="visible"

                            className={styles['error']}>{errors?.name?.message?.toString()}</motion.div>}

                    </div>

                    <div className={styles['input-wrapper']}>

                        <input type="text"
                            {...register('telegram', { required: 'Telegram обязателен' })}

                            placeholder='Ваш телеграм' >
                        </input>

                        {errors?.telegram?.message?.toString() && <motion.div
                            transition={{ duration: 1 }}
                            variants={errorAnimation}
                            initial="hidden"
                            whileInView="visible"

                            className={styles['error']}>{errors?.telegram?.message?.toString()}</motion.div>}

                    </div>

                </div>

                <div className={styles['input-box']}>


                    <div className={styles['input-wrapper']}>
                        <input

                            {...register('email')}
                            type="email" placeholder='Ваш Email (необязательно)' />

                    </div>

                    <div className={styles['input-wrapper']}>
                        <input
                            {...register('phone', {
                                maxLength: { message: 'Превышена максимальная длина номера', value: 12 },
                                minLength: { message: 'Проверьте номер', value: 10 }
                            })}

                            type="tel" placeholder='Ваш телефон (необязательно)' />

                        {errors?.phone?.message?.toString() && <motion.div

                            transition={{ duration: 1 }}
                            variants={errorAnimation}
                            initial="hidden"
                            whileInView="visible"

                            className={styles['error']}>{errors?.phone?.message?.toString()}</motion.div>}

                    </div>

                </div>

                <div className={styles['input-wrapper']}>
                    <textarea

                        {...register('text', {
                            required: 'Текст сообщения обазателен',
                            minLength: { message: 'Текст сообщения слишком короткий', value: 10 }
                        })}
                        placeholder='Текст сообщения'>

                    </textarea>

                    {errors?.text?.message?.toString() && <motion.div

                        transition={{ duration: 1 }}
                        variants={errorAnimation}
                        initial="hidden"
                        whileInView="visible"

                        className={styles['error']}>{errors?.text?.message?.toString()}</motion.div>}
                </div>

                <ButtonPulse isLoad={isLoading} className={styles['button-form']} type='submit' text='Отправить сообщение' />



            </motion.form>

        </section>
    );
};
