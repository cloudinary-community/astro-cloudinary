import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { paramsToSign } = body;
  const signature = cloudinary.utils.api_sign_request(paramsToSign, import.meta.env.CLOUDINARY_API_SECRET);
  return Response.json({ signature });
}