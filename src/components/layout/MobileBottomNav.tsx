import React from 'react';
import { FiHome, FiSearch, FiPlus, FiMessageCircle, FiUser } from 'react-icons/fi';
import { useAppDispatch } from '../../hooks';
import { openCreateModal } from '../../store/slices/uiSlice';

export const MobileBottomNav: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCreateClick = () => {
    dispatch(openCreateModal('text'));
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-5 h-16">
        <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-gray-700 transition-colors">
          <FiHome size={20} />
          <span className="text-xs">Home</span>
        </button>
        
        <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-gray-700 transition-colors">
          <FiSearch size={20} />
          <span className="text-xs">Search</span>
        </button>
        
        <button
          onClick={handleCreateClick}
          className="flex flex-col items-center justify-center space-y-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <FiPlus size={18} className="text-white" />
          </div>
          <span className="text-xs">Create</span>
        </button>
        
        <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-gray-700 transition-colors relative">
          <FiMessageCircle size={20} />
          <span className="text-xs">Messages</span>
          <span className="absolute top-1 right-6 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        
        <button className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-gray-700 transition-colors">
          <FiUser size={20} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};