import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges CSS classes dynamically with Tailwind conflict resolution.
 * Combines clsx conditional handling with tailwind-merge deduping.
 *
 * @param {...(string|undefined|null|boolean|Record<string, any>)} inputs - Class names or conditional class objects
 * @returns {string} - Clean, conflict-free className string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
