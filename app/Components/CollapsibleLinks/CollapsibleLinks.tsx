'use client';

import { useState } from 'react';

interface CollapsibleLinksProps {
    /** Максимум ссылок до сворачивания */
    maxVisible?: number;
    /** CSS-класс для ссылки */
    linkClassName?: string;
    /** CSS-класс для кнопки */
    btnClassName?: string;
    /** Дочерние элементы — массив <a> */
    children: React.ReactNode;
}

/**
 * Оборачивает список ссылок и скрывает лишние.
 * Все ссылки всегда в DOM — SEO не страдает.
 * Кнопка "Показать все" появляется только если ссылок больше maxVisible.
 */
export function CollapsibleLinks({
    maxVisible = 6,
    linkClassName,
    btnClassName,
    children,
}: CollapsibleLinksProps) {
    const [expanded, setExpanded] = useState(false);

    // Считаем количество дочерних элементов
    const childArray = Array.isArray(children) ? children : [children];
    const total = childArray.length;
    const needsCollapse = total > maxVisible;
    const visibleChildren = needsCollapse && !expanded ? childArray.slice(0, maxVisible) : childArray;
    const hiddenCount = total - maxVisible;

    return (
        <>
            {/* Все ссылки — для SEO краулеров (скрыты визуально если не expanded) */}
            {needsCollapse && (
                <div
                    style={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: 'hidden',
                        clip: 'rect(0,0,0,0)',
                        whiteSpace: 'nowrap',
                        border: 0,
                    }}
                    aria-hidden="true"
                >
                    {childArray}
                </div>
            )}

            {/* Видимые ссылки */}
            {visibleChildren}

            {/* Кнопка "Показать все" */}
            {needsCollapse && (
                <button
                    type="button"
                    className={btnClassName}
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        display: 'block',
                        background: 'none',
                        border: 'none',
                        color: 'var(--lp-cyan, #00d4ff)',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        padding: '6px 0',
                        marginTop: '4px',
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                    {expanded ? 'Свернуть' : `Показать все (${hiddenCount} ещё)`}
                    {' '}
                    <span style={{ fontSize: '11px' }}>
                        {expanded ? '▲' : '▼'}
                    </span>
                </button>
            )}
        </>
    );
}
