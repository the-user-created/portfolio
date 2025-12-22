// src/app/blog/[slug]/page.tsx
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
                className="text-sm text-blue-600 hover:underline"
            >
                &larr; Back to blog
            </Link>

            <header className="mt-8 mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    {post.title}
                </h1>
                <p className="mt-2 text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                </p>
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
