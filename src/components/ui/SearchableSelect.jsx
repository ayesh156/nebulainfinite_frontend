import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * @typedef {Object} SelectOption
 * @property {string} value - Unique identifier/form value
 * @property {string} label - Primary human-readable option title
 * @property {React.ComponentType<{ className?: string }>} [icon] - Lucide icon component
 * @property {string} [description] - Optional secondary subtitle/descriptor
 * @property {string} [badge] - Optional badge tag
 */

/**
 * @typedef {Object} SearchableSelectProps
 * @property {string} [id] - Unique ID for form/label linkage
 * @property {string} [name] - Form field name
 * @property {string} value - Currently selected value
 * @property {(event: { target: { name: string, value: string } }) => void} onChange - Change callback
 * @property {SelectOption[]} options - Array of selectable options
 * @property {string} [placeholder='Select an option...'] - Placeholder text when empty
 * @property {string} [searchPlaceholder='Search options...'] - Search field placeholder
 * @property {boolean} [disabled=false] - Whether select is disabled
 * @property {string} [className] - Additional classes for wrapper
 * @property {string} [error] - Validation error message
 */

/**
 * Modern, theme-aware, animated searchable select component.
 * Features:
 * - Fluid Framer Motion animated dropdown transition with AnimatePresence.
 * - Strict popover positioning (`position: absolute; top: 100%; left: 0; right: 0; width: 100%`) relative to its wrapper.
 * - Exact width matching to the trigger button (`w-full`) to prevent horizontal overflow in form cards.
 * - Elevated stacking context (`z-50`) with solid theme background (`bg-white dark:bg-slate-900`) and `shadow-2xl`.
 * - Scrollable height limit (`max-h-60 overflow-y-auto`) to float above subsequent inputs without layout displacement.
 * - In-menu real-time search input with clearable query.
 * - Lucide-react iconography per service option.
 * - Full keyboard navigation (Arrow keys, Enter, Escape, Tab).
 * - Mobile zoom prevention via 16px minimum input font size on small screens (`text-base sm:text-xs`).
 * - Seamless Light & Dark Tailwind CSS theme compatibility.
 * - Click-outside and touch-outside auto-close dismissal.
 *
 * @param {SearchableSelectProps} props
 * @returns {JSX.Element}
 */
export function SearchableSelect({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search options...',
  disabled = false,
  className = '',
  error,
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listboxRef = useRef(null);

  // Identify currently selected option object
  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search query
  const filteredOptions = options.filter((option) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    const matchesLabel = option.label.toLowerCase().includes(query);
    const matchesDesc = option.description?.toLowerCase().includes(query);
    return matchesLabel || matchesDesc;
  });

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // Slight timeout ensures DOM has rendered and motion animation has commenced
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Handle click outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Keep highlighted item visible within scrolling listbox
  useEffect(() => {
    if (highlightedIndex >= 0 && listboxRef.current) {
      const activeElement = listboxRef.current.children[highlightedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  /**
   * Dispatches option selection to parent form handler.
   * Emits standard synthetic event format for transparent compatibility with form state hooks.
   *
   * @param {SelectOption} option
   */
  const handleSelect = (option) => {
    if (disabled) return;
    onChange({
      target: {
        name: name || selectId,
        value: option.value,
      },
    });
    setIsOpen(false);
  };

  /**
   * Keyboard navigation handler for full accessibility.
   *
   * @param {React.KeyboardEvent} e
   */
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const SelectedIcon = selectedOption?.icon;

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full text-left', className)}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden standard input element for form serialization and native submit compliance */}
      <input
        type="hidden"
        id={selectId}
        name={name}
        value={value}
        disabled={disabled}
      />

      {/* Main Trigger Button */}
      <button
        type="button"
        id={`${selectId}-button`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={cn(
          'w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between gap-2.5 outline-none select-none',
          'bg-slate-50 dark:bg-brand-card border text-brand-text',
          error
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
            : isOpen
            ? 'border-cyan-500 ring-2 ring-cyan-500/25 shadow-sm'
            : 'border-slate-300 dark:border-brand-border hover:border-slate-400 dark:hover:border-slate-600',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {SelectedIcon && (
            <span className="shrink-0 p-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200/80 dark:border-cyan-500/30">
              <SelectedIcon className="w-4 h-4" />
            </span>
          )}
          <span
            className={cn(
              'truncate font-medium text-sm',
              !selectedOption && 'text-brand-textSecondary/60'
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 text-brand-textSecondary transition-transform duration-200',
            isOpen && 'rotate-180 text-cyan-600 dark:text-brand-cyan'
          )}
        />
      </button>

      {/* Animated Dropdown Menu Options Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-full left-0 right-0 w-full mt-1.5 z-50 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden box-border"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              width: '100%',
            }}
          >
            {/* Search Input Header with Solid Background */}
            <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-brand-textSecondary pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHighlightedIndex(0);
                  }}
                  placeholder={searchPlaceholder}
                  // text-base on mobile prevents iOS mobile safari auto-zoom on input focus
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-text placeholder-brand-textSecondary/50 text-base sm:text-xs font-normal focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-2.5 p-1 rounded-md text-brand-textSecondary hover:text-brand-text hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Clear search input"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Options Listbox with Height Limit (max-h-60) */}
            <div
              id={listboxId}
              role="listbox"
              ref={listboxRef}
              className="max-h-60 overflow-y-auto p-1.5 space-y-1 overscroll-contain select-none"
            >
              {filteredOptions.length === 0 ? (
                <div className="py-7 px-4 text-center text-xs text-brand-textSecondary">
                  <p className="font-medium text-brand-text mb-0.5">No services found</p>
                  <p className="text-[11px] opacity-75">
                    Try searching with another keyword
                  </p>
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === value;
                  const isHighlighted = index === highlightedIndex;
                  const OptionIcon = option.icon;

                  return (
                    <div
                      key={option.value}
                      role="option"
                      id={`${selectId}-opt-${index}`}
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={cn(
                        'w-full px-3 py-2 rounded-xl cursor-pointer transition-colors duration-150 flex items-center justify-between gap-3 text-left',
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-200 font-semibold border border-cyan-500/20'
                          : isHighlighted
                          ? 'bg-slate-100 dark:bg-slate-800 text-brand-text'
                          : 'text-brand-text hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {OptionIcon && (
                          <div
                            className={cn(
                              'p-2 rounded-lg shrink-0 transition-colors border',
                              isSelected
                                ? 'bg-cyan-600 dark:bg-brand-cyan text-white dark:text-slate-950 border-cyan-500/50 shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 border-slate-200 dark:border-slate-700'
                            )}
                          >
                            <OptionIcon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium leading-snug truncate">
                              {option.label}
                            </span>
                            {option.badge && (
                              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                                {option.badge}
                              </span>
                            )}
                          </div>
                          {option.description && (
                            <p className="text-[11px] text-brand-textSecondary truncate mt-0.5">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="shrink-0 text-cyan-600 dark:text-brand-cyan ml-2">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
