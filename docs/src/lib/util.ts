// @ts-expect-error
import { clsx } from 'clsx';
// @ts-expect-error
import { twMerge } from 'tailwind-merge';

// @ts-expect-error
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

