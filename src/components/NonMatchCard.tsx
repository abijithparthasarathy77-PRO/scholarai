import React from 'react';
import { Scholarship, MatchResult } from '../types';
import { 
  Building2, 
  XCircle, 
  ArrowRight, 
  ShieldAlert, 
  FileQuestion,
  HelpCircle
} from 'lucide-react';

interface NonMatchCardProps {
  scholarship: Scholarship;
  matchResult: MatchResult;
  onViewDetails: (scholarship: Scholarship) => void;
  onRequestReview: (scholarship: Scholarship) => void;
}

export const NonMatchCard: React.FC<NonMatchCardProps> = ({
  scholarship,
  matchResult,
  onViewDetails,
  onRequestReview,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-rose-200/70 shadow-xs flex flex-col justify-between relative overflow-hidden group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center space-x-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Not a Match — Disqualified by Constraints</span>
          </span>

          <span className="text-xs text-slate-500 font-mono font-medium">
            Score: {matchResult.overall_score}%
          </span>
        </div>

        {/* Title and Provider */}
        <h3 
          onClick={() => onViewDetails(scholarship)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors cursor-pointer leading-snug line-clamp-2"
        >
          {scholarship.title}
        </h3>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{scholarship.provider}</span>
        </div>

        {/* Why You Are Not Eligible (Transparent Disqualifiers) */}
        <div className="mt-4 p-3.5 bg-rose-50/50 rounded-xl border border-rose-100">
          <div className="flex items-center space-x-1 text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Why You're Not Eligible</span>
          </div>

          <ul className="space-y-2 text-xs text-rose-900 font-medium">
            {matchResult.disqualifiers.map((reason, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <span className="text-rose-600 font-bold text-sm leading-none shrink-0 mt-0.5">✕</span>
                <span className="leading-snug">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(scholarship)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
        >
          <span>View Requirement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onRequestReview(scholarship)}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs hover:border-slate-400 transition-all"
        >
          <FileQuestion className="w-3.5 h-3.5 text-indigo-600" />
          <span>Request Manual Review</span>
        </button>
      </div>
    </div>
  );
};
