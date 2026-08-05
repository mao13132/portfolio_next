'use client';

import { journey } from '@/app/utils/journey';

/**
 * Хук для получения данных атрибуции из Journey Tracker.
 * Используется в формах для отправки attribution вместе с заявкой.
 *
 * @returns { getAttribution, trackCtaClick, trackFormStart, trackFormField, trackFormSubmit }
 */
export function useAttribution() {
  return {
    /** Получить полные данные атрибуции для отправки с формой */
    getAttribution: () => journey.getAttribution(),

    /** Получить краткую сводку пути для текста заявки */
    getSummary: () => journey.getSummary(),

    /** Записать клик по CTA (id: 'cta-top', 'cta-middle', 'cta-bottom') */
    trackCtaClick: (ctaId: string) => journey.trackCtaClick(ctaId),

    /** Записать начало заполнения формы */
    trackFormStart: () => journey.trackFormStart(),

    /** Записать заполнение конкретного поля */
    trackFormField: (fieldName: string) => journey.trackFormField(fieldName),

    /** Записать попытку отправки формы */
    trackFormSubmit: () => journey.trackFormSubmit(),
  };
}
