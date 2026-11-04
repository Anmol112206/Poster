import { NextResponse } from "next/server";
import { syncCloudinaryToDb } from "@/lib/sync-cloudinary";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const result = await syncCloudinaryToDb();
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/admin/products");
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await syncCloudinaryToDb();
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/admin/products");
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

