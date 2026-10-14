/**
 * @file motion.js
 * @description Centralized Framer Motion animation configurations, variants,
 * and easing curves optimized for 60fps cross-device performance (Desktop, Tablet, Mobile).
 * Includes viewport trigger settings and graceful degradation helpers.
 */

/**
 * Standard cubic-bezier easing curves for modern, high-end interfaces.
 * - `smooth`: Luxurious ease-out for entrance transitions.
 * - `snappy`: Quick micro-interaction response.
 */
export const EASINGS = {
  smooth: [0.25, 1, 0.5, 1], // easeOutQuart
  bounce: [0.34, 1.56, 0.64, 1],
  snappy: [0.4, 0, 0.2, 1],
};

/**
 * Default viewport trigger options for scroll-driven animations.
 * Triggers once to prevent jarring re-animations when scrolling back up.
 * Negative margin ensures elements animate just as they enter natural reading focus.
 */
export const defaultViewport = {
  once: true,
  margin: '-100px',
};

/**
 * Mobile-optimized viewport trigger options with slightly relaxed margin
 * to account for smaller display viewports and fast swipe momentum.
 */
export const mobileViewport = {
  once: true,
  margin: '-50px',
};

/**
 * Container variant that staggers child elements smoothly.
 *
 * @param {number} [staggerTime=0.1] - Delay between each child entrance
 * @param {number} [delayTime=0.05] - Initial delay before starting children
 * @returns {import('framer-motion').Variants}
 */
export const staggerContainer = (staggerTime = 0.1, delayTime = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delayTime,
    },
  },
});

/**
 * Clean fade-up animation variant for section headings, text blocks, and cards.
 */
export const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Soft fade-down variant used for badges and top indicators.
 */
export const fadeDownVariant = {
  hidden: {
    opacity: 0,
    y: -18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Slide-in from left variant for split columns and hero left content.
 */
export const slideInLeftVariant = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Slide-in from right variant for sidebars, preview cards, and contact form.
 */
export const slideInRightVariant = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Subtle scale-up variant for project previews, cards, and modal dialogs.
 */
export const scaleUpVariant = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Gentle pure fade-in variant.
 */
export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Standard button micro-interaction definitions.
 */
export const buttonMotionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: EASINGS.snappy },
};

/**
 * Card elevation micro-interaction definitions.
 */
export const cardHoverMotion = {
  whileHover: {
    y: -5,
    transition: { duration: 0.25, ease: EASINGS.smooth },
  },
};
