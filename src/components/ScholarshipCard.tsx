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
  Clock, 
  Sparkles,
  BookmarkPlus
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
        return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30';
      case 'Likely Eligible':
        return 'bg-sky-500/15 text-sky-600 border-sky-500/30';
      case 'Needs Verification':
        return 'bg-amber-500/15 text-amber-600 border-amber-500/30';
      case 'Missing Requirement':
        return 'bg-orange-500/15 text-orange-600 border-orange-500/30';
      default:
        return 'bg-slate-500/15 text-slate-600 border-slate-500/30';
    }
  };

  const isUrgent = scholarship.days_remaining <= 3;

  return (
    <Card3D className="h-full" maxTilt={10} glare={true}>
      <div className="scholar-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group h-full preserve-3d">
        {/* Top Meta Bar with 3D Depth */}
        <div className="preserve-3d">
          <div className="flex items-start justify-between gap-3 mb-3 translate-z-20">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1 ${getStatusBadge(matchResult.status)}`}>
              <Sparkles className="w-3 h-3 mr-1" />
              <span>{matchResult.overall_score}% Match</span>
              <span className="font-normal opacity-75">• {matchResult.status}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 flex items-center">
              <ShieldCheck className="w-3 h-3 text-emerald-600 mr-1" />
              {scholarship.verification_status}
            </span>
          </div>

          {/* Deadline Countdown */}
          <div className="flex items-center">
            <CountdownTimer deadline={scholarship.deadline} compact />
          </div>
        </div>

        {/* Title and Provider */}
        <h3 
          onClick={() => onViewDetails(scholarship)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug line-clamp-2"
        >
          {scholarship.title}
        </h3>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{scholarship.provider}</span>
        </div>

        {/* Funding & Frequency Badge with 3D Pop-out */}
        <div className="mt-4 p-3 bg-slate-500/10 rounded-xl border border-inherit/20 flex items-center justify-between translate-z-20">
          <div>
            <span className="text-[11px] opacity-70 font-medium block">Potential Funding Opportunity</span>
            <span className="text-base font-extrabold text-inherit tracking-tight">
              {scholarship.funding_formatted}
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-white/90 text-slate-800 rounded-md border border-slate-200/80 shadow-2xs">
            {scholarship.frequency}
          </span>
        </div>

        {/* Why You Qualify Section */}
        <div className="mt-4 space-y-2 translate-z-10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Why You Qualify
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {matchResult.why_you_qualify.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
            {matchResult.missing_requirements.slice(0, 1).map((item, idx) => (
              <li key={`miss_${idx}`} className="flex items-start space-x-1.5 text-amber-700 font-medium">
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
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center space-x-1 cursor-pointer"
        >
          <span>View Eligibility Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onApplyOrSave && onApplyOrSave(scholarship)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105 ${
            isInPipeline 
              ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30' 
              : 'btn-animated-glow text-white shadow-xs'
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
