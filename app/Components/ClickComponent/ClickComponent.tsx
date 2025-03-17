import { useEffect } from "react";
import { ClickComponentProps } from "./ClickComponent.props";
import axios from "axios";
import { API_URL, getClick } from "../utils/url.config";
import { useRouter } from "next/router";

export const ClickComponent = ({ }: ClickComponentProps): JSX.Element => {

    const { asPath } = useRouter();

    useEffect(() => {
        const link = `${API_URL}${getClick()}`;

        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {} as Record<string, string>);

        const utm_source = cookies['utm_source'];

        const data = { url: `${process.env.NEXT_PUBLIC_FRONTEND}${asPath}`, utm_source: utm_source };


        axios.post(link, data).then(
            response => {

            }
        ).catch(error => {

        })
    }, [asPath]);

    return (<></>)
};