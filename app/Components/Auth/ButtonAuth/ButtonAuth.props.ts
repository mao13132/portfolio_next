import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ButtonAuthProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string,
};
