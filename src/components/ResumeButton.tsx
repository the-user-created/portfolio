'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Define loading state locally to match button styling
const ResumeButtonLoading = () => (
    <button
        className="cursor-wait rounded-lg border border-black px-6 py-3 font-medium text-black opacity-75"
        disabled
    >
        Loading PDF Engine...
    </button>
);

// Dynamically import the implementation component.
// Using ssr: false here works because this file is marked 'use client'.
const ResumeLink = dynamic(() => import('././ResumeLink'), {
    ssr: false,
    loading: () => <ResumeButtonLoading />,
});

export default function ResumeButton() {
    return <ResumeLink />;
}
