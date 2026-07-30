import { useEffect, useState } from 'react';

/* ============================================================
   Hook: useActiveToc
   Отслеживает активный раздел при скролле через IntersectionObserver.
   Возвращает id текущего активного раздела.
   ============================================================ */

export const useActiveToc = (sectionIds: string[]): string => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (sectionIds.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Находим первый видимый раздел
                const visibleEntries = entries.filter((e) => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    setActiveId(visibleEntries[0].target.id);
                } else {
                    // Если нет видимых — берём ближайший сверху
                    const scrollY = window.scrollY;
                    let closest = sectionIds[0];
                    let minDist = Infinity;
                    for (const id of sectionIds) {
                        const el = document.getElementById(id);
                        if (el) {
                            const dist = Math.abs(el.offsetTop - scrollY - 120);
                            if (dist < minDist) {
                                minDist = dist;
                                closest = id;
                            }
                        }
                    }
                    setActiveId(closest);
                }
            },
            {
                rootMargin: '-100px 0px -60% 0px',
                threshold: 0,
            }
        );

        // Наблюдаем за всеми секциями
        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
};
