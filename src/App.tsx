import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import { Layout } from './components/layout/Layout';
import { Feed } from './components/feed/Feed';
import { SearchPage } from './components/pages/SearchPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { NetworkPage } from './components/pages/NetworkPage';
import { EventsPage } from './components/pages/EventsPage';
import { JobsPage } from './components/pages/JobsPage';
import { MentorshipPage } from './components/pages/MentorshipPage';
import { MessagesPage } from './components/pages/MessagesPage';
import { NotificationsPage } from './components/pages/NotificationsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/network" element={<NetworkPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;