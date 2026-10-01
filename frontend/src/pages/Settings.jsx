import React, { useState } from 'react';
import { Settings as SettingsIcon, Sparkles, ShieldCheck, Bell, Cpu, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { user } = useAuth();
  const [autonomyLevel, setAutonomyLevel] = useState('semi-autonomous');
  const [slaThreshold, setSlaThreshold] = useState('4');
  const [escalationTime, setEscalationTime] = useState('5');
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/FLOWMIND/PROD/ALERTS');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Toast Alert */}
      {savedToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#14213D] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
          <span>Enterprise settings saved successfully</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Settings"
        subtitle="Manage FlowMind AI autonomy levels, operational thresholds, and integrations."
      />

      <div className="space-y-8">
        
        {/* AI Autonomy Configuration */}
        <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#F2F4F7]">
            <Sparkles className="w-5 h-5 text-[#6366F1]" />
            <div>
              <h3 className="text-lg font-semibold text-[#101828]">
                AI Autonomy Engine
              </h3>
              <p className="text-xs text-[#667085]">
                Configure how FlowMind acts upon detected bottlenecks and SLA anomalies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'assisted',
                title: 'Assisted AI',
                desc: 'AI surfaces recommendations and drafts notifications. Human operator must approve every action.'
              },
              {
                id: 'semi-autonomous',
                title: 'Semi-Autonomous (Recommended)',
                desc: 'Auto-dispatches manager reminders and low-risk approvals. Escalations require confirmation.'
              },
              {
                id: 'autonomous',
                title: 'Full Autonomous',
                desc: 'End-to-end self-healing workflows, automatic re-routing, and SLA escalation.'
              }
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() => setAutonomyLevel(mode.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  autonomyLevel === mode.id
                    ? 'bg-[#F4F2FF] border-[#6366F1] ring-2 ring-indigo-50 shadow-sm'
                    : 'bg-[#F7F8FA] border-[#E6E8EC] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-[#101828]">{mode.title}</h4>
                  <span className={`w-3.5 h-3.5 rounded-full border ${
                    autonomyLevel === mode.id ? 'bg-[#6366F1] border-white' : 'border-[#D0D5DD]'
                  }`} />
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SLA & Bottleneck Thresholds */}
        <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-[#F2F4F7]">
            <h3 className="text-lg font-semibold text-[#101828]">
              SLA & Bottleneck Thresholds
            </h3>
            <p className="text-xs text-[#667085]">
              Define organizational trigger margins for automated reminders and VP escalations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="font-semibold text-[#101828] block mb-1.5 uppercase tracking-wider">
                Automated Reminder Threshold (Hours)
              </label>
              <input
                type="number"
                value={slaThreshold}
                onChange={(e) => setSlaThreshold(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium text-[#101828] outline-none"
              />
              <span className="text-[11px] text-[#98A2B3] mt-1 block">
                Dispatches Slack/Email reminder when approval is pending beyond this limit.
              </span>
            </div>

            <div>
              <label className="font-semibold text-[#101828] block mb-1.5 uppercase tracking-wider">
                Executive Escalation Trigger (Hours)
              </label>
              <input
                type="number"
                value={escalationTime}
                onChange={(e) => setEscalationTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium text-[#101828] outline-none"
              />
              <span className="text-[11px] text-[#98A2B3] mt-1 block">
                Escalates workflow ticket directly to Department VP or Financial Controller.
              </span>
            </div>
          </div>
        </div>

        {/* Webhook Notifications */}
        <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-[#F2F4F7]">
            <h3 className="text-lg font-semibold text-[#101828]">
              Enterprise Integrations
            </h3>
            <p className="text-xs text-[#667085]">
              Real-time operational event webhooks
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#101828] block mb-1.5 uppercase tracking-wider">
                Slack / Teams Incoming Webhook URL
              </label>
              <input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium text-[#101828] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action Save Bar */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-xs text-[#98A2B3]">
            FlowMind Enterprise Build v2.0.0
          </span>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#14213D] text-white text-sm font-semibold hover:bg-[#1E293B] transition-colors shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default Settings;
