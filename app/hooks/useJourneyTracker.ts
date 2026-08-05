'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { journey } from '@/app/utils/journey';

/**
 * Хук для инициализации Journey Tracker.
 * Используется в _app.tsx — один раз на всё приложение.
 * 
 * Автоматически отслеживает:
 * - Переходы между страницами (routeChangeComplete)
 * - Скролл на каждой странице
 * - Visibility change (закрытие/переключение вкладки)
 */
export function useJourneyTracker() {
  const router = useRouter();

  useEffect(() => {
    // Инициализация при первом рендере
    journey.init(router.asPath);

    // Трекинг навигации между страницами
    const handleRouteChange = (url: string) => {
      // Убираем query-параметры для чистоты пути
      const pathname = url.split('?')[0].split('#')[0];
      journey.startPage(pathname);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.asPath, router.events]);
}
