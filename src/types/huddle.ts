export type HuddleTab = 'office-map' | 'company-feed' | 'dream-ai' | 'my-profile';

export interface Teammate {
  id: string;
  name: string;
  role: string;
  department: string;
  desk: string;
  zone: string;
  status: 'active' | 'focus' | 'break' | 'away';
  statusText: string;
  avatar: string;
  alterEgoAvatar?: string;
  alterEgoTitle?: string;
  alterEgoRole?: string;
  pinCoordinates: { top: string; left: string };
  kudosCount: number;
}

export interface DreamRoleStory {
  id: string;
  teammateName: string;
  teammateRole: string;
  dreamRole: string;
  desk: string;
  likesCount: number;
  image: string;
  category: string;
}

export interface FeedPost {
  id: string;
  type: 'kudos' | 'dream-unlocked' | 'event';
  author: {
    name: string;
    avatar: string;
    role: string;
    desk: string;
    verified?: boolean;
  };
  recipient?: {
    name: string;
    avatar: string;
    role: string;
    desk: string;
  };
  timestamp: string;
  title?: string;
  content: string;
  badge?: {
    name: string;
    icon: string;
    subtitle: string;
  };
  reactions: {
    claps: number;
    hearts: number;
    fire: number;
    rocket: number;
  };
  userReactions?: {
    claps?: boolean;
    hearts?: boolean;
    fire?: boolean;
    rocket?: boolean;
  };
  dreamComparison?: {
    realImage: string;
    realTitle: string;
    realSubtitle: string;
    dreamImage: string;
    dreamTitle: string;
    dreamSubtitle: string;
    pollVotes: {
      option1: { label: string; percent: number; count: number };
      option2: { label: string; percent: number; count: number };
      option3: { label: string; percent: number; count: number };
    };
    userVotedOption?: number;
  };
  eventDetails?: {
    image: string;
    title: string;
    timeLocation: string;
    attendeesCount: number;
    userAttending: boolean;
  };
  comments: Array<{
    id: string;
    author: string;
    avatar: string;
    text: string;
    time: string;
  }>;
}
