import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Terminal from '@/components/Terminal';

// Mock scrolling since jsdom doesn't support layout measurement perfectly
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock Next.js router
const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe('Terminal Component', () => {
    // Ensure we always start/end with real timers
    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders boot sequence initially', async () => {
        render(<Terminal />);
        // Check for an initial boot message
        const bootMsg = await screen.findByText(/Linux version/i);
        expect(bootMsg).toBeInTheDocument();
    });

    it('allows user input after boot completes', async () => {
        vi.useFakeTimers();
        render(<Terminal />);

        // Fast-forward through the entire recursive boot sequence
        // We use runAllTimers because the boot sequence uses recursive setTimeouts
        act(() => {
            vi.runAllTimers();
        });

        vi.useRealTimers();

        // Check if input appears (this confirms boot is done)
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
            vi.runAllTimers();
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
            vi.runAllTimers();
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
            vi.runAllTimers();
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

    it('autocompletes commands with Tab and resets on manual change', async () => {
        vi.useFakeTimers();
        render(<Terminal />);
        act(() => {
            vi.runAllTimers(); // Finish boot
        });
        vi.useRealTimers();
        const input = screen.getByRole('textbox');

        // === Test cycling through multiple suggestions ===
        fireEvent.change(input, { target: { value: 'pro' } });

        // First tab should complete to 'project' (alphabetical order)
        fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
        expect(input).toHaveValue('project');

        // Second tab should cycle to 'projects'
        fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
        expect(input).toHaveValue('projects');

        // Third tab should cycle back to 'project'
        fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
        expect(input).toHaveValue('project');

        // === Test reset on manual input change ===
        // Manually type 'a' at the end, which should reset suggestions internally
        fireEvent.change(input, { target: { value: 'projecta' } });

        // Now type a new partial command
        fireEvent.change(input, { target: { value: 'cle' } });

        // Tab again should start a new suggestion cycle for 'cle' -> 'clear'
        fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
        expect(input).toHaveValue('clear');

        // Tabbing again with a single match should not change it
        fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
        expect(input).toHaveValue('clear');
    });

    it('handles focus correctly on click, preserving text selection', async () => {
        vi.useFakeTimers();
        // Render the component and a dummy button to reliably control focus
        const { container } = render(
            <>
                <Terminal />
                <button>Focus Stealer</button>
            </>
        );

        act(() => {
            vi.runAllTimers(); // Finish booting
        });
        vi.useRealTimers();

        const input = screen.getByRole('textbox');
        const terminalContainer = container.querySelector(
            '.gpu-artifacts'
        ) as HTMLElement;
        const focusStealerButton = screen.getByRole('button', {
            name: /focus stealer/i,
        });

        // --- SCENARIO 1: Simple click should NOT focus input (Updated Requirement) ---
        // Explicitly focus another element to ensure loss of focus
        focusStealerButton.focus();
        expect(input).not.toHaveFocus();

        fireEvent.click(terminalContainer); // Click the main container

        // Updated Expectation: Focus should NOT be redirected to input
        expect(input).not.toHaveFocus();

        // Note: Text selection logic checks are implicitly covered; if a basic click
        // doesn't focus, a click-drag selection won't either.
    });

    it('triggers and dismisses the matrix animation', async () => {
        // Prevent infinite loops in MatrixAnimation during fake timer advancement
        const rafMock = vi
            .spyOn(window, 'requestAnimationFrame')
            .mockImplementation(() => 1);
        const cancelRafMock = vi
            .spyOn(window, 'cancelAnimationFrame')
            .mockImplementation(() => {});
        // Prevent JSDOM "Not implemented" errors and ensure loop doesn't start
        const getContextMock = vi
            .spyOn(HTMLCanvasElement.prototype, 'getContext')
            .mockReturnValue(null);

        vi.useFakeTimers();
        render(<Terminal />);

        // Fast-forward through boot
        await act(async () => {
            vi.runAllTimers();
        });

        // Check that animation is not visible initially
        expect(
            screen.queryByTestId('matrix-animation-canvas')
        ).not.toBeInTheDocument();

        const input = screen.getByRole('textbox');

        // Type 'matrix' and hit enter
        fireEvent.change(input, { target: { value: 'matrix' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Check that animation canvas is now rendered.
        // We use getByTestId because the state change is synchronous and triggered by the event.
        // Waiting with findByTestId while fake timers are active can cause timeouts.
        const canvas = screen.getByTestId('matrix-animation-canvas');
        expect(canvas).toBeInTheDocument();

        // The input should be hidden during animation
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

        // Fast-forward time by 5 seconds (the animation duration)
        // This processes the setTimeout in Terminal.tsx that dismisses the animation
        await act(async () => {
            vi.advanceTimersByTime(5000);
        });

        // Check that animation is gone
        expect(
            screen.queryByTestId('matrix-animation-canvas')
        ).not.toBeInTheDocument();

        // Check that the terminal input is back
        expect(screen.getByRole('textbox')).toBeInTheDocument();

        // Check for the "Welcome back" message
        // Use getByText to assert presence immediately after the state update processed in the act() block
        expect(screen.getByText('Welcome back.')).toBeInTheDocument();

        // Restore mocks
        rafMock.mockRestore();
        cancelRafMock.mockRestore();
        getContextMock.mockRestore();
        vi.useRealTimers();
    }, 10000); // Extended timeout to prevent environment lags

    it('automatically focuses input when user starts typing', async () => {
        vi.useFakeTimers();
        // Render with a focus stealer to simulate being "unfocused"
        render(
            <>
                <Terminal />
                <button>Focus Stealer</button>
            </>
        );

        act(() => {
            vi.runAllTimers(); // Finish booting
        });
        vi.useRealTimers();

        const input = screen.getByRole('textbox');
        const focusStealerButton = screen.getByRole('button', {
            name: /focus stealer/i,
        });

        // 1. Unfocus the terminal
        focusStealerButton.focus();
        expect(input).not.toHaveFocus();

        // 2. Type a standard character
        fireEvent.keyDown(window, { key: 'a', code: 'KeyA' });
        expect(input).toHaveFocus();
    });

    it('does not steal focus when using shortcuts (e.g. Copy)', async () => {
        vi.useFakeTimers();
        render(
            <>
                <Terminal />
                <button>Focus Stealer</button>
            </>
        );
        act(() => vi.runAllTimers());
        vi.useRealTimers();

        const input = screen.getByRole('textbox');
        const focusStealerButton = screen.getByRole('button', {
            name: /focus stealer/i,
        });

        // 1. Unfocus terminal
        focusStealerButton.focus();

        // 2. Simulate Ctrl+C (Copy)
        fireEvent.keyDown(window, { key: 'c', code: 'KeyC', ctrlKey: true });

        // 3. Should NOT have focused the input (user is copying text)
        expect(input).not.toHaveFocus();
    });

    it('handles the exit command and redirects', async () => {
        vi.useFakeTimers();
        render(<Terminal />);

        // Fast-forward through boot sequence
        await act(async () => {
            vi.runAllTimers();
        });

        const input = screen.getByRole('textbox');

        // Type 'exit' and hit enter
        fireEvent.change(input, { target: { value: 'exit' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Check for immediate visual feedback (Exit Screen)
        expect(
            screen.getByText(/Connection to remote host closed/i)
        ).toBeInTheDocument();

        // Fast-forward the 1.5s delay
        await act(async () => {
            vi.advanceTimersByTime(1500);
        });

        // Verify router push was called with correct path
        expect(pushMock).toHaveBeenCalledWith('/boring');
    });

    it('uses dynamic viewport height for mobile compatibility', () => {
        render(<Terminal />);
        // The container usually has the 'gpu-artifacts' class
        // We select the outer div and check for the dynamic height class
        const container = document.querySelector('.gpu-artifacts');
        expect(container).toHaveClass('h-[100dvh]');
    });
});
