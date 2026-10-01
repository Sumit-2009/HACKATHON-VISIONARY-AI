import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  Clock,
  User,
  ShieldCheck,
  Send,
  AlertOctagon,
  CheckCircle2,
  FileText,
  CheckSquare,
  History,
  Layers,
  Check,
  ExternalLink
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import RiskBadge from '../components/common/RiskBadge';
import StatusBadge from '../components/common/StatusBadge';
import WorkflowTimeline from '../components/workflows/WorkflowTimeline';
import { workflowsAPI } from '../api/client';

const DEFAULT_WF_2045 = {
  id: "WF-2045",
  name: "Finance Approval",
  department: "Finance",
  currentStage: "Manager Approval",
  owner: "Rajesh Kumar",
  progress: 38,
  slaDeadline: "1 hr left",
  riskLevel: "High",
  createdDate: "2026-09-30 08:30",
  description: "Quarterly budget allocations and high-value expense sign-offs for Q4 operational expenditures.",
  stages: [
    { name: "Request Created", status: "completed", duration: "12 mins", timestamp: "08:30 AM" },
    { name: "Document Validation", status: "completed", duration: "35 mins", timestamp: "09:05 AM" },
    { name: "Manager Approval", status: "bottleneck", duration: "5.4 hrs pending", isCurrent: true, pendingHours: 5.4, timestamp: "09:40 AM" },
    { name: "Finance Review", status: "pending", duration: "Estimated 1.2 hrs", timestamp: "Awaiting approval" },
    { name: "Completed", status: "pending", duration: "Final sign-off", timestamp: "Scheduled" }
  ],
  aiAnalysis: {
    currentBottleneck: "Manager Approval",
    reason: "Approval has remained pending for 5.4 hours, exceeding the department's normal processing time of 1.8 hours.",
    recommendation: "Send an automated reminder to the manager and escalate to VP Finance if no response is received within 60 minutes.",
    confidence: 96
  },
  documents: [
    { name: "Q4_Budget_Allocation.pdf", size: "2.4 MB", type: "PDF", status: "Verified" },
    { name: "Vendor_Cost_Breakdown.xlsx", size: "840 KB", type: "Spreadsheet", status: "Parsed" }
  ],
  approvals: [
    { role: "Finance Manager", approver: "Rajesh Kumar", status: "Pending", pendingTime: "5.4 hrs", sla: "Breached" },
    { role: "VP Financial Planning", approver: "Sunita Rao", status: "Queued", pendingTime: "-", sla: "On Track" }
  ],
  auditHistory: [
    { action: "Workflow initiated", user: "Rajesh Kumar", time: "Sep 30, 08:30 AM" },
    { action: "Document validation passed AI OCR check", user: "FlowMind AI Bot", time: "Sep 30, 09:05 AM" },
    { action: "Manager approval notification dispatched", user: "System", time: "Sep 30, 09:40 AM" },
    { action: "Bottleneck threshold detected (4.0 hrs exceeded)", user: "FlowMind AI Engine", time: "Sep 30, 01:40 PM" }
  ]
};

