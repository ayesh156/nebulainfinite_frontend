import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

/**
 * Floating WhatsApp trigger button positioned at the bottom right corner of the viewport.
 * Features an animated pulse indicator, tooltip badge, and quick chat launcher with Framer Motion.
 *
 * @returns {JSX.Element}
 */
export function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside
      aria-label="Quick contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Floating helper bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-white border border-slate-200 dark:border-emerald-500/40 shadow-xl backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
            <span className="text-xs font-medium">Chat with an Engineer</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5"
              aria-label="Dismiss chat hint"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-[0_8px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.7)] focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Open WhatsApp conversation with Nebula Infinite"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping opacity-75 pointer-events-none" />

        <MessageSquare className="w-7 h-7 relative z-10 fill-current text-white" />
      </motion.a>
    </aside>
  );
}
