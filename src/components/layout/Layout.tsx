import React from 'react';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { CreatePostModal } from '../modals/CreatePostModal';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useAppSelector(state => state.ui);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <Sidebar />
      
      <main className={clsx(
        'pt-4 pb-20 lg:pb-4 transition-all duration-300',
        'lg:ml-64 xl:mr-80',
        sidebarCollapsed && 'lg:ml-16'
      )}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      
      <RightSidebar />
      <MobileBottomNav />
      <CreatePostModal />
    </div>
  );
};