import { defineCollection, z } from 'astro:content';
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from '@astrojs/starlight/schema';

import { cldAssetsLoader } from '../../astro-cloudinary/loaders';

export const collections = {
	assetsSamplesBasic: defineCollection({
		loader: cldAssetsLoader({
			limit: 4,
			folder: 'samples/food',
		})
	}),
	assetsSamplesDefault: defineCollection({
		loader: cldAssetsLoader({
			// Setting an explicit folder to avoid unmaintained root images
			folder: 'ecommerce/fashion',
		})
	}),
	assetsSamplesLimit: defineCollection({
		loader: cldAssetsLoader({
			limit: 1200,
			folder: 'collection'
		})
	}),
	assetsSamplesEcommerce: defineCollection({
		loader: cldAssetsLoader({
			limit: 4,
			folder: 'ecommerce/sneakers',
			context: true,
			tags: true,
			moderation: true,
			metadata: true,
		})
	}),
	docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        ogImageTitle: z.string().optional(),
      }),
    }),
  }),
};
