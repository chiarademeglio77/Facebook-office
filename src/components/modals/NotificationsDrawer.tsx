import React, { useState } from 'react';
import { HUDDLE_ASSETS } from '../../data/huddleData';
import { HuddleTab } from '../../types/huddle';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: HuddleTab) => void;
  onShowToast: (message: string) => void;
}

interface NotificationItem {
  id: string;
  type: 'dream' | 'kudos' | 'cafe' | 'event';
  title: string;
  subtitle: string;
  time: string;
  read: boolean;
  avatar?: string;
  badgeIcon?: string;
  badgeBg?: string;
  actionTab?: HuddleTab;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'dream',
    title: 'David Chen unlocked Master Chocolatier 🍫',
    subtitle: 'His alter ego just hit #1 trending on Floor 3 with 74% accuracy!',
    time: '45m ago',
    read: false,
    avatar: HUDDLE_ASSETS.davidHeadshot,
    badgeIcon: 'auto_awesome',
    badgeBg: 'bg-indigo-600',
    actionTab: 'company-feed',
  },
  {
    id: 'n2',
    type: 'kudos',
    title: 'Sarah Jenkins awarded Marcus Bell 🏆',
    subtitle: '"Hero of the production cluster recovery. Coffee on me all week!"',
    time: '1h ago',
    read: false,
    avatar: HUDDLE_ASSETS.sarahJenkins,
    badgeIcon: 'workspace_premium',
    badgeBg: 'bg-[#dc2c4f]',
    actionTab: 'company-feed',
  },
  {
    id: 'n3',
    type: 'cafe',
    title: 'Espresso Bar: Barista On Duty ☕',
    subtitle: 'Fresh Ethiopian single-origin roast is currently being served on Floor 3.',
    time: '2h ago',
    read: true,
    badgeIcon: 'local_cafe',
    badgeBg: 'bg-amber-600',
    actionTab: 'office-map',
  },
  {
    id: 'n4',
    type: 'event',
    title: 'Board Game Thursday @ 5:30 PM 🎲',
    subtitle: '32 teammates have RSVPed for craft beers & Catan in the 4th Floor Lounge.',
    time: '3h ago',
    read: true,
    avatar: HUDDLE_ASSETS.lucasMapPin,
    badgeIcon: 'celebration',
    badgeBg: 'bg-emerald-600',
    actionTab: 'company-feed',
  },
];

export default function NotificationsDrawer({
  isOpen,
  onClose,
  onNavigateToTab,
  onShowToast,
}: NotificationsDrawerProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onShowToast('✅ All notifications marked as read');
  };

  const handleNotificationClick = (n: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );
    if (n.actionTab) {
      onNavigateToTab(n.actionTab);
      onClose();
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-sm h-full bg-[#faf8ff] shadow-2xl border-l border-[#c7c4d8]/40 flex flex-col animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-white/80 backdrop-blur-md pt-safe">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#3525cd]">notifications</span>
            <h3 className="font-bold text-sm text-[#131b2e]">Floor 3 Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#dc2c4f] text-white text-[10px] font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/60 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 border-b border-[#c7c4d8]/20 bg-[#f2f3ff] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#464555]">Latest team pulses</span>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-bold text-[#3525cd] hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#c7c4d8]/20">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`w-full p-4 text-left transition-colors flex items-start gap-3 hover:bg-white cursor-pointer ${
                n.read ? 'bg-transparent' : 'bg-[#eef1ff]/60'
              }`}
            >
              {/* Avatar or Icon */}
              <div className="relative shrink-0">
                {n.avatar ? (
                  <img
                    src={n.avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${n.badgeBg}`}>
                    <span className="material-symbols-outlined text-[20px]">{n.badgeIcon}</span>
                  </div>
                )}
                {n.avatar && n.badgeIcon && (
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] ring-2 ring-white ${n.badgeBg}`}>
                    <span className="material-symbols-outlined text-[12px]">{n.badgeIcon}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h4 className={`text-xs leading-tight ${n.read ? 'text-[#131b2e] font-semibold' : 'text-[#131b2e] font-bold'}`}>
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-[#464555] shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-[#464555] mt-1 line-clamp-2 leading-relaxed">
                  {n.subtitle}
                </p>
                {!n.read && (
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd]" />
                    <span className="text-[10px] text-[#3525cd] font-semibold">Unread update</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#c7c4d8]/30 bg-white/80 text-center">
          <p className="text-[10px] text-[#464555]">
            Huddle Office Pulse · Connected to Floor 3 sensors & social hub
          </p>
        </div>
      </div>
    </div>
  );
}
