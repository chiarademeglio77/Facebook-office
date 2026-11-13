import React, { useState } from 'react';
import { TEAMMATES } from '../../data/huddleData';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  teammateName: string;
  onShowToast: (message: string) => void;
}

const LOCATIONS = [
  { id: 'espresso-bar', name: 'Floor 3 Espresso Bar', desc: 'Barista on duty with specialty pour-over', icon: 'local_cafe' },
  { id: 'bonsai-sunroom', name: 'Bonsai Sunroom', desc: 'Quiet botanical alcove with sunny booths', icon: 'yard' },
  { id: 'terrace', name: 'West Roof Terrace', desc: 'Fresh air & skyline view', icon: 'deck' },
  { id: 'ground-cafe', name: 'Lobby Bakery & Cafe', desc: 'Fresh pastries & sourdough', icon: 'bakery_dining' },
];

const TIMES = [
  'In 15 minutes',
  'Today at 3:00 PM',
  'Today at 4:30 PM',
  'Tomorrow at 10:00 AM',
];

export default function CoffeeModal({ isOpen, onClose, teammateName, onShowToast }: CoffeeModalProps) {
  const teammate = TEAMMATES.find((t) => t.name.toLowerCase().includes(teammateName.toLowerCase())) || TEAMMATES[0];
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [selectedTime, setSelectedTime] = useState(TIMES[0]);
  const [customNote, setCustomNote] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onShowToast(`☕ Coffee invite sent to ${teammate.name} for ${selectedTime}!`);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#faf8ff] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#c7c4d8]/40 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[22px]">local_cafe</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#131b2e] leading-tight">1:1 Coffee Catchup</h3>
              <p className="text-xs text-[#464555]">Invite {teammate.name} for a quick coffee break</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/60 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendInvite} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Pick Location */}
          <div>
            <label className="block text-xs font-bold text-[#464555] uppercase tracking-wider mb-2">
              Select Spot
            </label>
            <div className="space-y-2">
              {LOCATIONS.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/20 shadow-xs'
                        : 'border-[#c7c4d8]/40 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">{loc.icon}</span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#131b2e]">{loc.name}</div>
                        <div className="text-[10px] text-[#464555]">{loc.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-amber-600 text-[20px]">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pick Time */}
          <div>
            <label className="block text-xs font-bold text-[#464555] uppercase tracking-wider mb-2">
              Suggested Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TIMES.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium text-center transition-all ${
                      isSelected
                        ? 'border-[#3525cd] bg-[#eaedff] text-[#3525cd] font-bold shadow-xs'
                        : 'border-[#c7c4d8]/40 bg-white text-[#464555] hover:bg-[#f2f3ff]'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Note */}
          <div>
            <label className="block text-xs font-bold text-[#464555] uppercase tracking-wider mb-2">
              Quick Note (Optional)
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Would love to chat about your sci-fi botany persona!"
              className="w-full px-3.5 py-2.5 rounded-2xl border border-[#c7c4d8]/60 bg-white text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-[#464555]/60"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#c7c4d8]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#464555] hover:bg-slate-200/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-95 active:scale-98 text-white text-xs font-bold shadow-md shadow-amber-900/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">local_cafe</span>
              {isSending ? 'Sending Invite...' : `Invite to ${selectedLocation.name.split(' ')[0]}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
