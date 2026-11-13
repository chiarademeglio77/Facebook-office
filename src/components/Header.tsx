import React, { useState } from 'react';
import { HUDDLE_ASSETS } from '../data/huddleData';
import { HuddleTab } from '../types/huddle';

interface HeaderProps {
  activeTab: HuddleTab;
  onTabChange: (tab: HuddleTab) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export default function Header({
  activeTab,
  onTabChange,
  onOpenNotifications,
  unreadNotificationsCount = 2,
}: HeaderProps) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'office-map':
        return 'Office Map';
      case 'company-feed':
        return 'Company Feed';
      case 'dream-ai':
        return 'Dream AI';
      case 'my-profile':
      default:
        return 'My Profile';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#c7c4d8]/40">
      <div className="h-16 px-4 flex items-center justify-between max-w-2xl mx-auto">
        {/* Logo and Context */}
        <div className="flex items-center gap-2">
          <img
            alt="Huddle App Logo"
            className="h-8 w-auto object-contain"
            src={HUDDLE_ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl text-[#131b2e] tracking-tight leading-none">
                Huddle
              </span>
              <span className="text-[10px] text-[#464555] font-semibold uppercase tracking-wider">
                {getTabLabel()}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#006e4b] animate-pulse"></span>
              <span className="text-[10px] text-[#464555] font-medium">
                Floor 3 · 42 Teammates In
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          {/* Notifications Button */}
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#e2e7ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[#464555] text-[22px]">
              notifications
            </span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#dc2c4f]"></span>
            )}
          </button>

          {/* User Profile Avatar Quick Jump */}
          <button
            aria-label="User Profile"
            onClick={() => onTabChange('my-profile')}
            className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${
              activeTab === 'my-profile'
                ? 'ring-2 ring-[#3525cd] scale-105'
                : 'hover:opacity-90'
            }`}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6ffbbe]"
              src={HUDDLE_ASSETS.userProfile}
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
