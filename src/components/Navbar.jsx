import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, NAV_LINKS } from '../data/companyData';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { navigateTo, scrollToSection, SECTION_TO_PATH, resolveRoute } from '../utils/navigation';

/**
 * Top navigation bar featuring glassmorphic blur, active section scrollspy detection,
 * Dark/Light/System theme toggle, brand logo showcase, responsive mobile drawer menu,
 * and clean URL routing without hash (#) fragments.
 *
 * Mobile Drawer & Stacking Architecture:
 * - Elevated drawer panel (`z-[70]`) and backdrop overlay (`z-[60]`) ensure all underlying
 *   content and floating buttons (e.g. WhatsAppFloat at `z-50`) stay completely underneath.
 * - Dedicated top bar inside the mobile drawer provides comfortable spacing between
 *   brand logo, integrated ThemeToggle, and dedicated close button with zero overlap.
 *
 * @returns {JSX.Element}
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle initial page load, deep links, hash cleanup, and browser history popstate
  useEffect(() => {
    // 1. Clean up legacy or external hash URLs (e.g. /#services -> /services)
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace('#', '');
      const routeInfo = resolveRoute(cleanHash);
      window.history.replaceState({ sectionId: routeInfo.id }, '', routeInfo.path);
      // Delay slightly for initial layout stabilization
      setTimeout(() => {
        scrollToSection(routeInfo.id, { replace: true, updateHistory: false });
      }, 100);
    } else if (window.location.pathname && window.location.pathname !== '/') {
      // 2. Direct deep link load by pathname (e.g. /services or /contact)
      const routeInfo = resolveRoute(window.location.pathname);
      if (routeInfo.id !== 'hero') {
        setTimeout(() => {
          scrollToSection(routeInfo.id, { replace: true, updateHistory: false });
        }, 100);
      }
    }

    // 3. Handle browser Back and Forward navigation buttons
    const handlePopState = () => {
      const routeInfo = resolveRoute(window.location.pathname);
      scrollToSection(routeInfo.id, { replace: true, updateHistory: false });
      setActiveSection(routeInfo.id);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track scroll position for dynamic glassmorphic navbar styling & active section highlight
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = NAV_LINKS.map((link) => link.sectionId || link.href.replace('/', ''));
          const scrollPos = window.scrollY + 220;

          // If at the very top of the page, activate hero
          if (window.scrollY < 100) {
            setActiveSection('hero');
            if (window.location.pathname !== '/' && !window.location.hash) {
              window.history.replaceState({ sectionId: 'hero' }, '', '/');
            }
            ticking = false;
            return;
          }

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                if (activeSection !== section) {
                  setActiveSection(section);
                  const canonicalPath = SECTION_TO_PATH[section] || '/';
                  if (window.location.pathname !== canonicalPath && !window.location.hash) {
                    window.history.replaceState({ sectionId: section }, '', canonicalPath);
                  }
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Prevent body scrolling and handle Escape dismissal when mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-brand-bg/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-brand-border/80 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.12)] py-2.5 sm:py-3'
            : 'bg-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Company Logo & Brand Identity */}
            <a
              href="/"
              onClick={(e) => {
                setMobileMenuOpen(false);
                navigateTo('/', e);
              }}
              className="flex items-center gap-2 sm:gap-3.5 group focus:outline-none cursor-pointer min-w-0"
              aria-label="Nebula Infinite Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-cyan-500/15 via-sky-500/10 to-blue-600/15 border border-cyan-500/30 dark:border-cyan-400/30 p-1 sm:p-1.5 group-hover:border-cyan-500 transition-all shadow-[0_0_15px_rgba(2,132,199,0.1)] dark:shadow-[0_0_20px_rgba(0,242,254,0.2)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] shrink-0">
                <img
                  src={COMPANY_INFO.logo}
                  alt="Nebula Infinite Logo"
                  className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = '/images/Logo.png';
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-brand-text font-display flex items-center gap-1 sm:gap-1.5 truncate">
                  <span>Nebula</span>
                  <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:via-sky-400 dark:to-blue-500 bg-clip-text text-transparent">
                    Infinite
                  </span>
                </span>
                <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider sm:tracking-widest text-cyan-600 dark:text-brand-cyan -mt-0.5 whitespace-nowrap">
                  Software Solutions
                </span>
              </div>
            </a>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-1 bg-white/80 dark:bg-brand-surface/70 border border-slate-200 dark:border-brand-border/60 rounded-full px-4 py-1.5 backdrop-blur-md shadow-xs">
              {NAV_LINKS.map((link) => {
                const targetSection = link.sectionId || link.href.replace('/', '') || 'hero';
                const isActive = activeSection === targetSection;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => navigateTo(link.href, e)}
                    className={`text-sm px-3.5 py-1.5 rounded-full transition-all duration-200 font-medium cursor-pointer ${
                      isActive
                        ? 'text-cyan-700 dark:text-brand-cyan bg-cyan-500/15 border border-cyan-500/30 shadow-[0_0_12px_rgba(2,132,199,0.15)] dark:shadow-[0_0_12px_rgba(0,242,254,0.25)] font-semibold'
                        : 'text-brand-textSecondary hover:text-brand-text hover:bg-slate-100 dark:hover:bg-brand-card/60'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Call to Action & Theme Selector */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Selector */}
              <ThemeToggle />

              {/* Direct WhatsApp Action */}
              <Button
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                icon={<MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              >
                WhatsApp
              </Button>

              {/* Consultation Clean URL Anchor Button */}
              <Button
                href="/contact"
                onClick={(e) => navigateTo('/contact', e)}
                variant="glow"
                size="sm"
                iconRight={<ArrowRight className="w-4 h-4 text-current" />}
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Right Controls: Theme Toggle, Adaptive Chat Button & Hamburger Menu */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              <ThemeToggle />

              {/* Chat button hidden on ultra-small viewports (<640px) to prevent crowding; prominently kept in drawer menu */}
              <Button
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="cyan"
                size="sm"
                className="hidden sm:inline-flex px-2.5 py-1.5 text-xs"
                icon={<MessageSquare className="w-3.5 h-3.5 text-current" />}
              >
                Chat
              </Button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl border transition-all duration-200 focus:outline-none ${
                  mobileMenuOpen
                    ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-600 dark:text-brand-cyan shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                    : 'text-brand-textSecondary hover:text-brand-text hover:bg-slate-100 dark:hover:bg-brand-card border-slate-200 dark:border-brand-border'
                }`}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay with Highest Priority Stacking (z-[60]) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 dark:bg-black/85 backdrop-blur-md z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Modern Futuristic Mobile Navigation Drawer with Highest Priority Stacking (z-[70]) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-2 sm:top-3 inset-x-2.5 sm:inset-x-4 z-[70] md:hidden"
          >
            <div className="rounded-3xl border border-cyan-500/30 dark:border-cyan-500/20 bg-white dark:bg-slate-900 shadow-2xl px-4 sm:px-6 py-4 sm:py-5 max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-1.5rem)] overflow-y-auto">
              {/* Dedicated, well-spaced Mobile Drawer Top Bar (Brand Logo, Theme Toggle & Close Button) */}
              <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-200 dark:border-slate-800">
                {/* Brand Logo & Identity */}
                <a
                  href="/"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateTo('/', e);
                  }}
                  className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none cursor-pointer min-w-0"
                  aria-label="Nebula Infinite Home"
                >
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/15 via-sky-500/10 to-blue-600/15 border border-cyan-500/30 dark:border-cyan-400/30 p-1 shrink-0">
                    <img
                      src={COMPANY_INFO.logo}
                      alt="Nebula Infinite Logo"
                      className="w-full h-full object-contain filter drop-shadow"
                      onError={(e) => {
                        e.currentTarget.src = '/images/Logo.png';
                      }}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-extrabold tracking-tight text-brand-text font-display flex items-center gap-1 truncate">
                      <span>Nebula</span>
                      <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:via-sky-400 dark:to-blue-500 bg-clip-text text-transparent">
                        Infinite
                      </span>
                    </span>
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-brand-cyan -mt-0.5 whitespace-nowrap">
                      Software Solutions
                    </span>
                  </div>
                </a>

                {/* Right Controls: Theme Toggle & Close Button without overlap */}
                <div className="flex items-center gap-2 shrink-0">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-brand-textSecondary hover:text-brand-text hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors focus:outline-none"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5 text-brand-text" />
                  </button>
                </div>
              </div>

              {/* Subtle navigation header badge */}
              <div className="flex items-center justify-between pb-2 mb-2 text-[10px] font-mono text-brand-textSecondary">
                <span className="uppercase tracking-widest text-cyan-600 dark:text-brand-cyan flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                  <span>Navigation Menu</span>
                </span>
                <span>v2.4</span>
              </div>

          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link, idx) => {
              const targetSection = link.sectionId || link.href.replace('/', '') || 'hero';
              const isActive = activeSection === targetSection;
              const formattedIndex = String(idx + 1).padStart(2, '0');

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    navigateTo(link.href, e);
                  }}
                  className={`flex items-center justify-between text-sm sm:text-base font-semibold py-3 px-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-700 dark:text-brand-cyan border border-cyan-500/30 shadow-[0_0_15px_rgba(2,132,199,0.12)] dark:shadow-[0_0_15px_rgba(0,242,254,0.2)] font-bold'
                      : 'text-brand-text hover:bg-slate-100 dark:hover:bg-brand-card/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-cyan-600/70 dark:text-brand-cyan/60 font-normal">
                      {formattedIndex}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                        Active
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-600 dark:text-brand-cyan translate-x-0.5' : 'text-brand-textSecondary'}`} />
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Drawer Call-to-Action Group */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-brand-border/60 flex flex-col gap-2.5">
            <Button
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="glow"
              size="md"
              className="w-full justify-center"
              icon={<MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
            >
              Direct WhatsApp ({COMPANY_INFO.phone})
            </Button>

            <Button
              href="/contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                navigateTo('/contact', e);
              }}
              variant="outline"
              size="md"
              className="w-full justify-center"
              iconRight={<ArrowRight className="w-4 h-4 text-current" />}
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Micro Brand & Operational Status Footer inside Drawer */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-brand-border/30 flex items-center justify-between text-[11px] text-brand-textSecondary">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Matara, LK • 24/7 Support</span>
            </span>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="hover:text-cyan-600 dark:hover:text-brand-cyan transition-colors font-medium"
            >
              {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</>
  );
}

