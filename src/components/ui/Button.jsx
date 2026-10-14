import React from 'react';
import { cn } from '../../utils/cn';

/**
 * @typedef {'primary' | 'cyan' | 'outline' | 'ghost' | 'glow'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 *
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} [children] - Button label/content
 * @property {ButtonVariant} [variant='primary'] - Visual styling variant
 * @property {ButtonSize} [size='md'] - Sizing option
 * @property {string} [className] - Additional Tailwind classes
 * @property {string} [href] - If supplied, component renders as an anchor tag
 * @property {React.ReactNode} [icon] - Leading icon element
 * @property {React.ReactNode} [iconRight] - Trailing icon element
 * @property {boolean} [disabled=false] - Disabled state
 * @property {() => void} [onClick] - Click handler
 */

/**
 * Reusable high-converting button component supporting multiple themes.
 * Automatically adapts between a native <button> and an <a> link if href is provided.
 *
 * @param {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>} props
 * @returns {JSX.Element}
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  icon,
  iconRight,
  disabled = false,
  onClick,
  ...rest
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 active:scale-[0.98] select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-lg',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-500 dark:via-sky-500 dark:to-blue-600 text-white shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:brightness-105 shadow-md border border-cyan-400/30',
    cyan:
      'bg-cyan-600 dark:bg-brand-cyan text-white dark:text-slate-950 font-semibold shadow-md shadow-cyan-600/20 dark:shadow-cyan-400/20 hover:bg-cyan-700 dark:hover:bg-cyan-300 hover:shadow-lg',
    outline:
      'border border-slate-300 dark:border-brand-border bg-white/80 dark:bg-brand-surface/70 backdrop-blur-md text-brand-text hover:border-brand-cyan hover:text-brand-cyan hover:bg-slate-100 dark:hover:bg-brand-card shadow-xs',
    ghost:
      'text-brand-textSecondary hover:text-brand-cyan hover:bg-slate-100 dark:hover:bg-brand-card/60',
    glow:
      'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-brand-cyan dark:to-blue-500 text-white dark:text-slate-950 font-bold shadow-[0_4px_20px_rgba(2,132,199,0.3)] dark:shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_6px_25px_rgba(2,132,199,0.45)] dark:hover:shadow-[0_0_35px_rgba(0,242,254,0.65)] hover:scale-[1.02]',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabledStyles,
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        {...rest}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button
      type={rest.type || 'button'}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </button>
  );
}
