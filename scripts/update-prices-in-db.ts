import { PrismaClient, Size } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("🚀 Updating variant prices in Supabase database...");

  // 1. Identify custom base product(s)
  const customProducts = await prisma.product.findMany({
    where: { OR: [{ slug: "custom" }, { isCustomBase: true }] },
    select: { id: true },
  });
  const customProductIds = customProducts.map((p) => p.id);
  console.log(`Custom product IDs: ${JSON.stringify(customProductIds)}`);

  // 2. Update Standard Posters:
  // A4 = 3900 paise (₹39)
  const stdA4 = await prisma.productVariant.updateMany({
    where: {
      size: Size.A4,
      productId: { notIn: customProductIds },
    },
    data: {
      pricePaise: 3900,
    },
  });
  console.log(`✓ Updated ${stdA4.count} standard A4 variants to ₹39 (3900 paise).`);

  // A3 = 7900 paise (₹79)
  const stdA3 = await prisma.productVariant.updateMany({
    where: {
      size: Size.A3,
      productId: { notIn: customProductIds },
    },
    data: {
      pricePaise: 7900,
    },
  });
  console.log(`✓ Updated ${stdA3.count} standard A3 variants to ₹79 (7900 paise).`);

  // 3. Update Custom Posters:
  // A4 = 4900 paise (₹49)
  if (customProductIds.length > 0) {
    const custA4 = await prisma.productVariant.updateMany({
      where: {
        size: Size.A4,
        productId: { in: customProductIds },
      },
      data: {
        pricePaise: 4900,
      },
    });
    console.log(`✓ Updated ${custA4.count} custom A4 variants to ₹49 (4900 paise).`);

    // A3 = 8900 paise (₹89)
    const custA3 = await prisma.productVariant.updateMany({
      where: {
        size: Size.A3,
        productId: { in: customProductIds },
      },
      data: {
        pricePaise: 8900,
      },
    });
    console.log(`✓ Updated ${custA3.count} custom A3 variants to ₹89 (8900 paise).`);
  }

  // 4. Verify summary
  const summary = await prisma.productVariant.groupBy({
    by: ["size", "pricePaise"],
    _count: true,
  });
  console.log("Variant summary after update:", summary);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

