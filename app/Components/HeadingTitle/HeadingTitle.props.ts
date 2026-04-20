import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeadingTitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    title: string,
    spanTitle: string,
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

