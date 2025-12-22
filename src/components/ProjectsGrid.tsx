'use client';

import React, { useState } from 'react';
import { Project } from '@/types/project';
import ProjectModal from './ProjectModal';

const AppleIcon = () => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>App Store</title>
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
);

const PlayStoreIcon = () => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Google Play</title>
        <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
);

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    return (
        <>
            <div className="grid gap-8">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        aria-labelledby={`project-heading-${project.id}`}
                        className="group relative flex flex-col gap-1 rounded-lg border border-transparent p-4 transition-colors hover:border-gray-100 hover:bg-gray-50"
                    >
                        <div className="flex flex-col gap-1">
                            <h3
                                id={`project-heading-${project.id}`}
                                className="cursor-pointer text-2xl font-bold group-hover:text-blue-700"
                                onClick={() => setSelectedProject(project)}
                            >
                                <button className="text-left focus:underline focus:outline-none">
                                    {project.title}
                                </button>
                            </h3>

                            <div className="text-sm text-gray-500 italic">
                                {project.stack.join(' · ')}
                            </div>

                            <p className="mt-2 text-gray-700">
                                {project.overview || project.description}
                            </p>

                            {/* Action Row */}
                            <div className="mt-3 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Read Details &rarr;
                                </button>

                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View Source &rarr;
                                    </a>
                                )}
                                {project.reportUrl && (
                                    <a
                                        href={project.reportUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Download PDF Report &darr;
                                    </a>
                                )}

                                {/* Direct External Links */}
                                {project.appStoreUrl && (
                                    <a
                                        href={project.appStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <AppleIcon />
                                        App Store
                                    </a>
                                )}
                                {project.playStoreUrl && (
                                    <a
                                        href={project.playStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <PlayStoreIcon />
                                        Play Store
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    );
}
