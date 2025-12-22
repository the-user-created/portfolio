import { ABOUT, CONTACT } from '@/data/content';

export default function Header() {
    return (
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
    );
}
