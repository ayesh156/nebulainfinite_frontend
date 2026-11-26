import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ROUTE_CHANGE_EVENT,
  resolveRoute,
  navigateTo as navTo,
  normalizePathname,
} from '../utils/navigation';

/**
 * @typedef {Object} RouterContextValue
 * @property {string} currentPath - Current canonical route pathname (e.g. '/', '/services', '/portfolio')
 * @property {(target: string, event?: React.MouseEvent, options?: Object) => void} navigate - Navigate to a clean route
 */

const RouterContext = createContext({
  currentPath: '/',
  navigate: () => {},
});

/**
 * Multi-page clean-URL RouterProvider backed by HTML5 History (`pushState` / `popstate`).
 * Automatically normalizes legacy hash URLs (e.g. `/#services` -> `/services`) and
 * aliases (e.g. `/projects` -> `/portfolio`) on initial load and history changes.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function RouterProvider({ children }) {
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    if (window.location.hash) {
      const clean = window.location.hash.replace('#', '');
      return resolveRoute(clean).path;
    }
    return resolveRoute(window.location.pathname).path;
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  useEffect(() => {
    // Normalize legacy hash URLs or aliases (e.g. /projects -> /portfolio) on mount
    const rawTarget = window.location.hash
      ? window.location.hash.replace('#', '')
      : window.location.pathname;
    const resolved = resolveRoute(rawTarget);
    const currentNormalized = normalizePathname(window.location.pathname);

    if (window.location.hash || currentNormalized !== resolved.path) {
      window.history.replaceState({ path: resolved.path }, '', resolved.path);
    }
    document.title = resolved.title;
    setCurrentPath(resolved.path);

    const handleRouteChange = (e) => {
      const nextPath = e?.detail?.path || resolveRoute(window.location.pathname).path;
      setCurrentPath(nextPath);
    };

    const handlePopState = () => {
      const resolvedPop = resolveRoute(window.location.pathname);
      document.title = resolvedPop.title;
      setCurrentPath(resolvedPop.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((target, event, options) => {
    navTo(target, event, options);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

/**
 * Hook to access current route path and programmatic navigation helper.
 *
 * @returns {RouterContextValue}
 */
export function useRouter() {
  return useContext(RouterContext);
}
