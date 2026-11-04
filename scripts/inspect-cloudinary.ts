import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("=== DB PRODUCTS COUNT ===");
  try {
    const dbCount = await prisma.product.count();
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    console.log(`Total DB products: ${dbCount}`);
    for (const c of categories) {
      console.log(`- Category ${c.name} (${c.slug}): ${c._count.products} products`);
    }
  } catch (e: unknown) {
    console.error("DB query failed:", e);
  }

  console.log("\n=== CLOUDINARY ASSETS IN Camino/* ===");
  try {
    const res = await cloudinary.search
      .expression("folder:Camino/*")
      .max_results(500)
      .execute();
    
    console.log(`Total Camino/* assets found: ${res.total_count}`);
    const folderCounts: Record<string, number> = {};
    for (const r of res.resources) {
      const f = r.asset_folder || r.folder || "unknown";
      folderCounts[f] = (folderCounts[f] || 0) + 1;
    }
    console.log("Counts per folder in Cloudinary:", folderCounts);
  } catch (e: unknown) {
    console.error("Cloudinary search failed:", e);
  }

  console.log("\n=== CLOUDINARY ASSETS OUTSIDE Camino/* ===");
  try {
    const resAll = await cloudinary.search
      .expression("-folder:Camino/*")
      .max_results(100)
      .execute();
    console.log(`Assets outside Camino/* count: ${resAll.total_count}`);
    for (const r of resAll.resources) {
      console.log(`- folder="${r.asset_folder || r.folder}" public_id="${r.public_id}"`);
    }
  } catch (e: unknown) {
    console.error("Cloudinary search outside Camino failed:", e);
  }
}

main().finally(() => prisma.$disconnect());
