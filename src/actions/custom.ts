"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { ApiResponse, successResponse, errorResponse } from "@/lib/result";

export async function uploadCustomPosterAction(
  imageDataUri: string
): Promise<ApiResponse<{ url: string; publicId: string }>> {
  if (!imageDataUri || typeof imageDataUri !== "string" || !imageDataUri.startsWith("data:image/")) {
    return errorResponse("VALIDATION", "Please provide a valid image.");
  }

  try {
    const uploadResult = await uploadToCloudinary(imageDataUri, "camino/custom");
    if (!uploadResult || !uploadResult.secureUrl) {
      return errorResponse("INTERNAL", "Failed to upload artwork to Cloudinary. Please try a different photo format or size.");
    }

    return successResponse({
      url: uploadResult.secureUrl,
      publicId: uploadResult.publicId,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to upload custom poster artwork.";
    console.error("[uploadCustomPosterAction] Error:", message);
    return errorResponse("INTERNAL", message);
  }
}
