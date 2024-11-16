import { ReactNode } from "react";
import NextProgressBar from 'nextjs-progressbar';

export const LoaderHead = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <>
            <NextProgressBar
                color="#0ef"
                startPosition={0.3}
                stopDelayMs={200}
                height={10}
            />

            {children}

        </>
    );
};