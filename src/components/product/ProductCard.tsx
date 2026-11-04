"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  catalogCode?: string;
  categoryName?: string;
  categorySlug?: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  a4VariantId: string;
  a3VariantId: string;
  a4PricePaise: number;
  a3PricePaise: number;
  tags?: string[];
  isFeatured?: boolean;
}

export default function ProductCard({
  id,
  title,
  slug,
  catalogCode,
  categoryName,
  imageUrl,
  secondaryImageUrl,
  a4VariantId,
  a3VariantId,
  a4PricePaise,
  a3PricePaise,
  tags,
  isFeatured,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<"A4" | "A3">("A4");
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const derivedCode = catalogCode || tags?.find((t) => /^cam-[a-z]{2}-\d{2}$/i.test(t))?.toUpperCase();
  const currentPrice = selectedSize === "A4" ? a4PricePaise : a3PricePaise;
  const currentVariantId = selectedSize === "A4" ? a4VariantId : a3VariantId;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addItem({
      variantId: currentVariantId,
      productId: id,
      productTitle: title,
      productSlug: slug,
      imageUrl: imageUrl,
      size: selectedSize,
      finish: "GLOSS",
      paper: "GSM_300",
      pricePaise: currentPrice,
      quantity: 1,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div
      className="group relative flex flex-col rounded border border-[#DDD7CC] bg-white transition-all duration-200 hover:border-[#1A1A1A] hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image Container (A-Series Aspect Ratio 1 : 1.414) */}
      <Link href={`/product/${slug}`} className="relative aspect-[1/1.414] w-full overflow-hidden rounded-t bg-[#ECE7DE] block">
        <Image
          src={isHovered && secondaryImageUrl ? secondaryImageUrl : imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-102"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {isFeatured ? (
            <span className="rounded bg-[#1A1A1A] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs">
              Featured
            </span>
          ) : (
            <span />
          )}

          {derivedCode && (
            <span className="rounded bg-[#1A1A1A]/85 backdrop-blur-xs px-2 py-0.5 font-mono text-[10px] font-bold text-white border border-white/20 shadow-xs">
              {derivedCode}
            </span>
          )}
        </div>

        {categoryName && (
          <span className="absolute bottom-2.5 left-2.5 rounded bg-white/95 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#1A1A1A] border border-[#DDD7CC]">
            {categoryName}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link href={`/product/${slug}`} className="flex-1">
              <h3 className="font-serif text-base font-semibold text-[#1A1A1A] group-hover:text-[#C8501E] transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
          </div>

          <p className="mt-1 text-[11px] text-[#6B665E] font-medium">
            300 GSM Archival • Vibrant Gloss
          </p>

          {/* Size Pills */}
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <div className="flex rounded border border-[#DDD7CC] p-0.5">
              <button
                id={`size-toggle-a4-${id}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize("A4");
                }}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                  selectedSize === "A4"
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#6B665E] hover:text-[#1A1A1A]"
                }`}
              >
                A4 (₹39)
              </button>
              <button
                id={`size-toggle-a3-${id}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedSize("A3");
                }}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                  selectedSize === "A3"
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#6B665E] hover:text-[#1A1A1A]"
                }`}
              >
                A3 (₹79)
              </button>
            </div>

            <span className="font-semibold text-sm text-[#1A1A1A]">
              {formatINR(currentPrice)}
            </span>
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          id={`add-to-cart-btn-${id}`}
          type="button"
          onClick={handleQuickAdd}
          disabled={isAdding}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded bg-[#F6F3EE] border border-[#DDD7CC] py-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] transition-colors duration-150 hover:bg-[#1A1A1A] hover:text-white"
        >
          {isAdding ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add {selectedSize} to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
