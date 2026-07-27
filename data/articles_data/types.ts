/* ============================================================
   ARTICLE TYPES & HELPERS
   ============================================================ */

const SITE_URL = 'https://dima-razrab.com';
const OG_IMAGE = `${SITE_URL}/media/og_desc.jpg`;

export interface ArticleFAQ {
    question: string;
    answer: string;
}

export interface ArticleSection {
    id: string;
    title: string;
    content: string;
    subsections?: {
        title: string;
        content: string;
    }[];
}

export interface ArticleTOC {
    id: string;
    title: string;
}

export interface InternalLink {
    anchor: string;
    url: string;
    context: string;
}

export interface Article {
    slug: string;
    title: string;
    metaDescription: string;
    keywords: string;
    h1: string;
    ogTitle: string;
    ogDescription: string;
    canonical: string;
    heroBadge: string;
    heroSubtitle: string;
    readingTime: string;
    wordCount: string;
    publishDate: string;
    modifiedDate: string;
    author: string;
    toc: ArticleTOC[];
    sections: ArticleSection[];
    faq: ArticleFAQ[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaSource: string;
    structuredData: object;
    internalLinks?: InternalLink[];
}

const author = {
    "@type": "Person",
    "name": "Дмитрий Малышев",
    "url": SITE_URL,
    "jobTitle": "Fullstack-разработчик",
    "sameAs": ["https://t.me/dima_razrab"],
};

export const makeArticleSchema = (
    slug: string,
    title: string,
    description: string,
    datePublished: string,
    dateModified: string,
    faqEntities: { name: string; text: string }[],
    wordCount: number,
) => {
    const url = `${SITE_URL}/blog/${slug}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${url}#article`,
                "mainEntityOfPage": { "@id": `${url}#webpage` },
                "headline": title,
                "description": description,
                "image": OG_IMAGE,
                "author": author,
                "publisher": {
                    "@type": "Organization",
                    "name": "DimaRazrab",
                    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/home.png` }
                },
                "datePublished": datePublished,
                "dateModified": dateModified,
                "wordCount": wordCount,
                "inLanguage": "ru-RU",
                "about": { "@type": "Thing", "name": "Telegram боты" },
                "articleSection": "Технологии",
            },
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                "url": url,
                "name": title,
                "description": description,
                "inLanguage": "ru-RU",
                "isPartOf": { "@id": `${SITE_URL}#website` },
                "datePublished": datePublished,
                "dateModified": dateModified,
                "breadcrumb": { "@id": `${url}#breadcrumb` },
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}#website`,
                "url": SITE_URL,
                "name": "DimaRazrab — Разработка Telegram-ботов",
                "inLanguage": "ru-RU",
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE_URL },
                    { "@type": "ListItem", "position": 2, "name": "Блог", "item": `${SITE_URL}/blog` },
                    { "@type": "ListItem", "position": 3, "name": title, "item": url },
                ],
            },
            {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                "mainEntity": faqEntities.map(q => ({
                    "@type": "Question",
                    "name": q.name,
                    "acceptedAnswer": { "@type": "Answer", "text": q.text },
                })),
            },
        ],
    };
};
