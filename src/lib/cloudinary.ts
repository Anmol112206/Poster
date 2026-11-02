import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo-cloud",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export { cloudinary };

/**
 * Generates signature and timestamp for secure client-side direct upload to Cloudinary.
 */
export function getCloudinaryUploadSignature(folder: string = "camino/custom") {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    apiSecret
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "demo-cloud",
    folder,
  };
}

/**
 * Server-side upload of image (base64 string or remote URL) to Cloudinary.
 */
export async function uploadToCloudinary(
  fileUri: string,
  folder: string = "camino/posters"
): Promise<{ secureUrl: string; publicId: string } | null> {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      folder,
      resource_type: "image",
      timeout: 60000,
    });

    return {
      secureUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Cloudinary upload failed:", message);
    return null;
  }
}
