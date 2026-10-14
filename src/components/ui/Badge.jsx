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
  const variantStyles = {
    cyan: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30',
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-sky-700 dark:text-sky-300 border-blue-200 dark:border-blue-500/30',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
    outline: 'bg-slate-100/90 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10',
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
