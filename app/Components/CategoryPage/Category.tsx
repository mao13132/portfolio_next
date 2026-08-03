import { CategoryPageProps } from "./CategoryPage.props";
import { AppContext } from "@/app/Context/app.context";
import Head from "next/head";

import styles from './CategoryPage.module.css';

import index_styles from '@/app/Components/Index/Idex.module.css';

import cn from 'classnames';
import { useContext, useMemo } from "react";
import { Breadcrumbs } from "@/app/Components/Landing/Breadcrumbs/Breadcrumbs";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { WorkItem } from "../WorkItem/WorkItem";
import { HeaderCategory } from "../HeaderCategory/HeaderCategory";
import { Footer } from "../Footer/Footer";

const SITE_URL = 'https://dima-razrab.com';

export const Category = ({ className, ...props }: CategoryPageProps): JSX.Element => {
    const { works, current_category } = useContext(AppContext);

    const pageTitle = current_category?.title
        ? `${current_category.title} — портфолио | DimaRazrab`
        : 'Категория | DimaRazrab';
    const pageDescription = current_category?.description
        || `Работы в категории ${current_category?.title || ''}. Портфолио DimaRazrab.`;
    const pageUrl = current_category?.slug
        ? `${SITE_URL}/category/${current_category.slug}`
        : SITE_URL;

    const structuredData = useMemo(() => {
        if (!current_category) return null;
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebPage",
                    "@id": `${pageUrl}#webpage`,
                    "url": pageUrl,
                    "name": pageTitle,
                    "description": pageDescription,
                    "inLanguage": "ru-RU",
                    "isPartOf": { "@id": `${SITE_URL}#website` },
                    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
                },
                {
                    "@type": "WebSite",
                    "@id": `${SITE_URL}#website`,
                    "url": SITE_URL,
                    "name": "DimaRazrab",
                    "inLanguage": "ru-RU",
                },
                {
                    "@type": "BreadcrumbList",
                    "@id": `${pageUrl}#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
                        { "@type": "ListItem", "position": 2, "name": "Портфолио", "item": `${SITE_URL}/#portfolio` },
                        { "@type": "ListItem", "position": 3, "name": current_category.title, "item": pageUrl },
                    ],
                },
            ],
        };
    }, [current_category, pageTitle, pageDescription, pageUrl]);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="DimaRazrab" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:image" content={`${SITE_URL}/media/og_desc.jpg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={`${SITE_URL}/media/og_desc.jpg`} />

                {/* Schema.org */}
                {structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                )}
            </Head>

        <div className={cn(className, styles['wrapper'])} {...props}>

            <HeaderCategory />

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px 0' }}>
                <Breadcrumbs items={[
                    { label: 'Главная', href: '/' },
                    { label: 'Портфолио', href: '/#portfolio' },
                    { label: current_category?.title || 'Категория' },
                ]} />
            </div>

            <div className={cn(index_styles['section'], styles['main'])}>

                <div className={styles['title-row']}>

                    <HeadingTitle className={styles['h1']} title={'Мои работы по категории:'} spanTitle='' />
                    <HeadingTitle className={styles['title']} title='' spanTitle={current_category?.title || ''} />

                    <div className={styles['description']}>{current_category?.description}</div>

                </div>

                <div className={styles['works-wrapper']} >

                    {works && (works?.length > 0 && works?.map(work => <WorkItem key={work.id} work={work} />))}

                </div>

            </div>

            <Footer className={styles['footer']} />

        </div>
        </>
    );
};
