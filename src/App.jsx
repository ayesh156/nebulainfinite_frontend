import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { useRouter } from './context/RouterContext';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

/**
 * Nebula Infinite Multi-Page Web Application root composition.
 * Maps clean pathname routes (`/`, `/services`, `/portfolio`, `/projects`, `/about`, `/contact`)
 * to dedicated page views wrapped in the persistent Layout (Navbar + Footer + WhatsAppFloat).
 *
 * @returns {JSX.Element}
 */
export default function App() {
  const { currentPath } = useRouter();

  /**
   * Resolves the active page component for the current canonical route.
   *
   * @returns {JSX.Element}
   */
  const renderPage = () => {
    switch (currentPath) {
      case '/services':
        return <ServicesPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="flex-1 flex flex-col"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
