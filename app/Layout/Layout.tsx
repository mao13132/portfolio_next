
import { FunctionComponent } from "react";
import { LayoutProps } from "./Layout.props";

import styles from './Layout.module.css';
import { AppContextProvider } from "../Context/app.context";
import { IIndexPage } from "@/pages";
import { ICategoryPage } from "@/pages/category/[slug]";

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles['main']}>

            <div className={styles['content']}>{children}</div>

        </div>
    );
};


/* HOC */
export const withLayout = <T extends Record<string, unknown> & IIndexPage & ICategoryPage>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider {...props}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };

};
