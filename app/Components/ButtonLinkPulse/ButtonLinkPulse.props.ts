import { DetailedHTMLProps, HTMLAttributes, LinkHTMLAttributes } from "react";

export interface ButtonLinkPulseProps extends DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    link: string,
    text: string,
};
