export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coverPhoto?: string;
  position: string;
  company: string;
  graduationYear: string;
  department: string;
  bio: string;
  location: string;
  skills: string[];
  interests: string[];
  education: Education[];
  workExperience: WorkExperience[];
  achievements: Achievement[];
  contactInfo: ContactInfo;
  isFollowing?: boolean;
  isConnected?: boolean;
  connectionStatus?: 'none' | 'pending' | 'connected';
  profileViews: number;
  connections: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'publication' | 'project';
}

export interface ContactInfo {
  email: string;
  phone?: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  isJoined: boolean;
  category: string;
  privacy: 'public' | 'private';
  posts: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  endDate?: string;
  location: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees?: number;
  isAttending: boolean;
  category: string;
  tags: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote: boolean;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  postedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  postedDate: string;
  applications: number;
  isSaved: boolean;
  hasApplied: boolean;
  tags: string[];
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  position: string;
  company: string;
  expertise: string[];
  experience: number;
  rating: number;
  reviews: number;
  bio: string;
  availability: 'available' | 'busy' | 'unavailable';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'link';
  attachment?: {
    url: string;
    name: string;
    type: string;
    size: number;
  };
  isRead: boolean;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  name?: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'connection' | 'group_invite' | 'job' | 'event' | 'mention';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actor: {
    id: string;
    name: string;
    avatar: string;
  };
}