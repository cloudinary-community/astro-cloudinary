import { AstroError } from "astro/errors";
import type { Loader } from "astro/loaders";
import type { CloudinaryResource } from '@cloudinary-util/types'

import { cloudinaryResourceSchema } from '../types/resources';
import { getEnvironmentConfig, listResources, type ListResourcesOptions, type ListResourcesResponse } from '../lib/resources';

const CLOUDINARY_DEFAULT_LIMIT = 10;

const REQUIRED_CREDENTIALS = [
  'PUBLIC_CLOUDINARY_CLOUD_NAME',
  'PUBLIC_CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

export interface CloudinaryAssetsLoaderOptions {
  deliveryType?: ListResourcesOptions["deliveryType"];
  fields?: ListResourcesOptions["fields"];
  folder?: ListResourcesOptions["folder"];
  limit?: ListResourcesOptions["limit"];
  resourceType?: ListResourcesOptions["resourceType"];

  // Resource data options: These are used to include
  // additional data that isn't added by default
  context?: ListResourcesOptions["context"];
  metadata?: ListResourcesOptions["metadata"];
  moderation?: ListResourcesOptions["moderation"];
  tags?: ListResourcesOptions["tags"];
}

export function cldAssetsLoader(options?: CloudinaryAssetsLoaderOptions): Loader {
  return {
    name: "cloudinary-assets-loader",
    load: async ({ store, logger, generateDigest }) => {
      REQUIRED_CREDENTIALS.forEach(CREDENTIAL => {
        if ( typeof import.meta.env[CREDENTIAL] === 'undefined' ) {
          throw new AstroError(`Missing ${CREDENTIAL}. Please set it as an environment variable inside of your .env.`);
        }
      });

      const { settings: { folder_mode: folderMode } } = await getEnvironmentConfig();

      logger.info(`Loading Cloudinary Assets`);

      // 10 is the Cloudinary default max_results

      const {
        context,
        deliveryType = 'upload',
        fields,
        folder,
        limit = CLOUDINARY_DEFAULT_LIMIT,
        metadata,
        moderation,
        resourceType = 'image',
        tags,
      } = options || {};
      let resources: Array<CloudinaryResource> = [];
      let totalAssetsLoaded = 0;
      let nextCursor: string | undefined = undefined;

      const requestOptions = {
        context,
        deliveryType,
        fields,
        folder,
        folderMode,
        limit,
        metadata,
        moderation,
        resourceType,
        tags,
      }

      // @TODO add `query` option and just check for its existance instead of type
      // if ( type === 'list' ) {
      while (totalAssetsLoaded < limit) {
        let data: ListResourcesResponse | undefined = undefined;

        try {
          data = await listResources({
            ...requestOptions,
            nextCursor
          });
          if ( !data ) {
            throw new Error('Unkown error.');
          }
        } catch(error) {
          logger.error(`${error}`);
          // @TODO Should we throw error for generic issues or bail and let the app continue?
          return;
        }

        // We don't want to exceed the the number of resources specific in the limit
        // so make sure that we're only grabbing enough to fill the limit if we're
        // to the point where it would be less than the response

        const newResources = data.resources.slice(0, limit - totalAssetsLoaded);

        resources = [...resources, ...newResources];
        totalAssetsLoaded += newResources.length;
        nextCursor = data.next_cursor

        if (!nextCursor) {
          break;
        }
      }

      for ( const resource of resources ) {
        store.set({
          id: resource.public_id,
          data: resource,
          digest: generateDigest(resource),
          // @TODO could this be used to render an <img or <video? Can this render CldImage?
          // rendered: {
          //   html: ...
          // },
        });
      }
    },
    schema: cloudinaryResourceSchema
  };
}