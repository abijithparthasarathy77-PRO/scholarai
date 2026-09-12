import React from 'react';
import { StudentProfile } from '../../types';
import { ScoreRing } from '../ui/ScoreRing';
import {
  LayoutDashboard,
  Search,
  Compass,
  Kanban,
  Clock,
  Bot,
  User,
  Shield,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  student: StudentProfile;
  onResetData: () => void;
  onOpenLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  student,
  onResetData,
  onOpenLanding
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'discover', label: 'Discover', icon: <Search size={18} /> },
    { id: 'strategy', label: 'My Strategy', icon: <Compass size={18} />, badge: 'Priority' },
    { id: 'pipeline', label: 'Applications', icon: <Kanban size={18} /> },
    { id: 'deadlines', label: 'Deadlines', icon: <Clock size={18} />, badgeColor: 'coral', badgeText: '48h' },
    { id: 'advisor', label: 'AI Advisor', icon: <Bot size={18} />, highlight: true },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'admin', label: 'Admin Console', icon: <Shield size={18} /> }
  ];

  return (
    <aside className="w-64 bg-[#0B1020]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-18 p-5 border-b border-white/10 flex items-center justify-between">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center text-white shadow-[0_0_16px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-transform">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white block leading-none">
                SCHOLAR<span className="text-[#22D3EE]">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A7B0C0] font-semibold">
                Strategy Platform
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
          {navItems.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B5CF6]/25 to-[#22D3EE]/15 text-white border border-[#8B5CF6]/40 shadow-[0_0_16px_rgba(139,92,246,0.2)]'
                    : 'text-[#A7B0C0] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-[#22D3EE]' : 'text-[#A7B0C0] group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badgeText && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#FB7185]/20 text-[#FB7185] border border-[#FB7185]/40 animate-pulse">
                    {item.badgeText}
                  </span>
                )}

                {item.badge && !item.badgeText && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-[#22D3EE] uppercase font-bold tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Actions Section */}
      <div className="p-3 border-t border-white/10 space-y-3 bg-[#070B17]/60">
        {/* Quick Demo Student Pill */}
        <div
          onClick={() => onNavigate('profile')}
          className="p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-9 h-9 rounded-xl object-cover border border-white/10"
            />
            <div className="text-left">
              <span className="text-xs font-bold text-white group-hover:text-[#22D3EE] transition-colors block leading-tight">
                {student.name}
              </span>
              <span className="text-[10px] text-[#A7B0C0] block">{student.category}</span>
            </div>
          </div>

          <ScoreRing score={student.profileCompleteness} size={34} strokeWidth={3.5} showPercent={false} />
        </div>

        {/* Action Buttons: Reset & Landing Page */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={onResetData}
            title="Reset to default demo data"
            className="flex-1 py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-[#A7B0C0] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={onOpenLanding}
            title="View Landing Page"
            className="py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-[#22D3EE] flex items-center justify-center gap-1 transition-colors"
          >
            <ExternalLink size={12} />
            <span>Landing</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
