import React, { useState } from 'react';
import { FiveDMatch, DimensionScore } from '../../types';
import { BookOpen, GraduationCap, MapPin, IndianRupee, Users, Info, CheckCircle2 } from 'lucide-react';

interface FiveDMatchRadarProps {
  fiveD: FiveDMatch;
  overallScore: number;
  className?: string;
  showDetailsDefault?: boolean;
}

export const FiveDMatchRadar: React.FC<FiveDMatchRadarProps> = ({
  fiveD,
  overallScore,
  className = ''
}) => {
  const [activeDimension, setActiveDimension] = useState<keyof Omit<FiveDMatch, 'overallScore'> | null>('academicRigor');

  const dimensions: {
    key: keyof Omit<FiveDMatch, 'overallScore'>;
    label: string;
    icon: React.ReactNode;
    color: string;
    glow: string;
  }[] = [
    { key: 'academicRigor', label: 'Academic Rigor', icon: <BookOpen size={16} />, color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.4)' },
    { key: 'degreeAlignment', label: 'Degree Alignment', icon: <GraduationCap size={16} />, color: '#22D3EE', glow: 'rgba(34, 211, 238, 0.4)' },
    { key: 'stateDomicile', label: 'State Domicile', icon: <MapPin size={16} />, color: '#34D399', glow: 'rgba(52, 211, 153, 0.4)' },
    { key: 'financialNeed', label: 'Financial Need', icon: <IndianRupee size={16} />, color: '#FBBF24', glow: 'rgba(251, 191, 36, 0.4)' },
    { key: 'cohortCategory', label: 'Cohort Category', icon: <Users size={16} />, color: '#FB7185', glow: 'rgba(251, 113, 133, 0.4)' }
  ];

  const currentDetails: DimensionScore | null = activeDimension ? fiveD[activeDimension] : null;
  const currentDimMeta = dimensions.find((d) => d.key === activeDimension);

  return (
    <div className={`glass-card p-5 rounded-2xl border border-white/10 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-white">
              5D AI Matching Breakdown
            </h4>
          </div>
          <p className="text-xs text-[#A7B0C0] mt-0.5">
            Multi-dimensional evaluation against your verified profile
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[#A7B0C0] uppercase tracking-wider block">Overall Fit</span>
          <span className="text-xl font-display font-extrabold text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
            {overallScore}%
          </span>
        </div>
      </div>

      {/* Dimensional Progress Bars */}
      <div className="space-y-3">
        {dimensions.map(({ key, label, icon, color, glow }) => {
          const dim = fiveD[key];
          const isSelected = activeDimension === key;

          return (
            <div
              key={key}
              onClick={() => setActiveDimension(key)}
              onMouseEnter={() => setActiveDimension(key)}
              className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-white/10 border-white/20 shadow-md'
                  : 'bg-white/5 border-transparent hover:bg-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2 font-medium" style={{ color: isSelected ? '#FFFFFF' : '#A7B0C0' }}>
                  <span style={{ color }}>{icon}</span>
                  <span>{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#64748B]">Weight {dim.weight}%</span>
                  <span className="font-display font-bold" style={{ color }}>
                    {dim.score}%
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${dim.score}%`,
                    backgroundColor: color,
                    boxShadow: isSelected ? `0 0 10px ${glow}` : 'none'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Inspector Box */}
      {currentDetails && currentDimMeta && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#0B1020]/90 border border-white/15 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Info size={14} style={{ color: currentDimMeta.color }} />
              <span className="text-xs font-semibold text-white">{currentDimMeta.label} Rationale</span>
            </div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
              style={{
                backgroundColor: `${currentDimMeta.color}20`,
                color: currentDimMeta.color,
                border: `1px solid ${currentDimMeta.color}40`
              }}
            >
              Match: {currentDetails.score}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#A7B0C0] mt-2 mb-2">
            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-[#64748B] block font-semibold">
                Stated Requirement:
              </span>
              <span className="text-white font-medium">{currentDetails.requirement}</span>
            </div>

            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-[#64748B] block font-semibold">
                Your Profile Value:
              </span>
              <span className="text-[#22D3EE] font-medium">{currentDetails.studentValue}</span>
            </div>
          </div>

          <div className="flex items-start gap-1.5 text-xs text-[#F8FAFC]/90 pt-1">
            <CheckCircle2 size={13} className="text-[#34D399] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed italic">{currentDetails.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
