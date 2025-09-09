import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mentor } from '../../types';

interface MentorshipState {
  mentors: Mentor[];
  myMentors: Mentor[];
  myMentees: Mentor[];
  loading: boolean;
  filters: {
    expertise?: string[];
    experience?: number;
    availability?: string;
  };
}

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
    position: 'Senior Software Engineer',
    company: 'Meta',
    expertise: ['React', 'TypeScript', 'System Design', 'Career Growth'],
    experience: 8,
    rating: 4.9,
    reviews: 23,
    bio: 'Passionate about helping junior developers grow their careers in tech',
    availability: 'available'
  },
  {
    id: '2',
    name: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
    position: 'Product Manager',
    company: 'Google',
    expertise: ['Product Strategy', 'User Research', 'Analytics', 'Leadership'],
    experience: 6,
    rating: 4.8,
    reviews: 18,
    bio: 'Helping aspiring PMs navigate their career journey',
    availability: 'available'
  }
];

const initialState: MentorshipState = {
  mentors: mockMentors,
  myMentors: [],
  myMentees: [],
  loading: false,
  filters: {}
};

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {
    requestMentorship: (state, action: PayloadAction<string>) => {
      const mentor = state.mentors.find(m => m.id === action.payload);
      if (mentor) {
        state.myMentors.push(mentor);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<MentorshipState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  }
});

export const { requestMentorship, setFilters } = mentorshipSlice.actions;
export default mentorshipSlice.reducer;