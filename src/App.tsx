/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProfileScreen from './components/ProfileScreen';
import FeedScreen from './components/FeedScreen';
import DreamAiScreen from './components/DreamAiScreen';
import MapScreen from './components/MapScreen';
import GiveKudosModal from './components/modals/GiveKudosModal';
import ChatModal from './components/modals/ChatModal';
import CoffeeModal from './components/modals/CoffeeModal';
import NotificationsDrawer from './components/modals/NotificationsDrawer';
import { HuddleTab } from './types/huddle';

export default function App() {
  const [activeTab, setActiveTab] = useState<HuddleTab>('company-feed');
  const [dreamRemixPrompt, setDreamRemixPrompt] = useState<string>(
    'Parisian Chocolatier and artisan pastry chef in a cobblestone Marais atelier, warm copper pots, dusted cocoa, artisanal aprons'
  );

  // Modals state
  const [isKudosModalOpen, setIsKudosModalOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState<string | null>(null);
  const [coffeePartner, setCoffeePartner] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimeoutId, setToastTimeoutId] = useState<number | null>(null);

  const showToast = (message: string) => {
    if (toastTimeoutId) {
      window.clearTimeout(toastTimeoutId);
    }
    setToastMessage(message);
    const id = window.setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    setToastTimeoutId(id);
  };

  const handleRemixPrompt = (promptText: string) => {
    setDreamRemixPrompt(promptText);
    setActiveTab('dream-ai');
    showToast('✨ Loaded prompt into Dream Persona Studio!');
  };

  const handleOpenChat = (teammateName: string) => {
    setChatPartner(teammateName);
  };

  const handleOpenCoffee = (teammateName: string) => {
    setCoffeePartner(teammateName);
  };

  const handleSendKudos = (kudosData: {
    recipientId: string;
    badgeName: string;
    badgeIcon: string;
    note: string;
  }) => {
    showToast(`🌟 Awarded ${kudosData.badgeName} with your custom note!`);
  };

  const handlePublishPersona = (personaData: any) => {
    showToast('🎉 Dream Persona published to Company Feed and Maya’s Badge Wall!');
    setTimeout(() => {
      setActiveTab('company-feed');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f2f3ff]/60 flex justify-center">
      {/* Centered Device / App Canvas */}
      <div className="w-full max-w-lg min-h-screen bg-[#faf8ff] flex flex-col relative shadow-[0_0_50px_rgba(19,27,46,0.06)] border-x border-[#c7c4d8]/30">
        {/* Top Fixed Header */}
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={unreadNotifications}
        />

        {/* Main Content Area */}
        <main className="flex-1 pt-16 pb-20">
          {activeTab === 'company-feed' && (
            <FeedScreen
              onNavigateToTab={setActiveTab}
              onOpenGiveKudos={() => setIsKudosModalOpen(true)}
              onRemixPrompt={handleRemixPrompt}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'my-profile' && (
            <ProfileScreen
              onNavigateToTab={setActiveTab}
              onOpenChat={handleOpenChat}
              onOpenCoffee={handleOpenCoffee}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'dream-ai' && (
            <DreamAiScreen
              initialPrompt={dreamRemixPrompt}
              onPublishPersona={handlePublishPersona}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'office-map' && (
            <MapScreen
              onNavigateToTab={setActiveTab}
              onOpenChat={handleOpenChat}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#131b2e] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce-short border border-white/10 max-w-[90vw] truncate">
            <span className="material-symbols-outlined text-[18px] text-[#6ffbbe]">
              info
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modals and Drawers */}
        <GiveKudosModal
          isOpen={isKudosModalOpen}
          onClose={() => setIsKudosModalOpen(false)}
          onSendKudos={handleSendKudos}
        />

        <ChatModal
          isOpen={!!chatPartner}
          onClose={() => setChatPartner(null)}
          teammateName={chatPartner || 'Maya Lin'}
          onShowToast={showToast}
        />

        <CoffeeModal
          isOpen={!!coffeePartner}
          onClose={() => setCoffeePartner(null)}
          teammateName={coffeePartner || 'Maya Lin'}
          onShowToast={showToast}
        />

        <NotificationsDrawer
          isOpen={isNotificationsOpen}
          onClose={() => {
            setIsNotificationsOpen(false);
            setUnreadNotifications(0);
          }}
          onNavigateToTab={setActiveTab}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}
