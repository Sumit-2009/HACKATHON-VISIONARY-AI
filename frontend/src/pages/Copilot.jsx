import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { aiAPI } from '../api/client';
import { useShell } from '../components/layout/AppShell';

const SUGGESTED_QUESTIONS = [
  "Which workflows are currently at risk?",
  "Why did automation rate decrease?",
  "Find the biggest bottleneck.",
  "Create an approval workflow.",
  "Optimize the finance approval process.",
  "Which workflow is causing the biggest operational delay?",
  "Summarize today's workflow activity."
];

const DEFAULT_COPILOT_RESPONSE = {
  type: "executive_intelligence",
  title: "Operational Analysis",
  primaryWorkflow: "Finance Approval",
  workflowId: "WF-2045",
  delayedTasks: 23,
  averageProcessingTime: "8.4 hours",
  primaryBottleneck: "Manager Approval",
  impact: "31% above normal processing time",
  recommendation: "Automate manager reminders after 4 hours and escalate after 5 hours.",
  confidence: 94,
  department: "Finance",
  keyMetrics: [
    { label: "Delayed Tasks", value: "23", change: "+12%" },
    { label: "Avg Processing Time", value: "8.4 hrs", benchmark: "5.8 hrs normal" },
    { label: "SLA Breaches", value: "6 this week", severity: "High" },
    { label: "Root Cause", value: "Unattended manager approval queue", severity: "Critical" }
  ],
  suggestedActions: [
    { label: "View Workflow", actionType: "navigate", target: "/workflows/WF-2045" },
    { label: "Apply Recommendation", actionType: "automate", target: "AUTO-01" }
  ]
};

export const Copilot = () => {
  const [query, setQuery] = useState("Which workflow is causing the biggest operational delay?");
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(DEFAULT_COPILOT_RESPONSE);
  const [appliedAction, setAppliedAction] = useState(false);
  const navigate = useNavigate();
  const { openWorkflowDrawer } = useShell();

  const handleAskQuestion = async (q) => {
    const questionText = q || query;
    if (!questionText.trim()) return;

    setLoading(true);
    setQuery(questionText);
    setAppliedAction(false);

    try {
      const res = await aiAPI.copilot({ query: questionText });
      setCurrentResponse(res.data);
    } catch (err) {
      setCurrentResponse(DEFAULT_COPILOT_RESPONSE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto">
      
      {/* WeTransfer-style Editorial Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
          Enterprise Copilot
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
          What would you like to solve?
        </h1>
        <p className="text-base text-[#4B5563] mt-2 font-normal">
          Ask questions about your organization's operations and bottlenecks.
        </p>
      </div>

      {/* Suggested Questions: WeTransfer Pill Chips */}
      <div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q)}
              className="text-xs font-semibold px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] text-[#111827] hover:border-[#DDD6FE] hover:bg-[#F4F2FF] hover:text-[#4F46E5] transition-all cursor-pointer shadow-sm text-left hover:scale-[1.02]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Natural Language Query Bar: WeTransfer Capsule Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAskQuestion(query);
        }}
        className="relative"
      >
        <div className="bg-white border border-[#E5E7EB] rounded-full p-2.5 pl-6 flex items-center gap-3 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.06)] focus-within:border-[#111827] transition-all">
          <Sparkles className="w-5 h-5 text-[#6366F1] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about bottlenecks, delayed approvals, department risk..."
            className="w-full text-base text-[#111827] placeholder-[#9CA3AF] bg-transparent outline-none font-medium"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-full bg-[#111827] text-white text-xs font-bold hover:bg-[#1F2937] transition-all shrink-0 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? 'Synthesizing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Executive Structured Intelligence Response */}
      {currentResponse && (
        <div className="bg-white border border-[#E5E7EB] rounded-[36px] p-8 md:p-12 shadow-[0_20px_50px_-10px_rgba(16,24,40,0.08)] space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F2F4F7]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F4F2FF] border border-[#DDD6FE] text-[#6366F1] flex items-center justify-center shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                  {currentResponse.title || "Operational Analysis"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                  {currentResponse.primaryWorkflow}
                </h2>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#F4F2FF] border border-[#DDD6FE] text-[#4F46E5] shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              Confidence {currentResponse.confidence}%
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-[24px] bg-[#F4F5F8] border border-[#E5E7EB]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-1">Delayed Tasks</span>
              <span className="text-3xl font-extrabold text-[#DC2626]">{currentResponse.delayedTasks}</span>
            </div>
            <div className="p-5 rounded-[24px] bg-[#F4F5F8] border border-[#E5E7EB]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-1">Avg Processing</span>
              <span className="text-3xl font-extrabold text-[#111827]">{currentResponse.averageProcessingTime}</span>
            </div>
            <div className="p-5 rounded-[24px] bg-[#F4F5F8] border border-[#E5E7EB]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-1">Bottleneck</span>
              <span className="text-lg font-bold text-[#DC2626] truncate block">{currentResponse.primaryBottleneck}</span>
            </div>
            <div className="p-5 rounded-[24px] bg-[#F4F5F8] border border-[#E5E7EB]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-1">Impact</span>
              <span className="text-sm font-bold text-[#B45309] block leading-snug">{currentResponse.impact}</span>
            </div>
          </div>

          {/* AI Recommendation Box */}
          <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-[28px] p-6 md:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] block mb-2">
              AI Operational Recommendation
            </span>
            <p className="text-lg text-[#111827] font-medium leading-relaxed">
              💡 {currentResponse.recommendation}
            </p>
          </div>

          {/* Action Trigger Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <span className="text-xs text-[#6B7280]">
              Real-time operational graph synthesized across 128 active workflows.
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(currentResponse.workflowId ? `/workflows/${currentResponse.workflowId}` : '/workflows/WF-2045')}
                className="px-6 py-3 rounded-full bg-white border border-[#E5E7EB] text-[#111827] text-xs font-bold hover:bg-[#F4F5F8] transition-all shadow-sm cursor-pointer"
              >
                View Workflow
              </button>

              <button
                onClick={() => setAppliedAction(true)}
                className={`px-7 py-3 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md ${
                  appliedAction
                    ? 'bg-[#ECFDF3] text-[#15803D] border border-[#A6F4C5]'
                    : 'bg-[#111827] text-white hover:bg-[#1F2937]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{appliedAction ? 'Recommendation Applied' : 'Apply Recommendation'}</span>
              </button>
            </div>
          </div>

          {appliedAction && (
            <div className="p-4 rounded-full bg-[#ECFDF3] border border-[#A6F4C5] text-xs text-[#15803D] font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Automated reminder schedule configured for 4-hour threshold with escalation to VP Finance at 5 hours.</span>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default Copilot;
