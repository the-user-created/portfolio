import { CommandResponse } from '@/types/terminal';
import {
    ABOUT,
    ASCII_CAT,
    ASCII_HELLO,
    AWARDS,
    COMMAND_SYNONYMS,
    COMMANDS,
    CONTACT,
    EDUCATION,
    EXPERIENCE,
    FORTUNES,
    INTERESTS,
    PROJECTS,
    RESUME_URL,
    SKILLS,
    THEMES,
    VOLUNTEER,
} from '@/data/content';

export const processCommand = (
    input: string,
    options: { isSabotageProof?: boolean } = {}
): CommandResponse => {
    const trimmed = input.trim();
    if (!trimmed) return { output: null, type: 'input' };

    // Handle Fork Bomb - Immediate Meltdown
    if (options.isSabotageProof && trimmed === ':(){ :|:& };:') {
        return {
            output: 'Note: destructive commands are disabled on this system.',
            type: 'system',
        };
    }

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

    const resolvedCommand = COMMAND_SYNONYMS[command] || command;

    switch (resolvedCommand) {
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
                                        {c.synonyms &&
                                            ` (${c.synonyms.join(', ')})`}
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
                            Type &#39;skills&#39; or &#39;experience&#39; to
                            learn more.
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
                                Languages:
                            </span>{' '}
                            {SKILLS.languages.join(', ')}
                        </div>
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Frameworks:
                            </span>{' '}
                            {SKILLS.frameworks.join(', ')}
                        </div>
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Cloud:
                            </span>{' '}
                            {SKILLS.cloud.join(', ')}
                        </div>
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Tools & Platforms:
                            </span>{' '}
                            {SKILLS.tools.join(', ')}
                        </div>
                        <div>
                            <span className="font-bold text-[var(--term-prompt)]">
                                Professional:
                            </span>{' '}
                            {SKILLS.soft.join(', ')}
                        </div>
                    </div>
                ),
            };

        case 'experience':
            return {
                output: (
                    <div className="flex flex-col gap-4">
                        {EXPERIENCE.map((job, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                                    <span className="font-bold text-[var(--term-prompt)]">
                                        {job.role}
                                    </span>
                                    <span className="text-sm text-[var(--term-dim)]">
                                        {job.period}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">
                                        @ {job.company}
                                    </span>
                                    {job.link && (
                                        <a
                                            href={job.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[var(--term-dim)] underline hover:text-[var(--term-text)]"
                                        >
                                            [link]
                                        </a>
                                    )}
                                </div>
                                <p className="mb-1">{job.description}</p>
                                <ul className="list-disc pl-5 text-[var(--term-dim)]">
                                    {job.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                                <div className="mt-1 text-xs text-[var(--term-dim)]">
                                    Stack: {job.tech.join(', ')}
                                </div>
                            </div>
                        ))}
                    </div>
                ),
            };

        case 'education':
            return {
                output: (
                    <div className="flex flex-col gap-4">
                        {EDUCATION.map((edu, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                                    <span className="font-bold text-[var(--term-prompt)]">
                                        {edu.school}
                                    </span>
                                    <span className="text-sm text-[var(--term-dim)]">
                                        {edu.year}
                                    </span>
                                </div>
                                <div>{edu.degree}</div>
                                <div className="text-[var(--term-dim)]">
                                    {edu.details}
                                </div>
                            </div>
                        ))}
                    </div>
                ),
            };

        case 'awards':
            return {
                output: (
                    <ul className="list-disc space-y-2 pl-4">
                        {AWARDS.map((award, index) => (
                            <li key={index}>
                                <span className="font-bold text-[var(--term-text)]">
                                    {award.title}
                                </span>
                                {award.institution && (
                                    <span className="text-[var(--term-dim)]">
                                        {' '}
                                        - {award.institution}
                                    </span>
                                )}
                                {award.year && (
                                    <span className="text-[var(--term-dim)]">
                                        {' '}
                                        ({award.year})
                                    </span>
                                )}
                                {award.link && (
                                    <a
                                        href={award.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-xs text-[var(--term-prompt)] underline hover:no-underline"
                                    >
                                        [View]
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                ),
            };

        case 'volunteer':
            return {
                output: (
                    <div className="flex flex-col gap-4">
                        {VOLUNTEER.map((vol, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <div className="flex flex-wrap items-baseline gap-x-2">
                                    <span className="font-bold text-[var(--term-prompt)]">
                                        {vol.role}
                                    </span>
                                    <span>- {vol.organization}</span>
                                    {vol.link && (
                                        <a
                                            href={vol.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[var(--term-dim)] underline hover:text-[var(--term-text)]"
                                        >
                                            [link]
                                        </a>
                                    )}
                                </div>
                                <span className="text-sm text-[var(--term-dim)]">
                                    {vol.event}
                                </span>
                                <p>{vol.description}</p>
                                <ul className="list-disc pl-5 text-[var(--term-dim)]">
                                    {vol.details.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ),
            };

        case 'interests':
            return {
                output: (
                    <div className="flex flex-col gap-2">
                        {INTERESTS.map((int, index) => (
                            <div key={index}>
                                <span className="font-bold text-[var(--term-prompt)]">
                                    {int.title}:
                                </span>{' '}
                                <span className="text-[var(--term-dim)]">
                                    {int.description}
                                </span>
                            </div>
                        ))}
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
                        {(project.github || project.link) && (
                            <div className="mt-2 flex gap-4">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--term-prompt)] underline hover:no-underline"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--term-prompt)] underline hover:no-underline"
                                    >
                                        Demo
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ),
            };

        case 'contact':
            return {
                output: (
                    <div className="flex flex-col gap-1">
                        <div>
                            Email:{' '}
                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="text-[var(--term-prompt)] underline hover:no-underline"
                            >
                                {CONTACT.email}
                            </a>
                        </div>
                        <div>
                            GitHub:{' '}
                            <a
                                href={`https://${CONTACT.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--term-prompt)] underline hover:no-underline"
                            >
                                {CONTACT.github}
                            </a>
                        </div>
                        <div>
                            LinkedIn:{' '}
                            <a
                                href={`https://${CONTACT.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--term-prompt)] underline hover:no-underline"
                            >
                                {CONTACT.linkedin}
                            </a>
                        </div>
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
                if (options.isSabotageProof) {
                    return {
                        output: 'Note: destructive commands are disabled on this system.',
                        type: 'system',
                    };
                }
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
                output: 'Entering the Matrix...',
                action: { type: 'TRIGGER_MATRIX' },
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
                if (options.isSabotageProof) {
                    return {
                        output: 'Note: destructive commands are disabled on this system.',
                        type: 'system',
                    };
                }
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
                if (options.isSabotageProof) {
                    return {
                        output: 'Note: destructive commands are disabled on this system.',
                        type: 'system',
                    };
                }
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
