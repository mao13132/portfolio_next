import { Login } from "@/app/Components/Auth/Login/Login";
import { Register } from "@/app/Components/Auth/Register/Register";
import { withLayout } from "@/app/Layout/Layout"

function RegisterPage({ }: ILoginPage): JSX.Element {
    return (
        <Register />
    );
};

export default withLayout(RegisterPage);

export interface ILoginPage extends Record<string, unknown> {

};
