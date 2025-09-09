import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiPlus, FiMessageCircle, FiUser } from 'react-icons/fi';
import { useAppDispatch } from '../../hooks';
import { openCreateModal } from '../../store/slices/uiSlice';
import clsx from 'clsx';

export const MobileBottomNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleCreateClick = () => {
    dispatch(openCreateModal('text'));
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-5 h-16">
        <Link
          to="/"
          className={clsx(
            'flex flex-col items-center justify-center space-y-1 transition-colors',
            location.pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <FiHome size={20} />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link
          to="/search"
          className={clsx(
            'flex flex-col items-center justify-center space-y-1 transition-colors',
            location.pathname === '/search' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <FiSearch size={20} />
          <span className="text-xs">Search</span>
        </Link>
        
        <button
          onClick={handleCreateClick}
          className="flex flex-col items-center justify-center space-y-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <FiPlus size={18} className="text-white" />
          </div>
          <span className="text-xs">Create</span>
        </button>
        
        <Link
          to="/messages"
          className={clsx(
            'flex flex-col items-center justify-center space-y-1 transition-colors relative',
            location.pathname === '/messages' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <FiMessageCircle size={20} />
          <span className="text-xs">Messages</span>
          <span className="absolute top-1 right-6 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Link>
        
        <Link
          to="/profile"
          className={clsx(
            'flex flex-col items-center justify-center space-y-1 transition-colors',
            location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <FiUser size={20} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};