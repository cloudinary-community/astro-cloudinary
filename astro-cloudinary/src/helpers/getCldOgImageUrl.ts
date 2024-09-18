import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../constants/sizes.js';

import { getCldImageUrl } from './getCldImageUrl.js';
import type { GetCldImageUrlOptions, GetCldImageUrlConfig, GetCldImageUrlAnalytics } from './getCldImageUrl.js';

/**
 * getCldImageUrl
 */

export type GetCldOgImageUrlOptions = GetCldImageUrlOptions;
export type GetCldOgImageUrlConfig = GetCldImageUrlConfig;
export type GetCldOgImageUrlAnalytics = GetCldImageUrlAnalytics;

export function getCldOgImageUrl(options: GetCldOgImageUrlOptions, config?: GetCldOgImageUrlConfig, analytics?: GetCldOgImageUrlAnalytics) {
  return getCldImageUrl({
    ...options,
    format: options.format || 'jpg',
    width: options.width || OG_IMAGE_WIDTH,
    height: options.height || OG_IMAGE_HEIGHT,
    crop: options.crop || {
      type: 'fill',
      gravity: 'center',
      source: true
    }
  }, config, analytics);
}