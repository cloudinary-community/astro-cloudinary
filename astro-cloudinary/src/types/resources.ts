import { z } from "astro/zod";
import type { CloudinaryResource, CloudinaryResourceResourceType, CloudinaryResourceType } from '@cloudinary-util/types'

// CloudinaryResource types are primarily maintained in @cloudinary-util/types
// The refernces here are used to validate that the Zod schemas match the definitions

export const cloudinaryResourceTypeSchema: z.ZodType<CloudinaryResourceType> = z.enum(["upload", "private", "authenticated"]);
export const cloudinaryResourceResourceTypeSchema:  z.ZodType<CloudinaryResourceResourceType> = z.enum(["image", "video", "raw", "auto"]);

export const cloudinaryResourceSchema: z.ZodType<CloudinaryResource> = z.object({
  access_control: z.array(z.string()),
  access_mode: z.union([
    z.literal("public"),
    z.literal("authenticated"),
    z.string().and(z.object({}))
  ]),
  asset_id: z.string(),
  bytes: z.number(),
  context: z.record(z.record(z.string())),
  colors: z.array(z.tuple([z.string(), z.number()])).optional(),
  created_at: z.string(),
  display_name: z.string(),
  folder: z.string(),
  format: z.string(),
  height: z.number(),
  info: z.record(z.unknown()),
  metadata: z.record(z.record(z.string())),
  moderation: z.array(z.string()),
  public_id: z.string(),
  resource_type: cloudinaryResourceResourceTypeSchema,
  secure_url: z.string(),
  signature: z.string(),
  tags: z.array(z.string()),
  type: cloudinaryResourceTypeSchema,
  url: z.string(),
  version: z.number(),
  width: z.number()
});