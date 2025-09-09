import React, { useState } from 'react';
import { FiBriefcase, FiMapPin, FiDollarSign, FiBookmark, FiFilter, FiSearch } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleSaveJob, applyToJob } from '../../store/slices/jobsSlice';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const tabs = ['All Jobs', 'Saved', 'Applied'] as const;

export const JobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('All Jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs, savedJobs, appliedJobs } = useAppSelector(state => state.jobs);
  const dispatch = useAppDispatch();

  const handleSaveJob = (jobId: string) => {
    dispatch(toggleSaveJob(jobId));
  };

  const handleApplyToJob = (jobId: string) => {
    dispatch(applyToJob(jobId));
  };

  const renderJobCard = (job: any) => (
    <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-lg text-gray-700 mb-2">{job.company}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <FiMapPin size={14} />
              <span>{job.location}</span>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {job.type}
            </span>
            {job.remote && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Remote
              </span>
            )}
          </div>
          {job.salary && (
            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-3">
              <FiDollarSign size={14} />
              <span>
                ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => handleSaveJob(job.id)}
          className={clsx(
            'p-2 rounded-lg transition-colors',
            job.isSaved
              ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          )}
        >
          <FiBookmark size={20} className={job.isSaved ? 'fill-current' : ''} />
        </button>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {job.requirements.slice(0, 3).map((req, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={job.postedBy.avatar}
            alt={job.postedBy.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-600">Posted by {job.postedBy.name}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className="text-sm text-gray-500">{job.applications} applicants</span>
          <button
            onClick={() => handleApplyToJob(job.id)}
            disabled={job.hasApplied}
            className={clsx(
              'px-6 py-2 rounded-lg font-medium transition-colors',
              job.hasApplied
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            )}
          >
            {job.hasApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {job.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'All Jobs':
        return (
          <div className="space-y-6">
            {jobs.map(renderJobCard)}
          </div>
        );

      case 'Saved':
        return (
          <div className="space-y-6">
            {savedJobs.length > 0 ? (
              savedJobs.map(renderJobCard)
            ) : (
              <div className="text-center py-12">
                <FiBookmark className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No saved jobs yet</p>
              </div>
            )}
          </div>
        );

      case 'Applied':
        return (
          <div className="space-y-6">
            {appliedJobs.length > 0 ? (
              appliedJobs.map(renderJobCard)
            ) : (
              <div className="text-center py-12">
                <FiBriefcase className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No job applications yet</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Jobs & Opportunities</h1>
            <p className="text-gray-600">Discover career opportunities from the alumni network</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies, skills..."
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
                {tab === 'Saved' && savedJobs.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {savedJobs.length}
                  </span>
                )}
                {tab === 'Applied' && appliedJobs.length > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {appliedJobs.length}
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