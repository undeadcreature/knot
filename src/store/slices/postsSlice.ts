import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    position: string;
  };
  content: string;
  image?: string;
  type: 'text' | 'image' | 'poll' | 'event';
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  pollOptions?: Array<{ id: string; text: string; votes: number }>;
  eventData?: {
    title: string;
    date: string;
    location: string;
    attendees: number;
  };
}

interface PostsState {
  feed: Post[];
  loading: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
      position: 'Product Manager at Google'
    },
    content: 'Just wrapped up an amazing reunion with my Computer Science batch! It\'s incredible to see how far everyone has come. From startup founders to tech leads at major companies - our alma mater really prepared us well. 🎓',
    type: 'text',
    timestamp: '2024-01-15T10:30:00Z',
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
    isSaved: false
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
      position: 'Senior Designer at Airbnb'
    },
    content: 'Sharing some photos from our annual alumni design workshop! We had over 50 attendees learning about the latest UX trends. Special thanks to everyone who made this possible.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    type: 'image',
    timestamp: '2024-01-14T14:20:00Z',
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: true,
    isSaved: true
  },
  {
    id: '3',
    author: {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
      position: 'Startup Founder'
    },
    content: 'Quick poll for my fellow alumni: What\'s the most valuable skill you\'ve learned since graduation?',
    type: 'poll',
    timestamp: '2024-01-13T16:45:00Z',
    likes: 34,
    comments: 45,
    shares: 12,
    isLiked: false,
    isSaved: false,
    pollOptions: [
      { id: '1', text: 'Leadership & Management', votes: 45 },
      { id: '2', text: 'Technical Skills', votes: 32 },
      { id: '3', text: 'Networking', votes: 28 },
      { id: '4', text: 'Communication', votes: 67 }
    ]
  },
  {
    id: '4',
    author: {
      id: '5',
      name: 'Emily Watson',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
      position: 'Alumni Relations Director'
    },
    content: 'Don\'t miss our upcoming Tech Career Fair! We have representatives from top companies looking to hire our talented alumni.',
    type: 'event',
    timestamp: '2024-01-12T09:15:00Z',
    likes: 156,
    comments: 34,
    shares: 67,
    isLiked: true,
    isSaved: true,
    eventData: {
      title: 'Alumni Tech Career Fair 2024',
      date: '2024-02-15T18:00:00Z',
      location: 'University Campus Center',
      attendees: 234
    }
  }
];

const initialState: PostsState = {
  feed: mockPosts,
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.feed.unshift(action.payload);
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.feed.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    },
    toggleSave: (state, action: PayloadAction<string>) => {
      const post = state.feed.find(p => p.id === action.payload);
      if (post) {
        post.isSaved = !post.isSaved;
      }
    },
  },
});

export const { addPost, toggleLike, toggleSave } = postsSlice.actions;
export default postsSlice.reducer;