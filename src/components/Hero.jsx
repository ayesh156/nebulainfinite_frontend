import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { navigateTo } from '../utils/navigation';

/**
 * Hero section delivering high-impact value proposition, key metrics,
 * live interactive terminal preview card, and direct conversion CTAs.
 * Built with futuristic glassmorphism and multi-theme support.
 *
 * @returns {JSX.Element}
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Graphic & Subtle Ambient Illumination */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep ambient vignette overlay */}
        <div className="absolute inset-0 bg-hero-gradient" />
        
        {/* Cyan & Indigo radial illumination spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[140px]" />
        
        {/* Modern Cyber Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Live Indicator Pill with relative positioning */}
            <div className="relative z-10 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <Badge variant="cyan" pulse={true} className="py-1 px-3 sm:px-3.5 relative">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-brand-cyan shrink-0" />
                <span className="text-[11px] sm:text-xs">Next-Gen POS & Enterprise Software</span>
              </Badge>
              <span className="hidden sm:inline-flex text-xs text-brand-textSecondary">
                • Founded in Sri Lanka
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-text font-display leading-[1.12]">
              Architecting{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:via-sky-400 dark:to-blue-500 bg-clip-text text-transparent">
                  Intelligent Software
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-cyan-500/20 blur-sm rounded-full -z-0" />
              </span>{' '}
              That Powers Commercial Growth.
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-brand-textSecondary max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From mission-critical <strong className="text-brand-text font-semibold">POS Systems</strong> and{' '}
              <strong className="text-brand-text font-semibold">Enterprise ERPs</strong> to high-converting{' '}
              <strong className="text-brand-text font-semibold">Web & Mobile Apps</strong>, Nebula Infinite builds
              resilient, future-ready technology tailored to your exact operational workflows.
            </p>

            {/* Action Buttons - Centered and full-width on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              <Button
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="glow"
                size="lg"
                icon={<MessageSquare className="w-5 h-5 text-current shrink-0" />}
                className="w-full sm:w-auto justify-center"
              >
                Instant WhatsApp Quote
              </Button>
              <Button
                href="/services"
                onClick={(e) => navigateTo('/services', e)}
                variant="outline"
                size="lg"
                iconRight={<ArrowRight className="w-4 h-4 text-cyan-600 dark:text-brand-cyan shrink-0" />}
                className="w-full sm:w-auto justify-center"
              >
                Explore Services
              </Button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-brand-textSecondary">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-brand-cyan shrink-0" />
                <span>Zero Downtime Deployments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-brand-cyan shrink-0" />
                <span>24/7 Dedicated Engineering Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-600 dark:text-brand-cyan shrink-0" />
                <span>Offline-Resilient POS Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Terminal / Live Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 rounded-3xl blur-xl opacity-20 dark:opacity-35 animate-pulse-slow" />

              {/* Glassmorphic Cyber Terminal Card */}
              <div className="relative rounded-2xl bg-white/95 dark:bg-brand-surface border border-slate-200 dark:border-cyan-500/30 p-6 shadow-xl dark:shadow-2xl backdrop-blur-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-brand-border">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-brand-textSecondary">nebula-engine://v2.4</span>
                  </div>
                  <Badge variant="cyan" className="text-[10px] py-0.5">
                    ONLINE
                  </Badge>
                </div>

                {/* Showcase Screen Preview using official compressed PNG asset */}
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-brand-border bg-slate-900 dark:bg-slate-950 relative group shadow-inner">
                  <img
                    src="/images/gallery/img-10.png"
                    alt="Nebula POS High Speed Cashier System"
                    className="w-full h-52 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/images/gallery/img-01.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">
                        Nebula POS Terminal
                      </p>
                      <p className="text-[11px] text-cyan-300">
                        Active Multi-Terminal Sync
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      0.12s latency
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-brand-border">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-200 dark:border-brand-border">
                    <p className="text-2xl font-extrabold text-cyan-600 dark:text-brand-cyan font-display">
                      50+
                    </p>
                    <p className="text-xs text-brand-textSecondary font-medium mt-0.5">
                      Systems Shipped
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-200 dark:border-brand-border">
                    <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-display">
                      99.9%
                    </p>
                    <p className="text-xs text-brand-textSecondary font-medium mt-0.5">
                      Operational Uptime
                    </p>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="mt-4 p-3 rounded-xl bg-cyan-50/80 dark:bg-gradient-to-r dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-500/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 dark:bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="text-xs">
                    <p className="text-brand-text font-medium">Bespoke Software Architecture</p>
                    <p className="text-brand-textSecondary text-[11px]">Retail, ERP, E-Commerce, Mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Statistics Ribbon */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 dark:border-brand-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border backdrop-blur-sm shadow-xs dark:shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-sky-600 to-blue-600 dark:from-brand-text dark:via-cyan-400 dark:to-brand-cyan bg-clip-text text-transparent font-display">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-brand-textSecondary font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
