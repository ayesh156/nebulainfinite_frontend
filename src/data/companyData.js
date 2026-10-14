/**
 * @file companyData.js
 * @description Single Source of Truth for Nebula Infinite website data.
 * Contains brand metadata, leadership profiles, services, portfolio items,
 * contact info, social integration links, and navigation items.
 */

/**
 * Company profile metadata, contact info, leadership, and branding assets.
 */
export const COMPANY_INFO = {
  name: "Nebula Infinite",
  tagline: "Engineering Intelligent Software, Transforming Visions",
  shortDescription:
    "We architect production-grade POS systems, enterprise ERPs, cross-platform mobile apps, and high-impact digital solutions that fuel commercial growth.",
  fullDescription:
    "At Nebula Infinite, we are more than just a software company — we are your strategic digital transformation partner. Founded on September 1, 2023, we empower businesses across retail, logistics, manufacturing, and commerce with battle-tested software systems, high-speed mobile apps, and bespoke enterprise solutions.",
  foundedDate: "September 1, 2023",
  location: "Makandura, Matara, Sri Lanka",
  fullAddress: "Diddenipotha, Makandura, Matara, Southern Province, Sri Lanka",
  phone: "+94 78 323 3760",
  phoneRaw: "+94783233760",
  phoneClean: "94783233760",
  email: "nebulainfinitex@gmail.com",
  secondaryEmail: "info@nebulainfinite.com",
  whatsappUrl:
    "https://wa.me/94783233760?text=Hello%20Nebula%20Infinite!%20I'd%20like%20to%20inquire%20about%20your%20software%20solutions.",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5372.055761543986!2d80.57243545661696!3d6.158065457823499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae15b28dabae2f5%3A0xef76e0d3f3bb392d!2sMulatiyana!5e0!3m2!1sen!2slk!4v1693418483122!5m2!1sen!2slk",
  
  // Official Branding & Building Imagery
  logo: "/images/Logo.png",
  buildingLandscape: "/images/company-landscape.jpg",
  buildingSquare: "/images/company.jpg",

  // Official Social Integration Channels
  socialLinks: {
    facebook: "https://www.facebook.com/nebulainfinite",
    linkedin: "https://www.linkedin.com/company/nebula-infinite",
  },

  founders: [
    {
      name: "Ayesh Chathuranga",
      role: "Chief Executive Officer & Lead Architect",
      bio: "Visionary technology strategist leading engineering architecture and enterprise software solutions.",
    },
    {
      name: "Sachira Jayawardana",
      role: "Chief Operating Officer & Product Lead",
      bio: "Operations leader overseeing seamless product delivery, client satisfaction, and quality assurance.",
    },
  ],

  stats: [
    { value: "50+", label: "Delivered Projects" },
    { value: "99.9%", label: "System Uptime" },
    { value: "24/7", label: "Dedicated Support" },
    { value: "100%", label: "Client Satisfaction" },
  ],
};

/**
 * Top level clean URL navigation items.
 * Configured with canonical clean paths and corresponding DOM section identifiers.
 */
export const NAV_LINKS = [
  { label: "Home", href: "/", sectionId: "hero" },
  { label: "Services", href: "/services", sectionId: "services" },
  { label: "Portfolio", href: "/portfolio", sectionId: "gallery" },
  { label: "About Us", href: "/about", sectionId: "about" },
  { label: "Contact", href: "/contact", sectionId: "contact" },
];

/**
 * Core Engineering Services provided by Nebula Infinite.
 */
