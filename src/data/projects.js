/**
 * @file projects.js
 * @description Centralized, scalable Projects & Live Interactive Demos data source.
 *
 * ============================================================================
 * HOW TO ADD A NEW LIVE SYSTEM DEMO (BEGINNER-FRIENDLY STEP-BY-STEP GUIDE)
 * ============================================================================
 * 1. Place your project screenshot / preview image inside:
 *    `frontend/public/images/projects/<your-project-id>.jpg` (recommended 16:10 aspect ratio, e.g. 1280x800).
 *    (If the image is not placed yet, the UI automatically falls back to `fallbackThumbnail`.)
 *
 * 2. Copy the template object below and append it to the `PROJECTS` array:
 *
 *    {
 *      id: "restaurant-pos-suite",                    // Unique kebab-case identifier
 *      title: "Nebula DinePOS & Kitchen Display",     // Display title on card & modal top bar
 *      category: "Smart POS & Hospitality",           // Human-readable category badge
 *      categoryKey: "pos",                            // Filter key: "erp" | "pos" | "web" | "mobile"
 *      status: "live",                                // "live" | "coming-soon"
 *      featured: true,                                // Set true to highlight on Home Page
 *      hasLiveDemo: true,                             // true enables the 80%-width Live Preview modal
 *      demoUrl: "https://your-demo.vercel.app/demo",  // HTTPS URL loaded inside the preview iframe
 *      thumbnail: "/images/projects/restaurant-pos.jpg",
 *      fallbackThumbnail: "/images/gallery/img-07.png",
 *      shortDescription: "One-line summary shown on project cards.",
 *      description: "Full architectural overview shown in detail views.",
 *      techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Prisma", "MySQL"],
 *      highlights: [
 *        "Key capability 1",
 *        "Key capability 2",
 *      ],
 *    }
 *
 * 3. Save the file. The Portfolio (/portfolio & /projects) page and Home featured
 *    demo section automatically render the new project and wire up its Live Preview modal!
 * ============================================================================
 */

/**
 * @typedef {Object} ProjectItem
 * @property {string} id - Unique kebab-case identifier for the project
 * @property {string} title - Display title shown on cards and the preview modal
 * @property {string} category - Human-readable category badge label
 * @property {'erp' | 'pos' | 'web' | 'mobile'} categoryKey - Filter tab key
 * @property {'live' | 'coming-soon'} status - Deployment status of the interactive demo
 * @property {boolean} featured - Whether to feature this project in the Home page showcase
 * @property {boolean} hasLiveDemo - Enables the 80%-width interactive iframe preview modal
 * @property {string | null} demoUrl - Live deployed demo URL for iframe & "Open in New Tab"
 * @property {string} thumbnail - Primary project preview image path under /public
 * @property {string} fallbackThumbnail - Guaranteed fallback image if thumbnail is not yet placed
 * @property {string} shortDescription - Concise card summary
 * @property {string} description - Detailed project description
 * @property {string[]} techStack - Technologies powering the solution
 * @property {string[]} highlights - Key functional modules and capabilities
 */

/**
 * Filter categories for the Projects & Live Demos page.
 * @type {Array<{ key: string, label: string }>}
 */
export const PROJECT_CATEGORIES = [
  { key: 'all', label: 'All Systems' },
  { key: 'erp', label: 'Enterprise ERP' },
  { key: 'pos', label: 'Smart POS' },
  { key: 'web', label: 'Web & E-Commerce' },
  { key: 'mobile', label: 'Mobile Apps' },
];

/**
 * Master list of Nebula Infinite featured systems, live interactive demos,
 * and upcoming client demo deployments.
 *
 * @type {ProjectItem[]}
 */
