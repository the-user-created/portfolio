'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Dynamically calculate unique tags from all posts
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
        return Array.from(tags).sort();
    }, [posts]);

    // Filter posts based on search query and selected tags
    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every((tag) => post.tags.includes(tag));

        return matchesSearch && matchesTags;
    });

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="space-y-12">
            {/* Search and Filter Controls */}
            <div className="space-y-6">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 pl-12 text-lg transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                    <svg
                        className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Tag Cloud */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                        isSelected
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="px-3 py-1.5 text-sm text-gray-400 hover:text-black hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Results Grid */}
            <div className="space-y-10">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="group relative flex flex-col items-start"
                        >
                            <div className="relative z-10 mb-3 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold tracking-wider text-blue-600 uppercase"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600">
                                <Link href={`/blog/${post.slug}`}>
                                    <span className="absolute -inset-x-6 -inset-y-6 z-0 scale-95 rounded-2xl bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
                                    <span className="relative z-10">
                                        {post.title}
                                    </span>
                                </Link>
                            </h2>

                            <time className="relative z-10 mt-2 mb-3 block text-sm text-gray-400">
                                {new Date(post.date).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}
                            </time>

                            <p className="relative z-10 leading-relaxed text-gray-600">
                                {post.description}
                            </p>

                            <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-600">
                                Read article
                                <svg
                                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">
                            No articles found matching your criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedTags([]);
                            }}
                            className="mt-4 text-blue-600 hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
