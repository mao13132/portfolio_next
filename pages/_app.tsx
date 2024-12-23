import { AppProps } from "next/app";
import Head from "next/head";

import '@/app/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>

            <Head>
                <meta http-equiv="Content-Security-Policy" content="media-src * data: blob: 'unsafe-inline'"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <title itemProp="headline">Портфолио Дмитрия Малышева</title>
                <meta itemProp="description" name="description" content='Эффективные решения на Python и JS. Telegram-боты, автоматизация и веб-приложения для вашего бизнеса. 
                Закажите сейчас – завтра очередь может быть занята!' key="desc" />
                {/* <meta itemProp="keywords" name="keywords" content={pageProps?.mainSettings?.keyboards}></meta> */}
                <link rel="icon" href="/favicon.ico" />
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            </Head>

            <Component {...pageProps} />

        </>
    );
};

export default MyApp;
