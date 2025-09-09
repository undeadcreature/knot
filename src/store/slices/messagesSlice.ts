import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Conversation } from '../../types';

interface MessagesState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: { [conversationId: string]: Message[] };
  loading: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    type: 'direct',
    participants: [
      {
        id: '2',
        name: 'Alex Chen',
        email: 'alex.chen@email.com',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop',
        position: 'Product Manager',
        company: 'Google',
        graduationYear: '2020',
        department: 'Computer Science',
        bio: '',
        location: '',
        skills: [],
        interests: [],
        education: [],
        workExperience: [],
        achievements: [],
        contactInfo: { email: 'alex.chen@email.com' },
        profileViews: 0,
        connections: 0
      }
    ],
    lastMessage: {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hey! Great to connect with you',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text',
      isRead: false
    },
    unreadCount: 1
  }
];

const initialState: MessagesState = {
  conversations: mockConversations,
  activeConversation: null,
  messages: {
    '1': [
      {
        id: '1',
        senderId: '2',
        receiverId: '1',
        content: 'Hey! Great to connect with you',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'text',
        isRead: false
      }
    ]
  },
  loading: false
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversation = action.payload;
    },
    sendMessage: (state, action: PayloadAction<{ conversationId: string; message: Omit<Message, 'id' | 'timestamp'> }>) => {
      const { conversationId, message } = action.payload;
      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      
      state.messages[conversationId].push(newMessage);
      
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.lastMessage = newMessage;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    }
  }
});

export const { setActiveConversation, sendMessage, markAsRead } = messagesSlice.actions;
export default messagesSlice.reducer;