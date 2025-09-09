import React, { useState } from 'react';
import { FiUsers, FiUserPlus, FiUserCheck, FiX, FiCheck } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { sendConnectionRequest, acceptConnectionRequest, joinGroup } from '../../store/slices/networkSlice';
import clsx from 'clsx';

const tabs = ['Connections', 'Requests', 'Suggestions', 'Groups'] as const;

export const NetworkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Connections');
  const { connections, connectionRequests, suggestedConnections, suggestedGroups } = useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const handleConnect = (userId: string) => {
    dispatch(sendConnectionRequest(userId));
  };

  const handleAcceptRequest = (userId: string) => {
    dispatch(acceptConnectionRequest(userId));
  };

  const handleJoinGroup = (groupId: string) => {
    dispatch(joinGroup(groupId));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Connections':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection) => (
              <div key={connection.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{connection.position}</p>
                  <p className="text-xs text-gray-500 mb-4">{connection.location}</p>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'Requests':
        return (
          <div className="space-y-4">
            {connectionRequests.length > 0 ? (
              connectionRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={request.avatar}
                        alt={request.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-600">{request.position}</p>
                        <p className="text-xs text-gray-500">{request.location}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FiCheck size={16} />
                        <span>Accept</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiX size={16} />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FiUsers className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No connection requests</p>
              </div>
            )}
          </div>
        );

      case 'Suggestions':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedConnections.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900">{suggestion.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{suggestion.position}</p>
                  <p className="text-xs text-gray-500 mb-4">{suggestion.location}</p>
                  <button
                    onClick={() => handleConnect(suggestion.id)}
                    disabled={suggestion.connectionStatus === 'pending'}
                    className={clsx(
                      'w-full px-4 py-2 rounded-lg transition-colors',
                      suggestion.connectionStatus === 'pending'
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    )}
                  >
                    {suggestion.connectionStatus === 'pending' ? 'Request Sent' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'Groups':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{group.members.toLocaleString()} members</span>
                    <span>{group.posts} posts</span>
                  </div>
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className={clsx(
                      'w-full px-4 py-2 rounded-lg transition-colors',
                      group.isJoined
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    )}
                  >
                    {group.isJoined ? 'Joined' : 'Join Group'}
                  </button>
                </div>
              </div>
            ))}
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Network</h1>
        <p className="text-gray-600">Manage your professional connections and discover new opportunities</p>
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
                {tab === 'Requests' && connectionRequests.length > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {connectionRequests.length}
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