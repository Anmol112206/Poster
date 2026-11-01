"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  Layers,
  ChevronDown,
  Check,
  Maximize2,
  Box,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { CatalogProduct } from "@/lib/products";
import { toast } from "sonner";

export default function ProductDetailView({ product }: { product: CatalogProduct }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.images[0] || "");
  const [selectedSize, setSelectedSize] = useState<"A4" | "A3">("A4");
  const selectedFinish = "GLOSS" as const;
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState<boolean | null>(null);
  const [visualizerOpen, setVisualizerOpen] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>("print");

  const currentPricePaise = selectedSize === "A4" ? product.a4PricePaise : product.a3PricePaise;
  const currentVariantId = selectedSize === "A4" ? product.a4VariantId : product.a3VariantId;

  const handleAddToCart = () => {
    addItem({
      variantId: currentVariantId,
      productId: product.id,
      productTitle: product.title,
      productSlug: product.slug,
      imageUrl: product.images[0],
      size: selectedSize,
      finish: selectedFinish,
      paper: "GSM_300",
      pricePaise: currentPricePaise,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setPincodeChecked(true);
      toast.success("Delivery available to pincode " + pincode + " (3-5 business days)");
    } else {
      setPincodeChecked(false);
      toast.error("Please enter a valid 6-digit Indian PIN code");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      {/* Left Column: Image Gallery & Wall Visualizer */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main Display Image */}
        <div className="relative aspect-[1/1.3] w-full overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
          <Image
            src={selectedImage}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />

          <button
            type="button"
            onClick={() => setVisualizerOpen(!visualizerOpen)}
            className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded bg-white/95 backdrop-blur-xs px-3 py-1.5 text-xs font-medium text-[#1A1A1A] border border-[#DDD7CC] hover:bg-[#F6F3EE] shadow-sm"
          >
            <Maximize2 className="h-3.5 w-3.5 text-[#C8501E]" />
            {visualizerOpen ? "Close Visualizer" : "View on Desk Wall"}
          </button>
        </div>

        {/* Room / Desk Silhouette Visualizer Mode */}
        {visualizerOpen && (
          <div className="rounded border border-[#DDD7CC] bg-[#ECE7DE] p-8 text-center transition-all">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
              Scale comparison against standard 13-inch Laptop & Work Desk
            </p>
            <div className="mt-6 relative mx-auto h-64 max-w-lg border-b-4 border-[#6B665E] flex items-end justify-center gap-8 pb-1">
              {/* Laptop Silhouette */}
              <div className="w-24 h-16 border-2 border-[#6B665E] bg-white/80 rounded-t flex items-center justify-center text-[10px] text-[#6B665E]">
                13&quot; Laptop
              </div>

              {/* Scaled Poster Silhouette */}
              <div
                className={`relative border-2 border-[#1A1A1A] bg-white transition-all duration-300 overflow-hidden shadow-md flex items-center justify-center ${
                  selectedSize === "A4" ? "w-28 h-40" : "w-40 h-56"
                }`}
              >
                <Image
                  src={selectedImage}
                  alt="Scaled preview"
                  fill
                  className="object-cover opacity-90"
                />
                <span className="absolute bottom-1 bg-[#1A1A1A] text-white text-[9px] px-1 font-mono">
                  {selectedSize} (1:{selectedSize === "A4" ? "1.41" : "1.41"})
                </span>
              </div>

              {/* Coffee Mug */}
              <div className="w-8 h-10 border-2 border-[#6B665E] bg-white/80 rounded-t text-[8px] flex items-center justify-center text-[#6B665E]">
                Mug
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail strip */}
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative h-20 w-16 overflow-hidden rounded border transition-all ${
                  selectedImage === img
                    ? "border-2 border-[#1A1A1A] shadow-sm"
                    : "border-[#DDD7CC] opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Title, Configurator, Add to Cart */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          {/* Identity & Badges */}
          <div className="flex items-center gap-2">
            {product.catalogCode && (
              <span className="rounded bg-[#1A1A1A] text-white px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider">
                {product.catalogCode}
              </span>
            )}
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
              {product.categoryName} Collection
            </span>
            <span className="text-xs text-[#6B665E]">•</span>
            <span className="text-xs text-emerald-700 font-medium">In Stock</span>
          </div>

          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
              {formatINR(currentPricePaise)}
            </span>
            <span className="text-xs text-[#6B665E]">
              {selectedSize} format • All taxes included
            </span>
          </div>

          {/* Archival Specification Card for Discrimination */}
          <div className="mt-5 rounded border border-[#DDD7CC] bg-[#FAF8F5] p-3.5 text-xs space-y-2">
            <div className="flex justify-between border-b border-[#DDD7CC] pb-1.5 font-mono">
              <span className="text-[#6B665E]">Catalog Code:</span>
              <span className="font-bold text-[#1A1A1A]">{product.catalogCode || "CAMMINO-EDITION"}</span>
            </div>
            <div className="flex justify-between border-b border-[#DDD7CC] pb-1.5">
              <span className="text-[#6B665E]">Series:</span>
              <span className="font-medium text-[#1A1A1A]">{product.categoryName} Series Print</span>
            </div>
            <div className="flex justify-between border-b border-[#DDD7CC] pb-1.5">
              <span className="text-[#6B665E]">Paper Weight:</span>
              <span className="font-medium text-[#1A1A1A]">300 GSM Heavyweight Archival Cardstock</span>
            </div>
            <div className="flex justify-between border-b border-[#DDD7CC] pb-1.5">
              <span className="text-[#6B665E]">Surface Finish:</span>
              <span className="font-medium text-[#1A1A1A]">Vibrant High-Chroma Gloss</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B665E]">Aspect Ratio:</span>
              <span className="font-medium text-[#1A1A1A]">ISO 216 Standard (1 : 1.414)</span>
            </div>
          </div>

          <hr className="my-6 border-[#DDD7CC]" />

          {/* Size Selector */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              <span>Choose Size</span>
              <span className="text-[#6B665E]">
                {selectedSize === "A4" ? "210 × 297 mm" : "297 × 420 mm"}
              </span>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedSize("A4")}
                className={`flex flex-col items-start rounded border p-3 transition-colors ${
                  selectedSize === "A4"
                    ? "border-2 border-[#1A1A1A] bg-white shadow-xs"
                    : "border-[#DDD7CC] bg-[#F6F3EE] hover:border-[#1A1A1A]"
                }`}
              >
                <span className="font-serif text-base font-bold text-[#1A1A1A]">A4 Format</span>
                <span className="text-xs text-[#6B665E]">₹49 • 8.3 × 11.7 in</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSize("A3")}
                className={`flex flex-col items-start rounded border p-3 transition-colors ${
                  selectedSize === "A3"
                    ? "border-2 border-[#1A1A1A] bg-white shadow-xs"
                    : "border-[#DDD7CC] bg-[#F6F3EE] hover:border-[#1A1A1A]"
                }`}
              >
                <span className="font-serif text-base font-bold text-[#1A1A1A]">A3 Format</span>
                <span className="text-xs text-[#6B665E]">₹99 • 11.7 × 16.5 in</span>
              </button>
            </div>
          </div>

          {/* Paper & Finish */}
          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Paper & Finish
            </span>
            <div className="mt-2.5 rounded border border-[#1A1A1A] bg-white p-3.5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1A1A1A] block">
                  Premium Vibrant Gloss Finish
                </span>
                <span className="text-[11px] text-[#6B665E]">
                  Heavyweight 300 GSM Archival Cardstock • High-chroma saturated ink & deep blacks
                </span>
              </div>
              <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1">
                Included
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Quantity
            </span>
            <div className="flex items-center rounded border border-[#DDD7CC] bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm text-[#6B665E] hover:text-[#1A1A1A]"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold text-[#1A1A1A]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-3 py-1.5 text-sm text-[#6B665E] hover:text-[#1A1A1A]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-xs text-[#6B665E]">Limit 10 per order</span>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 rounded bg-[#1A1A1A] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#C8501E]"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 rounded border border-[#1A1A1A] py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] transition-colors hover:bg-[#F6F3EE]"
            >
              <Zap className="h-4 w-4 text-[#C8501E]" />
              Buy Now (COD)
            </button>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="mt-8 rounded border border-[#DDD7CC] bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
              <Truck className="h-4 w-4 text-[#C8501E]" />
              <span>Check Delivery Speed (Cash on Delivery Available)</span>
            </div>
            <form onSubmit={checkPincode} className="mt-2.5 flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit PIN code"
                className="flex-1 rounded border border-[#DDD7CC] bg-[#F6F3EE] px-3 py-1.5 text-xs text-[#1A1A1A] outline-none focus:border-[#C8501E]"
              />
              <button
                type="submit"
                className="rounded bg-[#1A1A1A] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
              >
                Check
              </button>
            </form>
            {pincodeChecked === true && (
              <p className="mt-2 text-xs text-emerald-700 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Dispatch in 24 hours. 100% Free Express Delivery across India.
              </p>
            )}
          </div>

          {/* Specifications Accordions */}
          <div className="mt-8 border-t border-[#DDD7CC] divide-y divide-[#DDD7CC]">
            {/* Print Specs */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === "print" ? null : "print")}
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
              >
                <span>Print & Paper Specifications</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openAccordion === "print" ? "rotate-180" : ""}`}
                />
              </button>
              {openAccordion === "print" && (
                <div className="pb-4 text-xs text-[#6B665E] space-y-1.5 leading-relaxed">
                  <p>• Heavyweight 300 GSM Archival Cardstock.</p>
                  <p>• Micro-pigment printing with 300 DPI detail reproduction.</p>
                  <p>• Fade-resistant under normal indoor display lighting.</p>
                </div>
              )}
            </div>

            {/* Packaging */}
            <div>
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === "packaging" ? null : "packaging")}
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
              >
                <span>Packaging & Unboxing</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openAccordion === "packaging" ? "rotate-180" : ""}`}
                />
              </button>
              {openAccordion === "packaging" && (
                <div className="pb-4 text-xs text-[#6B665E] space-y-1.5 leading-relaxed">
                  <p>• Hand-rolled with acid-free glassine sheets to prevent ink scuffs.</p>
                  <p>• Encased in 2mm heavy-wall cylindrical kraft tubes with secure end-caps.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
