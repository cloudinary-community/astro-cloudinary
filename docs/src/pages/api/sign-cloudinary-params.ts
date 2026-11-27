import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

// Only sign what the docs demos' uploads need. Anything else (public_id,
// overwrite, type, notification_url, etc.) would let callers sign
// non-upload requests such as deletes, so reject it.
const ALLOWED_PARAMS = ["timestamp", "source", "upload_preset"];
const UPLOAD_PRESET = "astro-cloudinary-signed";

// Cloudinary rejects timestamps more than an hour old but accepts any future
// one, so a far-future timestamp would make a signature usable for much longer
// than intended. Only sign timestamps close to the server's clock.
const TIMESTAMP_WINDOW_SECONDS = 5 * 60;

export const prerender = false;

const badRequest = (error: string) => Response.json({ error }, { status: 400 });

export const POST: APIRoute = async ({ request }) => {
  let body;

  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid parameters");
  }

  const { paramsToSign } = body || {};

  if (
    !paramsToSign ||
    typeof paramsToSign !== "object" ||
    Object.keys(paramsToSign).some((key) => !ALLOWED_PARAMS.includes(key)) ||
    paramsToSign.upload_preset !== UPLOAD_PRESET
  ) {
    return badRequest("Invalid parameters");
  }

  // Older Cloudinary signature versions join name=value pairs with & without
  // escaping them, so a value containing & or = could add a parameter that
  // was never checked above.
  const hasUnsafeValue = Object.values(paramsToSign).some((value) => {
    if (typeof value === "number") return false;
    if (typeof value !== "string") return true;
    return /[&=]/.test(value);
  });

  if (hasUnsafeValue) {
    return badRequest("Invalid parameter value");
  }

  const { timestamp } = paramsToSign;
  const now = Math.floor(Date.now() / 1000);

  if (
    typeof timestamp !== "number" ||
    !Number.isFinite(timestamp) ||
    Math.abs(now - timestamp) > TIMESTAMP_WINDOW_SECONDS
  ) {
    return badRequest("Invalid timestamp");
  }

  const signature = cloudinary.utils.api_sign_request(paramsToSign, import.meta.env.CLOUDINARY_API_SECRET);

  return Response.json({ signature });
}
