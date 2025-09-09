import React, { useState } from 'react';
import { FiStar, FiUser, FiFilter, FiSearch } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { requestMentorship } from '../../store/slices/mentorshipSlice';
import clsx from 'clsx';

const tabs = ['Find Mentors', 'My Mentors', 'My Mentees'] as const;

export const MentorshipPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Find Mentors');
  const [searchQuery, setSearchQuery] = useState('');
  const { mentors, myMentors, myMentees } = useAppSelector(state => state.mentorship);
  const dispatch = useAppDispatch();

  const handleRequestMentorship = (mentorId: string) => {
    dispatch(requestMentorship(mentorId));
  };

  const renderMentorCard = (mentor: any, showRequestButton = true) => (
    <div key={mentor.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{mentor.name}</h3>
          <p className="text-gray-600 mb-2">{mentor.position} at {mentor.company}</p>
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <FiStar className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm font-medium">{mentor.rating}</span>
              <span className="text-sm text-gray-500">({mentor.reviews} reviews)</span>
            </div>
            <span className="text-sm text-gray-500">{mentor.experience} years experience</span>
          </div>
          <p className="text-sm text-gray-700 mb-4">{mentor.bio}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.expertise.slice(0, 4).map((skill) => (
              <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={clsx(
                'w-3 h-3 rounded-full',
                mentor.availability === 'available' ? 'bg-green-400' :
                mentor.availability === 'busy' ? 'bg-yellow-400' : 'bg-red-400'
              )}></div>
              <span className="text-sm text-gray-600 capitalize">{mentor.availability}</span>
            </div>
            {showRequestButton && (
              <button
                onClick={() => handleRequestMentorship(mentor.id)}
                disabled={mentor.availability === 'unavailable'}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  mentor.availability === 'unavailable'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                Request Mentorship
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Find Mentors':
        return (
          <div className="space-y-6">
            {mentors.map(mentor => renderMentorCard(mentor, true))}
          </div>
        );

      case 'My Mentors':
        return (
          <div className="space-y-6">
            {myMentors.length > 0 ? (
              myMentors.map(mentor => renderMentorCard(mentor, false))
            ) : (
              <div className="text-center py-12">
                <FiUser className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">You don't have any mentors yet</p>
                <p className="text-sm text-gray-400 mt-2">Browse available mentors to get started</p>
              </div>
            )}
          </div>
        );

      case 'My Mentees':
        return (
          <div className="space-y-6">
            {myMentees.length > 0 ? (
              myMentees.map(mentee => renderMentorCard(mentee, false))
            ) : (
              <div className="text-center py-12">
                <FiUser className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">You don't have any mentees yet</p>
                <p className="text-sm text-gray-400 mt-2">Consider becoming a mentor to help others</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Mentorship</h1>
            <p className="text-gray-600">Connect with experienced alumni or share your expertise</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Become a Mentor
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by expertise, company, or name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiFilter size={18} />
            <span>Filters</span>
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
                {tab === 'My Mentors' && myMentors.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {myMentors.length}
                  </span>
                )}
                {tab === 'My Mentees' && myMentees.length > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {myMentees.length}
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