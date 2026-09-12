import React, { useState } from 'react';
import { Scholarship } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { UrgencyBadge, PriorityBadge } from '../ui/Badge';
import {
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface DeadlineCenterProps {
  scholarships: Scholarship[];
  onViewDossier: (scholarship: Scholarship) => void;
  onNavigateStrategy: () => void;
}

export const DeadlineCenter: React.FC<DeadlineCenterProps> = ({
  scholarships,
  onViewDossier,
  onNavigateStrategy
}) => {
  const [viewMode, setViewMode] = useState<'triage' | 'calendar'>('triage');
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 8, 1)); // September 2026

  // Triage buckets
  const critical = scholarships.filter((s) => s.daysLeft <= 3);
  const urgent = scholarships.filter((s) => s.daysLeft > 3 && s.daysLeft <= 7);
  const upcoming = scholarships.filter((s) => s.daysLeft > 7);

  // Calendar generation helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getScholarshipsForDay = (day: number) => {
    const targetDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scholarships.filter((s) => s.deadline === targetDateStr);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-elevated border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={18} className="text-[#FB7185]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              DEADLINE COMMAND CENTER
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A7B0C0]">
            Time-critical application tracker designed to prevent missed deadlines and prioritize imminent submissions
          </p>
        </div>

        {/* View switcher buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('triage')}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors ${
              viewMode === 'triage'
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'text-[#A7B0C0] hover:text-white'
            }`}
          >
            Triage Command
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors ${
              viewMode === 'calendar'
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'text-[#A7B0C0] hover:text-white'
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* TRIAGE VIEW: CRITICAL, URGENT, UPCOMING */}
      {viewMode === 'triage' && (
        <div className="space-y-6">
          {/* 1. CRITICAL (< 3 Days) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185] animate-ping" />
                <h3 className="text-sm font-display font-extrabold uppercase tracking-wider text-[#FB7185]">
                  CRITICAL DEADLINES (&lt; 3 DAYS / 72 HOURS)
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FB7185]/20 text-[#FB7185] font-mono font-bold">
                  {critical.length}
                </span>
              </div>
              <span className="text-xs text-[#A7B0C0]">Immediate action required</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {critical.map((sch) => (
                <div
                  key={sch.id}
                  className="p-5 rounded-3xl bg-gradient-to-br from-[#1B2642] to-[#0B1020] border-2 border-[#FB7185]/50 shadow-[0_0_24px_rgba(251,113,133,0.2)] space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#FB7185] text-white text-[11px] font-extrabold uppercase tracking-wider animate-pulse">
                      CLOSES IN 48 HOURS
                    </span>
                    <span className="text-sm font-bold text-white flex items-center gap-1">
                      <IndianRupee size={14} className="text-[#22D3EE]" />
                      <span>₹{sch.fundingAmount.toLocaleString('en-IN')}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-white">{sch.name}</h4>
                  <span className="text-xs text-[#A7B0C0] block">{sch.provider}</span>

                  <div className="flex items-center gap-3 text-xs bg-black/40 p-2 rounded-xl">
                    <span className="text-[#A7B0C0]">Match: <strong className="text-[#34D399]">{sch.matchScore}%</strong></span>
                    <span>•</span>
                    <span className="text-[#A7B0C0]">Readiness: <strong className="text-[#22D3EE]">{sch.readinessScore}%</strong></span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FB7185]/10 border border-[#FB7185]/30 text-xs text-white">
                    <span className="text-[10px] text-[#FB7185] uppercase font-bold block">Next Action:</span>
                    <span className="font-semibold">{sch.nextAction}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewDossier(sch)}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white text-xs font-bold hover:opacity-95 transition-opacity"
                    >
                      Open Application Dossier
                    </button>
                    <button
                      onClick={onNavigateStrategy}
                      className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white"
                    >
                      View Strategy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. URGENT (3 - 7 Days) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
              <h3 className="text-sm font-display font-extrabold uppercase tracking-wider text-[#FBBF24]">
                URGENT DEADLINES (3 - 7 DAYS)
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FBBF24]/20 text-[#FBBF24] font-mono font-bold">
                {urgent.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgent.map((sch) => (
                <div
                  key={sch.id}
                  className="p-5 rounded-3xl glass-card border border-[#FBBF24]/40 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/40 text-xs font-bold">
                      {sch.daysLeft} DAYS REMAINING
                    </span>
                    <span className="text-xs font-bold text-white">
                      ₹{sch.fundingAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="text-sm font-display font-bold text-white">{sch.name}</h4>
                  <span className="text-xs text-[#A7B0C0] block">{sch.provider}</span>

                  <p className="text-xs text-[#F8FAFC] bg-white/5 p-2 rounded-xl">
                    <strong className="text-[#FBBF24]">Next Action:</strong> {sch.nextAction}
                  </p>

                  <button
                    onClick={() => onViewDossier(sch)}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    View Dossier
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. UPCOMING (7+ Days) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" />
              <h3 className="text-sm font-display font-extrabold uppercase tracking-wider text-[#22D3EE]">
                UPCOMING DEADLINES (7+ DAYS)
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] font-mono font-bold">
                {upcoming.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcoming.map((sch) => (
                <div
                  key={sch.id}
                  className="p-4 rounded-2xl glass-card border border-white/10 space-y-2 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#22D3EE] font-medium">{sch.daysLeft} days left</span>
                    <span className="text-white font-bold">₹{sch.fundingAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <h5 className="text-xs font-bold text-white line-clamp-1">{sch.name}</h5>
                  <span className="text-[11px] text-[#A7B0C0] block">{sch.provider}</span>

                  <button
                    onClick={() => onViewDossier(sch)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#22D3EE] font-medium transition-colors mt-2"
                  >
                    Review Schedule
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <CalendarIcon size={18} className="text-[#8B5CF6]" />
              <h3 className="text-base font-display font-bold text-white">
                {currentMonthDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A7B0C0] hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A7B0C0] hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
              <div key={weekday} className="p-2 text-[11px] font-bold text-[#64748B] uppercase">
                {weekday}
              </div>
            ))}

            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-24 p-2 rounded-xl bg-white/[0.01]" />;
              }

              const dayScholarships = getScholarshipsForDay(day);
              const isToday = day === 12 && month === 8 && year === 2026; // Current local time: 12 Sep 2026

              return (
                <div
                  key={`day-${day}`}
                  className={`h-24 p-2 rounded-xl border flex flex-col justify-between text-left transition-colors ${
                    isToday
                      ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/50 shadow-sm'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`font-bold ${isToday ? 'text-[#22D3EE]' : 'text-[#A7B0C0]'}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] px-1 rounded bg-[#8B5CF6] text-white uppercase font-extrabold">
                        Today
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-y-auto max-h-14">
                    {dayScholarships.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => onViewDossier(s)}
                        className={`text-[9px] p-1 rounded font-semibold cursor-pointer truncate transition-opacity hover:opacity-90 ${
                          s.urgency === 'CRITICAL'
                            ? 'bg-[#FB7185] text-white shadow-sm'
                            : s.urgency === 'URGENT'
                            ? 'bg-[#FBBF24] text-black font-bold'
                            : 'bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/40'
                        }`}
                        title={s.name}
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A7B0C0]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]" />
                <span>Critical (&lt; 3d)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
                <span>Urgent (3 - 7d)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" />
                <span>Upcoming (7+d)</span>
              </span>
            </div>

            <span className="italic text-[11px]">
              Direct internal scholarship deadline scheduler • No external calendar integrations claimed.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
