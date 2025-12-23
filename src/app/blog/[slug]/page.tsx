import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import 'katex/dist/katex.min.css';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) notFound();

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <Link
                href="/blog"
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
                Back to blog
            </Link>

            <header className="mt-4 mb-12">
                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold tracking-wide text-gray-700 uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    {post.title}
                </h1>
                <time className="mt-4 block text-lg text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
            </header>

            <article className="prose prose-gray lg:prose-lg prose-headings:font-semibold prose-a:text-blue-600">
                <MDXRemote
                    source={post.content}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkMath],
                            rehypePlugins: [rehypeKatex],
                        },
                    }}
                />
            </article>
        </div>
    );
}
