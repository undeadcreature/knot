import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Group } from '../../types';

interface NetworkState {
  connections: User[];
  connectionRequests: User[];
  suggestedConnections: User[];
  suggestedGroups: Group[];
  loading: boolean;
}

const mockConnections: User[] = [
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
    position: 'Product Manager',
    company: 'Google',
    graduationYear: '2020',
    department: 'Computer Science',
    bio: 'Product manager passionate about user experience',
    location: 'Mountain View, CA',
    skills: ['Product Management', 'UX Design', 'Analytics'],
    interests: ['Technology', 'Design', 'Travel'],
    education: [],
    workExperience: [],
    achievements: [],
    contactInfo: { email: 'alex.chen@email.com' },
    isConnected: true,
    profileViews: 892,
    connections: 634
  }
];

const mockSuggestedConnections: User[] = [
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
    position: 'Senior Designer',
    company: 'Airbnb',
    graduationYear: '2019',
    department: 'Design',
    bio: 'UX/UI Designer creating beautiful experiences',
    location: 'San Francisco, CA',
    skills: ['UI/UX Design', 'Figma', 'Prototyping'],
    interests: ['Design', 'Art', 'Music'],
    education: [],
    workExperience: [],
    achievements: [],
    contactInfo: { email: 'maria.rodriguez@email.com' },
    connectionStatus: 'none',
    profileViews: 567,
    connections: 423
  }
];

const mockSuggestedGroups: Group[] = [
  {
    id: '1',
    name: 'Computer Science \'19',
    description: 'Connect with your CS batch mates',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    members: 234,
    isJoined: false,
    category: 'Academic',
    privacy: 'public',
    posts: 156
  },
  {
    id: '2',
    name: 'SF Bay Area Alumni',
    description: 'Alumni living in the San Francisco Bay Area',
    image: 'https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    members: 1247,
    isJoined: true,
    category: 'Location',
    privacy: 'public',
    posts: 892
  }
];

const initialState: NetworkState = {
  connections: mockConnections,
  connectionRequests: [],
  suggestedConnections: mockSuggestedConnections,
  suggestedGroups: mockSuggestedGroups,
  loading: false
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    sendConnectionRequest: (state, action: PayloadAction<string>) => {
      const user = state.suggestedConnections.find(u => u.id === action.payload);
      if (user) {
        user.connectionStatus = 'pending';
      }
    },
    acceptConnectionRequest: (state, action: PayloadAction<string>) => {
      const userIndex = state.connectionRequests.findIndex(u => u.id === action.payload);
      if (userIndex !== -1) {
        const user = state.connectionRequests[userIndex];
        user.isConnected = true;
        state.connections.push(user);
        state.connectionRequests.splice(userIndex, 1);
      }
    },
    joinGroup: (state, action: PayloadAction<string>) => {
      const group = state.suggestedGroups.find(g => g.id === action.payload);
      if (group) {
        group.isJoined = true;
        group.members += 1;
      }
    },
    leaveGroup: (state, action: PayloadAction<string>) => {
      const group = state.suggestedGroups.find(g => g.id === action.payload);
      if (group) {
        group.isJoined = false;
        group.members -= 1;
      }
    }
  }
});

export const { sendConnectionRequest, acceptConnectionRequest, joinGroup, leaveGroup } = networkSlice.actions;
export default networkSlice.reducer;