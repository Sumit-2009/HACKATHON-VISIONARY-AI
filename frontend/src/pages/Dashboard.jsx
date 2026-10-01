import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GitBranch,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Plus,
  Filter,
  Layers,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  RotateCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import MetricCard from '../components/common/MetricCard';
import RiskBadge from '../components/common/RiskBadge';
import WorkflowTable from '../components/workflows/WorkflowTable';
import WorkflowVisualizer from '../components/workflows/WorkflowVisualizer';
import AIActivityFeed from '../components/workflows/AIActivityFeed';
import { useShell } from '../components/layout/AppShell';
import { dashboardAPI } from '../api/client';

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartFilter, setChartFilter] = useState('7 Days');
  const [isApplyingRecommendation, setIsApplyingRecommendation] = useState(false);
  const [isRecommendationApplied, setIsRecommendationApplied] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);

  const { openWorkflowDrawer } = useShell();
  const navigate = useNavigate();

  const examplePrompts = [
    "Automate employee approval requests",
    "Reduce finance SLA breach risk",
    "Auto-route IT hardware access tickets",
    "Streamline vendor contract compliance"
  ];

  // Subtle rotation of example prompts
  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % examplePrompts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const res = await dashboardAPI.getOverview();
      setData(res.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyRecommendation = () => {
    if (isRecommendationApplied) return;
    setIsApplyingRecommendation(true);
    setTimeout(() => {
      setIsApplyingRecommendation(false);
      setIsRecommendationApplied(true);
    }, 900);
  };

  const summary = data?.summary || {
    activeWorkflows: 128,
    activeWorkflowsDelta: '+6.2%',
    workflowBottlenecks: 17,
    workflowBottlenecksDelta: '-11%',
    tasksAtRisk: 42,
    tasksAtRiskDelta: '-8%',
    aiAutomationRate: 64.8,
    aiAutomationRateDelta: '+14.2%',
    aiOperationalInsight: {
      content: "Finance approval workflows are taking 31% longer than average. Most delays occur between Manager Approval and Finance Review.",
      confidence: 94,
      targetWorkflowId: "WF-2045"
    }
  };

  const timeSeriesData = data?.timeSeriesPerformance || [
    { day: "Mon", completed: 42, delayed: 6, atRisk: 11 },
    { day: "Tue", completed: 58, delayed: 8, atRisk: 9 },
    { day: "Wed", completed: 64, delayed: 5, atRisk: 14 },
    { day: "Thu", completed: 78, delayed: 7, atRisk: 12 },
    { day: "Fri", completed: 86, delayed: 4, atRisk: 8 },
    { day: "Sat", completed: 34, delayed: 2, atRisk: 3 },
    { day: "Sun", completed: 28, delayed: 1, atRisk: 2 }
  ];

  const bottlenecks = data?.bottlenecks || [
    {
      id: "BN-01",
      workflow: "Finance Approval",
      averageTime: "8.4 hrs",
      delayedTasks: 23,
      slaRisk: "High",
      recommendation: "Automate manager reminders after 4 hours and escalate after 5 hours."
    },
    {
      id: "BN-02",
      workflow: "HR Onboarding",
      averageTime: "6.2 hrs",
      delayedTasks: 14,
      slaRisk: "Medium",
      recommendation: "Pre-fill IT access forms upon offer acceptance"
    },
    {
      id: "BN-03",
      workflow: "IT Access Request",
      averageTime: "5.8 hrs",
      delayedTasks: 19,
      slaRisk: "High",
      recommendation: "Auto-provision standard role bundles"
    },
    {
      id: "BN-04",
      workflow: "Purchase Approval",
      averageTime: "4.1 hrs",
      delayedTasks: 8,
      slaRisk: "Low",
      recommendation: "Tiered auto-approval for under ₹50,000"
    },
    {
      id: "BN-05",
      workflow: "Expense Reimbursement",
      averageTime: "3.5 hrs",
      delayedTasks: 11,
      slaRisk: "Medium",
      recommendation: "Optical OCR verification with receipt matching"
    }
  ];

  const workflows = data?.workflows || [];

  const handleViewBottleneck = () => {
    const targetWf = workflows.find(w => w.id === 'WF-2045') || {
      id: 'WF-2045',
      name: 'Finance Approval',
      department: 'Finance',
      currentStage: 'Manager Approval',
      owner: 'Rajesh Kumar',
      progress: 38,
      slaDeadline: '1 hr left',
      riskLevel: 'High',
      createdDate: '2026-09-30 08:30',
      stages: [
        { name: "Request Created", status: "completed", duration: "12 mins", timestamp: "08:30 AM" },
        { name: "Document Validation", status: "completed", duration: "35 mins", timestamp: "09:05 AM" },
        { name: "Manager Approval", status: "bottleneck", duration: "5.4 hrs pending", isCurrent: true, pendingHours: 5.4, timestamp: "09:40 AM" },
        { name: "Finance Review", status: "pending", duration: "Estimated 1.2 hrs", timestamp: "Awaiting approval" },
        { name: "Completed", status: "pending", duration: "Final sign-off", timestamp: "Scheduled" }
      ],
      aiAnalysis: {
        currentBottleneck: "Manager Approval",
        reason: "Approval has remained pending for 5.4 hours, exceeding the department's normal processing time.",
        recommendation: "Send an automated reminder to the manager and escalate if no response is received within 60 minutes.",
        confidence: 96
      }
    };
    openWorkflowDrawer(targetWf);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* =========================================================================
          HERO & COMMAND CENTER SECTION
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left: Signature Floating Action Hub */}
        <div
          className="lg:col-span-5 rounded-[36px] p-7 sm:p-8 border shadow-sm flex flex-col justify-between relative overflow-hidden group theme-card"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-color, #E5E7EB)'
          }}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-colors"
                style={{
                  background: 'var(--accent-ai-bg, #F4F2FF)',
                  color: 'var(--accent-ai-text, #4F46E5)',
                  borderColor: 'var(--accent-ai-border, #DDD6FE)'
                }}
              >
                Autonomous Hub
              </span>
              <span
                className="text-xs font-semibold flex items-center gap-1.5"
                style={{ color: 'var(--status-success, #15803D)' }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ background: 'var(--status-success, #15803D)' }}
                />
                Live Monitoring
              </span>
            </div>

            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
                style={{ color: 'var(--text-primary, #111827)' }}
              >
                Transfer operational chaos into automated flow.
              </h2>
              <p
                className="text-xs sm:text-sm mt-3 font-normal leading-relaxed"
                style={{ color: 'var(--text-secondary, #4B5563)' }}
              >
                Describe a business workflow or route pending approvals. FlowMind analyzes bottlenecks in milliseconds.
              </p>
            </div>

            {/* Quick Action Input / Trigger */}
            <div className="space-y-3 pt-2">
              {/* Primary CTA: Create Workflow */}
              <Link
                to="/workflows/create"
                className="w-full py-4 px-6 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-between group/btn shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'var(--switcher-active-bg, #111827)',
                  color: 'var(--switcher-active-text, #FFFFFF)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover/btn:rotate-90 duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.15)' }}
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span>Create Workflow</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
              </Link>

              {/* Secondary CTA: Ask AI Copilot */}
              <Link
                to="/copilot"
                className="w-full py-3.5 px-6 rounded-full border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer hover:shadow-xs hover:border-indigo-400 group/copilot"
                style={{
                  background: 'var(--bg-card-subtle, #F4F5F8)',
                  borderColor: 'var(--border-color, #E5E7EB)',
                  color: 'var(--text-primary, #111827)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles
                    className="w-4 h-4 transition-transform group-hover/copilot:scale-110 duration-200"
                    style={{ color: 'var(--accent-ai, #6366F1)' }}
                  />
                  <span>Ask AI Copilot</span>
                </div>
                <span
                  className="font-mono text-[11px] px-1.5 py-0.5 rounded border"
                  style={{
                    background: 'var(--bg-card, #FFFFFF)',
                    borderColor: 'var(--border-color, #E5E7EB)',
                    color: 'var(--text-muted, #9CA3AF)'
                  }}
                >
                  ⌘K
                </span>
              </Link>

              {/* Rotating Example Prompt */}
              <div
                onClick={() => navigate('/workflows/create')}
                className="pt-1.5 flex items-center gap-2 text-[11px] cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
                title="Click to use this template prompt"
              >
                <span
                  className="font-medium shrink-0"
                  style={{ color: 'var(--text-muted, #9CA3AF)' }}
                >
                  Try:
                </span>
                <span
                  key={promptIndex}
                  className="font-medium underline decoration-dotted underline-offset-2 truncate animate-in fade-in slide-in-from-bottom-1 duration-300"
                  style={{ color: 'var(--accent-ai-text, #4F46E5)' }}
                >
                  {examplePrompts[promptIndex]}
                </span>
              </div>
            </div>
          </div>

          {/* Hub Footer Status */}
          <div
            className="mt-8 pt-4 border-t flex items-center justify-between text-xs"
            style={{ borderColor: 'var(--border-color-subtle, #F3F4F6)' }}
          >
            <span style={{ color: 'var(--text-muted, #6B7280)' }}>
              Active Enterprise SLA: <strong>93.8%</strong>
            </span>
            <span
              className="font-semibold"
              style={{ color: 'var(--accent-ai-text, #2563EB)' }}
            >
              128 in flight
            </span>
          </div>
        </div>

        {/* Right: Editorial Typography & 4 KPI Metric Cards */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider block mb-2"
              style={{ color: 'var(--text-muted, #6B7280)' }}
            >
              COMMAND CENTER
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]"
              style={{ color: 'var(--text-primary, #111827)' }}
            >
              Enterprise Workflow Intelligence.
            </h1>
            <p
              className="text-sm sm:text-base mt-3 max-w-xl font-normal leading-relaxed"
              style={{ color: 'var(--text-secondary, #4B5563)' }}
            >
              Monitor, understand, predict, and optimize organizational workflows with AI.
            </p>
          </div>

          {/* 4 Metric Cards with dominant numbers & mini sparklines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <MetricCard
              label="ACTIVE WORKFLOWS"
              value={summary.activeWorkflows}
              delta={summary.activeWorkflowsDelta}
              isPositiveGood={true}
              subtitle="Processes currently in flight"
              sparklineData={[112, 116, 119, 122, 120, 125, 128]}
            />

            <MetricCard
              label="BOTTLENECKS"
              value={summary.workflowBottlenecks}
              delta={summary.workflowBottlenecksDelta}
              isPositiveGood={false} // negative is good for bottlenecks!
              subtitle="Critical stages requiring review"
              sparklineData={[24, 22, 21, 19, 18, 18, 17]}
            />

            <MetricCard
              label="TASKS AT RISK"
              value={summary.tasksAtRisk}
              delta={summary.tasksAtRiskDelta}
              isPositiveGood={false} // negative is good for at-risk!
              subtitle="Close to breach of target SLA"
              sparklineData={[54, 49, 47, 46, 45, 43, 42]}
            />

            <MetricCard
              label="AUTOMATION RATE"
              value={`${summary.aiAutomationRate}%`}
              delta={summary.aiAutomationRateDelta}
              isPositiveGood={true}
              subtitle="Autonomous decision executions"
              sparklineData={[48, 52, 55, 59, 61, 63, 64.8]}
            />
          </div>
        </div>

      </section>

      {/* =========================================================================
          WORKFLOW VISUALIZATION PIPELINE
          ========================================================================= */}
      <WorkflowVisualizer />

      {/* =========================================================================
          AI OPERATIONAL INSIGHT: INTERACTIVE RECOMMENDATION CARD
          ========================================================================= */}
      <section>
        <div
          className="rounded-[36px] p-6 sm:p-9 border shadow-sm relative overflow-hidden transition-all duration-300 theme-card"
          style={{
            background: 'var(--accent-ai-bg, #F4F2FF)',
            borderColor: 'var(--accent-ai-border, #DDD6FE)'
          }}
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                style={{
                  background: 'var(--accent-ai, #6366F1)',
                  color: '#FFFFFF'
                }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--accent-ai-text, #4F46E5)' }}
              >
                AI OPERATIONAL INSIGHT
              </span>
            </div>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs"
              style={{
                background: 'var(--bg-card, #FFFFFF)',
                color: 'var(--accent-ai-text, #4F46E5)',
                borderColor: 'var(--accent-ai-border, #DDD6FE)'
              }}
            >
              AI Confidence: 94%
            </span>
          </div>

          {/* Insight Statement */}
          <h3
            className="text-lg sm:text-2xl font-semibold leading-relaxed max-w-3xl mt-2"
            style={{ color: 'var(--text-primary, #111827)' }}
          >
            "Finance approval workflows are taking 31% longer than average."
          </h3>

          {/* Detected Issue & Recommendation Metadata */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            <div
              className="p-3.5 rounded-2xl border text-xs"
              style={{
                background: 'var(--bg-card, rgba(255, 255, 255, 0.7))',
                borderColor: 'var(--accent-ai-border, #DDD6FE)'
              }}
            >
              <span className="font-bold block" style={{ color: 'var(--status-danger, #DC2626)' }}>
                Detected Issue:
              </span>
              <p className="mt-0.5" style={{ color: 'var(--text-secondary, #4B5563)' }}>
                Approval routing bottleneck between Manager Review and Finance Sign-off.
              </p>
            </div>

            <div
              className="p-3.5 rounded-2xl border text-xs"
              style={{
                background: 'var(--bg-card, rgba(255, 255, 255, 0.7))',
                borderColor: 'var(--accent-ai-border, #DDD6FE)'
              }}
            >
              <span className="font-bold block" style={{ color: 'var(--accent-ai-text, #4F46E5)' }}>
                AI Recommendation:
              </span>
              <p className="mt-0.5" style={{ color: 'var(--text-secondary, #4B5563)' }}>
                "Automatically route low-risk approvals to the appropriate approval queue."
              </p>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleApplyRecommendation}
              disabled={isApplyingRecommendation || isRecommendationApplied}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer ${
                isRecommendationApplied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'hover:opacity-90 hover:-translate-y-0.5'
              }`}
              style={{
                background: isRecommendationApplied
                  ? '#059669'
                  : 'var(--switcher-active-bg, #111827)',
                color: '#FFFFFF'
              }}
            >
              {isApplyingRecommendation ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Applying Guardrail Rule...</span>
                </>
              ) : isRecommendationApplied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Recommendation Applied ✓ (AUTO-01 Active)</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Apply Recommendation</span>
                </>
              )}
            </button>

            <button
              onClick={handleViewBottleneck}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border text-xs sm:text-sm font-semibold hover:shadow-xs transition-all cursor-pointer"
              style={{
                background: 'var(--bg-card, #FFFFFF)',
                borderColor: 'var(--accent-ai-border, #DDD6FE)',
                color: 'var(--accent-ai-text, #4F46E5)'
              }}
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Success toast badge if applied */}
          {isRecommendationApplied && (
            <div
              className="mt-4 p-3 rounded-2xl border text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{
                background: 'var(--status-success-bg, #ECFDF3)',
                borderColor: 'rgba(16, 185, 129, 0.3)',
                color: 'var(--status-success, #15803D)'
              }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                <strong>Success:</strong> Auto-routing policy activated. Requisitions under ₹50,000 are automatically prioritized for finance controllers.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          NEW AI ACTIVITY LIVE FEED SECTION
          ========================================================================= */}
      <AIActivityFeed />

      {/* =========================================================================
          WORKFLOW PERFORMANCE CHART
          ========================================================================= */}
      <section
        className="rounded-[36px] p-6 sm:p-9 border shadow-xs theme-card"
        style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderColor: 'var(--border-color, #E5E7EB)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary, #111827)' }}
            >
              Workflow Performance
            </h2>
            <p
              className="text-xs sm:text-sm mt-1 font-normal"
              style={{ color: 'var(--text-secondary, #4B5563)' }}
            >
              Operational performance and SLA compliance telemetry
            </p>
          </div>

          {/* Time range filters */}
          <div
            className="flex items-center gap-1 p-1 rounded-full border self-start sm:self-auto"
            style={{
              background: 'var(--bg-card-subtle, #F4F5F8)',
              borderColor: 'var(--border-color, #E5E7EB)'
            }}
          >
            {['7 Days', '30 Days', '90 Days'].map((filter) => (
              <button
                key={filter}
                onClick={() => setChartFilter(filter)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  chartFilter === filter
                    ? 'shadow-xs'
                    : 'hover:opacity-100 opacity-65'
                }`}
                style={{
                  background: chartFilter === filter ? 'var(--switcher-active-bg, #111827)' : 'transparent',
                  color: chartFilter === filter ? 'var(--switcher-active-text, #FFFFFF)' : 'var(--text-secondary, #4B5563)'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span style={{ color: 'var(--text-secondary, #6B7280)' }}>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span style={{ color: 'var(--text-secondary, #6B7280)' }}>Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span style={{ color: 'var(--text-secondary, #6B7280)' }}>At Risk</span>
          </div>
        </div>

        {/* Chart View */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color-subtle, #F2F4F7)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted, #9CA3AF)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted, #9CA3AF)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card, #FFFFFF)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color, #E5E7EB)',
                  color: 'var(--text-primary, #111827)',
                  boxShadow: '0 8px 24px rgba(16,24,40,0.1)',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="completed" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
              <Area type="monotone" dataKey="atRisk" stroke="#B45309" strokeWidth={2} fillOpacity={0} />
              <Area type="monotone" dataKey="delayed" stroke="#DC2626" strokeWidth={2} fillOpacity={1} fill="url(#colorDelayed)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* =========================================================================
          BOTTLENECK ANALYSIS TABLE
          ========================================================================= */}
      <section
        className="rounded-[36px] p-6 sm:p-9 border shadow-xs theme-card"
        style={{
          background: 'var(--bg-card, #FFFFFF)',
          borderColor: 'var(--border-color, #E5E7EB)'
        }}
      >
        <div className="mb-6">
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary, #111827)' }}
          >
            AI Bottleneck Detection
          </h2>
          <p
            className="text-xs sm:text-sm mt-1 font-normal"
            style={{ color: 'var(--text-secondary, #4B5563)' }}
          >
            FlowMind continuously identifies where workflows are slowing down.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b text-[11px] font-bold uppercase tracking-wider"
                style={{
                  borderColor: 'var(--border-color, #E5E7EB)',
                  color: 'var(--text-muted, #6B7280)'
                }}
              >
                <th className="pb-3.5 pr-4">Workflow</th>
                <th className="pb-3.5 px-4">Average Time</th>
                <th className="pb-3.5 px-4">Delayed Tasks</th>
                <th className="pb-3.5 px-4">SLA Risk</th>
                <th className="pb-3.5 pl-4">AI Recommendation</th>
              </tr>
            </thead>
            <tbody
              className="divide-y text-xs sm:text-sm"
              style={{ borderColor: 'var(--border-color-subtle, #F2F4F7)' }}
            >
              {bottlenecks.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => {
                    if (item.workflow.includes('Finance')) {
                      handleViewBottleneck();
                    } else {
                      navigate('/workflows');
                    }
                  }}
                  className="hover:opacity-90 cursor-pointer transition-colors group"
                >
                  <td
                    className="py-4 pr-4 font-bold group-hover:text-indigo-600 transition-colors whitespace-nowrap"
                    style={{ color: 'var(--text-primary, #111827)' }}
                  >
                    {item.workflow}
                  </td>
                  <td
                    className="py-4 px-4 whitespace-nowrap"
                    style={{ color: 'var(--text-secondary, #4B5563)' }}
                  >
                    {item.averageTime}
                  </td>
                  <td
                    className="py-4 px-4 font-bold whitespace-nowrap"
                    style={{ color: 'var(--status-danger, #DC2626)' }}
                  >
                    {item.delayedTasks}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <RiskBadge risk={item.slaRisk} />
                  </td>
                  <td className="py-4 pl-4 text-xs font-medium max-w-md">
                    <span
                      className="px-3 py-1.5 rounded-full inline-block border"
                      style={{
                        background: 'var(--accent-ai-bg, #F4F2FF)',
                        borderColor: 'var(--accent-ai-border, #DDD6FE)',
                        color: 'var(--accent-ai-text, #4F46E5)'
                      }}
                    >
                      💡 {item.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          ACTIVE WORKFLOWS SECTION
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary, #111827)' }}
            >
              Active Workflows
            </h2>
            <p
              className="text-xs sm:text-sm mt-0.5"
              style={{ color: 'var(--text-secondary, #4B5563)' }}
            >
              Live organizational telemetry across all departments
            </p>
          </div>
          <Link
            to="/workflows"
            className="text-xs font-bold flex items-center gap-1 group px-4 py-2 rounded-full border shadow-2xs transition-all hover:shadow-xs"
            style={{
              background: 'var(--bg-card, #FFFFFF)',
              borderColor: 'var(--border-color, #E5E7EB)',
              color: 'var(--accent-ai-text, #2563EB)'
            }}
          >
            <span>View All ({summary.activeWorkflows})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <WorkflowTable
          workflows={workflows}
          onSelectWorkflow={openWorkflowDrawer}
        />
      </section>

    </div>
  );
};

export default Dashboard;
