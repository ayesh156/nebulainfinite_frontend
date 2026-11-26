/**
 * @file navigation.js
 * @description Centralized multi-page routing, URL history, and smooth page navigation utility.
 * Eliminates hash (#) fragment URLs in favor of clean HTML5 History URLs
 * (e.g. /, /services, /portfolio, /projects, /about, /contact) while supporting
 * browser back/forward history, deep-link page loads, and smooth scroll-to-top transitions.
 */

/**
 * Custom DOM event name dispatched whenever the application navigates via pushState/replaceState,
 * allowing RouterProvider and Navbar to react immediately to route changes.
 */
export const ROUTE_CHANGE_EVENT = 'nebula:route-change';

/**
 * Canonical route configuration table.
 * Maps clean pathname URLs (including aliases like /projects and /gallery)
 * to a canonical route path and page metadata.
 *
 * @type {Record<string, { path: string, title: string }>}
 */
export const ROUTE_MAP = {
  '/': { path: '/', title: 'Nebula Infinite | Enterprise POS, ERP & Custom Software' },
  '/services': { path: '/services', title: 'Services | Nebula Infinite' },
  '/portfolio': { path: '/portfolio', title: 'Projects & Live Demos | Nebula Infinite' },
  '/projects': { path: '/portfolio', title: 'Projects & Live Demos | Nebula Infinite' },
  '/gallery': { path: '/portfolio', title: 'Projects & Live Demos | Nebula Infinite' },
  '/about': { path: '/about', title: 'About Us | Nebula Infinite' },
  '/contact': { path: '/contact', title: 'Contact Us | Nebula Infinite' },
};

/**
 * Normalizes a pathname by trimming trailing slashes (except root '/') and lowercasing.
 *
 * @param {string} pathname - Raw URL pathname
 * @returns {string} Normalized pathname
 */
export function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  const trimmed = pathname.replace(/\/+$/, '').toLowerCase();
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * Resolves a given target string (pathname, legacy section ID, or legacy hash)
 * to a canonical route object `{ path, title }`.
 *
 * @param {string} target - Route path (e.g., '/services'), alias ('/projects'), or legacy hash ('#services')
 * @returns {{ path: string, title: string }}
 */
export function resolveRoute(target) {
  if (!target) {
    return ROUTE_MAP['/'];
  }

  // Strip legacy hash prefix if present (e.g. '#services' -> '/services')
  const withoutHash = target.startsWith('#') ? target.slice(1) : target;
  const normalized = normalizePathname(withoutHash);

  if (ROUTE_MAP[normalized]) {
    return ROUTE_MAP[normalized];
  }

  // Fallback unknown routes to Home
  return ROUTE_MAP['/'];
}

/**
 * Navigates to a target route using HTML5 History API without full-page reload,
 * updates the document title, dispatches a route-change event, and scrolls smoothly to top.
 *
 * @param {string} target - Target pathname (e.g. '/portfolio', '/services')
 * @param {React.MouseEvent} [event] - Optional click event to prevent default anchor reload
 * @param {Object} [options={}] - Navigation options
 * @param {boolean} [options.replace=false] - Whether to replace history state instead of pushing
 * @param {ScrollBehavior} [options.behavior='smooth'] - Scroll-to-top behavior
 */
export function navigateTo(target, event, options = {}) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  if (typeof window === 'undefined') return;

  const { replace = false, behavior = 'smooth' } = options;
  const { path, title } = resolveRoute(target);
  const currentNormalized = normalizePathname(window.location.pathname);

  if (currentNormalized !== path || window.location.hash) {
    if (replace) {
      window.history.replaceState({ path }, '', path);
    } else {
      window.history.pushState({ path }, '', path);
    }
    document.title = title;
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: { path } }));
  }

  window.scrollTo({
    top: 0,
    behavior,
  });
}
