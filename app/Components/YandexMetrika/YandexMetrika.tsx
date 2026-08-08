import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function YandexMetrika(): JSX.Element | null {
    const METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    const router = useRouter();

    // Отслеживание SPA-навигации в Pages Router
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (typeof window !== 'undefined' && window.ym) {
                window.ym(Number(METRIKA_ID), 'hit', url);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, METRIKA_ID]);

    // Не загружать скрипт, если ID не задан
    if (!METRIKA_ID || METRIKA_ID === 'ВАШ_ID_МЕТРИКИ') {
        return null;
    }

    return (
        <>
            {/* Шаг 1: Создаём очередь ym() до загрузки tag.js */}
            <Script
                id="ym-queue"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};window.ym.l=Date.now();`,
                }}
            />

            {/* Шаг 2: Загружаем tag.js напрямую — Next.js сам создаст <script src="..."> */}
            <Script
                id="ym-tag"
                src="https://mc.yandex.ru/metrika/tag.js"
                strategy="afterInteractive"
            />

            {/* Шаг 3: Инициализация счётчика — БЕЗ defer, чтобы clickmap работал сразу */}
            <Script
                id="ym-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `ym(${METRIKA_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,trackHash:true});`,
                }}
            />

            {/* Fallback для случаев, когда JavaScript отключён */}
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </noscript>
        </>
    );
}
