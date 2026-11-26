import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader2, Monitor, ShieldCheck } from 'lucide-react';

/**
 * @typedef {Object} ProjectPreviewModalProps
 * @property {import('../data/projects').ProjectItem | null} project - The project to preview, or null when closed
 * @property {() => void} onClose - Callback invoked to dismiss the preview modal
 */

/**
 * Interactive 80%-width desktop live demo preview modal rendered via React Portal at `z-[100]`
 * (above the fixed Navbar). Features a sleek browser-style top bar, smooth iframe loading overlay,
 * prominent "Open in New Tab" CTA, Escape key & backdrop dismissal, and body scroll lock.
 *
 * @param {ProjectPreviewModalProps} props
 * @returns {JSX.Element | null}
 */
export function ProjectPreviewModal({ project, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  const isOpen = Boolean(project && project.hasLiveDemo && project.demoUrl);

  // Reset loading spinner whenever a new project demo is opened
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, project?.id]);

  // Lock body scroll and bind Escape key dismissal while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

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
      {isOpen && project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-preview-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-6"
        >
          {/* Glassmorphic dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/80 dark:bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* 80%-width desktop modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[95vw] lg:w-[80vw] max-w-[1600px] h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-cyan-500/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.45)] dark:shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden"
          >
            {/* Top cyan illumination line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent pointer-events-none z-20" />

            {/* Sleek Browser-Style Top Bar */}
            <div className="flex-shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-50/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-brand-border/80 backdrop-blur-xl">
              {/* Left: Window dots + Title + Live Badge */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-2.5 min-w-0">
                  <Monitor className="w-4 h-4 text-cyan-600 dark:text-brand-cyan shrink-0 sm:hidden" />
                  <h3
                    id="project-preview-title"
                    className="text-sm sm:text-base font-bold text-brand-text font-display truncate"
                  >
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Interactive Demo
                  </span>
                </div>
              </div>

              {/* Center URL pill on large screens */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-brand-textSecondary max-w-md truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{project.demoUrl}</span>
              </div>

              {/* Right: Open in New Tab CTA + Close Button */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-brand-cyan dark:to-blue-500 text-white dark:text-slate-950 shadow-[0_4px_15px_rgba(2,132,199,0.25)] dark:shadow-[0_0_18px_rgba(0,242,254,0.3)] hover:brightness-110 transition-all"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-brand-textSecondary hover:text-brand-text hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  aria-label="Close live preview modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Live Demo Iframe Viewport */}
            <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
              {/* Loading Spinner Overlay until iframe fires onLoad */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-950/90 backdrop-blur-sm text-center px-4">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                    <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">
                      Launching {project.title}...
                    </p>
                    <p className="text-xs text-slate-400">
                      Connecting to live interactive environment
                    </p>
                  </div>
                </div>
              )}

              <iframe
                src={project.demoUrl}
                title={`${project.title} — Live Interactive Demo`}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0 bg-white"
                allow="clipboard-write; fullscreen"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
