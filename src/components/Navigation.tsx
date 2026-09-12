import React, { useState, useEffect } from 'react';
import { UserRole, NotificationItem, User, ThemeMode } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { 
  Sparkles, 
  Bell, 
  RotateCcw, 
  Shield, 
  Compass, 
  LayoutDashboard, 
  Calendar, 
  Layers, 
  UserCheck, 
  X, 
  ArrowRight, 
  LogOut,
  Search,
  Command,
  ChevronRight,
  BookOpen,
  Sliders,
  FileQuestion
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentRole: UserRole;
  onToggleRole: (role: UserRole) => void;
  currentUser: User;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onOpenAdvisor: () => void;
  onResetDemo: () => void;
  onSignOut?: () => void;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  onOpenCommandPalette?: () => void;
  adminSubTab?: 'overview' | 'scholarships' | 'rules' | 'reviews';
  onSelectAdminSubTab?: (tab: 'overview' | 'scholarships' | 'rules' | 'reviews') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  currentRole,
  onToggleRole,
  currentUser,
  notifications,
  onMarkNotificationRead,
  onOpenAdvisor,
  onResetDemo,
  onSignOut,
  currentTheme,
  onSelectTheme,
  onOpenCommandPalette,
  adminSubTab = 'overview',
  onSelectAdminSubTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Keyboard shortcut to close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setShowNotifications(false);
      }
    };
    if (isOpen || showNotifications) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showNotifications]);

  // Completely separate Navigation Modules for Admin vs Student
  const adminNavItems = [
    { 
      id: 'admin_overview', 
      label: 'Institutional Overview', 
      subtitle: 'Key Metrics & Evaluator Duty Bar',
      icon: Shield 
    },
    { 
      id: 'admin_scholarships', 
      label: 'Scholarship Catalog', 
      subtitle: 'Scheme Registry & Gazette Audit',
      icon: BookOpen 
    },
    { 
      id: 'admin_rules', 
      label: 'Eligibility Rule Builder', 
      subtitle: 'AST Eligibility Logic & Formulas',
      icon: Sliders 
    },
    { 
      id: 'admin_reviews', 
      label: 'Manual Appeals Queue', 
      subtitle: 'Student Audit Reviews & Actions',
      icon: FileQuestion 
    },
    { 
      id: 'landing', 
      label: 'Public Home Page', 
      subtitle: 'Public Portal & Features',
      icon: Sparkles 
    },
  ];

  const studentNavItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      subtitle: 'Overview & 5D Matrix',
      icon: LayoutDashboard 
    },
    { 
      id: 'discover', 
      label: 'Discover Schemes', 
      subtitle: '28 Matched Opportunities',
      icon: Compass 
    },
    { 
      id: 'applications', 
      label: 'Pipeline Tracker', 
      subtitle: 'Kanban Stages & Progress',
      icon: Layers 
    },
    { 
      id: 'calendar', 
      label: 'Deadlines Calendar', 
      subtitle: 'Upcoming Closing Dates',
      icon: Calendar 
    },
    { 
      id: 'profile', 
      label: 'Profile & Documents', 
      subtitle: 'Academic & Verification Status',
      icon: UserCheck 
    },
    { 
      id: 'landing', 
      label: 'Home Page', 
      subtitle: 'Public Portal & Features',
      icon: Sparkles 
    },
  ];

  const navItems = currentRole === 'admin' ? adminNavItems : studentNavItems;

  const currentTabLabel = currentRole === 'admin'
    ? (
        adminSubTab === 'overview' ? 'Institutional Overview' :
        adminSubTab === 'scholarships' ? 'Scholarship Catalog' :
        adminSubTab === 'rules' ? 'Rule Builder' :
        adminSubTab === 'reviews' ? 'Manual Appeals' :
        currentTab === 'landing' ? 'Public Home Page' : 'Institutional Admin Suite'
      )
    : (navItems.find(i => i.id === currentTab)?.label || 'Dashboard');

  const handleTabClick = (tabId: string) => {
    if (tabId.startsWith('admin_')) {
      const sub = tabId.replace('admin_', '') as 'overview' | 'scholarships' | 'rules' | 'reviews';
      onSelectAdminSubTab?.(sub);
      onSelectTab('admin');
    } else {
      onSelectTab(tabId);
    }
    setIsOpen(false);
  };

  const handleAdvisorClick = () => {
    onOpenAdvisor();
    setIsOpen(false);
  };

  return (
    <>
      {/* EXECUTIVE FLOATING GLASS NAVIGATION BAR */}
      <header className="fixed top-3 inset-x-3 sm:inset-x-6 max-w-7xl mx-auto z-40 pointer-events-none">
        <div className={`h-14 rounded-2xl border shadow-lg backdrop-blur-2xl px-3 sm:px-4 flex items-center justify-between pointer-events-auto transition-colors duration-300 ${
          currentTheme === 'midnight'
            ? 'bg-slate-950/85 border-slate-800/90 text-white shadow-black/40'
            : 'bg-white/85 border-white/90 text-slate-900 shadow-indigo-500/10'
        }`}>
          
          {/* Left: 3-Line Box Trigger & Brand Medallion */}
          <div className="flex items-center space-x-3">
            {/* 3-Line Small Box (Expands navigation on touch/click) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-300 group cursor-pointer hover:scale-105 active:scale-95 border relative ${
                isOpen
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-indigo-500/25'
                  : currentTheme === 'midnight'
                    ? 'bg-slate-900/90 border-slate-700/80 text-white hover:border-indigo-500/50 hover:bg-slate-800'
                    : 'bg-slate-100/90 border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-white'
              }`}
              title={isOpen ? 'Close Navigation Menu (Esc)' : 'Open All Platform Modules'}
              aria-label="Toggle navigation menu"
            >
              {/* Animated 3 Lines */}
              <div className="w-4 h-3 flex flex-col justify-between items-center pointer-events-none">
                <span 
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    isOpen 
                      ? 'w-4 rotate-45 translate-y-1 bg-white' 
                      : 'w-4 bg-current group-hover:bg-indigo-600'
                  }`} 
                />
                <span 
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    isOpen 
                      ? 'opacity-0 w-0' 
                      : 'w-3 self-start bg-current group-hover:bg-indigo-600'
                  }`} 
                />
                <span 
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    isOpen 
                      ? 'w-4 -rotate-45 -translate-y-1.5 bg-white' 
                      : 'w-4 bg-current group-hover:bg-indigo-600'
                  }`} 
                />
              </div>

              {/* Unread Pip */}
              {!isOpen && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600 border-2 border-white"></span>
                </span>
              )}
            </button>

            {/* Brand Title with 3D Sparkle */}
            <button 
              onClick={() => onSelectTab(currentRole === 'admin' ? 'admin' : 'dashboard')}
              className="flex items-center space-x-2 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-black tracking-tight font-sans block">
                  SCHOLAR<span className="text-indigo-600">AI</span>
                </span>
              </div>
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden md:flex items-center space-x-1.5 text-xs opacity-60 pl-2 border-l border-inherit/15">
              <span>{currentRole === 'admin' ? 'Institutional Admin' : 'Student Portal'}</span>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="font-bold text-inherit opacity-90">{currentTabLabel}</span>
            </div>
          </div>

          {/* Center: Command Palette Search Trigger */}
          <div className="flex-1 max-w-sm mx-4 hidden lg:block">
            <button
              onClick={onOpenCommandPalette}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-500/10 hover:bg-slate-500/15 border border-inherit/20 text-xs text-inherit flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2 opacity-60">
                <Search className="w-3.5 h-3.5" />
                <span>{currentRole === 'admin' ? 'Search schemes, rules, appeals...' : 'Search scholarships, rules, or modules...'}</span>
              </div>
              <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-500/15 border border-inherit/20 opacity-70">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Quick Tools & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search on mobile/tablet */}
            <button
              onClick={onOpenCommandPalette}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-500/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
              title="Quick Search (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Advisor Button - Student Only */}
            {currentRole === 'student' && (
              <button
                onClick={onOpenAdvisor}
                className="hidden sm:inline-flex items-center space-x-1.5 btn-animated-glow text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Advisor</span>
              </button>
            )}

            {/* Theme Palette Switcher */}
            <ThemeSwitcher 
              currentTheme={currentTheme} 
              onSelectTheme={onSelectTheme} 
              compact 
            />

            {/* User Role Badge (Only changed via Sign In) */}
            <span
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${
                currentRole === 'admin'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25'
              }`}
              title={currentRole === 'admin' ? 'Signed in as Administrator' : 'Signed in as Student'}
            >
              {currentRole === 'admin' ? '🛡️ Admin' : '🎓 Student'}
            </span>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl hover:bg-slate-500/10 transition-colors relative opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="Open notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 p-4 animate-scaleIn ${
                  currentTheme === 'midnight'
                    ? 'bg-slate-950/95 border-slate-800 text-slate-100 shadow-black/80'
                    : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-indigo-500/20'
                }`}>
                  <div className="flex items-center justify-between pb-3 border-b border-inherit/15">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold">Notifications</h4>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                        {unreadCount} unread
                      </span>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs opacity-60 hover:opacity-100"
                    >
                      Close
                    </button>
                  </div>

                  <div className="divide-y divide-inherit/10 max-h-60 overflow-y-auto mt-2 space-y-1">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onMarkNotificationRead(n.id);
                          if (n.action_link) {
                            const tab = n.action_link.replace('/', '');
                            handleTabClick(tab || 'dashboard');
                            setShowNotifications(false);
                          }
                        }}
                        className={`py-2.5 px-2.5 rounded-xl cursor-pointer transition-colors text-xs ${
                          n.read 
                            ? 'opacity-60 hover:bg-slate-500/5' 
                            : 'bg-indigo-500/10 font-medium'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-semibold text-xs">{n.title}</h5>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1"></span>}
                        </div>
                        <p className="opacity-75 text-[11px] mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center pl-1 sm:pl-2 border-l border-inherit/15">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border border-inherit/20"
              />
            </div>
          </div>

        </div>
      </header>

      {/* FULL EXPANDED COMMAND DECK (TRIGGERED BY 3-LINE BOX) */}
      {isOpen && (
        <>
          {/* Backdrop Dimmer */}
          <div 
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md transition-opacity animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Expanded Command Deck Container */}
          <div className="fixed top-0 inset-x-0 z-50 pt-20 p-3 sm:p-5 max-h-[96vh] overflow-y-auto pointer-events-auto">
            <div className={`max-w-5xl mx-auto rounded-3xl border shadow-2xl backdrop-blur-2xl p-5 sm:p-7 space-y-6 animate-nav-slide-down ${
              currentTheme === 'midnight'
                ? 'bg-slate-950/95 border-slate-800 text-slate-100 shadow-black/80'
                : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-indigo-500/20'
            }`}>
              
              {/* TOP HEADER ROW */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit/15">
                {/* Brand Logo & Tagline */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xl font-black tracking-tight font-sans block">
                      SCHOLAR<span className="text-indigo-600">AI</span>
                    </span>
                    <span className="text-[11px] font-semibold opacity-60 block -mt-1">
                      Explainable Scholarship Intelligence Suite
                    </span>
                  </div>
                </div>

                {/* Active User Status Badge & Close */}
                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono font-bold text-xs border ${
                    currentRole === 'admin'
                      ? 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/25'
                      : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/25'
                  }`}>
                    <span className={`w-2 h-2 rounded-full animate-ping ${currentRole === 'admin' ? 'bg-purple-500' : 'bg-indigo-500'}`}></span>
                    <span>{currentRole === 'admin' ? 'ADMIN: Dr. Meenakshi Sundaram' : 'DEMO: Aarav Sharma'}</span>
                  </span>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl border border-inherit/20 hover:bg-slate-500/10 transition-colors text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px] opacity-75">Esc</span>
                  </button>
                </div>
              </div>

              {/* NAVIGATION TABS GRID */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-60 px-1 block">
                  {currentRole === 'admin' ? 'Institutional Admin Modules' : 'Explore Platform Modules'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentRole === 'admin'
                      ? (
                          item.id === 'admin_overview' ? currentTab === 'admin' && adminSubTab === 'overview' :
                          item.id === 'admin_scholarships' ? currentTab === 'admin' && adminSubTab === 'scholarships' :
                          item.id === 'admin_rules' ? currentTab === 'admin' && adminSubTab === 'rules' :
                          item.id === 'admin_reviews' ? currentTab === 'admin' && adminSubTab === 'reviews' :
                          currentTab === item.id
                        )
                      : currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center space-x-3.5 group cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600/15 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                            : 'border-inherit/15 hover:border-indigo-400/40 hover:bg-slate-500/5 hover:translate-x-1'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-500/10 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-500/15'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-bold truncate ${
                            isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-inherit'
                          }`}>
                            {item.label}
                          </div>
                          <div className="text-[11px] opacity-60 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                        <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isActive ? 'opacity-100 text-indigo-600' : 'text-slate-400'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUICK CONTROLS & UTILITIES BAR */}
              <div className="pt-4 border-t border-inherit/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: AI Advisor (Student only) & Reset Demo */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* AI Advisor Button - Student Only */}
                  {currentRole === 'student' && (
                    <button
                      onClick={handleAdvisorClick}
                      className="btn-animated-glow text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Launch AI Advisor</span>
                    </button>
                  )}

                  {/* Reset Demo Button */}
                  <button
                    onClick={() => {
                      onResetDemo();
                      setIsOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl border border-inherit/20 hover:bg-slate-500/10 text-xs font-medium flex items-center space-x-1.5 opacity-75 hover:opacity-100 transition-colors cursor-pointer"
                    title="Reset database to initial state"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>
                </div>

                {/* Right: User Profile & Sign Out */}
                <div className="flex items-center space-x-3 self-end md:self-auto">
                  <div className="flex items-center space-x-2.5 pl-3 border-l border-inherit/20">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-xl object-cover border border-inherit/20"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold truncate max-w-[140px]">{currentUser.name}</div>
                      <div className="text-[10px] opacity-60 capitalize">{currentUser.role} View</div>
                    </div>

                    {onSignOut && (
                      <button
                        onClick={() => {
                          onSignOut();
                          setIsOpen(false);
                        }}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-500/10 transition-colors ml-1 cursor-pointer flex items-center space-x-1"
                        title="Sign Out of Session"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-xs font-semibold hidden sm:inline">Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};
