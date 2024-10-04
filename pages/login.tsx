import { Login } from "@/app/Components/Auth/Login/Login";
import { withLayout } from "@/app/Layout/Layout"

function LoginPage({ }: ILoginPage): JSX.Element {
    return (
        <Login />
    );
};

export default withLayout(LoginPage);

export interface ILoginPage extends Record<string, unknown> {

};
