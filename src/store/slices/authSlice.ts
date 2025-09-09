import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { User } from '../../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  theme: 'light' | 'dark';
}

const initialState: AuthState = {
  isAuthenticated: true, // For demo purposes
  theme: 'light',
  theme: 'light',
  user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
    coverPhoto: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&dpr=2',
    coverPhoto: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&dpr=2',
    position: 'Senior Software Engineer at Meta',
    company: 'Meta',
    company: 'Meta',
    graduationYear: '2019',
    department: 'Computer Science',
    bio: 'Passionate about building products that make a difference. Alumni ambassador and mentor.',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
    interests: ['Technology', 'Mentorship', 'Travel', 'Photography'],
    education: [{
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2015',
      endYear: '2019',
      description: 'Graduated Magna Cum Laude with focus on AI and Machine Learning'
    }],
    workExperience: [{
      id: '1',
      company: 'Meta',
      position: 'Senior Software Engineer',
      startDate: '2021-03',
      current: true,
      description: 'Leading frontend development for core platform features',
      location: 'San Francisco, CA'
    }],
    achievements: [{
      id: '1',
      title: 'Outstanding Alumni Award',
      description: 'Recognized for contributions to the tech industry',
      date: '2023-05',
      type: 'award'
    }],
    contactInfo: {
      email: 'sarah.johnson@email.com',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      website: 'https://sarahjohnson.dev'
    },
    profileViews: 1247,
    connections: 847
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
    interests: ['Technology', 'Mentorship', 'Travel', 'Photography'],
    education: [{
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2015',
      endYear: '2019',
      description: 'Graduated Magna Cum Laude with focus on AI and Machine Learning'
    }],
    workExperience: [{
      id: '1',
      company: 'Meta',
      position: 'Senior Software Engineer',
      startDate: '2021-03',
      current: true,
      description: 'Leading frontend development for core platform features',
      location: 'San Francisco, CA'
    }],
    achievements: [{
      id: '1',
      title: 'Outstanding Alumni Award',
      description: 'Recognized for contributions to the tech industry',
      date: '2023-05',
      type: 'award'
    }],
    contactInfo: {
      email: 'sarah.johnson@email.com',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      website: 'https://sarahjohnson.dev'
    },
    profileViews: 1247,
    connections: 847
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    },
  },
  theme: 'light' | 'dark';
});
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

export const { login, logout, toggleTheme, updateProfile } = authSlice.actions;
export default authSlice.reducer;