'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TerminalLine } from '@/types/terminal';
import { processCommand } from '@/utils/processCommand';
import { BOOT_LOGS } from '@/data/bootLogs';

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

export default function Terminal() {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const historyPointer = useRef(0);
    const [isBooting, setIsBooting] = useState(true);
    const [theme, setTheme] = useState('default');

    const [inputMode, setInputMode] = useState<'standard' | 'confirmation'>(
        'standard'
    );

    // Meltdown State Machine
    const [isMeltdown, setIsMeltdown] = useState(false);
    const [glitchIntensity, setGlitchIntensity] = useState(0); // 0=None, 1=Text, 2=Screen
    const [isCrashed, setIsCrashed] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const [recoveryText, setRecoveryText] = useState(''); // State for recovery animation text

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lineIdCounter = useRef(0);
    const bootStartTime = useRef(0);

    // Helper to generate unique IDs for terminal lines
    const getUniqueId = (prefix: string = 'line'): string => {
        lineIdCounter.current++;
        return `${prefix}-${lineIdCounter.current}`;
    };

    // Apply theme to body and clean up on unmount
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);

        // This cleanup function runs when the component unmounts
        return () => {
            document.body.removeAttribute('data-theme');
        };
    }, [theme]);

    // Handle Boot Sequence
    useEffect(() => {
        if (bootStartTime.current === 0) {
            bootStartTime.current = performance.now();
        }

        let timeoutId: NodeJS.Timeout;
        let lineIndex = 0;

        const processBootLog = () => {
            if (lineIndex >= BOOT_LOGS.length) {
                setIsBooting(false);
                setHistory((prev) => [
                    ...prev,
                    {
                        id: getUniqueId('init-help'),
                        type: 'system',
                        content: "Type 'help' to begin.",
                    },
                ]);
                return;
            }

            const currentLine = BOOT_LOGS[lineIndex];
            const elapsed = (performance.now() - bootStartTime.current) / 1000;
            const timestamp = `[${elapsed.toFixed(6).padStart(12, ' ')}] `;
            setHistory((prev) => [
                ...prev,
                {
                    id: getUniqueId('boot'),
                    type: 'system',
                    content: timestamp + currentLine.text,
                },
            ]);

            lineIndex++;

            const delay =
                currentLine.delay ?? Math.floor(Math.random() * 15) + 5;

            timeoutId = setTimeout(processBootLog, delay);
        };

        timeoutId = setTimeout(processBootLog, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

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
            }, 3000);
            timeouts.push(finalTimeout);

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isRecovering]);

    // Focus input on click anywhere
    const handleContainerClick = () => {
        if (!isBooting && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                const response = processCommand(cmd);

                if (response.action) {
                    if (response.action.type === 'CLEAR') {
                        setHistory([]);
                        setInput('');
                        return;
                    }
                    if (response.action.type === 'SET_THEME') {
                        setTheme(response.action.payload);
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
            className={`gpu-artifacts relative h-screen w-full overflow-hidden bg-[var(--term-bg)] p-4 text-base text-[var(--term-text)] transition-colors duration-300 md:p-8 ${isFrozen ? 'brightness-150 contrast-200 invert saturate-0 filter' : ''}`}
            style={
                {
                    '--artifact-opacity': glitchIntensity >= 2 ? 0.8 : 0,
                } as React.CSSProperties
            }
            onClick={handleContainerClick}
        >
            {/* A discrete link to the standard, non-interactive portfolio page */}
            <Link
                href="/boring"
                className="absolute top-4 right-4 z-10 rounded bg-white/10 px-2 py-1 text-xs text-[var(--term-dim)] transition-colors hover:bg-white/20 hover:text-[var(--term-text)]"
                aria-label="Switch to standard portfolio view"
            >
                Standard View
            </Link>
            <div
                ref={scrollRef}
                className="scrollbar-hide h-full w-full overflow-y-auto"
            >
                <div className="flex flex-col space-y-1">
                    {history.map((line) => (
                        <div
                            key={line.id}
                            // Apply text skewing/colors at Medium Glitch Intensity (Level 1+)
                            className={`${
                                line.type === 'error'
                                    ? 'text-[var(--term-error)]'
                                    : line.type === 'system'
                                      ? 'text-[var(--term-dim)]'
                                      : 'text-[var(--term-text)]'
                            } ${glitchIntensity >= 1 ? 'glitch-text' : ''}`}
                        >
                            {line.content}
                        </div>
                    ))}
                </div>

                {!isBooting && !isMeltdown && (
                    <div className="mt-2 flex items-center">
                        <span className="mr-2 font-bold text-[var(--term-prompt)]">
                            {inputMode === 'confirmation' ? '?' : '>'}
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent text-[var(--term-text)] caret-[var(--term-prompt)] outline-none"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
