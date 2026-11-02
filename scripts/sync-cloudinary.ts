import { v2 as cloudinary } from "cloudinary";
import { PrismaClient, Size, Finish, Paper } from "@prisma/client";
import fs from "fs";
import path from "path";

// Initialize Cloudinary
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

async function withRetry<T>(fn: () => Promise<T>, retries = 5, delayMs = 1500): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      if (attempt < retries) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`[Retry ${attempt}/${retries}] Temporary DB issue, retrying in ${delayMs}ms... (${msg})`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}

interface CloudinaryAsset {
  folder: string;
  id: string;
  url: string;
}

const CATEGORY_MAP: Record<string, { name: string; slug: string; prefix: string }> = {
  "Camino/Sports": {
    name: "Sports",
    slug: "sports",
    prefix: "CAM-SP",
  },
  "Camino/God": {
    name: "God",
    slug: "god",
    prefix: "CAM-GD",
  },
  "Camino/anime": {
    name: "Anime",
    slug: "anime",
    prefix: "CAM-AN",
  },
  "Camino/Marvel": {
    name: "Marvel",
    slug: "marvel",
    prefix: "CAM-MV",
  },
  "Camino/Motivation": {
    name: "Motivation",
    slug: "motivation",
    prefix: "CAM-MT",
  },
};

function getEditionMeta(folder: string, index: number) {
  const cat = CATEGORY_MAP[folder];
  const numStr = index.toString().padStart(2, "0");
  const catalogCode = `${cat.prefix}-${numStr}`;
  const title = `${cat.name} Edition #${numStr}`;
  const slug = `${cat.slug}-edition-${numStr}`;
  const tags = [cat.slug, `edition-${numStr}`, catalogCode.toLowerCase(), `#${numStr}`];
  return { title, slug, catalogCode, tags };
}

