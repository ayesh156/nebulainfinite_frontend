import React from 'react';
import { Contact } from '../components/Contact';

/**
 * Dedicated Contact Page (`/contact`) with interactive consultation form,
 * custom SearchableSelect, WhatsApp dispatch, and embedded location map.
 *
 * @returns {JSX.Element}
 */
export function ContactPage() {
  return (
    <div className="pt-12">
      <Contact />
    </div>
  );
}
