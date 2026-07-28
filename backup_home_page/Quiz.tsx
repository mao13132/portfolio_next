'use client';

import { QuizProps } from "./Quiz.props";
import styles from './Quiz.module.css';
import cn from 'classnames';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { QuizButton } from "./QuizButton";
import { PatternFormat } from 'react-number-format';

// Обновленные анимации для лучшего UX
const fadeAnimation = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: { 
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: { 
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const questionAnimation = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: { 
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: { 
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: "easeIn"
        }
    }
};

const optionsAnimation = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: (i: number) => ({ 
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeOut"
        }
    }),
    exit: { 
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const successAnimation = {
    hidden: { 
        opacity: 0,
        scale: 0.95
    },
    visible: { 
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

interface QuizOption {
    id: string;
    text: string;
    description?: string;
    nextSection?: string;
}

interface QuizQuestion {
    text: string;
    id?: string;
    options: QuizOption[];
}

interface QuizData {
    [key: string]: {
        questions: QuizQuestion[];
    };
}

const quizData: QuizData = require('./quizData.json');

interface CountryCodes {
    [key: string]: string[];
}

interface QuizAnswer {
    questionId: string;
    questionText: string;
    answerId: string;
    answerText: string;
}

export const Quiz = ({ className, ...props }: QuizProps): JSX.Element => {
    const [currentSection, setCurrentSection] = useState('main');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
    const [phone, setPhone] = useState('');
    const [telegram, setTelegram] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [telegramError, setTelegramError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showContactInput, setShowContactInput] = useState(false);
    const [contactType, setContactType] = useState<'phone' | 'telegram'>('phone');
    const [previousStates, setPreviousStates] = useState<Array<{ section: string; index: number }>>([]);
    const [contentHeight, setContentHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const startTime = Date.now();
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);

    // Добавляем проверку данных при монтировании компонента
    useEffect(() => {
        try {
            if (!quizData || !quizData[currentSection] || !quizData[currentSection].questions) {
                setError('Ошибка загрузки данных квиза');
            }
        } catch (err) {
            setError('Произошла ошибка при загрузке данных');
        }
    }, [currentSection]);

    // Если есть ошибка, показываем сообщение
    if (error) {
        return (
            <section className={cn(className, styles['quiz'])} {...props} id="quiz">
                <div className={styles['quiz-wrapper']}>
                    <div className={styles['quiz-content']}>
                        <HeadingTitle title="Ошибка" spanTitle="" />
                        <p style={{ textAlign: 'center', marginTop: '20px' }}>
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const currentQuestions = quizData[currentSection]?.questions || [];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    // Добавляем обработку скролла
    useEffect(() => {
        if (isSubmitted) {
            const quizElement = document.getElementById('quiz');
            if (quizElement) {
                // Используем requestAnimationFrame для гарантии выполнения после рендера
                requestAnimationFrame(() => {
                    quizElement.scrollIntoView({ behavior: 'smooth' });
                });
            }
        }
    }, [isSubmitted]);

    // Добавляем проверку на существование данных
    if (!currentQuestion || !currentQuestion.options) {
        return (
            <section className={cn(className, styles['quiz'])} {...props} id="quiz">
                <div className={styles['quiz-wrapper']}>
                    <div className={styles['quiz-content']}>
                        <HeadingTitle title="Ошибка загрузки данных" spanTitle="" />
                        <p style={{ textAlign: 'center', marginTop: '20px' }}>
                            Пожалуйста, попробуйте обновить страницу.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const sendAnalytics = async (action: 'answer' | 'back', data: any) => {
        try {
            // Получаем IP адрес
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            
            // Собираем информацию о браузере и устройстве
            const userAgent = navigator.userAgent;
            const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
            const browser = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            const os = userAgent.match(/(Windows|Mac OS|Linux|Android|iOS)/i) || [];
            
            // Собираем информацию о сессии
            const sessionInfo = {
                startTime: startTime,
                currentTime: Date.now(),
                duration: Date.now() - startTime,
                pageLoadTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
            };

            // Собираем информацию о трафике
            const urlParams = new URLSearchParams(window.location.search);
            const trafficSource = {
                utm_source: urlParams.get('utm_source'),
                utm_medium: urlParams.get('utm_medium'),
                utm_campaign: urlParams.get('utm_campaign'),
                referrer: document.referrer,
                direct: !document.referrer && !urlParams.toString()
            };

            // Собираем информацию о локализации
            const localeInfo = {
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                localTime: new Date().toLocaleString()
            };

            await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action,
                    data,
                    // Отправляем все предыдущие ответы
                    answers: quizAnswers,
                    // Информация о пользователе
                    userInfo: {
                        device: {
                            isMobile,
                            browser: {
                                name: browser[1] || 'unknown',
                                version: browser[2] || 'unknown'
                            },
                            os: os[0] || 'unknown',
                            screen: {
                                width: window.screen.width,
                                height: window.screen.height,
                                colorDepth: window.screen.colorDepth
                            }
                        },
                        location: {
                            ip: ipData.ip
                        },
                        locale: localeInfo
                    },
                    // Информация о сессии
                    session: sessionInfo,
                    // Информация о трафике
                    traffic: trafficSource,
                    // Техническая информация
                    technical: {
                        referer: document.referrer || window.location.href,
                        useragent: userAgent,
                        quiz_id: Date.now().toString()
                    }
                })
            });
        } catch (error) {
            console.error('Error sending analytics:', error);
        }
    };

    const handleOptionSelect = (option: QuizOption) => {
        const answerData = {
            questionId: currentQuestion.id || currentSection,
            questionText: currentQuestion.text,
            answerId: option.id,
            answerText: option.text,
            currentSection,
            currentQuestionIndex,
            timestamp: Date.now()
        };

        // Сначала отправляем аналитику с текущими ответами
        sendAnalytics('answer', answerData);

        // Затем обновляем состояние с новым ответом
        setQuizAnswers(prev => [
            ...prev,
            {
                questionId: currentQuestion.id || currentSection,
                questionText: currentQuestion.text,
                answerId: option.id,
                answerText: option.text,
                timestamp: Date.now()
            }
        ]);

        if (option.nextSection === 'phone') {
            setTimeout(() => {
                setShowContactInput(true);
            }, 300);
            return;
        }

        setPreviousStates(prev => [...prev, { section: currentSection, index: currentQuestionIndex }]);

        if (option.nextSection === currentSection) {
            if (currentQuestionIndex < currentQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        } else {
            setCurrentSection(option.nextSection || 'main');
            setCurrentQuestionIndex(0);
        }
    };

    const handlePrevious = () => {
        if (showContactInput) {
            setShowContactInput(false);
            return;
        }

        const prevState = previousStates[previousStates.length - 1];
        if (prevState) {
            // Отправляем аналитику при нажатии "Назад"
            sendAnalytics('back', {
                fromSection: currentSection,
                fromQuestionIndex: currentQuestionIndex,
                toSection: prevState.section,
                toQuestionIndex: prevState.index,
                timestamp: Date.now()
            });

            setCurrentSection(prevState.section);
            setCurrentQuestionIndex(prevState.index);
            setPreviousStates(prev => prev.slice(0, -1));
        }
    };

    const validatePhone = (phone: string): boolean => {
        if (!phone) return false;
        // Проверяем, что все цифры заполнены и нет символа маски '_'
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 11 && !phone.includes('_');
    };

    const validateTelegram = (username: string): boolean => {
        // Удаляем @ если он есть в начале
        const cleanUsername = username.replace(/^@/, '');
        // Проверяем длину и допустимые символы
        return /^[a-zA-Z0-9_]{5,32}$/.test(cleanUsername);
    };

    const formatPhone = (phone: string): string => {
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Если первая цифра 8, заменяем на 7
        if (cleanPhone.startsWith('8')) {
            return '+7' + cleanPhone.slice(1);
        }

        // Добавляем + если его нет и номер не пустой
        if (cleanPhone && !phone.startsWith('+')) {
            return '+' + cleanPhone;
        }

        return phone;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneError('');
    };

    const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Автоматически добавляем @ если его нет
        if (value && !value.startsWith('@')) {
            value = '@' + value;
        }
        setTelegram(value);
        setTelegramError('');
    };

    const handleContactTypeChange = (type: 'phone' | 'telegram') => {
        setContactType(type);
        setPhoneError('');
        setTelegramError('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && validatePhone(phone)) {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        let isValid = false;
        let contactValue = '';

        if (contactType === 'phone') {
            isValid = validatePhone(phone);
            if (!isValid) {
                setPhoneError('Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX');
                return;
            }
            contactValue = phone.replace(/\D/g, '');
        } else {
            isValid = telegram.trim().length > 0;
            if (!isValid) {
                setTelegramError('Введите ваш Telegram username');
                return;
            }
            contactValue = telegram.replace(/^@/, '');
        }

        try {
            setIsLoading(true);
            // Получаем IP адрес
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            
            // Собираем информацию о браузере и устройстве
            const userAgent = navigator.userAgent;
            const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
            const browser = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            const os = userAgent.match(/(Windows|Mac OS|Linux|Android|iOS)/i) || [];
            
            // Собираем информацию о сессии
            const sessionInfo = {
                startTime: startTime,
                endTime: Date.now(),
                duration: Date.now() - startTime,
                pageLoadTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
            };

            // Собираем информацию о трафике
            const urlParams = new URLSearchParams(window.location.search);
            const trafficSource = {
                utm_source: urlParams.get('utm_source'),
                utm_medium: urlParams.get('utm_medium'),
                utm_campaign: urlParams.get('utm_campaign'),
                referrer: document.referrer,
                direct: !document.referrer && !urlParams.toString()
            };

            // Собираем информацию о локализации
            const localeInfo = {
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                localTime: new Date().toLocaleString()
            };

            // Собираем информацию о возвращении пользователя
            const lastVisit = localStorage.getItem('lastVisit');
            const returningUserInfo = {
                isReturning: !!lastVisit,
                daysSinceLastVisit: lastVisit ? 
                    Math.floor((Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24)) : 0
            };
            localStorage.setItem('lastVisit', new Date().toISOString());

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers: quizAnswers,
                    contact: contactValue,
                    contactType: contactType,
                    // Информация о пользователе
                    userInfo: {
                        device: {
                            isMobile,
                            browser: {
                                name: browser[1] || 'unknown',
                                version: browser[2] || 'unknown'
                            },
                            os: os[0] || 'unknown',
                            screen: {
                                width: window.screen.width,
                                height: window.screen.height,
                                colorDepth: window.screen.colorDepth
                            }
                        },
                        location: {
                            ip: ipData.ip,
                            // Остальная геолокация будет определена на сервере
                        },
                        locale: localeInfo,
                        returning: returningUserInfo
                    },
                    // Информация о сессии
                    session: sessionInfo,
                    // Информация о трафике
                    traffic: trafficSource,
                    // Техническая информация
                    technical: {
                        referer: document.referrer || window.location.href,
                        useragent: userAgent,
                        quiz_id: Date.now().toString()
                    }
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const isPhoneValid = phone.trim() !== '' && validatePhone(phone);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setActiveTooltip(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTooltipClick = (optionId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setActiveTooltip(activeTooltip === optionId ? null : optionId);
    };

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [currentSection, currentQuestionIndex, showContactInput]);

    useEffect(() => {
        if (phoneInputRef.current) {
            phoneInputRef.current.setAttribute('data-testid', 'phone-input');
        }
    }, []);

    if (isSubmitted) {
        return (
            <section className={cn(className, styles['quiz'])} {...props} id="quiz">
                <div className={styles['quiz-wrapper']}>
                    <div className={styles['quiz-content']}>
                        <HeadingTitle title="Спасибо за участие!" spanTitle="" />
                        <p className={styles.successMessage} style={{ textAlign: 'center', marginTop: '20px' }}>
                            Мы свяжемся с вами в ближайшее время для обсуждения деталей проекта.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (showContactInput) {
        return (
            <section className={cn(className, styles['quiz'])} {...props} id="quiz">
                <div className={styles['quiz-heading']}>
                    <HeadingTitle title="Давайте подберем решение для вашего проекта" spanTitle="" />
                </div>
                <div className={styles['quiz-wrapper']}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles['quiz-content']}
                    >
                        <div className={styles['quiz-contact']}>
                            <h3>Как с вами связаться?</h3>
                            <div className={styles['contact-type-selector']}>
                                <button
                                    className={cn(styles['contact-type-button'], {
                                        [styles['active']]: contactType === 'phone'
                                    })}
                                    onClick={() => handleContactTypeChange('phone')}
                                >
                                    Телефон
                                </button>
                                <button
                                    className={cn(styles['contact-type-button'], {
                                        [styles['active']]: contactType === 'telegram'
                                    })}
                                    onClick={() => handleContactTypeChange('telegram')}
                                >
                                    Telegram
                                </button>
                            </div>
                            {contactType === 'phone' ? (
                                <div className={styles['input-wrapper']}>
                                    <PatternFormat
                                        getInputRef={phoneInputRef}
                                        format="+7 (###) ###-##-##"
                                        mask="_"
                                        value={phone}
                                        onValueChange={(values) => {
                                            const { value, formattedValue } = values;
                                            setPhone(formattedValue);
                                            setPhoneError('');
                                        }}
                                        onKeyPress={handleKeyPress}
                                        placeholder="+7 (___) ___-__-__"
                                        className={styles['contact-input']}
                                        allowEmptyFormatting
                                        type="tel"
                                    />
                                    {phoneError && <div className={styles['error']}>{phoneError}</div>}
                                </div>
                            ) : (
                                <div className={styles['input-wrapper']}>
                                    <input
                                        type="text"
                                        value={telegram}
                                        onChange={handleTelegramChange}
                                        placeholder="@username"
                                        className={styles['contact-input']}
                                    />
                                    {telegramError && <div className={styles['error']}>{telegramError}</div>}
                                </div>
                            )}
                        </div>
                        <div className={styles['quiz-submit']}>
                            <QuizButton
                                text={isLoading ? "Отправка..." : "Отправить"}
                                onClick={handleSubmit}
                                disabled={contactType === 'phone' ? !validatePhone(phone) : telegram.trim().length === 0 || isLoading}
                            />
                            <QuizButton
                                text="Назад"
                                onClick={handlePrevious}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (!currentQuestion) {
        return (
            <section className={cn(className, styles['quiz'])} {...props} id="quiz">
            <div className={styles['quiz-wrapper']}>
                <div className={styles['quiz-content']}>
                    <HeadingTitle title="Ошибка загрузки вопроса" spanTitle="" />
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        Пожалуйста, попробуйте начать опрос заново.
                    </p>
                </div>
            </div>
            </section>
        );
    }

    return (
        <section className={cn(className, styles['quiz'])} {...props} id="quiz">
            <div className={styles['quiz-heading']}>
                <HeadingTitle title="Давайте подберем решение для вашего проекта" spanTitle="" />
            </div>
            
            <div className={styles['quiz-wrapper']}>
                <AnimatePresence mode="wait">
                            <motion.div 
                                key="question"
                                variants={fadeAnimation}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={styles['quiz-content']}
                        ref={contentRef}
                        style={{ height: contentHeight }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className={styles['quiz-question']}>
                                    <motion.h3
                                variants={questionAnimation}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {currentQuestion.text}
                                    </motion.h3>
                                    <div className={styles['quiz-options']}>
                                        {currentQuestion.options.map((option, index) => (
                                            <motion.div 
                                                key={option.id}
                                                className={styles.optionWrapper}
                                                variants={optionsAnimation}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                custom={index}
                                            >
                                                <div
                                                    className={cn(styles['quiz-option'])}
                                                    onClick={() => handleOptionSelect(option)}
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    <span className={styles.optionText}>{option.text}</span>
                                                    {option.description && (
                                                        <div className={styles.tooltipContainer}>
                                                            <span 
                                                                className={styles.questionMark}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleTooltipClick(option.id, e);
                                                                }}
                                                            >
                                                                <div className={cn(styles.pulse, styles.pulseOne)}></div>
                                                                <div className={cn(styles.pulse, styles.pulseTwo)}></div>
                                                                <div className={cn(styles.pulse, styles.pulseThree)}></div>
                                                                ?
                                                            </span>
                                                            <div 
                                                                ref={tooltipRef}
                                                                className={cn(styles.optionTooltip, {
                                                                    [styles.active]: activeTooltip === option.id
                                                                })}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <button 
                                                                    className={styles.closeButton}
                                                                    onClick={() => setActiveTooltip(null)}
                                                                    aria-label="Закрыть подсказку"
                                                                />
                                                                {option.description}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {currentSection !== 'main' && (
                                    <motion.button 
                                        onClick={handlePrevious} 
                                        className={styles.backButton}
                                        variants={fadeAnimation}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        Назад
                                    </motion.button>
                                )}
                            </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}; 