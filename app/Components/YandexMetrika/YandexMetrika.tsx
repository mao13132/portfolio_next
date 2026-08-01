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

    // Не загружать скрипт, если ID не задан (placeholder)
    if (!METRIKA_ID || METRIKA_ID === 'ВАШ_ID_МЕТРИКИ') {
        return null;
    }

    return (
        <>
            {/* Загрузка скрипта Яндекс.Метрики после интерактивности страницы */}
            <Script
                id="yandex-metrika"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                        ym(${METRIKA_ID}, "init", {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
                    `,
                }}
            />

            {/* Fallback для случаев, когда JavaScript отключён */}
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}
