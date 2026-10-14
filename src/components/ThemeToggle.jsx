import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Accessible theme selector toggle button supporting Dark, Light, and System modes.
 * Features:
 * - Opaque, solid background (`bg-white dark:bg-slate-900`) and crisp borders (`border-slate-200 dark:border-slate-800`).
 * - Elevated `z-50` stacking context preventing underlying navigation items or page buttons from bleeding through.
 * - Smooth micro-animations, keyboard accessibility (Escape dismissal), and click-outside handling.
 *
 * @param {{ className?: string }} props
 * @returns {JSX.Element}
 */
export function ThemeToggle({ className = '' }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const options = [
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'system', label: 'System', icon: Laptop },
  ];

  return (
    <div
      className={`relative inline-block ${isOpen ? 'z-50' : ''} ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Toggle color theme. Current theme: ${theme} (resolved: ${resolvedTheme})`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-brand-border bg-white dark:bg-brand-surface hover:bg-slate-100 dark:hover:bg-brand-card hover:border-cyan-500/50 text-brand-textSecondary hover:text-cyan-600 dark:hover:text-brand-cyan transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-xs"
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          {resolvedTheme === 'dark' ? (
            <Moon className="w-4 h-4 text-cyan-400 transition-transform duration-300 transform rotate-0 scale-100" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 transform rotate-0 scale-100" />
          )}
        </div>
        <span className="sr-only">Toggle theme</span>
      </button>

      {/* Accessible Mode Dropdown with Solid Background & Elevated Stacking (z-50) */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{ zIndex: 50 }}
        >
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-brand-textSecondary hover:text-brand-text hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-300" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
