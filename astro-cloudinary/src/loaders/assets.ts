import { AstroError } from "astro/errors";
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";

const REQUIRED_CREDENTIALS = [
  'PUBLIC_CLOUDINARY_CLOUD_NAME',
  'PUBLIC_CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const cloudinaryResourceSchema = z.object({
  asset_id: z.string(),
  public_id: z.string(),
  format: z.string(),
  version: z.number(),
  resource_type: z.string(),
  type: z.string(),
  created_at: z.string(),
  bytes: z.number(),
  width: z.number(),
  height: z.number(),
  folder: z.string(),
  url: z.string(),
  secure_url: z.string(),
});

export interface CloudinaryLoaderOptions {
  assetType?: RequestOptions["assetType"];
  deliveryType?: RequestOptions["deliveryType"];
  folder?: RequestOptions["folder"];
  limit?: RequestOptions["limit"];
  type?: 'list';
}

interface RequestOptions {
  assetType: 'image' | 'video' | 'raw';
  deliveryType: 'upload' | 'fetch' | 'private' | 'authenticated' | 'sprite' | 'facebook' | 'twitter' | 'youtube' | 'vimeo';
  folder?: string;
  folderMode?: string;
  limit?: number;
}

export function cldAssetsLoader(options?: CloudinaryLoaderOptions): Loader {
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

      const { type = 'list', limit = 10, deliveryType = 'upload', assetType = 'image', folder } = options || {};
      let resources;

      const requestOptions = {
        deliveryType,
        folder,
        folderMode,
        limit,
        assetType
      }

      if ( type === 'list' ) {
        try {
          const data = await listResources(requestOptions);
          resources = data.resources;
        } catch(error) {
          logger.error(`${error}`);
          // @TODO Should we throw error for generic issues or bail and let the app continue?
          return;
        }
      }

      for ( const resource of resources ) {
        store.set({
          id: resource.asset_id,
          data: resource,
          digest: generateDigest(resources),
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

async function cldRequest(path: string) {
  return fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME}${path}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${import.meta.env.PUBLIC_CLOUDINARY_API_KEY}:${import.meta.env.CLOUDINARY_API_SECRET}`)
    }
  });
}

async function getEnvironmentConfig() {
  const params = new URLSearchParams();

  params.append('settings', 'true');

  const response = await cldRequest(`/config?${params}`);

  if ( !response.ok ) {
    throw new Error('Failed to get product environment.');
  }

  const data = await response.json();

  return data;
}

async function listResources(options: RequestOptions) {
  const params = new URLSearchParams();

  if ( options.limit ) {
    params.append('max_results', `${options.limit}`);
  }

  params.append('type', options.deliveryType);

  let response;

  if ( options.folder ) {
    if ( options.folderMode === 'dynamic' ) {
      
      // @TODO Test with dynamic folder mode
      params.append('asset_folder', options.folder);

      response = await cldRequest(`/by_asset_folder?${params}`);

    } else if ( options.folderMode === 'fixed' ) {
      
      params.append('prefix', options.folder);

      response = await cldRequest(`/resources/${options.assetType}?${params}`);

    } else {
      throw new Error(`Unhandled folder mode: ${options.folderMode}`);
    }
  } else {
    response = await cldRequest(`/resources/${options.assetType}?${params}`);
  }

  if ( !response.ok ) {
    throw new Error('Failed to list resources.');
  }

  const data = await response.json();

  return data;
}