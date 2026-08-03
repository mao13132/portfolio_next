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
                    {/* Favicon */}
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="manifest" href="/site.webmanifest" />

                    {/* Google Fonts — Inter */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                    {/* AI-friendly resources */}
                    <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLMs.txt" />
                    <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="LLMs Full" />
                    <meta name="ai-instructions" content="https://dima-razrab.com/ai.txt" />
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
