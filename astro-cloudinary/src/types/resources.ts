import { z } from "astro/zod";
import type { CloudinaryResource, CloudinaryResourceResourceType, CloudinaryResourceDeliveryType, CloudinaryResourceAccessMode } from '@cloudinary-util/types'

// CloudinaryResource types are primarily maintained in @cloudinary-util/types
// The refernces here are used to validate that the Zod schemas match the definitions

export const cloudinaryResourceAccessModeSchema: z.ZodType<CloudinaryResourceAccessMode> = z.union([
  z.enum(["public", "authenticated"]),
  z.intersection(z.string(), z.object({}))
]);

export const cloudinaryResourceDeliveryTypeSchema: z.ZodType<CloudinaryResourceDeliveryType> = z.union([
  z.enum(["animoto", "asset", "authenticated", "dailymotion", "facebook", "fetch", "gravatar", "hulu", "instagram", "list", "multi", "private", "text", "twitter", "twitter_name", "upload", "vimeo", "worldstarhiphop", "youtube"]),
  z.intersection(z.string(), z.object({}))
]);

export const cloudinaryResourceResourceTypeSchema: z.ZodType<CloudinaryResourceResourceType> = z.union([
  z.enum(["image", "video", "raw", "auto"]),
  z.intersection(z.string(), z.object({}))
]);

export const cloudinaryResourceSchema: z.ZodType<CloudinaryResource>  = z.object({
  access_mode: cloudinaryResourceAccessModeSchema.optional(),
  access_control: z.array(z.string()).optional(),
  asset_id: z.string(),
  backup: z.boolean().optional(),
  bytes: z.number(),
  context: z.object({}).passthrough().optional(),
  colors: z.array(z.tuple([z.string(), z.number()])).optional(),
  coordinates: z.object({}).passthrough().optional(),
  created_at: z.string(),
  derived: z.array(z.string()).optional(),
  display_name: z.string().optional(),
  exif: z.object({}).passthrough().optional(),
  faces: z.array(z.array(z.number())).optional(),
  folder: z.string(),
  format: z.string(),
  height: z.number(),
  image_metadata: z.object({}).passthrough().optional(),
  info: z.object({}).passthrough().optional(),
  media_metadata: z.object({}).passthrough().optional(),
  metadata: z.object({}).passthrough().optional(),
  moderation: z.union([ z.object({}).passthrough(), z.array(z.string()) ]).optional(),
  pages: z.number().optional(),
  phash: z.string().optional(),
  placeholder: z.boolean().optional(),
  predominant: z.object({}).passthrough().optional(),
  public_id: z.string(),
  quality_analysis: z.number().optional(),
  resource_type: cloudinaryResourceResourceTypeSchema,
  secure_url: z.string(),
  signature: z.string().optional(),
  tags: z.array(z.string()).optional(),
  type: cloudinaryResourceDeliveryTypeSchema,
  url: z.string(),
  version: z.number(),
  width: z.number()
}).catchall(z.unknown());