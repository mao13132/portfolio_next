import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './landing.module.css';

interface ExitIntentPopupProps {
    onCtaClick: () => void;
}

export const ExitIntentPopup = ({ onCtaClick }: ExitIntentPopupProps) => {
    const [shown, setShown] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleCta = useCallback(() => {
        setIsOpen(false);
        onCtaClick();
    }, [onCtaClick]);

    useEffect(() => {
        // Don't show if already shown in this session
        if (shown || sessionStorage.getItem('exitPopupShown')) return;

        const handler = (e: MouseEvent) => {
            // Trigger when mouse moves to top of viewport (typical exit intent)
            if (e.clientY <= 5) {
                setShown(true);
                setIsOpen(true);
                sessionStorage.setItem('exitPopupShown', '1');
            }
        };

        // Delay to avoid false triggers on page load
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handler);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handler);
        };
    }, [shown]);

    // Close on ESC
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, handleClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.exitOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className={styles.exitContent}
                        initial={{ opacity: 0, y: -40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.9 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className={styles.exitClose} onClick={handleClose} aria-label="Закрыть">
                            <i className='bx bx-x' />
                        </button>

                        <div className={styles.exitIcon}>🎯</div>

                        <h2 className={styles.exitTitle}>Подождите!</h2>

                        <p className={styles.exitText}>
                            Получите <strong>бесплатный аудит вашего проекта</strong> —
                            я проанализирую задачу и предложу оптимальное решение с точной сметой.
                        </p>

                        <ul className={styles.exitBullets}>
                            <li><i className='bx bx-check' /> Бесплатная консультация 30 минут</li>
                            <li><i className='bx bx-check' /> Анализ задачи и архитектуры</li>
                            <li><i className='bx bx-check' /> Точная смета и сроки</li>
                        </ul>

                        <button className={styles.exitButton} onClick={handleCta}>
                            Получить бесплатный аудит
                        </button>

                        <p className={styles.exitNote}>Без обязательств • Ответ за 30 минут</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
