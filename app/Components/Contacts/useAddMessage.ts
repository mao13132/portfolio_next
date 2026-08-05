import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IContanct } from "./Contacts.props";
import { getContact } from "../utils/url.config";
import { axiosClassic } from "../utils/interceptor";
import { journey } from "@/app/utils/journey";
import { Dispatch, SetStateAction } from "react";

interface ContanctFormFunc {
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setValue: UseFormSetValue<IContanct>,
    asPath: string,
}

export const useAddMessage = ({ setIsLoading, setValue, asPath }: ContanctFormFunc) => {

    const handleAddMessage: SubmitHandler<IContanct> = async (data: IContanct) => {

        setIsLoading(true);
        journey.trackFormSubmit();

        const newDate = {
            ...data,
            url: `${process.env.NEXT_PUBLIC_BACKEND}${asPath}`,
            attribution: journey.getAttribution(),
        };

        const json_data = JSON.stringify(newDate);

        try {
            const response = await axiosClassic.post(getContact(), json_data);

            setValue("name", '');
            setValue("telegram", '');
            setValue("phone", '');
            setValue("email", '');
            setValue("text", '');

        } catch (error) {

            console.log(`Ошибка при отправке сообщения ${error}`);
            
        }

        setIsLoading(false);

    };

    return { handleAddMessage }

};
