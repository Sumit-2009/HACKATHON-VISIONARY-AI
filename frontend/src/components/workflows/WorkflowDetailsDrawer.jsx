import React, { useState } from 'react';
import { X, Sparkles, Send, AlertOctagon, Check, ExternalLink, ArrowRight, Clock, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkflowTimeline from './WorkflowTimeline';
import RiskBadge from '../common/RiskBadge';
import StatusBadge from '../common/StatusBadge';
import { workflowsAPI } from '../../api/client';

export const WorkflowDetailsDrawer = ({ workflow, isOpen, onClose, onRefresh }) => {
  if (!isOpen || !workflow) return null;

  const [actionFeedback, setActionFeedback] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleAction = async (actionType) => {
    setLoadingAction(true);
    setActionFeedback(null);
    try {
      let note = "";
      if (actionType === 'apply') note = "AI Recommendation applied: Automated escalation rule activated.";
      if (actionType === 'remind') note = "Automated reminder dispatched to approver.";
      if (actionType === 'escalate') note = "Workflow escalated to Department VP queue.";

      await workflowsAPI.update(workflow.id, {
        actionNote: note,
        riskLevel: actionType === 'apply' ? 'Medium' : workflow.riskLevel
      });

      setActionFeedback({
        type: 'success',
        message: note
      });

      if (onRefresh) onRefresh();
    } catch (err) {
      setActionFeedback({
        type: 'error',
        message: 'Could not complete action. Please retry.'
      });
    } finally {
      setLoadingAction(false);
    }
  };

  const ai = workflow.aiAnalysis || {
    currentBottleneck: "Manager Approval",
    reason: "Approval has remained pending for 5.4 hours, exceeding the department's normal processing time.",
    recommendation: "Send an automated reminder to the manager and escalate if no response is received within 60 minutes.",
    confidence: 96
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#101828]/25 backdrop-blur-[2px] transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-[#E6E8EC] flex flex-col justify-between overflow-y-auto">
          
          {/* Drawer Header */}
          <div className="p-6 md:p-8 border-b border-[#E6E8EC] sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#667085] bg-[#F7F8FA] border border-[#E6E8EC] px-2.5 py-1 rounded-md">
                  {workflow.id}
                </span>
                <span className="text-xs text-[#98A2B3]">•</span>
                <span className="text-xs font-medium text-[#667085]">{workflow.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/workflows/${workflow.id}`}
                  className="p-2 text-[#667085] hover:text-[#101828] hover:bg-[#F7F8FA] rounded-xl transition-colors"
                  title="Open Full Workspace"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 text-[#667085] hover:text-[#101828] hover:bg-[#F7F8FA] rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-[#101828] tracking-tight">
              {workflow.name}
            </h2>

            {/* Quick Metadata Bar */}
            <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-[#F2F4F7] text-xs">
              <div>
                <span className="text-[#98A2B3] block mb-1">Owner</span>
                <span className="font-medium text-[#101828] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#667085]" />
                  {workflow.owner}
                </span>
              </div>
              <div>
                <span className="text-[#98A2B3] block mb-1">SLA Deadline</span>
                <span className="font-medium text-[#101828] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#667085]" />
                  {workflow.slaDeadline || "On schedule"}
                </span>
              </div>
              <div>
                <span className="text-[#98A2B3] block mb-1">Risk Level</span>
                <RiskBadge risk={workflow.riskLevel} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-[#667085]">Stage: {workflow.currentStage}</span>
                <span className="text-[#101828]">{workflow.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                  style={{ width: `${workflow.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-6 md:p-8 space-y-8 flex-1">
            
            {/* Feedback alert */}
            {actionFeedback && (
              <div className={`p-4 rounded-2xl text-xs font-medium flex items-center gap-2 ${
                actionFeedback.type === 'success' 
                  ? 'bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]' 
                  : 'bg-[#FFF1F2] text-[#DC2626] border border-[#FECDCA]'
              }`}>
                <Check className="w-4 h-4" />
                <span>{actionFeedback.message}</span>
              </div>
            )}

            {/* AI Workflow Analysis Section */}
            <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#6366F1] text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                    AI Analysis
                  </span>
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-[#4F46E5] border border-[#DDD6FE] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {ai.confidence}% Confidence
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-[#667085] uppercase tracking-wide">
                    Current Bottleneck
                  </span>
                  <p className="text-base font-semibold text-[#DC2626] mt-0.5">
                    {ai.currentBottleneck}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-medium text-[#667085] uppercase tracking-wide">
                    Reason
                  </span>
                  <p className="text-xs text-[#101828] mt-0.5 leading-relaxed font-normal">
                    {ai.reason}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-medium text-[#667085] uppercase tracking-wide">
                    AI Recommendation
                  </span>
                  <p className="text-xs text-[#4F46E5] font-medium mt-0.5 leading-relaxed bg-white/70 p-3 rounded-xl border border-[#E0E7FF]">
                    💡 {ai.recommendation}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-[#E0E7FF] flex flex-wrap items-center gap-2">
                <button
                  disabled={loadingAction}
                  onClick={() => handleAction('apply')}
                  className="px-3.5 py-2 text-xs font-medium bg-[#14213D] text-white rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  Apply Recommendation
                </button>
                <button
                  disabled={loadingAction}
                  onClick={() => handleAction('remind')}
                  className="px-3.5 py-2 text-xs font-medium bg-white text-[#4F46E5] border border-[#DDD6FE] rounded-xl hover:bg-[#FAF9FF] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Send Reminder
                </button>
                <button
                  disabled={loadingAction}
                  onClick={() => handleAction('escalate')}
                  className="px-3.5 py-2 text-xs font-medium bg-white text-[#DC2626] border border-[#FECDCA] rounded-xl hover:bg-[#FFF5F5] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <AlertOctagon className="w-3 h-3" />
                  Escalate
                </button>
              </div>
            </div>

            {/* Workflow Timeline Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider">
                  Workflow Timeline
                </h3>
                <span className="text-xs text-[#667085]">
                  {workflow.stages?.length || 5} stages total
                </span>
              </div>
              <WorkflowTimeline
                stages={workflow.stages}
                currentBottleneck={ai.currentBottleneck}
              />
            </div>

            {/* Associated Documents */}
            {workflow.documents && workflow.documents.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider mb-3">
                  Attached Documents ({workflow.documents.length})
                </h3>
                <div className="space-y-2">
                  {workflow.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] text-xs">
                      <div>
                        <span className="font-medium text-[#101828] block">{doc.name}</span>
                        <span className="text-[#98A2B3]">{doc.size} • {doc.type}</span>
                      </div>
                      <StatusBadge status={doc.status} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-[#E6E8EC] bg-[#F7F8FA] flex items-center justify-between">
            <span className="text-xs text-[#667085]">
              Created {workflow.createdDate}
            </span>
            <Link
              to={`/workflows/${workflow.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14213D] text-white text-xs font-medium hover:bg-[#1E293B] transition-colors"
            >
              <span>Open Full Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowDetailsDrawer;
