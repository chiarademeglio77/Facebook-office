import React, { useState, useEffect, useRef } from 'react';
import { HUDDLE_ASSETS, TEAMMATES } from '../../data/huddleData';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  teammateName: string;
  onShowToast: (message: string) => void;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export default function ChatModal({ isOpen, onClose, teammateName, onShowToast }: ChatModalProps) {
  const teammate = TEAMMATES.find((t) => t.name.toLowerCase().includes(teammateName.toLowerCase())) || TEAMMATES[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'them',
      text: `Hey! I'm at Desk ${teammate.desk.split(' · ')[1] || '3B-14'}. Working on the Q3 design sprint. What's up?`,
      time: '10:42 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: String(Date.now()),
      sender: 'me',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate reply after 1s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        `Sounds awesome! Let's sync right by the Espresso Bar in 10 mins. ☕`,
        `Totally agree! I'll update the Figma token spec right away. ✨`,
        `Haha love that! Have you tried the sourdough David brought into the 4th floor lounge? 🥖`,
        `Perfect! I'm heading over to the Bonsai Sunroom if you want to grab a quiet booth. 🌿`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'them',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      onShowToast(`💬 New reply from ${teammate.name}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#faf8ff] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#c7c4d8]/40 overflow-hidden h-[85vh] sm:h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={teammate.avatar}
                alt={teammate.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#3525cd]/20"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006e4b] ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-[#131b2e]">{teammate.name}</h3>
                <span className="material-symbols-outlined text-[16px] text-[#3525cd] fill-1">verified</span>
              </div>
              <p className="text-[11px] text-[#464555]">{teammate.role} · {teammate.desk}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/60 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f2f3ff]/40">
          <div className="text-center my-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#c7c4d8]/30 text-[10px] text-[#464555] font-semibold">
              Today · In Office on Floor 3
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'me'
                    ? 'bg-[#3525cd] text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-[#131b2e] border border-[#c7c4d8]/40 rounded-bl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-[#464555]/80 mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-2 bg-white rounded-2xl rounded-bl-xs border border-[#c7c4d8]/40 w-fit text-[#464555] text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] ml-1">{teammate.name.split(' ')[0]} is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2 bg-white/70 border-t border-[#c7c4d8]/30 flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            '☕ Coffee at the espresso bar?',
            '🚀 Loved your dream persona!',
            '🎨 Quick review on the Figma tokens?',
          ].map((quickText) => (
            <button
              key={quickText}
              type="button"
              onClick={() => handleSend(quickText)}
              className="px-2.5 py-1 rounded-full bg-[#eaedff] hover:bg-[#dce1ff] text-[#3525cd] text-[10px] font-semibold whitespace-nowrap transition-colors shrink-0"
            >
              {quickText}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="p-3 bg-white border-t border-[#c7c4d8]/40 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${teammate.name.split(' ')[0]}...`}
            className="flex-1 px-3.5 py-2 rounded-full border border-[#c7c4d8]/60 bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-full bg-[#3525cd] hover:bg-[#2b1ea8] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
