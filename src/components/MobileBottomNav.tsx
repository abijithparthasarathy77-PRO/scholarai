import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Layers, 
  Sparkles, 
  UserCheck, 
  Shield, 
  BookOpen, 
  Sliders, 
  FileQuestion 
} from 'lucide-react';
import { UserRole } from '../types';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAdvisor: () => void;
  currentRole: UserRole;
  adminSubTab?: 'overview' | 'scholarships' | 'rules' | 'reviews';
  onSelectAdminSubTab?: (tab: 'overview' | 'scholarships' | 'rules' | 'reviews') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenAdvisor,
  currentRole,
  adminSubTab = 'overview',
  onSelectAdminSubTab,
}) => {
  const adminItems = [
    { id: 'admin_overview', sub: 'overview' as const, label: 'Overview', icon: Shield },
    { id: 'admin_scholarships', sub: 'scholarships' as const, label: 'Catalog', icon: BookOpen },
    { id: 'admin_rules', sub: 'rules' as const, label: 'Rules', icon: Sliders },
    { id: 'admin_reviews', sub: 'reviews' as const, label: 'Appeals', icon: FileQuestion },
  ];

  const studentItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'applications', label: 'Apps', icon: Layers },
    { id: 'advisor', label: 'Advisor', icon: Sparkles, isAction: true },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const isCurrentActive = (item: any) => {
    if (currentRole === 'admin') {
      return currentTab === 'admin' && adminSubTab === item.sub;
    }
    return currentTab === item.id;
  };

  const handleItemClick = (item: any) => {
    if (currentRole === 'admin') {
      onSelectAdminSubTab?.(item.sub);
      onSelectTab('admin');
    } else {
      onSelectTab(item.id);
    }
  };

  const items = currentRole === 'admin' ? adminItems : studentItems;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = isCurrentActive(item);

          if ('isAction' in item && item.isAction) {
            return (
              <button
                key={item.id}
                onClick={onOpenAdvisor}
                className="flex flex-col items-center justify-center p-1 text-indigo-600 group cursor-pointer"
              >
                <div className="p-1 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-[10px] font-bold text-indigo-600 mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer ${
                isActive 
                  ? (currentRole === 'admin' ? 'text-purple-600 font-bold' : 'text-indigo-600 font-bold') 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                isActive 
                  ? (currentRole === 'admin' ? 'text-purple-600' : 'text-indigo-600') 
                  : 'text-slate-400'
              }`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
