import React, { useState } from 'react';
import { HUDDLE_ASSETS, SPOTLIGHT_STORIES, INITIAL_FEED_POSTS } from '../data/huddleData';
import { FeedPost, HuddleTab } from '../types/huddle';

interface FeedScreenProps {
  onNavigateToTab: (tab: HuddleTab) => void;
  onOpenGiveKudos: () => void;
  onRemixPrompt: (promptText: string) => void;
  onShowToast: (message: string) => void;
}

export default function FeedScreen({
  onNavigateToTab,
  onOpenGiveKudos,
  onRemixPrompt,
  onShowToast,
}: FeedScreenProps) {
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(INITIAL_FEED_POSTS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  // Reaction toggles
  const handleToggleReaction = (
    postId: string,
    reactionKey: 'claps' | 'hearts' | 'fire' | 'rocket'
  ) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const userReactions = post.userReactions || {};
        const isReacted = !!userReactions[reactionKey];
        const newCount = post.reactions[reactionKey] + (isReacted ? -1 : 1);

        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionKey]: Math.max(0, newCount),
          },
          userReactions: {
            ...userReactions,
            [reactionKey]: !isReacted,
          },
        };
      })
    );
  };

  // Poll voting
  const handleVotePoll = (postId: string, optionIndex: 1 | 2 | 3) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId || !post.dreamComparison) return post;
        if (post.dreamComparison.userVotedOption !== undefined) {
          onShowToast('You already voted in this poll!');
          return post;
        }

        const pollVotes = { ...post.dreamComparison.pollVotes };
        const key = `option${optionIndex}` as 'option1' | 'option2' | 'option3';
        pollVotes[key] = {
          ...pollVotes[key],
          count: pollVotes[key].count + 1,
        };

        const total = pollVotes.option1.count + pollVotes.option2.count + pollVotes.option3.count;
        pollVotes.option1.percent = Math.round((pollVotes.option1.count / total) * 100);
        pollVotes.option2.percent = Math.round((pollVotes.option2.count / total) * 100);
        pollVotes.option3.percent = Math.round((pollVotes.option3.count / total) * 100);

        onShowToast(`🗳️ Vote recorded! Thank you for weighing in.`);

        return {
          ...post,
          dreamComparison: {
            ...post.dreamComparison,
            pollVotes,
            userVotedOption: optionIndex,
          },
        };
      })
    );
  };

  // Event RSVP
  const handleToggleRsvp = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId || !post.eventDetails) return post;
        const isAttending = post.eventDetails.userAttending;
        const newAttending = !isAttending;
        const newCount = post.eventDetails.attendeesCount + (newAttending ? 1 : -1);

        if (newAttending) {
          onShowToast('🎉 RSVP Confirmed! See you Thursday @ 5:30 PM');
        } else {
          onShowToast('RSVP Cancelled');
        }

        return {
          ...post,
          eventDetails: {
            ...post.eventDetails,
            userAttending: newAttending,
            attendeesCount: newCount,
          },
        };
      })
    );
  };

  // Submit comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author: 'Maya Lin',
              avatar: HUDDLE_ASSETS.userProfile,
              text,
              time: 'Just now',
            },
          ],
        };
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    onShowToast('💬 Comment posted to Town Square!');
  };

  // Filter posts
  const filteredPosts = feedPosts.filter((post) => {
    if (activeFilter === 'kudos') return post.type === 'kudos';
    if (activeFilter === 'office') return post.type === 'event';
    if (activeFilter === 'milestones') return post.type === 'dream-unlocked';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-20 max-w-2xl mx-auto">
      
      {/* Micro Office Pulse Toast Banner */}
      <div className="px-4 pt-2 pb-2">
        <div className="bg-[#e2e7ff] rounded-xl p-3 flex items-center justify-between shadow-xs border border-[#c7c4d8]/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] shrink-0">
              <span className="material-symbols-outlined text-[18px]">celebration</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#131b2e] truncate">
                Town Square · Floor 3 Vibes
              </span>
              <span className="text-[11px] text-[#464555] truncate">
                4 new dream personas unlocked today! ✨
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('dream-ai')}
            className="bg-[#3525cd] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shrink-0 shadow-xs hover:opacity-95 active:scale-95 transition-all"
          >
            View All
          </button>
        </div>
      </div>

      {/* Section: Dream Job of the Week Stories Carousel */}
      <section className="flex flex-col pt-1">
        <div className="flex items-center justify-between px-4 mb-2">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#3525cd] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <h2 className="text-base font-bold text-[#131b2e] tracking-tight">
              Dream Roles Spotlight
            </h2>
          </div>
          <span className="text-[10px] text-[#b90538] font-bold uppercase tracking-wider bg-[#ffdadb] px-2 py-0.5 rounded-full">
            Weekly Mix
          </span>
        </div>

        {/* Horizontal Snap Scroller */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory no-scrollbar">
          {SPOTLIGHT_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => onNavigateToTab('dream-ai')}
              className="snap-start shrink-0 w-44 rounded-xl overflow-hidden bg-[#eaedff] shadow-md flex flex-col relative group cursor-pointer transition-transform duration-200 active:scale-95 border border-[#c7c4d8]/40"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={story.image}
                  alt={story.dreamRole}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#283044] via-[#283044]/30 to-transparent"></div>
                {/* Dream Role Pill Tag */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-xs">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#3525cd]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    rocket_launch
                  </span>
                  <span className="text-[10px] font-bold text-[#131b2e]">Dream Role</span>
                </div>
                {/* Details */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] text-[#6ffbbe] font-bold block truncate">
                    {story.dreamRole}
                  </span>
                  <h3 className="text-sm text-white font-bold leading-tight truncate">
                    {story.teammateName}
                  </h3>
                  <span className="text-[11px] text-[#dae2fd] block opacity-90 truncate">
                    {story.teammateRole}
                  </span>
                </div>
              </div>
              <div className="p-2 flex items-center justify-between bg-white text-xs">
                <div className="flex items-center gap-1 text-[#b90538]">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                  <span className="text-[11px] font-semibold">{story.likesCount}</span>
                </div>
                <span className="text-[11px] text-[#3525cd] font-medium">{story.desk}</span>
              </div>
            </div>
          ))}

          {/* Card 4: Create Your Own Dream Persona */}
          <div
            onClick={() => onNavigateToTab('dream-ai')}
            className="snap-start shrink-0 w-44 rounded-xl bg-gradient-to-br from-[#e2dfff] via-[#e2e7ff] to-white p-4 flex flex-col justify-between items-center text-center shadow-md relative group cursor-pointer active:scale-95 transition-transform border border-[#c7c4d8]/40"
          >
            <div className="w-12 h-12 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow-md mt-4">
              <span className="material-symbols-outlined text-[28px] animate-spin">
                auto_awesome
              </span>
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm text-[#0f0069] font-bold leading-snug">
                Generate Your Dream Role
              </span>
              <span className="text-[11px] text-[#464555] leading-relaxed">
                Let AI reimagine your secret passion persona
              </span>
            </div>
            <button className="w-full py-2 bg-[#3525cd] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#4d44e3] active:scale-95 transition-all flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">add</span>
              Create Now
            </button>
          </div>
        </div>
      </section>

      {/* Feed Filter Chips */}
      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Company', icon: 'forum' },
          { id: 'kudos', label: 'Shoutouts & Kudos ⭐', icon: 'workspace_premium' },
          { id: 'office', label: 'Office Life ☕', icon: 'local_cafe' },
          { id: 'milestones', label: 'Project Milestones', icon: 'flag' },
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === chip.id
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-[#e2e7ff] text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={activeFilter === chip.id ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {chip.icon}
            </span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Feed Content Stream */}
      <div className="px-4 flex flex-col gap-4 pt-2">
        {filteredPosts.map((post) => {
          if (post.type === 'kudos') {
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 relative overflow-hidden border border-[#c7c4d8]/40"
              >
                {/* Decorative Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dc2c4f] via-[#4f46e5] to-[#006e4b]"></div>

                {/* Header */}
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {post.author.verified && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#006e4b] text-white flex items-center justify-center font-bold text-[9px] shadow-xs">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-sm font-bold text-[#131b2e] truncate">
                          {post.author.name}
                        </span>
                        <span className="text-xs text-[#464555]">gave kudos to</span>
                        <span className="text-sm font-bold text-[#3525cd] truncate">
                          @{post.recipient?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#464555]">
                        <span>{post.author.role} · {post.timestamp}</span>
                        <span className="w-1 h-1 rounded-full bg-[#c7c4d8]"></span>
                        <span className="text-[#006e4b] font-semibold">{post.author.desk}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge Showcase Banner */}
                {post.badge && (
                  <div className="bg-[#ffdadb]/50 rounded-xl p-3 flex items-center gap-3 border border-[#ffdadb]">
                    <div className="w-10 h-10 rounded-full bg-[#b90538] text-white flex items-center justify-center shadow-xs shrink-0">
                      <span
                        className="material-symbols-outlined text-[22px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {post.badge.icon}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#40000d]">
                        Awarded: {post.badge.name}
                      </span>
                      <span className="text-[11px] text-[#92002a] truncate">
                        {post.badge.subtitle}
                      </span>
                    </div>
                  </div>
                )}

                {/* Body Text */}
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  {post.content}
                </p>

                {/* Recipient Card */}
                {post.recipient && (
                  <div className="flex items-center gap-3 bg-[#f2f3ff] p-2.5 rounded-xl border border-[#c7c4d8]/30">
                    <img
                      src={post.recipient.avatar}
                      alt={post.recipient.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold text-[#131b2e] truncate">
                        {post.recipient.name}
                      </span>
                      <span className="text-[11px] text-[#464555] truncate">
                        {post.recipient.role} · {post.recipient.desk}
                      </span>
                    </div>
                    <button
                      onClick={() => onShowToast(`🙏 You sent a thank-you note to ${post.recipient?.name}!`)}
                      className="bg-[#3525cd] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs hover:opacity-90 active:scale-95 transition-all"
                    >
                      Say Thanks
                    </button>
                  </div>
                )}

                {/* Live Reactions Bar */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {[
                    { key: 'claps' as const, emoji: '👏', count: post.reactions.claps },
                    { key: 'hearts' as const, emoji: '❤️', count: post.reactions.hearts },
                    { key: 'fire' as const, emoji: '🔥', count: post.reactions.fire },
                    { key: 'rocket' as const, emoji: '🚀', count: post.reactions.rocket },
                  ].map((r) => {
                    const isReacted = !!post.userReactions?.[r.key];
                    return (
                      <button
                        key={r.key}
                        onClick={() => handleToggleReaction(post.id, r.key)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                          isReacted
                            ? 'bg-[#ffdadb] text-[#b90538] font-bold shadow-xs'
                            : 'bg-[#e2e7ff] text-[#464555] hover:bg-[#ffdadb]/40'
                        }`}
                      >
                        <span className="text-[14px]">{r.emoji}</span>
                        <span className="tabular-nums">{r.count}</span>
                      </button>
                    );
                  })}

                  <div className="flex items-center -space-x-2 ml-auto">
                    <div className="w-6 h-6 rounded-full bg-[#4f46e5] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      +52
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                {post.comments.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#f2f3ff]">
                    {post.comments.map((c) => (
                      <div key={c.id} className="flex items-start gap-2 text-xs">
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className="bg-[#f2f3ff] rounded-lg px-2.5 py-1.5 flex-1">
                          <span className="font-bold text-[#131b2e] mr-1.5">{c.author}:</span>
                          <span className="text-[#464555]">{c.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Box */}
                <div className="bg-[#f2f3ff] rounded-lg p-2 flex items-center gap-2 mt-1 border border-[#c7c4d8]/30">
                  <img
                    src={HUDDLE_ASSETS.userProfile}
                    alt="Me"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    placeholder="Add a sweet note or emoji cheer..."
                    className="bg-transparent flex-1 text-xs text-[#131b2e] focus:outline-none placeholder:text-[#777587]"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="text-[#3525cd] hover:text-[#4f46e5] p-1 rounded"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </article>
            );
          }

          if (post.type === 'dream-unlocked' && post.dreamComparison) {
            const comp = post.dreamComparison;
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 border border-[#c7c4d8]/40"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#131b2e]">{post.author.name}</span>
                        <span className="text-[10px] text-[#006e4b] bg-[#6ffbbe] px-2 py-0.5 rounded-full font-bold">
                          Dream Unlocked
                        </span>
                      </div>
                      <span className="text-[11px] text-[#464555]">
                        Unlocked via Huddle Dream AI · {post.timestamp}
                      </span>
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined text-[#3525cd] text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  {post.content}
                </p>

                {/* Side-by-Side Bento Grid */}
                <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden bg-[#eaedff] p-2 border border-[#c7c4d8]/30">
                  {/* Real Life Box */}
                  <div className="flex flex-col gap-1.5">
                    <div className="relative h-44 rounded-lg overflow-hidden bg-slate-800">
                      <img
                        src={comp.realImage}
                        alt={comp.realTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#283044]/80 backdrop-blur-md text-[#eef0ff] text-[10px] px-2 py-0.5 rounded-full font-semibold">
                        {comp.realTitle}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#464555] text-center font-medium">
                      {comp.realSubtitle}
                    </span>
                  </div>

                  {/* Dream Persona Box */}
                  <div className="flex flex-col gap-1.5">
                    <div className="relative h-44 rounded-lg overflow-hidden bg-slate-800">
                      <img
                        src={comp.dreamImage}
                        alt={comp.dreamTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#3525cd]/85 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                        <span
                          className="material-symbols-outlined text-[10px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          arrow_back_ios_new
                        </span>
                        {comp.dreamTitle}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#3525cd] text-center font-bold">
                      {comp.dreamSubtitle}
                    </span>
                  </div>
                </div>

                {/* Team Accuracy Poll */}
                <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col gap-2 mt-1 border border-[#c7c4d8]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Team Accuracy Verdict:</span>
                    <span className="text-[11px] text-[#3525cd] font-semibold">
                      {comp.pollVotes.option1.count +
                        comp.pollVotes.option2.count +
                        comp.pollVotes.option3.count}{' '}
                      Votes
                    </span>
                  </div>

                  {/* Poll Options */}
                  {[
                    { idx: 1 as const, opt: comp.pollVotes.option1, barColor: 'bg-[#3525cd]' },
                    { idx: 2 as const, opt: comp.pollVotes.option2, barColor: 'bg-[#4d44e3]' },
                    { idx: 3 as const, opt: comp.pollVotes.option3, barColor: 'bg-[#dc2c4f]' },
                  ].map(({ idx, opt, barColor }) => (
                    <button
                      key={idx}
                      onClick={() => handleVotePoll(post.id, idx)}
                      className="w-full bg-white hover:bg-[#faf8ff] rounded-lg p-2.5 flex items-center justify-between text-left shadow-xs active:scale-98 transition-all border border-[#c7c4d8]/20"
                    >
                      <span className="text-xs text-[#131b2e] font-medium">{opt.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#e2e7ff] rounded-full overflow-hidden">
                          <div
                            className={`${barColor} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${opt.percent}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] text-[#3525cd] font-bold w-7 text-right">
                          {opt.percent}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleToggleReaction(post.id, 'hearts')}
                    className="flex items-center gap-1.5 text-[#b90538] text-xs font-semibold"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                    <span>{post.reactions.hearts} Loves</span>
                  </button>

                  <button
                    onClick={() => {
                      onRemixPrompt(
                        'Master Chocolatier creating artisanal cocoa sculptures in a warm Parisian kitchen, candlelight, copper pots, golden dusting'
                      );
                      onNavigateToTab('dream-ai');
                    }}
                    className="bg-[#e2dfff] text-[#0f0069] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-[#c3c0ff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">magic_button</span>
                    Remix David's Prompt
                  </button>
                </div>
              </article>
            );
          }

          if (post.type === 'event' && post.eventDetails) {
            const ev = post.eventDetails;
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 border border-[#c7c4d8]/40"
              >
                {/* Event Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#6ffbbe] flex items-center justify-center text-[#005338] font-bold shrink-0">
                      <span className="material-symbols-outlined text-[22px]">sports_esports</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#131b2e]">{post.author.name}</span>
                        <span className="w-2 h-2 rounded-full bg-[#006e4b]"></span>
                      </div>
                      <span className="text-[11px] text-[#464555]">
                        {post.author.role} · {post.timestamp}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#6ffbbe] text-[#002113] px-2.5 py-1 rounded-full font-bold">
                    Happening Today
                  </span>
                </div>

                {/* Event Photo & Details */}
                <div className="rounded-xl overflow-hidden bg-[#eaedff] relative">
                  <div className="h-36 w-full relative">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                      <div className="flex flex-col">
                        <span className="text-sm text-white font-bold">{ev.title}</span>
                        <span className="text-[11px] text-[#dae2fd]">{ev.timeLocation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RSVP Section */}
                <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-xl border border-[#c7c4d8]/30">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#131b2e]">
                        {ev.attendeesCount} Going
                      </span>
                      <span className="text-[11px] text-[#464555]">· 8 Interested</span>
                    </div>
                    <div className="flex items-center -space-x-1.5 mt-1">
                      <div className="w-5 h-5 rounded-full bg-[#4f46e5] text-white text-[8px] font-bold flex items-center justify-center">
                        M
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#dc2c4f] text-white text-[8px] font-bold flex items-center justify-center">
                        S
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#006e4b] text-white text-[8px] font-bold flex items-center justify-center">
                        D
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#4d44e3] text-white text-[8px] font-bold flex items-center justify-center">
                        E
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleRsvp(post.id)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full shadow-md active:scale-95 transition-all flex items-center gap-1.5 ${
                      ev.userAttending
                        ? 'bg-[#006e4b] text-white'
                        : 'bg-[#3525cd] text-white hover:bg-[#4d44e3]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>{ev.userAttending ? 'Attending! 🥳' : "I'll be there 🎉"}</span>
                  </button>
                </div>
              </article>
            );
          }

          return null;
        })}
      </div>

      {/* Floating Sticky Action Button (Delight Trigger) */}
      <div className="fixed bottom-20 right-4 z-40 max-w-2xl">
        <button
          onClick={onOpenGiveKudos}
          className="bg-gradient-to-r from-[#dc2c4f] via-[#4f46e5] to-[#4d44e3] text-white rounded-full px-4 py-3 shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-white">
              volunteer_activism
            </span>
          </div>
          <span className="text-xs font-bold tracking-wide pr-1">Give Kudos</span>
        </button>
      </div>

    </div>
  );
}
