import dynamic from 'next/dynamic';
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
    SKILLS,
    THEMES,
    VOLUNTEER,
} from '@/data/content';

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

// Dynamic import for the Resume Downloader to avoid loading @react-pdf/renderer
// in the main bundle. This keeps the initial load fast.
const ResumeDownloader = dynamic(
    () => import('@/components/ResumeDownloader'),
    {
        loading: () => (
            <span className="text-[var(--term-dim)]">
                Loading PDF Engine...
            </span>
        ),
        ssr: false, // PDF generation is client-side only
    }
);

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
                    <div className="flex flex-col gap-4">
                        <div className="border-b border-[var(--term-dim)] pb-2">
                            <span className="font-bold text-[var(--term-prompt)]">
                                PROJECT_REGISTRY_V1.0
                            </span>
                        </div>
                        <ul className="list-none space-y-3">
                            {PROJECTS.map((p) => (
                                <li key={p.id} className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--term-text)]">
                                            [{p.id}]
                                        </span>
                                        <span className="font-bold">
                                            {p.name}
                                        </span>
                                    </div>
                                    <span className="pl-2 text-[var(--term-dim)]">
                                        {p.description}
                                    </span>
                                    <span className="pl-2 text-xs text-[var(--term-dim)]">
                                        Stack: {p.stack.join(', ')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <span className="mt-2 text-[var(--term-dim)] italic">
                            Usage: type &#39;project &lt;id&gt;&#39; to load
                            data shard (e.g., &#39;project fers&#39;)
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

            const project = PROJECTS.find(
                (p) => p.id === args[0].toLowerCase()
            );

            if (!project) {
                return {
                    output: `Error: Data shard '${args[0]}' corrupted or not found.`,
                    type: 'error',
                };
            }

            return {
                output: (
                    <div className="my-2 flex flex-col gap-4">
                        {/* Header */}
                        <div className="border-l-2 border-[var(--term-prompt)] pl-4">
                            <h3 className="text-xl font-bold text-[var(--term-prompt)]">
                                {project.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded bg-[var(--term-dim)]/20 px-1 py-0.5 text-[var(--term-text)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Overview */}
                        <div>
                            <span className="font-bold text-[var(--term-prompt)] underline">
                                OVERVIEW
                            </span>
                            <p className="mt-1 text-[var(--term-text)]">
                                {project.overview}
                            </p>
                        </div>

                        {/* Objectives */}
                        {project.objectives && (
                            <div>
                                <span className="font-bold text-[var(--term-prompt)] underline">
                                    OBJECTIVES
                                </span>
                                <ul className="mt-1 list-disc pl-5 text-[var(--term-dim)]">
                                    {project.objectives.map((obj, i) => (
                                        <li key={i}>{obj}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Challenges & Results */}
                        {project.challenges && (
                            <div>
                                <span className="font-bold text-[var(--term-prompt)] underline">
                                    CHALLENGES
                                </span>
                                <p className="mt-1">{project.challenges}</p>
                            </div>
                        )}

                        {project.results && (
                            <div>
                                <span className="font-bold text-[var(--term-prompt)] underline">
                                    RESULTS
                                </span>
                                <p className="mt-1">{project.results}</p>
                            </div>
                        )}

                        {/* Links / Artifacts / Stores */}
                        <div className="mt-2 border-t border-[var(--term-dim)] pt-2">
                            <span className="font-bold text-[var(--term-prompt)]">
                                EXTERNAL LINKS:
                            </span>
                            <div className="mt-1 flex flex-col gap-2 pl-2">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--term-text)] underline hover:text-[var(--term-prompt)]"
                                    >
                                        [SOURCE CODE]
                                    </a>
                                )}
                                {project.reportUrl && (
                                    <a
                                        href={project.reportUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--term-text)] underline hover:text-[var(--term-prompt)]"
                                    >
                                        [DOWNLOAD REPORT PDF]
                                    </a>
                                )}

                                {/* App Store Links */}
                                {(project.appStoreUrl ||
                                    project.playStoreUrl) && (
                                    <div className="mt-1 flex flex-wrap gap-4">
                                        {project.appStoreUrl && (
                                            <a
                                                href={project.appStoreUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 border border-[var(--term-text)] px-3 py-1 text-sm text-[var(--term-text)] transition-colors hover:bg-[var(--term-text)] hover:text-[var(--term-bg)]"
                                            >
                                                <AppleIcon />
                                                <span>App Store</span>
                                            </a>
                                        )}
                                        {project.playStoreUrl && (
                                            <a
                                                href={project.playStoreUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 border border-[var(--term-text)] px-3 py-1 text-sm text-[var(--term-text)] transition-colors hover:bg-[var(--term-text)] hover:text-[var(--term-bg)]"
                                            >
                                                <PlayStoreIcon />
                                                <span>Google Play</span>
                                            </a>
                                        )}
                                    </div>
                                )}

                                {project.images &&
                                    project.images.length > 0 && (
                                        <div className="mt-2 text-xs text-[var(--term-dim)]">
                                            Available Figures (click to view):
                                            {project.images.map((img, i) => (
                                                <a
                                                    key={i}
                                                    href={img.src}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 block underline hover:text-[var(--term-text)]"
                                                >
                                                    - {img.caption}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
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
                output: <ResumeDownloader />,
            };

        case 'open':
            const resource = args[0];
            if (!resource) {
                return {
                    output: "Usage: open <resource>. Available: 'github', 'linkedin'",
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
