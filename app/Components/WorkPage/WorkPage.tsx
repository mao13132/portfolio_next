import { WorkPageProps } from "./WorkPage.props";
import { AppContext } from "@/app/Context/app.context";
import Head from "next/head";
import { useEffect, useMemo } from "react";

import styles from './WorkPage.module.css';

import index_styles from '@/app/Components/Index/Idex.module.css';

import cn from 'classnames';
import { useContext } from "react";
import { HeadingTitle } from "../HeadingTitle/HeadingTitle";
import { HeaderCategory } from "../HeaderCategory/HeaderCategory";
import { Footer } from "../Footer/Footer";
import { Contacts } from "../Contacts/Contacts";
import { motion } from 'framer-motion';
import { descriptionsAnimation } from "./animationsDescriptions";

const SITE_URL = 'https://dima-razrab.com';

export const WorkPage = ({ className, ...props }: WorkPageProps): JSX.Element => {
    const { work } = useContext(AppContext);

    const pageTitle = work?.title ? `${work.title} | DimaRazrab` : 'Работа | DimaRazrab';
    const pageDescription = work?.short_text || work?.title || 'Проект из портфолио DimaRazrab';
    const pageUrl = work?.slug ? `${SITE_URL}/work/${work.slug}` : SITE_URL;
    const pageImage = work?.image ? `${SITE_URL}${work.image}` : `${SITE_URL}/media/og_desc.jpg`;

    const structuredData = useMemo(() => {
        if (!work) return null;
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
                        { "@type": "ListItem", "position": 3, "name": work.title, "item": pageUrl },
                    ],
                },
                {
                    "@type": "CreativeWork",
                    "@id": `${pageUrl}#creativework`,
                    "name": work.title,
                    "description": pageDescription,
                    "url": pageUrl,
                    "image": pageImage,
                    "creator": {
                        "@type": "Person",
                        "name": "Дмитрий Малышев",
                        "url": SITE_URL,
                    },
                },
            ],
        };
    }, [work, pageTitle, pageDescription, pageUrl, pageImage]);

    useEffect(() => {
        if (work?.title) {
            document.title = pageTitle;
        }
    }, [work, pageTitle]);

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
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />

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

            <div className={cn(index_styles['section'], styles['main'])}>

                <div className={styles['title-row']}>
                    <HeadingTitle tag='h1' className={styles['title']} title='' spanTitle={work?.title || ``} />

                    <div className={styles['text']}>{work?.text || ``}</div>

                </div>

                <div className={styles['video-wrapper']}>
                    <iframe className={styles['video']} src={work?.video} frameBorder="0" allow="clipboard-write; autoplay" allowFullScreen></iframe>
                </div>

                <motion.div
                    transition={{ duration: 1 }}
                    variants={descriptionsAnimation}
                    initial="hidden"
                    whileInView="visible"
                    className={styles['desc-wrapper']}>

                    <div className={styles['descriptions']} dangerouslySetInnerHTML={{ __html: work?.descriptions || `` }} />
                </motion.div>

            </div>

            <Contacts className={styles['section']} />

            <Footer className={styles['footer']} />

            </div>
        </>
    );
};
