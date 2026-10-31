"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema, requestOtpSchema, verifyOtpSchema } from "@/lib/validators/auth";
import { ApiResponse, successResponse, errorResponse, handleError } from "@/lib/result";
import { auth, signIn, signOut } from "@/lib/auth";

// Temporary in-memory OTP cache for phone verification (10 minute expiry)
const otpCache = new Map<string, { code: string; expiresAt: number }>();

/**
 * Sends a 6-digit verification OTP to the given 10-digit Indian phone number.
 */
export async function sendMobileOtp(phone: string): Promise<ApiResponse<{ message: string; devOtp?: string }>> {
  const parsed = requestOtpSchema.safeParse({ phone });
  if (!parsed.success) {
    return errorResponse("VALIDATION", "Invalid mobile number. Please enter a 10-digit Indian number.");
  }

  try {
    // Generate secure 6-digit code (e.g. 849201 or in demo predictable fallback)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpCache.set(parsed.data.phone, { code, expiresAt });

    console.log(`\n📱 [SMS OTP Verification] Mobile: +91-${parsed.data.phone} | OTP: ${code}\n`);

    return successResponse({
      message: `OTP sent to +91-${parsed.data.phone}. (For demo: use OTP ${code})`,
      devOtp: code,
    });
  } catch (error) {
    return handleError(error, "Failed to send mobile verification OTP.");
  }
}

/**
 * Verifies the 6-digit OTP entered for the phone.
 */
export async function verifyMobileOtp(phone: string, otp: string): Promise<ApiResponse<{ verified: boolean }>> {
  const parsed = verifyOtpSchema.safeParse({ phone, otp });
  if (!parsed.success) {
    return errorResponse("VALIDATION", "Please enter a valid 6-digit OTP.");
  }

  const cached = otpCache.get(parsed.data.phone);
  if (!cached) {
    return errorResponse("VALIDATION", "No OTP requested for this phone or OTP expired. Please request a new OTP.");
  }

  if (Date.now() > cached.expiresAt) {
    otpCache.delete(parsed.data.phone);
    return errorResponse("VALIDATION", "OTP has expired. Please request a new one.");
  }

  if (cached.code !== parsed.data.otp) {
    return errorResponse("VALIDATION", "Incorrect OTP. Please check the code and try again.");
  }

  return successResponse({ verified: true });
}

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

  const { name, email, phone, otp, password } = parsed.data;

  try {
    // 1. Verify OTP
    const cachedOtp = otpCache.get(phone);
    if (!cachedOtp || cachedOtp.code !== otp || Date.now() > cachedOtp.expiresAt) {
      return errorResponse("VALIDATION", "Invalid or expired mobile OTP. Please request a new code.");
    }

    // 2. Check duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(
        "VALIDATION",
        "An account with this email already exists. Sign in instead?"
      );
    }

    // 3. Hash password with bcryptjs cost 12
    const passwordHash = await bcrypt.hash(password, 12);

    // 4. Create user and cart in transaction
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

    // Cleanup OTP
    otpCache.delete(phone);

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
