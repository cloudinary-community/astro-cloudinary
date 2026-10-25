import astroPkg from 'astro/package.json';

// Injected at build time to avoid bundling this package's package.json
declare const __ASTRO_CLOUDINARY_VERSION__: string;

export const ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID = 'B';
export const ASTRO_CLOUDINARY_ANALYTICS_ID = 'G';
export const ASTRO_VERSION = normalizeVersion(astroPkg.version);
export const ASTRO_CLOUDINARY_VERSION = normalizeVersion(__ASTRO_CLOUDINARY_VERSION__);

function normalizeVersion(version: string) {
  let normalized = version;
  if ( normalized.includes('-') ) {
    normalized = normalized.split('-')[0];
  }
  return normalized;
}