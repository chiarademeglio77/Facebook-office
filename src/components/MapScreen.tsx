import React, { useState } from 'react';
import { TEAMMATES, HUDDLE_ASSETS } from '../data/huddleData';
import { Teammate, HuddleTab } from '../types/huddle';

interface MapScreenProps {
  onNavigateToTab: (tab: HuddleTab) => void;
  onOpenChat: (teammateName: string) => void;
  onShowToast: (message: string) => void;
}

export default function MapScreen({
  onNavigateToTab,
  onOpenChat,
  onShowToast,
}: MapScreenProps) {
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate>(TEAMMATES[0]); // Maya Lin
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeFloor, setActiveFloor] = useState<string>('floor-3');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [showRoute, setShowRoute] = useState<boolean>(false);
  const [hasPinged, setHasPinged] = useState<boolean>(false);
  const [kudosCount, setKudosCount] = useState<number>(148);
  const [kudosBouncing, setKudosBouncing] = useState<boolean>(false);

  // Zoom controls
  const handleZoomIn = () => {
    setZoomScale((s) => Math.min(s + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomScale((s) => Math.max(s - 0.15, 0.9));
  };

  const handleRecenter = () => {
    setZoomScale(1);
    setSelectedTeammate(TEAMMATES[0]);
    onShowToast('📍 Centered on your desk (Desk 3B-14)');
  };

  const handleSelectTeammate = (t: Teammate) => {
    setSelectedTeammate(t);
    setKudosCount(t.kudosCount);
    setShowRoute(false);
  };

  const handleSayHi = () => {
    setHasPinged(true);
    onShowToast(`👋 You pinged ${selectedTeammate.name}!`);
    setTimeout(() => setHasPinged(false), 2200);
  };

  const handleToggleDirections = () => {
    setShowRoute(!showRoute);
    if (!showRoute) {
      onShowToast(`🚶 Walking route to ${selectedTeammate.name}'s desk displayed`);
    }
  };

  const handleQuickKudos = () => {
    setKudosCount((c) => c + 1);
    setKudosBouncing(true);
    onShowToast(`🌟 You sent kudos to ${selectedTeammate.name}!`);
    setTimeout(() => setKudosBouncing(false), 250);
  };

  return (
    <div className="flex flex-col w-full relative select-none pb-24 max-w-2xl mx-auto">
      
      {/* Search & Filter Controls Header */}
      <div className="px-4 pt-2 pb-2 flex flex-col gap-2 z-30">
        
        {/* Search Bar */}
        <div className="relative flex items-center w-full shadow-xs rounded-xl bg-white border border-[#c7c4d8]/40">
          <span className="material-symbols-outlined absolute left-3.5 text-[#464555] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teammate or desk (e.g. Maya, Pod 3B)..."
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-transparent text-xs text-[#131b2e] placeholder:text-[#777587] focus:outline-none"
          />
          {searchQuery && (
            <button
              aria-label="Clear Search"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 w-6 h-6 flex items-center justify-center rounded-full text-[#777587] hover:text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {[
            { id: 'all', label: 'All Pods', icon: 'groups' },
            { id: 'design', label: 'Design & UX', dot: 'bg-[#4f46e5]' },
            { id: 'frontend', label: 'Frontend Devs', dot: 'bg-[#006e4b]' },
            { id: 'growth', label: 'Growth Mktg', dot: 'bg-[#dc2c4f]' },
            { id: 'available', label: 'Available Desks (9)', icon: 'check_circle' },
            { id: 'quiet', label: 'Quiet Zone', icon: 'volume_off' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`filter-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap active:scale-95 transition-all ${
                activeFilter === pill.id
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#464555] hover:text-[#131b2e] border border-[#c7c4d8]/30'
              }`}
            >
              {pill.icon && (
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={activeFilter === pill.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {pill.icon}
                </span>
              )}
              {pill.dot && <span className={`w-2 h-2 rounded-full ${pill.dot}`}></span>}
              <span>{pill.label}</span>
            </button>
          ))}
        </div>

        {/* Floor Selector Switcher */}
        <div className="flex items-center justify-between gap-1 bg-[#f2f3ff] p-1 rounded-full shadow-inner border border-[#c7c4d8]/30">
          <button
            onClick={() => {
              setActiveFloor('floor-2');
              onShowToast('Floor 2: Engineering & Labs loaded');
            }}
            className={`flex-1 py-1.5 px-2 rounded-full text-center text-xs font-semibold transition-all ${
              activeFloor === 'floor-2'
                ? 'bg-white text-[#3525cd] shadow-xs font-bold'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            Floor 2
          </button>
          <button
            onClick={() => setActiveFloor('floor-3')}
            className={`flex-[1.6] py-1.5 px-3 rounded-full text-center text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all ${
              activeFloor === 'floor-3'
                ? 'bg-white text-[#3525cd]'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#006e4b] animate-ping"></span>
            Floor 3 (HQ)
          </button>
          <button
            onClick={() => {
              setActiveFloor('floor-4');
              onShowToast('Floor 4: Executive & Terrace loaded');
            }}
            className={`flex-1 py-1.5 px-2 rounded-full text-center text-xs font-semibold transition-all ${
              activeFloor === 'floor-4'
                ? 'bg-white text-[#3525cd] shadow-xs font-bold'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            Floor 4
          </button>
        </div>
      </div>

      {/* Interactive Map Stage Container */}
      <div className="relative w-full overflow-hidden bg-[#f2f3ff] px-4 py-2 flex flex-col items-center justify-center">
        
        {/* Live Floor Vitality Pill */}
        <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-[#c7c4d8]/40">
          <span className="material-symbols-outlined text-[16px] text-[#005338]">
            nest_multi_room
          </span>
          <span className="text-[11px] text-[#131b2e] font-bold">Floor 3 · West Wing</span>
          <span className="text-[10px] text-[#777587]">|</span>
          <span className="text-[11px] text-[#005338] font-bold">42 checked-in</span>
        </div>

        {/* Map Canvas (Architectural Floor Plan SVG Layout) */}
        <div
          id="map-viewport"
          style={{ transform: `scale(${zoomScale})` }}
          className="relative w-full max-w-[420px] aspect-4/5 bg-white rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 border border-[#c7c4d8]/50"
        >
          {/* Topographical Blueprint Grid Background */}
          <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dae2fd" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Architectural SVG Layout Elements */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Exterior Walls */}
            <rect
              x="12"
              y="12"
              width="376"
              height="476"
              rx="16"
              stroke="#c7c4d8"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* Apollo Room */}
            <rect x="24" y="24" width="105" height="74" rx="8" fill="#eaedff" stroke="#c7c4d8" strokeWidth="1.2" />
            <text x="32" y="44" fill="#131b2e" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700">Apollo (6p)</text>
            <rect x="32" y="52" width="48" height="16" rx="8" fill="#ba1a1a" fillOpacity="0.12" />
            <text x="38" y="63" fill="#ba1a1a" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="700">IN USE</text>

            {/* Bonsai Room */}
            <rect x="135" y="24" width="130" height="74" rx="8" fill="#eaedff" stroke="#c7c4d8" strokeWidth="1.2" />
            <text x="144" y="44" fill="#131b2e" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700">Bonsai Boardroom</text>
            <rect x="144" y="52" width="46" height="16" rx="8" fill="#006e4b" fillOpacity="0.12" />
            <text x="151" y="63" fill="#006e4b" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="700">FREE</text>

            {/* Phone Booths */}
            <rect x="271" y="24" width="48" height="35" rx="6" fill="#dae2fd" stroke="#c7c4d8" strokeWidth="1" />
            <text x="278" y="45" fill="#464555" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600">Booth 1</text>
            <rect x="325" y="24" width="48" height="35" rx="6" fill="#eaedff" stroke="#c7c4d8" strokeWidth="1" />
            <text x="332" y="45" fill="#006e4b" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600">Booth 2</text>

            {/* Zen Lounge */}
            <rect x="286" y="70" width="87" height="100" rx="10" fill="#f2f3ff" stroke="#c7c4d8" strokeWidth="1" />
            <text x="296" y="90" fill="#3525cd" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700">Zen Lounge</text>
            <rect x="296" y="102" width="67" height="24" rx="6" fill="#dae2fd" />
            <rect x="296" y="134" width="67" height="24" rx="6" fill="#dae2fd" />

            {/* Central Kitchenette & Coffee Bar */}
            <rect x="24" y="380" width="140" height="92" rx="12" fill="#eaedff" stroke="#c7c4d8" strokeWidth="1.2" />
            <text x="34" y="404" fill="#131b2e" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700">Espresso Bar</text>
            <rect x="34" y="416" width="120" height="42" rx="6" fill="#dae2fd" />
            <circle cx="56" cy="437" r="8" fill="#c3c0ff" />
            <circle cx="94" cy="437" r="8" fill="#c3c0ff" />
            <circle cx="132" cy="437" r="8" fill="#c3c0ff" />

            {/* Pod Zone A: Design & UX */}
            <rect x="26" y="120" width="240" height="105" rx="10" fill="#f2f3ff" />
            <text x="36" y="138" fill="#3525cd" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700">POD A · DESIGN & UX</text>
            <rect x="36" y="148" width="62" height="30" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="104" y="148" width="62" height="30" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="172" y="148" width="62" height="30" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="36" y="184" width="62" height="30" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="104" y="184" width="62" height="30" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="172" y="184" width="62" height="30" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />

            {/* Pod Zone B: Frontend Engineering */}
            <rect x="26" y="245" width="240" height="110" rx="10" fill="#f2f3ff" />
            <text x="36" y="263" fill="#005338" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700">POD B · FRONTEND ENG</text>
            <rect x="36" y="273" width="62" height="32" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="104" y="273" width="62" height="32" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="172" y="273" width="62" height="32" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="36" y="311" width="62" height="32" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="104" y="311" width="62" height="32" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="172" y="311" width="62" height="32" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />

            {/* Pod Zone C: Growth Marketing */}
            <rect x="180" y="380" width="195" height="92" rx="10" fill="#f2f3ff" />
            <text x="190" y="398" fill="#b90538" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="700">POD C · GROWTH & MARKETING</text>
            <rect x="190" y="410" width="52" height="26" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="248" y="410" width="52" height="26" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="306" y="410" width="52" height="26" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="190" y="440" width="52" height="26" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="248" y="440" width="52" height="26" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />
            <rect x="306" y="440" width="52" height="26" rx="4" fill="#ffffff" stroke="#c7c4d8" strokeWidth="0.8" />

            {/* Walking Path */}
            <path
              d="M 68 105 L 68 120 M 135 225 L 135 245 M 270 200 L 270 380"
              stroke="#c7c4d8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />

            {/* Live Walking Route (when Directions is enabled) */}
            {showRoute && (
              <path
                d="M 50 450 L 135 450 L 135 230 L 135 180"
                stroke="#3525cd"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Dynamic Interactive Teammate Pins Overlay */}
          {TEAMMATES.map((t) => {
            const isSelected = selectedTeammate.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleSelectTeammate(t)}
                className={`absolute cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-115 z-30' : 'hover:scale-110 z-20'
                }`}
                style={{
                  top: t.pinCoordinates.top,
                  left: t.pinCoordinates.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Glow on Selected */}
                  {isSelected && (
                    <>
                      <div className="absolute -inset-2.5 rounded-full bg-[#4f46e5] opacity-35 animate-ping"></div>
                      <div className="absolute -inset-1 rounded-full bg-[#3525cd] shadow-lg opacity-40"></div>
                    </>
                  )}
                  {/* Avatar Frame */}
                  <div
                    className={`relative w-9 h-9 rounded-full bg-white p-0.5 shadow-md ${
                      isSelected
                        ? 'ring-2 ring-[#3525cd]'
                        : t.status === 'focus'
                        ? 'ring-1.5 ring-[#dc2c4f]'
                        : 'ring-1.5 ring-[#006e4b]'
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                        t.status === 'focus'
                          ? 'bg-[#dc2c4f]'
                          : t.status === 'break'
                          ? 'bg-[#4f46e5]'
                          : 'bg-[#006e4b]'
                      }`}
                    ></span>
                  </div>

                  {/* Desk ID Flag Tag */}
                  {isSelected && (
                    <span className="absolute -bottom-4 px-1.5 py-0.5 rounded-full bg-[#3525cd] text-white text-[8px] font-bold shadow-xs whitespace-nowrap">
                      {t.desk}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Interactive Amenity Pin: Coffee Bar */}
          <div
            onClick={() => onShowToast('☕ Espresso Bar: Barista Elena on duty with oat cortados!')}
            className="absolute flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-xs cursor-pointer hover:bg-[#faf8ff] border border-[#c7c4d8]/40 z-20"
            style={{ top: '86%', left: '24%', transform: 'translate(-50%, -50%)' }}
          >
            <span className="material-symbols-outlined text-[#b90538] text-[16px]">local_cafe</span>
            <span className="text-[10px] text-[#131b2e] font-bold">Barista In</span>
          </div>

          {/* Interactive Amenity Pin: Bonsai Boardroom Free Status */}
          <div
            onClick={() => onShowToast('🌿 Bonsai Boardroom: Free until 3:00 PM (Seats 12)')}
            className="absolute flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-xs cursor-pointer hover:bg-[#faf8ff] border border-[#c7c4d8]/40 z-20"
            style={{ top: '8%', left: '52%', transform: 'translate(-50%, -50%)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#006e4b] animate-pulse"></span>
            <span className="text-[10px] text-[#131b2e] font-semibold">Bonsai · Open</span>
          </div>

          {/* Available Hot Desk Pin */}
          <div
            onClick={() => onShowToast('✨ Booked Hot Desk 3A-08 for your afternoon focus session!')}
            className="absolute cursor-pointer flex items-center justify-center w-6 h-6 rounded-full bg-[#6ffbbe] text-[#002113] shadow-xs hover:scale-110 transition-transform z-20"
            style={{ top: '36%', left: '51%', transform: 'translate(-50%, -50%)' }}
            title="Available Hot Desk 3A-08"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
          </div>
        </div>

        {/* Floating Zoom & Controls Toolbar */}
        <div className="absolute right-7 bottom-6 flex flex-col gap-2 z-20">
          <button
            aria-label="Zoom in"
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#131b2e] active:scale-95 transition-transform hover:bg-[#faf8ff] border border-[#c7c4d8]/30"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <button
            aria-label="Zoom out"
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#131b2e] active:scale-95 transition-transform hover:bg-[#faf8ff] border border-[#c7c4d8]/30"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <button
            aria-label="Center on my desk"
            onClick={handleRecenter}
            className="w-10 h-10 rounded-full bg-[#3525cd] text-white shadow-md flex items-center justify-center active:scale-95 transition-transform hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[20px]">my_location</span>
          </button>
        </div>

        {/* Legend Drawer Toggle */}
        <div className="absolute left-7 bottom-6 z-20">
          <button
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[#131b2e] hover:bg-[#faf8ff] text-xs font-semibold transition-all active:scale-95 border border-[#c7c4d8]/30"
          >
            <span className="material-symbols-outlined text-[18px] text-[#3525cd]">layers</span>
            <span>Legend</span>
          </button>
        </div>

        {/* Expandable Legend Flyout */}
        {isLegendOpen && (
          <div className="absolute left-6 bottom-18 z-30 p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg flex flex-col gap-2 min-w-[170px] border border-[#c7c4d8]/40 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-[10px] text-[#777587] uppercase tracking-wider font-bold">
              Map Status Key
            </div>
            <div className="flex items-center gap-2 text-xs text-[#131b2e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006e4b]"></span>
              <span>At Desk (Active)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#131b2e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2c4f]"></span>
              <span>In Meeting / Focus</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#131b2e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
              <span>Zen Lounge / Break</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#131b2e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6ffbbe] text-[#002113] flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span>Bookable Hot Desk</span>
            </div>
          </div>
        )}
      </div>

      {/* Teammate Quick-Peek Floating Drawer */}
      <div className="px-4 pt-2 pb-4 z-40">
        <div className="relative bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-[#c7c4d8]/40">
          {/* Drawer Grab Handle */}
          <div className="w-10 h-1 rounded-full bg-[#e2e7ff] mx-auto -mt-1"></div>

          {/* Main Profile Header Block */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar Frame */}
              <div className="relative w-14 h-14 rounded-full p-0.5 bg-white ring-2 ring-[#3525cd] shrink-0">
                <img
                  src={selectedTeammate.avatar}
                  alt={selectedTeammate.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#006e4b] border-2 border-white"></span>
              </div>

              {/* Name & Core Info */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-[#131b2e]">
                    {selectedTeammate.name}
                  </span>
                  <span
                    className="material-symbols-outlined text-[#3525cd] text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <span className="text-xs text-[#464555] font-medium">
                  {selectedTeammate.role} · {selectedTeammate.department}
                </span>

                {/* Live Desk Badge */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[15px] text-[#3525cd]">
                    pin_drop
                  </span>
                  <span className="text-xs text-[#3525cd] font-bold">
                    {selectedTeammate.desk} · Floor 3
                  </span>
                  <span className="text-[11px] text-[#777587]">· Near Bonsai Room</span>
                </div>
              </div>
            </div>

            {/* Micro-Kudos Quick Tap Button */}
            <button
              aria-label="Send Quick Kudos"
              onClick={handleQuickKudos}
              className={`flex flex-col items-center justify-center p-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#b90538] transition-all active:scale-90 border border-[#c7c4d8]/30 ${
                kudosBouncing ? 'scale-125 bg-[#ffdadb]' : ''
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
              <span className="text-[10px] font-bold mt-0.5 tabular-nums">{kudosCount}</span>
            </button>
          </div>

          {/* Status Bar Pill */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c7c4d8]/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006e4b] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#131b2e]">
                {selectedTeammate.statusText}
              </span>
            </div>
            <span className="text-[10px] text-[#777587] font-medium">Design Review Next</span>
          </div>

          {/* Dream AI Persona Vignette */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#e2dfff] text-[#0f0069] border border-[#c3c0ff]">
            <span className="text-xl">🧑‍🚀</span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#3323cc] font-extrabold">
                  Huddle Dream Persona
                </span>
                <span className="px-1.5 py-0.2 rounded bg-white text-[#3525cd] text-[9px] font-bold shadow-xs">
                  AI
                </span>
              </div>
              <span className="text-xs font-bold text-[#0f0069] truncate">
                {selectedTeammate.alterEgoRole || 'Deep Space Astrobiologist & Nebula Cartographer'}
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handleSayHi}
              className="flex items-center justify-center gap-1.5 h-11 px-2 rounded-xl bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] text-xs font-bold transition-all active:scale-95 border border-[#c7c4d8]/30"
            >
              <span className="material-symbols-outlined text-[18px] text-[#3525cd]">
                {hasPinged ? 'check' : 'chat_bubble'}
              </span>
              <span>{hasPinged ? 'Pinged!' : 'Say Hi'}</span>
            </button>

            <button
              onClick={handleToggleDirections}
              className={`flex items-center justify-center gap-1.5 h-11 px-2 rounded-xl text-xs font-bold transition-all active:scale-95 border border-[#c7c4d8]/30 ${
                showRoute ? 'bg-[#006e4b] text-white' : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  showRoute ? 'text-white' : 'text-[#005338]'
                }`}
              >
                near_me
              </span>
              <span>{showRoute ? 'Hide Route' : 'Directions'}</span>
            </button>

            <button
              onClick={() => onNavigateToTab('my-profile')}
              className="flex items-center justify-center gap-1.5 h-11 px-2 rounded-xl bg-[#3525cd] text-white hover:opacity-95 text-xs font-bold transition-all active:scale-95 shadow-xs"
            >
              <span>Profile</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
