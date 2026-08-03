import Head from 'next/head';
import { Login } from "@/app/Components/Auth/Login/Login";
import { Register } from "@/app/Components/Auth/Register/Register";
import { withLayout } from "@/app/Layout/Layout"

function RegisterPage({ }: ILoginPage): JSX.Element {
    return (
        <>
            <Head>
                <title>Регистрация | DimaRazrab</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Register />
        </>
    );
};

export default withLayout(RegisterPage);

export interface ILoginPage extends Record<string, unknown> {

};
