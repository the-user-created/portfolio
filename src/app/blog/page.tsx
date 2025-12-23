import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import BlogList from '@/components/BlogList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Thoughts & Tutorials',
    description: 'Writing about software development, design, and technology.',
};

export default async function BlogListPage() {
    const posts = await getBlogPosts();

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <Link
                href="/"
                className="group mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-black"
            >
                <svg
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back to Portfolio
            </Link>

            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Blog
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                    Thoughts, tutorials, and insights on software engineering.
                </p>
            </div>

            <BlogList posts={posts} />
        </div>
    );
}
