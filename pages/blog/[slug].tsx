import { GetStaticPaths, GetStaticProps } from 'next';
import { ArticleTemplate } from '@/app/Components/Article/ArticleTemplate';
import { Article, articles, getAllSlugs, getArticleBySlug } from '@/data/articles';

/* ============================================================
   BLOG ARTICLE PAGE — Dynamic Route
   /blog/[slug]
   ============================================================ */

interface BlogArticlePageProps {
    article: Article;
}

export default function BlogArticlePage({ article }: BlogArticlePageProps) {
    return <ArticleTemplate article={article} />;
}

/* ─── Static paths for all articles ─── */
export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllSlugs();
    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false, // 404 for unknown slugs
    };
};

/* ─── Static props for each article ─── */
export const getStaticProps: GetStaticProps<BlogArticlePageProps> = async ({ params }) => {
    const slug = params?.slug as string;
    const article = getArticleBySlug(slug);

    if (!article) {
        return { notFound: true };
    }

    return {
        props: {
            article: JSON.parse(JSON.stringify(article)),
        },
    };
};
