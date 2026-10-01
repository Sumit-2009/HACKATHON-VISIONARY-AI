import React from 'react';
import {
  FileCheck,
  Sparkles,
  UserCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';

export const WorkflowVisualizer = ({ className = '' }) => {
  const stages = [
    {
      id: 'step-1',
      name: 'Request',
      subtitle: 'Intake & Validation',
      status: 'completed',
      duration: '12m',
      icon: FileCheck,
      details: 'All metadata validated'
    },
    {
      id: 'step-2',
      name: 'AI Analysis',
      subtitle: 'Path Optimization',
      status: 'completed',
      duration: '1.4s',
      icon: Sparkles,
      details: 'Autonomous risk score: 94%',
      isAI: true
    },
    {
      id: 'step-3',
      name: 'Approval',
      subtitle: 'Manager Gate',
      status: 'bottleneck', // Current bottleneck stage
      duration: '5.4 hrs pending',
      icon: UserCheck,
      details: '23 tasks delayed (>4h queue)',
      isCurrent: true,
      hasIntervention: true
    },
    {
      id: 'step-4',
      name: 'Execution',
      subtitle: 'ERP & IAM Provision',
      status: 'upcoming',
      duration: 'Est. 1.2 hrs',
      icon: Play,
      details: 'Queued behind approval'
    },
    {
      id: 'step-5',
      name: 'Completed',
      subtitle: 'Audit Verification',
      status: 'upcoming',
      duration: 'Final step',
      icon: CheckCircle2,
      details: 'SLA target: 8.0 hrs'
    }
  ];

  return (
    <section
      className={`rounded-[32px] p-6 sm:p-8 border shadow-xs transition-all duration-300 theme-card ${className}`}
      style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderColor: 'var(--border-color, #E5E7EB)'
      }}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
              style={{
                background: 'var(--accent-ai-bg, #F4F2FF)',
                color: 'var(--accent-ai-text, #4F46E5)',
                borderColor: 'var(--accent-ai-border, #DDD6FE)'
              }}
            >
              Live Telemetry
            </span>
            <span
              className="text-xs font-semibold flex items-center gap-1.5"
              style={{ color: 'var(--status-danger, #DC2626)' }}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Bottleneck Active: Manager Approval
            </span>
          </div>

          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight mt-1.5"
            style={{ color: 'var(--text-primary, #111827)' }}
          >
            Workflow Execution Pipeline
          </h2>
          <p
            className="text-xs sm:text-sm mt-0.5"
            style={{ color: 'var(--text-secondary, #6B7280)' }}
          >
            Real-time stage transitions with AI predictive guardrails and delay detection
          </p>
        </div>

        {/* Telemetry quick status chips */}
        <div className="flex items-center gap-2 text-xs">
          <div
            className="px-3 py-1.5 rounded-full border flex items-center gap-1.5"
            style={{
              background: 'var(--bg-card-subtle, #F9FAFB)',
              borderColor: 'var(--border-color, #E5E7EB)',
              color: 'var(--text-secondary, #4B5563)'
            }}
          >
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Avg Processing: <strong>8.4 hrs</strong></span>
          </div>

          <div
            className="px-3 py-1.5 rounded-full border flex items-center gap-1.5"
            style={{
              background: 'var(--bg-card-subtle, #F9FAFB)',
              borderColor: 'var(--border-color, #E5E7EB)',
              color: 'var(--text-secondary, #4B5563)'
            }}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Auto-Escalation: <strong>At 5.0h</strong></span>
          </div>
        </div>
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="overflow-x-auto pb-2 pt-2 -mx-2 px-2">
        <div className="flex items-stretch min-w-[700px] gap-2 md:gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = stage.status === 'completed';
            const isBottleneck = stage.status === 'bottleneck';
            const isUpcoming = stage.status === 'upcoming';

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Node Box */}
                <div
                  className={`flex-1 rounded-2xl p-4 border transition-all duration-200 relative flex flex-col justify-between ${
                    isBottleneck
                      ? 'ring-2 ring-red-500/20 shadow-md'
                      : isCompleted
                      ? 'shadow-2xs opacity-90 hover:opacity-100'
                      : 'opacity-70 hover:opacity-90'
                  }`}
                  style={{
                    background: isBottleneck
                      ? 'var(--status-danger-bg, #FEF2F2)'
                      : isCompleted
                      ? 'var(--bg-card-subtle, #F9FAFB)'
                      : 'var(--bg-card, #FFFFFF)',
                    borderColor: isBottleneck
                      ? 'var(--status-danger, #DC2626)'
                      : 'var(--border-color, #E5E7EB)'
                  }}
                >
                  {/* Top: Icon + Stage Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        background: isBottleneck
                          ? 'var(--status-danger, #DC2626)'
                          : isCompleted
                          ? 'var(--status-success, #15803D)'
                          : 'var(--bg-card, #FFFFFF)',
                        color: (isBottleneck || isCompleted)
                          ? '#FFFFFF'
                          : 'var(--text-muted, #9CA3AF)',
                        border: isUpcoming ? '1px solid var(--border-color, #E5E7EB)' : 'none'
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Stage status indicator pill */}
                    {isBottleneck ? (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 animate-pulse"
                        style={{
                          background: '#FFFFFF',
                          color: 'var(--status-danger, #DC2626)'
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        Bottleneck
                      </span>
                    ) : isCompleted ? (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{
                          background: '#FFFFFF',
                          color: 'var(--status-success, #15803D)'
                        }}
                      >
                        ✓ Done
                      </span>
                    ) : (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          background: 'var(--bg-card-subtle, #F3F4F6)',
                          color: 'var(--text-muted, #9CA3AF)'
                        }}
                      >
                        Queued
                      </span>
                    )}
                  </div>

                  {/* Stage Titles */}
                  <div>
                    <h3
                      className="text-sm font-bold truncate"
                      style={{ color: 'var(--text-primary, #111827)' }}
                    >
                      {stage.name}
                    </h3>
                    <p
                      className="text-[11px] truncate mt-0.5"
                      style={{ color: 'var(--text-muted, #6B7280)' }}
                    >
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Bottom Metrics */}
                  <div
                    className="mt-3 pt-2.5 border-t flex flex-col gap-1 text-[11px]"
                    style={{ borderColor: 'var(--border-color-subtle, rgba(0,0,0,0.06))' }}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span style={{ color: 'var(--text-muted, #9CA3AF)' }}>Duration</span>
                      <span
                        style={{
                          color: isBottleneck
                            ? 'var(--status-danger, #DC2626)'
                            : 'var(--text-secondary, #4B5563)'
                        }}
                      >
                        {stage.duration}
                      </span>
                    </div>

                    <div
                      className="text-[10px] truncate"
                      style={{
                        color: isBottleneck
                          ? 'var(--status-danger, #DC2626)'
                          : 'var(--text-muted, #6B7280)'
                      }}
                      title={stage.details}
                    >
                      {stage.details}
                    </div>
                  </div>

                  {/* AI Intervention Badge */}
                  {stage.hasIntervention && (
                    <div
                      className="mt-2 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1"
                      style={{
                        background: 'var(--accent-ai-bg, #F4F2FF)',
                        color: 'var(--accent-ai-text, #4F46E5)',
                        border: '1px solid var(--accent-ai-border, #DDD6FE)'
                      }}
                    >
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="truncate">Auto-escalates in 36m</span>
                    </div>
                  )}
                </div>

                {/* Arrow Connector between stages */}
                {idx < stages.length - 1 && (
                  <div className="flex items-center justify-center px-1 text-gray-300">
                    <ArrowRight
                      className="w-4 h-4 shrink-0 transition-colors"
                      style={{
                        color: idx === 1
                          ? 'var(--status-danger, #DC2626)'
                          : 'var(--border-color, #D1D5DB)'
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowVisualizer;
