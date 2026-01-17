import React, { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    pulse: number;
}

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize particles
        const particleCount = Math.min(80, Math.floor((dimensions.width * dimensions.height) / 20000));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            pulse: Math.random() * Math.PI * 2,
        }));

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Update pulse
                particle.pulse += 0.02;

                // Mouse interaction - particles gently move away from cursor
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.vx -= (dx / distance) * force * 0.02;
                    particle.vy -= (dy / distance) * force * 0.02;
                }

                // Apply velocity with damping
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Pulsing opacity
                const pulseOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse));

                // Draw particle with glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity})`);
                gradient.addColorStop(0.5, `rgba(255, 255, 255, ${pulseOpacity * 0.3})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw connections between nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const pdx = other.x - particle.x;
                    const pdy = other.y - particle.y;
                    const pDistance = Math.sqrt(pdx * pdx + pdy * pdy);

                    if (pDistance < 120) {
                        const lineOpacity = (1 - pDistance / 120) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            // Draw subtle gradient orbs that follow mouse slowly
            const orbGradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, 300
            );
            orbGradient.addColorStop(0, 'rgba(99, 102, 241, 0.03)');
            orbGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
            orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 300, 0, Math.PI * 2);
            ctx.fillStyle = orbGradient;
            ctx.fill();

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [dimensions]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className="fixed inset-0 pointer-events-none z-0"
                style={{ background: 'transparent' }}
            />
            {/* Gradient mesh background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Top-right gradient blob */}
                <div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        animation: 'float 20s ease-in-out infinite',
                    }}
                />
                {/* Bottom-left gradient blob */}
                <div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        animation: 'float 25s ease-in-out infinite reverse',
                    }}
                />
                {/* Center accent */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                    }}
                />
            </div>
            {/* Grid overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </>
    );
};

export default AnimatedBackground;
