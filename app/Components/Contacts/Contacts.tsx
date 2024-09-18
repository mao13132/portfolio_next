import styles from './Contacts.module.css';

import cn from 'classnames';
import { ContactsProps } from './Contacts.props';
import { HeadingTitle, MHeadingTitle } from '../HeadingTitle/HeadingTitle';

import { motion } from 'framer-motion';
import { formContactAnimation, titleContactAnimation } from './animationsContact';

export const Contacts = ({ className, ...props }: ContactsProps): JSX.Element => {
    return (
        <section className={cn(className, styles['contact-wrapper'])} id='contact' {...props}>

            <MHeadingTitle

                transition={{ duration: 2 }}
                variants={titleContactAnimation}
                initial="hidden"
                whileInView="visible"

                title="Contact " spanTitle="Me!" />

            <motion.form

                transition={{ duration: 1 }}
                variants={formContactAnimation}
                initial="hidden"
                whileInView="visible"
                
                action={`#`}>

                <div className={styles['input-box']}>

                    <input type="text" placeholder='Full Name' />
                    <input type="email" placeholder='Email Address' />

                </div>

                <div className={styles['input-box']}>

                    <input type="number" placeholder='Mobile Number' />
                    <input type="text" placeholder='Email Subject' />

                </div>

                <textarea placeholder='Your Message'></textarea>

                <input type='submit' value={`Send Message`} className={styles['btn']} />

            </motion.form>

        </section>
    );
};
