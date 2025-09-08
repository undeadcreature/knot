import React from 'react';
import { FiUsers, FiCalendar, FiArrowRight } from 'react-icons/fi';

const suggestedGroups = [
  {
    id: '1',
    name: 'Computer Science \'22',
    members: 234,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2'
  },
  {
    id: '2',
    name: 'NYC Alumni',
    members: 1247,
    image: 'https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2'
  },
  {
    id: '3',
    name: 'Startup Founders',
    members: 456,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Alumni Tech Meetup',
    date: '2024-01-20',
    attendees: 89,
    location: 'Virtual'
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    date: '2024-02-15',
    attendees: 234,
    location: 'Campus Center'
  },
  {
    id: '3',
    title: 'Mentorship Workshop',
    date: '2024-02-28',
    attendees: 67,
    location: 'Online'
  }
];

export const RightSidebar: React.FC = () => {
  return (
    <aside className="hidden xl:block w-80 fixed right-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white border-l border-gray-200">
      <div className="p-4 space-y-6">
        {/* Suggested Groups */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiUsers className="mr-2" size={20} />
              Suggested Groups
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {suggestedGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.name}</p>
                    <p className="text-xs text-gray-500">{group.members.toLocaleString()} members</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 p-1">
                  <FiArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiCalendar className="mr-2" size={20} />
              Upcoming Events
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <h4 className="text-sm font-medium text-gray-900 mb-1">{event.title}</h4>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                  <p className="text-xs text-gray-500">{event.attendees} attending</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Impact</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Posts this month</span>
              <span className="text-xs font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Connections made</span>
              <span className="text-xs font-medium text-gray-900">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-600">Events attended</span>
              <span className="text-xs font-medium text-gray-900">3</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};