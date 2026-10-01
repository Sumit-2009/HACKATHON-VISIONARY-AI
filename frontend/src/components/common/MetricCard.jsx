import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

/**
 * Enterprise Metric Card with Mini Sparkline
 * Fully theme-compatible (Light, Dark, Monochrome)
 */
export const MetricCard = ({
  label,
  value,
  delta,
  isPositiveGood = true,
  subtitle,
  icon: Icon,
  sparklineData = [12, 18, 14, 22, 19, 28, 25, 32]
}) => {
  const isPositive = delta ? delta.startsWith('+') : false;
  const isNeutral = !delta || delta === '0%';
  const isGood = isPositiveGood ? isPositive : !isPositive;

  // Generate SVG path for sparkline
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const width = 80;
  const height = 28;

  const points = sparklineData.map((val, idx) => {
    const x = (idx / (sparklineData.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      className="rounded-[28px] p-6 border shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group theme-card relative overflow-hidden"
      style={{
        background: 'var(--bg-card, #FFFFFF)',
        borderColor: 'var(--border-color, #E5E7EB)'
      }}
    >
      {/* Top Label & Icon / Sparkline */}
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-bold uppercase tracking-wider transition-colors truncate"
          style={{ color: 'var(--text-muted, #9CA3AF)' }}
        >
          {label}
        </span>

        {/* Mini SVG Sparkline */}
        <div className="w-20 h-7 opacity-75 group-hover:opacity-100 transition-opacity">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={
                isNeutral
                  ? 'var(--text-muted, #9CA3AF)'
                  : isGood
                  ? 'var(--status-success, #15803D)'
                  : 'var(--status-danger, #DC2626)'
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      {/* Main Dominant Metric Number & Delta Badge */}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div
          className="text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors"
          style={{ color: 'var(--text-primary, #111827)' }}
        >
          {value}
        </div>

        {delta && (
          <span
            className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 transition-colors"
            style={{
              background: isGood
                ? 'var(--status-success-bg, #ECFDF3)'
                : 'var(--status-danger-bg, #FEF2F2)',
              color: isGood
                ? 'var(--status-success, #15803D)'
                : 'var(--status-danger, #DC2626)'
            }}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : isNeutral ? (
              <Minus className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {delta}
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <span
          className="text-xs mt-2 block font-normal transition-colors"
          style={{ color: 'var(--text-secondary, #6B7280)' }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default MetricCard;
