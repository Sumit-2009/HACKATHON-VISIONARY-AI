import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export const LoadingSkeleton = ({ lines = 4, height = "h-4" }) => {
  return (
    <div className="w-full animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-[#E6E8EC] rounded-lg ${
            i === 0 ? 'w-2/3' : i === lines - 1 ? 'w-1/2' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export const AIProcessingState = ({ currentStepIndex = 1 }) => {
  const steps = [
    "FlowMind AI is analyzing...",
    "Understanding workflow stages",
    "Identifying bottlenecks",
    "Evaluating SLA risk",
    "Generating recommendations"
  ];

  return (
    <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-3xl p-10 text-center max-w-lg mx-auto shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-[#6366F1] text-white flex items-center justify-center mx-auto mb-6 shadow-md animate-pulse">
        <Sparkles className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-semibold text-[#101828]">
        FlowMind AI
      </h3>
      <p className="text-sm text-[#4F46E5] font-medium mt-1">
        Analyzing workflow telemetry...
      </p>

      <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                {isDone ? (
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-[#6366F1] animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#D0D5DD]" />
                )}
              </div>
              <span className={`font-normal ${
                isDone ? 'text-[#667085]' : isCurrent ? 'text-[#101828] font-medium' : 'text-[#98A2B3]'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
