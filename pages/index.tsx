import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { Index } from "@/app/Components/Index/Idex";
import { withLayout } from "@/app/Layout/Layout";
import { ICategory } from "@/app/interface/category";
import { API } from "@/app/utils/api";
import axios from "axios";
import { GetStaticProps } from "next";

import { category_no_backend } from '../app/utils/category_no_backend'

const SITE_URL = 'https://dima-razrab.com';

/** Расширения изображений, которые мы считаем отзывами */
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/** Читает список файлов-отзывов из public/reviews/ */
function getReviewImages(): string[] {
    try {
        const reviewsDir = path.join(process.cwd(), 'public', 'reviews');
        if (!fs.existsSync(reviewsDir)) return [];

        return fs.readdirSync(reviewsDir)
            .filter((file) => {
                const ext = path.extname(file).toLowerCase();
                return IMAGE_EXTENSIONS.includes(ext);
            })
            .sort()
            .map((file) => `/reviews/${file}`);
    } catch {
        return [];
    }
}

function IndexPage({ }: IIndexPage): JSX.Element {
    return (
        <>
            <Head>
                <title>DimaRazrab — Разработка Telegram-ботов и автоматизация бизнеса</title>
                <meta name="description" content="Профессиональная разработка Telegram-ботов, сервисов и автоматизация бизнеса на Python и JS. Бесплатная консультация. Гарантия результата." />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={SITE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab — Разработка Telegram-ботов" />
                <meta property="og:title" content="DimaRazrab — Разработка Telegram-ботов и автоматизация бизнеса" />
                <meta property="og:description" content="Профессиональная разработка Telegram-ботов, сервисов и автоматизация бизнеса. Бесплатная консультация. Гарантия." />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="DimaRazrab — Разработка Telegram-ботов и автоматизация бизнеса" />
                <meta name="twitter:description" content="Профессиональная разработка Telegram-ботов, сервисов и автоматизация бизнеса. Бесплатная консультация." />
                <meta name="twitter:image" content={`${SITE_URL}/media/og_desc.jpg`} />
            </Head>
            <Index />
        </>
    );
};

export default withLayout(IndexPage);

export interface IIndexPage extends Record<string, unknown> {
    category: ICategory[],
    reviews: string[],
};

export const getStaticProps: GetStaticProps<IIndexPage> = async () => {
    const reviews = getReviewImages();

    try {
        
        const start_data =  await axios.get<IIndexPage>(API.index.get_start_data);

        const category = start_data.data.category;

        // Проверяем что category — валидный массив
        if (!Array.isArray(category) || category.length === 0) {
            return {
                props: {
                    category: category_no_backend as ICategory[],
                    reviews,
                },
                revalidate: 3600,
            }
        }

        return {
            props: {
                category,
                reviews,
            },
            revalidate: 3600,
        }

    }
    catch(error) {
        try {
            await axios.get(`https://api.telegram.org/bot7195130078:AAFrnvlag2dpbBX7bVIS7YvX0ltpoKUvvVY/sendMessage?chat_id=1422194909&text=port_main_page_error`)
        } catch(e) {
            // Telegram notification failed, ignore
        }

        return {
            props: {
                category: category_no_backend as ICategory[],
                reviews,
            },
            revalidate: 3600,
        }
    }

}
