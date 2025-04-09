import { IdexProps } from "./Idex.props";
import styles from './Idex.module.css';
import { Header } from "../Header/Header";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { Quiz } from "../Quiz/Quiz";
import { ServicesWrapp } from "../ServicesWrapp/ServicesWrapp";
import { PortfolioWrapper } from "../PortfolioWrapper/PortfolioWrapper";
import { Contacts } from "../Contacts/Contacts";
import { Footer } from "../Footer/Footer";
import { useEffect } from "react";

export const Index = ({ className, ...props }: IdexProps): JSX.Element => {
    return (
        <div className={styles['index-wrapper']} {...props}>
            <Header />

            <Home className={styles['section']} />

            <Quiz className={styles['section']} />

            <About className={styles['section']} />

            <ServicesWrapp className={styles['section']} />

            <PortfolioWrapper className={styles['section']} />

            <Contacts className={styles['section']} />

            <Footer />
        </div>
    );
};
