
import { FunctionComponent } from "react";
import { LayoutProps } from "./Layout.props";

import styles from './Layout.module.css';
import { AppContextProvider } from "../Context/app.context";
import { IIndexPage } from "@/pages";
import { ICategoryPage } from "@/pages/category/[slug]";
import { LoaderHead } from "../Components/LoaderHead/LoaderHead";
import { IWorkPage } from "@/pages/work/[slug]";
import { ClickComponent } from "../Components/ClickComponent/ClickComponent";

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles['main']}>
            <ClickComponent />
            
            <div className={styles['content']}>{children}</div>

        </div>
    );
};


/* HOC */
export const withLayout = <T extends Record<string, unknown> & IIndexPage & ICategoryPage & IWorkPage>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <LoaderHead>
                <AppContextProvider {...props}>
                    <Layout>
                        <Component {...props} />
                    </Layout>
                </AppContextProvider>
            </LoaderHead>
        );
    };

};
