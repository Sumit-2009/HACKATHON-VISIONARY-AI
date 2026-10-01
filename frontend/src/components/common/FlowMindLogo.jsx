import React from 'react';

/**
 * FlowMind Logo Mark & Wordmark
 * Inspired by:
 * - flowing paths (curved gradient streams)
 * - connected nodes (discrete workflow stages)
 * - subtle spark (intelligence & autonomous action)
 *
 * Fully responsive and theme-adaptable (light, dark, monochrome).
 */
export const FlowMindLogo = ({
  size = 'md', // 'sm' | 'md' | 'lg'
  showTagline = true,
  showText = true,
  className = ''
}) => {
  // Size mapping
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const taglineSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[10px]'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Logo Mark */}
      <div
        className={`${iconSizes[size]} relative rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 logo-badge-bg`}
        style={{
          background: 'var(--logo-bg, #111827)'
        }}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          <defs>
            {/* Gradient for flowing workflow path */}
            <linearGradient id="flowPathGrad" x1="6" y1="8" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--logo-accent-1, #818CF8)" />
              <stop offset="0.5" stopColor="var(--logo-accent-2, #6366F1)" />
              <stop offset="1" stopColor="var(--logo-accent-3, #3B82F6)" />
            </linearGradient>

            {/* Spark glow */}
            <radialGradient id="sparkGlow" cx="24" cy="12" r="6" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--logo-spark-glow, rgba(165, 180, 252, 0.8))" />
              <stop offset="1" stopColor="rgba(99, 102, 241, 0)" />
            </radialGradient>
          </defs>

          {/* Flowing Path 1: Primary S-curve stream */}
          <path
            d="M7 26C11 26 13 18 19 18C25 18 26 10 30 10"
            stroke="url(#flowPathGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Flowing Path 2: Converging lower stream */}
          <path
            d="M8 12C12 12 15 18 19 18C22 18 25 24 29 25"
            stroke="var(--logo-accent-subtle, rgba(255, 255, 255, 0.35))"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="2.5 3"
          />

          {/* Connected Node 1 (Start / Intake) */}
          <circle cx="7" cy="26" r="2.5" fill="#FFFFFF" />
          <circle cx="7" cy="26" r="1.2" fill="var(--logo-accent-2, #6366F1)" />

          {/* Connected Node 2 (Center Intelligence Confluence) */}
          <circle cx="19" cy="18" r="3" fill="#FFFFFF" />
          <circle cx="19" cy="18" r="1.5" fill="var(--logo-accent-2, #6366F1)" />

          {/* Connected Node 3 (Output / Automated Completion) */}
          <circle cx="30" cy="10" r="2.5" fill="#FFFFFF" />
          <circle cx="30" cy="10" r="1.2" fill="var(--logo-accent-3, #3B82F6)" />

          {/* Intelligence Spark at Confluence (Autonomous Sparkle) */}
          <path
            d="M19 11L19.8 13.2L22 14L19.8 14.8L19 17L18.2 14.8L16 14L18.2 13.2L19 11Z"
            fill="var(--logo-spark, #A5B4FC)"
          />
        </svg>
      </div>

      {/* Wordmark Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className={`${textSizes[size]} font-bold tracking-tight transition-colors duration-200`}
              style={{ color: 'var(--text-primary, #111827)' }}
            >
              FlowMind
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block mb-0.5 transition-colors duration-200"
              style={{ background: 'var(--accent-ai, #6366F1)' }}
            />
          </div>

          {showTagline && (
            <span
              className={`${taglineSizes[size]} font-bold uppercase tracking-[0.22em] mt-1 transition-colors duration-200`}
              style={{ color: 'var(--text-muted, #6B7280)' }}
            >
              WORKFLOW INTELLIGENCE
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FlowMindLogo;
