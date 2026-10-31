"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { ApiResponse, successResponse, errorResponse } from "@/lib/result";
import { auth } from "@/lib/auth";

export async function uploadCustomPosterAction(
  imageDataUri: string
): Promise<ApiResponse<{ url: string; publicId: string }>> {
  const session = await auth();
  if (!session?.user?.id) {
    return errorResponse("UNAUTHENTICATED", "Please sign in to order custom prints.");
  }

  if (!imageDataUri || typeof imageDataUri !== "string" || !imageDataUri.startsWith("data:image/")) {
    return errorResponse("VALIDATION", "Please provide a valid cropped image.");
  }

  try {
    const uploadResult = await uploadToCloudinary(imageDataUri, "camino/custom");
    if (!uploadResult || !uploadResult.secureUrl) {
      return errorResponse("INTERNAL", "Failed to upload artwork to Cloudinary CDN.");
    }

    return successResponse({
      url: uploadResult.secureUrl,
      publicId: uploadResult.publicId,
    });
  } catch (error: any) {
    console.error("[uploadCustomPosterAction] Error:", error);
    return errorResponse("INTERNAL", error?.message || "Failed to upload custom poster artwork.");
  }
}
