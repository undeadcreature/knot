import React from 'react';
import { FiEdit3, FiImage, FiBarChart, FiCalendar } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { openCreateModal } from '../../store/slices/uiSlice';

export const CreatePostPrompt: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex space-x-3">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <button
            onClick={() => dispatch(openCreateModal('text'))}
            className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            Share your thoughts with the alumni community...
          </button>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-6">
              <button
                onClick={() => dispatch(openCreateModal('text'))}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <FiEdit3 size={18} />
                <span className="hidden sm:inline">Write</span>
              </button>
              
              <button
                onClick={() => dispatch(openCreateModal('image'))}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <FiImage size={18} />
                <span className="hidden sm:inline">Photo</span>
              </button>
              
              <button
                onClick={() => dispatch(openCreateModal('poll'))}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <FiBarChart size={18} />
                <span className="hidden sm:inline">Poll</span>
              </button>
              
              <button
                onClick={() => dispatch(openCreateModal('event'))}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <FiCalendar size={18} />
                <span className="hidden sm:inline">Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};