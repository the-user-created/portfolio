import { Metadata } from 'next';
import ResumeButton from '@/components/ResumeButton';
import {
    ABOUT,
    AWARDS,
    CONTACT,
    EDUCATION,
    EXPERIENCE,
    PROJECTS,
    SKILLS,
    VOLUNTEER,
} from '@/data/content';
import type { Project } from '@/types/project';

export const metadata: Metadata = {
    title: 'Developer Portfolio | Standard Version',
    description: `The professional portfolio for ${ABOUT.name}, a ${ABOUT.role}. Showcasing skills in ${SKILLS.languages.join(', ')}, and more.`,
};

// SVG Icons
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

/**
 * A standard, SEO-optimized portfolio page.
 */
export default function PortfolioPage() {
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
                                    <div className="mt-3 flex flex-wrap items-center gap-4">
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
                                        {/* Store Links */}
                                        {project.appStoreUrl && (
                                            <a
                                                href={project.appStoreUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
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
                                                className="flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
                                            >
                                                <PlayStoreIcon />
                                                Google Play
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
                        <ResumeButton />
                    </div>
                </section>
            </main>

            <footer className="mt-20 border-t pt-8 text-center text-sm text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} {ABOUT.name}. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
