import { EXPERIENCE } from '@/data/content';

export default function Experience() {
    return (
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
                        <p className="text-gray-700">{job.description}</p>
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
    );
}
