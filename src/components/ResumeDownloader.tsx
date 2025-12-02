'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from './ResumeDocument';
import { ABOUT } from '@/data/content';

const ResumeDownloader = () => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[var(--term-dim)]">
                Initializing PDF generator module...
            </span>
            <PDFDownloadLink
                document={<ResumeDocument />}
                fileName={`${ABOUT.name.replace(' ', '_')}_Resume.pdf`}
                className="text-[var(--term-prompt)] underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
                {({ loading }) =>
                    loading
                        ? 'Processing data chunks...'
                        : '>> DOWNLOAD GENERATED RESUME (PDF)'
                }
            </PDFDownloadLink>
        </div>
    );
};

export default ResumeDownloader;
