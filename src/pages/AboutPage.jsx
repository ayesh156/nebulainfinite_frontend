import React from 'react';
import { About } from '../components/About';

/**
 * Dedicated About Us Page (`/about`) presenting Nebula Infinite's story,
 * Makandura/Matara headquarters, executive leadership, and engineering standards.
 *
 * @returns {JSX.Element}
 */
export function AboutPage() {
  return (
    <div className="pt-12">
      <About />
    </div>
  );
}
