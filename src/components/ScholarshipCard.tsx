import React from 'react';
import { Scholarship, MatchResult } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { Card3D } from './Card3D';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  BookmarkPlus,
  Landmark,
  BadgeCheck
} from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  matchResult: MatchResult;
  onViewDetails: (scholarship: Scholarship) => void;
  onApplyOrSave?: (scholarship: Scholarship) => void;
  isInPipeline?: boolean;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  matchResult,
  onViewDetails,
  onApplyOrSave,
  isInPipeline = false,
}) => {
  const getStatusBadge = (status: MatchResult['status']) => {
    switch (status) {
      case 'Strong Match':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Likely Eligible':
        return 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30';
      case 'Needs Verification':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Missing Requirement':
        return 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30';
      default:
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <Card3D className="h-full" maxTilt={7} glare={true} liftOnHover={-8} depthZ={26} scaleOnHover={1.02}>
      <div className="scholar-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group h-full preserve-3d">
        
        {/* Top Meta Bar with 3D Depth */}
        <div className="preserve-3d space-y-3">
          <div className="flex items-start justify-between gap-2.5 translate-z-20">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Match Score Badge */}
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1 shadow-2xs ${getStatusBadge(matchResult.status)}`}>
                <Sparkles className="w-3 h-3 mr-1" />
                <span>{matchResult.overall_score}% Match</span>
                <span className="font-normal opacity-75 hidden sm:inline">• {matchResult.status}</span>
              </span>

              {/* Official Verification Tag */}
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-500/10 text-inherit border border-inherit/20 flex items-center">
                <BadgeCheck className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                <span>Verified Official Scheme</span>
              </span>
            </div>

            {/* Deadline Countdown */}
            <div className="flex items-center shrink-0">
              <CountdownTimer deadline={scholarship.deadline} compact />
            </div>
          </div>

          {/* Title and Institutional Provider */}
          <div>
            <h3 
              onClick={() => onViewDetails(scholarship)}
              className="text-base sm:text-lg font-black text-inherit group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug line-clamp-2 tracking-tight"
            >
              {scholarship.title}
            </h3>

            <div className="flex items-center space-x-2 text-xs opacity-70 mt-1.5">
              <Landmark className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-semibold truncate">{scholarship.provider}</span>
              <span>•</span>
              <span className="truncate">{scholarship.category_type}</span>
            </div>
          </div>

          {/* Funding & DBT Eligibility Ribbon */}
          <div className="p-3.5 bg-slate-500/10 rounded-xl border border-inherit/15 flex items-center justify-between translate-z-20">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider opacity-60 block">
                Total Scheme Grant
              </span>
              <span className="text-base sm:text-lg font-black text-inherit tracking-tight">
                {scholarship.funding_formatted}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold px-2 py-1 bg-white/90 dark:bg-slate-800 text-inherit rounded-md border border-inherit/20 shadow-2xs block">
                {scholarship.frequency}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                Direct Benefit Transfer
              </span>
            </div>
          </div>

          {/* Why You Qualify 5D Breakdown Preview */}
          <div className="space-y-1.5 translate-z-10 pt-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-50">
              5D Explainability Audit
            </div>
            <ul className="space-y-1 text-xs">
              {matchResult.why_you_qualify.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug opacity-80">{item}</span>
                </li>
              ))}
              {matchResult.missing_requirements.slice(0, 1).map((item, idx) => (
                <li key={`miss_${idx}`} className="flex items-start space-x-1.5 text-amber-600 dark:text-amber-400 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Footer with 3D Depth */}
        <div className="mt-5 pt-3.5 border-t border-inherit/15 flex items-center justify-between gap-2 translate-z-30">
          <button
            onClick={() => onViewDetails(scholarship)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View Full Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onApplyOrSave && onApplyOrSave(scholarship)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 shadow-sm ${
              isInPipeline 
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                : 'btn-animated-glow text-white'
            }`}
          >
            {isInPipeline ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Pipeline</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Track / Apply</span>
              </>
            )}
          </button>
        </div>

      </div>
    </Card3D>
  );
};
