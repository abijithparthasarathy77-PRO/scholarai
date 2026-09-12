import React from 'react';
import { GlassCard } from './GlassCard';
import { Info } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: React.ReactNode;
  disclaimer?: string;
  glow?: 'violet' | 'cyan' | 'mint' | 'amber' | 'coral';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  sublabel,
  trend,
  trendPositive = true,
  icon,
  disclaimer,
  glow = 'violet',
  onClick
}) => {
  return (
    <GlassCard
      glow={glow}
      onClick={onClick}
      className="p-5 border border-white/10 hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-medium text-[#A7B0C0] uppercase tracking-wider">{label}</span>
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <div className="text-2xl lg:text-3xl font-display font-extrabold text-[#F8FAFC] tracking-tight">
            {value}
          </div>
          {trend && (
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                trendPositive
                  ? 'bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30'
                  : 'bg-[#FB7185]/15 text-[#FB7185] border border-[#FB7185]/30'
              }`}
            >
              {trend}
            </span>
          )}
        </div>

        {sublabel && <p className="text-xs text-[#64748B] mt-1 font-medium">{sublabel}</p>}
      </div>

      {disclaimer && (
        <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#A7B0C0]/80">
          <Info size={12} className="text-[#8B5CF6] shrink-0" />
          <span className="italic">{disclaimer}</span>
        </div>
      )}
    </GlassCard>
  );
};
