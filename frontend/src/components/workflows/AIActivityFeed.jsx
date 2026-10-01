import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Clock,
  Filter,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    timeAgo: '2 min ago',
    type: 'optimization',
    title: 'Finance approval workflow optimized',
    description: '12 tasks rerouted automatically to secondary finance controllers.',
    workflowId: 'WF-2045',
    impact: 'Saved ~2.4 hours',
    icon: Sparkles,
    color: 'text-indigo-500',
    dotColor: 'bg-indigo-500'
  },
  {
    id: 'act-2',
    timeAgo: '8 min ago',
    type: 'bottleneck',
    title: 'Bottleneck detected',
    description: 'Employee onboarding workflow — 18 min delay at IT Access Provisioning.',
    workflowId: 'WF-2048',
    impact: 'SLA Risk: Medium',
    icon: AlertTriangle,
    color: 'text-red-500',
    dotColor: 'bg-red-500'
  },
  {
    id: 'act-3',
    timeAgo: '14 min ago',
    type: 'approval',
    title: 'Approval completed',
    description: 'Purchase request #WF-2841 signed by VP Operations within 14 minutes.',
    workflowId: 'WF-2841',
    impact: 'Policy compliant',
    icon: CheckCircle2,
    color: 'text-green-500',
    dotColor: 'bg-green-500'
  },
  {
    id: 'act-4',
    timeAgo: '21 min ago',
    type: 'automation',
    title: 'AI recommendation applied',
    description: 'Low-risk approvals automatically routed based on machine confidence > 98%.',
    workflowId: 'AUTO-01',
    impact: 'Auto-pilot active',
    icon: Cpu,
    color: 'text-blue-500',
    dotColor: 'bg-blue-500'
  }
];

export const AIActivityFeed = ({ className = '' }) => {
  const [filter, setFilter] = useState('all');
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [isExpanded, setIsExpanded] = useState(false);

  const filtered = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);

  return (
    <section
      className={`rounded-[32px] p-6 sm:p-8 border shadow-xs transition-all duration-300 theme-card ${className}`}
      style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderColor: 'var(--border-color, #E5E7EB)'
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5"
              style={{
                background: 'var(--accent-ai-bg, #F4F2FF)',
                color: 'var(--accent-ai-text, #4F46E5)',
                borderColor: 'var(--accent-ai-border, #DDD6FE)'
              }}
            >
              <Activity className="w-3 h-3 animate-pulse" />
              Live Stream
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--status-success, #15803D)' }}
            >
              ● Real-time event bus
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight mt-1.5"
            style={{ color: 'var(--text-primary, #111827)' }}
          >
            AI Activity
          </h2>
          <p
            className="text-xs sm:text-sm mt-0.5"
            style={{ color: 'var(--text-secondary, #6B7280)' }}
          >
            Autonomous optimizations, anomaly detections, and workflow events
          </p>
        </div>

        {/* Filter Pills */}
        <div
          className="flex items-center gap-1 p-1 rounded-full border self-start sm:self-auto text-xs"
          style={{
            background: 'var(--bg-card-subtle, #F4F5F8)',
            borderColor: 'var(--border-color, #E5E7EB)'
          }}
        >
          {['all', 'optimization', 'bottleneck', 'approval', 'automation'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full capitalize font-semibold transition-all cursor-pointer ${
                filter === f
                  ? 'shadow-xs'
                  : 'hover:opacity-100 opacity-65'
              }`}
              style={{
                background: filter === f ? 'var(--switcher-active-bg, #111827)' : 'transparent',
                color: filter === f ? 'var(--switcher-active-text, #FFFFFF)' : 'var(--text-secondary, #4B5563)'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-xs group"
              style={{
                background: 'var(--bg-card-subtle, #F9FAFB)',
                borderColor: 'var(--border-color-subtle, #F3F4F6)'
              }}
            >
              {/* Event Type Icon badge */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  background: 'var(--bg-card, #FFFFFF)',
                  borderColor: 'var(--border-color, #E5E7EB)'
                }}
              >
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
                    <h3
                      className="text-xs sm:text-sm font-bold truncate group-hover:text-indigo-600 transition-colors"
                      style={{ color: 'var(--text-primary, #111827)' }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <span
                    className="text-[11px] shrink-0 font-medium"
                    style={{ color: 'var(--text-muted, #9CA3AF)' }}
                  >
                    {item.timeAgo}
                  </span>
                </div>

                <p
                  className="text-xs mt-1 leading-relaxed"
                  style={{ color: 'var(--text-secondary, #4B5563)' }}
                >
                  {item.description}
                </p>

                <div className="mt-2.5 flex items-center gap-2 text-[11px]">
                  <span
                    className="font-mono px-2 py-0.5 rounded-md border"
                    style={{
                      background: 'var(--bg-card, #FFFFFF)',
                      borderColor: 'var(--border-color, #E5E7EB)',
                      color: 'var(--text-secondary, #4B5563)'
                    }}
                  >
                    {item.workflowId}
                  </span>

                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-muted, #6B7280)' }}
                  >
                    • {item.impact}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer: View All Activity */}
      <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color-subtle, #F3F4F6)' }}>
        <span className="text-xs" style={{ color: 'var(--text-muted, #9CA3AF)' }}>
          Showing {filtered.length} recent system telemetries
        </span>

        <Link
          to="/analytics"
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2 cursor-pointer"
          style={{ color: 'var(--accent-ai-text, #4F46E5)' }}
        >
          <span>View All Activity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default AIActivityFeed;
