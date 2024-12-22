import { withLayout } from "@/app/Layout/Layout";
import { ICategory } from "@/app/interface/category";
import { ParsedUrlQuery } from "querystring";
import { API } from "@/app/utils/api";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Category } from "@/app/Components/CategoryPage/Category";
import { IWorks } from "@/app/interface/works";

export interface ICategoryPage extends Record<string, unknown> {
    slug: string,
    current_category: ICategory,
    category: ICategory[],
    works: IWorks[],
};

function CategoryPage({ }: ICategoryPage) {
    return (
        <Category />
    );
};

export default withLayout(CategoryPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];

    const start_data = await axios.get(API.index.get_start_data);

    const categorys = start_data.data.category as ICategory[];

    paths = categorys.map(cat => `/category/${cat.slug}`)

    return {
        paths,
        fallback: true
    }
};



export const getStaticProps: GetStaticProps<ICategoryPage> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    try {

        const slug = params?.slug as string;

        if (!slug) {
            return {
                notFound: true,
            }
        }

        const response = await axios.post(API.category.get_category_by_slug, { slug });

        if (!response) {
            return {
                notFound: true,
            }
        }

        const current_category = response.data as ICategory;

        if (!current_category) {
            return {
                notFound: true,
            }
        }

        const start_data =  await axios.get(API.index.get_start_data);

        const categorys = start_data.data.category;

        const works_reponse =  await axios.post(API.works.get_by_category_id, {id_category: current_category.id});

        const works = works_reponse.data;

        return {
            props: {
                slug,
                current_category,
                category: categorys,
                works,
            },
            revalidate: 3600,
        }

    } catch (error) {
        return {
            notFound: true,
        }
    }

};
