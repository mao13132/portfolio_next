import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProjectsPortfolioProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    image: string,
    title: string,
    text: string,
    link: string,
    icon: string,
};
