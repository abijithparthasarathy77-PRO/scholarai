import React, { useMemo } from 'react';
import { ThemeMode } from '../types';

interface AnimatedBackgroundProps {
  theme: ThemeMode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  // Generate stable random particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 17 + 23) % 100}%`,
      top: `${(i * 29 + 11) % 100}%`,
      size: (i % 3) * 2 + 3,
      duration: `${14 + (i % 5) * 4}s`,
      delay: `${(i % 7) * 1.5}s`,
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-700 theme-bg-${theme}`}>
      {/* Dynamic Animated Gradient Mesh Layer */}
      <div className={`absolute inset-0 opacity-80 animated-gradient-${theme}`} />

      {/* Floating Aurora Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1 - Primary Glow */}
        <div 
          className={`absolute -top-24 -left-24 w-96 h-96 sm:w-[36rem] sm:h-[36rem] rounded-full blur-3xl opacity-70 animate-orb-1 orb-color-1-${theme}`} 
        />

        {/* Orb 2 - Secondary Ambient Accent */}
        <div 
          className={`absolute top-1/3 -right-24 w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-full blur-3xl opacity-60 animate-orb-2 orb-color-2-${theme}`} 
        />

        {/* Orb 3 - Center Radiant Wave */}
        <div 
          className={`absolute -bottom-32 left-1/4 w-96 h-96 sm:w-[40rem] sm:h-[40rem] rounded-full blur-3xl opacity-60 animate-orb-3 orb-color-3-${theme}`} 
        />

        {/* Orb 4 - High-Frequency Corner Pulse */}
        <div 
          className={`absolute top-2/3 right-1/4 w-72 h-72 sm:w-[28rem] sm:h-[28rem] rounded-full blur-3xl opacity-50 animate-orb-4 orb-color-4-${theme}`} 
        />
      </div>

      {/* Subtle Tech Micro-Grid Overlay */}
      <div className={`absolute inset-0 opacity-40 mix-blend-overlay grid-pattern-${theme}`} />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0">
        {particles.map(p => (
          <span
            key={p.id}
            className={`absolute rounded-full particle-${theme} animate-float-particle`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Ambient Vignette Border */}
      <div className={`absolute inset-0 bg-radial from-transparent via-transparent to-black/10 dark-vignette-${theme}`} />
    </div>
  );
};
