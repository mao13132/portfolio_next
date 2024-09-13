import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";


class MyDOcument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };

    }

    render(): JSX.Element {
        return (
            <Html lang="ru">
                <Head />

                <body>

                    <Main />

                    <NextScript />

                </body>

            </Html>
        );
    };

};

export default MyDOcument;
