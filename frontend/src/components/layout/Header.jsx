import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, Sparkles, Menu, Shield, LogOut, User, ExternalLink, ChevronDown, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FlowMindLogo from '../common/FlowMindLogo';
import ThemeSwitcher from '../common/ThemeSwitcher';

export const Header = ({ onOpenSearch, onOpenNotifications, onToggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-transparent sticky top-0 z-30 px-4 sm:px-8 md:px-12 flex items-center justify-between gap-4 transition-all">
      
      {/* Left: Refined FlowMind Logo & Mobile Hamburger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-full border shadow-sm transition-colors cursor-pointer"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-color, #E5E7EB)',
            color: 'var(--text-secondary, #4B5563)'
          }}
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="flex items-center group">
          <FlowMindLogo size="md" showTagline={true} />
        </Link>
      </div>

      {/* Center: Global Search Pill */}
      <div className="flex-1 max-w-lg mx-4 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full h-11 border rounded-full px-5 flex items-center justify-between text-sm transition-all cursor-pointer text-left shadow-2xs group"
          style={{
            background: 'var(--bg-card, rgba(255, 255, 255, 0.9))',
            borderColor: 'var(--border-color, #E5E7EB)',
            color: 'var(--text-muted, #9CA3AF)'
          }}
        >
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 transition-colors group-hover:text-[var(--text-primary)]" />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary, #4B5563)' }}>
              Search workflows, tasks, employees, approvals...
            </span>
          </div>
          <kbd
            className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full border"
            style={{
              background: 'var(--bg-card-subtle, #F4F5F8)',
              borderColor: 'var(--border-color, #E5E7EB)',
              color: 'var(--text-muted, #6B7280)'
            }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Theme Switcher, AI Status, Notifications & Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        
        {/* Mobile search icon button */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2.5 border rounded-full shadow-sm transition-colors cursor-pointer"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-color, #E5E7EB)',
            color: 'var(--text-secondary, #4B5563)'
          }}
          aria-label="Open Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Engine Status pill */}
        <div
          className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-2xs"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-color, #E5E7EB)',
            color: 'var(--text-primary, #111827)'
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--status-success, #15803D)' }}
          />
          <span className="text-[11px] font-semibold">AI Engine Online</span>
        </div>

        {/* Theme Switcher (Light / Dark / Monochrome) */}
        <ThemeSwitcher />

        {/* AI Copilot shortcut pill */}
        <Link
          to="/copilot"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer"
          style={{
            background: location.pathname === '/copilot'
              ? 'var(--switcher-active-bg, #111827)'
              : 'var(--accent-ai-bg, #F4F2FF)',
            color: location.pathname === '/copilot'
              ? 'var(--switcher-active-text, #FFFFFF)'
              : 'var(--accent-ai-text, #4F46E5)',
            border: `1px solid ${location.pathname === '/copilot' ? 'transparent' : 'var(--accent-ai-border, #DDD6FE)'}`
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Copilot</span>
        </Link>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 border rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-color, #E5E7EB)',
            color: 'var(--text-secondary, #4B5563)'
          }}
          aria-label="Notifications"
          title="Notifications (5 unread)"
        >
          <Bell className="w-4 h-4" />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full ring-2"
            style={{
              background: 'var(--status-danger, #DC2626)',
              ringColor: 'var(--bg-card, #FFFFFF)'
            }}
          />
        </button>

        {/* Settings */}
        <Link
          to="/settings"
          className="p-2.5 border rounded-full shadow-sm hover:shadow transition-all hidden sm:flex items-center justify-center cursor-pointer"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-color, #E5E7EB)',
            color: 'var(--text-secondary, #4B5563)'
          }}
          aria-label="Settings"
          title="Platform Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* User Profile Avatar with Functional Popover Menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(prev => !prev)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer border"
            style={{
              background: 'var(--switcher-active-bg, #111827)',
              color: 'var(--switcher-active-text, #FFFFFF)',
              borderColor: 'var(--border-color, #E5E7EB)'
            }}
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
            aria-label="User Account Menu"
          >
            {user?.avatarInitials || 'PS'}
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div
              className="absolute right-0 mt-3 w-64 rounded-2xl border shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 theme-card"
              style={{
                background: 'var(--bg-card, #FFFFFF)',
                borderColor: 'var(--border-color, #E5E7EB)'
              }}
            >
              {/* User Header Info */}
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-color-subtle, #F3F4F6)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{
                      background: 'var(--switcher-active-bg, #111827)',
                      color: 'var(--switcher-active-text, #FFFFFF)'
                    }}
                  >
                    {user?.avatarInitials || 'PS'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: 'var(--text-primary, #111827)' }}>
                      {user?.name || 'Priya Sharma'}
                    </p>
                    <p className="text-[11px] truncate" style={{ color: 'var(--text-muted, #6B7280)' }}>
                      {user?.email || 'priya.sharma@flowmind.ai'}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 border"
                    style={{
                      background: 'var(--accent-ai-bg, #F4F2FF)',
                      color: 'var(--accent-ai-text, #4F46E5)',
                      borderColor: 'var(--accent-ai-border, #DDD6FE)'
                    }}
                  >
                    <Shield className="w-3 h-3" />
                    Enterprise Architect
                  </span>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="py-1 text-xs">
                <Link
                  to="/team"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:opacity-90 transition-colors"
                  style={{ color: 'var(--text-secondary, #4B5563)' }}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & Team</span>
                </Link>

                <Link
                  to="/copilot"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:opacity-90 transition-colors"
                  style={{ color: 'var(--text-secondary, #4B5563)' }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Copilot Engine</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:opacity-90 transition-colors"
                  style={{ color: 'var(--text-secondary, #4B5563)' }}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Preferences & Security</span>
                </Link>
              </div>

              {/* Sign out */}
              <div className="pt-1 mt-1 border-t" style={{ borderColor: 'var(--border-color-subtle, #F3F4F6)' }}>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (logout) logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:opacity-90 transition-colors text-left cursor-pointer"
                  style={{ color: 'var(--status-danger, #DC2626)' }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default Header;
