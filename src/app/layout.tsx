import type { Metadata } from 'next';
import { ABOUT, CONTACT } from '@/data/content';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
    title: 'David Young - Portfolio',
    description: `Interactive command-line portfolio for ${ABOUT.name}, a ${ABOUT.role}.`,
    authors: [{ name: ABOUT.name }],
    keywords: [
        'developer',
        'portfolio',
        'react',
        'nextjs',
        'typescript',
        'software engineer',
        'full stack',
        ABOUT.name,
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: ABOUT.name,
        jobTitle: ABOUT.role,
        url: 'https://davidyoung.co.za',
        sameAs: [`https://${CONTACT.github}`, `https://${CONTACT.linkedin}`],
    };
    return (
        <html lang="en">
            <body className="antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}

                <Analytics />
            </body>
        </html>
    );
}
