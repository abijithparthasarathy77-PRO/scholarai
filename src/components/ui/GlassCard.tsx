import React, { useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'violet' | 'cyan' | 'mint' | 'amber' | 'coral' | 'none';
  enableTilt?: boolean;
  onClick?: () => void;
  hoverElevate?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'none',
  enableTilt = true,
  onClick,
  hoverElevate = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max 4 degrees
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const glowStyles = {
    violet: 'hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.35)]',
    cyan: 'hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.35)]',
    mint: 'hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.35)]',
    amber: 'hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.35)]',
    coral: 'hover:shadow-[0_0_30px_-5px_rgba(251,113,133,0.35)]',
    none: ''
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform:
          enableTilt && isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hoverElevate ? 'translateY(-3px)' : ''}`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
      }}
      className={`glass-card rounded-2xl relative overflow-hidden ${glowStyles[glow]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Subtle top ambient specular shine line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
