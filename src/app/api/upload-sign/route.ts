import { NextResponse } from "next/server";
import { getCloudinaryUploadSignature } from "@/lib/cloudinary";

export async function GET() {
  try {
    const signData = getCloudinaryUploadSignature("camino/custom");
    return NextResponse.json(signData);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate upload signature";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const folder = body.folder || "camino/custom";
    const signData = getCloudinaryUploadSignature(folder);
    return NextResponse.json(signData);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate upload signature";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
