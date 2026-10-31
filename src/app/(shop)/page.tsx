import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Palette, Layers, Box, CheckCircle2, Star, Sparkles } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import NewsletterSection from "@/components/home/NewsletterSection";
import { prisma, withDbTimeout } from "@/lib/prisma";

// Fallback featured posters in case DB connection is not initialized during local static build
const fallbackProducts = [
  {
    id: "prod_1",
    title: "Solitude in Neo-Tokyo",
    slug: "solitude-in-neo-tokyo",
    categoryName: "Anime & Manga",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80",
    secondaryImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_neo_a4",
    a3VariantId: "var_neo_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: true,
  },
  {
    id: "prod_2",
    title: "Interstellar Horizon",
    slug: "interstellar-horizon",
    categoryName: "Cinema",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&auto=format&fit=crop&q=80",
    secondaryImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_inter_a4",
    a3VariantId: "var_inter_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: true,
  },
  {
    id: "prod_3",
    title: "Bauhaus Exhibition 1923",
    slug: "bauhaus-exhibition-1923",
    categoryName: "Minimal Art",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000&auto=format&fit=crop&q=80",
    secondaryImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_bau_a4",
    a3VariantId: "var_bau_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: true,
  },
  {
    id: "prod_4",
    title: "Monza 1967 Grand Prix",
    slug: "monza-1967-vintage-grand-prix",
    categoryName: "Automotive",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_monza_a4",
    a3VariantId: "var_monza_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: true,
  },
  {
    id: "prod_5",
    title: "Compound Interest & Daily Grit",
    slug: "compound-interest-daily-grit",
    categoryName: "Motivational",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_grit_a4",
    a3VariantId: "var_grit_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: false,
  },
  {
    id: "prod_6",
    title: "Misty Pacific Coast Pines",
    slug: "misty-pacific-coast-pines",
    categoryName: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_pines_a4",
    a3VariantId: "var_pines_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: true,
  },
  {
    id: "prod_7",
    title: "Kind of Blue: Quintet",
    slug: "kind-of-blue-miles-quintet",
    categoryName: "Music",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_jazz_a4",
    a3VariantId: "var_jazz_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: false,
  },
  {
    id: "prod_8",
    title: "New York Iron & Steam",
    slug: "new-york-iron-and-steam",
    categoryName: "Travel",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000&auto=format&fit=crop&q=80",
    a4VariantId: "var_ny_a4",
    a3VariantId: "var_ny_a3",
    a4PricePaise: 7000,
    a3PricePaise: 12000,
    isFeatured: true,
  },
];

