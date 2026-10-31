import { PrismaClient, Role, Size, Finish, Paper } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Seed Users (Admin & Customer)
  const passwordHash = await bcrypt.hash("Camino@2026!", 12);

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

  // 2. Seed Categories (8 categories)
  const categoriesData = [
    {
      name: "Anime & Manga",
      slug: "anime",
      description: "Iconic moments and aesthetics from classic and modern Japanese animation.",
      imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Cinema & Cult Films",
      slug: "movies",
      description: "Timeless cinematography, minimalist movie stills, and iconic director visions.",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Minimalist Art",
      slug: "minimal-art",
      description: "Abstract geometries, bauhaus compositions, and thoughtful negative space.",
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Motivational & Typography",
      slug: "motivational",
      description: "Powerful words, bold typography, and daily morning drive for your work desk.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Automotive & Speed",
      slug: "cars",
      description: "Legendary motorsport silhouettes, vintage racers, and supercar design language.",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Music & Albums",
      slug: "music",
      description: "Album covers, vinyl culture, sound waves, and concert energy.",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Travel & Architecture",
      slug: "travel",
      description: "Architectural monuments, coastal wanderlust, and city blueprints worldwide.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Nature & Botanical",
      slug: "nature",
      description: "Serene landscapes, misty pine forests, and macro organic textures.",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, imageUrl: cat.imageUrl },
      create: cat,
    });
    categoryMap.set(cat.slug, record.id);
  }
  console.log(`✓ Seeded ${categoryMap.size} categories`);

  // 3. Seed 24+ Products with all variants
  const productsData = [
    // Anime
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
      tags: ["samurai", "katana", "sunset", "ink", "japan"],
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
      tags: ["gundam", "mech", "blueprint", "scifi"],
      isFeatured: false,
    },

    // Movies
    {
      title: "Interstellar Horizon",
      slug: "interstellar-horizon",
      categorySlug: "movies",
      description: "Accretion disk gravitational lensing in deep cosmic void. Inspiring cosmic wonder on archival stock.",
      images: [
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["space", "astronomy", "cosmos", "cinema", "sci-fi"],
      isFeatured: true,
    },
    {
      title: "Overlook Geometric Carpet",
      slug: "overlook-geometric-carpet",
      categorySlug: "movies",
      description: "The hypnotic hexagonal retro textile pattern celebrated in legendary psychological horror.",
      images: [
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["shining", "kubrick", "retro", "cult-film", "geometric"],
      isFeatured: false,
    },
    {
      title: "Midnight Drive in LA",
      slug: "midnight-drive-in-la",
      categorySlug: "movies",
      description: "Warm sodium highway glows, taillight motion blur, and synthwave mood inspired by neo-noir classics.",
      images: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["drive", "neon", "los-angeles", "cinematic", "night"],
      isFeatured: true,
    },

    // Minimal Art
    {
      title: "Bauhaus Exhibition 1923",
      slug: "bauhaus-exhibition-1923",
      categorySlug: "minimal-art",
      description: "Geometric harmony with primary vermilion, deep cobalt, and warm parchment negative space.",
      images: [
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["bauhaus", "minimal", "modernist", "geometric", "art"],
      isFeatured: true,
    },
    {
      title: "Dune Curves No. 4",
      slug: "dune-curves-no-4",
      categorySlug: "minimal-art",
      description: "Monochrome sweeping shadow lines across terracotta sand ridges. Peaceful aesthetic statement.",
      images: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["sand", "dune", "monochrome", "curves", "minimal"],
      isFeatured: false,
    },
    {
      title: "Kyoto Tea Pavilion",
      slug: "kyoto-tea-pavilion",
      categorySlug: "minimal-art",
      description: "Raw cedar wood beams meeting white shoji paper partitions in diffused morning sun.",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["architecture", "japan", "wood", "zen", "wabi-sabi"],
      isFeatured: false,
    },

    // Motivational
    {
      title: "Compound Interest & Daily Grit",
      slug: "compound-interest-daily-grit",
      categorySlug: "motivational",
      description: "1.01^365 = 37.8 vs 0.99^365 = 0.03. Elegant typographic presentation on Swiss grid.",
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["typography", "mindset", "focus", "discipline", "study"],
      isFeatured: true,
    },
    {
      title: "Ship Over Perfect",
      slug: "ship-over-perfect",
      categorySlug: "motivational",
      description: "Bold editorial blackletter manifesto for builders, coders, and startup creators.",
      images: [
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["startup", "builder", "coding", "manifesto"],
      isFeatured: false,
    },
    {
      title: "Deep Work Zone",
      slug: "deep-work-zone",
      categorySlug: "motivational",
      description: "Clean brutalist typography statement designed to hang directly behind or above your screen.",
      images: [
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["office", "deep-work", "minimalist", "focus"],
      isFeatured: false,
    },

    // Cars
    {
      title: "Monza 1967 Vintage Grand Prix",
      slug: "monza-1967-vintage-grand-prix",
      categorySlug: "cars",
      description: "Classic Italian racing red tubular chassis racer rounding the high-banking curve.",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["f1", "vintage", "monza", "motorsport", "classic-cars"],
      isFeatured: true,
    },
    {
      title: "Porsche 911 Turbo Silhouette",
      slug: "porsche-911-turbo-silhouette",
      categorySlug: "cars",
      description: "The unmistakable whale-tail rear profile rendered in stark high-contrast studio rim lighting.",
      images: [
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["porsche", "supercar", "black-and-white", "automotive"],
      isFeatured: false,
    },
    {
      title: "Midnight Tokyo Expressway Racer",
      slug: "midnight-tokyo-expressway-racer",
      categorySlug: "cars",
      description: "Wangan Bayshore route long exposure blur featuring iconic 90s JDM silhouette.",
      images: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["jdm", "tokyo", "street-racing", "wangan"],
      isFeatured: false,
    },

    // Music
    {
      title: "Analog Waveforms & Tubes",
      slug: "analog-waveforms-tubes",
      categorySlug: "music",
      description: "Warm amber glow of vacuum tubes and reel-to-reel magnetic tape recording console.",
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["vinyl", "audio", "vintage", "analog", "hifi"],
      isFeatured: false,
    },
    {
      title: "Kind of Blue: Miles Quintet",
      slug: "kind-of-blue-miles-quintet",
      categorySlug: "music",
      description: "Candid vintage smoke, brass trumpet bell, and modal jazz recording session atmosphere.",
      images: [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["jazz", "trumpet", "monochrome", "classic"],
      isFeatured: true,
    },
    {
      title: "Festival Crowd at Golden Hour",
      slug: "festival-crowd-at-golden-hour",
      categorySlug: "music",
      description: "Hands raised towards the stage lights as sunset mist settles across the music festival grounds.",
      images: [
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["concert", "festival", "energy", "crowd"],
      isFeatured: false,
    },

    // Travel
    {
      title: "Santorini Cliffside Domes",
      slug: "santorini-cliffside-domes",
      categorySlug: "travel",
      description: "Cobalt blue domes and whitewashed Aegean stone stairs overlooking azure caldera waters.",
      images: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["greece", "santorini", "travel", "mediterranean", "coastal"],
      isFeatured: false,
    },
    {
      title: "New York Iron & Steam",
      slug: "new-york-iron-and-steam",
      categorySlug: "travel",
      description: "Flatiron building cutting through winter morning mist with yellow cab foreground accent.",
      images: [
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["new-york", "architecture", "urban", "monochrome"],
      isFeatured: true,
    },
    {
      title: "Fushimi Inari Torii Pathway",
      slug: "fushimi-inari-torii-pathway",
      categorySlug: "travel",
      description: "Endless thousand vermilion torii gates winding through ancient cedar moss forests in Kyoto.",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["kyoto", "japan", "torii", "shrine", "spiritual"],
      isFeatured: false,
    },

    // Nature
    {
      title: "Misty Pacific Coast Pines",
      slug: "misty-pacific-coast-pines",
      categorySlug: "nature",
      description: "Moody layered fog rolling over old-growth Douglas firs along the Oregon coastline.",
      images: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["forest", "mist", "moody", "pacific", "green"],
      isFeatured: true,
    },
    {
      title: "Dolomite Jagged Peaks",
      slug: "dolomite-jagged-peaks",
      categorySlug: "nature",
      description: "Alpenglow touching the jagged limestone spires of Seceda in northern Italy.",
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["mountains", "alps", "hiking", "adventure", "dolomites"],
      isFeatured: false,
    },
    {
      title: "Monstera Botanical Venation",
      slug: "monstera-botanical-venation",
      categorySlug: "nature",
      description: "Macro botanical photography capturing chlorophyll light translucence and cellular geometry.",
      images: [
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["botanical", "plants", "macro", "minimal", "greenery"],
      isFeatured: false,
    },
  ];

  for (const p of productsData) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        description: p.description,
        images: p.images,
        tags: p.tags,
        categoryId,
        isFeatured: p.isFeatured,
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

    // Seed variants for this product
    // Sizes: A4 (₹70 -> 7000 paise) and A3 (₹120 -> 12000 paise)
    // Finishes: GLOSS (default) and MATTE
    // Paper: GSM_300
    const variantCombos = [
      { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 7000 },
      { size: Size.A4, finish: Finish.MATTE, paper: Paper.GSM_300, pricePaise: 7000 },
      { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 12000 },
      { size: Size.A3, finish: Finish.MATTE, paper: Paper.GSM_300, pricePaise: 12000 },
    ];

    for (const v of variantCombos) {
      const sku = `${product.slug}-${v.size}-${v.finish}-${v.paper}`.toUpperCase();
      await prisma.productVariant.upsert({
        where: {
          productId_size_finish_paper: {
            productId: product.id,
            size: v.size,
            finish: v.finish,
            paper: v.paper,
          },
        },
        update: {
          pricePaise: v.pricePaise,
          stock: 40,
        },
        create: {
          productId: product.id,
          size: v.size,
          finish: v.finish,
          paper: v.paper,
          pricePaise: v.pricePaise,
          stock: 40,
          sku,
        },
      });
    }
  }
  console.log(`✓ Seeded ${productsData.length} catalog products with all variants`);

  // 4. Seed 1 "Custom Poster" product (isCustomBase = true)
  const customCategory = categoryMap.get("minimal-art") || Array.from(categoryMap.values())[0];
  const customBaseProduct = await prisma.product.upsert({
    where: { slug: "custom-poster" },
    update: {
      isCustomBase: true,
      title: "Custom Printed Wall Poster",
      description: "Upload your personal photo, digital illustration, or memory. Professionally cropped and printed on 300 GSM archival stock.",
    },
    create: {
      title: "Custom Printed Wall Poster",
      slug: "custom-poster",
      description: "Upload your personal photo, digital illustration, or memory. Professionally cropped and printed on 300 GSM archival stock.",
      categoryId: customCategory,
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80",
      ],
      tags: ["custom", "personalized", "print", "gift", "photo"],
      isCustomBase: true,
      isActive: true,
    },
  });

  const customVariants = [
    { size: Size.A4, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 7000 },
    { size: Size.A4, finish: Finish.MATTE, paper: Paper.GSM_300, pricePaise: 7000 },
    { size: Size.A3, finish: Finish.GLOSS, paper: Paper.GSM_300, pricePaise: 12000 },
    { size: Size.A3, finish: Finish.MATTE, paper: Paper.GSM_300, pricePaise: 12000 },
  ];

  for (const v of customVariants) {
    const sku = `CUSTOM-${v.size}-${v.finish}-${v.paper}`.toUpperCase();
    await prisma.productVariant.upsert({
      where: {
        productId_size_finish_paper: {
          productId: customBaseProduct.id,
          size: v.size,
          finish: v.finish,
          paper: v.paper,
        },
      },
      update: {
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
  console.log(`✓ Seeded Custom Base product with all custom variants`);

  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
