import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ServicesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon: string,
    title: string,
    text: string,
    link: string,
    textLink: string
};
