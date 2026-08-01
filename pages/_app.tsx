import { AppProps } from "next/app";
import Head from "next/head";

import '@/app/styles/globals.css';
import YandexMetrika from '@/app/Components/YandexMetrika/YandexMetrika';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <meta httpEquiv="Content-Security-Policy" content="media-src * data: blob: 'unsafe-inline'" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <title key="title">DimaRazrab — Разработка Telegram-ботов</title>
                <meta name="description" content="Профессиональная разработка Telegram-ботов, сервисов и автоматизация бизнеса. Бесплатная консультация. Гарантия результата." key="description" />

                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
                <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#0a0a1a" />
                <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
            </Head>

            <Component {...pageProps} />

            {/* Яндекс.Метрика — загружается после интерактивности страницы */}
            <YandexMetrika />
        </>
    );
};

export default MyApp;
