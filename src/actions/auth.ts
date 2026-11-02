"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validators/auth";
import { ApiResponse, successResponse, errorResponse, handleError } from "@/lib/result";
import { auth, signOut } from "@/lib/auth";

/**
 * Registers a new customer account.
 */
export async function signUp(formData: unknown): Promise<ApiResponse<{ id: string; email: string }>> {
  const parsed = signupSchema.safeParse(formData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      fieldErrors[field] = [...(fieldErrors[field] || []), issue.message];
    }
    return errorResponse("VALIDATION", "Please correct the highlighted form errors.", fieldErrors);
  }

  const { name, email, phone, password } = parsed.data;

  try {
    // 1. Check duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(
        "VALIDATION",
        "An account with this email already exists. Sign in instead?"
      );
    }

    // 2. Hash password with bcryptjs cost 12
    const passwordHash = await bcrypt.hash(password, 12);

    // 3. Create user and cart in transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          name,
          email,
          phone,
          passwordHash,
          role: "CUSTOMER",
        },
      });

      await tx.cart.create({
        data: {
          userId: createdUser.id,
        },
      });

      return createdUser;
    });

    return successResponse({ id: newUser.id, email: newUser.email });
  } catch (error) {
    return handleError(error, "Failed to create account. Please try again.");
  }
}

/**
 * Returns current authenticated session.
 */
export async function getCurrentSession() {
  return await auth();
}

/**
 * Server action to sign out.
 */
export async function logOut() {
  await signOut({ redirectTo: "/login" });
}
