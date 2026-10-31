import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCatalogProducts } from "@/lib/products";
import { formatINR } from "@/lib/utils";
import { ArrowLeft, Package, Plus, Check } from "lucide-react";

export default async function AdminProductsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/?error=forbidden");
  }

  const products = await getCatalogProducts({
    q: "",
    category: "",
    size: "ALL",
    finish: "ALL",
    sort: "newest",
    minPrice: 0,
    maxPrice: 50000,
    page: 1,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#DDD7CC] pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-[#6B665E] hover:text-[#1A1A1A] flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            Catalog Management ({products.length} Posters)
          </h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded bg-[#1A1A1A] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
        >
          <Plus className="h-4 w-4" /> Add New Poster
        </button>
      </div>

      {/* Products Table */}
      <div className="mt-8 rounded border border-[#DDD7CC] bg-white p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#DDD7CC] text-[#6B665E] uppercase tracking-wider">
              <th className="py-3">Artwork</th>
              <th className="py-3">Title & Slug</th>
              <th className="py-3">Category</th>
              <th className="py-3">A4 Price</th>
              <th className="py-3">A3 Price</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDD7CC]">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[#F6F3EE]">
                <td className="py-3">
                  <div className="relative h-14 w-10 overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </td>
                <td className="py-3">
                  <p className="font-serif font-bold text-sm text-[#1A1A1A]">{p.title}</p>
                  <p className="font-mono text-[11px] text-[#6B665E]">/{p.slug}</p>
                </td>
                <td className="py-3 text-[#1A1A1A] font-medium">{p.categoryName}</td>
                <td className="py-3 font-semibold text-[#1A1A1A]">{formatINR(p.a4PricePaise)}</td>
                <td className="py-3 font-semibold text-[#1A1A1A]">{formatINR(p.a3PricePaise)}</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold">
                    <Check className="h-3 w-3" /> Live in Shop
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
