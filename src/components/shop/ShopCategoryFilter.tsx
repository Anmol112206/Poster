"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CategoryItem {
  label: string;
  slug: string;
}

interface ShopCategoryFilterProps {
  categories: CategoryItem[];
  activeCategorySlug: string;
}

export default function ShopCategoryFilter({
  categories,
  activeCategorySlug,
}: ShopCategoryFilterProps) {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoadingSlug(null);
  }, [searchParams]);

  return (
    <ul className="mt-3 space-y-1.5 text-xs">
      {categories.map((cat) => {
        const isActive = activeCategorySlug.toLowerCase() === cat.slug.toLowerCase();
        const isLoading = loadingSlug === (cat.slug || "all");
        const href = cat.slug ? `/shop?category=${cat.slug}` : "/shop";

        return (
          <li key={cat.slug || "all"}>
            <Link
              href={href}
              onClick={() => {
                if (!isActive) {
                  setLoadingSlug(cat.slug || "all");
                }
              }}
              className={`flex items-center justify-between py-1.5 px-2.5 rounded transition-colors ${
                isActive
                  ? "bg-[#1A1A1A] text-white font-medium shadow-xs"
                  : "text-[#6B665E] hover:bg-[#F6F3EE] hover:text-[#1A1A1A]"
              }`}
            >
              <span>{cat.label}</span>
              {isLoading && (
                <Loader2
                  className={`h-3.5 w-3.5 animate-spin ${
                    isActive ? "text-white" : "text-[#C8501E]"
                  }`}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

