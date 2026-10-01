import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Send,
  AlertOctagon,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import RiskBadge from '../components/common/RiskBadge';
import StatusBadge from '../components/common/StatusBadge';
import { approvalsAPI } from '../api/client';

export const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Pending' | 'High Risk' | 'SLA-critical' | 'Recently completed'
  const [department, setDepartment] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadApprovals();
  }, [activeTab, department]);

  const loadApprovals = async () => {
    setLoading(true);
    try {
      const res = await approvalsAPI.list({
        filter: activeTab !== 'All' ? activeTab : undefined,
        department
      });
      setApprovals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await approvalsAPI.action(id, { action });
      setApprovals(prev => prev.map(a => a.id === id ? res.data.approval : a));
      showToast(`Action '${action}' applied to ${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs = ['All', 'Pending approvals', 'High-risk approvals', 'SLA-critical approvals', 'Recently completed'];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#14213D] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-[#15803D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Approvals"
        subtitle="Review, accelerate, and automate pending organizational sign-offs."
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E6E8EC]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? 'border-b-2 border-[#2563EB] text-[#101828] bg-white'
                : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Approvals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvals.map((app) => (
          <div
            key={app.id}
            className="editorial-card p-6 md:p-8 flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-medium text-[#2563EB] bg-[#EEF4FF] px-2.5 py-0.5 rounded-md">
                  {app.id}
                </span>
                <RiskBadge risk={app.risk} />
              </div>

              {/* Title & Amount */}
              <div className="flex items-start justify-between gap-4 mt-2">
                <div>
                  <h3 className="text-lg font-semibold text-[#101828] leading-tight">
                    {app.title}
                  </h3>
                  <span className="text-xs text-[#667085] mt-0.5 block">
                    {app.department} • Stage: <strong className="text-[#101828]">{app.stage}</strong>
                  </span>
                </div>
                {app.amount && app.amount !== 'N/A' && (
                  <span className="text-base font-bold text-[#101828] bg-[#F7F8FA] px-2.5 py-1 rounded-xl border border-[#E6E8EC]">
                    {app.amount}
                  </span>
                )}
              </div>

              {/* Pending Duration */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#DC2626] font-medium bg-[#FFF1F2] px-3 py-1.5 rounded-xl border border-[#FECDCA]">
                <Clock className="w-3.5 h-3.5" />
                <span>{app.pendingTime}</span>
              </div>

              {/* AI Recommendation */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#F4F2FF] border border-[#DDD6FE]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4F46E5] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Recommendation</span>
                </div>
                <p className="text-xs text-[#101828] leading-relaxed">
                  💡 {app.aiRecommendation}
                </p>
              </div>

              <div className="mt-4 text-xs text-[#667085] space-y-1">
                <p>Initiator: <span className="font-medium text-[#101828]">{app.owner}</span></p>
                <p>Assigned Approver: <span className="font-medium text-[#101828]">{app.approver}</span></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-[#F2F4F7] flex items-center justify-between gap-2">
              {app.status === 'Approved' ? (
                <span className="text-xs font-semibold text-[#15803D] flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Approved
                </span>
              ) : (
                <>
                  <button
                    onClick={() => handleAction(app.id, 'approve')}
                    className="px-3.5 py-2 rounded-xl bg-[#14213D] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors cursor-pointer"
                  >
                    Approve
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAction(app.id, 'remind')}
                      className="p-2 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] text-[#4F46E5] hover:bg-[#F4F2FF] transition-colors cursor-pointer"
                      title="Send automated reminder"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction(app.id, 'escalate')}
                      className="p-2 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] text-[#DC2626] hover:bg-[#FFF1F2] transition-colors cursor-pointer"
                      title="Escalate approval"
                    >
                      <AlertOctagon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Approvals;
