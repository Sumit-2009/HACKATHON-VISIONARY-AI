import React from 'react';

export const RiskBadge = ({ risk }) => {
  const norm = (risk || '').toLowerCase();

  let badgeClass = "bg-[#ECFDF3] text-[#15803D] border-[#A6F4C5]";
  let dot = "bg-[#15803D]";

  if (norm.includes('high')) {
    badgeClass = "bg-[#FFF1F2] text-[#DC2626] border-[#FECDCA]";
    dot = "bg-[#DC2626]";
  } else if (norm.includes('med')) {
    badgeClass = "bg-[#FFFAEB] text-[#B45309] border-[#FEDF89]";
    dot = "bg-[#B45309]";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${badgeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span>{risk}</span>
    </span>
  );
};

export default RiskBadge;
