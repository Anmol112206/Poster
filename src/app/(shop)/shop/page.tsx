import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/product/ProductCard";
import { getCatalogProducts } from "@/lib/products";
import { shopQuerySchema } from "@/lib/validators/shop";
import { Filter, Search, RotateCcw } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORIES = [
  { label: "All Categories", slug: "" },
  { label: "Anime & Manga", slug: "anime" },
  { label: "Cinema & Cult", slug: "movies" },
  { label: "Minimalist Art", slug: "minimal-art" },
  { label: "Motivational", slug: "motivational" },
  { label: "Automotive", slug: "cars" },
  { label: "Music & Albums", slug: "music" },
  { label: "Travel & City", slug: "travel" },
  { label: "Nature & Botanical", slug: "nature" },
];

export default async function ShopPage(props: ShopPageProps) {
  const rawParams = await props.searchParams;

  const parsed = shopQuerySchema.safeParse({
    q: typeof rawParams.q === "string" ? rawParams.q : "",
    category: typeof rawParams.category === "string" ? rawParams.category : "",
    size: typeof rawParams.size === "string" ? rawParams.size : "ALL",
    sort: typeof rawParams.sort === "string" ? rawParams.sort : "newest",
    page: typeof rawParams.page === "string" ? Number(rawParams.page) : 1,
  });

  const query = parsed.success ? parsed.data : { q: "", category: "", size: "ALL" as const, sort: "newest" as const, page: 1, minPrice: 0, maxPrice: 20000, finish: "ALL" as const };
  const products = await getCatalogProducts(query);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb & Header */}
      <div className="border-b border-[#DDD7CC] pb-6">
        <div className="text-xs text-[#6B665E] flex items-center gap-1.5 mb-2">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">Shop</span>
          {query.category && (
            <>
              <span>/</span>
              <span className="text-[#C8501E] capitalize">{query.category}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
              {query.category
                ? CATEGORIES.find((c) => c.slug === query.category)?.label || "Curated Prints"
                : "All Wall Posters"}
            </h1>
            <p className="mt-1 text-sm text-[#6B665E]">
              Showing {products.length} prints • A4 (₹70) & A3 (₹120) • Printed on 300 GSM Archival stock
            </p>
          </div>

          {/* Search bar inside page header */}
          <form method="GET" action="/shop" className="relative flex items-center max-w-xs w-full">
            <input
              type="text"
              name="q"
              defaultValue={query.q}
              placeholder="Search by title, anime, movie..."
              className="w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 pr-9 text-xs text-[#1A1A1A] outline-none focus:border-[#C8501E]"
            />
            {query.category && <input type="hidden" name="category" value={query.category} />}
            <button type="submit" className="absolute right-2.5 text-[#6B665E] hover:text-[#1A1A1A]" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Layout: Filters Bar + Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Active Filter Chips */}
          {(query.category || query.q || query.sort !== "newest") && (
            <div className="rounded border border-[#DDD7CC] bg-white p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1A1A1A]">
                <span>Active Filters</span>
                <Link href="/shop" className="text-[#C8501E] hover:underline flex items-center gap-1">
                  <RotateCcw className="h-3 w-3" /> Reset
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {query.category && (
                  <span className="rounded bg-[#F6F3EE] border border-[#DDD7CC] px-2 py-0.5 text-[11px] text-[#1A1A1A]">
                    Category: {query.category}
                  </span>
                )}
                {query.q && (
                  <span className="rounded bg-[#F6F3EE] border border-[#DDD7CC] px-2 py-0.5 text-[11px] text-[#1A1A1A]">
                    Query: &quot;{query.q}&quot;
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Categories Filter */}
          <div className="rounded border border-[#DDD7CC] bg-white p-5">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] border-b border-[#DDD7CC] pb-2">
              Categories
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs">
              {CATEGORIES.map((cat) => {
                const isActive = query.category === cat.slug;
                const nextParams = new URLSearchParams();
                if (cat.slug) nextParams.set("category", cat.slug);
                if (query.q) nextParams.set("q", query.q);
                if (query.sort && query.sort !== "newest") nextParams.set("sort", query.sort);

                return (
                  <li key={cat.slug || "all"}>
                    <Link
                      href={`/shop${nextParams.toString() ? `?${nextParams.toString()}` : ""}`}
                      className={`flex items-center justify-between py-1.5 px-2 rounded transition-colors ${
                        isActive
                          ? "bg-[#1A1A1A] text-white font-medium"
                          : "text-[#6B665E] hover:bg-[#F6F3EE] hover:text-[#1A1A1A]"
                      }`}
                    >
                      <span>{cat.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sort Filter */}
          <div className="rounded border border-[#DDD7CC] bg-white p-5">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] border-b border-[#DDD7CC] pb-2">
              Sort By
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs">
              {[
                { label: "Newest Arrivals", val: "newest" },
                { label: "Price: Low to High", val: "price_asc" },
                { label: "Price: High to Low", val: "price_desc" },
                { label: "Popular Picks", val: "popular" },
              ].map((s) => {
                const isSelected = query.sort === s.val;
                const nextParams = new URLSearchParams();
                if (query.category) nextParams.set("category", query.category);
                if (query.q) nextParams.set("q", query.q);
                nextParams.set("sort", s.val);

                return (
                  <li key={s.val}>
                    <Link
                      href={`/shop?${nextParams.toString()}`}
                      className={`block py-1.5 px-2 rounded transition-colors ${
                        isSelected
                          ? "bg-[#1A1A1A] text-white font-medium"
                          : "text-[#6B665E] hover:bg-[#F6F3EE] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Custom Poster Banner Callout */}
          <div className="rounded border border-[#DDD7CC] bg-[#EFECE5] p-5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C8501E]">
              Custom Art
            </span>
            <h4 className="mt-1 font-serif text-base font-bold text-[#1A1A1A]">
              Want your own photo printed?
            </h4>
            <p className="mt-1.5 text-xs text-[#6B665E] leading-relaxed">
              Upload any digital art, photo, or wallpaper and have it printed in A4 or A3 format.
            </p>
            <Link
              href="/custom"
              className="mt-4 block text-center rounded bg-[#1A1A1A] py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
            >
              Start Custom Design
            </Link>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="rounded border border-[#DDD7CC] bg-white p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-[#DDD7CC]" />
              <h3 className="mt-4 font-serif text-xl font-bold text-[#1A1A1A]">No posters found</h3>
              <p className="mt-2 text-sm text-[#6B665E]">
                We couldn&apos;t find any prints matching &quot;{query.q || query.category}&quot;.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/shop"
                  className="rounded bg-[#1A1A1A] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
                >
                  View All Posters
                </Link>
                <Link
                  href="/custom"
                  className="rounded border border-[#1A1A1A] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE]"
                >
                  Create Custom Print
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  {...p}
                  imageUrl={p.images[0]}
                  secondaryImageUrl={p.images[1]}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
