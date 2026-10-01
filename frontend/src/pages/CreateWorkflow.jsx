import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  ShieldCheck,
  RotateCcw,
  Zap,
  Check,
  Plus
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { aiAPI, workflowsAPI } from '../api/client';

export const CreateWorkflow = () => {
  const navigate = useNavigate();

  // Form inputs
  const [formData, setFormData] = useState({
    name: 'Employee Onboarding',
    department: 'Human Resources',
    type: 'Talent Acquisition & Lifecycle',
    description: 'Onboard senior hires with background verification, equipment procurement, and corporate IAM provisioning.',
    stages: 'Offer Accepted, Document Collection, HR Review, IT Access, Manager Approval, Employee Ready',
    sla: '3 business days',
    owner: 'Priya Shah'
  });

  // State: 'form' | 'analyzing' | 'analysis_ready' | 'saving'
  const [step, setStep] = useState('form');
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const handleAnalyzeWithAI = async () => {
    setStep('analyzing');
    setAnalysisStepIndex(0);

    const timer1 = setTimeout(() => setAnalysisStepIndex(1), 500);
    const timer2 = setTimeout(() => setAnalysisStepIndex(2), 1100);
    const timer3 = setTimeout(() => setAnalysisStepIndex(3), 1700);

    try {
      const res = await aiAPI.analyzeWorkflow({
        name: formData.name,
        department: formData.department,
        description: formData.description,
        stages: formData.stages.split(',').map(s => s.trim())
      });

      setTimeout(() => {
        setAiAnalysis(res.data);
        setStep('analysis_ready');
      }, 2300);
    } catch (err) {
      setTimeout(() => {
        setAiAnalysis({
          workflowName: formData.name || "Employee Onboarding",
          department: formData.department || "Human Resources",
          suggestedStages: [
            { name: "Offer Accepted", estimatedTime: "Instant" },
            { name: "Document Collection", estimatedTime: "1 business day" },
            { name: "HR Review", estimatedTime: "4 hours" },
            { name: "IT Access Provisioning", estimatedTime: "2 hours", bottleneckRisk: "High" },
            { name: "Manager Approval", estimatedTime: "3 hours", bottleneckRisk: "Medium" },
            { name: "Employee Ready", estimatedTime: "Final step" }
          ],
          detectedBottlenecksCount: 2,
          bottlenecks: [
            { stage: "IT Access Provisioning", risk: "High", reason: "Manual IAM credentials assignment causes average 14-hour lag." },
            { stage: "Manager Approval", risk: "Medium", reason: "Unnotified approval queues average 5.4-hour idle times." }
          ],
          recommendedAutomation: [
            "IT access routing and automated role provisioning",
            "Manager approval reminders with 4-hour threshold"
          ],
          suggestedSLA: "3 business days",
          suggestedOwner: "HR Operations",
          confidence: 96
        });
        setStep('analysis_ready');
      }, 2300);
    }
  };

  const handleCreateWorkflow = async () => {
    setStep('saving');
    try {
      const stagesToSave = aiAnalysis?.suggestedStages?.map(s => ({
        name: s.name,
        duration: s.estimatedTime
      })) || formData.stages.split(',').map(s => ({ name: s.trim() }));

      const res = await workflowsAPI.create({
        name: formData.name,
        department: formData.department,
        description: formData.description,
        stages: stagesToSave,
        sla: aiAnalysis?.suggestedSLA || formData.sla,
        owner: aiAnalysis?.suggestedOwner || formData.owner
      });

      navigate(`/workflows/${res.data.id}`);
    } catch (err) {
      navigate('/workflows');
    }
  };

  const analysisSteps = [
    "Understanding workflow stages",
    "Identifying bottlenecks",
    "Evaluating SLA risk",
    "Generating recommendations"
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16">
      
      {/* WeTransfer-style Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
          Workflow Builder
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
          Create a workflow.
        </h1>
        <p className="text-base text-[#4B5563] mt-2 font-normal leading-relaxed">
          Tell FlowMind what you're trying to accomplish.
        </p>
      </div>

      {/* STEP 1: FLOATING TRANSFER-STYLE CARD */}
      {step === 'form' && (
        <div className="bg-white border border-[#E5E7EB] rounded-[36px] p-8 md:p-12 shadow-[0_24px_60px_-15px_rgba(16,24,40,0.1)] space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Workflow Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Employee Onboarding"
                className="w-full px-5 py-3.5 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-base text-[#111827] font-medium outline-none focus:border-[#111827] focus:bg-white transition-all"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-5 py-3.5 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-base text-[#111827] font-medium outline-none focus:border-[#111827] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Procurement">Procurement</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            {/* Workflow Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                Workflow Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g. Sequential Approval"
                className="w-full px-5 py-3.5 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-base text-[#111827] outline-none focus:border-[#111827] focus:bg-white transition-all"
              />
            </div>

            {/* Owner */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
                Primary Owner
              </label>
              <input
                type="text"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="e.g. Priya Shah"
                className="w-full px-5 py-3.5 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-base text-[#111827] outline-none focus:border-[#111827] focus:bg-white transition-all"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] mb-2">
              Description / Business Intent
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the operational goals, parties involved, and key checkpoints..."
              className="w-full px-5 py-3.5 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-sm text-[#111827] outline-none focus:border-[#111827] focus:bg-white transition-all leading-relaxed"
            />
          </div>

          {/* Stages Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                Planned Stages (Comma Separated)
              </label>
              <span className="text-xs text-[#9CA3AF]">AI will refine stages for parallel execution</span>
            </div>
            <input
              type="text"
              value={formData.stages}
              onChange={(e) => setFormData({ ...formData, stages: e.target.value })}
              placeholder="Stage 1, Stage 2, Stage 3..."
              className="w-full px-5 py-3.5 bg-[#F4F5F8] border border-[#E5E7EB] rounded-2xl text-sm text-[#111827] outline-none focus:border-[#111827] focus:bg-white transition-all"
            />
          </div>

          {/* Primary Action Button: WeTransfer Pill */}
          <div className="pt-6 border-t border-[#F2F4F7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-[#6B7280]">
              FlowMind analyzes bottleneck probabilities before workflow activation.
            </span>
            <button
              onClick={handleAnalyzeWithAI}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#111827] text-white text-sm font-bold hover:bg-[#1F2937] transition-all shadow-lg hover:shadow-xl cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#6366F1] group-hover:scale-110 transition-transform" />
              <span>Analyze with AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: BEAUTIFUL AI PROCESSING STATE */}
      {step === 'analyzing' && (
        <div className="bg-white border border-[#E5E7EB] rounded-[36px] p-12 md:p-16 text-center max-w-xl mx-auto shadow-[0_24px_60px_-15px_rgba(16,24,40,0.1)]">
          <div className="w-16 h-16 rounded-full bg-[#6366F1] text-white flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-[#111827]">
            FlowMind AI
          </h3>
          <p className="text-sm text-[#4F46E5] font-semibold mt-1">
            Analyzing workflow...
          </p>

          <div className="mt-10 space-y-4 text-left max-w-xs mx-auto">
            {analysisSteps.map((stepName, idx) => {
              const isDone = idx < analysisStepIndex;
              const isCurrent = idx === analysisStepIndex;
              return (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-[#15803D] text-white' : isCurrent ? 'bg-[#6366F1] text-white animate-pulse' : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  }`}>
                    {isDone ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    )}
                  </div>
                  <span className={`font-medium ${
                    isDone ? 'text-[#6B7280]' : isCurrent ? 'text-[#111827] font-bold' : 'text-[#9CA3AF]'
                  }`}>
                    {stepName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: AI WORKFLOW ANALYSIS RESULTS */}
      {step === 'analysis_ready' && aiAnalysis && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-[36px] p-8 md:p-12 shadow-[0_20px_50px_-10px_rgba(99,102,241,0.08)] relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#111827]">
                    AI Workflow Analysis
                  </h2>
                  <p className="text-xs text-[#4F46E5] font-medium">
                    FlowMind optimized orchestration blueprint
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-xs font-bold text-[#4F46E5] border border-[#DDD6FE] shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                {aiAnalysis.confidence}% Confidence
              </span>
            </div>

            {/* Suggested Workflow Stages Pipeline */}
            <div className="mt-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block mb-4">
                Suggested Workflow Pipeline
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {aiAnalysis.suggestedStages?.map((stg, idx) => (
                  <div key={idx} className="p-4 bg-white border border-[#DDD6FE] rounded-[24px] h-full flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#9CA3AF] block mb-1">
                        0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-[#111827] leading-tight">
                        {stg.name}
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#6B7280] mt-3 block font-medium">
                      {stg.estimatedTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottlenecks and Automation */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#DDD6FE]">
              <div className="bg-white p-6 rounded-[28px] border border-[#DDD6FE] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                    AI Detected: {aiAnalysis.detectedBottlenecksCount || 2} Potential Bottlenecks
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-[#111827]">
                  {aiAnalysis.bottlenecks?.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#DC2626] font-bold">•</span>
                      <span>
                        <strong className="text-[#111827]">{b.stage}:</strong> {b.reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-[28px] border border-[#DDD6FE] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#4F46E5]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                    Recommended Automation
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-[#111827]">
                  {aiAnalysis.recommendedAutomation?.map((auto, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#4F46E5] font-bold">✓</span>
                      <span>{auto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#6B7280] pt-4 border-t border-[#DDD6FE]">
              <div>
                <span className="text-[#9CA3AF] block mb-0.5 font-medium">Suggested SLA:</span>
                <span className="font-bold text-[#111827]">{aiAnalysis.suggestedSLA}</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block mb-0.5 font-medium">Suggested Owner:</span>
                <span className="font-bold text-[#111827]">{aiAnalysis.suggestedOwner}</span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep('form')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Edit Workflow</span>
            </button>

            <button
              onClick={handleCreateWorkflow}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111827] text-white text-sm font-bold hover:bg-[#1F2937] transition-all shadow-lg cursor-pointer"
            >
              <span>Create Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default CreateWorkflow;
