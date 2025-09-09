import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiUserCheck, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';

interface SidebarItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { icon: FiHome, label: 'Home', path: '/' },
  { icon: FiUsers, label: 'My Network', path: '/network', badge: 12 },
  { icon: FiCalendar, label: 'Events', path: '/events', badge: 3 },
  { icon: FiUserCheck, label: 'Mentorship', path: '/mentorship' },
  { icon: FiBriefcase, label: 'Jobs', path: '/jobs', badge: 8 },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useAppSelector(state => state.ui);
  const location = useLocation();

  return (
    <aside className={clsx(
      'hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300',
      sidebarCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group',
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!sidebarCollapsed && (
              <>
                <span className="ml-3 flex-1">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}
      </div>

      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Alumni Network</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Total Connections</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Profile Views</span>
                <span className="font-medium flex items-center">
                  <FiTrendingUp size={12} className="mr-1 text-green-500" />
                  127
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};