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

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Focus input on click anywhere
  const handleContainerClick = () => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const newHistory = [
        ...history,
        {
          id: Date.now().toString() + '-input',
          type: 'input',
          content: `> ${input}`,
        } as TerminalLine,
      ];

      if (cmd) {
        const response = processCommand(cmd);
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

  return (
    <div
      className="h-screen w-full overflow-hidden bg-black p-4 font-mono text-base text-green-400 md:p-8"
      onClick={handleContainerClick}
    >
      <div
        ref={scrollRef}
        className="scrollbar-hide h-full w-full overflow-y-auto"
      >
        {/* History Output */}
        <div className="flex flex-col space-y-1">
          {history.map((line) => (
            <div
              key={line.id}
              className={`${
                line.type === 'error'
                  ? 'text-red-500'
                  : line.type === 'system'
                    ? 'text-zinc-500'
                    : 'text-green-400'
              }`}
            >
              {line.content}
            </div>
          ))}
        </div>

        {/* Input Area */}
        {!isBooting && (
          <div className="mt-2 flex items-center">
            <span className="mr-2 font-bold text-white">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white outline-none"
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
