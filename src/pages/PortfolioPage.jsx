import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';
import { Gallery } from '../components/Gallery';
import { ProjectPreviewModal } from '../components/ProjectPreviewModal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { defaultViewport, fadeUpVariant, staggerContainer } from '../utils/motion';

/**
 * Dedicated Projects & Live Demos Showcase Page (`/portfolio` and `/projects`).
 * Displays interactive live demos powered by `src/data/projects.js` with an 80%-width
 * desktop preview modal, followed by the verified client gallery showcase.
 *
 * @returns {JSX.Element}
 */
export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewProject, setPreviewProject] = useState(null);

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.categoryKey === activeCategory);

  return (
    <div className="pt-12">
      {/* Live Systems & Interactive Demos Showcase */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative py-20 bg-brand-bg overflow-hidden transition-colors duration-300"
      >
        <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Page Header */}
          <motion.div
            variants={fadeUpVariant}
            className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center"
          >
            <div className="relative z-10 inline-flex items-center justify-center mb-3 sm:mb-4">
              <Badge variant="cyan" pulse={true}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Live Systems</span>
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-display tracking-tight">
              Deployed{' '}
              <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:to-blue-400 bg-clip-text text-transparent">
                Live Demos & Projects
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-brand-textSecondary leading-relaxed">
              Test-drive our production-grade ERP and POS platforms directly inside an interactive preview or launch them in a dedicated tab.
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <motion.button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-brand-cyan dark:to-blue-500 text-white dark:text-slate-950 shadow-[0_4px_20px_rgba(2,132,199,0.25)] dark:shadow-[0_0_20px_rgba(0,242,254,0.35)]'
                      : 'bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border text-brand-textSecondary hover:text-brand-text hover:border-cyan-500/40 shadow-xs'
                  }`}
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeUpVariant}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (project.hasLiveDemo && project.demoUrl) {
                      setPreviewProject(project);
                    }
                  }}
                  className={`group rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border overflow-hidden shadow-sm hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between ${
                    project.hasLiveDemo ? 'cursor-pointer hover:shadow-[0_12px_35px_rgba(2,132,199,0.12)] dark:hover:shadow-[0_10px_35px_rgba(0,242,254,0.16)]' : ''
                  }`}
                >
                  {/* Thumbnail Header */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        if (
                          project.fallbackThumbnail &&
                          e.currentTarget.src !== project.fallbackThumbnail
                        ) {
                          e.currentTarget.src = project.fallbackThumbnail;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <Badge variant="blue" className="text-[11px]">
                        {project.category}
                      </Badge>

                      {project.hasLiveDemo ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Demo Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 text-slate-300 border border-white/15 backdrop-blur-md">
                          <Clock className="w-3 h-3 text-amber-400" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-xl font-bold text-brand-text group-hover:text-cyan-600 dark:group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed">
                        {project.shortDescription}
                      </p>

                      <ul className="space-y-1.5 pt-1 text-xs text-brand-textSecondary">
                        {project.highlights.slice(0, 4).map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-brand-cyan shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-brand-border">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-slate-900 text-cyan-800 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA Row */}
                      {project.hasLiveDemo && project.demoUrl ? (
                        <div
                          className="flex flex-wrap items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            type="button"
                            variant="glow"
                            size="sm"
                            onClick={() => setPreviewProject(project)}
                            icon={<Play className="w-3.5 h-3.5 fill-current" />}
                          >
                            Live Preview
                          </Button>
                          <Button
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            size="sm"
                            iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            Open in New Tab
                          </Button>
                        </div>
                      ) : (
                        <p className="text-xs font-medium text-brand-textSecondary italic">
                          Interactive public demo deployment in progress.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Existing Verified Client Portfolio Gallery */}
      <Gallery />

      {/* 80%-Width Desktop Interactive Preview Modal */}
      <ProjectPreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}
