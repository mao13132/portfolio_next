import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface NavbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    openStatus: boolean,
    setOpenMenu: Dispatch<SetStateAction<boolean>>;
};
