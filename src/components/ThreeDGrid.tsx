import React from 'react';
import { ThemeMode } from '../types';

interface ThreeDGridProps {
  theme: ThemeMode;
}

export const ThreeDGrid: React.FC<ThreeDGridProps> = ({ theme }) => {
  const gridGradients: Record<ThemeMode, { line: string; horizon: string }> = {
    aurora: {
      line: 'rgba(99, 102, 241, 0.22)',
      horizon: 'linear-gradient(to top, transparent 0%, rgba(99, 102, 241, 0.15) 80%, rgba(168, 85, 247, 0.3) 100%)',
    },
    midnight: {
      line: 'rgba(34, 211, 238, 0.28)',
      horizon: 'linear-gradient(to top, transparent 0%, rgba(168, 85, 247, 0.25) 80%, rgba(34, 211, 238, 0.45) 100%)',
    },
    sunset: {
      line: 'rgba(244, 63, 94, 0.22)',
      horizon: 'linear-gradient(to top, transparent 0%, rgba(245, 158, 11, 0.18) 80%, rgba(244, 63, 94, 0.35) 100%)',
    },
    emerald: {
      line: 'rgba(16, 185, 129, 0.25)',
      horizon: 'linear-gradient(to top, transparent 0%, rgba(6, 182, 212, 0.18) 80%, rgba(16, 185, 129, 0.35) 100%)',
    },
  };

  const current = gridGradients[theme] || gridGradients.aurora;

  return (
    <div className="fixed inset-x-0 bottom-0 h-[45vh] pointer-events-none overflow-hidden z-[1]">
      {/* 3D Perspective Plane */}
      <div
        className="absolute inset-0 w-full h-[200%] origin-bottom"
        style={{
          transform: 'perspective(450px) rotateX(68deg) translateY(-20%)',
        }}
      >
        {/* Animated Moving Grid */}
        <div
          className="w-full h-full animate-grid-travel"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${current.line} 1px, transparent 1px),
              linear-gradient(to bottom, ${current.line} 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Horizon Fade Mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--bg-mask, transparent) 0%, transparent 60%, rgba(0,0,0,0.1) 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
        }}
      />
    </div>
  );
};
