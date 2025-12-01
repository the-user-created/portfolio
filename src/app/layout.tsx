import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ABOUT, CONTACT } from '@/data/content';
import './globals.css';
import React from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Terminal Portfolio',
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
            </body>
        </html>
    );
}
