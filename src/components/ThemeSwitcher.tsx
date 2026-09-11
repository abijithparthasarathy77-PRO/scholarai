import React, { useState, useRef, useEffect } from 'react';
import { ThemeMode } from '../types';
import { Palette, Sparkles, Moon, Sun, Flame, Droplets, Check } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  compact?: boolean;
}

interface ThemeOption {
  id: ThemeMode;
  name: string;
  badge: string;
  description: string;
  colors: [string, string, string];
  icon: React.ElementType;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'aurora',
    name: 'Radiant Aurora',
    badge: 'Popular',
    description: 'Luminous light mesh with electric violet, indigo & cyan glow',
    colors: ['#6366f1', '#a855f7', '#06b6d4'],
    icon: Sparkles,
  },
  {
    id: 'midnight',
    name: 'Midnight Cyber',
    badge: 'Dark Luxe',
    description: 'Deep obsidian dark mode with futuristic neon accents',
    colors: ['#090d16', '#a855f7', '#38bdf8'],
    icon: Moon,
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    badge: 'Warm',
    description: 'Golden peach, rose & amber energetic ambient lighting',
    colors: ['#f43f5e', '#fb923c', '#f59e0b'],
    icon: Flame,
  },
  {
    id: 'emerald',
    name: 'Emerald Oceanic',
    badge: 'Fresh',
    description: 'Vibrant oceanic mint, turquoise & emerald intellect',
    colors: ['#10b981', '#06b6d4', '#047857'],
    icon: Droplets,
  },
];

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onSelectTheme,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTheme = THEMES.find(t => t.id === currentTheme) || THEMES[0];
  const ActiveIcon = activeTheme.icon;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change dynamic background aesthetic"
        className={`group relative inline-flex items-center space-x-2 rounded-xl transition-all duration-300 border ${
          currentTheme === 'midnight'
            ? 'bg-slate-900/90 text-slate-200 border-slate-700/80 hover:border-indigo-500/60 shadow-lg shadow-black/40'
            : 'bg-white/90 text-slate-800 border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md'
        } ${compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs font-semibold'}`}
      >
        {/* Swatch Pill with mini animated gradient glow */}
        <span className="flex items-center -space-x-1 shrink-0">
          {activeTheme.colors.map((c, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-full ring-1 ring-white/50 animate-pulse"
              style={{ 
                backgroundColor: c, 
                animationDelay: `${idx * 0.3}s`,
                animationDuration: '2.5s' 
              }}
            />
          ))}
        </span>

        <span className="font-bold flex items-center space-x-1">
          <ActiveIcon className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
          <span className="hidden sm:inline">{activeTheme.name}</span>
          <span className="sm:hidden">Theme</span>
        </span>

        <Palette className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div 
          className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl shadow-2xl border p-2 z-50 animate-scaleIn backdrop-blur-2xl ${
            currentTheme === 'midnight'
              ? 'bg-slate-950/95 border-slate-800 text-slate-100 divide-slate-800'
              : 'bg-white/95 border-slate-200/90 text-slate-900 divide-slate-100'
          }`}
        >
          <div className="px-3 py-2 border-b border-inherit/40 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-bounce" />
              <span className="text-xs font-black uppercase tracking-wider text-inherit">
                Live Animated Background
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
              4 Palettes
            </span>
          </div>

          <div className="p-1 space-y-1 mt-1">
            {THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme;
              const Icon = theme.icon;

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? currentTheme === 'midnight'
                        ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                        : 'bg-indigo-50/80 border border-indigo-200 text-indigo-950'
                      : currentTheme === 'midnight'
                        ? 'hover:bg-slate-900/80 text-slate-300 hover:text-white'
                        : 'hover:bg-slate-100/70 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ring-1 ring-black/10 group-hover:scale-105 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                        color: '#fff'
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-inherit leading-none">
                          {theme.name}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                          isSelected 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-500/10 text-slate-500'
                        }`}>
                          {theme.badge}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-70 mt-1 leading-snug">
                        {theme.description}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-2 mt-1 border-t border-inherit/40 text-[10px] text-slate-500 flex items-center justify-between">
            <span>✨ Real-time physics & ambient glow</span>
            <span className="font-semibold text-indigo-600">Auto-saved</span>
          </div>
        </div>
      )}
    </div>
  );
};
