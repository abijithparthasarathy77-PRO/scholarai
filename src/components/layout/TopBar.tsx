import React from 'react';
import { StudentProfile, Scholarship } from '../../types';
import {
  Search,
  Bell,
  Sparkles,
  Bot,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface TopBarProps {
  student: StudentProfile;
  scholarships: Scholarship[];
  onNavigate: (viewId: string) => void;
  onSearchFocus: () => void;
  onViewDossier: (scholarship: Scholarship) => void;
  onOpenLanding: () => void;
  onOpenOnboarding: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  student,
  scholarships,
  onNavigate,
  onSearchFocus,
  onViewDossier,
  onOpenLanding,
  onOpenOnboarding
}) => {
  const criticalSch = scholarships.find((s) => s.daysLeft <= 3);

  return (
    <header className="h-18 border-b border-white/10 bg-[#070B17]/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Search Input Trigger */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div
          onClick={onSearchFocus}
          className="relative flex items-center cursor-pointer group"
        >
          <Search size={16} className="absolute left-3.5 text-[#64748B] group-hover:text-[#22D3EE] transition-colors" />
          <div className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs text-[#64748B] flex items-center justify-between group-hover:border-[#8B5CF6]/50">
            <span>Search scholarships or ask naturally...</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A7B0C0]">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Urgent Deadline Notification Pill */}
        {criticalSch && (
          <button
            onClick={() => onViewDossier(criticalSch)}
            className="py-1.5 px-3 rounded-full bg-[#FB7185]/15 hover:bg-[#FB7185]/25 border border-[#FB7185]/30 text-xs text-[#FB7185] font-semibold flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(251,113,133,0.2)] animate-pulse"
          >
            <AlertTriangle size={13} />
            <span className="hidden md:inline">Urgent: {criticalSch.name}</span>
            <span>(48h)</span>
          </button>
        )}

        {/* AI Advisor Button */}
        <button
          onClick={() => onNavigate('advisor')}
          className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#22D3EE]/20 hover:from-[#8B5CF6]/30 hover:to-[#22D3EE]/30 border border-[#8B5CF6]/40 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Bot size={15} className="text-[#22D3EE]" />
          <span className="hidden sm:inline">AI Advisor</span>
        </button>

        {/* Guided Strategy Button */}
        <button
          onClick={onOpenOnboarding}
          className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#A7B0C0] hover:text-white transition-colors hidden lg:flex items-center gap-1.5"
        >
          <Sparkles size={13} className="text-[#8B5CF6]" />
          <span>New Strategy Setup</span>
        </button>

        {/* Landing Page Button */}
        <button
          onClick={onOpenLanding}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#A7B0C0] hover:text-white transition-colors"
          title="View Landing Page"
        >
          <ExternalLink size={15} />
        </button>
      </div>
    </header>
  );
};
