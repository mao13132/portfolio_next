import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ContactsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {};

export interface IContanct {
    telegram: string,
    text: string,
    name: string,
    email?: string,
    phone?: string,
}
