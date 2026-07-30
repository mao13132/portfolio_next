import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ICategory } from '@/app/interface/category';
import { IWorks } from '@/app/interface/works';
import { API } from '@/app/utils/api';
import { category_no_backend } from '@/app/utils/category_no_backend';
import styles from './landing.module.css';

interface PortfolioPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

type View = 'categories' | 'works' | 'detail';

export const PortfolioPopup = ({ isOpen, onClose }: PortfolioPopupProps) => {
    const [view, setView] = useState<View>('categories');
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [works, setWorks] = useState<IWorks[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [selectedWork, setSelectedWork] = useState<IWorks | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch categories on open
    useEffect(() => {
        if (!isOpen) return;
        setView('categories');
        setSelectedCategory(null);
        setSelectedWork(null);

        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await axios.get(API.category.get_all);
                const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
                setCategories(data.length > 0 ? data : category_no_backend);
            } catch {
                setCategories(category_no_backend as ICategory[]);
            }
            setLoading(false);
        };
        fetchCategories();
    }, [isOpen]);

    // Fetch works for category
    const handleCategoryClick = async (cat: ICategory) => {
        setSelectedCategory(cat);
        setView('works');
        setLoading(true);
        try {
            const res = await axios.post(API.works.get_by_category_id, { id_category: cat.id });
            const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
            setWorks(data);
        } catch {
            setWorks([]);
        }
        setLoading(false);
    };

    // Show work detail
    const handleWorkClick = (work: IWorks) => {
        setSelectedWork(work);
        setView('detail');
    };

    // Navigation
    const goBack = () => {
        if (view === 'detail') {
            setView('works');
            setSelectedWork(null);
        } else if (view === 'works') {
            setView('categories');
            setSelectedCategory(null);
            setWorks([]);
        }
    };

    // Close on ESC
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Image URL helper (proxy through next.config rewrites)
    const getImageUrl = (url: string) => {
        if (!url) return '';
        // Абсолютные URL с localhost → убираем хост (rewrites проксируют)
        if (url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost')) {
            return url.replace(/https?:\/\/127\.0\.0\.1:\d+|https?:\/\/localhost:\d+/, '');
        }
        // Относительные URL без / → добавляем / в начало
        if (!url.startsWith('/') && !url.startsWith('http')) {
            return '/' + url;
        }
        return url;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.popupOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.popupContent}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={styles.popupHeader}>
                            {view !== 'categories' && (
                                <button className={styles.popupBack} onClick={goBack}>
                                    <i className='bx bx-arrow-back' /> Назад
                                </button>
                            )}
                            <h2 className={styles.popupTitle}>
                                {view === 'categories' && 'Мои работы'}
                                {view === 'works' && selectedCategory?.title}
                                {view === 'detail' && selectedWork?.title}
                            </h2>
                            <button className={styles.popupClose} onClick={onClose} aria-label="Закрыть">
                                <i className='bx bx-x' />
                            </button>
                        </div>

                        {/* Body */}
                        <div className={styles.popupBody}>
                            {loading && (
                                <div className={styles.popupLoading}>
                                    <div className={styles.popupSpinner} />
                                    <p>Загрузка...</p>
                                </div>
                            )}

                            {/* Categories */}
                            {view === 'categories' && !loading && (
                                <div className={styles.popupCategoriesGrid}>
                                    {categories.map((cat, i) => (
                                        <motion.button
                                            key={cat.slug || i}
                                            className={styles.popupCategoryCard}
                                            onClick={() => handleCategoryClick(cat)}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <div className={styles.popupCategoryImage}>
                                                <img src={getImageUrl(cat.image)} alt={cat.title} loading="lazy" />
                                                <div className={styles.popupCategoryOverlay}>
                                                    <i className={`bx ${cat.icon}`} />
                                                </div>
                                            </div>
                                            <h3>{cat.title}</h3>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Works List */}
                            {view === 'works' && !loading && (
                                <>
                                    {works.length === 0 ? (
                                        <div className={styles.popupEmpty}>
                                            <i className='bx bx-folder-open' />
                                            <p>Работы загружаются...</p>
                                        </div>
                                    ) : (
                                        <div className={styles.popupWorksGrid}>
                                            {works.map((work, i) => (
                                                <motion.button
                                                    key={work.slug || i}
                                                    className={styles.popupWorkCard}
                                                    onClick={() => handleWorkClick(work)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className={styles.popupWorkImage}>
                                                        <img src={getImageUrl(work.image)} alt={work.title} loading="lazy" />
                                                    </div>
                                                    <div className={styles.popupWorkInfo}>
                                                        <h3>{work.title}</h3>
                                                        <p>{work.short_text}</p>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Work Detail */}
                            {view === 'detail' && selectedWork && !loading && (
                                <div className={styles.popupDetail}>
                                    {selectedWork.image && (
                                        <div className={styles.popupDetailImage}>
                                            <img src={getImageUrl(selectedWork.image)} alt={selectedWork.title} />
                                        </div>
                                    )}
                                    <div className={styles.popupDetailContent}>
                                        <h3>{selectedWork.title}</h3>
                                        <p className={styles.popupDetailShort}>{selectedWork.short_text}</p>
                                        {selectedWork.descriptions && (
                                            <div
                                                className={styles.popupDetailDesc}
                                                dangerouslySetInnerHTML={{ __html: selectedWork.descriptions }}
                                            />
                                        )}
                                        {selectedWork.text && (
                                            <p className={styles.popupDetailText}>{selectedWork.text}</p>
                                        )}
                                        {selectedWork.video && (
                                            <div className={styles.popupDetailVideo}>
                                                <iframe
                                                    src={selectedWork.video}
                                                    frameBorder="0"
                                                    allow="clipboard-write; autoplay; fullscreen"
                                                    allowFullScreen
                                                    style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--lp-radius-md)', background: '#000' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
