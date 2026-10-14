import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Whether the modal dialog is currently visible
 * @property {() => void} onClose - Callback handler invoked to dismiss the modal
 * @property {string} [title] - Optional title displayed in the pinned header
 * @property {React.ReactNode} children - Modal body contents to render
 * @property {string} [maxWidth='max-w-4xl'] - Maximum width container constraint class
 */

/**
 * High-performance, accessible modal dialog rendered via React Portal directly at document.body level.
 *
 * Architecture highlights:
 * - Uses React Portal (`createPortal`) to break out of nested parent stacking contexts (e.g. section z-index).
 * - Highest elevation layer (`z-[100]`) ensuring it renders strictly above fixed elements such as Navbar (`z-40`).
 * - Pinned non-collapsing header (`flex-shrink-0`) keeping title and close (X) button fully visible on all viewports.
 * - Viewport-aware scroll container (`max-h-[calc(100vh-3rem)]`) preventing clipping on short mobile or desktop displays.
 * - Keyboard (Escape key) and dimmed backdrop click dismissing with body scroll locking.
 *
 * @param {ModalProps} props
 * @returns {JSX.Element|null}
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-4xl',
}) {
  useEffect(() => {
    if (!isOpen) return;

    // Dismiss modal on Escape key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock page background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Return null if modal is closed or SSR document object is absent
  if (!isOpen || typeof document === 'undefined') return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] overflow-y-auto p-3 sm:p-6 text-center select-none"
    >
      {/* Dimmed backdrop overlay with smooth blur */}
      <div
        className="fixed inset-0 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Alignment helper ensuring vertical centering without clipping tops on small viewports */}
      <div className="flex min-h-full items-center justify-center">
        {/* Modal Dialog Box */}
        <div
          className={cn(
            'relative w-full my-auto flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 text-left select-text animate-in zoom-in-95 duration-200',
            maxWidth
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Futuristic top cyan glow streak */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent pointer-events-none" />

          {/* Pinned Modal Header (Never scrolls away) */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-brand-border bg-white dark:bg-brand-surface z-10">
            <h3
              id="modal-title"
              className="text-lg sm:text-xl font-bold text-brand-text tracking-wide truncate pr-4"
            >
              {title || 'Project Showcase'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-brand-textSecondary hover:text-brand-text hover:bg-slate-100 dark:hover:bg-brand-card transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              aria-label="Close modal dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Internally Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
