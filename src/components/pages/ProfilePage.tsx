import React, { useState } from 'react';
import { FiMapPin, FiCalendar, FiMail, FiLinkedin, FiGlobe, FiEdit3, FiUserPlus, FiMessageCircle } from 'react-icons/fi';
import { useAppSelector } from '../../hooks';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const tabs = ['Overview', 'Posts', 'About', 'Activity'] as const;

export const ProfilePage: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { feed } = useAppSelector(state => state.posts);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Overview');

  if (!user) return null;

  const userPosts = feed.filter(post => post.author.id === user.id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700">{user.bio}</p>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
              <div className="space-y-4">
                {user.workExperience.map((exp) => (
                  <div key={exp.id} className="flex space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {exp.company.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                {user.education.map((edu) => (
                  <div key={edu.id} className="flex space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {edu.institution.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500">{edu.startYear} - {edu.endYear}</p>
                      {edu.description && (
                        <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Posts':
        return (
          <div className="space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-900 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
                    <div className="flex space-x-4">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </div>
        );

      case 'About':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FiMail className="text-gray-400" size={18} />
                    <span className="text-gray-700">{user.contactInfo.email}</span>
                  </div>
                  {user.contactInfo.linkedin && (
                    <div className="flex items-center space-x-3">
                      <FiLinkedin className="text-gray-400" size={18} />
                      <a href={user.contactInfo.linkedin} className="text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {user.contactInfo.website && (
                    <div className="flex items-center space-x-3">
                      <FiGlobe className="text-gray-400" size={18} />
                      <a href={user.contactInfo.website} className="text-blue-600 hover:underline">
                        Personal Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                <div className="space-y-3">
                  {user.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-600 text-sm">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Activity':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <p className="text-gray-500">Activity feed coming soon</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          {user.coverPhoto && (
            <img
              src={user.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg text-white hover:bg-opacity-30 transition-colors">
            <FiEdit3 size={18} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white -mt-12 relative z-10 object-cover"
              />
              <div className="pt-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-lg text-gray-600">{user.position}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FiMapPin size={14} />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiCalendar size={14} />
                    <span>Class of {user.graduationYear}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-3 text-sm">
                  <span><strong>{user.connections}</strong> connections</span>
                  <span><strong>{user.profileViews}</strong> profile views</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiUserPlus size={16} />
                <span>Connect</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FiMessageCircle size={16} />
                <span>Message</span>
              </button>
            </div>
          </div>
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