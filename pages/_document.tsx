import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };

    }

    render(): JSX.Element {
        return (
            <Html lang="ru">
                <Head>
                    {/* Google Fonts — Inter */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
