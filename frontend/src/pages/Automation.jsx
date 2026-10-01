import React, { useState, useEffect } from 'react';
import { Cpu, Zap, CheckCircle2, Clock, Play, Settings, X, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import { automationsAPI } from '../api/client';

export const Automation = () => {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = async () => {
    setLoading(true);
    try {
      const res = await automationsAPI.list();
      setAutomations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEnable = async (auto, e) => {
    e.stopPropagation();
    const newEnabled = !auto.enabled;
    try {
      const res = await automationsAPI.update(auto.id, {
        enabled: newEnabled,
        status: newEnabled ? "Active" : "Inactive"
      });

      setAutomations(prev => prev.map(a => a.id === auto.id ? res.data : a));
      showToast(`${auto.title} ${newEnabled ? 'enabled' : 'disabled'}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunNow = async (auto) => {
    try {
      const res = await automationsAPI.trigger(auto.id);
      setAutomations(prev => prev.map(a => a.id === auto.id ? res.data.automation : a));
      showToast(`Triggered execution: ${auto.title}`);
      if (selectedAuto) setSelectedAuto(res.data.automation);
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#111827] text-white px-6 py-3.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
          Autonomous Rules
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
          AI Automation Center.
        </h1>
        <p className="text-base text-[#4B5563] mt-2 font-normal">
          Turn repetitive workflow decisions into intelligent automation.
        </p>
      </div>

      {/* Automation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className="bg-white border border-[#E5E7EB] rounded-[32px] p-8 shadow-[0_16px_40px_-10px_rgba(16,24,40,0.06)] flex flex-col justify-between group hover:shadow-[0_24px_50px_-10px_rgba(16,24,40,0.1)] transition-all"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-[#EEF4FF] px-3 py-1 rounded-full">
                  {auto.id}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  auto.status === 'Active' ? 'bg-[#ECFDF3] text-[#15803D]' : 'bg-[#F4F5F8] text-[#6B7280]'
                }`}>
                  ● {auto.status}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors leading-snug">
                {auto.title}
              </h3>
              <p className="text-xs text-[#4B5563] mt-2.5 font-normal leading-relaxed line-clamp-3">
                {auto.description}
              </p>

              {/* Key Metrics */}
              <div className="mt-6 pt-6 border-t border-[#F2F4F7] grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[#9CA3AF] font-medium block mb-1">Executions</span>
                  <span className="font-extrabold text-[#111827] text-base">
                    {auto.executions?.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] font-medium block mb-1">Success</span>
                  <span className="font-extrabold text-[#15803D] text-base">
                    {auto.successRate}%
                  </span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] font-medium block mb-1">Last Run</span>
                  <span className="font-semibold text-[#4B5563] truncate block">
                    {auto.lastRun}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: WeTransfer Pill Style */}
            <div className="mt-8 pt-5 border-t border-[#F2F4F7] flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedAuto(auto)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#111827] bg-[#F4F5F8] border border-[#E5E7EB] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>

              <button
                onClick={(e) => handleToggleEnable(auto, e)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  auto.enabled
                    ? 'bg-[#ECFDF3] text-[#15803D] border border-[#A6F4C5] hover:bg-[#D1FADF]'
                    : 'bg-[#111827] text-white hover:bg-[#1F2937]'
                }`}
              >
                {auto.enabled ? 'Enabled' : 'Enable'}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Configure Modal */}
      {selectedAuto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#111827]/30 backdrop-blur-sm"
            onClick={() => setSelectedAuto(null)}
          />
          <div className="relative bg-white rounded-[36px] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-[#E5E7EB] z-10 space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  Configure Automation
                </h3>
              </div>
              <button
                onClick={() => setSelectedAuto(null)}
                className="p-2 text-[#6B7280] hover:text-[#111827] rounded-full hover:bg-[#F4F5F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#2563EB]">{selectedAuto.id}</span>
              <h4 className="text-lg font-bold text-[#111827] mt-0.5">{selectedAuto.title}</h4>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">{selectedAuto.description}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#F2F4F7] text-xs">
              <div>
                <label className="font-bold text-[#111827] block mb-1.5 uppercase tracking-wider">
                  Trigger Threshold
                </label>
                <input
                  type="text"
                  defaultValue="4 hours pending idle time"
                  className="w-full px-4 py-3 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-[#111827] block mb-1.5 uppercase tracking-wider">
                  Escalation Target
                </label>
                <input
                  type="text"
                  defaultValue="Department VP / Line Director"
                  className="w-full px-4 py-3 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-sm font-medium"
                />
              </div>

              <div className="p-4 bg-[#F4F2FF] rounded-2xl border border-[#DDD6FE] text-[#4F46E5] flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>FlowMind executes cryptographically verified audit records for all actions.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2F4F7] flex items-center justify-between">
              <button
                onClick={() => handleRunNow(selectedAuto)}
                className="px-5 py-2.5 rounded-full bg-[#F4F5F8] border border-[#E5E7EB] text-xs font-bold text-[#111827] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Now</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedAuto(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    showToast('Configuration updated');
                    setSelectedAuto(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#111827] text-white text-xs font-bold hover:bg-[#1F2937] cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Automation;
