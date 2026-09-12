import React from 'react';
import { Scholarship } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { PriorityBadge, UrgencyBadge } from '../ui/Badge';
import { ScoreRing } from '../ui/ScoreRing';
import { Calendar, IndianRupee, ArrowRight, AlertCircle, CheckCircle2, BookmarkPlus } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onViewDossier: (scholarship: Scholarship) => void;
  onAddToStrategy?: (scholarship: Scholarship) => void;
  isSaved?: boolean;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  onViewDossier,
  onAddToStrategy,
  isSaved = false
}) => {
  return (
    <GlassCard
      glow={
        scholarship.urgency === 'CRITICAL'
          ? 'coral'
          : scholarship.priorityRankLabel === 'CRITICAL PRIORITY'
          ? 'violet'
          : 'cyan'
      }
      className="p-5 flex flex-col justify-between border border-white/10 group h-full"
    >
      <div>
        {/* Top Badges & Urgency */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <PriorityBadge priority={scholarship.priorityRankLabel} score={scholarship.priorityScore} />
          <UrgencyBadge urgency={scholarship.urgency} daysLeft={scholarship.daysLeft} />
        </div>

        {/* Title & Provider */}
        <h4 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#22D3EE] transition-colors leading-snug line-clamp-2 mb-1">
          {scholarship.name}
        </h4>
        <div className="flex items-center gap-2 text-xs text-[#A7B0C0] mb-4">
          <span>{scholarship.provider}</span>
          <span>•</span>
          <span className="text-[#8B5CF6] font-medium">{scholarship.categoryTag}</span>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center text-[#22D3EE] shrink-0">
              <IndianRupee size={15} />
            </div>
            <div>
              <span className="text-[10px] text-[#A7B0C0] uppercase tracking-wider block">Funding</span>
              <span className="text-xs sm:text-sm font-display font-extrabold text-white">
                ₹{scholarship.fundingAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#A78BFA] shrink-0">
              <Calendar size={15} />
            </div>
            <div>
              <span className="text-[10px] text-[#A7B0C0] uppercase tracking-wider block">Deadline</span>
              <span className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                {new Date(scholarship.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Readiness & Match Rings */}
        <div className="flex items-center justify-around py-2 border-y border-white/5 mb-4">
          <div className="flex items-center gap-2.5">
            <ScoreRing
              score={scholarship.matchScore}
              size={48}
              strokeWidth={4.5}
              variant="violet-cyan"
            />
            <div className="text-left">
              <span className="text-xs font-semibold text-white block">5D Match</span>
              <span className="text-[10px] text-[#34D399]">High Precision</span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10" />

          <div className="flex items-center gap-2.5">
            <ScoreRing
              score={scholarship.readinessScore}
              size={48}
              strokeWidth={4.5}
              variant={scholarship.readinessScore >= 85 ? 'mint' : 'amber'}
            />
            <div className="text-left">
              <span className="text-xs font-semibold text-white block">Readiness</span>
              <span className="text-[10px] text-[#A7B0C0]">
                {scholarship.blockers.length === 0 ? 'No Blockers' : `${scholarship.blockers.length} Blocker`}
              </span>
            </div>
          </div>
        </div>

        {/* Next Action Box */}
        <div className="p-2.5 rounded-xl bg-[#0B1020]/80 border border-white/5 mb-4">
          <div className="flex items-start gap-1.5 text-xs">
            {scholarship.blockers.length > 0 ? (
              <AlertCircle size={14} className="text-[#FBBF24] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 size={14} className="text-[#34D399] shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-[#A7B0C0] tracking-wider block">
                Next Strategic Action
              </span>
              <p className="text-xs text-white font-medium line-clamp-1">{scholarship.nextAction}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center gap-2">
        <button
          onClick={() => onViewDossier(scholarship)}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-95 transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          <span>View Dossier</span>
          <ArrowRight size={13} />
        </button>

        {onAddToStrategy && (
          <button
            onClick={() => onAddToStrategy(scholarship)}
            title={isSaved ? 'In Strategy' : 'Add to Strategy'}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-[#34D399]/15 border-[#34D399]/40 text-[#34D399]'
                : 'bg-white/5 border-white/10 text-[#A7B0C0] hover:text-white hover:bg-white/10'
            }`}
          >
            <BookmarkPlus size={15} />
          </button>
        )}
      </div>
    </GlassCard>
  );
};
