import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Group, Job, Event, Post } from '../../types';

interface SearchState {
  query: string;
  activeTab: 'people' | 'groups' | 'jobs' | 'events' | 'posts';
  filters: {
    graduationYear?: string;
    department?: string;
    location?: string;
    company?: string;
    skills?: string[];
    jobType?: string;
    eventCategory?: string;
  };
  results: {
    people: User[];
    groups: Group[];
    jobs: Job[];
    events: Event[];
    posts: Post[];
  };
  loading: boolean;
}

const initialState: SearchState = {
  query: '',
  activeTab: 'people',
  filters: {},
  results: {
    people: [],
    groups: [],
    jobs: [],
    events: [],
    posts: []
  },
  loading: false
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<'people' | 'groups' | 'jobs' | 'events' | 'posts'>) => {
      state.activeTab = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<SearchState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setResults: (state, action: PayloadAction<Partial<SearchState['results']>>) => {
      state.results = { ...state.results, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setQuery, setActiveTab, setFilters, clearFilters, setResults, setLoading } = searchSlice.actions;
export default searchSlice.reducer;