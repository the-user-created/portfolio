'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ResumeButtonLoading = () => (
    <button
        className="cursor-wait rounded-lg border border-black px-6 py-3 font-medium text-black opacity-75"
        disabled
    >
        Loading PDF Engine...
    </button>
);

const ResumeLink = dynamic(() => import('./ResumeLink'), {
    ssr: false,
    loading: () => <ResumeButtonLoading />,
});

export default function ResumeButton() {
    return <ResumeLink />;
}
