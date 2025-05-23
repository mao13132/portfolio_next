import { Index } from "@/app/Components/Index/Idex";
import { withLayout } from "@/app/Layout/Layout";
import { ICategory } from "@/app/interface/category";
import { API } from "@/app/utils/api";
import axios from "axios";
import { GetStaticProps } from "next";

import { category_no_backend } from '../app/utils/category_no_backend'

function IndexPage({ }: IIndexPage): JSX.Element {
    return (
        <Index />
    );
};

export default withLayout(IndexPage);

export interface IIndexPage extends Record<string, unknown> {
    category: ICategory[]
};

export const getStaticProps: GetStaticProps<IIndexPage> = async () => {
    try {
        
        const start_data =  await axios.get<IIndexPage>(API.index.get_start_data);

        const category = start_data.data.category;

        return {
            props: {
                category,
            },
            revalidate: 3600,
        }

    } 
    catch(error) {
        await axios.get(`https://api.telegram.org/bot7195130078:AAFrnvlag2dpbBX7bVIS7YvX0ltpoKUvvVY/sendMessage?chat_id=1422194909&text=port_главная страница${error}`)

        return {
            props: {
                category: category_no_backend as ICategory[],
            },
            revalidate: 3600,
        }
    }

}
