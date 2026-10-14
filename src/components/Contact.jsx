import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

/**
 * Contact section with company reachability info, interactive inquiry form,
 * direct WhatsApp dispatch, social channels (Facebook & LinkedIn), and embedded Google Maps view.
 *
 * @returns {JSX.Element}
 */
export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom POS System',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles interactive form submission.
   * Dispatches formatted inquiry directly to Nebula Infinite's WhatsApp and prepares mailto link.
   *
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setFeedbackMsg('Please complete all required fields.');
      return;
    }

    setFormStatus('submitting');

    // Simulate fast processing
    setTimeout(() => {
      // Build WhatsApp message
      const text = encodeURIComponent(
        `*New Inquiry via Website*\n\n` +
          `*Name:* ${formData.name}\n` +
          `*Email:* ${formData.email}\n` +
          `*Phone:* ${formData.phone || 'N/A'}\n` +
          `*Service:* ${formData.service}\n\n` +
          `*Message:* ${formData.message}`
      );

      const targetUrl = `https://wa.me/${COMPANY_INFO.phoneClean}?text=${text}`;

      setFormStatus('success');
      setFeedbackMsg('Inquiry prepared! Opening direct WhatsApp chat with our engineering team...');

      // Open WhatsApp in new tab securely
      window.open(targetUrl, '_blank', 'noopener,noreferrer');

      // Clear fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Custom POS System',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 bg-brand-bg overflow-hidden transition-colors duration-300">
      {/* Background Graphic Blend */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with explicit badge container to prevent floating overlaps on mobile */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 flex flex-col items-center">
          <div className="relative z-10 inline-flex items-center justify-center mb-3 sm:mb-4">
            <Badge variant="cyan" pulse={true} className="relative z-10">
              Connect With Our Engineers
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text font-display tracking-tight">
            Let’s Build Your Next{' '}
            <span className="bg-gradient-to-r from-brand-cyan via-sky-500 to-blue-600 dark:from-brand-cyan dark:to-blue-400 bg-clip-text text-transparent">
              Breakthrough
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            Reach out directly for project quotes, technical consultations, or live POS & ERP demos.
            Our team responds promptly within 2-4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details, Social Channels & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              {/* WhatsApp & Phone */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-brand-card transition-all duration-300 flex items-center gap-4 group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-500/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0 shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-textSecondary font-semibold">
                    Phone / WhatsApp (24/7)
                  </p>
                  <p className="text-base sm:text-lg font-bold text-brand-text group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {COMPANY_INFO.phone}
                  </p>
                </div>
              </a>

              {/* Email Primary */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="p-5 rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border hover:border-cyan-500/50 hover:bg-cyan-50/20 dark:hover:bg-brand-card transition-all duration-300 flex items-center gap-4 group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/90 dark:border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0 shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs uppercase tracking-wider text-brand-textSecondary font-semibold">
                    Email Correspondence
                  </p>
                  <p className="text-sm sm:text-base font-bold text-brand-text group-hover:text-cyan-600 dark:group-hover:text-brand-cyan transition-colors truncate">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>

              {/* Physical Office Address */}
              <div className="p-5 rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border flex items-center gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-blue-950/40 border border-sky-200/90 dark:border-blue-500/40 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-textSecondary font-semibold">
                    Headquarters
                  </p>
                  <p className="text-sm sm:text-base font-bold text-brand-text">
                    {COMPANY_INFO.fullAddress}
                  </p>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="p-4 rounded-2xl bg-white dark:bg-brand-surface border border-slate-200 dark:border-brand-border flex items-center justify-between shadow-xs">
                <span className="text-xs font-semibold text-brand-textSecondary uppercase tracking-wider">
                  Official Channels:
                </span>
                <div className="flex items-center gap-2">
                  {/* LinkedIn */}
                  <a
                    href={COMPANY_INFO.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-brand-card hover:bg-[#0077b5] border border-slate-200 dark:border-brand-border hover:border-[#0077b5] text-brand-textSecondary hover:text-white transition-all shadow-xs group"
                    aria-label="Visit Nebula Infinite on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={COMPANY_INFO.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-brand-card hover:bg-[#1877f2] border border-slate-200 dark:border-brand-border hover:border-[#1877f2] text-brand-textSecondary hover:text-white transition-all shadow-xs group"
                    aria-label="Visit Nebula Infinite on Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-brand-border shadow-md bg-slate-100 dark:bg-slate-950 h-64 sm:h-72 relative">
              <iframe
                title="Nebula Infinite Office Location"
                src={COMPANY_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-medium text-slate-800 dark:text-cyan-300 shadow-sm">
                Makandura, Matara, Sri Lanka
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Quote Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white dark:bg-brand-surface border-slate-200 dark:border-brand-border shadow-md">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-text font-display">
                  Send Project Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-brand-textSecondary mt-1">
                  Fill in your details below. You can connect directly via WhatsApp or receive a prompt proposal by email.
                </p>
              </div>

              {formStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Silva"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-300 dark:border-brand-border text-brand-text placeholder-brand-textSecondary/50 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@business.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-300 dark:border-brand-border text-brand-text placeholder-brand-textSecondary/50 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp Input */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-1.5"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +94 77 123 4567"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-300 dark:border-brand-border text-brand-text placeholder-brand-textSecondary/50 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-1.5"
                    >
                      Primary Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-300 dark:border-brand-border text-brand-text text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    >
                      <option value="Custom POS System">Custom POS System</option>
                      <option value="Enterprise ERP Solution">Enterprise ERP Solution</option>
                      <option value="Web & E-Commerce Platform">Web & E-Commerce Platform</option>
                      <option value="Cross-Platform Mobile App">Cross-Platform Mobile App</option>
                      <option value="Smart Automation & Cloud">Smart Automation & Cloud</option>
                      <option value="Other Bespoke Engineering">Other Bespoke Engineering</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-brand-textSecondary mb-1.5"
                  >
                    Project Scope & Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your business goals, target timelines, or current pain points..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-card border border-slate-300 dark:border-brand-border text-brand-text placeholder-brand-textSecondary/50 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-between">
                  <div className="text-xs text-brand-textSecondary flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-brand-cyan" />
                    <span>Average reply time: under 4 hours</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      type="submit"
                      variant="glow"
                      size="md"
                      disabled={formStatus === 'submitting'}
                      icon={
                        formStatus === 'submitting' ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 text-current" />
                        )
                      }
                      className="w-full sm:w-auto justify-center"
                    >
                      {formStatus === 'submitting' ? 'Dispatching...' : 'Dispatch Inquiry'}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
