import { useEffect } from "react";
import { ClickComponentProps } from "./ClickComponent.props";
import axios from "axios";
import { API_URL, getClick } from "../utils/url.config";
import { useRouter } from "next/router";

export const ClickComponent = ({ }: ClickComponentProps): JSX.Element => {

    const { asPath } = useRouter();

    useEffect(() => {
        const link = `${API_URL}${getClick()}`;

        axios.post(link, { url: `${process.env.NEXT_PUBLIC_BACKEND}${asPath}` }).then(
            response => {
                
            }
        ).catch(error => {

        })
    }, [asPath]);

    return (<></>)
};