import React from 'react';

export const PageHeader = ({ title, subtitle, actions, breadcrumb }) => {
  return (
    <div className="mb-10">
      {breadcrumb && (
        <div className="text-xs font-medium text-[#98A2B3] tracking-wide uppercase mb-3 flex items-center gap-2">
          {breadcrumb}
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-[42px] font-semibold text-[#101828] tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-[#667085] mt-2 max-w-2xl font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
