import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be at least 16 characters"),
  AUTH_URL: z.string().url("AUTH_URL must be a valid URL").default("http://localhost:3000"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  RESEND_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  // In development, provide warning rather than crashing build if testing without full cloud credentials
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment configuration. Check your environment variables.");
  }
}

export const env = _env.success
  ? _env.data
  : {
      DATABASE_URL: process.env.DATABASE_URL || "",
      AUTH_SECRET: process.env.AUTH_SECRET || "default_dev_secret_key_at_least_32_characters",
      AUTH_URL: process.env.AUTH_URL || "http://localhost:3000",
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "demo",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "demo",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "demo",
      RESEND_API_KEY: process.env.RESEND_API_KEY || "",
      NODE_ENV: (process.env.NODE_ENV as "development" | "test" | "production") || "development",
    };
