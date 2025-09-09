import React from 'react';
import { FiHeart, FiUserPlus, FiMessageCircle, FiCalendar, FiBriefcase, FiUsers, FiCheck } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { markAsRead, markAllAsRead } from '../../store/slices/notificationsSlice';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like': return FiHeart;
    case 'comment': return FiMessageCircle;
    case 'follow': return FiUserPlus;
    case 'connection': return FiUserPlus;
    case 'group_invite': return FiUsers;
    case 'job': return FiBriefcase;
    case 'event': return FiCalendar;
    case 'mention': return FiMessageCircle;
    default: return FiHeart;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'like': return 'text-red-500 bg-red-50';
    case 'comment': return 'text-blue-500 bg-blue-50';
    case 'follow': return 'text-green-500 bg-green-50';
    case 'connection': return 'text-purple-500 bg-purple-50';
    case 'group_invite': return 'text-indigo-500 bg-indigo-50';
    case 'job': return 'text-orange-500 bg-orange-50';
    case 'event': return 'text-pink-500 bg-pink-50';
    case 'mention': return 'text-yellow-500 bg-yellow-50';
    default: return 'text-gray-500 bg-gray-50';
  }
};

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount } = useAppSelector(state => state.notifications);
  const dispatch = useAppDispatch();

  const handleMarkAsRead = (notificationId: string) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'You\'re all caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FiCheck size={16} />
              <span>Mark all as read</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);
            const colorClasses = getNotificationColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={clsx(
                  'p-4 hover:bg-gray-50 transition-colors cursor-pointer',
                  !notification.isRead && 'bg-blue-50'
                )}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={clsx('p-2 rounded-full', colorClasses)}>
                    <IconComponent size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={notification.actor.avatar}
                          alt={notification.actor.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm text-gray-900">
                            <span className="font-semibold">{notification.actor.name}</span>{' '}
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600">When you get notifications, they'll show up here</p>
          </div>
        )}
      </div>
    </div>
  );
};