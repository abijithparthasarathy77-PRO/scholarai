import React, { useState, useEffect, useRef } from 'react';
import { Scholarship, UserRole, ThemeMode } from '../types';
import { 
  Search, 
  Sparkles, 
  Compass, 
  LayoutDashboard, 
  Calendar, 
  Layers, 
  UserCheck, 
  Shield, 
  RotateCcw, 
  FileText, 
  ArrowRight, 
  CornerDownLeft,
  X,
  Palette,
  BookOpen,
  Sliders,
  FileQuestion,
  LogOut
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  scholarships: Scholarship[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onNavigateTab: (tab: string) => void;
  onOpenAdvisor: () => void;
  onToggleRole: (role: UserRole) => void;
  currentRole: UserRole;
  onResetDemo: () => void;
  onSelectTheme: (theme: ThemeMode) => void;
  currentTheme: ThemeMode;
  adminSubTab?: 'overview' | 'scholarships' | 'rules' | 'reviews';
  onSelectAdminSubTab?: (tab: 'overview' | 'scholarships' | 'rules' | 'reviews') => void;
  onSignOut?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  scholarships,
  onSelectScholarship,
  onNavigateTab,
  onOpenAdvisor,
  onToggleRole,
  currentRole,
  onResetDemo,
  onSelectTheme,
  currentTheme,
  adminSubTab = 'overview',
  onSelectAdminSubTab,
  onSignOut,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown handler for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
}

  // Filter items based on query
  const q = query.toLowerCase().trim();

  // Completely separate Navigation Modules for Admin vs Student
  const adminNavItems: PaletteItem[] = [
    { id: 'admin_overview', title: 'Institutional Dashboard Overview', subtitle: 'Overview metrics & evaluator duty bar', category: 'Admin Suite', icon: Shield, action: () => { onSelectAdminSubTab?.('overview'); onNavigateTab('admin'); onClose(); } },
    { id: 'admin_scholarships', title: 'Scholarship Registry & Catalog', subtitle: `${scholarships.length} indexed schemes`, category: 'Admin Suite', icon: BookOpen, action: () => { onSelectAdminSubTab?.('scholarships'); onNavigateTab('admin'); onClose(); } },
    { id: 'admin_rules', title: 'Eligibility Rule Builder', subtitle: 'Multi-factor AST eligibility logic', category: 'Admin Suite', icon: Sliders, action: () => { onSelectAdminSubTab?.('rules'); onNavigateTab('admin'); onClose(); } },
    { id: 'admin_reviews', title: 'Manual Review Appeals Queue', subtitle: 'Student appeal adjudication', category: 'Admin Suite', icon: FileQuestion, action: () => { onSelectAdminSubTab?.('reviews'); onNavigateTab('admin'); onClose(); } },
    { id: 'landing', title: 'Public Portal Homepage', subtitle: 'Public landing presentation', category: 'Navigation', icon: Sparkles, action: () => { onNavigateTab('landing'); onClose(); } },
  ].filter(item => !q || item.title.toLowerCase().includes(q) || (item.subtitle && item.subtitle.toLowerCase().includes(q)));

  const studentNavItems: PaletteItem[] = [
    { id: 'dashboard', title: 'Go to Student Dashboard', category: 'Navigation', icon: LayoutDashboard, action: () => { onNavigateTab('dashboard'); onClose(); } },
    { id: 'discover', title: 'Discover All Scholarships', category: 'Navigation', icon: Compass, action: () => { onNavigateTab('discover'); onClose(); } },
    { id: 'applications', title: 'Application Pipeline & Kanban', category: 'Navigation', icon: Layers, action: () => { onNavigateTab('applications'); onClose(); } },
    { id: 'calendar', title: 'Deadlines Calendar', category: 'Navigation', icon: Calendar, action: () => { onNavigateTab('calendar'); onClose(); } },
    { id: 'profile', title: 'Profile & Documents Verification', category: 'Navigation', icon: UserCheck, action: () => { onNavigateTab('profile'); onClose(); } },
    { id: 'landing', title: 'Public Portal Homepage', category: 'Navigation', icon: Sparkles, action: () => { onNavigateTab('landing'); onClose(); } },
  ].filter(item => !q || item.title.toLowerCase().includes(q));

  const navigationItems = currentRole === 'admin' ? adminNavItems : studentNavItems;

  const adminActionItems: PaletteItem[] = [
    { id: 'sign_out', title: 'Sign Out of Administrator Session', category: 'Admin Actions', icon: LogOut, action: () => { onSignOut?.(); onClose(); } },
    { id: 'reset_demo', title: 'Reset Demo Database to Initial State', category: 'Admin Actions', icon: RotateCcw, action: () => { onResetDemo(); onClose(); } },
    { id: 'theme_midnight', title: 'Switch Theme: Midnight Cyber', category: 'Preferences', icon: Palette, action: () => { onSelectTheme('midnight'); onClose(); } },
    { id: 'theme_aurora', title: 'Switch Theme: Radiant Aurora', category: 'Preferences', icon: Palette, action: () => { onSelectTheme('aurora'); onClose(); } },
  ].filter(item => !q || item.title.toLowerCase().includes(q));

  const studentActionItems: PaletteItem[] = [
    { id: 'advisor', title: 'Launch ScholarAI Advisor Co-Pilot', category: 'Quick Actions', icon: Sparkles, action: () => { onOpenAdvisor(); onClose(); } },
    { id: 'sign_out', title: 'Sign Out of Session', category: 'Quick Actions', icon: LogOut, action: () => { onSignOut?.(); onClose(); } },
    { id: 'reset_demo', title: 'Reset Demo Database to Initial State', category: 'Quick Actions', icon: RotateCcw, action: () => { onResetDemo(); onClose(); } },
    { id: 'theme_midnight', title: 'Switch Theme: Midnight Cyber', category: 'Preferences', icon: Palette, action: () => { onSelectTheme('midnight'); onClose(); } },
    { id: 'theme_aurora', title: 'Switch Theme: Radiant Aurora', category: 'Preferences', icon: Palette, action: () => { onSelectTheme('aurora'); onClose(); } },
  ].filter(item => !q || item.title.toLowerCase().includes(q));

  const actionItems = currentRole === 'admin' ? adminActionItems : studentActionItems;

  const scholarshipItems: PaletteItem[] = scholarships
    .filter(s => !q || s.title.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q) || s.category_type.toLowerCase().includes(q))
    .slice(0, 5)
    .map(s => ({
      id: s.id,
      title: s.title,
      subtitle: `${s.provider} • ${s.funding_formatted}`,
      category: 'Scholarships',
      icon: FileText,
      action: () => {
        onSelectScholarship(s);
        onClose();
      },
    }));

  const allResults: PaletteItem[] = [...navigationItems, ...actionItems, ...scholarshipItems];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, allResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allResults.length) % Math.max(1, allResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allResults[selectedIndex]) {
        allResults[selectedIndex].action();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`max-w-2xl w-full rounded-3xl border shadow-2xl backdrop-blur-2xl overflow-hidden animate-modal-popup ${
          currentTheme === 'midnight'
            ? 'bg-slate-950/95 border-slate-800 text-slate-100 shadow-black/80'
            : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-indigo-500/20'
        }`}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-inherit/15 gap-3">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, search scholarships, or jump to module..."
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base placeholder:opacity-50 text-inherit"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-slate-500/10 opacity-60 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-slate-500/10 border border-inherit/20 opacity-70">
            Esc
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-inherit/5">
          {allResults.length === 0 ? (
            <div className="py-12 text-center opacity-60 text-xs">
              No matching scholarships, modules, or actions found for "{query}".
            </div>
          ) : (
            allResults.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3.5 py-2.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'hover:bg-slate-500/5 text-inherit'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-500/10 text-slate-600 dark:text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {item.title}
                      </div>
                      {'subtitle' in item && (
                        <div className={`text-[11px] truncate ${isSelected ? 'text-indigo-100' : 'opacity-60'}`}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 pl-2">
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-500/10 opacity-70'
                    }`}>
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-white/80" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="px-4 py-2.5 border-t border-inherit/15 bg-slate-500/5 flex items-center justify-between text-[11px] opacity-60">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="font-semibold">
            ScholarAI Command Engine
          </span>
        </div>
      </div>
    </div>
  );
};
