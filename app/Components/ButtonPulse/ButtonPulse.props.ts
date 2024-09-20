import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export interface ButtonPulseProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string,
    isLoad?: boolean,
};