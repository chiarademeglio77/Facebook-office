import React, { useState } from 'react';
import { HUDDLE_ASSETS } from '../data/huddleData';

interface DreamAiScreenProps {
  initialPrompt?: string;
  onPublishPersona: (personaData: any) => void;
  onShowToast: (message: string) => void;
}

export default function DreamAiScreen({
  initialPrompt = 'Commander Botanist cultivating neon glowing hydroponics on a Martian base',
  onPublishPersona,
  onShowToast,
}: DreamAiScreenProps) {
  const [promptText, setPromptText] = useState<string>(initialPrompt);
  const [activeLens, setActiveLens] = useState<string>('cinematic');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<'idle' | 'generating' | 'done'>('idle');
  const [previewMode, setPreviewMode] = useState<'dream' | 'real'>('dream');
  const [published, setPublished] = useState<boolean>(false);

  // Trending votes state
  const [trendingVotes, setTrendingVotes] = useState<{ [id: string]: { count: number; voted: boolean } }>({
    liam: { count: 48, voted: false },
    priya: { count: 62, voted: false },
    carlos: { count: 39, voted: false },
  });

  const categoryPresets = [
    {
      label: '🚀 Sci-Fi & Space',
      prompt: 'Space Botanist planting hydroponic orchids inside a glass dome on Mars, futuristic bio-suit with purple cosmic glow',
    },
    {
      label: '🍜 Culinary Arts',
      prompt: 'Michelin Star Ramen Chef in a bustling rainy Shinjuku alley, handcrafted bamboo noodles, warm neon steam and copper pans',
    },
    {
      label: '🏄 Extreme Sports',
      prompt: 'Big Wave Surfer tackling an 80-foot turquoise swell in Nazare, rugged wetsuit, golden hour spray',
    },
    {
      label: '🎸 Creative & Music',
      prompt: 'Electric Cello Virtuoso performing at an illuminated forest cathedral concert under bioluminescent trees',
    },
    {
      label: '🐻 Wildlife & Nature',
      prompt: 'Grizzly Bear Wildlife Biologist trekking subzero Alaskan tundra pines with snowy telemetry pack and shearling parka',
    },
  ];

  const aestheticLenses = [
    { id: 'cinematic', label: 'Cinematic Realism', icon: 'movie' },
    { id: 'pixar', label: '3D Pixar Warm', icon: 'animation' },
    { id: 'comic', label: 'Comic Hero Pulp', icon: 'auto_stories' },
    { id: 'polaroid', label: '70s Polaroid Grain', icon: 'camera_roll' },
  ];

  const handleGenerate = () => {
    if (!promptText.trim()) return;
    setIsGenerating(true);
    setGenerationStep('generating');

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep('done');
      setPreviewMode('dream');
      onShowToast('✨ Persona Born: Commander Maya materialized!');

      setTimeout(() => {
        setGenerationStep('idle');
      }, 1500);
    }, 1300);
  };

  const handleToggleVote = (id: string) => {
    setTrendingVotes((prev) => {
      const current = prev[id];
      const newVoted = !current.voted;
      const newCount = current.count + (newVoted ? 1 : -1);
      if (newVoted) onShowToast('🌟 Vote counted! Added to Floor 3 reveal party.');
      return {
        ...prev,
        [id]: { count: newCount, voted: newVoted },
      };
    });
  };

  const handlePublish = () => {
    setPublished(true);
    onPublishPersona({
      title: 'Commander Maya',
      role: 'First Botanist on Mars Colony',
      image: HUDDLE_ASSETS.commanderMayaPreview,
    });
    onShowToast('🚀 Published to Company Feed & added to your Office Profile!');
  };

  return (
    <div className="flex flex-col w-full pb-20 px-4 space-y-6 max-w-2xl mx-auto pt-2">
      
      {/* Studio Header & Generator Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4f46e5] via-[#3525cd] to-[#4d44e3] p-4 text-white shadow-md border border-[#c7c4d8]/30">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#4edea3]/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-[#ffdadb]/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md">
              <span className="material-symbols-outlined text-[#6ffbbe] text-[18px]">
                auto_awesome
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#6ffbbe] font-bold">
                AI Persona Studio
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-white">
              <span className="material-symbols-outlined text-[14px]">bolt</span> Daily: 3/3 left
            </span>
          </div>

          <div className="pt-1">
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug">
              What’s your alternate career universe?
            </h1>
            <p className="text-xs text-[#dad7ff] mt-1 leading-relaxed">
              Transform your corporate desk identity into your wild, cosmic, or culinary dream job with one tap.
            </p>
          </div>

          {/* Quick Category Pill Bar */}
          <div className="pt-1">
            <label className="block text-[10px] uppercase tracking-wider text-white/80 mb-2 font-bold">
              Pick an inspiration vibe
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categoryPresets.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setPromptText(cat.prompt)}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dream Prompt Input */}
          <div className="pt-1 flex flex-col space-y-1.5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="e.g., Michelin Star Ramen Chef in Tokyo or F1 Pit Mechanic..."
                className="w-full h-12 pl-3.5 pr-10 rounded-xl bg-white text-[#131b2e] text-xs font-medium placeholder:text-[#777587] focus:outline-none shadow-inner"
              />
              {promptText && (
                <button
                  type="button"
                  aria-label="Clear input"
                  onClick={() => setPromptText('')}
                  className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-[#eaedff] text-[#464555] hover:text-[#131b2e]"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Aesthetic Lens Selector */}
          <div className="pt-1 flex flex-col space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-white/80 font-bold">
              Aesthetic Lens
            </span>
            <div className="grid grid-cols-2 gap-2 text-[#131b2e]">
              {aestheticLenses.map((lens) => {
                const isActive = activeLens === lens.id;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    onClick={() => setActiveLens(lens.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors shadow-xs ${
                      isActive
                        ? 'bg-white text-[#3525cd]'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">
                        {lens.icon}
                      </span>
                      <span>{lens.label}</span>
                    </span>
                    <span
                      className={`material-symbols-outlined text-[16px] text-[#006e4b] ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      check_circle
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !promptText.trim()}
            className="w-full mt-2 h-12 rounded-xl bg-gradient-to-r from-[#dc2c4f] via-[#b90538] to-[#dc2c4f] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  refresh
                </span>
                <span>Synthesizing Multiverse...</span>
              </>
            ) : generationStep === 'done' ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Persona Born!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px] animate-pulse">
                  auto_awesome
                </span>
                <span>Generate Dream Persona</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Generated Preview Card */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b90538]"></span>
            <h2 className="text-base font-bold text-[#131b2e]">Your Alter Ego Preview</h2>
          </div>
          <span className="text-[11px] text-[#464555] font-semibold">
            {published ? 'Published to Profile' : 'Draft · Unsaved'}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm flex flex-col border border-[#c7c4d8]/40">
          {/* Top Toggle Pill: Real Me vs Dream Persona */}
          <div className="p-4 pb-2 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-full bg-[#eaedff] text-[#464555] w-full max-w-xs shadow-inner">
              <button
                type="button"
                onClick={() => setPreviewMode('real')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  previewMode === 'real'
                    ? 'bg-white text-[#3525cd] shadow-xs font-bold'
                    : 'text-[#464555]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">business_center</span>
                <span>Real Me (Desk)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode('dream')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  previewMode === 'dream'
                    ? 'bg-white text-[#3525cd] shadow-xs font-bold'
                    : 'text-[#464555]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#b90538]">
                  rocket_launch
                </span>
                <span>Dream Persona</span>
              </button>
            </div>
          </div>

          {/* Visual Card Area */}
          <div className="relative w-full aspect-4/5 bg-[#e2e7ff] overflow-hidden">
            {/* Dream Portrait */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end ${
                previewMode === 'dream' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={HUDDLE_ASSETS.commanderMayaPreview}
                alt="Commander Maya Dream Portrait"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/40 to-transparent"></div>
              {/* Badge overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold shadow-xs">
                <span className="material-symbols-outlined text-[15px] text-[#6ffbbe]">
                  arrow_back_ios_new
                </span>
                <span>AI Gen v4.2</span>
              </div>
              <div className="relative z-10 p-4 flex flex-col text-white">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#006e4b] text-white text-[10px] font-bold tracking-wide uppercase">
                    Sci-Fi Pioneer
                  </span>
                  <span className="text-[11px] text-[#dae2fd]">Floor 3 Hybrid</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-1">Commander Maya</h3>
                <p className="text-xs text-[#6ffbbe] font-semibold">
                  First Botanist on Mars Colony · Bio-Dome 01
                </p>
              </div>
            </div>

            {/* Real Me Portrait */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end ${
                previewMode === 'real' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={HUDDLE_ASSETS.mayaDeskPhoto}
                alt="Maya Lin Desk Photo"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/40 to-transparent"></div>
              <div className="relative z-10 p-4 flex flex-col text-white">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#4f46e5] text-white text-[10px] font-bold tracking-wide uppercase">
                    Current Reality
                  </span>
                  <span className="text-[11px] text-[#dae2fd]">Desk #342</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-1">Maya Lin</h3>
                <p className="text-xs text-[#c3c0ff] font-semibold">
                  Lead Product Designer · Design Systems
                </p>
              </div>
            </div>
          </div>

          {/* Persona Story & Office Parallel Callout */}
          <div className="p-4 flex flex-col space-y-3 bg-white">
            <div className="rounded-xl bg-[#f2f3ff] p-3 flex flex-col space-y-2 border border-[#c7c4d8]/30">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#b90538] text-[20px] shrink-0 mt-0.5">
                  psychology_alt
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#b90538] font-bold">
                    Why This Universe
                  </span>
                  <p className="text-xs text-[#131b2e] mt-0.5 leading-relaxed">
                    Obsessed with cultivating oxygen-rich Martian orchids under harsh radiation filters. Secret passion for extreme botany and space habitats.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-[#c7c4d8]/30">
                <span className="material-symbols-outlined text-[#005338] text-[20px] shrink-0 mt-0.5">
                  nest_eco_leaf
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#005338] font-bold">
                    Office Parallel
                  </span>
                  <p className="text-[11px] text-[#464555] leading-relaxed">
                    Solely responsible for keeping the 3rd floor ficus plant and desk succulents alive through Q4 sprints.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handlePublish}
                className={`flex-1 h-11 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 ${
                  published ? 'bg-[#006e4b]' : 'bg-[#3525cd] hover:bg-[#4d44e3]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {published ? 'check_circle' : 'publish'}
                </span>
                <span>{published ? 'Published to Floor 3!' : 'Publish to Feed & Badge'}</span>
              </button>

              <button
                type="button"
                aria-label="Regenerate"
                onClick={handleGenerate}
                className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#464555] flex items-center justify-center hover:bg-[#e2e7ff] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>

              <button
                type="button"
                aria-label="Download Badge"
                onClick={() => onShowToast('📥 Downloading high-res Commander Maya badge PNG!')}
                className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#464555] flex items-center justify-center hover:bg-[#e2e7ff] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Alter Egos Leaderboard */}
      <div className="flex flex-col space-y-3 pt-2">
        <div className="flex items-end justify-between px-1">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-[#131b2e]">Trending Alter Egos</span>
              <span className="text-[18px]">🔥</span>
            </div>
            <p className="text-xs text-[#464555]">
              Top voted alternate careers on Floor 3 this week
            </p>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Showing all 42 team personas')}
            className="text-xs text-[#3525cd] font-bold hover:underline flex items-center"
          >
            <span>View 42</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Community Persona Cards */}
        <div className="flex flex-col space-y-4">
          {/* Card 1: Liam */}
          <div className="rounded-2xl bg-white p-4 shadow-sm flex flex-col space-y-3 border border-[#c7c4d8]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={HUDDLE_ASSETS.liamHeadshot}
                    alt="Liam Vance"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006e4b]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#131b2e] leading-tight">Liam Vance</span>
                  <span className="text-[11px] text-[#464555]">DevOps Engineer · Floor 3 Pod B</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3525cd] text-[10px] font-bold">
                #1 Trending
              </span>
            </div>

            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-900">
              <img
                src={HUDDLE_ASSETS.liamGrizzly}
                alt="Liam as Grizzly Wrangler"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#dc2c4f] text-white text-[9px] font-bold uppercase">
                    Dream Job
                  </span>
                  <h4 className="text-sm font-bold mt-0.5">Grizzly Wrangler in Deep Alaska</h4>
                </div>
                <span className="text-[10px] text-[#dae2fd]">"Cloud deployments are similar"</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleVote('liam')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-90 ${
                    trendingVotes.liam.voted
                      ? 'bg-[#ffdadb] text-[#b90538]'
                      : 'bg-[#f2f3ff] text-[#b90538] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  <span>{trendingVotes.liam.count} votes</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Liam: 14 comments on this persona')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#464555] text-xs font-semibold hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                  <span>14</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Shared Liam’s Grizzly persona')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>

          {/* Card 2: Priya */}
          <div className="rounded-2xl bg-white p-4 shadow-sm flex flex-col space-y-3 border border-[#c7c4d8]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={HUDDLE_ASSETS.priyaHeadshot}
                    alt="Priya Nair"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006e4b]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#131b2e] leading-tight">Priya Nair</span>
                  <span className="text-[11px] text-[#464555]">Lead Product Manager · Growth</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#006e4b] text-[10px] font-bold">
                #2 Trending
              </span>
            </div>

            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-900">
              <img
                src={HUDDLE_ASSETS.priyaBroadway}
                alt="Priya as Broadway Choreographer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#4f46e5] text-white text-[9px] font-bold uppercase">
                    Dream Job
                  </span>
                  <h4 className="text-sm font-bold mt-0.5">Broadway Theater Choreographer</h4>
                </div>
                <span className="text-[10px] text-[#dae2fd]">"Managing roadmaps is pure rhythm"</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleVote('priya')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-90 ${
                    trendingVotes.priya.voted
                      ? 'bg-[#ffdadb] text-[#b90538]'
                      : 'bg-[#f2f3ff] text-[#b90538] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  <span>{trendingVotes.priya.count} votes</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Priya: 23 comments on this persona')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#464555] text-xs font-semibold hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                  <span>23</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Shared Priya’s Broadway persona')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>

          {/* Card 3: Carlos */}
          <div className="rounded-2xl bg-white p-4 shadow-sm flex flex-col space-y-3 border border-[#c7c4d8]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={HUDDLE_ASSETS.carlosHeadshot}
                    alt="Carlos Mendes"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#4f46e5]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#131b2e] leading-tight">
                    Carlos Mendes
                  </span>
                  <span className="text-[11px] text-[#464555]">
                    Senior Financial Analyst · Floor 2
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#777587] text-[10px] font-bold">
                #3 Trending
              </span>
            </div>

            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-900">
              <img
                src={HUDDLE_ASSETS.carlosDeepSea}
                alt="Carlos as Deep Sea Archaeologist"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#005338] text-white text-[9px] font-bold uppercase">
                    Dream Job
                  </span>
                  <h4 className="text-sm font-bold mt-0.5">Deep Sea Shipwreck Salvager</h4>
                </div>
                <span className="text-[10px] text-[#dae2fd]">
                  "Looking for hidden balance sheets"
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleVote('carlos')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-90 ${
                    trendingVotes.carlos.voted
                      ? 'bg-[#ffdadb] text-[#b90538]'
                      : 'bg-[#f2f3ff] text-[#b90538] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  <span>{trendingVotes.carlos.count} votes</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Carlos: 8 comments on this persona')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#464555] text-xs font-semibold hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                  <span>8</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Shared Carlos’s Deep Sea persona')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Friday Alter Ego Reveal Party Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#e2e7ff] to-[#eaedff] p-4 flex items-center justify-between border border-[#c7c4d8]/40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">trophy</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#131b2e]">Friday Alter Ego Reveal Party</span>
            <span className="text-[11px] text-[#464555]">
              Top 3 vote getters win custom 3D desk figurines!
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#464555]">arrow_forward</span>
      </div>

    </div>
  );
}
