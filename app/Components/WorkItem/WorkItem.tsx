import { WorkItemProps } from "./WorkItem.props";
import styles from './WorkItem.module.css';
import Image from "next/image";
import cn from 'classnames';
import Link from "next/link";

/**
 * Компонент карточки работы (проекта)
 * Отображает изображение проекта и краткую информацию о нем
 * Вся карточка является ссылкой на детальную страницу проекта
 */
export const WorkItem = ({ work, className, ...props }: WorkItemProps): JSX.Element => {
    return (
        <div className={cn(className, styles['work'])} {...props}>
            <Link href={`${process.env.NEXT_PUBLIC_FRONTEND}/work/${work.slug}`} className={styles['work']}>
                
                {/* Контейнер для изображения */}
                <div className={styles['image-container']}>
                    {work.image && (
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_FRONTEND}/${work.image}`}
                            alt={work.title || "Изображение проекта"}
                            width={400}
                            height={300}
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                </div>

                {/* Текстовый контент */}
                <div className={styles['layer']}>
                    <div className={styles['text-wrapper']}>
                        <div className={styles['title']}>{work.title}</div>
                        <div className={styles['short-text']}>{work.short_text}</div>
                    </div>
                </div>
                
            </Link>
        </div>
    );
};
