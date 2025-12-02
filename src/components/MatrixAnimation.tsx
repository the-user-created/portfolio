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

        const katakana =
            'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const characters = katakana + latin + nums;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            const targetWidth = width * dpr;
            const targetHeight = height * dpr;

            // 1. DOM UPDATE: Only resize canvas if physical dimensions changed.
            const needsResize =
                canvas.width !== targetWidth || canvas.height !== targetHeight;

            if (needsResize) {
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                ctx.scale(dpr, dpr);
            }

            // 2. CSS UPDATE: Always ensure style matches viewport
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // 3. SIMULATION UPDATE: Always calculate simulation parameters.
            // We CANNOT return early above, because 'drops' is local state that
            // might be empty on a re-mount even if the DOM element was preserved.
            fontSize = width < 768 ? 14 : 16;
            const columns = Math.floor(width / fontSize);

            if (drops.length === 0) {
                // Initial fill (Curtain Effect)
                drops = [];
                for (let x = 0; x < columns; x++) {
                    drops[x] = 1;
                }
            } else {
                // Resize (Responsive): Adjust array size, preserving existing drops
                const newDrops = [];
                for (let x = 0; x < columns; x++) {
                    newDrops[x] = drops[x] !== undefined ? drops[x] : 1;
                }
                drops = newDrops;
            }
        };

        // Initial setup
        resizeCanvas();

        // Listeners
        window.addEventListener('resize', resizeCanvas);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', resizeCanvas);
        }

        // Safety Poll: Ensures canvas snaps to full height after keyboard dismissal.
        // Because of the 'needsResize' check above, this will NO LONGER wipe the
        // canvas repeatedly, fixing the "glitchy curtain" issue.
        let checks = 0;
        const resizeCheckInterval = setInterval(() => {
            resizeCanvas();
            checks++;
            if (checks > 20) clearInterval(resizeCheckInterval);
        }, 100);

        const draw = () => {
            // Semi-transparent black background for trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.fillStyle = '#0F0'; // Matrix Green
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (
                    drops[i] * fontSize > window.innerHeight &&
                    Math.random() > 0.975
                ) {
                    drops[i] = 0;
                }

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
            if (window.visualViewport) {
                window.visualViewport.removeEventListener(
                    'resize',
                    resizeCanvas
                );
            }
            clearInterval(resizeCheckInterval);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 block bg-black"
            data-testid="matrix-animation-canvas"
        ></canvas>
    );
};

export default MatrixAnimation;
