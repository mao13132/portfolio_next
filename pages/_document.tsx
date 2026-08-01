import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };

    }

    render(): JSX.Element {
        const webmasterId = process.env.NEXT_PUBLIC_YANDEX_WEBMASTER_ID;

        return (
            <Html lang="ru">
                <Head>
                    {/* Favicon */}
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="manifest" href="/site.webmanifest" />

                    {/* Google Fonts — Inter */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                    {/* Яндекс.Вебмастер — верификация сайта */}
                    {webmasterId && webmasterId !== 'ВАШ_ID_ВЕБМАСТЕРА' && (
                        <meta name="yandex-verification" content={webmasterId} />
                    )}
                </Head>

                <body>

                    <Main />

                    <NextScript />

                </body>

            </Html>
        );
    };

};

export default MyDocument;
