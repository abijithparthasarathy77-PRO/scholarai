import React from 'react';
import {
  LayoutDashboard,
  Search,
  Compass,
  Kanban,
  Bot
} from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'discover', label: 'Discover', icon: <Search size={18} /> },
    { id: 'strategy', label: 'Strategy', icon: <Compass size={18} /> },
    { id: 'pipeline', label: 'Pipeline', icon: <Kanban size={18} /> },
    { id: 'advisor', label: 'Advisor', icon: <Bot size={18} /> }
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-[#0B1020]/95 backdrop-blur-2xl border-t border-white/10 z-40 px-3 py-2 flex items-center justify-around">
      {items.map((item) => {
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              isActive ? 'text-[#22D3EE]' : 'text-[#A7B0C0] hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
