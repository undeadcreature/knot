import React from 'react';
import { FiSearch, FiFilter, FiUsers, FiBriefcase, FiCalendar, FiFileText } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setQuery, setActiveTab, setFilters } from '../../store/slices/searchSlice';
import clsx from 'clsx';

const tabs = [
  { id: 'people', label: 'People', icon: FiUsers },
  { id: 'groups', label: 'Groups', icon: FiUsers },
  { id: 'jobs', label: 'Jobs', icon: FiBriefcase },
  { id: 'events', label: 'Events', icon: FiCalendar },
  { id: 'posts', label: 'Posts', icon: FiFileText }
] as const;

export const SearchPage: React.FC = () => {
  const { query, activeTab, filters, results, loading } = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();

  const handleTabChange = (tab: typeof activeTab) => {
    dispatch(setActiveTab(tab));
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="flex space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'people') {
      return (
        <div className="space-y-4">
          {results.people.map((person) => (
            <div key={person.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-sm text-gray-600">{person.position}</p>
                    <p className="text-xs text-gray-500">{person.location}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Connect
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-700">{person.bio}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {person.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found for "{query}"</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search alumni, posts, events..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiFilter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={clsx(
                'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {renderResults()}
    </div>
  );
};