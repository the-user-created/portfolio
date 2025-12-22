import { INTERESTS } from '@/data/content';

export default function Interests() {
    return (
        <section id="interests" aria-labelledby="interests-heading">
            <h2
                id="interests-heading"
                className="mb-6 border-b pb-2 text-3xl font-semibold"
            >
                Interests
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {INTERESTS.map((interest, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-gray-900">
                            {interest.title}
                        </h3>
                        <p className="text-gray-700">{interest.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
