import React, { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '../types';
import { ThreeDScene } from './ThreeDScene';
import { ThreeDGrid } from './ThreeDGrid';

interface AnimatedBackgroundProps {
  theme: ThemeMode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Mouse tracker for ambient spotlight and particle interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle Constellation & Wave Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palettes for particles based on theme
    const themeColors: Record<ThemeMode, { particle: string; line: string; spotlight: string }> = {
      aurora: {
        particle: '99, 102, 241',    // Indigo
        line: '168, 85, 247',        // Violet
        spotlight: 'rgba(99, 102, 241, 0.12)',
      },
      midnight: {
        particle: '56, 189, 248',    // Cyan
        line: '168, 85, 247',        // Neon Purple
        spotlight: 'rgba(168, 85, 247, 0.18)',
      },
      sunset: {
        particle: '244, 63, 94',     // Rose
        line: '245, 158, 11',        // Amber
        spotlight: 'rgba(244, 63, 94, 0.12)',
      },
      emerald: {
        particle: '16, 185, 129',    // Mint
        line: '6, 182, 212',         // Teal
        spotlight: 'rgba(16, 185, 129, 0.12)',
      },
    };

    const colors = themeColors[theme] || themeColors.aurora;

    // Initialize 60 interactive floating particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.5 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Draw subtle flowing sine waves across the screen
      ctx.save();
      const waveCount = 2;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveY = height * (0.35 + w * 0.3);
        const amplitude = 35 + w * 20;
        const frequency = 0.0015 + w * 0.001;
        const phase = time * (w === 0 ? 0.8 : -0.6);

        ctx.moveTo(0, waveY);
        for (let x = 0; x <= width; x += 15) {
          const y = waveY + Math.sin(x * frequency + phase) * amplitude;
          ctx.lineTo(x, y);
        }

        const waveAlpha = theme === 'midnight' ? 0.15 : 0.08;
        ctx.strokeStyle = `rgba(${colors.line}, ${waveAlpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      ctx.restore();

      // Update and draw particles & connections
      const maxDistance = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse proximity reaction
        const dxMouse = mousePos.x - p.x;
        const dyMouse = mousePos.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          const force = (180 - distMouse) / 180;
          p.alpha = Math.min(1, p.baseAlpha + force * 0.6);
          // Gently push particle with mouse
          p.x -= (dxMouse / distMouse) * force * 1.2;
          p.y -= (dyMouse / distMouse) * force * 1.2;

          // Draw connection line to mouse
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(${colors.particle}, ${(1 - distMouse / 180) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          p.alpha = p.baseAlpha + Math.sin(time * 2 + i) * 0.15;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.particle}, ${p.alpha})`;
        ctx.fill();

        // Connect with other nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (theme === 'midnight' ? 0.35 : 0.2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.line}, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, mousePos.x, mousePos.y]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-700 theme-bg-${theme}`}>
      {/* Dynamic Animated Gradient Mesh Layer */}
      <div className={`absolute inset-0 opacity-90 animated-gradient-${theme}`} />

      {/* Floating Aurora Glowing Orbs with vivid glow */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1 - Primary Ambient Wave */}
        <div 
          className={`absolute -top-32 -left-32 w-[34rem] h-[34rem] sm:w-[46rem] sm:h-[46rem] rounded-full blur-[90px] opacity-80 animate-orb-1 orb-color-1-${theme}`} 
        />

        {/* Orb 2 - Secondary Ambient Accent */}
        <div 
          className={`absolute top-1/4 -right-32 w-[30rem] h-[30rem] sm:w-[42rem] sm:h-[42rem] rounded-full blur-[90px] opacity-75 animate-orb-2 orb-color-2-${theme}`} 
        />

        {/* Orb 3 - Center Radiant Wave */}
        <div 
          className={`absolute -bottom-40 left-1/4 w-[36rem] h-[36rem] sm:w-[50rem] sm:h-[50rem] rounded-full blur-[100px] opacity-75 animate-orb-3 orb-color-3-${theme}`} 
        />

        {/* Orb 4 - High-Frequency Corner Pulse */}
        <div 
          className={`absolute top-2/3 right-1/4 w-[28rem] h-[28rem] sm:w-[38rem] sm:h-[38rem] rounded-full blur-[80px] opacity-65 animate-orb-4 orb-color-4-${theme}`} 
        />
      </div>

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute w-[36rem] h-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-3xl transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: `radial-gradient(circle, ${
            theme === 'midnight'
              ? 'rgba(168, 85, 247, 0.18)'
              : theme === 'sunset'
                ? 'rgba(244, 63, 94, 0.15)'
                : theme === 'emerald'
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(99, 102, 241, 0.16)'
          } 0%, transparent 70%)`,
        }}
      />

      {/* HTML5 Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle Tech Micro-Grid Overlay */}
      <div className={`absolute inset-0 opacity-45 mix-blend-overlay grid-pattern-${theme}`} />

      {/* 3D Perspective Horizon Ground Grid */}
      <ThreeDGrid theme={theme} />

      {/* Interactive 3D WebGL Geometries (Rotating Icosahedron, Gyro Rings & 3D Stars) */}
      <ThreeDScene theme={theme} />

      {/* Ambient Vignette Border */}
      <div className={`absolute inset-0 bg-radial from-transparent via-transparent to-black/15 dark-vignette-${theme}`} />
    </div>
  );
};
