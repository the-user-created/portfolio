import { AWARDS, VOLUNTEER } from '@/data/content';

export default function AwardsVolunteering() {
    return (
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
    );
}
