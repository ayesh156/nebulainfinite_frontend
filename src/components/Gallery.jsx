import React, { useState } from 'react';
import { ExternalLink, Maximize2, Sparkles, MessageSquare, ArrowRight, Tag } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, COMPANY_INFO } from '../data/companyData';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

/**
 * Portfolio & Gallery component showcasing Nebula Infinite's verified client projects,
 * ERP systems, POS terminals, e-commerce web applications, and mobile apps.
 * Utilizes compressed PNG image assets located in /images/gallery with high-resolution preview modal.
 *
 * @returns {JSX.Element}
 */
export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter items based on active category key
  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.categoryKey === activeCategory);

  return (
    <section id="gallery" className="relative py-24 bg-slate-50/50 dark:bg-brand-surface/40 overflow-hidden transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading with explicit badge container to prevent floating overlaps on mobile */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <div className="relative z-10 inline-flex items-center justify-center mb-3 sm:mb-4">
            <Badge variant="cyan" pulse={true} className="relative z-10">
              Proven Track Record
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-display tracking-tight">
            Our Featured{' '}
            <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:to-blue-400 bg-clip-text text-transparent">
              Portfolio & Systems
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            Explore live production builds spanning enterprise ERPs, high-throughput retail POS terminals,
            responsive e-commerce ecosystems, and cross-platform mobile apps.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-brand-cyan dark:to-blue-500 text-white dark:text-slate-950 shadow-[0_4px_20px_rgba(2,132,199,0.25)] dark:shadow-[0_0_20px_rgba(0,242,254,0.35)] scale-105'
                    : 'bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border text-brand-textSecondary hover:text-brand-text hover:border-cyan-500/40 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group relative rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border overflow-hidden cursor-pointer hover:border-cyan-500/60 hover:shadow-[0_12px_35px_rgba(2,132,199,0.12)] dark:hover:shadow-[0_10px_35px_rgba(0,242,254,0.18)] transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 dark:bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108 group-hover:brightness-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high-resolution JPEG asset in /images/gallery if PNG is unavailable
                    const fallbackSrc = item.image.replace('.png', '.jpg');
                    if (e.currentTarget.src !== fallbackSrc) {
                      e.currentTarget.src = fallbackSrc;
                    }
                  }}
                />
                {/* Subtle dark vignette over bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                {/* Top overlay category badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="blue" className="text-[10px] py-0.5">
                    {item.category}
                  </Badge>
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-text group-hover:text-cyan-600 dark:group-hover:text-brand-cyan transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-brand-textSecondary line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags & Action prompt */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-brand-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-cyan-700 dark:text-brand-cyan bg-cyan-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-brand-textSecondary group-hover:text-cyan-600 dark:group-hover:text-brand-cyan font-medium flex items-center gap-1 transition-colors">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Details Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || 'Project Showcase'}
          maxWidth="max-w-4xl"
        >
          {selectedProject && (
            <div className="space-y-6">
              {/* Full Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-brand-border bg-slate-900 dark:bg-slate-950 shadow-md">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-[500px] object-contain mx-auto"
                  onError={(e) => {
                    const fallback = selectedProject.image.replace('.png', '.jpg');
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Project Metadata */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan">{selectedProject.category}</Badge>
                    <span className="text-xs text-brand-textSecondary">Verified Client Solution</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono text-cyan-700 dark:text-brand-cyan bg-cyan-50 dark:bg-brand-card px-2.5 py-1 rounded-md border border-cyan-200 dark:border-cyan-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-brand-text leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-brand-border flex flex-col sm:flex-row items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close Preview
                  </Button>
                  <Button
                    href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=Hello%20Nebula%20Infinite!%20I%20saw%20your%20project%20"${encodeURIComponent(
                      selectedProject.title
                    )}"%20and%20would%20like%20to%20discuss%20a%20similar%20solution.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="glow"
                    size="sm"
                    icon={<MessageSquare className="w-4 h-4 text-current" />}
                  >
                    Discuss Similar Solution
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
