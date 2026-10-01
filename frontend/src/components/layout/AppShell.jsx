import React, { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import GlobalSearchModal from './GlobalSearchModal';
import NotificationDrawer from './NotificationDrawer';
import WorkflowDetailsDrawer from '../workflows/WorkflowDetailsDrawer';

// Create a context so any page can open the Workflow Details Drawer or Search Modal
export const ShellContext = createContext();
export const useShell = () => useContext(ShellContext);

export const AppShell = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Selected workflow for the global slide-over drawer
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isWorkflowDrawerOpen, setIsWorkflowDrawerOpen] = useState(false);

  const openWorkflowDrawer = (workflow) => {
    setSelectedWorkflow(workflow);
    setIsWorkflowDrawerOpen(true);
  };

  const closeWorkflowDrawer = () => {
    setIsWorkflowDrawerOpen(false);
  };

  return (
    <ShellContext.Provider value={{
      openWorkflowDrawer,
      closeWorkflowDrawer,
      openSearch: () => setIsSearchOpen(true),
      openNotifications: () => setIsNotificationsOpen(true)
    }}>
      <div
        className="min-h-screen flex flex-col antialiased transition-colors duration-300"
        style={{
          background: 'var(--bg-page, #F8F9FC)',
          color: 'var(--text-primary, #111827)'
        }}
      >
        
        {/* Top Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        />

        <div className="flex-1 flex overflow-hidden">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block shrink-0">
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
            />
          </div>

          {/* Mobile/Tablet Slide-over Sidebar */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div
                className="fixed inset-y-0 left-0 w-64 z-50 shadow-2xl transition-transform"
                style={{ background: 'var(--bg-card, #FFFFFF)' }}
              >
                <Sidebar
                  isMobile={true}
                  onCloseMobile={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main Content Workspace */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 md:py-10 max-w-7xl mx-auto w-full transition-all">
            <Outlet />
          </main>

        </div>

        {/* Global Modals & Drawers */}
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <NotificationDrawer
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectWorkflow={openWorkflowDrawer}
        />

        <WorkflowDetailsDrawer
          workflow={selectedWorkflow}
          isOpen={isWorkflowDrawerOpen}
          onClose={closeWorkflowDrawer}
        />

      </div>
    </ShellContext.Provider>
  );
};

export default AppShell;