async function main() {
  console.log("🚀 Starting Truthful Cloudinary -> Supabase & Static Catalog Sync...");

  // 1. Fetch all assets from Cloudinary Camino/*
  const res = await cloudinary.search
    .expression("folder:Camino/*")
    .max_results(300)
    .execute();

  interface CloudinaryRawResource {
    asset_folder: string;
    public_id: string;
    secure_url: string;
  }

  const rawResources = res.resources as CloudinaryRawResource[];
  const resources: CloudinaryAsset[] = rawResources
    .filter((r) => r.asset_folder !== "Camino/custom") // exclude customer custom uploads
    .map((r) => ({
      folder: r.asset_folder,
      id: r.public_id,
      url: r.secure_url,
    }));

  console.log(`✓ Fetched ${resources.length} posters from Cloudinary.`);

  // 2. Ensure the 5 categories exist in Supabase (with empty description)
  const categoryDbMap = new Map<string, string>();
  for (const [, cat] of Object.entries(CATEGORY_MAP)) {
    const record = await withRetry(() =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, description: null },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: null,
        },
      })
    );
    categoryDbMap.set(cat.slug, record.id);
  }
  console.log(`✓ Synced 5 categories in Supabase.`);

  // 3. Group and sort products per folder deterministically
  const productsByFolder: Record<string, CloudinaryAsset[]> = {};
  for (const r of resources) {
    if (!productsByFolder[r.folder]) productsByFolder[r.folder] = [];
    productsByFolder[r.folder].push(r);
  }

  // Sort assets by public_id inside each folder so order is permanent and reproducible
  for (const folder of Object.keys(productsByFolder)) {
    productsByFolder[folder].sort((a, b) => a.id.localeCompare(b.id));
  }

  const catalogProductsForCode: Array<Record<string, unknown>> = [];
  const seededProductSlugs: string[] = [];

  for (const [folderKey, catConfig] of Object.entries(CATEGORY_MAP)) {
    const assets = productsByFolder[folderKey] || [];
    console.log(`Processing ${assets.length} posters for ${catConfig.name} (${catConfig.prefix})...`);

    let itemIndex = 1;
    for (const asset of assets) {
      const meta = getEditionMeta(folderKey, itemIndex);
      seededProductSlugs.push(meta.slug);

      const categoryId = categoryDbMap.get(catConfig.slug)!;

      // Upsert into Supabase DB
      const product = await withRetry(() =>
        prisma.product.upsert({
          where: { slug: meta.slug },
          update: {
            title: meta.title,
            description: "",
            images: [asset.url],
            tags: meta.tags,
            categoryId,
            isFeatured: itemIndex <= 3,
            isActive: true,
          },
          create: {
            title: meta.title,
            slug: meta.slug,
            description: "",
            categoryId,
            images: [asset.url],
            tags: meta.tags,
            isFeatured: itemIndex <= 3,
            isActive: true,
          },
        })
      );

      // Variants: A4 (₹49) & A3 (₹99)
      const variants = [
        { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 4900 },
        { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 9900 },
      ];

      let a4VarId = `var_${product.id}_a4`;
      let a3VarId = `var_${product.id}_a3`;

      for (const v of variants) {
        const sku = `${meta.catalogCode}-${v.size}-${v.finish}-GSM300`.toUpperCase();
        const variantRecord = await withRetry(() =>
          prisma.productVariant.upsert({
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
          })
        );
        if (v.size === Size.A4) a4VarId = variantRecord.id;
        if (v.size === Size.A3) a3VarId = variantRecord.id;
      }

      // Add to static catalog array with catalogCode and empty description
      catalogProductsForCode.push({
        id: product.id,
        title: meta.title,
        slug: meta.slug,
        catalogCode: meta.catalogCode,
        categoryName: catConfig.name,
        categorySlug: catConfig.slug,
        description: "",
        images: [asset.url],
        tags: meta.tags,
        isActive: true,
        isFeatured: itemIndex <= 3,
        isCustomBase: false,
        a4VariantId: a4VarId,
        a3VariantId: a3VarId,
        a4PricePaise: 4900,
        a3PricePaise: 9900,
        stock: 50,
      });

      itemIndex++;
    }
  }

  // 4. Upsert Custom Poster Base Product
  const defaultCatId = categoryDbMap.get("anime") || categoryDbMap.get("sports")!;
  const customBase = await withRetry(() =>
    prisma.product.upsert({
      where: { slug: "custom" },
      update: {
        title: "Custom Wall Poster",
        description: "",
        isActive: true,
        isCustomBase: true,
        categoryId: defaultCatId,
      },
      create: {
        title: "Custom Wall Poster",
        slug: "custom",
        description: "",
        images: [
          "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg",
        ],
        tags: ["custom", "personalized", "print"],
        categoryId: defaultCatId,
        isActive: true,
        isCustomBase: true,
      },
    })
  );

  const customVariants = [
    { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 6900 },
    { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 12900 },
  ];

  for (const v of customVariants) {
    const sku = `CUSTOM-${v.size}-${v.finish}-GSM300`.toUpperCase();
    const existing = await withRetry(() =>
      prisma.productVariant.findFirst({
        where: {
          productId: customBase.id,
          size: v.size,
          finish: v.finish,
          paper: v.paper,
        },
      })
    );

    if (existing) {
      await withRetry(() =>
        prisma.productVariant.update({
          where: { id: existing.id },
          data: { pricePaise: v.pricePaise, stock: 9999, sku },
        })
      );
    } else {
      await withRetry(() =>
        prisma.productVariant.create({
          data: {
            productId: customBase.id,
            size: v.size,
            finish: v.finish,
            paper: v.paper,
            pricePaise: v.pricePaise,
            stock: 9999,
            sku,
          },
        })
      );
    }
  }
  console.log(`✓ Custom Base product configured.`);

  // 5. Clean up old products that had inaccurate names or descriptions
  const allowed = [...seededProductSlugs, "custom"];
  const toDelete = await withRetry(() =>
    prisma.product.findMany({
      where: { slug: { notIn: allowed } },
      select: { id: true, slug: true },
    })
  );

  if (toDelete.length > 0) {
    console.log(`Cleaning up ${toDelete.length} old products...`);
    const ids = toDelete.map((p) => p.id);
    await withRetry(() => prisma.cartItem.deleteMany({ where: { variant: { productId: { in: ids } } } }));
    await withRetry(() => prisma.productVariant.deleteMany({ where: { productId: { in: ids } } }));
    await withRetry(() => prisma.product.deleteMany({ where: { id: { in: ids } } }));
    console.log(`✓ Cleaned up old products.`);
  }

  // 6. Write out updated staticCatalog to src/lib/products.ts
  const productsTsContent = `import { prisma, withDbTimeout } from "@/lib/prisma";
import { ShopQueryParams } from "@/lib/validators/shop";

export interface CatalogProduct {
  id: string;
  title: string;
  slug: string;
  catalogCode: string;
  description: string;
  categoryName: string;
  categorySlug: string;
  images: string[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isCustomBase: boolean;
  a4VariantId: string;
  a3VariantId: string;
  a4PricePaise: number;
  a3PricePaise: number;
  stock: number;
}

export const staticCatalog: CatalogProduct[] = ${JSON.stringify(catalogProductsForCode, null, 2)};

/**
 * Pure synchronous filter of staticCatalog — zero DB/network overhead.
 * Used by the shop page for instant rendering.
 */
export function getStaticCatalogProducts(params: { category?: string; q?: string }): CatalogProduct[] {
  let products = staticCatalog.filter((p) => p.isActive && !p.isCustomBase);

  if (params.category && params.category !== "ALL") {
    const target = params.category.toLowerCase();
    products = products.filter((p) => p.categorySlug.toLowerCase() === target);
  }

  if (params.q) {
    const q = params.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.catalogCode.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return products;
}

function extractCatalogCode(tags: string[]): string {
  const codeTag = tags.find((t) => /^cam-[a-z]{2}-\\d{2}$/i.test(t));
  return codeTag ? codeTag.toUpperCase() : "";
}

/**
 * Retrieves catalog products from DB with fast fallback to static catalog.
 */
export async function getCatalogProducts(params: ShopQueryParams): Promise<CatalogProduct[]> {
  try {
    const whereClause: any = {
      isActive: true,
      isCustomBase: false,
    };

    if (params.category && params.category !== "ALL") {
      whereClause.category = {
        slug: params.category,
      };
    }

    if (params.q) {
      whereClause.OR = [
        { title: { contains: params.q, mode: "insensitive" } },
        { tags: { has: params.q.toLowerCase() } },
      ];
    }

    const orderBy: any = {};
    if (params.sort === "price_asc") orderBy.createdAt = "asc";
    else if (params.sort === "price_desc") orderBy.createdAt = "desc";
    else orderBy.createdAt = "desc";

    const dbProducts = await withDbTimeout(
      prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
          variants: true,
        },
        orderBy,
      }),
      1000
    );

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => {
        const a4Var = p.variants.find((v) => v.size === "A4") || p.variants[0];
        const a3Var = p.variants.find((v) => v.size === "A3") || p.variants[p.variants.length - 1];
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          catalogCode: extractCatalogCode(p.tags),
          description: "",
          categoryName: p.category.name,
          categorySlug: p.category.slug,
          images: p.images.length > 0 ? p.images : ["https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg"],
          tags: p.tags,
          isActive: p.isActive,
          isFeatured: p.isFeatured,
          isCustomBase: p.isCustomBase,
          a4VariantId: a4Var ? a4Var.id : \`a4_\${p.id}\`,
          a3VariantId: a3Var ? a3Var.id : \`a3_\${p.id}\`,
          a4PricePaise: a4Var ? a4Var.pricePaise : 4900,
          a3PricePaise: a3Var ? a3Var.pricePaise : 9900,
          stock: a4Var ? a4Var.stock : 50,
        };
      });
    }
  } catch (error) {
    console.warn("[getCatalogProducts] DB query error or timeout, falling back to static catalog:", error);
  }

  // Fast offline / build fallback
  let products = [...staticCatalog];
  if (params.category && params.category !== "ALL") {
    const target = params.category.toLowerCase();
    products = products.filter((p) => p.categorySlug.toLowerCase() === target);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.catalogCode.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  try {
    const p = await withDbTimeout(
      prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          variants: true,
        },
      }),
      800
    );

    if (p) {
      const a4Var = p.variants.find((v) => v.size === "A4") || p.variants[0];
      const a3Var = p.variants.find((v) => v.size === "A3") || p.variants[p.variants.length - 1];
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        catalogCode: extractCatalogCode(p.tags),
        description: "",
        categoryName: p.category.name,
        categorySlug: p.category.slug,
        images: p.images.length > 0 ? p.images : ["https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg"],
        tags: p.tags,
        isActive: p.isActive,
        isFeatured: p.isFeatured,
        isCustomBase: p.isCustomBase,
        a4VariantId: a4Var ? a4Var.id : \`a4_\${p.id}\`,
        a3VariantId: a3Var ? a3Var.id : \`a3_\${p.id}\`,
        a4PricePaise: a4Var ? a4Var.pricePaise : 4900,
        a3PricePaise: a3Var ? a3Var.pricePaise : 9900,
        stock: a4Var ? a4Var.stock : 50,
      };
    }
  } catch {
    // fallback
  }

  const found = staticCatalog.find((p) => p.slug === slug);
  return found || null;
}

export async function getRelatedProducts(slug: string, categorySlug: string): Promise<CatalogProduct[]> {
  const all = await getCatalogProducts({ q: "", category: categorySlug, size: "ALL", finish: "ALL", sort: "popular", minPrice: 0, maxPrice: 50000, page: 1 });
  return all.filter((p) => p.slug !== slug).slice(0, 4);
}
`;

  fs.writeFileSync(path.join(process.cwd(), "src/lib/products.ts"), productsTsContent, "utf-8");
  console.log(`✓ Updated src/lib/products.ts with ${catalogProductsForCode.length} Cloudinary posters with clean Edition titles and catalog codes!`);

  console.log("🎉 Complete synchronization finished!");
}

main()
  .catch((e) => {
    console.error("❌ Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
