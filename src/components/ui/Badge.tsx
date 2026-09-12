import React from 'react';
import { UrgencyLevel, PriorityLevel, DocumentStatus, ApplicationStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'cyan' | 'mint' | 'amber' | 'coral' | 'muted';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'violet',
  className = '',
  size = 'md',
  dot = false
}) => {
  const variantStyles = {
    violet: 'bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/30',
    cyan: 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30',
    mint: 'bg-[#34D399]/15 text-[#34D399] border-[#34D399]/30',
    amber: 'bg-[#FBBF24]/15 text-[#FBBF24] border-[#FBBF24]/30',
    coral: 'bg-[#FB7185]/15 text-[#FB7185] border-[#FB7185]/30',
    muted: 'bg-white/5 text-[#A7B0C0] border-white/10'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  const dotColors = {
    violet: 'bg-[#8B5CF6]',
    cyan: 'bg-[#22D3EE]',
    mint: 'bg-[#34D399]',
    amber: 'bg-[#FBBF24]',
    coral: 'bg-[#FB7185]',
    muted: 'bg-[#A7B0C0]'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

export const UrgencyBadge: React.FC<{ urgency: UrgencyLevel; daysLeft?: number }> = ({ urgency, daysLeft }) => {
  if (urgency === 'CRITICAL') {
    return (
      <Badge variant="coral" dot size="sm" className="shadow-[0_0_12px_rgba(251,113,133,0.3)]">
        CRITICAL {daysLeft !== undefined && `(${daysLeft <= 1 ? '<24h' : `${daysLeft * 24}h`})`}
      </Badge>
    );
  }
  if (urgency === 'URGENT') {
    return (
      <Badge variant="amber" dot size="sm">
        URGENT {daysLeft !== undefined && `(${daysLeft}d)`}
      </Badge>
    );
  }
  return (
    <Badge variant="cyan" size="sm">
      UPCOMING {daysLeft !== undefined && `(${daysLeft}d)`}
    </Badge>
  );
};

export const PriorityBadge: React.FC<{ priority: PriorityLevel; score?: number }> = ({ priority, score }) => {
  if (priority === 'CRITICAL PRIORITY') {
    return (
      <Badge
        variant="violet"
        size="sm"
        dot
        className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#22D3EE]/20 text-[#F8FAFC] border-[#8B5CF6]/50 shadow-[0_0_16px_rgba(139,92,246,0.3)] font-semibold"
      >
        {score !== undefined ? `${score}/100 ` : ''}CRITICAL PRIORITY
      </Badge>
    );
  }
  if (priority === 'HIGH PRIORITY') {
    return (
      <Badge variant="cyan" size="sm" dot>
        {score !== undefined ? `${score}/100 ` : ''}HIGH PRIORITY
      </Badge>
    );
  }
  if (priority === 'RECOMMENDED') {
    return (
      <Badge variant="mint" size="sm">
        {score !== undefined ? `${score}/100 ` : ''}RECOMMENDED
      </Badge>
    );
  }
  return (
    <Badge variant="muted" size="sm">
      {score !== undefined ? `${score}/100 ` : ''}BACKUP
    </Badge>
  );
};

export const DocumentBadge: React.FC<{ status: DocumentStatus }> = ({ status }) => {
  switch (status) {
    case 'READY':
      return <Badge variant="mint" size="sm" dot>READY</Badge>;
    case 'EXPIRED':
      return <Badge variant="coral" size="sm" dot>EXPIRED</Badge>;
    case 'MISSING':
      return <Badge variant="amber" size="sm" dot>MISSING</Badge>;
    case 'NEEDS_REVIEW':
      return <Badge variant="cyan" size="sm">NEEDS REVIEW</Badge>;
    default:
      return <Badge variant="muted" size="sm">{status}</Badge>;
  }
};

export const ApplicationStatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  switch (status) {
    case 'Interested':
      return <Badge variant="muted" size="sm">Interested</Badge>;
    case 'Preparing':
      return <Badge variant="amber" size="sm" dot>Preparing</Badge>;
    case 'Ready to Apply':
      return <Badge variant="cyan" size="sm" dot>Ready to Apply</Badge>;
    case 'Applied':
      return <Badge variant="violet" size="sm" dot>Applied</Badge>;
    case 'Awarded':
      return <Badge variant="mint" size="sm" dot className="shadow-[0_0_14px_rgba(52,211,153,0.4)]">Awarded</Badge>;
  }
};
