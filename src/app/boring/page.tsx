import { Metadata } from 'next';
import Link from 'next/link';
import { ABOUT, CONTACT, PROJECTS, RESUME_URL, SKILLS } from '@/data/content';
import type { Project } from '@/types/terminal';

export const metadata: Metadata = {
    title: 'Developer Portfolio | Standard Version',
    description: `The professional portfolio for ${ABOUT.name}, a ${ABOUT.role}. Showcasing skills in ${SKILLS.frontend.join(', ')}, and more.`,
};

/**
 * A standard, SEO-optimized portfolio page.
 * This page is hidden from the main terminal UI but is accessible
 * to screen readers and search engine crawlers for better accessibility
 * and discoverability.
 */
export default function BoringPortfolioPage() {
    return (
        <div className="mx-auto max-w-4xl bg-white p-8 font-sans text-gray-800">
            <header className="mb-12 border-b pb-8">
                <h1 className="text-5xl font-bold">{ABOUT.name}</h1>
                <p className="mt-2 text-xl text-gray-600">{ABOUT.role}</p>
                <p className="mt-4">{ABOUT.bio}</p>
            </header>

            <main className="space-y-12">
                {/* Skills Section */}
                <section id="skills" aria-labelledby="skills-heading">
                    <h2
                        id="skills-heading"
                        className="mb-4 border-b pb-2 text-3xl font-semibold"
                    >
                        Technical Skills
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-bold">Frontend</h3>
                            <p>{SKILLS.frontend.join(', ')}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Backend</h3>
                            <p>{SKILLS.backend.join(', ')}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Tools</h3>
                            <p>{SKILLS.tools.join(', ')}</p>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" aria-labelledby="projects-heading">
                    <h2
                        id="projects-heading"
                        className="mb-4 border-b pb-2 text-3xl font-semibold"
                    >
                        Featured Projects
                    </h2>
                    <div className="space-y-8">
                        {PROJECTS.map((project: Project) => (
                            <article
                                key={project.id}
                                aria-labelledby={`project-heading-${project.id}`}
                            >
                                <h3
                                    id={`project-heading-${project.id}`}
                                    className="text-2xl font-bold"
                                >
                                    {project.name}
                                </h3>
                                <p className="text-md my-2 text-gray-500 italic">
                                    {project.stack.join(' · ')}
                                </p>
                                <p>{project.details || project.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" aria-labelledby="contact-heading">
                    <h2
                        id="contact-heading"
                        className="mb-4 border-b pb-2 text-3xl font-semibold"
                    >
                        Contact & Links
                    </h2>
                    <ul className="list-inside list-disc space-y-2">
                        <li>
                            Email:{' '}
                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="text-blue-600 hover:underline"
                            >
                                {CONTACT.email}
                            </a>
                        </li>
                        <li>
                            GitHub:{' '}
                            <a
                                href={`https://${CONTACT.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {CONTACT.github}
                            </a>
                        </li>
                        <li>
                            LinkedIn:{' '}
                            <a
                                href={`https://${CONTACT.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {CONTACT.linkedin}
                            </a>
                        </li>
                        <li>
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-blue-600 hover:underline"
                            >
                                Download Resume
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <footer className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
                <p>
                    This is the standard, accessible version of my portfolio.
                    For a more interactive experience, visit the{' '}
                    <Link href="/" className="underline">
                        terminal version
                    </Link>
                    .
                </p>
            </footer>
        </div>
    );
}
