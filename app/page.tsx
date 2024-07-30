// app/page.tsx
import { FC } from 'react';

type BlogPost = {
    id: number;
    title: string;
    body: string;
    thumbnail: string; // Add this field for the image URL
};

async function fetchBlogPosts(): Promise<BlogPost[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    // Mock thumbnail URLs for demonstration
    const posts = await res.json();
    return posts.map((post: BlogPost) => ({
        ...post,
        thumbnail: 'https://via.placeholder.com/150' // Example thumbnail URL
    }));
}

const Page: FC = async () => {
    let blogPosts: BlogPost[] = [];
    try {
        blogPosts = await fetchBlogPosts();
    } catch (error) {
        console.error(error);
    }

    return (
        <main className="p-8 font-sans text-center bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-6 rounded-lg shadow-lg">
                {blogPosts.length > 0 ? (
                    blogPosts.map(post => (
                        <div key={post.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-32 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">{post.title}</h2>
                            <p className="text-gray-600">{post.body}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-gray-600 col-span-4">No blog posts available.</p>
                )}
            </div>
        </main>
    );
};

export default Page;
