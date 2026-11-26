import React from 'react';
import { Services } from '../components/Services';

/**
 * Dedicated Services Page (`/services`) showcasing Nebula Infinite's full
 * engineering capabilities with top spacing for the fixed navigation bar.
 *
 * @returns {JSX.Element}
 */
export function ServicesPage() {
  return (
    <div className="pt-12">
      <Services />
    </div>
  );
}
