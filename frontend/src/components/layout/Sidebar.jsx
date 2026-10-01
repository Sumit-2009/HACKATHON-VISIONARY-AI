import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GitBranch,
  CheckSquare,
  CheckCircle,
  FileText,
  Sparkles,
  BarChart3,
  Cpu,
  Users,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import FlowMindLogo from '../common/FlowMindLogo';

const NAV_ITEMS = [
  { name: 'Command Center', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Workflows', path: '/workflows', icon: GitBranch },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Approvals', path: '/approvals', icon: CheckCircle },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'AI Copilot', path: '/copilot', icon: Sparkles },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Automation', path: '/automation', icon: Cpu },
  { name: 'Team', path: '/team', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = ({
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile,
  isMobile = false
}) => {
  return (
    <aside
      className={`flex flex-col justify-between h-full select-none transition-all duration-300 ${
        isMobile
          ? 'w-64 p-4'
          : isCollapsed
          ? 'w-20 p-3'
          : 'w-64 p-4'
      }`}
    >
      {/* Top Deck: Navigation */}
      <div
        className="rounded-[28px] p-2.5 shadow-sm border transition-all duration-300 flex flex-col theme-card"
        style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderColor: 'var(--border-color, #E5E7EB)'
        }}
      >
        {/* Sidebar Header / Collapse Button */}
        <div className={`flex items-center px-2 py-2 mb-1 ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'}`}>
          {(!isCollapsed || isMobile) ? (
            <span
              className="text-[10px] font-bold uppercase tracking-wider transition-colors"
              style={{ color: 'var(--text-muted, #9CA3AF)' }}
            >
              Platform
            </span>
          ) : null}

          {/* Desktop Collapse Toggle */}
          {!isMobile && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="p-1.5 rounded-full hover:opacity-100 opacity-60 transition-all cursor-pointer"
              style={{
                color: 'var(--text-secondary, #4B5563)',
                background: 'var(--bg-card-subtle, #F4F5F8)'
              }}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                title={isCollapsed && !isMobile ? item.name : undefined}
                className={({ isActive }) => `
                  group relative flex items-center rounded-full text-xs font-semibold transition-all duration-200
                  ${isCollapsed && !isMobile ? 'justify-center px-0 py-2.5 w-full' : 'justify-between px-3.5 py-2.5'}
                  ${isActive
                    ? 'theme-nav-active shadow-sm'
                    : 'theme-nav-inactive hover:opacity-100'
                  }
                `}
                style={({ isActive }) => ({
                  background: isActive ? 'var(--switcher-active-bg, #111827)' : 'transparent',
                  color: isActive ? 'var(--switcher-active-text, #FFFFFF)' : 'var(--text-secondary, #4B5563)'
                })}
              >
                {({ isActive }) => (
                  <>
                    <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'gap-3'}`}>
                      <Icon
                        className="w-4 h-4 transition-colors shrink-0"
                        style={{
                          color: isActive
                            ? 'var(--accent-ai, #818CF8)'
                            : 'currentColor'
                        }}
                      />
                      {(!isCollapsed || isMobile) && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </div>

                    {(!isCollapsed || isMobile) && isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'var(--accent-ai, #6366F1)' }}
                      />
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && !isMobile && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-md theme-card border"
                        style={{
                          background: 'var(--bg-card, #111827)',
                          color: 'var(--text-primary, #FFFFFF)',
                          borderColor: 'var(--border-color, #374151)'
                        }}
                      >
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Deck */}
      <div
        className={`mt-4 rounded-[24px] border shadow-sm transition-all duration-300 theme-card ${
          isCollapsed && !isMobile ? 'p-2 flex flex-col items-center justify-center' : 'p-3.5'
        }`}
        style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderColor: 'var(--border-color, #E5E7EB)'
        }}
        title={isCollapsed && !isMobile ? "AI Engine Online - Guardrails active" : undefined}
      >
        <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: 'var(--status-success-bg, #ECFDF3)',
                color: 'var(--status-success, #15803D)'
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            {(!isCollapsed || isMobile) && (
              <span
                className="text-xs font-bold"
                style={{ color: 'var(--text-primary, #111827)' }}
              >
                AI Guardrails
              </span>
            )}
          </div>

          {(!isCollapsed || isMobile) && (
            <div
              className="flex items-center gap-1.5 text-[11px] font-semibold"
              style={{ color: 'var(--status-success, #15803D)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--status-success, #15803D)' }}
              />
              <span>Active</span>
            </div>
          )}
        </div>

        {(!isCollapsed || isMobile) && (
          <p
            className="text-[11px] mt-2 font-normal leading-tight"
            style={{ color: 'var(--text-muted, #6B7280)' }}
          >
            Predictive SLA monitor running
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