export const SERVICES = [
  {
    id: "pos-systems",
    title: "Custom Software & POS Systems",
    iconName: "MonitorCheck",
    badge: "Core Expertise",
    description:
      "High-speed, offline-resilient Point of Sale software engineered for supermarkets, retail chains, and dining establishments.",
    features: [
      "Thermal printer & barcode scanner integration",
      "Multi-terminal real-time inventory synchronization",
      "Offline cashier mode with automatic cloud sync",
      "Daily audit reports and cashier shift management",
    ],
    highlight: "Engineered for 99.99% checkout uptime during peak retail hours.",
  },
  {
    id: "erp-solutions",
    title: "Enterprise ERP Solutions",
    iconName: "Building2",
    badge: "Enterprise",
    description:
      "All-in-one resource planning ecosystems that connect finance, warehouse management, purchasing, and staff workflows.",
    features: [
      "Centralized multi-branch inventory tracking",
      "Automated accounting & ledger generation",
      "Granular role-based security access controls",
      "Predictive stock depletion & procurement warnings",
    ],
    highlight: "Streamlines operational bottlenecks and eliminates manual data reconciliation.",
  },
  {
    id: "web-development",
    title: "Web & E-Commerce Platforms",
    iconName: "Globe2",
    badge: "High Converting",
    description:
      "High-converting modern web applications, digital storefronts, and client portals built with lightning-fast architectures.",
    features: [
      "Sub-second load times optimized for maximum SEO ranking",
      "Secure payment gateway integrations (Stripe, PayHere, etc.)",
      "Dynamic interactive catalogs with smart search & filters",
      "Mobile-first responsive fluid layouts across all viewports",
    ],
    highlight: "Designed for immersive brand storytelling and maximum visitor conversion.",
  },
  {
    id: "mobile-apps",
    title: "Cross-Platform Mobile Apps",
    iconName: "Smartphone",
    badge: "Cross-Platform",
    description:
      "Native-grade mobile experiences for iOS and Android powered by modern frameworks like Flutter and React Native.",
    features: [
      "Single codebase efficiency with 60fps native performance",
      "Real-time push notifications & background sync",
      "Biometric security & offline data caching",
      "App Store & Google Play seamless deployment support",
    ],
    highlight: "Launch your product simultaneously to millions of mobile users.",
  },
  {
    id: "automation-cloud",
    title: "Smart Automation & Cloud Systems",
    iconName: "Cpu",
    badge: "Automation",
    description:
      "Eliminate tedious repetitive tasks with automated pipelines, third-party webhook integrations, and cloud infrastructure.",
    features: [
      "Custom RESTful & GraphQL API gateway development",
      "Automated WhatsApp & SMS customer notifications",
      "Secure cloud server deployments with automated backups",
      "Data pipeline migrations and legacy system modernization",
    ],
    highlight: "Automates up to 70% of routine clerical workflows for higher margins.",
  },
  {
    id: "uiux-consulting",
    title: "Digital Innovation & UI/UX Consulting",
    iconName: "Sparkles",
    badge: "Strategy",
    description:
      "Transform user friction into effortless customer delight with world-class user interfaces and interactive prototypes.",
    features: [
      "Bespoke design systems & Figma component libraries",
      "User journey mapping & usability audits",
      "Micro-animations & interactive dashboard visualizers",
      "Conversion rate optimization (CRO) methodologies",
    ],
    highlight: "Crafts intuitive digital interfaces your team and customers will love.",
  },
];

/**
 * Portfolio items mapping cleanly to compressed PNG images in /images/gallery.
 */
