import { IdexProps } from "./Idex.props";
import styles from './Idex.module.css';
import { Header } from "../Header/Header";
import { Home } from "../Home/Home";
import { About } from "../About/About";

export const Index = ({ className, ...props }: IdexProps): JSX.Element => {
    return (
        <div className={styles['index-wrapper']} {...props}>
            <Header />

            <Home className={styles['section']} />

            <About className={styles['section']} />

        </div>
    );
};
