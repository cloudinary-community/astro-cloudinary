import astroPkg from 'astro/package.json';
import pkg from '../../package.json';

export const ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID = 'B';
export const ASTRO_CLOUDINARY_ANALYTICS_ID = 'G';
export const ASTRO_VERSION = normalizeVersion(astroPkg.version);
export const ASTRO_CLOUDINARY_VERSION = normalizeVersion(pkg.version);

function normalizeVersion(version: string) {
  let normalized = version;
  if ( normalized.includes('-') ) {
    normalized = normalized.split('-')[0];
  }
  return normalized;
}