export const WorkflowWorkspace = () => {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState(DEFAULT_WF_2045);
  const [loading, setLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);

  useEffect(() => {
    loadWorkflow();
  }, [id]);

  const loadWorkflow = async () => {
    try {
      const res = await workflowsAPI.get(id);
      if (res.data) setWorkflow(res.data);
    } catch (err) {
      console.warn('API lookup, using fallback enterprise data');
    }
  };

  const handleAction = async (actionType) => {
    setActionFeedback(null);
    try {
      let note = "";
      if (actionType === 'apply') note = "Automated reminder and escalation policy enabled.";
      if (actionType === 'remind') note = "Slack & email ping sent to current approver.";
      if (actionType === 'escalate') note = "Workflow escalated to Department VP queue.";

      await workflowsAPI.update(id, {
        actionNote: note,
        riskLevel: actionType === 'apply' ? 'Medium' : workflow.riskLevel
      });

      setActionFeedback({ type: 'success', message: note });
      loadWorkflow();
    } catch (err) {
      setActionFeedback({ type: 'error', message: 'Action execution failed.' });
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-[#98A2B3] text-sm animate-pulse">
        Loading operational workspace...
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-semibold text-[#101828]">Workflow Not Found</h2>
        <Link to="/workflows" className="text-xs text-[#2563EB] font-medium">Return to Workflows</Link>
      </div>
    );
  }

  const ai = workflow.aiAnalysis || {
    currentBottleneck: "Manager Approval",
    reason: "Approval has remained pending for 5.4 hours, exceeding the department's normal processing time.",
    recommendation: "Send an automated reminder to the manager and escalate if no response is received within 60 minutes.",
    confidence: 96
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Top Breadcrumb & Navigation */}
      <div>
        <Link
          to="/workflows"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#101828] mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Workflows</span>
        </Link>

        {/* Hero Title & Telemetry Header */}
        <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-semibold text-[#2563EB] bg-[#EEF4FF] px-2.5 py-1 rounded-md">
                  {workflow.id}
                </span>
                <span className="text-xs text-[#98A2B3]">•</span>
                <span className="text-xs font-medium text-[#667085]">{workflow.department}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#101828] tracking-tight">
                {workflow.name}
              </h1>
              <p className="text-sm text-[#667085] mt-2 max-w-2xl leading-relaxed">
                {workflow.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <RiskBadge risk={workflow.riskLevel} />
              <div className="text-right">
                <span className="text-xs text-[#98A2B3] block mb-1">Progress</span>
                <span className="text-2xl font-semibold text-[#101828]">{workflow.progress}%</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-[#F2F4F7] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#98A2B3] block mb-1">Owner</span>
              <span className="font-semibold text-[#101828] flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#667085]" />
                {workflow.owner}
              </span>
            </div>
            <div>
              <span className="text-[#98A2B3] block mb-1">Current Stage</span>
              <span className="font-semibold text-[#101828]">{workflow.currentStage}</span>
            </div>
            <div>
              <span className="text-[#98A2B3] block mb-1">SLA Deadline</span>
              <span className="font-semibold text-[#101828] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#667085]" />
                {workflow.slaDeadline}
              </span>
            </div>
            <div>
              <span className="text-[#98A2B3] block mb-1">Created Date</span>
              <span className="font-semibold text-[#101828]">{workflow.createdDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className={`p-4 rounded-2xl text-xs font-medium flex items-center gap-2 ${
          actionFeedback.type === 'success' ? 'bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]' : 'bg-[#FFF1F2] text-[#DC2626] border border-[#FECDCA]'
        }`}>
          <Check className="w-4 h-4" />
          <span>{actionFeedback.message}</span>
        </div>
      )}

      {/* Main Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Timeline & Approvals */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Vertical Timeline Card */}
          <div className="bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-[#101828] tracking-tight mb-6">
              Workflow Timeline & Telemetry
            </h2>
            <WorkflowTimeline
              stages={workflow.stages}
              currentBottleneck={ai.currentBottleneck}
            />
          </div>

          {/* Approvals Table */}
          <div className="bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-[#101828] tracking-tight mb-4">
              Approval Gates ({workflow.approvals?.length || 0})
            </h2>
            <div className="divide-y divide-[#F2F4F7]">
              {workflow.approvals?.map((app, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#101828] block">{app.role}</span>
                    <span className="text-[#667085]">{app.approver}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#98A2B3]">Pending: {app.pendingTime}</span>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit History */}
          <div className="bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-[#667085]" />
              <h2 className="text-lg font-semibold text-[#101828] tracking-tight">
                Enterprise Audit History
              </h2>
            </div>
            <div className="space-y-3">
              {workflow.auditHistory?.map((hist, idx) => (
                <div key={idx} className="p-3 bg-[#F7F8FA] rounded-xl text-xs flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#101828]">{hist.action}</p>
                    <p className="text-[11px] text-[#98A2B3] mt-0.5">By {hist.user}</p>
                  </div>
                  <span className="text-[11px] text-[#667085]">{hist.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Analysis & Documents */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* AI Workflow Analysis Card */}
          <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#6366F1] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                  AI Analysis
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-xs font-semibold text-[#4F46E5] border border-[#DDD6FE]">
                <ShieldCheck className="w-3.5 h-3.5" />
                {ai.confidence}% Confidence
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wide">
                  Current Bottleneck
                </span>
                <p className="text-base font-semibold text-[#DC2626] mt-0.5">
                  {ai.currentBottleneck}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wide">
                  Reason
                </span>
                <p className="text-xs text-[#101828] mt-1 leading-relaxed">
                  {ai.reason}
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-[#DDD6FE]">
                <span className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wide block mb-1">
                  AI Recommendation
                </span>
                <p className="text-xs text-[#101828] leading-relaxed">
                  {ai.recommendation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => handleAction('apply')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#14213D] text-white text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer text-center"
                >
                  Apply Recommendation
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction('remind')}
                    className="py-2.5 px-3 rounded-xl bg-white border border-[#DDD6FE] text-[#4F46E5] text-xs font-medium hover:bg-[#FAF9FF] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Reminder</span>
                  </button>
                  <button
                    onClick={() => handleAction('escalate')}
                    className="py-2.5 px-3 rounded-xl bg-white border border-[#FECDCA] text-[#DC2626] text-xs font-medium hover:bg-[#FFF5F5] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <AlertOctagon className="w-3 h-3" />
                    <span>Escalate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#101828] tracking-tight">
                Attached Documents
              </h2>
              <span className="text-xs text-[#667085]">
                {workflow.documents?.length || 0} files
              </span>
            </div>

            <div className="space-y-3">
              {workflow.documents?.map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E6E8EC] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#667085]" />
                    <div>
                      <span className="font-semibold text-[#101828] block">{doc.name}</span>
                      <span className="text-[#98A2B3]">{doc.size} • {doc.type}</span>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} size="sm" />
                </div>
              ))}
              {(!workflow.documents || workflow.documents.length === 0) && (
                <p className="text-xs text-[#98A2B3]">No documents attached to this workflow.</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default WorkflowWorkspace;
