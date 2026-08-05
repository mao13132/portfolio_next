'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import styles from './Calculator.module.css';
import type { CalculatorConfig } from './calculatorData';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: 'easeIn' },
    },
};

const staggerContainer = {
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

/* ============================================================
   HELPERS
   ============================================================ */

/** Форматирование цены: 7 000 ₽ */
function formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}

/* ============================================================
   ANIMATED COUNTER HOOK
   ============================================================ */

function useAnimatedCounter(target: number, duration: number = 600) {
    const [value, setValue] = useState(target);
    const frameRef = useRef<number>(0);
    const startRef = useRef(target);
    const startTimeRef = useRef(0);

    useEffect(() => {
        startRef.current = value;
        startTimeRef.current = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.round(startRef.current + (target - startRef.current) * eased);
            setValue(current);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, duration]);

    return value;
}

/* ============================================================
   COMPONENT
   ============================================================ */

interface CalculatorProps {
    config: CalculatorConfig;
    className?: string;
}

export const Calculator = ({ config, className }: CalculatorProps): JSX.Element => {
    const [step, setStep] = useState(1);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

    /* ─── Derived values ─── */
    const tier = config.tiers.find((t) => t.id === selectedTier);
    const optionsTotal = config.options
        .filter((o) => selectedOptions.has(o.id))
        .reduce((sum, o) => sum + o.price, 0);
    const totalPrice = (tier?.basePrice ?? 0) + optionsTotal;
    const animatedPrice = useAnimatedCounter(totalPrice);
    const minDays = tier ? tier.minDays + (selectedOptions.size > 0 ? Math.ceil(selectedOptions.size * 0.5) : 0) : 0;
    const maxDays = tier ? tier.maxDays + (selectedOptions.size > 0 ? Math.ceil(selectedOptions.size * 1) : 0) : 0;

    /* ─── Handlers ─── */
    const selectTier = useCallback((id: string) => {
        setSelectedTier(id);
    }, []);

    const toggleOption = useCallback((id: string) => {
        setSelectedOptions((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const canGoNext = step === 1 ? selectedTier !== null : true;
    const isLastStep = step === 3;

    const goNext = useCallback(() => {
        if (canGoNext && step < 3) setStep((s) => s + 1);
    }, [canGoNext, step]);

    const goBack = useCallback(() => {
        if (step > 1) setStep((s) => s - 1);
    }, [step]);

    /* ─── Telegram link with pre-filled message ─── */
    const getTelegramLink = useCallback(() => {
        const tierName = tier?.label ?? '';
        const selectedOpts = config.options
            .filter((o) => selectedOptions.has(o.id))
            .map((o) => o.label)
            .join(', ');
        const msg = `Здравствуйте! Хочу заказать: ${tierName} (${formatPrice(totalPrice)}).${selectedOpts ? ` Допы: ${selectedOpts}.` : ''}`;
        return `${config.telegramUrl}?text=${encodeURIComponent(msg)}`;
    }, [tier, selectedOptions, totalPrice, config.options, config.telegramUrl]);

    /* ─── Render step content ─── */
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        key="step-1"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className={styles['tier-grid']}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {config.tiers.map((t) => (
                                <motion.div
                                    key={t.id}
                                    className={cn(styles['tier-card'], {
                                        [styles.selected]: selectedTier === t.id,
                                    })}
                                    variants={cardVariant}
                                    onClick={() => selectTier(t.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {selectedTier === t.id && (
                                        <motion.div
                                            className={styles['tier-check']}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                    <span className={styles['tier-icon']}>{t.icon}</span>
                                    <div className={styles['tier-name']}>{t.label}</div>
                                    <div className={styles['tier-description']}>{t.description}</div>
                                    <div className={styles['tier-price']}>
                                        от {t.basePrice.toLocaleString('ru-RU')} <span>₽</span>
                                    </div>
                                    <div className={styles['tier-days']}>
                                        {t.minDays}–{t.maxDays} рабочих дней
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step-2"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className={styles['options-grid']}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {config.options.map((opt) => {
                                const isSelected = selectedOptions.has(opt.id);
                                return (
                                    <motion.div
                                        key={opt.id}
                                        className={cn(styles['option-item'], {
                                            [styles.selected]: isSelected,
                                        })}
                                        variants={cardVariant}
                                        onClick={() => toggleOption(opt.id)}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <div className={styles['option-checkbox']}>
                                            {isSelected && '✓'}
                                        </div>
                                        <div className={styles['option-body']}>
                                            <div className={styles['option-top']}>
                                                <span className={styles['option-icon']}>{opt.icon}</span>
                                                <span className={styles['option-label']}>{opt.label}</span>
                                            </div>
                                            <div className={styles['option-desc']}>{opt.description}</div>
                                        </div>
                                        <div className={styles['option-price']}>
                                            +{opt.price.toLocaleString('ru-RU')} ₽
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step-3"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className={styles['result-block']}>
                            <div className={styles['result-tier-label']}>
                                {tier?.icon} {tier?.label}
                            </div>

                            <motion.div
                                className={styles['result-price']}
                                key={totalPrice}
                                initial={{ scale: 0.9, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                {animatedPrice.toLocaleString('ru-RU')}{' '}
                                <span className={styles.currency}>₽</span>
                            </motion.div>

                            <div className={styles['result-days']}>
                                Срок: <strong>{minDays}–{maxDays} рабочих дней</strong>
                            </div>

                            {/* Breakdown */}
                            <div className={styles['result-breakdown']}>
                                <div className={styles['breakdown-row']}>
                                    <span>{tier?.icon} {tier?.label}</span>
                                    <span className={styles['breakdown-price']}>
                                        {tier ? formatPrice(tier.basePrice) : '0 ₽'}
                                    </span>
                                </div>
                                {config.options
                                    .filter((o) => selectedOptions.has(o.id))
                                    .map((opt) => (
                                        <div key={opt.id} className={styles['breakdown-row']}>
                                            <span>{opt.icon} {opt.label}</span>
                                            <span className={styles['breakdown-price']}>
                                                +{formatPrice(opt.price)}
                                            </span>
                                        </div>
                                    ))}
                                <div className={styles['breakdown-total']}>
                                    <span>Итого</span>
                                    <span className={styles['breakdown-price']}>
                                        {formatPrice(totalPrice)}
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className={styles['result-ctas']}>
                                <a
                                    href={getTelegramLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(styles['cta-button'], styles['cta-primary'])}
                                >
                                    <i className="bx bxl-telegram" />
                                    Заказать за {formatPrice(totalPrice)}
                                </a>
                                <a
                                    href={config.moneyPageUrl + '#hero-form'}
                                    className={cn(styles['cta-button'], styles['cta-secondary'])}
                                >
                                    <i className="bx bx-message-dots" />
                                    Обсудить проект
                                </a>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    /* ─── Main render ─── */
    return (
        <section className={cn(styles['calculator-section'], className)} id="calculator">
            <div className={styles['neon-glow-left']} />
            <div className={styles['neon-glow-right']} />

            <div className={styles['calculator-container']}>
                {/* Header */}
                <motion.div
                    className={styles['calculator-header']}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className={styles['calculator-title']}>
                        <span className={styles['neon-text']}>{config.title}</span>
                    </h2>
                    <p className={styles['calculator-subtitle']}>{config.subtitle}</p>
                </motion.div>

                {/* Step indicator */}
                <div className={styles['step-indicator']}>
                    {[1, 2, 3].map((s, i) => (
                        <div key={s} className={styles['step-dot-wrapper']}>
                            {i > 0 && (
                                <div
                                    className={cn(styles['step-connector'], {
                                        [styles.completed]: step > s - 1,
                                    })}
                                />
                            )}
                            <div
                                className={cn(styles['step-dot'], {
                                    [styles.active]: step === s,
                                    [styles.completed]: step > s,
                                })}
                            >
                                {step > s ? '✓' : s}
                            </div>
                            <span className={styles['step-label']}>
                                {s === 1 ? 'Тип' : s === 2 ? 'Функции' : 'Итого'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <div className={styles['step-content']}>
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                {!isLastStep && (
                    <motion.div
                        className={styles['nav-buttons']}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <button
                            className={styles['nav-btn']}
                            onClick={goBack}
                            disabled={step === 1}
                        >
                            <i className="bx bx-arrow-back" />
                            Назад
                        </button>

                        {tier && (
                            <div className={styles['nav-price-hint']}>
                                Итого: <strong>{formatPrice(totalPrice)}</strong>
                            </div>
                        )}

                        <button
                            className={cn(styles['nav-btn'], styles['nav-btn-next'])}
                            onClick={goNext}
                            disabled={!canGoNext}
                        >
                            Далее
                            <i className="bx bx-arrow-forward" />
                        </button>
                    </motion.div>
                )}

                {/* Back button on last step */}
                {isLastStep && (
                    <div className={styles['nav-buttons']} style={{ justifyContent: 'center' }}>
                        <button
                            className={styles['nav-btn']}
                            onClick={goBack}
                        >
                            <i className="bx bx-arrow-back" />
                            Изменить выбор
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
