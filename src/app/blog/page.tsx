import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';

export default async function BlogListPage() {
    const posts = await getBlogPosts();

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
                &larr; Back to Portfolio
            </Link>

            <h1 className="mt-8 mb-12 text-4xl font-bold">Blog</h1>

            <div className="space-y-10">
                {posts.map((post) => (
                    <article
                        key={post.slug}
                        className="group relative flex flex-col items-start"
                    >
                        <h2 className="text-2xl font-semibold group-hover:text-blue-600">
                            <Link href={`/blog/${post.slug}`}>
                                <span className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
                                <span className="relative z-10">
                                    {post.title}
                                </span>
                            </Link>
                        </h2>
                        <time className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-gray-400">
                            <span
                                className="absolute inset-y-0 left-0 flex items-center"
                                aria-hidden="true"
                            >
                                <span className="h-4 w-0.5 rounded-full bg-gray-200" />
                            </span>
                            {new Date(post.date).toLocaleDateString()}
                        </time>
                        <p className="relative z-10 mt-2 text-gray-600">
                            {post.description}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}
