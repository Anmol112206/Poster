import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProductDetailView from "@/components/product/ProductDetailView";
import ProductCard from "@/components/product/ProductCard";
import { getProductBySlug, getRelatedProducts, staticCatalog } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Poster Not Found — Cammino",
    };
  }

  const printSummary = `${product.title} (${product.catalogCode || "Archival Print"}) — Premium A4 & A3 wall poster printed on 300 GSM stock.`;

  return {
    title: `${product.title} (${product.catalogCode}) — Cammino Wall Poster Print`,
    description: printSummary,
    openGraph: {
      title: `${product.title} • ${product.catalogCode}`,
      description: printSummary,
      images: [
        {
          url: product.images[0] || "",
          width: 800,
          height: 1131,
          alt: product.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return staticCatalog.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.slug, product.categorySlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#6B665E] flex items-center gap-1.5 mb-8">
        <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#1A1A1A]">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-[#1A1A1A]">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A] font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Interactive Product Detail */}
      <ProductDetailView product={product} />

      {/* "You May Also Like" Related Products Row */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-[#DDD7CC] pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
                Similar Vibes
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1A1A1A]">
                You May Also Like
              </h2>
            </div>
            <Link
              href={`/shop?category=${product.categorySlug}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8501E]"
            >
              More in {product.categoryName} →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                imageUrl={p.images[0]}
                secondaryImageUrl={p.images[1]}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
