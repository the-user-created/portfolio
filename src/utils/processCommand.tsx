import { CommandResponse } from '@/types/terminal';
import {
    ABOUT,
    COMMANDS,
    CONTACT,
    PROJECTS,
    RESUME_URL,
    SKILLS,
    THEMES,
} from '@/data/content';

export const processCommand = (input: string): CommandResponse => {
    const trimmed = input.trim();
    if (!trimmed) return { output: null, type: 'input' };

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
        case 'help':
            return {
                output: (
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-[var(--term-prompt)]">
                            Available commands:
                        </span>
                        <ul className="list-none pl-4">
                            {COMMANDS.map((c) => (
                                <li key={c.cmd}>
                                    <span className="font-bold text-[var(--term-text)]">
                                        {c.cmd}
                                    </span>{' '}
                                    <span className="text-[var(--term-dim)]">
                                        - {c.desc}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ),
            };

        case 'about':
            return {
                output: (
                    <div className="flex max-w-2xl flex-col gap-2">
                        <span className="font-bold text-[var(--term-prompt)]">
                            {ABOUT.name}
                        </span>
                        <span>{ABOUT.role}</span>
                        <p>{ABOUT.bio}</p>
                        <span className="text-[var(--term-dim)] italic">
                            Try typing &#39;skills&#39; to see what I can do.
                        </span>
                    </div>
                ),
            };

        case 'skills':
            return {
                output: (
                    <div className="flex flex-col gap-2">
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Frontend:
                            </span>{' '}
                            {SKILLS.frontend.join(', ')}
                        </div>
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Backend:
                            </span>{' '}
                            {SKILLS.backend.join(', ')}
                        </div>
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Tools:
                            </span>{' '}
                            {SKILLS.tools.join(', ')}
                        </div>
                    </div>
                ),
            };

        case 'projects':
            return {
                output: (
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-[var(--term-prompt)]">
                            Featured Projects:
                        </span>
                        <ul className="list-none space-y-2 pl-4">
                            {PROJECTS.map((p) => (
                                <li key={p.id}>
                                    <span className="font-bold">[{p.id}]</span>{' '}
                                    {p.name} -{' '}
                                    <span className="text-[var(--term-dim)]">
                                        {p.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <span className="mt-2 text-[var(--term-dim)] italic">
                            Type &#39;project &lt;id&gt;&#39; for details (e.g.,
                            &#39;project 1&#39;)
                        </span>
                    </div>
                ),
            };

        case 'project':
            if (args.length === 0) {
                return {
                    output: "Usage: project <id>. Type 'projects' to see list.",
                    type: 'error',
                };
            }
            const project = PROJECTS.find((p) => p.id === args[0]);
            if (!project) {
                return {
                    output: `Project '${args[0]}' not found.`,
                    type: 'error',
                };
            }
            return {
                output: (
                    <div className="my-2 flex flex-col gap-2 border-l-2 border-[var(--term-dim)] pl-4">
                        <h3 className="text-lg font-bold text-[var(--term-prompt)]">
                            {project.name}
                        </h3>
                        <p>{project.details || project.description}</p>
                        <div>
                            <span className="font-bold">Tech Stack:</span>{' '}
                            {project.stack.join(', ')}
                        </div>
                    </div>
                ),
            };

        case 'contact':
            return {
                output: (
                    <div className="flex flex-col gap-1">
                        <span>Email: {CONTACT.email}</span>
                        <span>GitHub: {CONTACT.github}</span>
                        <span>LinkedIn: {CONTACT.linkedin}</span>
                    </div>
                ),
            };

        case 'resume':
            return {
                output: (
                    <div>
                        <span>Generating download link... </span>
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--term-prompt)] underline hover:no-underline"
                        >
                            Click here to download resume
                        </a>
                    </div>
                ),
            };

        case 'clear':
            return { output: null, action: { type: 'CLEAR' } };

        case 'theme':
            const subCmd = args[0];
            const themeName = args[1];

            if (subCmd === 'list') {
                return {
                    output: `Available themes: ${THEMES.join(', ')}`,
                };
            }

            if (subCmd === 'set') {
                if (THEMES.includes(themeName)) {
                    return {
                        output: `Theme set to: ${themeName}`,
                        action: { type: 'SET_THEME', payload: themeName },
                    };
                }
                return {
                    output: `Theme '${themeName}' not found. Available: ${THEMES.join(', ')}`,
                    type: 'error',
                };
            }

            return {
                output: "Usage: 'theme list' or 'theme set <name>'",
                type: 'error',
            };

        default:
            return {
                output: `command not found: ${command}. Type 'help' for assistance.`,
                type: 'error',
            };
    }
};
