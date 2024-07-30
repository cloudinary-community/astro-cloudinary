import type { AnalyticsOptions, ConfigOptions } from "@cloudinary-util/url-loader";

import { ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID, ASTRO_CLOUDINARY_ANALYTICS_ID, ASTRO_CLOUDINARY_VERSION, ASTRO_VERSION } from '../constants/analytics.js';

// /**
//  * pollForProcessingImage
//  */

// export interface PollForProcessingImageOptions {
//   src: string;
// }

// export async function pollForProcessingImage(options: PollForProcessingImageOptions): Promise<boolean> {
//   const { src } = options;
//   try {
//     await new Promise((resolve, reject) => {
//       fetch(src).then(res => {
//         if ( !res.ok ) {
//           reject(res);
//           return;
//         }
//         resolve(res);
//       });
//     });
//   } catch(e: any) {
//     // Timeout for 200ms before trying to fetch again to avoid overwhelming requests

//     if ( e.status === 423 ) {
//       await new Promise((resolve) => setTimeout(() => resolve(undefined), 200));
//       return await pollForProcessingImage(options);
//     }
//     return false;
//   }
//   return true;
// }

/**
 * getCloudinaryConfig
 */

export function getCloudinaryConfig(config?: ConfigOptions) {
  const cloudName = config?.cloud?.cloudName ?? import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error('A Cloudinary Cloud name is required, please make sure PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment.');
  }

  const apiKey = config?.cloud?.apiKey ?? import.meta.env.PUBLIC_CLOUDINARY_API_KEY;
  const secureDistribution = config?.url?.secureDistribution ?? import.meta.env.PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION;
  const privateCdn = config?.url?.privateCdn ?? import.meta.env.PUBLIC_CLOUDINARY_PRIVATE_CDN;

  return Object.assign({
    cloud: {
      ...config?.cloud,
      apiKey,
      cloudName
    },
    url: {
      ...config?.url,
      secureDistribution,
      privateCdn
    }
  }, config);
}

/**
 * getCloudinaryAnalytics
 */

export function getCloudinaryAnalytics(analytics?: AnalyticsOptions) {
  return Object.assign({
    product: ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID,
    sdkCode: ASTRO_CLOUDINARY_ANALYTICS_ID,
    sdkSemver: ASTRO_CLOUDINARY_VERSION,
    techVersion: ASTRO_VERSION,
    feature: ''
  }, analytics)
}