import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'Alex Chen liked your post',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
    actor: {
      id: '2',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop'
    }
  },
  {
    id: '2',
    type: 'connection',
    title: 'Connection Request',
    message: 'Maria Rodriguez wants to connect',
    timestamp: '2024-01-14T15:20:00Z',
    isRead: false,
    actor: {
      id: '3',
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop'
    }
  }
];

const initialState: NotificationsState = {
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.isRead).length,
  loading: false
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.isRead = true);
      state.unreadCount = 0;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    }
  }
});

export const { markAsRead, markAllAsRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;