import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
    label: string;
    href?: string; // если нет — это текущая страница
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

/**
 * Визуальные хлебные крошки для SEO и UX.
 * JSON-LD BreadcrumbList должен быть отдельно в Head страницы.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps): JSX.Element {
    return (
        <nav className={`${styles.breadcrumbs} ${className || ''}`} aria-label="Хлебные крошки">
            {items.map((item, idx) => (
                <span key={idx} className={styles.crumb}>
                    {item.href ? (
                        <Link href={item.href} className={styles.link}>
                            {item.label}
                        </Link>
                    ) : (
                        <span className={styles.current}>{item.label}</span>
                    )}
                    {idx < items.length - 1 && (
                        <span className={styles.sep}>›</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
