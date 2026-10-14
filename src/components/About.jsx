import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  Calendar,
  Users,
  Award,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO, WHY_CHOOSE_US } from '../data/companyData';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { navigateTo } from '../utils/navigation';
import {
  defaultViewport,
  fadeUpVariant,
  slideInLeftVariant,
  slideInRightVariant,
  staggerContainer,
} from '../utils/motion';

// Icon mapping for value pillars
const pillarIcons = {
  Layers: Layers,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Code2: Code2,
};

/**
 * About section presenting Nebula Infinite's foundational story, leadership,
 * building & headquarters brand imagery, architectural values, and 24/7 support commitment.
 *
 * Enhanced with Framer Motion viewport scroll triggers, split column slide-ins, and staggered pillars.
 *
 * @returns {JSX.Element}
 */
export function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="relative py-24 bg-brand-bg overflow-hidden transition-colors duration-300"
    >
      {/* Background Graphic Ambient Blend */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header with explicit badge container to prevent floating overlaps on mobile */}
        <motion.div
          variants={fadeUpVariant}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 flex flex-col items-center"
        >
          <div className="relative z-10 inline-flex items-center justify-center mb-3 sm:mb-4">
            <Badge variant="cyan" pulse={true} className="relative z-10">
              Architects of Innovation
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-display tracking-tight">
            About{' '}
            <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:via-sky-400 dark:to-blue-500 bg-clip-text text-transparent">
              Nebula Infinite
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            Founded on September 1, 2023, Nebula Infinite is driven by a singular mandate:
            engineering robust software systems that convert complex business hurdles into effortless competitive advantages.
          </p>
        </motion.div>

        {/* Prominent Building & Brand Imagery Showcase */}
        <motion.div
          variants={fadeUpVariant}
          className="mb-16 rounded-3xl overflow-hidden border border-slate-200 dark:border-brand-border bg-slate-950 shadow-2xl relative group"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[280px] sm:min-h-0 max-h-[460px] w-full overflow-hidden">
            <img
              src={COMPANY_INFO.buildingLandscape}
              alt="Nebula Infinite Headquarters & Operations Hub"
              className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-102 group-hover:brightness-100 transition-all duration-700"
              onError={(e) => {
                e.currentTarget.src = COMPANY_INFO.buildingSquare;
              }}
            />
            {/* Cinematic dark vignette over photo ensures text remains razor-sharp in both Light and Dark themes */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />
            
            {/* Overlay Branding Card with responsive spacing for smaller screens */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 rounded-full bg-slate-900/85 border border-cyan-400/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-cyan-300 shadow-lg">
                  <Building className="w-3.5 h-3.5 shrink-0" />
                  <span>Corporate Headquarters & Development Center</span>
                </div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white font-display drop-shadow-md">
                  Nebula Infinite Technology Center
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 drop-shadow-sm leading-relaxed">
                  {COMPANY_INFO.fullAddress}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg text-right">
                  <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Live Capacity</p>
                  <p className="text-base font-bold text-cyan-400">24/7 Operations</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Narrative & Inception Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            variants={slideInLeftVariant}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-text font-display">
              More Than a Software House — Your Strategic Engineering Ally.
            </h3>
            <p className="text-brand-textSecondary leading-relaxed text-sm sm:text-base">
              Since its inception by CEO Ayesh Chathuranga and COO Sachira Jayawardana, Nebula Infinite has stood as a
              beacon of transformative technology in Sri Lanka and abroad. Rather than deploying cookie-cutter templates,
              we design customized, end-to-end ecosystems for retail merchants, industrial warehouses, and digital enterprises.
            </p>
            <p className="text-brand-textSecondary leading-relaxed text-sm sm:text-base">
              Every system we engineer — from low-latency Point of Sale terminals to sprawling multi-tier ERP architectures —
              is crafted with meticulous attention to clean code, fail-safe redundancy, and user delight.
            </p>

            {/* Quick Milestones - High contrast icons and legible text */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                <Calendar className="w-5 h-5 text-cyan-700 dark:text-cyan-400 mb-1.5" />
                <p className="text-xs text-brand-textSecondary">Founded</p>
                <p className="text-sm font-bold text-brand-text">{COMPANY_INFO.foundedDate}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                <Users className="w-5 h-5 text-sky-700 dark:text-sky-400 mb-1.5" />
                <p className="text-xs text-brand-textSecondary">Headquarters</p>
                <p className="text-sm font-bold text-brand-text">{COMPANY_INFO.location}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1 shadow-xs">
                <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mb-1.5" />
                <p className="text-xs text-brand-textSecondary">Availability</p>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">24/7 Client Support</p>
              </div>
            </div>
          </motion.div>

          {/* Founders & Leadership Showcase */}
          <motion.div
            variants={slideInRightVariant}
            className="lg:col-span-5 space-y-4"
          >
            <h4 className="text-xs uppercase tracking-widest font-semibold text-cyan-700 dark:text-cyan-400">
              Executive Leadership
            </h4>

            {COMPANY_INFO.founders.map((founder, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors duration-200 shadow-xs hover:shadow-md relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors" />
                <div className="flex items-start gap-4">
                  {/* Theme-aware executive leadership avatar tile with high-contrast initials ("AC", "SJ") */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-100/90 dark:bg-slate-950 border border-cyan-300/80 dark:border-cyan-500/40 flex items-center justify-center font-extrabold text-blue-950 dark:text-cyan-300 font-display text-lg shrink-0 shadow-xs dark:shadow-[0_0_15px_rgba(0,242,254,0.15)] group-hover:scale-105 transition-transform duration-300">
                    {founder.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-brand-text group-hover:text-cyan-600 dark:group-hover:text-brand-cyan transition-colors">
                      {founder.name}
                    </h5>
                    <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 mt-0.5">
                      {founder.role}
                    </p>
                    <p className="text-xs text-brand-textSecondary mt-2 leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Why Choose Nebula Infinite - 4 Core Pillars */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-brand-border">
          <motion.div
            variants={fadeUpVariant}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text font-display">
              Why Sri Lankan & Global Businesses Choose Us
            </h3>
            <p className="text-sm text-brand-textSecondary mt-2">
              Our engineering philosophy guarantees lasting reliability and direct commercial return on your software investment.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {WHY_CHOOSE_US.map((pillar, idx) => {
              const IconComp = pillarIcons[pillar.icon] || ShieldCheck;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  className="flex flex-col"
                >
                  <Card
                    className="p-6 h-full bg-white dark:bg-brand-surface hover:border-cyan-500/50 flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-3">
                      {/* Theme-aware pillar icon container with high-contrast icon visibility */}
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/90 dark:border-cyan-500/40 flex items-center justify-center shadow-xs">
                        <IconComp className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
                      </div>
                      <h4 className="text-base font-bold text-brand-text">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-brand-textSecondary leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Call-to-action bar */}
        <motion.div
          variants={fadeUpVariant}
          className="mt-16 flex justify-center"
        >
          <Button
            href="/contact"
            onClick={(e) => navigateTo('/contact', e)}
            variant="glow"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto justify-center"
          >
            Partner With Nebula Infinite Today
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
