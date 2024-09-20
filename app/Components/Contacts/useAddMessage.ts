import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IContanct } from "./Contacts.props";
import { getContact } from "../utils/url.config";
import { axiosClassic } from "../utils/interceptor";
import { json } from "node:stream/consumers";
import { Dispatch, SetStateAction, cache } from "react";

interface ContanctFormFunc {
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setValue: UseFormSetValue<IContanct>
}

export const useAddMessage = ({ setIsLoading, setValue }: ContanctFormFunc) => {

    const handleAddMessage: SubmitHandler<IContanct> = async (data: IContanct) => {

        setIsLoading(true);

        const json_data = JSON.stringify(data);

        try {
            const response = await axiosClassic.post(getContact(), json_data);

            setValue("name", '');
            setValue("telegram", '');
            setValue("phone", '');
            setValue("email", '');
            setValue("text", '');



        } catch (error) {

            console.log(`Ошибка при отправке сооьшения ${error}`);
            
        }



        setIsLoading(false);

    };

    return { handleAddMessage }

};
