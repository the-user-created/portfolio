import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Animate in
        setIsMounted(true);
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

        // Cleanup function for unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Function to handle the closing sequence
    const handleClose = () => {
        setIsMounted(false); // Trigger exit animation
        setTimeout(onClose, 300); // Unmount component after animation
    };

    // Add keyboard listener for Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-300 ease-out ${
                isMounted ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
        >
            <div
                className={`relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl transition-all duration-300 ease-out ${
                    isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                onClick={(e) => e.stopPropagation()} // Prevent click through to backdrop
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2
                    id={`modal-title-${project.id}`}
                    className="mb-1 pr-8 text-3xl font-bold text-gray-900"
                >
                    {project.title}
                </h2>
                <div className="mb-6 flex flex-wrap gap-2 text-sm text-gray-500">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="space-y-6 text-gray-700">
                    <div>
                        <h3 className="mb-2 font-bold text-gray-900">
                            Overview
                        </h3>
                        <p className="leading-relaxed">{project.overview}</p>
                    </div>

                    {project.objectives && (
                        <div>
                            <h3 className="mb-2 font-bold text-gray-900">
                                Key Objectives
                            </h3>
                            <ul className="list-inside list-disc space-y-1">
                                {project.objectives.map((obj, i) => (
                                    <li key={i}>{obj}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.challenges && (
                        <div>
                            <h3 className="mb-2 font-bold text-gray-900">
                                Challenges
                            </h3>
                            <p className="leading-relaxed">
                                {project.challenges}
                            </p>
                        </div>
                    )}

                    {project.results && (
                        <div>
                            <h3 className="mb-2 font-bold text-gray-900">
                                Results
                            </h3>
                            <p className="leading-relaxed">{project.results}</p>
                        </div>
                    )}

                    {project.images && project.images.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {project.images.map((img, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={800}
                                            height={600}
                                            className="h-auto w-full object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            quality={85}
                                        />
                                    </div>
                                    <p className="text-center text-xs text-gray-500 italic">
                                        {img.caption}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4 border-t pt-6">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
                        >
                            View Source
                        </a>
                    )}
                    {project.reportUrl && (
                        <a
                            href={project.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Download Report PDF
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
