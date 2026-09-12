import React from 'react';

interface ScoreRingProps {
  score: number; // 0 - 100
  size?: number; // width & height in px
  strokeWidth?: number;
  variant?: 'violet-cyan' | 'mint' | 'amber' | 'coral';
  label?: string;
  sublabel?: string;
  showPercent?: boolean;
  className?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 72,
  strokeWidth = 6,
  variant = 'violet-cyan',
  label,
  sublabel,
  showPercent = true,
  className = ''
}) => {
  const safeScore = Math.min(100, Math.max(0, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const uniqueId = React.useId();
  const gradientId = `score-gradient-${variant}-${size}-${uniqueId.replace(/:/g, '')}`;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {variant === 'violet-cyan' && (
                <>
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </>
              )}
              {variant === 'mint' && (
                <>
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </>
              )}
              {variant === 'amber' && (
                <>
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </>
              )}
              {variant === 'coral' && (
                <>
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#FB7185" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Active progress stroke with glow */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: `drop-shadow(0 0 6px ${variant === 'coral' ? 'rgba(251,113,133,0.5)' : variant === 'amber' ? 'rgba(251,191,36,0.5)' : 'rgba(139,92,246,0.5)'})`
            }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
          <span className="font-display font-bold text-white tracking-tight" style={{ fontSize: size * 0.28 }}>
            {safeScore}
            {showPercent && <span className="text-[10px] text-[#A7B0C0] font-normal">%</span>}
          </span>
          {sublabel && (
            <span className="text-[9px] text-[#A7B0C0] mt-0.5 tracking-wider uppercase font-medium">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && <span className="text-xs text-[#A7B0C0] mt-1.5 font-medium">{label}</span>}
    </div>
  );
};
