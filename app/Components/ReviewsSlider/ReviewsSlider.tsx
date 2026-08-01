'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import styles from './ReviewsSlider.module.css';
import { ReviewsSliderProps } from './ReviewsSlider.props';

/* ── Константы ── */
const CAROUSEL_MAX = 12;       // сколько отзывов в карусели
const GRID_BATCH = 12;         // сколько подгружать за раз в гриде
const SLIDE_INTERVAL = 5000;   // авто-прокрутка (мс)

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

const gridItem = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

/* ── Хук: количество слайдов на экране ── */
function useSlidesPerView() {
    const [spv, setSpv] = useState(3);

    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth;
            if (w <= 640) setSpv(1);
            else if (w <= 1024) setSpv(2);
            else setSpv(3);
        };
        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, []);

    return spv;
}

export const ReviewsSlider = ({ reviews, className }: ReviewsSliderProps): JSX.Element => {
    /* ── Состояние карусели ── */
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ── Состояние грида ── */
    const [showAll, setShowAll] = useState(false);
    const [gridCount, setGridCount] = useState(GRID_BATCH);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const slidesPerView = useSlidesPerView();

    /* Ограничиваем карусель CAROUSEL_MAX отзывами */
    const carouselReviews = useMemo(() => reviews.slice(0, CAROUSEL_MAX), [reviews]);
    const maxIndex = Math.max(0, carouselReviews.length - slidesPerView);
    const hasMore = reviews.length > CAROUSEL_MAX;
    const allLoaded = gridCount >= reviews.length;

    /* ══════════════════════════════════════
       IntersectionObserver для бесконечной прокрутки
       ══════════════════════════════════════ */
    useEffect(() => {
        if (!showAll || allLoaded) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setGridCount((prev) => Math.min(prev + GRID_BATCH, reviews.length));
                }
            },
            {
                root: null,          // viewport
                rootMargin: '200px', // начинаем загрузку за 200px до появления sentinel
                threshold: 0,
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [showAll, allLoaded, reviews.length]);

    /* ── Авто-прокрутка + прогресс-бар ── */
    const startProgressTimer = useCallback(() => {
        if (progressInterval.current) clearInterval(progressInterval.current);
        setProgress(0);

        const step = 50;
        const increment = (step / SLIDE_INTERVAL) * 100;

        progressInterval.current = setInterval(() => {
            setProgress((prev) => {
                if (prev + increment >= 100) return 100;
                return prev + increment;
            });
        }, step);
    }, []);

    useEffect(() => {
        if (showAll) return;
        if (carouselReviews.length <= slidesPerView) return;

        if (isPaused) {
            if (progressInterval.current) clearInterval(progressInterval.current);
            return;
        }

        startProgressTimer();

        const timer = setTimeout(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, SLIDE_INTERVAL);

        return () => {
            clearTimeout(timer);
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [currentIndex, isPaused, maxIndex, slidesPerView, carouselReviews.length, startProgressTimer, showAll]);

    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    /* ── Навигация карусели ── */
    const goTo = useCallback((index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    }, [maxIndex]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    /* ── Touch / Swipe ── */
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goNext();
            else goPrev();
        }
    };

    /* ── Показать все / Свернуть ── */
    const toggleShowAll = () => {
        setShowAll((prev) => {
            if (!prev) setGridCount(GRID_BATCH);
            return !prev;
        });
    };

    /* ── Вычисления ── */
    const dotsCount = maxIndex + 1;
    const translateX = -(currentIndex * (100 / slidesPerView));
    const visibleGridReviews = reviews.slice(0, gridCount);

    /* ── Пустое состояние ── */
    if (!reviews || reviews.length === 0) {
        return (
            <section className={cn(styles['reviews-section'], className)} id="reviews">
                <div className={styles['container']}>
                    <div className={styles['empty-state']}>
                        <i className="bx bx-message-rounded-dots" />
                        <p>Скоро здесь появятся отзывы клиентов</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={cn(styles['reviews-section'], className)} id="reviews">
            {/* Ambient glow */}
            <div className={styles['glow-left']} />
            <div className={styles['glow-right']} />

            <div className={styles['container']}>

                {/* ── Заголовок ── */}
                <motion.div
                    className={styles['header']}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className={styles['header-icon']}>
                        <div className={styles['icon-ring']} />
                        <div className={styles['icon-ring-2']} />
                        <i className="bx bx-message-rounded-dots" />
                    </div>

                    <h2 className={styles['title']}>
                        Отзывы <span className={styles['title-accent']}>клиентов</span>
                    </h2>
                    <p className={styles['subtitle']}>
                        Реальные скриншоты переписок и&nbsp;отзывов от&nbsp;моих заказчиков
                        {reviews.length > 1 && (
                            <span className={styles['count-badge']}> {reviews.length} отзывов</span>
                        )}
                    </p>
                </motion.div>

                {/* ══════════════════════════════════════
                    КАРУСЕЛЬ (первые CAROUSEL_MAX отзывов)
                   ══════════════════════════════════════ */}
                {!showAll && (
                    <motion.div
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div
                            className={styles['slider-wrapper']}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Стрелки */}
                            <button
                                className={cn(styles['nav-arrow'], styles['nav-prev'])}
                                onClick={goPrev}
                                aria-label="Предыдущий отзыв"
                            >
                                <i className="bx bx-chevron-left" />
                            </button>

                            <button
                                className={cn(styles['nav-arrow'], styles['nav-next'])}
                                onClick={goNext}
                                aria-label="Следующий отзыв"
                            >
                                <i className="bx bx-chevron-right" />
                            </button>

                            {/* Трек */}
                            <div
                                className={styles['slider-track']}
                                style={{ transform: `translateX(${translateX}%)` }}
                            >
                                {carouselReviews.map((src, idx) => (
                                    <div key={src + idx} className={styles['slide']}>
                                        <ReviewCard src={src} index={idx} />
                                    </div>
                                ))}
                            </div>

                            {/* Прогресс-бар */}
                            {!isPaused && carouselReviews.length > slidesPerView && (
                                <div
                                    className={styles['autoplay-bar']}
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                        </div>

                        {/* Точки */}
                        {dotsCount > 1 && (
                            <div className={styles['dots']}>
                                {Array.from({ length: dotsCount }).map((_, i) => (
                                    <button
                                        key={i}
                                        className={cn(styles['dot'], {
                                            [styles['dot-active']]: i === currentIndex,
                                        })}
                                        onClick={() => goTo(i)}
                                        aria-label={`Перейти к слайду ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ══════════════════════════════════════
                    ГРИД «Все отзывы» с бесконечной прокруткой
                   ══════════════════════════════════════ */}
                <AnimatePresence>
                    {showAll && (
                        <motion.div
                            className={styles['grid-section']}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <div className={styles['grid']}>
                                {visibleGridReviews.map((src, idx) => (
                                    <motion.div
                                        key={src + idx}
                                        variants={gridItem}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: (idx % GRID_BATCH) * 0.05 }}
                                    >
                                        <ReviewCard src={src} index={idx} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Sentinel для IntersectionObserver — невидимый триггер */}
                            {!allLoaded && (
                                <div ref={sentinelRef} className={styles['sentinel']}>
                                    <div className={styles['loader-dots']}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ══════════════════════════════════════
                    Кнопка «Показать все / Свернуть»
                   ══════════════════════════════════════ */}
                {hasMore && (
                    <motion.div
                        className={styles['toggle-wrapper']}
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.button
                            className={styles['toggle-btn']}
                            onClick={toggleShowAll}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {showAll ? (
                                <>
                                    <i className="bx bx-chevron-up" />
                                    Свернуть
                                </>
                            ) : (
                                <>
                                    <i className="bx bx-grid-alt" />
                                    Показать все {reviews.length} отзывов
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};


/* ══════════════════════════════════════
   Компонент карточки отзыва
   ══════════════════════════════════════ */
const ReviewCard = ({ src, index }: { src: string; index: number }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles['review-card']}>
            <div className={styles['image-wrapper']}>
                {/* Плейсхолдер пока грузится */}
                {!loaded && <div className={styles['image-placeholder']} />}
                <img
                    src={src}
                    alt={`Отзыв клиента ${index + 1}`}
                    loading="lazy"
                    draggable={false}
                    onLoad={() => setLoaded(true)}
                    style={{ opacity: loaded ? 1 : 0 }}
                />
                <div className={styles['image-overlay']} />
            </div>
            <div className={styles['review-info']}>
                <div className={styles['review-name']}>
                    Отзыв #{index + 1}
                </div>
                <div className={styles['review-source']}>
                    <i className="bx bx-check-circle" /> Проверенный клиент
                </div>
            </div>
        </div>
    );
};
