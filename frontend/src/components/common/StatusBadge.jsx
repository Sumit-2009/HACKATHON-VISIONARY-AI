import React from 'react';

export const StatusBadge = ({ status, size = "md" }) => {
  const norm = (status || '').toLowerCase();
  
  let styles = "bg-[#F2F4F7] text-[#344054] border-[#E4E7EC]";
  let dotColor = "bg-[#667085]";

  if (norm.includes('bottleneck') || norm.includes('delay') || norm.includes('breach') || norm.includes('overdue')) {
    styles = "bg-[#FFF1F2] text-[#B42318] border-[#FECDCA]";
    dotColor = "bg-[#DC2626]";
  } else if (norm.includes('risk') || norm.includes('warning') || norm.includes('action needed')) {
    styles = "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]";
    dotColor = "bg-[#B45309]";
  } else if (norm.includes('completed') || norm.includes('approved') || norm.includes('verified') || norm.includes('active') || norm.includes('on track')) {
    styles = "bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]";
    dotColor = "bg-[#15803D]";
  } else if (norm.includes('in-progress') || norm.includes('progress') || norm.includes('in review')) {
    styles = "bg-[#EEF4FF] text-[#175CD3] border-[#C7D7FE]";
    dotColor = "bg-[#2563EB]";
  }

  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-[11px]" 
    : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${styles} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default StatusBadge;
