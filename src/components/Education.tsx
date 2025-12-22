import { EDUCATION } from '@/data/content';

export default function Education() {
    return (
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
                        <p className="mt-1 text-gray-600">{edu.details}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
