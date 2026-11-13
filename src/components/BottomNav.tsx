import React from 'react';
import { HuddleTab } from '../types/huddle';

interface BottomNavProps {
  activeTab: HuddleTab;
  onTabChange: (tab: HuddleTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: HuddleTab; label: string; icon: string; badge?: string }[] = [
    { id: 'office-map', label: 'Map', icon: 'map' },
    { id: 'company-feed', label: 'Feed', icon: 'forum' },
    { id: 'dream-ai', label: 'Dream AI', icon: 'auto_awesome', badge: 'AI' },
    { id: 'my-profile', label: 'Profile', icon: 'badge' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-[#c7c4d8]/40">
      <div className="flex items-center justify-around h-16 px-2 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
                isActive
                  ? 'text-[#3525cd] font-bold'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? 'fill-1' : ''
                  }`}
                >
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-[#3525cd] text-white font-bold text-[8px] leading-tight shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] leading-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