export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Nebula Enterprise ERP Suite",
    category: "ERP System",
    categoryKey: "erp",
    image: "/images/gallery/img-01.png",
    description:
      "Complete organizational resource planning interface with real-time analytics, stock movement, and financial balance ledgers.",
    tags: ["ERP", "Analytics", "Inventory"],
  },
  {
    id: 2,
    title: "Supply Chain & Procurement Portal",
    category: "ERP System",
    categoryKey: "erp",
    image: "/images/gallery/img-02.png",
    description:
      "Centralized supplier order dispatcher, shipment audit logs, and purchase requisition approval pipelines.",
    tags: ["ERP", "Supply Chain", "Automated"],
  },
  {
    id: 3,
    title: "Retail E-Commerce Experience",
    category: "E-Commerce",
    categoryKey: "web",
    image: "/images/gallery/img-03.png",
    description:
      "Contemporary online digital storefront with intuitive product navigation, fast search filters, and smooth cart drawer.",
    tags: ["Web", "E-Commerce", "React"],
  },
  {
    id: 4,
    title: "Omni-Channel Product Showcase",
    category: "E-Commerce",
    categoryKey: "web",
    image: "/images/gallery/img-04.png",
    description:
      "Visual catalog platform integrated with automated price tiering, currency conversion, and customer checkout flows.",
    tags: ["E-Commerce", "Checkout", "Responsive"],
  },
  {
    id: 5,
    title: "Nebula Mobile Client Application",
    category: "Mobile App",
    categoryKey: "mobile",
    image: "/images/gallery/img-05.png",
    description:
      "Cross-platform Flutter application featuring real-time client notifications, interactive dashboards, and biometric authentication.",
    tags: ["Flutter", "Mobile", "iOS & Android"],
  },
  {
    id: 6,
    title: "Digital Retail Web Portal",
    category: "E-Commerce",
    categoryKey: "web",
    image: "/images/gallery/img-06.png",
    description:
      "Scalable commercial web platform featuring high-density inventory views, promotional banners, and customer accounts.",
    tags: ["Web", "Retail", "Cloud"],
  },
  {
    id: 7,
    title: "Touchscreen Express POS Terminal",
    category: "POS System",
    categoryKey: "pos",
    image: "/images/gallery/img-07.png",
    description:
      "Ergonomic touch-friendly billing interface optimized for rapid cashier throughput and thermal receipt printing.",
    tags: ["POS", "Retail", "Hardware Ready"],
  },
  {
    id: 8,
    title: "Enterprise React Native App",
    category: "Mobile App",
    categoryKey: "mobile",
    image: "/images/gallery/img-08.png",
    description:
      "Custom mobile workforce tool for field representatives with offline sync, GPS tracking, and instant report exports.",
    tags: ["React Native", "Mobile", "Enterprise"],
  },
  {
    id: 9,
    title: "Multi-Branch Cloud POS Management",
    category: "POS System",
    categoryKey: "pos",
    image: "/images/gallery/img-09.png",
    description:
      "Cloud backend providing branch owners with live sales visualizers, gross margin calculators, and cashier audits.",
    tags: ["POS", "Cloud", "Multi-Branch"],
  },
  {
    id: 10,
    title: "High-Speed Cashier POS System",
    category: "POS System",
    categoryKey: "pos",
    image: "/images/gallery/img-10.png",
    description:
      "Sub-second barcode scan processing, multi-currency tender options, and split-payment cashier software.",
    tags: ["POS", "Billing", "High-Speed"],
  },
  {
    id: 11,
    title: "Corporate Architecture & Digital Operations",
    category: "ERP System",
    categoryKey: "erp",
    image: "/images/gallery/img-11.png",
    description:
      "Executive overview dashboard showing high-level KPI trends, departmental milestones, and automated quarterly forecasts.",
    tags: ["ERP", "Executive", "Dashboards"],
  },
];

/**
 * Filter categories for Portfolio Gallery.
 */
export const GALLERY_CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "pos", label: "POS Systems" },
  { key: "erp", label: "ERP Solutions" },
  { key: "web", label: "Web & E-Commerce" },
  { key: "mobile", label: "Mobile Apps" },
];

/**
 * Nebula Infinite 4 Pillars of Engineering Excellence.
 */
export const WHY_CHOOSE_US = [
  {
    title: "Customized Architecture",
    description:
      "We build software custom-fit to your exact operations rather than forcing your business into rigid off-the-shelf templates.",
    icon: "Layers",
  },
  {
    title: "High-Converting Performance",
    description:
      "Lightning-fast load speeds, bulletproof reliability, and pixel-perfect design calibrated to convert visitors into loyal clients.",
    icon: "Zap",
  },
  {
    title: "24/7 Dedicated Support",
    description:
      "Immediate assistance when you need it most. Our engineering team stands behind every line of code deployed in production.",
    icon: "ShieldCheck",
  },
  {
    title: "Future-Ready Tech Stack",
    description:
      "Built with scalable technologies (React, Vite, Node, Flutter, Cloud APIs) guaranteeing zero technical debt as you scale.",
    icon: "Code2",
  },
];
