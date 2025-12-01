import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Terminal from '@/components/Terminal';

// Mock scrolling since jsdom doesn't support layout measurement perfectly
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Terminal Component', () => {
  // Ensure we always start/end with real timers
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders boot sequence initially', async () => {
    render(<Terminal />);

    // Check for boot message
    // Note: We use findBy because boot messages appear asynchronously
    const bootMsg = await screen.findByText('booting portfolioOS v1.0...');
    expect(bootMsg).toBeInTheDocument();
  });

  it('allows user input after boot', async () => {
    vi.useFakeTimers();
    render(<Terminal />);

    // Fast-forward past boot sequence (2500ms + 500ms internal delay)
    // Advancing 3500ms ensures we are safely past all timeouts
    act(() => {
      vi.advanceTimersByTime(3500);
    });

    // Switch back to real timers.
    // RTL's async utilities (findBy) and user events rely on real system time.
    // If we stay on fake timers, they might hang/timeout waiting for clock ticks.
    vi.useRealTimers();

    // Check if input appears
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    // Type 'help' and hit enter
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Expect help output to appear
    expect(screen.getByText('Available commands:')).toBeInTheDocument();
  });
});
