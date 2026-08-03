import Head from 'next/head';
import { Login } from "@/app/Components/Auth/Login/Login";
import { withLayout } from "@/app/Layout/Layout"

function LoginPage({ }: ILoginPage): JSX.Element {
    return (
        <>
            <Head>
                <title>Вход | DimaRazrab</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Login />
        </>
    );
};

export default withLayout(LoginPage);

export interface ILoginPage extends Record<string, unknown> {

};
