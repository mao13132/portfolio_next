
import { FunctionComponent } from "react";
import { LayoutProps } from "./Layout.props";

import styles from './Layout.module.css';

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles['main']}>

            <div className={styles['content']}>{children}</div>

        </div>
    );
};


/* HOC */
export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };

};
