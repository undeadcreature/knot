import React from 'react';
import { FiSearch, FiMessageCircle, FiBell, FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSearchQuery, toggleSidebar } from '../../store/slices/uiSlice';
import { toggleTheme } from '../../store/slices/themeSlice'; 
import clsx from 'clsx';

export const TopNavigation: React.FC = () => {
  const { user, theme } = useAppSelector(state => state.auth);
  const { searchQuery } = useAppSelector(state => state.ui);
  const { unreadCount } = useAppSelector(state => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMenu size={20} />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Knot</h1>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder="Search alumni, posts, events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
              <FiMessageCircle size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button className="ml-3 flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.avatar}
                alt={user?.name}
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};