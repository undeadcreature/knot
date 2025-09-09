import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types';

interface EventsState {
  upcomingEvents: Event[];
  pastEvents: Event[];
  myEvents: Event[];
  loading: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Alumni Tech Career Fair 2024',
    description: 'Connect with top tech companies and explore career opportunities',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    date: '2024-02-15T18:00:00Z',
    endDate: '2024-02-15T21:00:00Z',
    location: 'University Campus Center',
    organizer: {
      id: '5',
      name: 'Emily Watson',
      avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop'
    },
    attendees: 234,
    maxAttendees: 500,
    isAttending: true,
    category: 'Career',
    tags: ['career', 'networking', 'tech']
  },
  {
    id: '2',
    title: 'Alumni Networking Mixer',
    description: 'Casual networking event for all alumni in the Bay Area',
    date: '2024-01-25T19:00:00Z',
    location: 'Downtown San Francisco',
    organizer: {
      id: '6',
      name: 'Michael Brown',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2&fit=crop'
    },
    attendees: 89,
    isAttending: false,
    category: 'Social',
    tags: ['networking', 'social', 'bay-area']
  }
];

const initialState: EventsState = {
  upcomingEvents: mockEvents,
  pastEvents: [],
  myEvents: mockEvents.filter(e => e.isAttending),
  loading: false
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    toggleEventAttendance: (state, action: PayloadAction<string>) => {
      const event = state.upcomingEvents.find(e => e.id === action.payload);
      if (event) {
        event.isAttending = !event.isAttending;
        event.attendees += event.isAttending ? 1 : -1;
        
        if (event.isAttending) {
          state.myEvents.push(event);
        } else {
          state.myEvents = state.myEvents.filter(e => e.id !== action.payload);
        }
      }
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.upcomingEvents.unshift(action.payload);
    }
  }
});

export const { toggleEventAttendance, addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;