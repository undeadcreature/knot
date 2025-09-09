import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  currentTheme: 'light' | 'dark';
}

const initialState: ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;