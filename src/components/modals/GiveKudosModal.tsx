import React, { useState } from 'react';
import { TEAMMATES } from '../../data/huddleData';
import { Teammate } from '../../types/huddle';

interface GiveKudosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendKudos: (kudosData: {
    recipientId: string;
    badgeName: string;
    badgeIcon: string;
    note: string;
  }) => void;
}

const BADGES = [
  { name: 'Problem Solver', icon: 'military_tech', color: 'bg-rose-100 text-rose-700 border-rose-200', desc: 'Heroic production fixes & debugging' },
  { name: 'Culture Champ', icon: 'favorite', color: 'bg-pink-100 text-pink-700 border-pink-200', desc: 'Bringing joy, treats & good vibes' },
  { name: 'Design Wizard', icon: 'palette', color: 'bg-purple-100 text-purple-700 border-purple-200', desc: 'Pixel perfection & delightful UI' },
  { name: 'Night Owl', icon: 'bedtime', color: 'bg-amber-100 text-amber-700 border-amber-200', desc: 'Going above & beyond after hours' },
  { name: 'Team Catalyst', icon: 'bolt', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', desc: 'Unblocking cross-team bottlenecks' },
];

export default function GiveKudosModal({ isOpen, onClose, onSendKudos }: GiveKudosModalProps) {
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate>(TEAMMATES[0]);
  const [selectedBadge, setSelectedBadge] = useState(BADGES[0]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSendKudos({
        recipientId: selectedTeammate.id,
        badgeName: selectedBadge.name,
        badgeIcon: selectedBadge.icon,
        note: note.trim(),
      });
      setIsSubmitting(false);
      setNote('');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#faf8ff] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#c7c4d8]/40 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-gradient-to-r from-[#3525cd]/10 to-[#b90538]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#dc2c4f] to-[#3525cd] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#131b2e] leading-tight">Send Teammate Kudos</h3>
              <p className="text-xs text-[#464555]">Celebrate someone making Floor 3 awesome</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/60 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Select Teammate */}
          <div>
            <label className="block text-xs font-bold text-[#464555] uppercase tracking-wider mb-2">
              Select Colleague
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TEAMMATES.map((t) => {
                const isSelected = selectedTeammate.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTeammate(t)}
                    className={`p-2 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'border-[#3525cd] bg-white ring-2 ring-[#3525cd]/20 shadow-xs'
                        : 'border-[#c7c4d8]/40 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-[#131b2e] truncate">{t.name}</p>
                      <p className="text-[10px] text-[#464555] truncate">{t.desk}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Badge */}
          <div>
            <label className="block text-xs font-bold text-[#464555] uppercase tracking-wider mb-2">
              Award Badge
            </label>
            <div className="space-y-2">
              {BADGES.map((b) => {
                const isSelected = selectedBadge.name === b.name;
                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => setSelectedBadge(b)}
                    className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'border-[#dc2c4f] bg-rose-50/60 ring-2 ring-[#dc2c4f]/20 shadow-xs'
                        : 'border-[#c7c4d8]/40 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${b.color}`}>
                        <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#131b2e]">{b.name}</div>
                        <div className="text-[11px] text-[#464555]">{b.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[#dc2c4f] text-[20px]">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-xs font-bold text-[#464555] uppercase tracking-wider mb-2">
              Your Shoutout Note
            </label>
            <textarea
              required
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Write a sincere shoutout to ${selectedTeammate.name} (e.g. "Huge shoutout for staying late to help squash the deployment bug! 🚀")`}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-[#c7c4d8]/60 bg-white text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#3525cd] transition-all resize-none placeholder:text-[#464555]/60"
            />
          </div>

          {/* Quick Starter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-[#464555] font-semibold mr-1 self-center">Quick tags:</span>
            {['☕ Coffee on me!', '🚀 Production savior', '✨ Delightful designs', '🙌 Lifesaver today'].map((phrase) => (
              <button
                key={phrase}
                type="button"
                onClick={() => setNote((prev) => (prev ? `${prev} ${phrase}` : phrase))}
                className="px-2.5 py-1 rounded-full bg-white border border-[#c7c4d8]/40 text-[10px] font-medium text-[#464555] hover:bg-[#f2f3ff] transition-colors"
              >
                {phrase}
              </button>
            ))}
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
              disabled={!note.trim() || isSubmitting}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#dc2c4f] to-[#b90538] hover:opacity-95 active:scale-98 text-white text-xs font-bold shadow-md shadow-rose-900/20 flex items-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              {isSubmitting ? 'Posting Shoutout...' : `Award ${selectedBadge.name}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
