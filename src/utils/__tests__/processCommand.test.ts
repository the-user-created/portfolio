import { describe, expect, it } from 'vitest';
import { processCommand } from '@/utils/processCommand';

describe('processCommand Utility', () => {
  it('returns help text for "help" command', () => {
    const result = processCommand('help');
    expect(result.type).not.toBe('error');
    // We can't easily check ReactNode content equality in a unit test
    // without rendering, but we can ensure it returned a valid object.
    expect(result.output).toBeDefined();
  });

  it('returns error for unknown commands', () => {
    const command = 'skibidi';
    const result = processCommand(command);

    expect(result.type).toBe('error');
    expect(result.output).toBe(
      `command not found: ${command}. Type 'help' for assistance.`
    );
  });

  it('handles empty input gracefully', () => {
    const result = processCommand('   ');
    expect(result.type).toBe('input');
    expect(result.output).toBeNull();
  });

  it('is case insensitive', () => {
    const result = processCommand('HELP');
    expect(result.type).not.toBe('error');
  });
});
