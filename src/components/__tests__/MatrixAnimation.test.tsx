import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MatrixAnimation from '../MatrixAnimation';

describe('MatrixAnimation Component', () => {
    // Mock getContext to avoid errors in JSDOM
    beforeEach(() => {
        HTMLCanvasElement.prototype.getContext = vi.fn();
    });

    it('renders a canvas element', () => {
        render(<MatrixAnimation />);
        const canvas = screen.getByTestId('matrix-animation-canvas');
        expect(canvas).toBeInTheDocument();
        expect(canvas.tagName).toBe('CANVAS');
    });
});
