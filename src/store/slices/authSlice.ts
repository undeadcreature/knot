import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  graduationYear: string;
  department: string;
  bio: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: true, // For demo purposes
  user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
    position: 'Senior Software Engineer at Meta',
    graduationYear: '2019',
    department: 'Computer Science',
    bio: 'Passionate about building products that make a difference. Alumni ambassador and mentor.'
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
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;