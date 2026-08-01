import { IdexProps } from "./Idex.props";
import styles from './Idex.module.css';
import { Header } from "../Header/Header";
import { Home } from "../Home/Home";
import { PainPoints } from "../PainPoints/PainPoints";
import { Quiz } from "../Quiz/Quiz";
import { About } from "../About/About";
import { ServicesWrapp } from "../ServicesWrapp/ServicesWrapp";
import { GrandSlamOffer } from "../Landing/GrandSlamOffer";
import { GuaranteeBlock } from "../GuaranteeBlock/GuaranteeBlock";
import { PortfolioWrapper } from "../PortfolioWrapper/PortfolioWrapper";
import { ReviewsSlider } from "../ReviewsSlider/ReviewsSlider";
import { Contacts } from "../Contacts/Contacts";
import { Footer } from "../Footer/Footer";
import { TelegramFloat } from "../Landing/TelegramFloat";
import { useContext } from "react";
import { AppContext } from "@/app/Context/app.context";

export const Index = ({ className, ...props }: IdexProps): JSX.Element => {

    const { reviews } = useContext(AppContext);

    return (
        <div className={styles['index-wrapper']} {...props}>
            <Header />

            {/* 1. Hero — универсальный оффер с частицами */}
            <Home />

            {/* 2. Блок болей — «Узнаёте себя?» */}
            <PainPoints className={styles['section']} />

            {/* 3. Квиз — квалификация лида */}
            <Quiz className={styles['section']} />

            {/* 4. Grand Slam Offer — Value Stack + таблица сравнения */}
            <GrandSlamOffer />

            {/* 5. Гарантия — неоновый блок 30 дней */}
            <GuaranteeBlock />

            {/* 6. Почему я — экспертность */}
            <About className={styles['section']} />

            {/* 7. Навыки */}
            <ServicesWrapp className={styles['section']} />

            {/* 8. Отзывы клиентов (ДО кейсов — социальное доказательство → якорь доверия) */}
            {reviews && reviews.length > 0 && (
                <ReviewsSlider reviews={reviews} className={styles['section']} />
            )}

            {/* 9. Портфолио / Кейсы */}
            <PortfolioWrapper className={styles['section']} />

            {/* 10. Контакты */}
            <Contacts className={styles['section']} />

            <Footer />

            {/* Плавающая кнопка Telegram */}
            <TelegramFloat />
        </div>
    );
};
