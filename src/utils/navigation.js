/**
 * @file navigation.js
 * @description Centralized routing, URL history, and smooth section navigation utility.
 * Eliminates hash (#) fragment URLs in favor of clean HTML5 History URLs (e.g. /services, /portfolio, /contact)
 * while preserving smooth animated section transitions, browser back/forward history, and deep-link page loads.
 */

/**
 * Route-to-section mapping table.
 * Correlates clean pathname URLs with document element IDs.
 *
 * @type {Record<string, { id: string, path: string }>}
 */
export const ROUTE_MAP = {
  '/': { id: 'hero', path: '/' },
  '/services': { id: 'services', path: '/services' },
  '/portfolio': { id: 'gallery', path: '/portfolio' },
  '/gallery': { id: 'gallery', path: '/portfolio' },
  '/about': { id: 'about', path: '/about' },
  '/contact': { id: 'contact', path: '/contact' },
};

/**
 * Section element ID to canonical clean pathname mapping.
 *
 * @type {Record<string, string>}
 */
export const SECTION_TO_PATH = {
  hero: '/',
  services: '/services',
  gallery: '/portfolio',
  about: '/about',
  contact: '/contact',
};

/**
 * Height offset (in pixels) for the fixed top navigation bar.
 */
const NAVBAR_OFFSET = 80;

/**
 * Resolves a given target string (pathname, section ID, or legacy hash) to an element ID and canonical path.
 *
 * @param {string} target - Route path (e.g., '/services'), section ID (e.g., 'services'), or legacy hash ('#services')
 * @returns {{ id: string, path: string }}
 */
export function resolveRoute(target) {
  if (!target) {
    return { id: 'hero', path: '/' };
  }

  // Strip legacy hash prefix if present
  const clean = target.startsWith('#') ? target.slice(1) : target;

  // Direct route lookup (e.g. '/services')
  if (ROUTE_MAP[clean]) {
    return ROUTE_MAP[clean];
  }

  // With leading slash (e.g. 'services' -> '/services')
  const withSlash = `/${clean}`;
  if (ROUTE_MAP[withSlash]) {
    return ROUTE_MAP[withSlash];
  }

  // Section ID lookup (e.g. 'gallery')
  if (SECTION_TO_PATH[clean]) {
    return { id: clean, path: SECTION_TO_PATH[clean] };
  }

  return { id: 'hero', path: '/' };
}

/**
 * Smoothly scrolls the window to the designated section and synchronizes browser history with a clean URL.
 *
 * @param {string} target - Pathname ('/services') or section ID ('services')
 * @param {Object} [options={}] - Navigation options
 * @param {boolean} [options.replace=false] - Whether to replace history state instead of pushing
 * @param {boolean} [options.updateHistory=true] - Whether to modify browser history URL
 * @param {ScrollBehavior} [options.behavior='smooth'] - Scroll animation behavior
 */
export function scrollToSection(target, options = {}) {
  const { replace = false, updateHistory = true, behavior = 'smooth' } = options;
  const { id, path } = resolveRoute(target);

  if (typeof window === 'undefined') return;

  // Update browser URL without hash
  if (updateHistory && window.location.pathname !== path) {
    if (replace) {
      window.history.replaceState({ sectionId: id }, '', path);
    } else {
      window.history.pushState({ sectionId: id }, '', path);
    }
  }

  // Scroll to hero/top
  if (id === 'hero' || path === '/') {
    window.scrollTo({
      top: 0,
      behavior,
    });
    return;
  }

  // Scroll to section element
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - NAVBAR_OFFSET);

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });
  }
}

/**
 * Click handler helper for anchor links and buttons to prevent hash appending
 * and smoothly transition using clean URLs.
 *
 * @param {string} target - Pathname or section identifier
 * @param {React.MouseEvent} [event] - Optional click event to prevent default hash jumping
 */
export function navigateTo(target, event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  scrollToSection(target, { replace: false, updateHistory: true });
}
