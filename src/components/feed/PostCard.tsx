import React from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark, FiCalendar, FiMapPin, FiUsers, FiBarChart } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../../store/slices/postsSlice';
import { useAppDispatch } from '../../hooks';
import { toggleLike, toggleSave } from '../../store/slices/postsSlice';
import clsx from 'clsx';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleLike = () => {
    dispatch(toggleLike(post.id));
  };

  const handleSave = () => {
    dispatch(toggleSave(post.id));
  };

  const renderPostContent = () => {
    switch (post.type) {
      case 'image':
        return (
          <div className="space-y-4">
            <p className="text-gray-900">{post.content}</p>
            {post.image && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        );

      case 'poll':
        return (
          <div className="space-y-4">
            <p className="text-gray-900">{post.content}</p>
            {post.pollOptions && (
              <div className="space-y-2">
                {post.pollOptions.map((option) => {
                  const totalVotes = post.pollOptions!.reduce((sum, opt) => sum + opt.votes, 0);
                  const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                  
                  return (
                    <div key={option.id} className="relative">
                      <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <span className="text-sm font-medium text-gray-900">{option.text}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{option.votes} votes</span>
                          <FiBarChart size={14} className="text-gray-400" />
                        </div>
                      </div>
                      <div
                        className="absolute left-0 top-0 h-full bg-blue-100 rounded-lg transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  );
                })}
                <p className="text-xs text-gray-500 mt-2">
                  {post.pollOptions.reduce((sum, opt) => sum + opt.votes, 0)} total votes
                </p>
              </div>
            )}
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <p className="text-gray-900">{post.content}</p>
            {post.eventData && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{post.eventData.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiCalendar size={16} />
                    <span>{new Date(post.eventData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiMapPin size={16} />
                    <span>{post.eventData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiUsers size={16} />
                    <span>{post.eventData.attendees} attendees</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Register for Event
                </button>
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{post.author.name}</h3>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">{post.author.position}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {renderPostContent()}
      </div>

      {/* Engagement Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={clsx(
                'flex items-center space-x-2 text-sm transition-colors',
                post.isLiked
                  ? 'text-red-600 hover:text-red-700'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <FiHeart size={18} className={post.isLiked ? 'fill-current' : ''} />
              <span className="font-medium">{post.likes}</span>
            </button>

            <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <FiMessageCircle size={18} />
              <span className="font-medium">{post.comments}</span>
            </button>

            <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <FiShare2 size={18} />
              <span className="font-medium">{post.shares}</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              post.isSaved
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            )}
          >
            <FiBookmark size={18} className={post.isSaved ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};