import { describe, expect, it, vi } from 'vitest';
import { processCommand } from '@/utils/processCommand';
import { CONTACT } from '@/data/content';

describe('processCommand Utility', () => {
    it('returns help text for "help" command', () => {
        const result = processCommand('help');
        expect(result.type).not.toBe('error');
        expect(result.output).toBeDefined();
    });

    it('returns a valid component output for "resume"', () => {
        const result = processCommand('resume');
        expect(result.type).not.toBe('error');
        expect(result.output).toBeDefined();
        // Since we return a React Node (dynamic component), we verify it's not null
        expect(result.output).not.toBeNull();
    });

    it('handles empty input gracefully', () => {
        const result = processCommand('   ');
        expect(result.type).toBe('input');
        expect(result.output).toBeNull();
    });

    it('returns valid output for "about" command', () => {
        const result = processCommand('about');
        expect(result.type).not.toBe('error');
        expect(result.output).toBeDefined();
    });

    it('returns error for invalid project id', () => {
        const result = processCommand('project 999');
        expect(result.type).toBe('error');
        expect(result.output).toContain(
            "Error: Data shard '999' corrupted or not found."
        );
    });

    it('returns valid project for correct id', () => {
        const result = processCommand('project fers-fyp');
        expect(result.type).not.toBe('error');
        expect(result.output).toBeDefined();
    });

    it('returns CLEAR action for "clear" command', () => {
        const result = processCommand('clear');
        expect(result.action).toEqual({ type: 'CLEAR' });
    });

    it('returns SET_THEME action for valid theme', () => {
        const result = processCommand('theme set hacker');
        expect(result.action).toEqual({
            type: 'SET_THEME',
            payload: 'hacker',
        });
    });

    it('returns error for invalid theme', () => {
        const result = processCommand('theme set invalidTheme');
        expect(result.type).toBe('error');
        expect(result.action).toBeUndefined();
    });

    it('mocks sudo access', () => {
        const result = processCommand('sudo ls');
        expect(result.type).toBe('error');
        expect(result.output).toBe(
            'Nice try. You are not root on this system.'
        );
    });

    it('returns a fortune', () => {
        const result = processCommand('fortune');
        expect(result.output).toBeDefined();
        expect(result.type).not.toBe('error');
    });

    it('returns TRIGGER_MATRIX action for "matrix" command', () => {
        const result = processCommand('matrix');
        expect(result.action).toEqual({ type: 'TRIGGER_MATRIX' });
        expect(result.output).toBe('Entering the Matrix...');
    });

    it('handles fork bomb attempt', () => {
        const result = processCommand(':(){ :|:& };:');
        expect(result.type).toBe('error');
        expect(result.output).toContain('Fork bomb detected');
    });

    it('prevents destructive rm commands', () => {
        const result = processCommand('rm -rf /');
        expect(result.type).toBe('error');
        expect(result.output).toContain(
            'Warning: You are about to delete critical system files'
        );
    });

    it('triggers confirmation action for rm -rf /', () => {
        const result = processCommand('rm -rf /');
        expect(result.action).toEqual({ type: 'CONFIRM_DESTRUCTION' });
        expect(result.output).toContain('Warning');
    });

    it('triggers immediate meltdown for fork bomb', () => {
        const result = processCommand(':(){ :|:& };:');
        expect(result.action).toEqual({ type: 'TRIGGER_MELTDOWN' });
    });

    it('triggers confirmation for format c:', () => {
        const result = processCommand('format c:');
        expect(result.action).toEqual({ type: 'CONFIRM_DESTRUCTION' });
    });

    describe('Command Synonyms', () => {
        it('resolves "ls" to the "projects" command', () => {
            const result = processCommand('ls');
            expect(result.type).not.toBe('error');
            expect(result.output).toBeDefined();
        });

        it('resolves "cd fers" to the "project fers" command', () => {
            const result = processCommand('cd fers-fyp');
            expect(result.type).not.toBe('error');
            expect(result.output).toBeDefined();
        });

        it('resolves "whoami" to the "about" command', () => {
            const result = processCommand('whoami');
            expect(result.type).not.toBe('error');
            expect(result.output).toBeDefined();
        });

        it('resolves "cls" to the "clear" command action', () => {
            const result = processCommand('cls');
            expect(result.action).toEqual({ type: 'CLEAR' });
        });
    });

    describe('with sabotage proofing enabled', () => {
        const options = { isSabotageProof: true };

        it('prevents rm -rf /', () => {
            const result = processCommand('rm -rf /', options);
            expect(result.action).toBeUndefined();
            expect(result.output).toContain(
                'destructive commands are disabled'
            );
        });

        it('prevents fork bomb', () => {
            const result = processCommand(':(){ :|:& };:', options);
            expect(result.action).toBeUndefined();
            expect(result.output).toContain(
                'destructive commands are disabled'
            );
        });

        it('prevents format c:', () => {
            const result = processCommand('format c:', options);
            expect(result.action).toBeUndefined();
            expect(result.output).toContain(
                'destructive commands are disabled'
            );
        });

        it('prevents sudo rm -rf', () => {
            const result = processCommand('sudo rm -rf /', options);
            expect(result.action).toBeUndefined();
            expect(result.output).toContain(
                'destructive commands are disabled'
            );
        });
    });

    describe('open command', () => {
        const windowOpenSpy = vi
            .spyOn(window, 'open')
            .mockImplementation(() => null);

        it('opens github link', () => {
            processCommand('open github');
            expect(windowOpenSpy).toHaveBeenCalledWith(
                `https://${CONTACT.github}`,
                '_blank'
            );
        });

        it('returns an error for an unknown resource', () => {
            const result = processCommand('open portfolio');
            expect(result.type).toBe('error');
            expect(result.output).toContain("Resource 'portfolio' not found");
        });

        it('returns usage error if no resource is specified', () => {
            const result = processCommand('open');
            expect(result.type).toBe('error');
            expect(result.output).toContain('Usage: open <resource>');
        });
    });

    it('returns EXIT_SESSION action for "exit" command', () => {
        const result = processCommand('exit');
        expect(result.action).toEqual({ type: 'EXIT_SESSION' });
        expect(result.output).toContain('Terminating');
    });

    it('resolves "quit" synonym to EXIT_SESSION action', () => {
        const result = processCommand('quit');
        expect(result.action).toEqual({ type: 'EXIT_SESSION' });
    });

    it('resolves "logout" synonym to EXIT_SESSION action', () => {
        const result = processCommand('logout');
        expect(result.action).toEqual({ type: 'EXIT_SESSION' });
    });
});
