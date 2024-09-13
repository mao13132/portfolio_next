import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeadingTitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string,
    spanTitle: string,
};
