import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import postsSlice from './slices/postsSlice';
import uiSlice from './slices/uiSlice';
import searchSlice from './slices/searchSlice';
import networkSlice from './slices/networkSlice';
import eventsSlice from './slices/eventsSlice';
import jobsSlice from './slices/jobsSlice';
import mentorshipSlice from './slices/mentorshipSlice';
import messagesSlice from './slices/messagesSlice';
import notificationsSlice from './slices/notificationsSlice';
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeReducer,
    posts: postsSlice,
    ui: uiSlice,
    search: searchSlice,
    network: networkSlice,
    events: eventsSlice,
    jobs: jobsSlice,
    mentorship: mentorshipSlice,
    messages: messagesSlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
