import React, { useState } from 'react';
import { FiSend, FiPaperclip, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setActiveConversation, sendMessage, markAsRead } from '../../store/slices/messagesSlice';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

export const MessagesPage: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const { conversations, activeConversation, messages } = useAppSelector(state => state.messages);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
    dispatch(markAsRead(conversationId));
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;

    dispatch(sendMessage({
      conversationId: activeConversation,
      message: {
        senderId: user!.id,
        content: messageText,
        type: 'text',
        isRead: false
      }
    }));

    setMessageText('');
  };

  const activeConversationData = conversations.find(c => c.id === activeConversation);
  const activeMessages = activeConversation ? messages[activeConversation] || [] : [];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => {
              const otherParticipant = conversation.participants[0];
              return (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={clsx(
                    'w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100',
                    activeConversation === conversation.id && 'bg-blue-50 border-blue-200'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={otherParticipant.avatar}
                        alt={otherParticipant.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{otherParticipant.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversationData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={activeConversationData.participants[0].avatar}
                    alt={activeConversationData.participants[0].name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{activeConversationData.participants[0].name}</h3>
                    <p className="text-sm text-gray-600">{activeConversationData.participants[0].position}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiMoreVertical size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeMessages.map((message) => {
                  const isOwnMessage = message.senderId === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={clsx(
                        'flex',
                        isOwnMessage ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={clsx(
                          'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                          isOwnMessage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        )}
                      >
                        <p>{message.content}</p>
                        <p className={clsx(
                          'text-xs mt-1',
                          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                        )}>
                          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiPaperclip size={20} />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSend className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};