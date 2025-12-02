import { Metadata } from 'next';
import Link from 'next/link';
import {
    ABOUT,
    AWARDS,
    CONTACT,
    EDUCATION,
    EXPERIENCE,
    PROJECTS,
    RESUME_URL,
    SKILLS,
    VOLUNTEER,
} from '@/data/content';
import type { Project } from '@/types/terminal';

export const metadata: Metadata = {
    title: 'Developer Portfolio | Standard Version',
    description: `The professional portfolio for ${ABOUT.name}, a ${ABOUT.role}. Showcasing skills in ${SKILLS.languages.join(', ')}, and more.`,
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
            {/* Header */}
            <header className="mb-12 border-b pb-8">
                <h1 className="text-5xl font-bold">{ABOUT.name}</h1>
                <p className="mt-2 text-xl text-gray-600">{ABOUT.role}</p>
                <p className="mt-4 max-w-2xl">{ABOUT.bio}</p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-blue-600 hover:underline"
                    >
                        {CONTACT.email}
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                        href={`https://${CONTACT.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        GitHub
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                        href={`https://${CONTACT.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        LinkedIn
                    </a>
                </div>
            </header>

            <main className="space-y-16">
                {/* Experience Section */}
                <section id="experience" aria-labelledby="experience-heading">
                    <h2
                        id="experience-heading"
                        className="mb-6 border-b pb-2 text-3xl font-semibold"
                    >
                        Experience
                    </h2>
                    <div className="space-y-10">
                        {EXPERIENCE.map((job, idx) => (
                            <article key={idx} className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {job.link ? (
                                            <a
                                                href={job.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-700 hover:underline"
                                            >
                                                {job.company}
                                            </a>
                                        ) : (
                                            job.company
                                        )}
                                    </h3>
                                    <span className="text-sm font-medium whitespace-nowrap text-gray-500">
                                        {job.period}
                                    </span>
                                </div>
                                <div className="text-lg font-medium text-blue-700">
                                    {job.role}
                                </div>
                                <p className="text-gray-700">
                                    {job.description}
                                </p>
                                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600">
                                    {job.details.map((detail, dIdx) => (
                                        <li key={dIdx}>{detail}</li>
                                    ))}
                                </ul>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                    {job.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded bg-gray-100 px-2 py-1 text-gray-700"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" aria-labelledby="projects-heading">
                    <h2
                        id="projects-heading"
                        className="mb-6 border-b pb-2 text-3xl font-semibold"
                    >
                        Featured Projects
                    </h2>
                    <div className="grid gap-8">
                        {PROJECTS.map((project: Project) => (
                            <article
                                key={project.id}
                                aria-labelledby={`project-heading-${project.id}`}
                                className="group"
                            >
                                <div className="flex flex-col gap-1">
                                    <h3
                                        id={`project-heading-${project.id}`}
                                        className="text-2xl font-bold group-hover:text-blue-700"
                                    >
                                        {project.title}
                                    </h3>
                                    {/* ... stack and description ... */}
                                    <div className="text-sm text-gray-500 italic">
                                        {project.stack.join(' · ')}
                                    </div>
                                    <p className="mt-2 text-gray-700">
                                        {project.overview ||
                                            project.description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-4">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                View Source &rarr;
                                            </a>
                                        )}
                                        {project.reportUrl && (
                                            <a
                                                href={project.reportUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Download PDF Report &darr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" aria-labelledby="skills-heading">
                    <h2
                        id="skills-heading"
                        className="mb-6 border-b pb-2 text-3xl font-semibold"
                    >
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">
                                Languages
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {SKILLS.languages.join(', ')}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">
                                Frameworks
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {SKILLS.frameworks.join(', ')}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">
                                Tools & Platforms
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {[...SKILLS.tools, ...SKILLS.cloud].join(', ')}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">
                                Soft Skills
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {SKILLS.soft.join(', ')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section id="education" aria-labelledby="education-heading">
                    <h2
                        id="education-heading"
                        className="mb-6 border-b pb-2 text-3xl font-semibold"
                    >
                        Education
                    </h2>
                    <div className="space-y-6">
                        {EDUCATION.map((edu, idx) => (
                            <div key={idx}>
                                <div className="flex flex-wrap items-baseline justify-between">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {edu.school}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {edu.year}
                                    </span>
                                </div>
                                <div className="text-lg text-gray-800">
                                    {edu.degree}
                                </div>
                                <p className="mt-1 text-gray-600">
                                    {edu.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Awards & Volunteering */}
                <section
                    id="awards-volunteering"
                    aria-labelledby="av-heading"
                    className="grid grid-cols-1 gap-12 md:grid-cols-2"
                >
                    <div>
                        <h2
                            id="av-heading"
                            className="mb-4 border-b pb-2 text-2xl font-semibold"
                        >
                            Awards
                        </h2>
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                            {AWARDS.map((award, idx) => (
                                <li key={idx}>
                                    {award.link ? (
                                        <a
                                            href={award.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            {award.title}
                                        </a>
                                    ) : (
                                        <span className="font-medium">
                                            {award.title}
                                        </span>
                                    )}
                                    {award.year && (
                                        <span className="text-gray-500">
                                            {' '}
                                            ({award.year})
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
                            Volunteering
                        </h2>
                        <ul className="space-y-4">
                            {VOLUNTEER.map((vol, idx) => (
                                <li key={idx} className="flex flex-col gap-1">
                                    <div className="font-medium">
                                        {vol.role} @{' '}
                                        {vol.link ? (
                                            <a
                                                href={vol.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {vol.organization}
                                            </a>
                                        ) : (
                                            vol.organization
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {vol.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Contact Area */}
                <section
                    id="contact"
                    className="mt-8 rounded-xl bg-gray-50 p-8 text-center"
                >
                    <h2 className="mb-4 text-2xl font-bold">Get In Touch</h2>
                    <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                        I am always open to discussing new projects, creative
                        ideas, or opportunities to be part of your visions.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href={`mailto:${CONTACT.email}`}
                            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                        >
                            Email Me
                        </a>
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                        >
                            Download Resume
                        </a>
                    </div>
                </section>
            </main>

            <footer className="mt-20 border-t pt-8 text-center text-sm text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} {ABOUT.name}. All rights
                    reserved.
                </p>
                <p className="mt-2">
                    <Link
                        href="/"
                        className="font-medium text-blue-600 underline hover:text-blue-800"
                    >
                        Switch to Terminal Mode
                    </Link>
                </p>
            </footer>
        </div>
    );
}
