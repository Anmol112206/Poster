import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { POSTER_PRICES } from "@/lib/pricing";
import { Size, Finish, Paper } from "@prisma/client";

// Ensure Cloudinary is initialized
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryResourceItem {
  asset_folder?: string;
  folder?: string;
  public_id: string;
  secure_url: string;
  filename?: string;
  created_at: string;
}

export interface SyncResult {
  success: boolean;
  totalSynced: number;
  categoriesSynced: string[];
  message: string;
}

function cleanTitle(raw: string): string {
  // Remove file extension if present
  const noExt = raw.replace(/\.[^/.]+$/, "");
  // Replace underscores and hyphens with spaces
  const cleaned = noExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // Capitalize words
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Synchronizes all photo assets from Cloudinary (folder Camino/*) into Supabase PostgreSQL.
 * Discovers folders dynamically so newly added categories and photos are automatically imported.
 */
export async function syncCloudinaryToDb(): Promise<SyncResult> {
  console.log("🚀 Starting Dynamic Cloudinary -> Supabase Database Sync...");

  // 1. Fetch all assets from Cloudinary under folder "Camino/*"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchRes: any = await cloudinary.search
    .expression("folder:Camino/*")
    .max_results(500)
    .sort_by("created_at", "desc")
    .execute();

  const rawResources = (searchRes.resources || []) as CloudinaryResourceItem[];

  // Exclude user-custom uploads stored in Camino/custom
  const resources = rawResources.filter((r) => {
    const f = (r.asset_folder || r.folder || "").toLowerCase();
    return f !== "camino/custom" && !f.endsWith("/custom");
  });

  console.log(`[Cloudinary Sync] Discovered ${resources.length} poster photos in Cloudinary.`);

  // 2. Discover categories dynamically from folder paths
  const foldersMap = new Map<string, CloudinaryResourceItem[]>();
  for (const r of resources) {
    const folder = r.asset_folder || r.folder || "Camino/General";
    if (!foldersMap.has(folder)) {
      foldersMap.set(folder, []);
    }
    foldersMap.get(folder)!.push(r);
  }

  const categoriesSynced: string[] = [];
  const categoryDbMap = new Map<string, string>(); // categorySlug -> DB category id
  let totalSynced = 0;

  // 3. For each folder, ensure category exists in Supabase
  for (const [folderPath, assets] of foldersMap.entries()) {
    // Extract category name: "Camino/anime" -> "Anime", "Camino/Sports" -> "Sports"
    const subName = folderPath.includes("/") ? folderPath.split("/").pop()! : folderPath;
    const catName = cleanTitle(subName);
    const catSlug = slugify(subName);

    const category = await prisma.category.upsert({
      where: { slug: catSlug },
      update: { name: catName },
      create: {
        name: catName,
        slug: catSlug,
        description: `${catName} wall posters printed on archival 300 GSM stock.`,
      },
    });

    categoryDbMap.set(catSlug, category.id);
    categoriesSynced.push(catName);

    // Sort assets consistently by public_id
    assets.sort((a, b) => a.public_id.localeCompare(b.public_id));

    // 4. Upsert each poster in the database
    let itemIndex = 1;
    for (const asset of assets) {
      const numStr = itemIndex.toString().padStart(2, "0");
      const prefix = catSlug.slice(0, 3).toUpperCase();
      const catalogCode = `CAM-${prefix}-${numStr}`;

      // If public_id looks like a meaningful title (not a 32-char hex hash), use it
      const isHexHash = /^[a-f0-9]{32}$/i.test(asset.public_id);
      const isPlainNumber = /^\d+$/.test(asset.public_id);

      let title: string;
      let slug: string;

      if (!isHexHash && !isPlainNumber && asset.public_id.length > 2) {
        // e.g. "Wanda_Maximoff__Scarlet_Witch_wallpaper"
        title = cleanTitle(asset.public_id);
        slug = `${catSlug}-${slugify(title)}`;
      } else {
        // e.g. "Anime Edition #01"
        title = `${catName} Edition #${numStr}`;
        slug = `${catSlug}-edition-${numStr}`;
      }

      const tags = [catSlug, `edition-${numStr}`, catalogCode.toLowerCase(), `#${numStr}`];

      // Upsert product
      const product = await prisma.product.upsert({
        where: { slug },
        update: {
          title,
          description: "",
          images: [asset.secure_url],
          tags,
          categoryId: category.id,
          isFeatured: itemIndex <= 3,
          isActive: true,
        },
        create: {
          title,
          slug,
          description: "",
          categoryId: category.id,
          images: [asset.secure_url],
          tags,
          isFeatured: itemIndex <= 3,
          isActive: true,
        },
      });

      // Upsert standard variants with current prices:
      // A4 = ₹39 (3900 paise)
      // A3 = ₹79 (7900 paise)
      const variants = [
        { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: POSTER_PRICES.standard.A4 },
        { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: POSTER_PRICES.standard.A3 },
      ];

      for (const v of variants) {
        const sku = `${catalogCode}-${v.size}-${v.finish}-GSM300`.toUpperCase();
        await prisma.productVariant.upsert({
          where: { sku },
          update: {
            productId: product.id,
            size: v.size,
            finish: v.finish,
            paper: v.paper,
            pricePaise: v.pricePaise,
            stock: 50,
          },
          create: {
            productId: product.id,
            size: v.size,
            finish: v.finish,
            paper: v.paper,
            pricePaise: v.pricePaise,
            stock: 50,
            sku,
          },
        });
      }

      totalSynced++;
      itemIndex++;
    }
  }

  // 5. Ensure Custom Base Poster product is configured with variants
  const defaultCatId = Array.from(categoryDbMap.values())[0];
  if (defaultCatId) {
    const customBase = await prisma.product.upsert({
      where: { slug: "custom" },
      update: {
        title: "Custom Wall Poster",
        description: "Upload any custom photo, artwork, or memory.",
        isActive: true,
        isCustomBase: true,
        categoryId: defaultCatId,
      },
      create: {
        title: "Custom Wall Poster",
        slug: "custom",
        description: "Upload any custom photo, artwork, or memory.",
        images: ["https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg"],
        tags: ["custom", "personalized", "print"],
        categoryId: defaultCatId,
        isActive: true,
        isCustomBase: true,
      },
    });

    // Custom variants: A4 = ₹49 (4900 paise), A3 = ₹89 (8900 paise)
    const customVariants = [
      { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: POSTER_PRICES.custom.A4 },
      { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: POSTER_PRICES.custom.A3 },
    ];

    for (const v of customVariants) {
      const sku = `CUSTOM-${v.size}-${v.finish}-GSM300`.toUpperCase();
      const existing = await prisma.productVariant.findFirst({
        where: {
          productId: customBase.id,
          size: v.size,
          finish: v.finish,
          paper: v.paper,
        },
      });

      if (existing) {
        await prisma.productVariant.update({
          where: { id: existing.id },
          data: { pricePaise: v.pricePaise, stock: 9999, sku },
        });
      } else {
        await prisma.productVariant.create({
          data: {
            productId: customBase.id,
            size: v.size,
            finish: v.finish,
            paper: v.paper,
            pricePaise: v.pricePaise,
            stock: 9999,
            sku,
          },
        });
      }
    }
  }

  console.log(`✓ Successfully synced ${totalSynced} posters across ${categoriesSynced.length} categories.`);
  return {
    success: true,
    totalSynced,
    categoriesSynced,
    message: `Successfully synchronized ${totalSynced} posters across ${categoriesSynced.length} categories from Cloudinary to Supabase.`,
  };
}

