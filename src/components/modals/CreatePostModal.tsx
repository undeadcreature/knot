import React, { useState } from 'react';
import { FiX, FiImage, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { closeCreateModal } from '../../store/slices/uiSlice';
import { addPost, Post } from '../../store/slices/postsSlice';

export const CreatePostModal: React.FC = () => {
  const { createPostModalOpen, selectedCreateType } = useAppSelector(state => state.ui);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [content, setContent] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  });

  const handleClose = () => {
    dispatch(closeCreateModal());
    setContent('');
    setPollOptions(['', '']);
    setEventData({ title: '', date: '', location: '', description: '' });
  };

  const handleSubmit = () => {
    if (!user || !content.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        position: user.position
      },
      content,
      type: selectedCreateType || 'text',
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
    };

    if (selectedCreateType === 'poll') {
      newPost.pollOptions = pollOptions
        .filter(option => option.trim())
        .map((option, index) => ({
          id: (index + 1).toString(),
          text: option,
          votes: 0
        }));
    }

    if (selectedCreateType === 'event') {
      newPost.eventData = {
        title: eventData.title,
        date: eventData.date,
        location: eventData.location,
        attendees: 0
      };
      newPost.content = eventData.description || content;
    }

    dispatch(addPost(newPost));
    handleClose();
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  if (!createPostModalOpen) return null;

  const getModalTitle = () => {
    switch (selectedCreateType) {
      case 'text': return 'Share your thoughts';
      case 'image': return 'Share a photo';
      case 'poll': return 'Create a poll';
      case 'event': return 'Create an event';
      default: return 'Create post';
    }
  };

  const renderCreateForm = () => {
    switch (selectedCreateType) {
      case 'poll':
        return (
          <div className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ask your question..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Poll Options:</label>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      onClick={() => removePollOption(index)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              
              {pollOptions.length < 5 && (
                <button
                  onClick={addPollOption}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <FiPlus size={16} />
                  <span>Add option</span>
                </button>
              )}
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="Event title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="datetime-local"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                placeholder="Location"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Event description..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <FiImage size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a caption..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>
        );

      default:
        return (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={6}
            autoFocus
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{getModalTitle()}</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-xs text-gray-500">{user?.position}</p>
            </div>
          </div>

          {/* Form */}
          {renderCreateForm()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || (selectedCreateType === 'event' && !eventData.title.trim())}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {selectedCreateType === 'event' ? 'Create Event' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};