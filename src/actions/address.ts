"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse, successResponse, errorResponse } from "@/lib/result";

export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  createdAt: Date;
}

export async function getUserAddressesAction(): Promise<ApiResponse<UserAddress[]>> {
  const session = await auth();
  if (!session?.user?.id) {
    return errorResponse("UNAUTHENTICATED", "Please sign in to retrieve your addresses.");
  }

  try {
    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    return successResponse(addresses);
  } catch (error: unknown) {
    console.error("[getUserAddressesAction] Error:", error);
    return errorResponse("INTERNAL", "Failed to load saved addresses.");
  }
}
