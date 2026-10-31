import { prisma, withDbTimeout } from "@/lib/prisma";
import { ShopQueryParams } from "@/lib/validators/shop";

export interface CatalogProduct {
  id: string;
  title: string;
  slug: string;
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

export const staticCatalog: CatalogProduct[] = [
  // Anime
  {
    id: "prod_anime_1",
    title: "Solitude in Neo-Tokyo",
    slug: "solitude-in-neo-tokyo",
    categoryName: "Anime & Manga",
    categorySlug: "anime",
    description: "Rain-slicked alleyways under neon signs in futuristic Megalopolis. Deep cyber-noir color depth with striking atmospheric shadows.",
    images: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["cyberpunk", "anime", "neon", "tokyo", "scifi"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_neo_a4",
    a3VariantId: "var_neo_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 45,
  },
  {
    id: "prod_anime_2",
    title: "The Ronin's Dusk",
    slug: "the-ronins-dusk",
    categoryName: "Anime & Manga",
    categorySlug: "anime",
    description: "Traditional ink-wash illustration with vibrant crimson sun silhouette against bamboo groves. Beautiful Japanese artistic mood.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["samurai", "katana", "sunset", "ink", "japan"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_ronin_a4",
    a3VariantId: "var_ronin_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 32,
  },
  {
    id: "prod_anime_3",
    title: "Celestial Mech Wing",
    slug: "celestial-mech-wing",
    categoryName: "Anime & Manga",
    categorySlug: "anime",
    description: "Blueprint technical aesthetic of an orbital humanoid defense machine with crisp Japanese typography and schematics.",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["gundam", "mech", "blueprint", "scifi"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_mech_a4",
    a3VariantId: "var_mech_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 20,
  },

  // Movies
  {
    id: "prod_movies_1",
    title: "Interstellar Horizon",
    slug: "interstellar-horizon",
    categoryName: "Cinema & Cult",
    categorySlug: "movies",
    description: "Accretion disk gravitational lensing in deep cosmic void. Inspiring cosmic wonder on archival heavyweight stock.",
    images: [
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["space", "astronomy", "cosmos", "cinema", "sci-fi"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_inter_a4",
    a3VariantId: "var_inter_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 50,
  },
  {
    id: "prod_movies_2",
    title: "Overlook Geometric Carpet",
    slug: "overlook-geometric-carpet",
    categoryName: "Cinema & Cult",
    categorySlug: "movies",
    description: "The hypnotic hexagonal retro textile pattern celebrated in legendary psychological horror.",
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["shining", "kubrick", "retro", "cult-film", "geometric"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_carpet_a4",
    a3VariantId: "var_carpet_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 18,
  },
  {
    id: "prod_movies_3",
    title: "Midnight Drive in LA",
    slug: "midnight-drive-in-la",
    categoryName: "Cinema & Cult",
    categorySlug: "movies",
    description: "Warm sodium highway glows, taillight motion blur, and synthwave mood inspired by neo-noir classics.",
    images: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["drive", "neon", "los-angeles", "cinematic", "night"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_drive_a4",
    a3VariantId: "var_drive_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 28,
  },

  // Minimal Art
  {
    id: "prod_min_1",
    title: "Bauhaus Exhibition 1923",
    slug: "bauhaus-exhibition-1923",
    categoryName: "Minimalist Art",
    categorySlug: "minimal-art",
    description: "Geometric harmony with primary vermilion, deep cobalt, and warm parchment negative space.",
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["bauhaus", "minimal", "modernist", "geometric", "art"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_bau_a4",
    a3VariantId: "var_bau_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 60,
  },
  {
    id: "prod_min_2",
    title: "Dune Curves No. 4",
    slug: "dune-curves-no-4",
    categoryName: "Minimalist Art",
    categorySlug: "minimal-art",
    description: "Monochrome sweeping shadow lines across terracotta sand ridges. Peaceful aesthetic statement.",
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["sand", "dune", "monochrome", "curves", "minimal"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_dune_a4",
    a3VariantId: "var_dune_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 22,
  },
  {
    id: "prod_min_3",
    title: "Kyoto Tea Pavilion",
    slug: "kyoto-tea-pavilion",
    categoryName: "Minimalist Art",
    categorySlug: "minimal-art",
    description: "Raw cedar wood beams meeting white shoji paper partitions in diffused morning sun.",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["architecture", "japan", "wood", "zen", "wabi-sabi"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_kyoto_a4",
    a3VariantId: "var_kyoto_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 35,
  },

  // Motivational
  {
    id: "prod_mot_1",
    title: "Compound Interest & Daily Grit",
    slug: "compound-interest-daily-grit",
    categoryName: "Motivational",
    categorySlug: "motivational",
    description: "1.01^365 = 37.8 vs 0.99^365 = 0.03. Elegant typographic presentation on Swiss grid.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["typography", "mindset", "focus", "discipline", "study"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_grit_a4",
    a3VariantId: "var_grit_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 40,
  },
  {
    id: "prod_mot_2",
    title: "Ship Over Perfect",
    slug: "ship-over-perfect",
    categoryName: "Motivational",
    categorySlug: "motivational",
    description: "Bold editorial blackletter manifesto for builders, coders, and startup creators.",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["startup", "builder", "coding", "manifesto"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_ship_a4",
    a3VariantId: "var_ship_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 25,
  },

  // Automotive
  {
    id: "prod_car_1",
    title: "Monza 1967 Grand Prix",
    slug: "monza-1967-vintage-grand-prix",
    categoryName: "Automotive",
    categorySlug: "cars",
    description: "Classic Italian racing red tubular chassis racer rounding the high-banking curve.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["f1", "vintage", "monza", "motorsport", "classic-cars"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_monza_a4",
    a3VariantId: "var_monza_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 30,
  },
  {
    id: "prod_car_2",
    title: "Porsche 911 Turbo Silhouette",
    slug: "porsche-911-turbo-silhouette",
    categoryName: "Automotive",
    categorySlug: "cars",
    description: "The unmistakable whale-tail rear profile rendered in stark high-contrast studio rim lighting.",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["porsche", "supercar", "black-and-white", "automotive"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_porsche_a4",
    a3VariantId: "var_porsche_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 15,
  },

  // Music
  {
    id: "prod_music_1",
    title: "Kind of Blue: Miles Quintet",
    slug: "kind-of-blue-miles-quintet",
    categoryName: "Music",
    categorySlug: "music",
    description: "Candid vintage smoke, brass trumpet bell, and modal jazz recording session atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["jazz", "trumpet", "monochrome", "classic"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_jazz_a4",
    a3VariantId: "var_jazz_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 45,
  },
  {
    id: "prod_music_2",
    title: "Analog Waveforms & Tubes",
    slug: "analog-waveforms-tubes",
    categoryName: "Music",
    categorySlug: "music",
    description: "Warm amber glow of vacuum tubes and reel-to-reel magnetic tape recording console.",
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["vinyl", "audio", "vintage", "analog", "hifi"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_analog_a4",
    a3VariantId: "var_analog_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 24,
  },

  // Travel
  {
    id: "prod_travel_1",
    title: "New York Iron & Steam",
    slug: "new-york-iron-and-steam",
    categoryName: "Travel",
    categorySlug: "travel",
    description: "Flatiron building cutting through winter morning mist with yellow cab foreground accent.",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["new-york", "architecture", "urban", "monochrome"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_ny_a4",
    a3VariantId: "var_ny_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 55,
  },
  {
    id: "prod_travel_2",
    title: "Santorini Cliffside Domes",
    slug: "santorini-cliffside-domes",
    categoryName: "Travel",
    categorySlug: "travel",
    description: "Cobalt blue domes and whitewashed Aegean stone stairs overlooking azure caldera waters.",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["greece", "santorini", "travel", "mediterranean", "coastal"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_sant_a4",
    a3VariantId: "var_sant_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 28,
  },

  // Nature
  {
    id: "prod_nature_1",
    title: "Misty Pacific Coast Pines",
    slug: "misty-pacific-coast-pines",
    categoryName: "Nature",
    categorySlug: "nature",
    description: "Moody layered fog rolling over old-growth Douglas firs along the Oregon coastline.",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["forest", "mist", "moody", "pacific", "green"],
    isActive: true,
    isFeatured: true,
    isCustomBase: false,
    a4VariantId: "var_pines_a4",
    a3VariantId: "var_pines_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 60,
  },
  {
    id: "prod_nature_2",
    title: "Dolomite Jagged Peaks",
    slug: "dolomite-jagged-peaks",
    categoryName: "Nature",
    categorySlug: "nature",
    description: "Alpenglow touching the jagged limestone spires of Seceda in northern Italy.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80",
    ],
    tags: ["mountains", "alps", "hiking", "adventure", "dolomites"],
    isActive: true,
    isFeatured: false,
    isCustomBase: false,
    a4VariantId: "var_dolo_a4",
    a3VariantId: "var_dolo_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    stock: 35,
  },
];

/**
 * Retrieves products based on search, category filter, and sorting.
 */
export async function getCatalogProducts(params: ShopQueryParams) {
  let products = staticCatalog;

  // Try DB first
  try {
    const dbProducts = await withDbTimeout(
      prisma.product.findMany({
        where: {
          isActive: true,
          isCustomBase: false,
          ...(params.category ? { category: { slug: params.category } } : {}),
        },
        include: {
          category: true,
          variants: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      800
    );

    if (dbProducts.length > 0) {
      products = dbProducts.map((p) => {
        const a4Var = p.variants.find((v) => v.size === "A4") || p.variants[0];
        const a3Var = p.variants.find((v) => v.size === "A3") || p.variants[p.variants.length - 1];
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          description: p.description,
          categoryName: p.category.name,
          categorySlug: p.category.slug,
          images: p.images,
          tags: p.tags,
          isActive: p.isActive,
          isFeatured: p.isFeatured,
          isCustomBase: p.isCustomBase,
          a4VariantId: a4Var ? a4Var.id : `a4_${p.id}`,
          a3VariantId: a3Var ? a3Var.id : `a3_${p.id}`,
          a4PricePaise: a4Var ? a4Var.pricePaise : 7000,
          a3PricePaise: a3Var ? a3Var.pricePaise : 12000,
          stock: a4Var ? a4Var.stock : 50,
        };
      });
    }
  } catch {
    // Continue with static fallback
  }

  // Filter by category in memory if using fallback
  if (params.category) {
    products = products.filter((p) => p.categorySlug.toLowerCase() === params.category.toLowerCase());
  }

  // Filter by search query `?q=`
  if (params.q && params.q.trim()) {
    const term = params.q.trim().toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }

  // Sort
  if (params.sort === "price_asc") {
    products.sort((a, b) => a.a4PricePaise - b.a4PricePaise);
  } else if (params.sort === "price_desc") {
    products.sort((a, b) => b.a3PricePaise - a.a3PricePaise);
  } else if (params.sort === "popular") {
    products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return products;
}

/**
 * Retrieves a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  // Try DB
  try {
    const p = await withDbTimeout(
      prisma.product.findUnique({
        where: { slug },
        include: { category: true, variants: true },
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
        description: p.description,
        categoryName: p.category.name,
        categorySlug: p.category.slug,
        images: p.images,
        tags: p.tags,
        isActive: p.isActive,
        isFeatured: p.isFeatured,
        isCustomBase: p.isCustomBase,
        a4VariantId: a4Var ? a4Var.id : `a4_${p.id}`,
        a3VariantId: a3Var ? a3Var.id : `a3_${p.id}`,
        a4PricePaise: a4Var ? a4Var.pricePaise : 7000,
        a3PricePaise: a3Var ? a3Var.pricePaise : 12000,
        stock: a4Var ? a4Var.stock : 50,
      };
    }
  } catch {
    // Continue with static fallback
  }

  return staticCatalog.find((p) => p.slug === slug) || null;
}

/**
 * Gets related products in the same category.
 */
export async function getRelatedProducts(slug: string, categorySlug: string): Promise<CatalogProduct[]> {
  const all = await getCatalogProducts({ q: "", category: categorySlug, size: "ALL", finish: "ALL", sort: "popular", minPrice: 0, maxPrice: 50000, page: 1 });
  return all.filter((p) => p.slug !== slug).slice(0, 4);
}
