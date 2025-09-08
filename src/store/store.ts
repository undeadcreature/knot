import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import postsSlice from './slices/postsSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    ui: uiSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;