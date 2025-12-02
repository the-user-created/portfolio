'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TerminalLine } from '@/types/terminal';
import { processCommand } from '@/utils/processCommand';
import { BOOT_LOGS, BootLogLine } from '@/data/bootLogs';
import { COMMANDS, COMMAND_SYNONYMS } from '@/data/content';
import MatrixAnimation from './MatrixAnimation';

const CRITICAL_FILES = [
    '/bin/kernel',
    '/usr/lib/system32',
    '/var/log/life_choices.log',
    '/etc/portfolio_config',
    '/home/visitor/hope',
    '/dev/null',
    '/sys/firmware/efi',
    '/proc/kcore',
    '/boot/vmlinuz',
];

// Abbreviated boot sequence for repeat visits in the same session
const FAST_BOOT_LOGS: BootLogLine[] = [
    { text: '[INFO] Resuming session...', delay: 50 },
    { text: '[ OK ] System checks complete.', delay: 100 },
    { text: '[INFO] Welcome back to PortfolioOS.', delay: 200 },
];

export default function Terminal() {
    const router = useRouter();
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const historyPointer = useRef(0);
    const [isBooting, setIsBooting] = useState(true);
    const [theme, setTheme] = useState('default');

    const [inputMode, setInputMode] = useState<'standard' | 'confirmation'>(
        'standard'
    );

    // State for autocomplete
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);

    const [isExiting, setIsExiting] = useState(false);

    const [isMatrixAnimating, setIsMatrixAnimating] = useState(false);

    // Meltdown State Machine
    const [isMeltdown, setIsMeltdown] = useState(false);
    const [glitchIntensity, setGlitchIntensity] = useState(0); // 0=None, 1=Text, 2=Screen
    const [isCrashed, setIsCrashed] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const [isSabotageProof, setIsSabotageProof] = useState(false);
    const [recoveryText, setRecoveryText] = useState(''); // State for recovery animation text

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lineIdCounter = useRef(0);
    const bootStartTime = useRef(0);

    // Create a memoized list of all commands for autocomplete
    const allPossibleCommands = useMemo(() => {
        const mainCommands = COMMANDS.map((c) => c.cmd);
        const synonymMapKeys = Object.keys(COMMAND_SYNONYMS);
        // Use a Set to handle potential duplicates
        const allSynonyms = COMMANDS.flatMap((c) => c.synonyms || []);
        return [
            ...new Set([...mainCommands, ...synonymMapKeys, ...allSynonyms]),
        ].sort();
    }, []);

    // Helper to generate unique IDs for terminal lines
    const getUniqueId = (prefix: string = 'line'): string => {
        lineIdCounter.current++;
        return `${prefix}-${lineIdCounter.current}`;
    };

    // Global Keydown Listener for "Type to Focus"
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // 1. Do not interfere if the system is in a non-interactive state
            if (isBooting || isCrashed || isRecovering || isMatrixAnimating)
                return;

            // 2. Do not interfere if the input is already focused
            if (document.activeElement === inputRef.current) return;

            // 3. Do not interfere with standard shortcuts (Ctrl+C, Cmd+R, Alt+Tab, etc.)
            // This allows users to copy text from history without jumping to the bottom.
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            // 4. Do not trigger on standalone modifier keys
            if (['Control', 'Shift', 'Alt', 'Meta', 'Tab'].includes(e.key))
                return;

            // 5. Focus the input
            // This will naturally scroll the input into view, which is desired behavior when typing.
            inputRef.current?.focus();
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isBooting, isCrashed, isRecovering, isMatrixAnimating]);

    // Apply theme to body and clean up on unmount
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);

        // This cleanup function runs when the component unmounts
        return () => {
            document.body.removeAttribute('data-theme');
        };
    }, [theme]);

    // Exit Sequence Effect
    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                router.push('/boring');
            }, 1500); // 1.5s delay to show the logout screen
            return () => clearTimeout(timer);
        }
    }, [isExiting, router]);

    // Handle Boot Sequence
    useEffect(() => {
        const hasBooted = sessionStorage.getItem('hasBooted');
        const bootSequence = hasBooted ? FAST_BOOT_LOGS : BOOT_LOGS;

        if (bootStartTime.current === 0) {
            bootStartTime.current = performance.now();
        }

        let timeoutId: NodeJS.Timeout;
        let lineIndex = 0;

        const processBootLog = () => {
            if (lineIndex >= bootSequence.length) {
                setIsBooting(false);
                setHistory((prev) => [
                    ...prev,
                    {
                        id: getUniqueId('init-help'),
                        type: 'system',
                        content: "Type 'help' to begin.",
                    },
                ]);
                // Set flag only after the first full boot completes
                if (!hasBooted) {
                    sessionStorage.setItem('hasBooted', 'true');
                }
                return;
            }

            // BATCHING LOGIC:
            // Mobile browsers struggle with 135+ rapid React state updates.
            // We group "noise" lines (no specific delay) into chunks of 3
            // to reduce render cycles and ensure sub-3s boot time.
            const newLines: TerminalLine[] = [];
            let tempIndex = lineIndex;
            const BATCH_SIZE = 3;

            while (tempIndex < bootSequence.length) {
                const line = bootSequence[tempIndex];
                const elapsed =
                    (performance.now() - bootStartTime.current) / 1000;
                const timestamp = `[${elapsed.toFixed(6).padStart(12, ' ')}] `;

                newLines.push({
                    id: getUniqueId('boot'),
                    type: 'system',
                    content: timestamp + line.text,
                });

                tempIndex++;

                // Stop batching if:
                // 1. This line has a specific delay (needs emphasis)
                // 2. We reached the batch limit
                if (line.delay || newLines.length >= BATCH_SIZE) {
                    break;
                }
            }

            // Single State Update for the batch
            setHistory((prev) => [...prev, ...newLines]);

            // Advance the real index
            lineIndex = tempIndex;

            // Determine delay for the next tick
            // If the last line in this batch had a specific delay, respect it.
            // Otherwise, use a fast constant (20ms) to keep the text flying.
            const lastLine = bootSequence[tempIndex - 1];
            const nextDelay = lastLine?.delay ?? 20;

            timeoutId = setTimeout(processBootLog, nextDelay);
        };

        // Start immediately
        timeoutId = setTimeout(processBootLog, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        // Keep input in view when virtual keyboard opens
        const handleResize = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        };
        window.visualViewport?.addEventListener('resize', handleResize);
        return () =>
            window.visualViewport?.removeEventListener('resize', handleResize);
    }, []);

    // Meltdown Sequence Effect
    useEffect(() => {
        if (isMeltdown) {
            let step = 0;
            let timeoutId: NodeJS.Timeout;

            const runGlitchStep = () => {
                // Determine stage based on step count
                // Total steps ~28 before crash

                // Stage 3: Crash imminent (Step 25+)
                if (step >= 28) {
                    setIsFrozen(true);
                    setGlitchIntensity(2);
                    timeoutId = setTimeout(() => {
                        setIsCrashed(true);
                        setIsMeltdown(false);
                        setIsFrozen(false);
                        setGlitchIntensity(0);
                    }, 1500);
                    return;
                }

                // Calculate delay and intensity based on progress
                let currentDelay: number;

                if (step < 12) {
                    // Stage 0: Initial rapid deletion (Normal)
                    setGlitchIntensity(0);
                    currentDelay = 60;
                } else if (step < 22) {
                    // Stage 1: Corruption starts (Text Glitch + Stutter)
                    setGlitchIntensity(1);
                    // Erratic timing: mostly fast, occasional lag
                    currentDelay = Math.random() > 0.8 ? 300 : 40;
                } else {
                    // Stage 2: Heavy Damage (Screen Glitch + Freezes)
                    setGlitchIntensity(2);
                    // Frequent pauses/freezes
                    currentDelay = Math.random() > 0.6 ? 600 : 80;
                    setIsFrozen(Math.random() > 0.7); // 30% chance to freeze visuals
                }

                timeoutId = setTimeout(() => {
                    const randomFile =
                        CRITICAL_FILES[
                            Math.floor(Math.random() * CRITICAL_FILES.length)
                        ];
                    const garbage = Array(Math.floor(Math.random() * 8))
                        .fill(0)
                        .map(() => Math.floor(Math.random() * 16).toString(16))
                        .join('');

                    setHistory((prev) => [
                        ...prev,
                        {
                            id: getUniqueId('meltdown'),
                            type: 'error',
                            content:
                                step < 12
                                    ? `deleting ${randomFile}...`
                                    : `SEGFAULT: ${randomFile} [0x${garbage}]`,
                        },
                    ]);

                    step++;
                    runGlitchStep();
                }, currentDelay);
            };

            runGlitchStep();

            return () => clearTimeout(timeoutId);
        }
    }, [isMeltdown]);

    // Crash Effect (displays FATAL ERROR screen)
    useEffect(() => {
        if (isCrashed) {
            const rebootTimer = setTimeout(() => {
                setIsCrashed(false); // Hide the fatal error screen
                setIsRecovering(true); // Begin the recovery animation phase
            }, 3000); // Stay on black screen for 3 seconds
            return () => clearTimeout(rebootTimer);
        }
    }, [isCrashed]);

    // Recovery Animation Effect
    useEffect(() => {
        if (isRecovering) {
            // Block input and clear the screen for the animation
            setIsBooting(true);
            setHistory([]);

            const timeouts: NodeJS.Timeout[] = [];
            const recoverySteps = [
                { delay: 750, text: '.' },
                { delay: 1500, text: '..' },
                { delay: 2250, text: '...' },
            ];

            // Set initial state immediately
            setRecoveryText('');

            recoverySteps.forEach((step) => {
                const timeout = setTimeout(() => {
                    setRecoveryText(step.text);
                }, step.delay);
                timeouts.push(timeout);
            });

            // Final message and state reset after animation
            const finalTimeout = setTimeout(() => {
                setHistory([
                    {
                        id: getUniqueId('reboot-msg'),
                        type: 'system',
                        content:
                            'System recovered. Destructive commands disabled by administrator.',
                    },
                ]);
                setIsBooting(false); // Re-enable input
                setIsRecovering(false); // Recovery is complete
                setIsSabotageProof(true); // Prevent future meltdowns
            }, 3000);

            timeouts.push(finalTimeout);

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isRecovering]);

    // Matrix Animation Timer Effect
    useEffect(() => {
        if (isMatrixAnimating) {
            const timer = setTimeout(() => {
                setIsMatrixAnimating(false);
                setHistory((prev) => [
                    ...prev,
                    {
                        id: getUniqueId('matrix-end'),
                        type: 'system',
                        content: 'Welcome back.',
                    },
                ]);
            }, 5000); // Animation duration: 5 seconds

            return () => clearTimeout(timer);
        }
    }, [isMatrixAnimating]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab') {
            if (input.trim() === '') return;
            e.preventDefault();

            let currentSuggestions = suggestions;
            let currentSuggestionIndex = suggestionIndex;

            // If we don't have suggestions, generate new ones
            if (currentSuggestions.length === 0) {
                currentSuggestions = allPossibleCommands.filter((cmd) =>
                    cmd.startsWith(input.toLowerCase())
                );
                if (currentSuggestions.length === 0) return; // No matches

                setSuggestions(currentSuggestions);
                currentSuggestionIndex = 0;
            } else {
                // Cycle through existing suggestions
                currentSuggestionIndex =
                    (currentSuggestionIndex + 1) % currentSuggestions.length;
            }

            setInput(currentSuggestions[currentSuggestionIndex]);
            setSuggestionIndex(currentSuggestionIndex);
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newPointer = Math.max(0, historyPointer.current - 1);
                historyPointer.current = newPointer;
                setInput(commandHistory[newPointer] || '');
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newPointer = Math.min(
                    commandHistory.length,
                    historyPointer.current + 1
                );
                historyPointer.current = newPointer;
                setInput(commandHistory[newPointer] || ''); // Sets to '' if pointer is at the end
            }
            return;
        }

        if (e.key === 'Enter') {
            // Reset autocomplete state before processing command
            if (suggestions.length > 0) {
                setSuggestions([]);
                setSuggestionIndex(0);
            }

            const cmd = input.trim();

            // Handle Confirmation Mode
            if (inputMode === 'confirmation') {
                const responseLine: TerminalLine = {
                    id: getUniqueId('input'),
                    type: 'input',
                    content: `> ${input}`,
                };

                if (['y', 'yes'].includes(cmd.toLowerCase())) {
                    setHistory((prev) => [
                        ...prev,
                        responseLine,
                        {
                            id: getUniqueId('init-meltdown'),
                            type: 'error',
                            content: 'INITIATING SYSTEM WIPE...',
                        },
                    ]);
                    setInput('');
                    setInputMode('standard');
                    setIsMeltdown(true);
                } else {
                    setHistory((prev) => [
                        ...prev,
                        responseLine,
                        {
                            id: getUniqueId('abort-meltdown'),
                            type: 'system',
                            content: 'Action cancelled.',
                        },
                    ]);
                    setInput('');
                    setInputMode('standard');
                }
                return;
            }

            // Standard Command Processing
            const inputLine: TerminalLine = {
                id: getUniqueId('input'),
                type: 'input',
                content: `> ${input}`,
            };

            const newHistory = [...history, inputLine];

            if (cmd) {
                const response = processCommand(cmd, { isSabotageProof });

                if (response.action) {
                    if (response.action.type === 'CLEAR') {
                        setHistory([]);
                        setInput('');
                        return;
                    }
                    if (response.action.type === 'EXIT_SESSION') {
                        setIsExiting(true);
                    }
                    if (response.action.type === 'SET_THEME') {
                        setTheme(response.action.payload);
                    }
                    if (response.action.type === 'TRIGGER_MATRIX') {
                        inputRef.current?.blur();
                        setTheme('matrix');
                        setIsMatrixAnimating(true);
                    }
                    if (response.action.type === 'CONFIRM_DESTRUCTION') {
                        setInputMode('confirmation');
                    }
                    if (response.action.type === 'TRIGGER_MELTDOWN') {
                        setIsMeltdown(true);
                    }
                }

                if (response.output) {
                    newHistory.push({
                        id: getUniqueId('output'),
                        type: response.type || 'output',
                        content: response.output,
                    });
                }
            }

            // Add to command history if it's not empty
            if (cmd) {
                const newCmdHistory = [...commandHistory, cmd];
                setCommandHistory(newCmdHistory);
                historyPointer.current = newCmdHistory.length;
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    if (isMatrixAnimating) {
        return <MatrixAnimation />;
    }

    // Render "Connection Closed" screen during exit
    if (isExiting) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-[var(--term-dim)]">
                <div className="mb-4 text-xl">
                    Connection to remote host closed.
                </div>
                <div className="animate-pulse text-sm">
                    Redirecting to standard interface...
                </div>
            </div>
        );
    }

    if (isCrashed) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-red-600">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">FATAL ERROR</h1>
                    <p className="mt-4">SYSTEM HALTED</p>
                    <p className="mt-2 text-sm text-red-800">0x000000DEAD</p>
                </div>
            </div>
        );
    }

    if (isRecovering) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[var(--term-bg)] text-[var(--term-text)]">
                <div className="font-mono text-6xl tracking-widest">
                    {recoveryText}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`gpu-artifacts relative h-[100dvh] w-full overflow-hidden bg-[var(--term-bg)] p-4 text-base text-[var(--term-text)] transition-colors duration-300 md:p-8 ${isFrozen ? 'brightness-150 contrast-200 invert saturate-0 filter' : ''}`}
            style={
                {
                    '--artifact-opacity': glitchIntensity >= 2 ? 0.8 : 0,
                } as React.CSSProperties
            }
        >
            <Link
                href="/boring"
                className="fixed top-6 right-6 z-50 flex items-center gap-2 border border-[var(--term-dim)] bg-[var(--term-bg)]/90 px-4 py-2 text-xs font-bold tracking-widest text-[var(--term-dim)] uppercase backdrop-blur-sm transition-all hover:border-[var(--term-text)] hover:text-[var(--term-text)] hover:shadow-[0_0_10px_var(--term-text)] active:scale-95 md:top-10 md:right-10"
                aria-label="Switch to standard graphical interface"
            >
                <span className="hidden sm:inline">⚠</span>
                <span>GUI_MODE</span>
            </Link>

            <div
                ref={scrollRef}
                className="scrollbar-hide h-full w-full overflow-y-auto"
            >
                <div className="flex max-w-full flex-col space-y-1">
                    {history.map((line) => (
                        <div
                            key={line.id}
                            className={`${
                                line.type === 'error'
                                    ? 'text-[var(--term-error)]'
                                    : line.type === 'system'
                                      ? 'text-[var(--term-dim)]'
                                      : 'text-[var(--term-text)]'
                            } ${glitchIntensity >= 1 ? 'glitch-text' : ''} break-words whitespace-pre-wrap`}
                        >
                            {line.content}
                        </div>
                    ))}
                </div>

                {!isBooting && !isMeltdown && (
                    <div className="mt-2 flex items-center pb-[max(1rem,env(safe-area-inset-bottom))]">
                        <span className="mr-2 shrink-0 font-bold text-[var(--term-prompt)]">
                            {inputMode === 'confirmation' ? '?' : '>'}
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                // Reset autocomplete state when user types manually
                                if (suggestions.length > 0) {
                                    setSuggestions([]);
                                    setSuggestionIndex(0);
                                }
                            }}
                            onKeyDown={handleKeyDown}
                            className="min-w-0 flex-1 bg-transparent text-[var(--term-text)] caret-[var(--term-prompt)] outline-none"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                            aria-label="Terminal Command Input"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
