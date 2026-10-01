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
        className="min-h-screen antialiased transition-colors duration-300 relative"
        style={{
          background: 'var(--bg-page, #F8F9FC)',
          color: 'var(--text-primary, #111827)'
        }}
      >
        {/* Fixed Left Desktop Sidebar (pinned to viewport, never scrolls away) */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        />

        {/* Mobile/Tablet Slide-over Sidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
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

        {/* Main Content & Header Area - Offset with Left Padding so content never goes under fixed sidebar */}
        <div
          className={`flex flex-col min-h-screen transition-all duration-300 ${
            isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
        >
          {/* Top Header */}
          <Header
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
          />

          {/* Main Content Workspace */}
          <main className="flex-1 px-4 sm:px-8 md:px-12 py-6 md:py-8 max-w-7xl mx-auto w-full transition-all">
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
