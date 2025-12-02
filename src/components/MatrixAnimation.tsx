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

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Katakana characters, numbers, and symbols for the matrix rain
        const katakana =
            'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const characters = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        // An array of y-coordinates for each column's raindrop
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            // Semi-transparent black background to create the fading trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to the top randomly to make the rain uneven
                if (
                    drops[i] * fontSize > canvas.height &&
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
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 h-full w-full bg-black"
            data-testid="matrix-animation-canvas"
        ></canvas>
    );
};

export default MatrixAnimation;
