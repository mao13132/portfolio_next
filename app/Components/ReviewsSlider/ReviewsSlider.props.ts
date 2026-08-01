import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReviewsSliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    reviews: string[];
}
