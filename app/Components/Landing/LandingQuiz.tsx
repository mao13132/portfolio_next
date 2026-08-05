import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { axiosClassic } from '../utils/interceptor';
import { getQuiz } from '../utils/url.config';
import { useAttribution } from '@/app/hooks/useAttribution';
import styles from './landing.module.css';

interface QuizQuestion {
    question: string;
    options: string[];
}

interface LandingQuizProps {
    title?: string;
    questions: QuizQuestion[];
    source: string;
    pageUrl: string;
}

export const LandingQuiz = ({ title = 'Подберём решение за 30 секунд', questions, source, pageUrl }: LandingQuizProps) => {
    const { getAttribution, trackFormSubmit } = useAttribution();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [contact, setContact] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const totalSteps = questions.length + 1; // questions + contact

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);
        setStep(step + 1);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!contact.trim()) {
            setError('Укажите телефон или Telegram');
            return;
        }
        if (!privacy) {
            setError('Необходимо согласие на обработку данных');
            return;
        }

        trackFormSubmit();
        setLoading(true);
        try {
            const quizData = {
                answers: answers.map((a, i) => ({
                    question: questions[i]?.question || '',
                    answer: a,
                })),
                contact,
                source,
                url: pageUrl,
                attribution: getAttribution(),
            };

            try {
                await axiosClassic.post(getQuiz(), JSON.stringify(quizData));
            } catch {
                // Fallback to contact endpoint
                await axiosClassic.post('/contact', JSON.stringify({
                    name: 'Квиз-лид',
                    telegram: contact,
                    text: `[${source} квиз] ${answers.join(' → ')}`,
                    url: `${pageUrl}#quiz`,
                    attribution: getAttribution(),
                }));
            }

            setSuccess(true);
        } catch {
            setError('Ошибка отправки. Попробуйте написать в Telegram: @developer_telegrams');
        }
        setLoading(false);
    };

    const handleReset = () => {
        setStep(0);
        setAnswers([]);
        setContact('');
        setPrivacy(false);
        setSuccess(false);
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <div className={styles.quizTrigger}>
                <button className={styles.quizTriggerButton} onClick={() => setIsOpen(true)}>
                    <i className='bx bx-help-circle' />
                    <span>{title}</span>
                </button>
            </div>
        );
    }

    return (
        <motion.div
            className={styles.quizContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.quizHeader}>
                <h3>{title}</h3>
                <button className={styles.quizCloseBtn} onClick={handleReset}>
                    <i className='bx bx-x' />
                </button>
            </div>

            {/* Progress */}
            <div className={styles.quizProgress}>
                <div className={styles.quizProgressFill} style={{ width: `${((step) / totalSteps) * 100}%` }} />
            </div>

            <div className={styles.quizBody}>
                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="success"
                            className={styles.quizSuccess}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className={styles.successIcon}>✓</div>
                            <h3>Отлично! Заявка отправлена</h3>
                            <p>Свяжусь с вами в течение 30 минут</p>
                            <button className={styles.quizResetBtn} onClick={handleReset}>Закрыть</button>
                        </motion.div>
                    ) : step < questions.length ? (
                        <motion.div
                            key={`q-${step}`}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                        >
                            <p className={styles.quizQuestion}>{questions[step].question}</p>
                            <div className={styles.quizOptions}>
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={styles.quizOption}
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="contact"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                        >
                            <p className={styles.quizQuestion}>Оставьте контакт — свяжусь с вами за 30 минут</p>
                            <div className={styles.formGroup}>
                                <input
                                    type="tel"
                                    placeholder="Телефон или Telegram *"
                                    value={contact}
                                    onChange={e => setContact(e.target.value)}
                                    className={styles.formInput}
                                    required
                                />
                            </div>
                            <label className={styles.privacyLabel}>
                                <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} required />
                                <span>
                                    Согласен с{' '}
                                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                                        политикой обработки данных
                                    </a>
                                </span>
                            </label>
                            {error && <div className={styles.formError}>{error}</div>}
                            <button type="submit" className={styles.formButton} disabled={loading}>
                                {loading ? 'Отправка...' : 'Получить предложение'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
