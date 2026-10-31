"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ApiResponse, successResponse, errorResponse, handleError } from "@/lib/result";

const emailSchema = z.string().trim().toLowerCase().email("Please enter a valid email address");

export async function subscribeNewsletter(email: string): Promise<ApiResponse<{ message: string }>> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return errorResponse("VALIDATION", parsed.error.issues[0]?.message || "Invalid email address");
  }

  try {
    await prisma.subscriber.upsert({
      where: { email: parsed.data },
      update: {},
      create: { email: parsed.data },
    });

    return successResponse({
      message: "Thank you for subscribing! You will receive our monthly poster print drops.",
    });
  } catch (error) {
    return handleError(error, "Failed to subscribe. Please try again.");
  }
}
