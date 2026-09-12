import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showParticles?: boolean;
  className?: string;
  pulseSpeed?: 'normal' | 'fast' | 'slow';
  interactive?: boolean;
}

export const AIOrb: React.FC<AIOrbProps> = ({
  size = 'md',
  showParticles = true,
  className = '',
  interactive = false
}) => {
  const sizeMap = {
    sm: { container: 'w-10 h-10', core: 'w-5 h-5', ring1: 'w-8 h-8', ring2: 'w-10 h-10', icon: 14 },
    md: { container: 'w-16 h-16', core: 'w-8 h-8', ring1: 'w-13 h-13', ring2: 'w-16 h-16', icon: 18 },
    lg: { container: 'w-24 h-24', core: 'w-12 h-12', ring1: 'w-20 h-20', ring2: 'w-24 h-24', icon: 24 },
    hero: { container: 'w-36 h-36', core: 'w-18 h-18', ring1: 'w-30 h-30', ring2: 'w-36 h-36', icon: 32 }
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${currentSize.container} ${
        interactive ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Outer ambient breathing glow */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8B5CF6]/40 to-[#22D3EE]/30 blur-xl animate-pulse-glow"
        style={{ transform: 'scale(1.4)' }}
      />

      {/* Rotating outer ring 1 */}
      <div
        className={`absolute rounded-full border border-dashed border-[#8B5CF6]/50 animate-ring-rotate ${currentSize.ring2}`}
        style={{ animationDuration: '14s' }}
      />

      {/* Counter-rotating ring 2 with accent cyan node */}
      <div
        className={`absolute rounded-full border border-dotted border-[#22D3EE]/60 animate-ring-rotate-rev ${currentSize.ring1}`}
        style={{ animationDuration: '9s' }}
      >
        {/* Orbital satellite node */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
      </div>

      {/* Inner Glowing AI Core */}
      <div
        className={`relative rounded-full bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#22D3EE] flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.8)] animate-orb-float ${currentSize.core}`}
      >
        <Sparkles
          size={currentSize.icon}
          className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
        />
      </div>

      {/* Floating Micro-particles */}
      {showParticles && (
        <>
          <div
            className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-[#34D399] shadow-[0_0_6px_#34D399] animate-ping"
            style={{ animationDuration: '2.5s' }}
          />
          <div
            className="absolute -bottom-2 -left-1 w-1 h-1 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE] animate-pulse"
            style={{ animationDuration: '1.8s' }}
          />
        </>
      )}
    </div>
  );
};
