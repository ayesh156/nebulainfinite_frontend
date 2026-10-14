import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
 * Enhanced with fluid Framer Motion exit and entrance transitions.
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[100] overflow-y-auto p-3 sm:p-6 text-center select-none"
        >
          {/* Dimmed backdrop overlay with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Alignment helper ensuring vertical centering without clipping tops on small viewports */}
          <div className="flex min-h-full items-center justify-center">
            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className={cn(
                'relative w-full my-auto flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 text-left select-text',
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
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-brand-textSecondary hover:text-brand-text hover:bg-slate-100 dark:hover:bg-brand-card transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  aria-label="Close modal dialog"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Internally Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
