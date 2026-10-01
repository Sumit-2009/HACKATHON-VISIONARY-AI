import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AIInsightCard = ({
  title = "AI Operational Insight",
  content,
  confidence = 94,
  primaryActionLabel = "View Bottleneck",
  secondaryActionLabel = "Optimize Workflow",
  onPrimaryAction,
  onSecondaryAction,
  badgeText = "FlowMind Intelligence",
  highlightMetric,
}) => {
  return (
    <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all hover:border-[#C4B5FD]">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6366F1] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#4F46E5] uppercase tracking-wider">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/80 border border-[#DDD6FE] text-[#4F46E5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              AI Confidence {confidence}%
            </span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-[#101828] font-normal leading-relaxed max-w-3xl mt-2">
          {content}
        </p>

        {highlightMetric && (
          <div className="mt-4 pt-4 border-t border-[#E0E7FF] flex items-center gap-4 text-sm text-[#4F46E5]">
            <span className="font-semibold">{highlightMetric.label}:</span>
            <span>{highlightMetric.value}</span>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {primaryActionLabel && onPrimaryAction && (
            <button
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-sm font-medium hover:bg-[#1E293B] transition-colors shadow-sm cursor-pointer"
            >
              <span>{primaryActionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#DDD6FE] text-[#4F46E5] text-sm font-medium hover:bg-[#FAF9FF] transition-colors cursor-pointer"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;
