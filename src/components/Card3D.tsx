import React, { useRef, useState, useCallback } from 'react';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt in degrees (default 8)
  glare?: boolean;
  scaleOnHover?: number; // default 1.02
  liftOnHover?: number; // default -8px
  depthZ?: number; // default 26px
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  scaleOnHover = 1.02,
  liftOnHover = -8,
  depthZ = 26,
  ...rest
}) => {
  // Outer stationary reference for computing rock-solid, jitter-free coordinates
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPopped, setIsPopped] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Update tilt & glare coordinates relative to stationary wrapper
  const updatePointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Clamped normalized coordinates [-1, 1]
      const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
      const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

      // Gentle, natural tilt angles
      const rotX = -normY * maxTilt;
      const rotY = normX * maxTilt;

      setTilt({ x: rotX, y: rotY });

      if (glare) {
        setGlarePos({
          x: Math.max(0, Math.min(100, (x / rect.width) * 100)),
          y: Math.max(0, Math.min(100, (y / rect.height) * 100)),
          opacity: Math.min(0.45, Math.hypot(normX, normY) * 0.4),
        });
      }
    },
    [maxTilt, glare]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePointer(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPopped(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsPopped(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  // Tactile touch handlers for mobile, tablet, and touch screens
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setIsPopped(true);
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    // Graceful release delay so touch feels tactile and pops up smoothly
    setTimeout(() => {
      setIsPopped(false);
      setTilt({ x: 0, y: 0 });
      setGlarePos(prev => ({ ...prev, opacity: 0 }));
    }, 200);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative perspective-1000 select-none ${className}`}
      style={{
        perspective: '1000px',
      }}
      {...rest}
    >
      {/* 3D Pop-Up Animated Card Body */}
      <div
        className="w-full h-full preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: isPopped
            ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(${liftOnHover}px) translateZ(${depthZ}px) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px) scale3d(1, 1, 1)',
          transition: isPopped
            ? 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease'
            : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          filter: isPopped ? 'drop-shadow(0 20px 30px rgba(99, 102, 241, 0.2))' : 'none',
        }}
      >
        {children}

        {/* Dynamic Specular Holographic Glare */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
            style={{
              opacity: isPopped ? glarePos.opacity : 0,
              background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45), rgba(99, 102, 241, 0.15) 40%, transparent 80%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  );
};
