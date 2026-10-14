import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

/**
 * Nebula Infinite Web Application root composition.
 * Assembles all modular components within a responsive, high-converting layout
 * with variable-driven Dark / Light / System theming.
 *
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col selection:bg-cyan-600 selection:text-white dark:selection:bg-brand-cyan dark:selection:text-slate-950 font-sans antialiased overflow-x-hidden transition-colors duration-300">
      {/* Fixed top navigation bar with theme toggle */}
      <Navbar />

      {/* Main page content sections */}
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>

      {/* Comprehensive footer with sitemap and social links */}
      <Footer />

      {/* Direct floating WhatsApp CTA */}
      <WhatsAppFloat />
    </div>
  );
}
