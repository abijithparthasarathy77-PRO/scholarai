import React, { useState, useEffect, useRef } from 'react';
import { Scholarship } from '../../types';
import {
  Search,
  Sparkles,
  LayoutDashboard,
  Compass,
  Layers,
  Calendar,
  Bot,
  FileText,
  User,
  Shield,
  ArrowRight,
  CornerDownLeft,
  X,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholarships: Scholarship[];
  onNavigate: (viewId: string) => void;
  onViewDossier: (scholarship: Scholarship) => void;
  onAskAIWithPrompt: (prompt: string) => void;
  onFixBlockers: () => void;
  onResetData: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  scholarships,
  onNavigate,
  onViewDossier,
  onAskAIWithPrompt,
  onFixBlockers,
  onResetData
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filtered scholarships
  const filteredScholarships = query.trim()
    ? scholarships
        .filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.provider.toLowerCase().includes(query.toLowerCase()) ||
            s.categoryTag.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : scholarships.slice(0, 4);

  // Navigation actions
  const navigationItems = [
    { id: 'dashboard', title: 'Student Dashboard', subtitle: 'Overview & AI recommendations', icon: LayoutDashboard, view: 'dashboard' },
    { id: 'discover', title: 'Scholarship Discovery', subtitle: 'Search 28 opportunities', icon: Compass, view: 'discover' },
    { id: 'strategy', title: 'My Scholarship Strategy', subtitle: 'Funding Funnel & Opportunity Map', icon: Sparkles, view: 'strategy' },
    { id: 'pipeline', title: 'Application Pipeline', subtitle: 'Kanban tracking board', icon: Layers, view: 'pipeline' },
    { id: 'deadlines', title: 'Deadline Command Center', subtitle: 'Urgent timeline countdowns', icon: Calendar, view: 'deadlines' },
    { id: 'advisor', title: 'AI Scholarship Advisor', subtitle: 'Strategy Co-Pilot & 3D AI Orb', icon: Bot, view: 'advisor' },
    { id: 'documents', title: 'Document Vault', subtitle: 'Status & renewal checks', icon: FileText, view: 'documents' },
    { id: 'profile', title: 'Student Profile', subtitle: 'Academic & financial attributes', icon: User, view: 'profile' },
    { id: 'admin', title: 'Admin Suite & Rule Builder', subtitle: 'Manage scholarships & logic rules', icon: Shield, view: 'admin' }
  ].filter((item) =>
    query.trim()
      ? item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      : true
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#070B17]/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Palette Panel */}
      <div className="relative w-full max-w-2xl bg-[#0B1020] border border-[#8B5CF6]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.2)] overflow-hidden flex flex-col max-h-[80vh] z-10 animate-scaleUp">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search size={20} className="text-[#8B5CF6] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, scholarship name, or question..."
            className="w-full bg-transparent text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#64748B] hover:text-white"
            >
              <X size={16} />
            </button>
          )}
          <span className="text-[10px] font-mono text-[#64748B] px-1.5 py-0.5 rounded bg-white/5 shrink-0 hidden sm:inline-block">
            ESC to close
          </span>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick AI Prompts */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#A7B0C0] px-2 mb-1.5 flex items-center gap-1.5">
              <Bot size={12} className="text-[#22D3EE]" />
              AI Strategy Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onAskAIWithPrompt('What should I apply for first?');
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={15} className="text-[#8B5CF6]" />
                  <div>
                    <span className="text-white font-medium group-hover:text-[#22D3EE] transition-colors">
                      What should I apply for first?
                    </span>
                    <span className="text-[#64748B] ml-2 text-[11px]">
                      Analyze priority, urgency, and blockers
                    </span>
                  </div>
                </div>
                <ArrowRight size={13} className="text-[#64748B] group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => {
                  onFixBlockers();
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={15} className="text-[#FB7185]" />
                  <div>
                    <span className="text-white font-medium group-hover:text-[#FB7185] transition-colors">
                      Review & Fix Application Blockers
                    </span>
                    <span className="text-[#64748B] ml-2 text-[11px]">
                      Income certificate renewal & Dean endorsement
                    </span>
                  </div>
                </div>
                <ArrowRight size={13} className="text-[#64748B] group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Scholarships */}
          {filteredScholarships.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A7B0C0] px-2 mb-1.5 flex items-center gap-1.5">
                <Compass size={12} className="text-[#8B5CF6]" />
                Matching Scholarships
              </div>
              <div className="space-y-1">
                {filteredScholarships.map((sch) => (
                  <button
                    key={sch.id}
                    onClick={() => {
                      onViewDossier(sch);
                      onClose();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium truncate group-hover:text-[#8B5CF6] transition-colors">
                          {sch.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8B5CF6]/15 text-[#8B5CF6] font-mono font-semibold shrink-0">
                          {sch.matchScore}% Match
                        </span>
                      </div>
                      <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                        {sch.provider} • ₹{sch.fundingAmount.toLocaleString('en-IN')} • {sch.daysLeft}d left
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#22D3EE] shrink-0 font-medium">
                      View Dossier →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {navigationItems.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A7B0C0] px-2 mb-1.5 flex items-center gap-1.5">
                <Layers size={12} className="text-[#34D399]" />
                Navigation Pages
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.view);
                        onClose();
                      }}
                      className="px-3 py-2 rounded-xl flex items-center gap-2.5 text-left hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#A7B0C0] group-hover:text-[#22D3EE] group-hover:border-[#22D3EE]/30 transition-colors shrink-0">
                        <Icon size={14} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium text-[11px] truncate group-hover:text-[#22D3EE] transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetData();
                onClose();
              }}
              className="text-[#64748B] hover:text-[#FB7185] flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={12} />
              Reset Demo State
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft size={12} /> to select
            </span>
            <span className="flex items-center gap-1">
              <span className="font-mono">ESC</span> to exit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
