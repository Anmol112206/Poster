import { NextResponse } from "next/server";
import { getCloudinaryUploadSignature } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const folder = body.folder || "camino/custom";
    const signData = getCloudinaryUploadSignature(folder);
    return NextResponse.json(signData);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}
