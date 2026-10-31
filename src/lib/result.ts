export type ErrorCode =
  | "VALIDATION"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "OUT_OF_STOCK"
  | "COUPON_INVALID"
  | "PAYMENT_FAILED"
  | "RATE_LIMITED"
  | "INTERNAL";

export interface ApiError {
  code: ErrorCode;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

export function successResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function errorResponse(
  code: ErrorCode,
  message: string,
  fieldErrors?: Record<string, string[]>
): ApiResponse<never> {
  return {
    success: false,
    error: {
      code,
      message,
      fieldErrors,
    },
  };
}

export function handleError(error: unknown, defaultMessage = "Something went wrong. Please try again."): ApiResponse<never> {
  console.error("[ServerError]:", error);
  if (error instanceof Error && error.message) {
    return errorResponse("INTERNAL", error.message);
  }
  return errorResponse("INTERNAL", defaultMessage);
}
