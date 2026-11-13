import React, { useState } from 'react';
import { HUDDLE_ASSETS } from '../data/huddleData';
import { HuddleTab } from '../types/huddle';

interface ProfileScreenProps {
  onNavigateToTab: (tab: HuddleTab) => void;
  onOpenChat: (teammateName: string) => void;
  onOpenCoffee: (teammateName: string) => void;
  onShowToast: (message: string) => void;
}

export default function ProfileScreen({
  onNavigateToTab,
  onOpenChat,
  onOpenCoffee,
  onShowToast,
}: ProfileScreenProps) {
  const [persona, setPersona] = useState<'real' | 'alter'>('real');
  const [kudosGiven, setKudosGiven] = useState(false);
  const [heartCount, setHeartCount] = useState(19);
  const [hasHearted, setHasHearted] = useState(false);
  const [donutCount, setDonutCount] = useState(12);
  const [hasDonuted, setHasDonuted] = useState(false);

  const handleTogglePersona = (mode: 'real' | 'alter') => {
    if (persona === mode) return;
    setPersona(mode);
    if (mode === 'alter') {
      onShowToast('🚀 Alter Ego activated: Chief Astrobiologist!');
    } else {
      onShowToast('👔 Reverted to Real Identity');
    }
  };

  const handleSendKudos = () => {
    setKudosGiven(true);
    onShowToast('🌟 You sent 50 Kudos to Maya Lin!');
    setTimeout(() => setKudosGiven(false), 600);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    onShowToast("🔗 Maya's profile link copied to clipboard!");
  };

  const handleHeartReact = () => {
    if (!hasHearted) {
      setHeartCount((c) => c + 1);
      setHasHearted(true);
    } else {
      setHeartCount((c) => c - 1);
      setHasHearted(false);
    }
  };

  const handleDonutReact = () => {
    if (!hasDonuted) {
      setDonutCount((c) => c + 1);
      setHasDonuted(true);
    } else {
      setDonutCount((c) => c - 1);
      setHasDonuted(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 py-4 gap-6 max-w-2xl mx-auto">
      
      {/* Interactive Dual Identity Card */}
      <section className="relative w-full rounded-2xl bg-white shadow-xs p-4 flex flex-col gap-4 overflow-hidden border border-[#c7c4d8]/40">
        
        {/* Top Persona Segmented Switch */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex p-1 rounded-full bg-[#e2e7ff] w-full max-w-[280px]">
            <button
              onClick={() => handleTogglePersona('real')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                persona === 'real'
                  ? 'text-[#131b2e] bg-white shadow-xs'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <span>👔</span>
              <span>Real Identity</span>
            </button>
            <button
              onClick={() => handleTogglePersona('alter')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                persona === 'alter'
                  ? 'text-white bg-[#dc2c4f] shadow-xs'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <span>🚀</span>
              <span>Alter Ego</span>
            </button>
          </div>

          {/* Quick Share Profile Button */}
          <button
            aria-label="Share Maya's Profile"
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#464555] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
          </button>
        </div>

        {/* Dual Avatar & Core Bio Presentation */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-1">
          {/* Portrait Card with Presence Ring Indicator */}
          <div className="relative shrink-0 w-28 h-28 rounded-2xl overflow-hidden shadow-md bg-[#eaedff]">
            {/* Real Portrait */}
            <img
              src={HUDDLE_ASSETS.mayaReal}
              alt="Maya Lin Corporate Portrait"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                persona === 'real' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Alter Ego Astronaut Portrait */}
            <img
              src={HUDDLE_ASSETS.mayaAlter}
              alt="Maya Lin Astronaut Alter Ego"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                persona === 'alter' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
            {/* Presence Beacon Badge */}
            <div
              className={`absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors ${
                persona === 'alter'
                  ? 'bg-[#dc2c4f] text-white'
                  : 'bg-[#005338] text-white'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  persona === 'alter' ? 'bg-[#ffdadb] animate-ping' : 'bg-[#6ffbbe] animate-pulse'
                }`}
              ></span>
              <span>{persona === 'alter' ? 'Orbiting Floor 3' : 'In Office'}</span>
            </div>
          </div>

          {/* Member Details */}
          <div className="flex flex-col text-center sm:text-left min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
              <h1 className="text-xl text-[#131b2e] font-bold tracking-tight">
                Maya Lin
              </h1>
              <span
                className="material-symbols-outlined text-[#3525cd] text-[18px]"
                title="Verified Colleague"
              >
                verified
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                  persona === 'alter'
                    ? 'bg-[#b90538] text-white'
                    : 'bg-[#e2dfff] text-[#0f0069]'
                }`}
              >
                {persona === 'alter' ? 'Cosmic Fleet' : 'UX Core'}
              </span>
            </div>

            <p
              className={`text-base font-semibold transition-colors ${
                persona === 'alter' ? 'text-[#b90538]' : 'text-[#3525cd]'
              }`}
            >
              {persona === 'alter' ? 'Chief Astrobiologist 🚀' : 'Senior Product Designer'}
            </p>

            <p className="text-xs text-[#464555] mt-0.5 leading-relaxed">
              {persona === 'alter'
                ? 'Cultivating hydroponic strawberries on Mars orbit while redesigning gravity sensors.'
                : 'Focusing on design tokens, mobile fluidity, and frictionless user rituals.'}
            </p>

            {/* Pronouns & Timezone */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-[#464555]">
              <span className="text-[11px] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px]">badge</span>
                she/her
              </span>
              <span className="text-[11px] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                9:00 AM – 5:30 PM PST
              </span>
            </div>
          </div>
        </div>

        {/* Quick Micro-Actions Row */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => onOpenChat('Maya Lin')}
            className="h-11 px-2 rounded-xl bg-[#3525cd] text-white hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
            <span className="text-xs font-semibold truncate">Chat</span>
          </button>

          <button
            onClick={() => onOpenCoffee('Maya Lin')}
            className="h-11 px-2 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">local_cafe</span>
            <span className="text-xs font-semibold truncate">1:1 Coffee</span>
          </button>

          <button
            onClick={handleSendKudos}
            className={`h-11 px-2 rounded-xl bg-[#dc2c4f] text-white hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs ${
              kudosGiven ? 'scale-105' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">star</span>
            <span className="text-xs font-semibold truncate">Give Kudos</span>
          </button>
        </div>
      </section>

      {/* Live Workplace Status & Mini-Desk Card */}
      <section className="w-full rounded-2xl bg-[#f2f3ff] p-4 flex flex-col gap-2 border border-[#c7c4d8]/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005338] text-[20px]">
              apartment
            </span>
            <span className="text-sm font-semibold text-[#131b2e]">Today's Desk Base</span>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white text-[#005338] font-bold flex items-center gap-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#005338] animate-ping"></span>
            Currently Active
          </span>
        </div>

        {/* Mini Visual Floorplan Map Slot */}
        <div className="relative w-full h-36 rounded-xl bg-white overflow-hidden flex flex-col justify-end p-3">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{ backgroundImage: `url('${HUDDLE_ASSETS.floorplanBg}')` }}
          ></div>
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/90 via-[#283044]/35 to-transparent"></div>
          
          {/* Desk Pin Indicator Overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#3525cd] text-white flex items-center justify-center shadow-md animate-bounce">
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
              </div>
              <div>
                <p className="text-xs text-[#eef0ff] font-bold">Floor 3 · Desk 3B-14</p>
                <p className="text-[11px] text-[#dae2fd]">Creative Pod · Near East Sunroom</p>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab('office-map')}
              className="px-3 py-1.5 rounded-lg bg-white text-[#3525cd] hover:bg-[#faf8ff] text-xs font-semibold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
            >
              <span>Open Map</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Icebreaker Topics / Ask Me About */}
      <section className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#b90538] text-[20px]">
            lightbulb
          </span>
          <h2 className="text-sm font-bold text-[#131b2e]">Ask Me About...</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { emoji: '🎨', label: 'Figma Variables' },
            { emoji: '☕', label: 'Specialty Pour-over Coffee' },
            { emoji: '🛸', label: 'Hard Sci-Fi Novels' },
            { emoji: '🐕', label: 'Rescue Dog Rehabilitation' },
            { emoji: '🪴', label: 'Hydroponic Basil' },
          ].map((topic) => (
            <span
              key={topic.label}
              className="px-3 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-xs font-medium flex items-center gap-1.5 transition-colors hover:bg-[#e2dfff] cursor-default"
            >
              <span>{topic.emoji}</span>
              <span>{topic.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Dream Job / Backstory Card */}
      <section
        className={`w-full rounded-2xl p-4 flex flex-col gap-2 shadow-xs transition-all duration-300 border border-[#c7c4d8]/40 ${
          persona === 'alter' ? 'bg-[#e2e7ff]' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[20px] ${
                persona === 'alter' ? 'text-[#b90538]' : 'text-[#3525cd]'
              }`}
            >
              {persona === 'alter' ? 'rocket_launch' : 'travel_explore'}
            </span>
            <h3 className="text-sm font-bold text-[#131b2e]">
              {persona === 'alter' ? 'Station Mission Log · Sol 304' : 'Alternate Universe Story'}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#464555] text-[10px] font-semibold">
            {persona === 'alter' ? 'Simulated Persona' : 'Dream Reality'}
          </span>
        </div>

        <div className="rounded-xl bg-[#f2f3ff] p-3">
          <p className="text-xs text-[#131b2e] leading-relaxed">
            “If I wasn't designing UI patterns and design systems, I'd be managing a hydroponic greenhouse bio-dome on an orbital research station. Favorite celestial body: <strong>Europa</strong> (for the icy oceans).”
          </p>
        </div>

        <div className="flex items-center justify-between text-[#464555] pt-1 text-[11px]">
          <span className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#005338]">eco</span>
            Bio-Dome Spec: Tier 4 Hydro Station
          </span>
          <span className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#b90538]">favorite</span>
            Inspired by ‘The Expanse’
          </span>
        </div>
      </section>

      {/* Recognition & Kudos Wall */}
      <section className="w-full rounded-2xl bg-white p-4 flex flex-col gap-4 shadow-xs border border-[#c7c4d8]/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b90538] text-[22px]">
              workspace_premium
            </span>
            <h2 className="text-sm font-bold text-[#131b2e]">Kudos &amp; Badges</h2>
          </div>
          <span className="text-xs text-[#464555] font-semibold">44 Received</span>
        </div>

        {/* Badge Showcase Chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { emoji: '🧙‍♂️', name: 'Design Wizard', count: '14 awarded' },
            { emoji: '💖', name: 'Culture Champ', count: '22 awarded' },
            { emoji: '🦉', name: 'Night Owl', count: '8 awarded' },
          ].map((b) => (
            <div
              key={b.name}
              className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] flex items-center gap-2 border border-[#c7c4d8]/30"
            >
              <span className="text-base">{b.emoji}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#131b2e] leading-tight">{b.name}</span>
                <span className="text-[10px] text-[#464555]">{b.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Warm Kudos Note */}
        <div className="rounded-xl bg-[#f2f3ff] p-3 flex flex-col gap-2 relative overflow-hidden border border-[#c7c4d8]/30">
          <div className="flex items-center gap-2">
            <img
              src={HUDDLE_ASSETS.alexRivera}
              alt="Alex Rivera"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#131b2e]">Alex Rivera · Product Lead</span>
              <span className="text-[10px] text-[#464555]">Yesterday at 4:15 PM</span>
            </div>
          </div>
          <p className="text-xs text-[#131b2e] leading-relaxed">
            “Maya completely revamped our team onboarding flow in record time, and surprise-delivered vegan donuts to Floor 3! True team superstar.”
          </p>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleHeartReact}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all ${
                hasHearted
                  ? 'bg-[#ffdadb] text-[#b90538]'
                  : 'bg-white text-[#b90538] hover:bg-[#ffdadb]/40'
              }`}
            >
              <span>❤️</span>
              <span>{heartCount}</span>
            </button>
            <button
              onClick={handleDonutReact}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all ${
                hasDonuted
                  ? 'bg-[#e2dfff] text-[#3525cd]'
                  : 'bg-white text-[#3525cd] hover:bg-[#e2dfff]/40'
              }`}
            >
              <span>🍩</span>
              <span>{donutCount}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Active Focus & Sprints */}
      <section className="w-full rounded-2xl bg-white p-4 flex flex-col gap-2 shadow-xs mb-4 border border-[#c7c4d8]/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd] text-[20px]">
              layers
            </span>
            <h2 className="text-sm font-bold text-[#131b2e]">Current Focus &amp; Sprints</h2>
          </div>
          <span className="text-xs text-[#464555] font-semibold">Q3 Sprint 4</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Project 1 */}
          <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between border border-[#c7c4d8]/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#e2dfff] flex items-center justify-center text-[#0f0069] shrink-0">
                <span className="material-symbols-outlined text-[20px]">palette</span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-xs font-bold text-[#131b2e] truncate">Design Systems 2.0</p>
                <p className="text-[11px] text-[#464555] truncate">
                  Standardizing token ramp &amp; high-contrast assets
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#006e4b] text-white text-[10px] font-bold shrink-0">
              90% Done
            </span>
          </div>

          {/* Project 2 */}
          <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between border border-[#c7c4d8]/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#3525cd] shrink-0">
                <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-xs font-bold text-[#131b2e] truncate">Mobile V3 Launch</p>
                <p className="text-[11px] text-[#464555] truncate">
                  Polishing colleague presence &amp; map gestures
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#464555] text-[10px] font-bold shrink-0">
              In Review
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
