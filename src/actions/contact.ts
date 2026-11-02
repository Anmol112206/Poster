"use server";

import { prisma } from "@/lib/prisma";
import { ApiResponse, successResponse, errorResponse } from "@/lib/result";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
});

export async function sendContactMessageAction(
  formData: { name: string; email: string; message: string }
): Promise<ApiResponse<{ id: string }>> {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input";
    return errorResponse("VALIDATION", errorMsg);
  }

  const { name, email, message } = parsed.data;

  try {
    const record = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return successResponse({ id: record.id });
  } catch (error: unknown) {
    console.error("[sendContactMessageAction] DB error:", error);
    return errorResponse("INTERNAL", "Failed to save message. Please try again or email us directly.");
  }
}
