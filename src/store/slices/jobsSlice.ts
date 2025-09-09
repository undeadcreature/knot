import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../types';

interface JobsState {
  jobs: Job[];
  savedJobs: Job[];
  appliedJobs: Job[];
  loading: boolean;
  filters: {
    type?: string;
    location?: string;
    remote?: boolean;
    salaryRange?: [number, number];
  };
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    type: 'full-time',
    remote: true,
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD'
    },
    description: 'Join our team building the future of social technology',
    requirements: ['5+ years React experience', 'TypeScript', 'System design'],
    postedBy: {
      id: '7',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop'
    },
    postedDate: '2024-01-10T10:00:00Z',
    applications: 45,
    isSaved: false,
    hasApplied: false,
    tags: ['react', 'typescript', 'senior']
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'full-time',
    remote: false,
    salary: {
      min: 140000,
      max: 180000,
      currency: 'USD'
    },
    description: 'Lead product strategy for our core platform',
    requirements: ['3+ years PM experience', 'Technical background', 'Analytics'],
    postedBy: {
      id: '8',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop'
    },
    postedDate: '2024-01-08T14:30:00Z',
    applications: 67,
    isSaved: true,
    hasApplied: false,
    tags: ['product', 'strategy', 'analytics']
  }
];

const initialState: JobsState = {
  jobs: mockJobs,
  savedJobs: mockJobs.filter(j => j.isSaved),
  appliedJobs: [],
  loading: false,
  filters: {}
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    toggleSaveJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find(j => j.id === action.payload);
      if (job) {
        job.isSaved = !job.isSaved;
        if (job.isSaved) {
          state.savedJobs.push(job);
        } else {
          state.savedJobs = state.savedJobs.filter(j => j.id !== action.payload);
        }
      }
    },
    applyToJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find(j => j.id === action.payload);
      if (job && !job.hasApplied) {
        job.hasApplied = true;
        job.applications += 1;
        state.appliedJobs.push(job);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  }
});

export const { toggleSaveJob, applyToJob, setFilters } = jobsSlice.actions;
export default jobsSlice.reducer;