const categories = [
  { name: "Anime & Manga", slug: "anime", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80" },
  { name: "Cinema & Cult", slug: "movies", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80" },
  { name: "Minimalist Art", slug: "minimal-art", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80" },
  { name: "Motivational", slug: "motivational", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80" },
  { name: "Automotive", slug: "cars", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80" },
  { name: "Music", slug: "music", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80" },
  { name: "Travel", slug: "travel", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80" },
  { name: "Nature", slug: "nature", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80" },
];

export default async function HomePage() {
  // Attempt to load live products from DB if available
  let featuredProducts = fallbackProducts;
  try {
    const dbProducts = await withDbTimeout(
      prisma.product.findMany({
        where: { isActive: true, isCustomBase: false },
        include: { category: true, variants: true },
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
      800
    );

    if (dbProducts.length >= 4) {
      featuredProducts = dbProducts.map((p) => {
        const a4Var = p.variants.find((v) => v.size === "A4") || p.variants[0];
        const a3Var = p.variants.find((v) => v.size === "A3") || p.variants[p.variants.length - 1];
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          categoryName: p.category.name,
          categorySlug: p.category.slug,
          imageUrl: p.images[0] || fallbackProducts[0].imageUrl,
          secondaryImageUrl: p.images[1],
          a4VariantId: a4Var ? a4Var.id : `a4_${p.id}`,
          a3VariantId: a3Var ? a3Var.id : `a3_${p.id}`,
          a4PricePaise: a4Var ? a4Var.pricePaise : 7000,
          a3PricePaise: a3Var ? a3Var.pricePaise : 12000,
          isFeatured: p.isFeatured,
        };
      });
    }
  } catch {
    // Graceful fallback to static curation during offline build
  }

  return (
    <div className="flex flex-col">
      {/* 1. Left-aligned Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-block rounded border border-[#DDD7CC] bg-white px-3 py-1 text-xs font-semibold tracking-wide uppercase text-[#C8501E]">
              Camino Print Editions
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-6xl sm:leading-[1.1]">
              Posters for the wall you actually look at.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#6B665E] leading-relaxed">
              Printed on heavyweight 300 GSM archival stock in exact A4 and A3 dimensions.
              Handcrafted in India, packed in rigid tubes, and available with Cash on Delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded bg-[#1A1A1A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#C8501E]"
              >
                Shop Posters
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center rounded border border-[#1A1A1A] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#C8501E] hover:text-[#C8501E]"
              >
                <Palette className="mr-2 h-4 w-4 text-[#C8501E]" />
                Make Your Own
              </Link>
            </div>

            {/* Factual Highlights */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#DDD7CC] pt-8 text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">₹70</p>
                <p className="text-xs uppercase tracking-wider text-[#6B665E]">A4 (210×297mm)</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">₹120</p>
                <p className="text-xs uppercase tracking-wider text-[#6B665E]">A3 (297×420mm)</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">300 GSM</p>
                <p className="text-xs uppercase tracking-wider text-[#6B665E]">Heavy Paper</p>
              </div>
            </div>
          </div>

          {/* Large Hero Poster on Wall Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded border border-[#DDD7CC] bg-white p-4 shadow-sm">
              <div className="relative aspect-[1/1.3] overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                <Image
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80"
                  alt="Curated A3 Art Print framed on a minimalist concrete wall"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute bottom-3 left-3 rounded bg-white/95 px-2.5 py-1 text-[11px] font-medium text-[#1A1A1A] border border-[#DDD7CC]">
                  A3 Print • ₹120 • Ships Rolled
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Strip */}
      <section className="border-y border-[#DDD7CC] bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Browse by Category</h2>
            <Link href="/shop" className="text-xs font-semibold uppercase tracking-wider text-[#C8501E] hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#DDD7CC] group-hover:border-[#C8501E] transition-colors">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-110"
                    sizes="80px"
                  />
                </div>
                <span className="mt-2 text-xs font-medium text-[#1A1A1A] group-hover:text-[#C8501E] transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Posters (Uneven / Masonry Grid) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-[#DDD7CC] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
              Curated Selection
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              Featured Wall Posters
            </h2>
          </div>
          <Link href="/shop" className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8501E]">
            Shop All Prints ({featuredProducts.length}+) →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* 4. "Make it Yours" Custom Poster Builder Teaser */}
      <section className="border-y border-[#DDD7CC] bg-[#EFECE5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
                Personalized Printing
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                Make it yours. Upload & print any artwork.
              </h2>
              <p className="mt-4 text-base text-[#6B665E] leading-relaxed">
                Whether it is your vacation shot, custom digital illustration, or anime artwork — our custom builder checks your resolution and crops to precise A-series ratios so your print comes out razor sharp.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-xs font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Upload any high-res image</h4>
                    <p className="text-xs text-[#6B665E]">Supports JPG, PNG, WEBP files up to 15 MB.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-xs font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Crop to exact A4 or A3 ratio</h4>
                    <p className="text-xs text-[#6B665E]">Interactive cropper with real-time DPI print quality badge.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-xs font-bold text-white">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Printed on 300 GSM Archival Paper</h4>
                    <p className="text-xs text-[#6B665E]">A4 at ₹70 and A3 at ₹120. Shipped rolled in kraft tubes.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/custom"
                  className="inline-flex items-center rounded bg-[#C8501E] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B34416]"
                >
                  Start Custom Design
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Custom Before/After Visual */}
            <div className="lg:col-span-6">
              <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B665E] mb-2">
                      Original Image
                    </p>
                    <div className="relative aspect-[3/4] overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                      <Image
                        src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
                        alt="Uncropped customer artwork"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 250px"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C8501E] mb-2">
                      A3 Print Mockup (1:1.414)
                    </p>
                    <div className="relative aspect-[1/1.414] overflow-hidden rounded border-2 border-[#1A1A1A] bg-white p-1">
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
                          alt="Cropped A3 poster ready for print"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 250px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[#6B665E] border-t border-[#DDD7CC] pt-3">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="h-4 w-4" /> 300 DPI Print-Ready Check Passed
                  </span>
                  <span className="font-semibold text-[#1A1A1A]">₹120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Size Guide Visualizer */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
            Dimensions & Proportions
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A]">
            A4 vs A3 Size Comparison
          </h2>
          <p className="mt-2 text-sm text-[#6B665E]">
            Both sizes follow the international ISO 216 aspect ratio (1:1.414), meaning your prints never look stretched or distorted.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* A4 Card */}
          <div className="rounded border border-[#DDD7CC] bg-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <span className="rounded bg-[#F6F3EE] px-2.5 py-1 text-xs font-bold text-[#1A1A1A]">A4 Format</span>
                <span className="font-serif text-xl font-bold text-[#C8501E]">₹70</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">210 × 297 mm</h3>
              <p className="text-xs text-[#6B665E]">8.3 × 11.7 inches</p>
              <p className="mt-4 text-sm text-[#6B665E] leading-relaxed">
                Ideal for gallery clusters, study desks, pinboards, and dorm walls. Fits into readily available standard photo frames.
              </p>
            </div>
            <div className="mt-8 border-t border-[#DDD7CC] pt-4 text-xs text-[#6B665E]">
              Printed on 300 GSM Archival Cardstock
            </div>
          </div>

          {/* A3 Card */}
          <div className="rounded border border-[#DDD7CC] bg-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <span className="rounded bg-[#1A1A1A] px-2.5 py-1 text-xs font-bold text-white">A3 Format (Double A4)</span>
                <span className="font-serif text-xl font-bold text-[#C8501E]">₹120</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">297 × 420 mm</h3>
              <p className="text-xs text-[#6B665E]">11.7 × 16.5 inches</p>
              <p className="mt-4 text-sm text-[#6B665E] leading-relaxed">
                The statement centerpiece size. Best displayed above sofas, beds, studio workstations, or as single focal wall art.
              </p>
            </div>
            <div className="mt-8 border-t border-[#DDD7CC] pt-4 text-xs text-[#6B665E]">
              Printed on 300 GSM Archival Cardstock
            </div>
          </div>
        </div>
      </section>

      {/* 6. Factual Quality Details */}
      <section className="border-t border-[#DDD7CC] bg-[#F6F3EE] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded border border-[#DDD7CC] bg-white p-6">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">300 GSM</span>
              <h4 className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Heavyweight Paper
              </h4>
              <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
                We use thick, non-curling 300 GSM archival stock that feels substantial in hands and resists ambient room moisture.
              </p>
            </div>

            <div className="rounded border border-[#DDD7CC] bg-white p-6">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">300 DPI</span>
              <h4 className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                High-Density Pigment Print
              </h4>
              <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
                Deep black levels, true saturated colors, and crisp typographic details with zero pixelation or halftone artifacts.
              </p>
            </div>

            <div className="rounded border border-[#DDD7CC] bg-white p-6">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">2 mm Kraft</span>
              <h4 className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Crush-Proof Tube Delivery
              </h4>
              <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
                Every poster is wrapped in protective acid-free glassine paper and shipped in 2mm thick rigid cylindrical kraft tubes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
