import React from 'react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'cyan' | 'blue' | 'purple' | 'emerald' | 'outline'} BadgeVariant
 *
 * @typedef {Object} BadgeProps
 * @property {React.ReactNode} children - Badge text/content
 * @property {BadgeVariant} [variant='cyan'] - Color scheme
 * @property {boolean} [pulse=false] - Show animated blinking indicator dot
 * @property {string} [className] - Additional classes
 */

/**
 * Sleek modern badge/tag component for technology categories and status indicators.
 *
 * @param {BadgeProps} props
 * @returns {JSX.Element}
 */
export function Badge({
  children,
  variant = 'cyan',
  pulse = false,
  className = '',
}) {
  // Theme-aware high-contrast badge styles with crisp borders and optimal legibility
  const variantStyles = {
    cyan: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-300/80 dark:border-cyan-500/40 font-semibold shadow-xs',
    blue: 'bg-blue-50 dark:bg-blue-950/60 text-blue-950 dark:text-sky-300 border-blue-200 dark:border-blue-500/40 font-semibold shadow-xs',
    purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-500/40 font-semibold shadow-xs',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40 font-semibold shadow-xs',
    outline: 'bg-slate-100/90 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700/80 font-semibold shadow-xs',
  };

  const pulseColors = {
    cyan: 'bg-cyan-500 dark:bg-cyan-400',
    blue: 'bg-sky-500 dark:bg-sky-400',
    purple: 'bg-purple-500 dark:bg-purple-400',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    outline: 'bg-slate-500 dark:bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide border backdrop-blur-md select-none',
        variantStyles[variant] || variantStyles.cyan,
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              pulseColors[variant] || pulseColors.cyan
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              pulseColors[variant] || pulseColors.cyan
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
