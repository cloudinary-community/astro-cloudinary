import type { CloudinaryResource, CloudinaryResourceResourceType } from '@cloudinary-util/types';
import { ASTRO_CLOUDINARY_VERSION } from '../constants/analytics';

/**
 * cldRequest
 * @description Wrapper for fetch requests with Cloudinary API and credentials 
 */

export async function cldRequest(path: string) {
  return fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME}${path}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${import.meta.env.PUBLIC_CLOUDINARY_API_KEY}:${import.meta.env.CLOUDINARY_API_SECRET}`),
      'User-Agent'   : `CloudinaryAstro/${ASTRO_CLOUDINARY_VERSION}`
    }
  });
}

/**
 * getSubfolders
 * @description Get all subfolders of a specified folder (for dynamic folder mode)
 */

export async function getSubfolders(folder: string): Promise<string[]> {
  const params = new URLSearchParams();
  params.append('max_results', '500'); // Get up to 500 subfolders
  
  const response = await cldRequest(`/folders/${encodeURIComponent(folder)}?${params}`);
  
  if (!response.ok) {
    // If folder doesn't exist or no subfolders, return empty array
    return [];
  }
  
  const data = await response.json();
  return data.folders?.map((f: any) => f.path) || [];
}

/**
 * getAllSubfoldersRecursive
 * @description Recursively get all subfolders of a folder
 */

export async function getAllSubfoldersRecursive(folder: string, maxDepth: number = 3): Promise<string[]> {
  const allFolders: string[] = [folder];
  const toProcess = [folder];
  let depth = 0;
  
  while (toProcess.length > 0 && depth < maxDepth) {
    const currentFolder = toProcess.shift()!;
    const subfolders = await getSubfolders(currentFolder);
    
    for (const subfolder of subfolders) {
      if (!allFolders.includes(subfolder)) {
        allFolders.push(subfolder);
        toProcess.push(subfolder);
      }
    }
    depth++;
  }
  
  return allFolders;
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
  deliveryType: 'upload' | 'fetch' | 'private' | 'authenticated' | 'sprite' | 'facebook' | 'twitter' | 'youtube' | 'vimeo';
  fields?: Array<string>;
  folder?: CloudinaryResource["folder"];
  folderMode?: string;
  limit?: number;
  nextCursor?: string;
  resourceType: Omit<CloudinaryResourceResourceType, "auto">;
  recursive?: boolean;

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
      params.append('asset_folder', options.folder);
      
      // Add recursive support for dynamic folders
      if ( options.recursive ) {
        // For dynamic folders, we need to make multiple requests for subfolders
        const allResources: CloudinaryResource[] = [];
        
        try {
          // Get all subfolders recursively
          const allFolders = await getAllSubfoldersRecursive(options.folder);
          
          // Query each folder for assets
          for (const folderPath of allFolders) {
            const folderParams = new URLSearchParams(params);
            folderParams.set('asset_folder', folderPath);
            
            const folderResponse = await cldRequest(`/resources/by_asset_folder?${folderParams}`);
            if (folderResponse.ok) {
              const folderData = await folderResponse.json();
              allResources.push(...folderData.resources);
            }
          }
          
          return {
            resources: allResources,
            next_cursor: '' // Recursive queries don't support pagination
          };
        } catch (error) {
          // Fall back to non-recursive if subfolder discovery fails
          console.warn('Recursive folder query failed, falling back to single folder:', error);
        }
      }

      response = await cldRequest(`/resources/by_asset_folder?${params}`);

    } else if ( options.folderMode === 'fixed' ) {
      // For fixed folder mode, recursive behavior is naturally supported via prefix
      if ( options.recursive ) {
        // In fixed mode, prefix naturally includes subfolders
        // No additional parameters needed as prefix matching is inherently recursive
      }
      
      params.append('prefix', options.folder);
      response = await cldRequest(`/resources/${options.resourceType}?${params}`);

    } else {
      throw new Error(`Unhandled folder mode: ${options.folderMode}`);
    }
  } else {
    response = await cldRequest(`/resources/${options.resourceType}?${params}`);
  }

  if ( !response.ok ) {
    throw new Error(`Failed to list resources - ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}