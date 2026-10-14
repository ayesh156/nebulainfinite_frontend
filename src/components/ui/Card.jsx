import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Card content
 * @property {string} [className] - Additional classes
 * @property {boolean} [hoverGlow=true] - Whether to activate glowing borders and micro-interaction elevation on hover
 * @property {boolean} [glass=true] - Glassmorphism backdrop blur
 * @property {() => void} [onClick] - Click handler
 */

/**
 * Glassmorphic surface container with futuristic cyber border and hover illumination.
 * Enhanced with Framer Motion hardware-accelerated micro-interactions.
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
    <motion.div
      onClick={onClick}
      whileHover={
        hoverGlow
          ? {
              y: -4,
              transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
            }
          : undefined
      }
      className={cn(
        'relative rounded-2xl border transition-colors duration-300 overflow-hidden',
        glass
          ? 'bg-white/95 dark:bg-brand-surface/75 backdrop-blur-xl border-slate-200/90 dark:border-brand-border/60 shadow-xs dark:shadow-none'
          : 'bg-slate-50 dark:bg-brand-card border-slate-200 dark:border-brand-border',
        hoverGlow &&
          'hover:border-cyan-500/50 hover:shadow-[0_12px_30px_rgba(2,132,199,0.1)] dark:hover:shadow-[0_8px_30px_rgba(0,242,254,0.12)]',
        className
      )}
      {...rest}
    >
      {/* Subtle top reflective accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/40 to-transparent pointer-events-none" />
      {children}
    </motion.div>
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
