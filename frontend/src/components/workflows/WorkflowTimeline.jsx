import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, ArrowDown } from 'lucide-react';

export const WorkflowTimeline = ({ stages = [], currentBottleneck }) => {
  if (!stages || stages.length === 0) {
    return <div className="text-sm text-[#98A2B3]">No stage telemetry recorded.</div>;
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E6E8EC]">
      {stages.map((stage, idx) => {
        const isCompleted = stage.status === 'completed';
        const isBottleneck = stage.status === 'bottleneck' || stage.isCurrent && (stage.name === currentBottleneck || stage.name.includes('Bottleneck') || (stage.pendingHours && stage.pendingHours > 4));
        const isInProgress = stage.status === 'in-progress' || stage.isCurrent;

        return (
          <div key={idx} className="relative group">
            {/* Timeline node icon */}
            <div className={`absolute -left-[30px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
              isBottleneck
                ? 'bg-[#FFF1F2] border-[#DC2626] text-[#DC2626] ring-4 ring-red-50'
                : isCompleted
                ? 'bg-[#ECFDF3] border-[#15803D] text-[#15803D]'
                : isInProgress
                ? 'bg-[#EEF4FF] border-[#2563EB] text-[#2563EB] ring-4 ring-blue-50'
                : 'bg-white border-[#D0D5DD] text-[#98A2B3]'
            }`}>
              {isBottleneck ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
            </div>

            {/* Stage Content */}
            <div className={`rounded-2xl p-4 transition-all ${
              isBottleneck
                ? 'bg-[#FFF8F8] border border-[#FECDCA]'
                : isInProgress
                ? 'bg-white border border-[#E6E8EC] shadow-sm'
                : 'bg-transparent'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-semibold ${
                    isBottleneck ? 'text-[#DC2626]' : 'text-[#101828]'
                  }`}>
                    {stage.name}
                  </h4>
                  {isBottleneck && (
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#FFF1F2] text-[#DC2626] border border-[#FECDCA] rounded-full">
                      Current bottleneck
                    </span>
                  )}
                  {isInProgress && !isBottleneck && (
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-[#EEF4FF] text-[#2563EB] rounded-full">
                      Active stage
                    </span>
                  )}
                </div>

                <span className="text-xs text-[#667085] font-medium">
                  {stage.duration || stage.estimatedTime}
                </span>
              </div>

              {stage.pendingHours && (
                <p className="text-xs text-[#DC2626] font-medium mt-1">
                  ⚠️ {stage.pendingHours} hours pending (exceeds SLA baseline)
                </p>
              )}

              {stage.timestamp && (
                <p className="text-[11px] text-[#98A2B3] mt-1">
                  Recorded: {stage.timestamp}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkflowTimeline;
