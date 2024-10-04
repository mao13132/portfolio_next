import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InputAuthProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    icon: string,
    error?: string,
    type: string,
};
