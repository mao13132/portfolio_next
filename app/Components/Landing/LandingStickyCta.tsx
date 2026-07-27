import styles from './landing.module.css';

interface LandingStickyCtaProps {
    scrollToFormId: string;
    label?: string;
}

export const LandingStickyCta = ({ scrollToFormId, label = 'Обсудить проект' }: LandingStickyCtaProps) => {
    const handleClick = () => {
        document.getElementById(scrollToFormId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className={styles.stickyCta}>
            <button className={styles.stickyCtaButton} onClick={handleClick}>
                <i className='bx bx-message-dots' />
                {label}
            </button>
        </div>
    );
};
