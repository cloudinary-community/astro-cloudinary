import type { CloudinaryResource, CloudinaryResourceResourceType } from '@cloudinary-util/types';

/**
 * cldRequest
 * @description Wrapper for fetch requests with Cloudinary API and credentials 
 */

export async function cldRequest(path: string) {
  return fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME}${path}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${import.meta.env.PUBLIC_CLOUDINARY_API_KEY}:${import.meta.env.CLOUDINARY_API_SECRET}`)
    }
  });
}

/**
 * getEnvironmentConfig
 * @description Get's a Cloudinary product environment's configuration
 */

export async function getEnvironmentConfig() {
  const params = new URLSearchParams();

  params.append('settings', 'true');

  const response = await cldRequest(`/config?${params}`);

  if ( !response.ok ) {
    throw new Error('Failed to get product environment.');
  }

  const data = await response.json();

  return data;
}

/**
 * listResources
 * @description 
 */

export interface ListResourcesOptions {
  assetType: Omit<CloudinaryResourceResourceType, "auto">;
  deliveryType: 'upload' | 'fetch' | 'private' | 'authenticated' | 'sprite' | 'facebook' | 'twitter' | 'youtube' | 'vimeo';
  folder?: CloudinaryResource["folder"];
  folderMode?: string;
  limit?: number;
  nextCursor?: string;
  fields?: Array<string>;

  // Additional data
  context?: boolean;
  metadata?: boolean;
  moderation?: boolean;
  tags?: boolean;
}

export interface ListResourcesResponse {
  resources: Array<CloudinaryResource>;
  next_cursor: string;
}

export async function listResources(options: ListResourcesOptions): Promise<ListResourcesResponse> {
  const params = new URLSearchParams();

  if ( options.nextCursor ) {
    params.append('next_cursor', options.nextCursor);
  }

  if ( options.limit ) {
    params.append('max_results', `${options.limit}`);
  }

  params.append('type', options.deliveryType);

  // There are a few options that are simple booleans that help
  // include specific datapoints that aren't included by default

  const contentOptions = ['context', 'metadata', 'moderation', 'tags'];

  for ( let contentOption of contentOptions ) {
    const value = options[contentOption as keyof ListResourcesOptions];
    if ( typeof value === 'boolean' ) {
      params.append(contentOption, `${value}`);
    }
  }

  if ( Array.isArray(options.fields) ) {
    const fields = options.fields.join(',');
    params.append('fields', fields);
  }

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