import { CommandResponse } from '@/types/terminal';
import {
    ABOUT,
    ASCII_CAT,
    ASCII_HELLO,
    COMMANDS,
    CONTACT,
    FORTUNES,
    PROJECTS,
    RESUME_URL,
    SKILLS,
    THEMES,
} from '@/data/content';

export const processCommand = (input: string): CommandResponse => {
    const trimmed = input.trim();
    if (!trimmed) return { output: null, type: 'input' };

    // Handle Fork Bomb - Immediate Meltdown
    if (trimmed === ':(){ :|:& };:') {
        return {
            output: 'Fork bomb detected. System resources critical.',
            type: 'error',
            action: { type: 'TRIGGER_MELTDOWN' },
        };
    }

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

        case 'open':
            const resource = args[0];
            if (!resource) {
                return {
                    output: "Usage: open <resource>. Available: 'github', 'linkedin', 'resume'",
                    type: 'error',
                };
            }
            let url: string;
            switch (resource.toLowerCase()) {
                case 'github':
                    url = `https://${CONTACT.github}`;
                    window.open(url, '_blank');
                    return { output: `Opening GitHub: ${url}` };
                case 'linkedin':
                    url = `https://${CONTACT.linkedin}`;
                    window.open(url, '_blank');
                    return { output: `Opening LinkedIn: ${url}` };
                case 'resume':
                    window.open(RESUME_URL, '_blank');
                    return { output: `Opening resume...` };
                default:
                    return {
                        output: `Resource '${resource}' not found.`,
                        type: 'error',
                    };
            }
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

        // --- FUN / SECONDARY COMMANDS ---

        case 'sudo':
            // Easter egg override if they try to sudo rm -rf
            if (args[0] === 'rm' && args.includes('-rf')) {
                return {
                    output: 'Nice try, but even root needs to confirm this. Proceed with destruction? [y/N]',
                    type: 'error',
                    action: { type: 'CONFIRM_DESTRUCTION' },
                };
            }
            return {
                output: 'Nice try. You are not root on this system.',
                type: 'error',
            };

        case 'fortune':
            const randomIndex = Math.floor(Math.random() * FORTUNES.length);
            const randomFortune = FORTUNES[randomIndex];

            return {
                output: (
                    <span className="text-[var(--term-prompt)] italic">
                        &#34;{randomFortune}&#34;
                    </span>
                ),
            };

        case 'matrix':
            return {
                output: 'The Matrix has you...',
                action: { type: 'SET_THEME', payload: 'matrix' },
            };

        case 'hello':
        case 'hi':
            return {
                output: <pre className="text-xs leading-3">{ASCII_HELLO}</pre>,
            };

        case 'cat':
            if (args[0] === 'cat.jpg' || !args[0]) {
                return {
                    output: (
                        <pre className="text-xs leading-3">{ASCII_CAT}</pre>
                    ),
                };
            }
            return {
                output: `cat: ${args[0]}: No such file or directory`,
                type: 'error',
            };

        // --- DESTRUCTIVE COMMANDS ---

        case 'rm':
            if (
                args.includes('-rf') &&
                (args.includes('/') || args.includes('*'))
            ) {
                return {
                    output: 'Warning: You are about to delete critical system files. This action is irreversible. Proceed? [y/N]',
                    type: 'error',
                    action: { type: 'CONFIRM_DESTRUCTION' },
                };
            }
            return {
                output: 'usage: rm [-rf] <path> (Be careful what you wish for...)',
            };

        case 'format':
            if (args[0] && args[0].toLowerCase().startsWith('c')) {
                return {
                    output: 'Warning: Formatting drive C: will destroy the universe. Proceed? [y/N]',
                    type: 'error',
                    action: { type: 'CONFIRM_DESTRUCTION' },
                };
            }
            return {
                output: 'format: missing operand or drive',
                type: 'error',
            };

        default:
            return {
                output: `command not found: ${command}. Type 'help' for assistance.`,
                type: 'error',
            };
    }
};
