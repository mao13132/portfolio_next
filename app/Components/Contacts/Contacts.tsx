import styles from './Contacts.module.css';

import cn from 'classnames';
import { ContactsProps } from './Contacts.props';
import { HeadingTitle } from '../HeadingTitle/HeadingTitle';

export const Contacts = ({ className, ...props }: ContactsProps): JSX.Element => {
    return (
        <section className={cn(className, styles['contact-wrapper'])} id='contact' {...props}>

            <HeadingTitle title="Contact " spanTitle="Me!" />

            <form action={`#`}>

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

            </form>

        </section>
    );
};
