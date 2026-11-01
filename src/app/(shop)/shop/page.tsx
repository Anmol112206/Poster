import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getCatalogProducts } from "@/lib/products";
import { shopQuerySchema } from "@/lib/validators/shop";
import { RotateCcw, Package } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORIES = [
  { label: "All Categories", slug: "" },
  { label: "Sports", slug: "sports" },
  { label: "God", slug: "god" },
  { label: "Anime", slug: "anime" },
  { label: "Marvel", slug: "marvel" },
  { label: "Motivation", slug: "motivation" },
];

export default async function ShopPage(props: ShopPageProps) {
  const rawParams = await props.searchParams;

  const parsed = shopQuerySchema.safeParse({
    q: "",
    category: typeof rawParams.category === "string" ? rawParams.category : "",
    size: "ALL",
    sort: "newest",
    page: typeof rawParams.page === "string" ? Number(rawParams.page) : 1,
  });

  const query = parsed.success
    ? parsed.data
    : { q: "", category: "", size: "ALL" as const, sort: "newest" as const, page: 1, minPrice: 0, maxPrice: 20000, finish: "ALL" as const };

  const products = await getCatalogProducts(query);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb & Header */}
      <div className="border-b border-[#DDD7CC] pb-6">
        <div className="text-xs text-[#6B665E] flex items-center gap-1.5 mb-2">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1A1A1A]">Shop</Link>
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
              Showing {products.length} prints • A4 (₹49) & A3 (₹99) • Printed on 300 GSM Archival stock
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Bar + Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Active Filter Chips */}
          {query.category && (
            <div className="rounded border border-[#DDD7CC] bg-white p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1A1A1A]">
                <span>Active Filter</span>
                <Link href="/shop" className="text-[#C8501E] hover:underline flex items-center gap-1">
                  <RotateCcw className="h-3 w-3" /> Reset
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded bg-[#F6F3EE] border border-[#DDD7CC] px-2 py-0.5 text-[11px] text-[#1A1A1A]">
                  Category: {query.category}
                </span>
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
                const href = cat.slug ? `/shop?category=${cat.slug}` : "/shop";

                return (
                  <li key={cat.slug || "all"}>
                    <Link
                      href={href}
                      className={`flex items-center justify-between py-1.5 px-2.5 rounded transition-colors ${
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
              <Package className="mx-auto h-12 w-12 text-[#DDD7CC]" />
              <h3 className="mt-4 font-serif text-xl font-bold text-[#1A1A1A]">No posters found</h3>
              <p className="mt-2 text-sm text-[#6B665E]">
                We couldn&apos;t find any prints in this category.
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
