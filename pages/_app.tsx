import { AppProps } from "next/app";
import Head from "next/head";

import '@/app/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="media-src * data: blob: 'unsafe-inline'"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <title key="title">Портфолио Дмитрия Малышева</title>
                <meta name="description" content="Эффективные решения на Python и JS. Telegram-боты, автоматизация и веб-приложения для вашего бизнеса. Закажите сейчас – завтра очередь может быть занята!" key="desc" />
                {/* <meta name="keywords" content={pageProps?.mainSettings?.keyboards} key="keywords"></meta> */}

                <meta property="og:type" content="website" key="og:type" />
                <meta property="og:site_name" content="Портфолио Дмитрия Малышева" key="og:site_name" />
                <meta property="og:title" content="Портфолио Дмитрия Малышева" key="og:title" />
                <meta property="og:description" content="Эффективные решения на Python и JS. Telegram-боты, автоматизация и веб-приложения для вашего бизнеса. Закажите сейчас – завтра очередь может быть занята!" key="og:desc" />
                <meta property="og:url" content="https://dima-razrab.com/" key="og:url" />
                <meta property="og:locale" content="ru_RU" key="og:locale" />
                <meta property="og:image" content="https://dima-razrab.com/media/og_desc.jpg" key="og:image" />
                <meta property="og:image:width" content="1200" key="og:image:width" />
                <meta property="og:image:height" content="630" key="og:image:height"></meta>
                
                <meta name="twitter:card" content="summary_large_image" key="tw:card" />
                <meta name="twitter:title" content="Портфолио Дмитрия Малышева" key="tw:title" />
                <meta name="twitter:description" content="Эффективные решения на Python и JS. Telegram-боты, автоматизация и веб-приложения для вашего бизнеса." key="tw:desc" />
                <meta name="twitter:image" content="https://dima-razrab.com/media/og_desc.jpg" key="tw:image" />

                <link rel="icon" href="/favicon.ico" />
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            </Head>

            <Component {...pageProps} />

        </>
    );
};

export default MyApp;
