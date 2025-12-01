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

    it('triggers confirmation mode on destructive command', async () => {
        vi.useFakeTimers();
        render(<Terminal />);

        // Pass boot
        act(() => {
            vi.advanceTimersByTime(3500);
        });
        vi.useRealTimers();

        const input = screen.getByRole('textbox');

        // Type destructive command
        fireEvent.change(input, { target: { value: 'rm -rf /' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Check for warning message
        expect(
            await screen.findByText(
                /Warning: You are about to delete critical system files/i
            )
        ).toBeInTheDocument();
    });

    it('renders a link to the boring portfolio page', async () => {
        vi.useFakeTimers();
        render(<Terminal />);
        // Fast-forward past boot sequence
        act(() => {
            vi.advanceTimersByTime(3500);
        });
        vi.useRealTimers();
        const boringLink = screen.getByRole('link', {
            name: /switch to standard portfolio view/i,
        });
        expect(boringLink).toBeInTheDocument();
        expect(boringLink).toHaveAttribute('href', '/boring');
    });
    it('cleans up body styles on unmount', () => {
        // The render function returns an `unmount` method
        const { unmount } = render(<Terminal />);
        // Check that the theme attribute is applied on render
        expect(document.body).toHaveAttribute('data-theme');
        // Unmount the component to trigger the cleanup effect
        unmount();
        // Check that the theme attribute has been removed
        expect(document.body).not.toHaveAttribute('data-theme');
    });

    it('navigates command history with arrow keys', async () => {
        vi.useFakeTimers();
        render(<Terminal />);
        act(() => {
            vi.advanceTimersByTime(3500);
        });
        vi.useRealTimers();

        const input = screen.getByRole('textbox');

        // Enter first command
        fireEvent.change(input, { target: { value: 'help' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        await screen.findByText('> help');
        expect(input).toHaveValue('');

        // Enter second command
        fireEvent.change(input, { target: { value: 'about' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        await screen.findByText('> about');
        expect(input).toHaveValue('');

        // Navigate history
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(input).toHaveValue('about');
        fireEvent.keyDown(input, { key: 'ArrowUp' });
        expect(input).toHaveValue('help');
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        expect(input).toHaveValue('about');
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        expect(input).toHaveValue('');
    });
});
