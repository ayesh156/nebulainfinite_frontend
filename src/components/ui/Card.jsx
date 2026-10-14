import React from 'react';
import { cn } from '../../utils/cn';

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Card content
 * @property {string} [className] - Additional classes
 * @property {boolean} [hoverGlow=true] - Whether to activate glowing borders on hover
 * @property {boolean} [glass=true] - Glassmorphism backdrop blur
 * @property {() => void} [onClick] - Click handler
 */

/**
 * Glassmorphic surface container with futuristic cyber border and hover illumination.
 *
 * @param {CardProps & React.HTMLAttributes<HTMLDivElement>} props
 * @returns {JSX.Element}
 */
export function Card({
  children,
  className = '',
  hoverGlow = true,
  glass = true,
  onClick,
  ...rest
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border transition-all duration-300 overflow-hidden',
        glass
          ? 'bg-white/95 dark:bg-brand-surface/75 backdrop-blur-xl border-slate-200/90 dark:border-brand-border/60 shadow-xs dark:shadow-none'
          : 'bg-slate-50 dark:bg-brand-card border-slate-200 dark:border-brand-border',
        hoverGlow &&
          'hover:border-cyan-500/50 hover:shadow-[0_12px_30px_rgba(2,132,199,0.1)] dark:hover:shadow-[0_8px_30px_rgba(0,242,254,0.12)] hover:-translate-y-1',
        className
      )}
      {...rest}
    >
      {/* Subtle top reflective accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/40 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

/**
 * Header section inside a Card.
 */
export function CardHeader({ children, className = '' }) {
  return <div className={cn('p-6 pb-3', className)}>{children}</div>;
}

/**
 * Main body section inside a Card.
 */
export function CardContent({ children, className = '' }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

/**
 * Footer action area inside a Card.
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={cn('p-6 pt-3 border-t border-brand-border/40', className)}>
      {children}
    </div>
  );
}
