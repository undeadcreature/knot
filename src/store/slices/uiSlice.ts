import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  createPostModalOpen: boolean;
  selectedCreateType: 'text' | 'image' | 'poll' | 'event' | null;
  sidebarCollapsed: boolean;
  searchQuery: string;
}

const initialState: UiState = {
  createPostModalOpen: false,
  selectedCreateType: null,
  sidebarCollapsed: false,
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreateModal: (state, action: PayloadAction<'text' | 'image' | 'poll' | 'event'>) => {
      state.createPostModalOpen = true;
      state.selectedCreateType = action.payload;
    },
    closeCreateModal: (state) => {
      state.createPostModalOpen = false;
      state.selectedCreateType = null;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { openCreateModal, closeCreateModal, toggleSidebar, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;