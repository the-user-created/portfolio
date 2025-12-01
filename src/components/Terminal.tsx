'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TerminalLine } from '@/types/terminal';
import { processCommand } from '@/utils/processCommand';

const BOOT_SEQUENCE = [
    { text: 'booting portfolioOS v1.0...', delay: 500 },
    { text: 'loading modules: help...', delay: 1200 },
    { text: 'initializing display...', delay: 2000 },
    { text: 'system ready.', delay: 2500 },
];

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

    // Apply theme to body
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    // Handle Boot Sequence
    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        BOOT_SEQUENCE.forEach((step, index) => {
            const timeout = setTimeout(() => {
                setHistory((prev) => [
                    ...prev,
                    {
                        id: `boot-${index}`,
                        type: 'system',
                        content: step.text,
                    },
                ]);

                // End boot sequence after last step
                if (index === BOOT_SEQUENCE.length - 1) {
                    setTimeout(() => {
                        setIsBooting(false);
                        setHistory((prev) => [
                            ...prev,
                            {
                                id: 'init-help',
                                type: 'system',
                                content: "Type 'help' to begin.",
                            },
                        ]);
                    }, 500);
                }
            }, step.delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
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
                let currentDelay = 50;

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
                            id: `meltdown-${Date.now()}-${step}`,
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
                        id: 'reboot-msg',
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
        if (e.key === 'Enter') {
            const cmd = input.trim();

            // Handle Confirmation Mode
            if (inputMode === 'confirmation') {
                const responseLine: TerminalLine = {
                    id: Date.now().toString() + '-input',
                    type: 'input',
                    content: `> ${input}`,
                };

                if (['y', 'yes'].includes(cmd.toLowerCase())) {
                    setHistory((prev) => [
                        ...prev,
                        responseLine,
                        {
                            id: 'init-meltdown',
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
                            id: 'abort-meltdown',
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
                id: Date.now().toString() + '-input',
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
                        id: Date.now().toString() + '-output',
                        type: response.type || 'output',
                        content: response.output,
                    });
                }
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
            className={`gpu-artifacts h-screen w-full overflow-hidden bg-[var(--term-bg)] p-4 text-base text-[var(--term-text)] transition-colors duration-300 md:p-8 ${isFrozen ? 'brightness-150 contrast-200 invert saturate-0 filter' : ''}`}
            style={
                {
                    '--artifact-opacity': glitchIntensity >= 2 ? 0.8 : 0,
                } as React.CSSProperties
            }
            onClick={handleContainerClick}
        >
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
