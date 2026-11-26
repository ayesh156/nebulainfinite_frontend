import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';

/**
 * Shared persistent application layout wrapping all multi-page views.
 * Renders the fixed Navbar, main page content slot, Footer, and floating WhatsApp CTA.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col selection:bg-cyan-600 selection:text-white dark:selection:bg-brand-cyan dark:selection:text-slate-950 font-sans antialiased overflow-x-hidden transition-colors duration-300">
      {/* Fixed top navigation bar with theme toggle */}
      <Navbar />

      {/* Active route page content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Comprehensive footer with sitemap and social links */}
      <Footer />

      {/* Direct floating WhatsApp CTA */}
      <WhatsAppFloat />
    </div>
  );
}
