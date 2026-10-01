import React from 'react';
import { Layers, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  title = "No workflow bottlenecks detected.",
  description = "FlowMind AI is continuously monitoring your workflows and organizational SLAs.",
  actionText,
  actionLink,
  onAction,
  icon: Icon = Layers
}) => {
  return (
    <div className="bg-white border border-[#E6E8EC] rounded-3xl p-12 text-center max-w-xl mx-auto my-6">
      <div className="w-12 h-12 rounded-2xl bg-[#F7F8FA] border border-[#E6E8EC] flex items-center justify-center text-[#667085] mx-auto mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-[#101828]">
        {title}
      </h3>
      <p className="text-sm text-[#667085] mt-2 font-normal leading-relaxed max-w-md mx-auto">
        {description}
      </p>

      {actionText && (actionLink || onAction) && (
        <div className="mt-6">
          {actionLink ? (
            <Link
              to={actionLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-sm font-medium hover:bg-[#1E293B] transition-colors"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-sm font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const ErrorState = ({
  title = "Something went wrong.",
  description = "We couldn't load workflow intelligence right now.",
  onRetry,
}) => {
  return (
    <div className="bg-white border border-[#E6E8EC] rounded-3xl p-12 text-center max-w-xl mx-auto my-6">
      <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] border border-[#FECDCA] flex items-center justify-center text-[#DC2626] mx-auto mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-[#101828]">
        {title}
      </h3>
      <p className="text-sm text-[#667085] mt-2 font-normal leading-relaxed">
        {description}
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-sm font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            Retry
          </button>
        )}
        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] text-[#101828] text-sm font-medium hover:bg-[#EEF4FF] transition-colors"
        >
          Return to Command Center
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
