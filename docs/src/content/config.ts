import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

import { cldAssetsLoader } from '../../../astro-cloudinary/loaders';

export const collections = {
	assetsSamples: defineCollection({
		loader: cldAssetsLoader({
			limit: 4,
			folder: 'samples/food'
		})
	}),
	docs: defineCollection({ schema: docsSchema() }),
};
