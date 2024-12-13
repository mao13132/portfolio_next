import { withLayout } from "@/app/Layout/Layout";
import { ICategory } from "@/app/interface/category";
import { ParsedUrlQuery } from "querystring";
import { API } from "@/app/utils/api";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { IWorks } from "@/app/interface/works";
import { WorkPage } from "@/app/Components/WorkPage/WorkPage";

export interface IWorkPage extends Record<string, unknown> {
    slug: string,
    category: ICategory[],
    work: IWorks,
};

function WorksPage({ }: IWorkPage) {
    return (
        <WorkPage />
    );
};

export default withLayout(WorksPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];

    const start_data = await axios.get(API.works.get_all);


    const works = start_data.data as IWorks[];

    paths = works.map(work => `/work/${work.slug}`)

    return {
        paths,
        fallback: true
    }
};



export const getStaticProps: GetStaticProps<IWorkPage> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    try {

        const slug = params?.slug as string;

        if (!slug) {
            return {
                notFound: true,
            }
        }

        const response = await axios.post(API.works.get_work_by_slug, { slug });

        if (!response) {
            return {
                notFound: true,
            }
        }

        const work = response.data as IWorks;

        if (!work) {
            return {
                notFound: true,
            }
        }

        const start_data =  await axios.get(API.index.get_start_data);

        const categorys = start_data.data.category;

        return {
            props: {
                slug,
                category: categorys,
                work,
            }
        }

    } catch (error) {
        return {
            notFound: true,
        }
    }

};
