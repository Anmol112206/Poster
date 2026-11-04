import { PrismaClient, Role, Size, Finish, Paper } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting category & catalog reset...");

  // 1. Seed Users (Admin & Customer)
  const passwordHash = await bcrypt.hash("Cammino@2026!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "agarwalanmol1212@gmail.com" },
    update: {
      role: Role.ADMIN,
    },
    create: {
      name: "Anmol Agarwal (Admin)",
      email: "agarwalanmol1212@gmail.com",
      phone: "9876543210",
      passwordHash,
      role: Role.ADMIN,
    },
  });
  console.log(`✓ Admin user ready: ${admin.email}`);

  const customer = await prisma.user.upsert({
    where: { email: "anmolagarwal0904@gmail.com" },
    update: {
      role: Role.CUSTOMER,
    },
    create: {
      name: "Anmol Agarwal",
      email: "anmolagarwal0904@gmail.com",
      phone: "9123456780",
      passwordHash,
      role: Role.CUSTOMER,
      addresses: {
        create: {
          fullName: "Anmol Agarwal",
          phone: "9123456780",
          line1: "Hostel Block D, Room 204",
          line2: "IIT Patna Campus, Bihta",
          city: "Patna",
          state: "Bihar",
          pincode: "801106",
          isDefault: true,
        },
      },
    },
  });
  console.log(`✓ Customer user ready: ${customer.email}`);

  // 2. The 5 Requested Categories
  const targetCategories = [
    {
      name: "Sports",
      slug: "sports",
      description: "Iconic athletic triumphs, football legends, basketball royalty, and stadium adrenaline.",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "God",
      slug: "god",
      description: "Sacred Indian deities, divine ethereal transcendence, and timeless spiritual serenity.",
      imageUrl: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Anime",
      slug: "anime",
      description: "Iconic moments, shonen intensity, and aesthetic visuals from beloved anime universes.",
      imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Marvel",
      slug: "marvel",
      description: "Cinematic superhero legends, Avengers assemble moments, and comic-book visual power.",
      imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Motivation",
      slug: "motivation",
      description: "Bold Swiss typography, brutalist discipline principles, and relentless founder drive.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const targetSlugs = targetCategories.map((c) => c.slug);

  // 3. Upsert the 5 new categories
  const categoryMap = new Map<string, string>();
  for (const cat of targetCategories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, imageUrl: cat.imageUrl },
      create: cat,
    });
    categoryMap.set(cat.slug, record.id);
  }
  console.log(`✓ Seeded/Updated 5 categories: ${targetSlugs.join(", ")}`);

  // 4. Products for the 5 categories (4 per category = 20 catalog posters)
  const productsData = [
    // --- 1. SPORTS ---
    {
      title: "CR7 Aerial Elevation",
      slug: "cr7-aerial-elevation",
      categorySlug: "sports",
      description: "Legendary header elevation against deep stadium floodlights with dynamic crimson and black contrast.",
      images: [
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["cr7", "football", "ronaldo", "sports", "stadium"],
      isFeatured: true,
    },
    {
      title: "The Mamba Court: 24",
      slug: "the-mamba-court-24",
      categorySlug: "sports",
      description: "Lakers purple and golden dusk arena court with glowing hoop silhouette. A tribute to pure relentless drive.",
      images: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["basketball", "kobe", "mamba", "nba", "lakers"],
      isFeatured: false,
    },
    {
      title: "King of the MCG: 82*",
      slug: "king-of-the-mcg-82",
      categorySlug: "sports",
      description: "The iconic Melbourne roar silhouette under electric floodlights and a sea of 90,000 cheering fans.",
      images: [
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["cricket", "kohli", "mcg", "sports", "legend"],
      isFeatured: true,
    },
    {
      title: "Monaco Apex: Grand Prix",
      slug: "monaco-apex-grand-prix",
      categorySlug: "sports",
      description: "Formula racing speed and neon asphalt reflections through the legendary hairpin turn.",
      images: [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["f1", "racing", "speed", "ferrari", "motorsport"],
      isFeatured: false,
    },

    // --- 2. GOD ---
    {
      title: "Mahadev: Cosmic Dhyana",
      slug: "mahadev-cosmic-dhyana",
      categorySlug: "god",
      description: "Lord Shiva in profound Himalayan meditation under cosmic nebulae, crescent moon, and golden aura.",
      images: [
        "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["shiva", "mahadev", "spiritual", "god", "himalayas", "meditation"],
      isFeatured: true,
    },
    {
      title: "Shree Ram: Ayodhya Radiance",
      slug: "shree-ram-ayodhya-radiance",
      categorySlug: "god",
      description: "Lord Rama with divine bow and celestial arrow against a glowing saffron and golden horizon.",
      images: [
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["ram", "ayodhya", "divine", "god", "spiritual", "peace"],
      isFeatured: false,
    },
    {
      title: "Shree Krishna: Celestial Flute",
      slug: "shree-krishna-celestial-flute",
      categorySlug: "god",
      description: "Lord Krishna playing the bansuri in Vrindavan dusk, bathed in ethereal peacock blue and golden starlight.",
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["krishna", "flute", "vrindavan", "god", "divine", "spiritual"],
      isFeatured: true,
    },
    {
      title: "Bajrangbali: Mountain Bearer",
      slug: "bajrangbali-mountain-bearer",
      categorySlug: "god",
      description: "Lord Hanuman leaping through tempestuous skies carrying the Sanjeevani mountain with blazing devotion.",
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["hanuman", "bajrangbali", "strength", "devotion", "god"],
      isFeatured: false,
    },

    // --- 3. ANIME ---
    {
      title: "Solitude in Neo-Tokyo",
      slug: "solitude-in-neo-tokyo",
      categorySlug: "anime",
      description: "Rain-slicked alleyways under neon signs in futuristic Megalopolis. Deep cyber-noir color depth.",
      images: [
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["cyberpunk", "anime", "neon", "tokyo", "scifi"],
      isFeatured: true,
    },
    {
      title: "The Ronin's Dusk",
      slug: "the-ronins-dusk",
      categorySlug: "anime",
      description: "Traditional ink-wash illustration with vibrant crimson sun silhouette against bamboo groves.",
      images: [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["samurai", "katana", "sunset", "ink", "anime"],
      isFeatured: false,
    },
    {
      title: "Celestial Mech Wing",
      slug: "celestial-mech-wing",
      categorySlug: "anime",
      description: "Blueprint technical aesthetic of an orbital humanoid defense machine with Japanese typography.",
      images: [
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["gundam", "mech", "blueprint", "anime", "scifi"],
      isFeatured: false,
    },
    {
      title: "Domain Expansion: Infinite Void",
      slug: "domain-expansion-infinite-void",
      categorySlug: "anime",
      description: "Cosmic black hole horizons and crystalline dimensional geometry inspired by modern shonen sorcery.",
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["jjk", "gojo", "domain", "anime", "sorcerer"],
      isFeatured: false,
    },

    // --- 4. MARVEL ---
    {
      title: "Iron Man: Mark 85 Arc Core",
      slug: "iron-man-mark-85-arc-core",
      categorySlug: "marvel",
      description: "Tony Stark's crimson and gold nano-tech armor in low-key lighting with glowing palladium chest reactor.",
      images: [
        "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["ironman", "marvel", "avengers", "stark", "superhero"],
      isFeatured: true,
    },
    {
      title: "Spider-Man: Manhattan Freefall",
      slug: "spider-man-manhattan-freefall",
      categorySlug: "marvel",
      description: "The iconic red and blue web-slinger soaring between glass skyscrapers during warm Manhattan twilight.",
      images: [
        "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["spiderman", "marvel", "peterparker", "avengers", "nyc"],
      isFeatured: true,
    },
    {
      title: "Thor: Bring Me Thanos",
      slug: "thor-bring-me-thanos",
      categorySlug: "marvel",
      description: "The God of Thunder descending into Wakanda amidst blinding celestial blue lightning and Stormbreaker.",
      images: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["thor", "marvel", "lightning", "avengers", "asgard"],
      isFeatured: false,
    },
    {
      title: "Wolverine: Adamantium Slash",
      slug: "wolverine-adamantium-slash",
      categorySlug: "marvel",
      description: "Low-key gritty silhouette of Logan with extended adamantium claws glinting under cold rain.",
      images: [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["wolverine", "xmen", "marvel", "logan", "claws"],
      isFeatured: false,
    },

    // --- 5. MOTIVATION ---
    {
      title: "Compound Interest & Daily Grit",
      slug: "compound-interest-daily-grit",
      categorySlug: "motivation",
      description: "Minimalist black-and-cream typography charting the exponential mathematics of 1% daily improvement.",
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["compounding", "habits", "grit", "productivity", "typography"],
      isFeatured: true,
    },
    {
      title: "Ship Over Perfect",
      slug: "ship-over-perfect",
      categorySlug: "motivation",
      description: "Brutalist manifesto poster for builders, coders, and founders. Stark typography on dark obsidian slate.",
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["startup", "builder", "founders", "discipline", "ship"],
      isFeatured: false,
    },
    {
      title: "The 4:00 AM Solitude",
      slug: "the-4am-solitude",
      categorySlug: "motivation",
      description: "Minimalist glowing typography celebrating early morning silence before the rest of the world wakes up.",
      images: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["routine", "focus", "earlymorning", "discipline"],
      isFeatured: false,
    },
    {
      title: "Discipline Equals Freedom",
      slug: "discipline-equals-freedom",
      categorySlug: "motivation",
      description: "Bold typographic quote exploring how radical self-discipline unlocks ultimate personal independence.",
      images: [
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["discipline", "freedom", "mindset", "success"],
      isFeatured: false,
    },
  ];

  // 5. Upsert all products
  const seededProductSlugs: string[] = [];

  for (const p of productsData) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;

    seededProductSlugs.push(p.slug);

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        description: p.description,
        images: p.images,
        tags: p.tags,
        categoryId,
        isFeatured: p.isFeatured,
        isActive: true,
      },
      create: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        categoryId,
        images: p.images,
        tags: p.tags,
        isFeatured: p.isFeatured,
        isActive: true,
      },
    });

    // Seed A4 (₹39 -> 3900 paise) and A3 (₹79 -> 7900 paise) variants in GLOSS finish
    const variantCombos = [
      { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 3900 },
      { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 7900 },
    ];

    for (const v of variantCombos) {
      const sku = `${product.slug}-${v.size}-${v.finish}-${v.paper}`.toUpperCase();
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
  }
  console.log(`✓ Seeded ${seededProductSlugs.length} posters across the 5 categories`);

  // 6. Seed Custom Poster Base Product
  const defaultCategoryId = categoryMap.get("anime") || categoryMap.get("sports")!;
  const customBaseProduct = await prisma.product.upsert({
    where: { slug: "custom" },
    update: {
      title: "Custom Wall Poster",
      description: "Upload any custom photo, illustration, or memory. Precision printed on archival 300 GSM stock.",
      isActive: true,
      isCustomBase: true,
      categoryId: defaultCategoryId,
    },
    create: {
      title: "Custom Wall Poster",
      slug: "custom",
      description: "Upload any custom photo, illustration, or memory. Precision printed on archival 300 GSM stock.",
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["custom", "personalized", "print"],
      categoryId: defaultCategoryId,
      isActive: true,
      isCustomBase: true,
    },
  });

  const customVariants = [
    { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 4900 },
    { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 8900 },
  ];

  for (const v of customVariants) {
    const sku = `CUSTOM-${v.size}-${v.finish}-${v.paper}`.toUpperCase();
    await prisma.productVariant.upsert({
      where: { sku },
      update: {
        productId: customBaseProduct.id,
        size: v.size,
        finish: v.finish,
        paper: v.paper,
        pricePaise: v.pricePaise,
        stock: 9999,
      },
      create: {
        productId: customBaseProduct.id,
        size: v.size,
        finish: v.finish,
        paper: v.paper,
        pricePaise: v.pricePaise,
        stock: 9999,
        sku,
      },
    });
  }
  console.log(`✓ Seeded Custom Base product`);

  // 7. Remove any old products not in the new 5 categories
  const allAllowedSlugs = [...seededProductSlugs, "custom"];
  const oldProducts = await prisma.product.findMany({
    where: {
      slug: { notIn: allAllowedSlugs },
    },
    select: { id: true, slug: true },
  });

  if (oldProducts.length > 0) {
    const oldProductIds = oldProducts.map((p) => p.id);
    console.log(`Cleaning up ${oldProducts.length} old products not in the 5 categories...`);
    // Delete variants first
    await prisma.productVariant.deleteMany({
      where: { productId: { in: oldProductIds } },
    });
    // Delete products
    await prisma.product.deleteMany({
      where: { id: { in: oldProductIds } },
    });
    console.log(`✓ Removed old products`);
  }

  // 8. Remove any old categories not in the 5 target categories
  const oldCategories = await prisma.category.findMany({
    where: {
      slug: { notIn: targetSlugs },
    },
    select: { id: true, slug: true, name: true },
  });

  if (oldCategories.length > 0) {
    console.log(`Removing ${oldCategories.length} deprecated categories: ${oldCategories.map((c) => c.slug).join(", ")}...`);
    await prisma.category.deleteMany({
      where: {
        id: { in: oldCategories.map((c) => c.id) },
      },
    });
    console.log(`✓ Deleted old categories from Supabase`);
  }

  console.log("🎉 Seeding completed successfully with only the 5 categories!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
