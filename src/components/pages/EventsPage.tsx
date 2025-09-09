import React, { useState } from 'react';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiPlus } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleEventAttendance } from '../../store/slices/eventsSlice';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const tabs = ['Upcoming', 'My Events', 'Past Events'] as const;

export const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Upcoming');
  const { upcomingEvents, pastEvents, myEvents } = useAppSelector(state => state.events);
  const dispatch = useAppDispatch();

  const handleToggleAttendance = (eventId: string) => {
    dispatch(toggleEventAttendance(eventId));
  };

  const renderEventCard = (event: any) => (
    <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {event.category}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-gray-600">
            <FiCalendar size={18} />
            <span>{new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <FiMapPin size={18} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <FiUsers size={18} />
            <span>{event.attendees} attending</span>
            {event.maxAttendees && (
              <span className="text-gray-500">/ {event.maxAttendees} max</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">Organized by {event.organizer.name}</span>
          </div>
          <button
            onClick={() => handleToggleAttendance(event.id)}
            className={clsx(
              'px-6 py-2 rounded-lg font-medium transition-colors',
              event.isAttending
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            )}
          >
            {event.isAttending ? 'Attending' : 'RSVP'}
          </button>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {event.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Upcoming':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map(renderEventCard)}
          </div>
        );

      case 'My Events':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myEvents.length > 0 ? (
              myEvents.map(renderEventCard)
            ) : (
              <div className="col-span-2 text-center py-12">
                <FiCalendar className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">You haven't RSVP'd to any events yet</p>
              </div>
            )}
          </div>
        );

      case 'Past Events':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map(renderEventCard)
            ) : (
              <div className="col-span-2 text-center py-12">
                <FiClock className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No past events to show</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">Discover and attend alumni events</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FiPlus size={18} />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab}
                {tab === 'My Events' && myEvents.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {myEvents.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};