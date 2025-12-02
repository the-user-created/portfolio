'use client';

import React, { useEffect, useRef } from 'react';

const MatrixAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let drops: number[] = [];
        let fontSize = 16;

        // Katakana characters, numbers, and symbols for the matrix rain
        const katakana =
            'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const characters = katakana + latin + nums;

        const resizeCanvas = () => {
            // Handle High-DPI displays (Retina) to prevent blurry/stretched text
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Set internal resolution matches physical pixels
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // Enforce CSS display size matches viewport logic pixels
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Scale all drawing operations by DPR so we can work in logic pixels
            ctx.scale(dpr, dpr);

            // Responsive font sizing: 14px on mobile to reduce "cramped" feeling, 16px on desktop
            fontSize = width < 768 ? 14 : 16;

            // Calculate number of columns based on width and font size
            const columns = Math.floor(width / fontSize);

            // Initialize or adjust drops array
            // If drops is empty (first run), start everything at the top (1)
            // to create the "curtain" or "blanket waterfall" effect.
            if (drops.length === 0) {
                drops = [];
                for (let x = 0; x < columns; x++) {
                    drops[x] = 1;
                }
            } else {
                // Handle resize: preserve existing drops, fill new columns
                const newDrops = [];
                for (let x = 0; x < columns; x++) {
                    // If a column existed before, keep its position to prevent restart.
                    // If it's a new column, start it at the top.
                    newDrops[x] = drops[x] !== undefined ? drops[x] : 1;
                }
                drops = newDrops;
            }
        };

        // Initial setup
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const draw = () => {
            // Semi-transparent black background to create the fading trail effect
            // Use logical dimensions for fillRect due to ctx.scale
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.fillStyle = '#0F0'; // Matrix Green
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );

                // Draw the character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to the top randomly to make the rain uneven after the first pass
                if (
                    drops[i] * fontSize > window.innerHeight &&
                    Math.random() > 0.975
                ) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        const animate = () => {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 block bg-black"
            data-testid="matrix-animation-canvas"
        ></canvas>
    );
};

export default MatrixAnimation;
