import { IWorks } from "@/app/interface/works";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface WorkItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    work: IWorks,
};
