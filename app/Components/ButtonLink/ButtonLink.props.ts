import { DetailedHTMLProps, HTMLAttributes, LinkHTMLAttributes } from "react";

export interface ButtonLinkProps extends DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    link: string,
    text: string,
};
