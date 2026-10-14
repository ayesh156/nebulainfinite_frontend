import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Shield, Terminal, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, NAV_LINKS, SERVICES } from '../data/companyData';
import { navigateTo } from '../utils/navigation';
import { defaultViewport, fadeUpVariant } from '../utils/motion';

/**
 * Footer component with brand overview, clean URL navigation links, service sitemap,
 * social media integration (Facebook & LinkedIn), contact details, and scroll-to-top handler.
 *
 * Enhanced with Framer Motion viewport scroll animations and interactive button states.
 *
 * @returns {JSX.Element}
 */
export function Footer() {
  /**
   * Smoothly scrolls to the top of the document and resets URL to root.
   *
   * @param {React.MouseEvent} [e]
   */
  const scrollToTop = (e) => {
    navigateTo('/', e);
  };

  /**
   * Dynamically retrieves the current calendar year to ensure the copyright notice
   * remains perpetually up-to-date without requiring manual code adjustments.
   *
   * @returns {number} The current 4-digit calendar year.
   */
  const getDynamicCopyrightYear = () => {
    return new Date().getFullYear();
  };

  const currentYear = getDynamicCopyrightYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="relative bg-slate-50 dark:bg-brand-surface border-t border-slate-200 dark:border-brand-border text-brand-textSecondary overflow-hidden transition-colors duration-300"
    >
      {/* Decorative top illumination line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-cyan-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Column 1: Brand Info, Logo & Social Channels */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => navigateTo('/', e)}
              className="inline-flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/15 via-sky-500/10 to-blue-600/15 border border-cyan-500/30 dark:border-cyan-400/30 p-1.5 flex items-center justify-center group-hover:border-cyan-500 transition-all shadow-[0_0_15px_rgba(2,132,199,0.1)] dark:shadow-[0_0_15px_rgba(0,242,254,0.15)]">
                <img
                  src={COMPANY_INFO.logo}
                  alt="Nebula Infinite Logo"
                  className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = '/images/Logo.png';
                  }}
                />
              </div>
              <span className="text-xl font-extrabold text-brand-text font-display">
                Nebula{' '}
                <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:to-blue-400 bg-clip-text text-transparent">
                  Infinite
                </span>
              </span>
            </a>

            <p className="text-sm text-brand-textSecondary max-w-sm leading-relaxed">
              Premier software engineering firm based in Matara, Sri Lanka.
              Empowering global enterprises with bespoke Point of Sale systems, ERP architectures, and web-scale applications.
            </p>

            {/* Social Integration Channels */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-textSecondary">
                Connect:
              </span>

              {/* LinkedIn Link */}
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-brand-card hover:bg-[#0077b5] border border-slate-200 dark:border-brand-border hover:border-[#0077b5] text-brand-textSecondary hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Follow Nebula Infinite on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37z" />
                </svg>
              </motion.a>

              {/* Facebook Link */}
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-brand-card hover:bg-[#1877f2] border border-slate-200 dark:border-brand-border hover:border-[#1877f2] text-brand-textSecondary hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Follow Nebula Infinite on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
              </motion.a>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-brand-textSecondary">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>Active Production Deployments</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-text">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => navigateTo(link.href, e)}
                    className="hover:text-cyan-600 dark:hover:text-brand-cyan transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-text">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a
                    href="/services"
                    onClick={(e) => navigateTo('/services', e)}
                    className="hover:text-cyan-600 dark:hover:text-brand-cyan transition-colors truncate block cursor-pointer"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-text">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm text-brand-textSecondary">
              <p className="text-xs text-brand-textSecondary/80">Headquarters:</p>
              <p className="font-medium text-brand-text">{COMPANY_INFO.location}</p>

              <p className="text-xs text-brand-textSecondary/80 pt-2">Phone & WhatsApp:</p>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors block"
              >
                {COMPANY_INFO.phone}
              </a>

              <p className="text-xs text-brand-textSecondary/80 pt-2">Email:</p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="font-medium text-cyan-600 dark:text-brand-cyan hover:underline transition-colors block break-all"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-14 pt-8 border-t border-slate-200 dark:border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        >
          <p className="text-brand-textSecondary">
            © {currentYear} <strong className="text-brand-text">Nebula Infinite (Pvt) Ltd</strong>. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-textSecondary hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Instant WhatsApp</span>
            </a>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-brand-card hover:bg-slate-100 dark:hover:bg-brand-cardHover border border-slate-200 dark:border-brand-border text-brand-textSecondary hover:text-brand-text transition-colors shadow-xs"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-600 dark:text-brand-cyan" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
