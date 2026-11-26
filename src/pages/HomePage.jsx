import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MonitorCheck,
  Building2,
  Globe2,
  CheckCircle2,
  Play,
  ExternalLink,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ProjectPreviewModal } from '../components/ProjectPreviewModal';
import { SERVICES, COMPANY_INFO } from '../data/companyData';
import { PROJECTS } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { navigateTo } from '../utils/navigation';
import { defaultViewport, fadeUpVariant, staggerContainer } from '../utils/motion';

const previewIcons = {
  MonitorCheck,
  Building2,
  Globe2,
};

/**
 * Home Page (`/`) featuring:
 * - Hero section with value proposition, terminal card, and quick trust stats
 * - Featured Services Preview (top 3 core capabilities + link to `/services`)
 * - Featured Live Demo Highlight (Apex Apparel ERP & POS Suite with 80%-width Live Preview modal)
 * - High-converting bottom CTA banner
 *
 * @returns {JSX.Element}
 */
export function HomePage() {
  const [previewProject, setPreviewProject] = useState(null);

  const featuredServices = SERVICES.slice(0, 3);
  const featuredLiveProject = PROJECTS.find((p) => p.featured && p.hasLiveDemo) || PROJECTS[0];

  return (
    <div>
      {/* 1. Hero & Quick Trust Stats */}
      <Hero />

      {/* 2. Featured Services Preview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative py-20 bg-slate-50/60 dark:bg-brand-surface/30 border-t border-slate-200/70 dark:border-brand-border/40 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div className="max-w-2xl">
              <Badge variant="cyan" className="mb-3">
                Core Capabilities
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text font-display tracking-tight">
                Engineered for{' '}
                <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:to-blue-400 bg-clip-text text-transparent">
                  Modern Commerce
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-brand-textSecondary">
                Explore our flagship software engineering pillars—from offline-resilient POS terminals to full enterprise ERPs.
              </p>
            </div>

            <Button
              href="/services"
              onClick={(e) => navigateTo('/services', e)}
              variant="outline"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="self-start md:self-auto"
            >
              View All Services
            </Button>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {featuredServices.map((service) => {
              const IconComp = previewIcons[service.iconName] || MonitorCheck;
              return (
                <motion.div key={service.id} variants={fadeUpVariant} className="flex flex-col">
                  <Card className="h-full flex flex-col justify-between hover:border-cyan-500/50 transition-colors">
                    <div>
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/90 dark:border-cyan-500/40 flex items-center justify-center">
                            <IconComp className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
                          </div>
                          <Badge variant="blue" className="text-[11px]">
                            {service.badge}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-brand-text">{service.title}</h3>
                        <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed">
                          {service.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-xs text-brand-textSecondary">
                          {service.features.slice(0, 2).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Featured Live Demo Highlight (Apex Apparel ERP) */}
      {featuredLiveProject && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative py-20 bg-brand-bg overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              variants={fadeUpVariant}
              className="rounded-3xl bg-white/95 dark:bg-brand-surface border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-[0_0_40px_rgba(0,242,254,0.08)] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left: Interactive Preview Thumbnail */}
                <div
                  onClick={() => setPreviewProject(featuredLiveProject)}
                  className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] bg-slate-950 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={featuredLiveProject.thumbnail}
                    alt={featuredLiveProject.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      if (
                        featuredLiveProject.fallbackThumbnail &&
                        e.currentTarget.src !== featuredLiveProject.fallbackThumbnail
                      ) {
                        e.currentTarget.src = featuredLiveProject.fallbackThumbnail;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Interactive Demo
                    </span>
                  </div>

                  {/* Center Hover Launch Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/35 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl">
                      <Play className="w-4 h-4 fill-current" />
                      Launch Interactive Preview
                    </span>
                  </div>
                </div>

                {/* Right: Project Details & Actions */}
                <div className="lg:col-span-6 p-6 sm:p-10 space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="cyan" pulse={true}>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Featured Live System</span>
                      </Badge>
                      <Badge variant="blue">{featuredLiveProject.category}</Badge>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text font-display">
                      {featuredLiveProject.title}
                    </h2>

                    <p className="text-sm text-brand-textSecondary leading-relaxed">
                      {featuredLiveProject.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 text-xs sm:text-sm text-brand-textSecondary">
                    {featuredLiveProject.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-brand-cyan shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {featuredLiveProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-slate-900 text-cyan-800 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="glow"
                      size="md"
                      onClick={() => setPreviewProject(featuredLiveProject)}
                      icon={<Play className="w-4 h-4 fill-current" />}
                    >
                      Live Preview
                    </Button>

                    <Button
                      href={featuredLiveProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="md"
                      iconRight={<ExternalLink className="w-4 h-4" />}
                    >
                      Open in New Tab
                    </Button>

                    <a
                      href="/portfolio"
                      onClick={(e) => navigateTo('/portfolio', e)}
                      className="text-xs sm:text-sm font-semibold text-cyan-700 dark:text-brand-cyan hover:underline inline-flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span>All Projects</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* 4. Final Conversion CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="py-16 bg-slate-50/70 dark:bg-brand-surface/40 border-t border-slate-200/70 dark:border-brand-border/40"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUpVariant} className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text font-display">
              Ready to Digitize & Scale Your Operations?
            </h2>
            <p className="text-sm sm:text-base text-brand-textSecondary max-w-2xl mx-auto">
              Book a free technical consultation with our Makandura engineering team or message us on WhatsApp for an instant project estimate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contact"
                onClick={(e) => navigateTo('/contact', e)}
                variant="glow"
                size="lg"
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Start Your Project
              </Button>
              <Button
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={<MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                className="w-full sm:w-auto justify-center"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive 80%-width Live Demo Modal */}
      <ProjectPreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}