export const PROJECTS = [
  {
    id: 'apex-apparel-erp',
    title: 'Apex Apparel ERP & POS Suite',
    category: 'Enterprise ERP & POS',
    categoryKey: 'erp',
    status: 'live',
    featured: true,
    hasLiveDemo: true,
    demoUrl: 'https://apex-apparel-demo.vercel.app/demo/apparel-erp/system/quick-invoice',
    thumbnail: '/images/projects/apex-apparel-erp.jpg',
    fallbackThumbnail: '/images/projects/apex-apparel-erp.jpg',
    shortDescription:
      'End-to-end garment manufacturing ERP, multi-branch retail & wholesale POS, cheque/credit ledger, and luxury e-commerce storefront.',
    description:
      'A full-scale enterprise resource planning and point-of-sale platform engineered for apparel manufacturers and retail chains. Tracks every garment from fabric cutting through finishing while synchronizing retail billing, wholesale credit ledgers, and an integrated luxury storefront in real time.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'MySQL'],
    highlights: [
      'Multi-stage garment production (Cutting, Line, Wash, Finishing)',
      'Retail & Wholesale POS with barcode & thermal receipt support',
      'Cheque & Credit Ledger with automated aging alerts',
      'Integrated Luxury Storefront & inventory sync',
      'Granular Role-Based Access Control (RBAC)',
    ],
  },
  {
    id: 'nebula-dine-pos',
    title: 'Nebula DinePOS & Kitchen Display',
    category: 'Smart POS & Hospitality',
    categoryKey: 'pos',
    status: 'coming-soon',
    featured: false,
    hasLiveDemo: false,
    demoUrl: null,
    thumbnail: '/images/projects/nebula-dine-pos.jpg',
    fallbackThumbnail: '/images/gallery/img-07.png',
    shortDescription:
      'High-speed restaurant & café POS featuring table floor plans, KOT routing, split billing, and offline-resilient order sync.',
    description:
      'Built for busy dining establishments and multi-outlet cafés. Combines touch-optimized cashier billing with real-time Kitchen Order Ticket (KOT) screens, recipe-level ingredient deduction, and split-check settlements.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'MySQL'],
    highlights: [
      'Interactive table & floor-plan management',
      'Real-time Kitchen Display System (KDS) & KOT printing',
      'Offline-first cashier mode with automatic cloud sync',
      'Recipe-level raw material stock deduction',
    ],
  },
  {
    id: 'hardware-distribution-pos',
    title: 'ApexBuild Hardware & Distribution POS',
    category: 'Wholesale & Hardware POS',
    categoryKey: 'pos',
    status: 'coming-soon',
    featured: false,
    hasLiveDemo: false,
    demoUrl: null,
    thumbnail: '/images/projects/hardware-distribution-pos.jpg',
    fallbackThumbnail: '/images/gallery/img-09.png',
    shortDescription:
      'Bulk hardware, timber, and building-material POS with unit conversions, lorry dispatch tracking, and dealer credit limits.',
    description:
      'Tailored for hardware wholesalers and construction supply depots. Handles multi-unit pricing (length, weight, bundle), contractor credit accounts, and multi-warehouse stock transfers.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'MySQL'],
    highlights: [
      'Dynamic unit-of-measure & bulk tier pricing',
      'Contractor credit limit enforcement & statement generation',
      'Multi-warehouse transfer & GRN verification',
      'Fast barcode & SKU quick-lookup terminal',
    ],
  },
  {
    id: 'jewellery-pawning-erp',
    title: 'LankaGold Jewellery & Pawning Suite',
    category: 'Jewellery & Pawning ERP',
    categoryKey: 'erp',
    status: 'coming-soon',
    featured: false,
    hasLiveDemo: false,
    demoUrl: null,
    thumbnail: '/images/projects/jewellery-pawning-erp.jpg',
    fallbackThumbnail: '/images/gallery/img-11.png',
    shortDescription:
      'Precision carat-weight inventory, live gold-rate billing, pawning ticket management, and automated interest calculation.',
    description:
      'Specialized ERP and POS software for jewellery showrooms and pawning centers. Tracks net/gross gold weight, stone charges, making fees, and secure pawning redemption schedules with audit-ready ledgers.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Prisma', 'MySQL'],
    highlights: [
      'Live daily gold-rate & carat-based pricing engine',
      'Secure pawning ticket issuance & interest reminders',
      'High-security tag & barcode inventory auditing',
      'Customer SMS/WhatsApp redemption notifications',
    ],
  },

  /*
   * --------------------------------------------------------------------------
   * COMMENTED TEMPLATE — COPY & UNCOMMENT TO ADD A NEW LIVE DEMO IN SECONDS
   * --------------------------------------------------------------------------
   * {
   *   id: 'new-client-demo',
   *   title: 'Client System Name',
   *   category: 'Enterprise ERP & POS',
   *   categoryKey: 'erp',
   *   status: 'live',
   *   featured: false,
   *   hasLiveDemo: true,
   *   demoUrl: 'https://your-live-demo.vercel.app',
   *   thumbnail: '/images/projects/new-client-demo.jpg',
   *   fallbackThumbnail: '/images/gallery/img-01.png',
   *   shortDescription: 'Brief 1-sentence summary of the system.',
   *   description: 'Detailed explanation of the business problem and architecture.',
   *   techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'MySQL'],
   *   highlights: [
   *     'Feature highlight 1',
   *     'Feature highlight 2',
   *   ],
   * },
   */
];
