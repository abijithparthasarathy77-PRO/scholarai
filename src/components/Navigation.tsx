import React, { useState } from 'react';
import { UserRole, NotificationItem, User, ThemeMode } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { 
  Sparkles, 
  Bell, 
  RotateCcw, 
  Shield, 
  GraduationCap, 
  Check, 
  ExternalLink, 
  ChevronDown, 
  Clock, 
  Compass, 
  LayoutDashboard, 
  Calendar, 
  Layers, 
  UserCheck 
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
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'applications', label: 'Applications', icon: Layers },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile & Docs', icon: UserCheck },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
      currentTheme === 'midnight'
        ? 'bg-slate-950/85 border-slate-800/80 text-white shadow-lg shadow-black/20'
        : 'bg-white/80 border-slate-200/80 text-slate-900 shadow-2xs'
    }`}>
      {/* Top Utility / Demo Notice Bar */}
      <div className="bg-slate-950/90 text-slate-300 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-semibold text-[10px] border border-indigo-500/30">
            DEMO MODE
          </span>
          <span className="hidden sm:inline text-slate-400">
            Pre-loaded student: <strong className="text-white">Aarav Sharma</strong> (2nd Year B.Com Hons, St. Xavier's Mumbai)
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Theme Palette Switcher */}
          <ThemeSwitcher 
            currentTheme={currentTheme} 
            onSelectTheme={onSelectTheme} 
            compact 
          />

          <span className="text-slate-700 hidden sm:inline">•</span>

          <button
            onClick={onResetDemo}
            className="hover:text-white text-slate-400 hidden sm:flex items-center space-x-1 transition-colors"
            title="Reset database to initial demo state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">•</span>

          {/* Quick Role Toggle */}
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 hidden sm:inline">View as:</span>
            <button
              onClick={() => onToggleRole(currentRole === 'student' ? 'admin' : 'student')}
              className={`px-2 py-0.5 rounded font-bold transition-all text-[10px] ${
                currentRole === 'admin'
                  ? 'bg-purple-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {currentRole === 'admin' ? '🛡️ Admin' : '🎓 Student'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onSelectTab(currentRole === 'admin' ? 'admin' : 'dashboard')}
              className="flex items-center space-x-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-xs group-hover:shadow-indigo-500/20 transition-all">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-lg font-black tracking-tight font-sans ${
                  currentTheme === 'midnight' ? 'text-white' : 'text-slate-950'
                }`}>
                  SCHOLAR<span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-slate-400 -mt-1 tracking-tight">
                  Find the funding you're eligible for.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-600 font-bold border border-indigo-500/20 shadow-2xs'
                      : currentTheme === 'midnight'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin Console Tab */}
            <button
              onClick={() => onSelectTab('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                currentTab === 'admin'
                  ? 'bg-purple-50 text-purple-700 shadow-2xs font-bold'
                  : 'text-purple-700 hover:bg-purple-50/70'
              }`}
            >
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Admin Console</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2.5">
            {/* ScholarAI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-indigo-500/25 transition-all group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>AI Advisor</span>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                        {unreadCount} unread
                      </span>
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onMarkNotificationRead(n.id);
                          if (n.action_link) {
                            const tab = n.action_link.replace('/', '');
                            onSelectTab(tab || 'dashboard');
                            setShowNotifications(false);
                          }
                        }}
                        className={`py-3 px-2 rounded-lg cursor-pointer transition-colors text-xs ${
                          n.read ? 'opacity-70 hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/70 font-medium'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-semibold text-slate-900 text-xs">{n.title}</h5>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1"></span>}
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">{n.message}</p>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar, Role Tag & Sign Out */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-xl object-cover border border-slate-200"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 capitalize">{currentUser.role} View</div>
              </div>

              {/* Sign Out Button */}
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                  title="Sign out of account"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
