import { describe, expect, it } from 'vitest';
import { processCommand } from '@/utils/processCommand';

describe('processCommand Utility', () => {
    it('returns help text for "help" command', () => {
        const result = processCommand('help');
        expect(result.type).not.toBe('error');
        expect(result.output).toBeDefined();
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
        // Using string matching for error message
        expect(result.output).toContain("Project '999' not found");
    });

    it('returns valid project for correct id', () => {
        const result = processCommand('project 1');
        expect(result.type).not.toBe('error');
        expect(result.output).toBeDefined();
    });

    it('returns CLEAR action for "clear" command', () => {
        const result = processCommand('clear');
        expect(result.action).toEqual({ type: 'CLEAR' });
    });

    it('returns SET_THEME action for valid theme', () => {
        const result = processCommand('theme set hacker');
        expect(result.action).toEqual({ type: 'SET_THEME', payload: 'hacker' });
    });

    it('returns error for invalid theme', () => {
        const result = processCommand('theme set invalidTheme');
        expect(result.type).toBe('error');
        expect(result.action).toBeUndefined();
    });
});
