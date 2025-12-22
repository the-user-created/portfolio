import { SKILLS } from '@/data/content';

export default function Skills() {
    return (
        <section id="skills" aria-labelledby="skills-heading">
            <h2
                id="skills-heading"
                className="mb-6 border-b pb-2 text-3xl font-semibold"
            >
                Technical Skills
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {[
                    { label: 'Languages', items: SKILLS.languages },
                    { label: 'Frameworks', items: SKILLS.frameworks },
                    {
                        label: 'Tools & Platforms',
                        items: [...SKILLS.tools, ...SKILLS.cloud],
                    },
                    { label: 'Soft Skills', items: SKILLS.soft },
                ].map((group) => (
                    <div key={group.label}>
                        <h3 className="mb-2 text-lg font-bold text-gray-900">
                            {group.label}
                        </h3>
                        <p className="leading-relaxed text-gray-700">
                            {group.items.join(', ')}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
