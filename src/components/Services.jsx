import React from 'react';
import {
  MonitorCheck,
  Building2,
  Globe2,
  Smartphone,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { navigateTo } from '../utils/navigation';

// Mapping string names to Lucide icons
const iconMap = {
  MonitorCheck: MonitorCheck,
  Building2: Building2,
  Globe2: Globe2,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Sparkles: Sparkles,
};

/**
 * Core Services showcase section detailing Nebula Infinite's software capabilities:
 * POS Systems, Enterprise ERP, Web Platforms, Mobile Apps, Automation, and UI/UX Consulting.
 *
 * @returns {JSX.Element}
 */
export function Services() {
  return (
    <section id="services" className="relative py-24 bg-brand-bg overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with explicit badge container to prevent floating overlaps on mobile */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 flex flex-col items-center">
          <div className="relative z-10 inline-flex items-center justify-center mb-3 sm:mb-4">
            <Badge variant="cyan" pulse={true} className="relative z-10">
              Enterprise Engineering
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-display tracking-tight">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:to-blue-400 bg-clip-text text-transparent">
              Software Solutions
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            Tailored engineering capabilities designed to automate workflows, accelerate retail billing,
            and scale modern enterprises without technical constraints.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.iconName] || MonitorCheck;
            const encodedService = encodeURIComponent(service.title);
            const inquiryUrl = `https://wa.me/${COMPANY_INFO.phoneClean}?text=Hello%20Nebula%20Infinite!%20I'd%20like%20to%20get%20a%20quote%20for%20${encodedService}.`;

            return (
              <Card
                key={service.id}
                className="flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300 shadow-xs dark:shadow-sm"
              >
                <div>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      {/* Theme-aware icon container: soft clean cyan wash in light theme with high-contrast deep teal icon; subtle deep blue/slate tint in dark theme with glowing cyan icon */}
                      <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/90 dark:border-cyan-500/40 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500 transition-all duration-300 shadow-xs dark:shadow-[0_0_15px_rgba(0,242,254,0.15)]">
                        <IconComponent className="w-6 h-6 text-cyan-700 dark:text-cyan-400 group-hover:text-cyan-800 dark:group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <Badge variant="blue" className="text-[11px] font-semibold">
                        {service.badge}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-brand-text group-hover:text-cyan-600 dark:group-hover:text-brand-cyan transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-brand-textSecondary leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-xs sm:text-sm text-brand-textSecondary">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Highlight Box with crisp contrast and readable quote typography */}
                    <div className="p-3 rounded-xl bg-cyan-50/80 dark:bg-slate-900/60 border border-cyan-200/70 dark:border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-300 font-medium italic">
                      "{service.highlight}"
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-slate-200 dark:border-brand-border">
                  <div className="w-full flex items-center justify-between gap-2">
                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline flex items-center gap-1.5 transition-colors group/link"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Request Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>

                    <a
                      href="/contact"
                      onClick={(e) => navigateTo('/contact', e)}
                      className="text-xs text-brand-textSecondary hover:text-brand-text transition-colors cursor-pointer"
                    >
                      Learn more
                    </a>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom Banner Call-To-Action */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-cyan-50/90 via-sky-50/60 to-white dark:from-brand-surface dark:via-brand-card dark:to-brand-surface border border-cyan-200 dark:border-cyan-500/30 p-8 sm:p-10 shadow-lg dark:shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-glow pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-brand-text font-display">
                Need a Custom Software Solution Built from Scratch?
              </h3>
              <p className="text-sm text-brand-textSecondary mt-1 max-w-xl">
                Share your requirements with our lead architects. We deliver production-ready milestones on time and within budget.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 w-full md:w-auto">
              <Button
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="glow"
                size="md"
                icon={<MessageSquare className="w-4 h-4 text-current" />}
                className="w-full sm:w-auto justify-center"
              >
                Chat on WhatsApp
              </Button>
              <Button
                href="/contact"
                onClick={(e) => navigateTo('/contact', e)}
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
