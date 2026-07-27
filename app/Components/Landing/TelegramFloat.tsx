import { useEffect, useState } from 'react';
import styles from './landing.module.css';

interface TelegramFloatProps {
    username?: string;
}

export const TelegramFloat = ({ username = 'developer_telegrams' }: TelegramFloatProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <a
            href={`https://t.me/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramFloat}
            aria-label="Написать в Telegram"
        >
            {/* Pulsing waves */}
            <span className={styles.telegramWave} />
            <span className={styles.telegramWave} />
            <span className={styles.telegramWave} />
            {/* Icon */}
            <span className={styles.telegramIcon}>
                <i className='bx bxl-telegram' />
            </span>
        </a>
    );
};
