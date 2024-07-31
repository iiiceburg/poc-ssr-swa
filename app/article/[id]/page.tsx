// app/article/[id]/page.tsx
import { FC } from 'react';

type BlogPost = {
    id: number;
    title: string;
    body: string;
    thumbnail: string;
};

async function fetchBlogPost(id: number): Promise<BlogPost> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch the blog post');
    }
    const post = await res.json();
    return {
        ...post,
        thumbnail: 'https://via.placeholder.com/150',
    };
}

interface ArticlePageProps {
    params: {
        id: string;
    };
}

const ArticlePage: FC<ArticlePageProps> = async ({ params }) => {
    const { id } = params;
    if (!id) return <p>Loading...</p>;

    let blogPost: BlogPost | null = null;
    let errorMessage = '';

    try {
        blogPost = await fetchBlogPost(Number(id));
    } catch (error) {
        console.error(error);
        errorMessage = 'Unable to load the blog post. Please try again later.';
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {errorMessage ? (
                <p className="text-xl text-red-600">{errorMessage}</p>
            ) : (
                blogPost && (
                    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <img
                            src={blogPost.thumbnail}
                            alt={blogPost.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blogPost.title}</h1>
                        <p className="text-gray-600">{blogPost.body}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default ArticlePage;
