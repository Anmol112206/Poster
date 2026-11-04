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
  const dbProducts = await prisma.product.findMany({
    select: { id: true, slug: true, images: true, category: { select: { slug: true } } },
  });

  const dbImages = new Set<string>();
  for (const p of dbProducts) {
    for (const img of p.images) {
      dbImages.add(img);
    }
  }

  console.log(`Database has ${dbProducts.length} products and ${dbImages.size} image URLs.`);

  // Search all images in Cloudinary
  const cldRes = await cloudinary.search
    .expression("")
    .max_results(500)
    .execute();

  console.log(`Cloudinary has ${cldRes.resources.length} total resources.`);

  const missingInDb: Array<{ folder: string; public_id: string; secure_url: string; created_at: string }> = [];

  for (const r of cldRes.resources) {
    const url = r.secure_url;
    // Check if url or public_id is in dbImages
    const found = Array.from(dbImages).some(dbUrl => dbUrl.includes(r.public_id) || dbUrl === url);
    if (!found) {
      missingInDb.push({
        folder: r.asset_folder || r.folder,
        public_id: r.public_id,
        secure_url: url,
        created_at: r.created_at,
      });
    }
  }

  console.log(`\nAssets in Cloudinary NOT in Database: ${missingInDb.length}`);
  for (const m of missingInDb) {
    console.log(`- [${m.created_at}] folder="${m.folder}" id="${m.public_id}" url="${m.secure_url}"`);
  }
}

main().finally(() => prisma.$disconnect());

