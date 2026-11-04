"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Upload,
  Check,
  ShoppingBag,
  Loader2,
  Lock,
  RefreshCw,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { uploadCustomPosterAction } from "@/actions/custom";
import { toast } from "sonner";

export default function CustomPosterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { addItem } = useCart();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDims, setImageDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  // Custom Options: Size only (A4 or A3)
  const [size, setSize] = useState<"A4" | "A3">("A4");
  const finish = "GLOSS" as const;
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const pricePaise = size === "A4" ? 4900 : 8900;

  // Process selected file
  const processFile = (file: File) => {
    // Validate size (< 25MB)
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 25 MB.");
      return;
    }

    // Validate type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);

      // Detect dimensions
      const img = new window.Image();
      img.onload = () => {
        setImageDims({ width: img.width || 2000, height: img.height || 2800 });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Add Custom Poster to Cart (Uploads directly to Cloudinary)
  const handleAddToCart = async () => {
    if (!imageSrc) {
      toast.error("Please select a photo first.");
      return;
    }

    if (!rightsConfirmed) {
      toast.error("Please confirm that you own or have permission to print this image.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading photo to Cloudinary...");

    try {
      let finalArtworkUrl = "";

      // 1. Primary Strategy: Direct signed upload to Cloudinary (bypasses server payload limits)
      try {
        const signRes = await fetch("/api/upload-sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "camino/custom" }),
        });

        if (signRes.ok) {
          const signData = await signRes.json();
          const formData = new FormData();
          if (selectedFile) {
            formData.append("file", selectedFile);
          } else {
            formData.append("file", imageSrc);
          }
          formData.append("api_key", signData.apiKey);
          formData.append("timestamp", String(signData.timestamp));
          formData.append("signature", signData.signature);
          formData.append("folder", signData.folder);

          const cldRes = await fetch(
            `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (cldRes.ok) {
            const cldData = await cldRes.json();
            if (cldData.secure_url) {
              finalArtworkUrl = cldData.secure_url;
            }
          } else {
            console.warn("Direct Cloudinary upload HTTP error, falling back to server upload");
          }
        }
      } catch (directErr) {
        console.warn("Direct Cloudinary upload failed, falling back to server action:", directErr);
      }

      // 2. Fallback Strategy: Server action upload
      if (!finalArtworkUrl) {
        const uploadRes = await uploadCustomPosterAction(imageSrc);
        if (!uploadRes.success) {
          throw new Error(uploadRes.error.message || "Failed to upload artwork to Cloudinary.");
        }
        finalArtworkUrl = uploadRes.data.url;
      }

      const customId = `custom_${Date.now()}`;

      // 3. Add custom poster with Cloudinary URL to cart
      addItem({
        variantId: `CUSTOM_${size}_${finish}_GSM300`,
        productId: "custom-poster",
        productTitle: `Custom ${size} Wall Poster`,
        productSlug: "custom",
        imageUrl: finalArtworkUrl,
        size,
        finish,
        paper: "GSM_300",
        pricePaise,
        quantity: 1,
        customDesignId: customId,
        customThumbnail: finalArtworkUrl,
      });

      toast.success("Photo uploaded to Cloudinary & added to cart!", { id: toastId });
      router.push("/cart");
    } catch (err: unknown) {
      console.error("[handleAddToCart] Error:", err);
      const msg = err instanceof Error ? err.message : "Something went wrong while saving your poster.";
      toast.error(msg, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
          Direct Print Service
        </span>
        <h1 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Print Your Own Custom Poster
        </h1>
        <p className="mt-2 text-sm text-[#6B665E] max-w-xl mx-auto">
          Upload any photo or illustration. Printed in rich high-chroma ink on 300 GSM archival stock in A4 (₹49) or A3 (₹89).
        </p>
      </div>

      <input
        id="poster-file-input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />

      {/* VIEW 1: UPLOAD BOX (When no image is chosen yet) */}
      {!imageSrc ? (
        <div className="mt-10 rounded border border-[#DDD7CC] bg-white p-8 sm:p-14 text-center shadow-xs">
          <label
            htmlFor="poster-file-input"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
              }
            }}
            className={`cursor-pointer mx-auto block max-w-xl rounded-lg border-2 border-dashed p-12 transition-colors ${
              isDragging
                ? "border-[#C8501E] bg-[#F6F3EE]"
                : "border-[#DDD7CC] hover:border-[#C8501E] hover:bg-[#F6F3EE]/50"
            }`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F6F3EE] border border-[#DDD7CC]">
              <Upload className="h-8 w-8 text-[#C8501E]" />
            </div>
            <h3 className="mt-5 font-serif text-xl font-bold text-[#1A1A1A]">
              Drop your photo here, or click to browse
            </h3>
            <p className="mt-2 text-xs text-[#6B665E]">
              Supports high-resolution JPG, PNG, and WEBP files up to 25 MB
            </p>
            <span
              id="select-custom-image-btn"
              className="mt-6 inline-block rounded bg-[#1A1A1A] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors shadow-xs"
            >
              Choose Photo from Device
            </span>
          </label>

          {/* Value Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#DDD7CC] pt-8 text-center">
            <div className="p-3">
              <p className="font-serif text-lg font-bold text-[#1A1A1A]">300 GSM Archival</p>
              <p className="mt-0.5 text-xs text-[#6B665E]">Ultra-thick cardstock that won&apos;t warp</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-lg font-bold text-[#1A1A1A]">A4 & A3 Formats</p>
              <p className="mt-0.5 text-xs text-[#6B665E]">A4 at ₹49 • A3 at ₹89 (COD available)</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-lg font-bold text-[#1A1A1A]">Cloudinary High-Res</p>
              <p className="mt-0.5 text-xs text-[#6B665E]">Lossless upload direct to print queue</p>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: PHOTO PREVIEW & SIZING */
        <div className="mt-10 rounded border border-[#DDD7CC] bg-white p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            {/* Left Column: Photo Mockup Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[1/1.3] w-full overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE] p-4 flex items-center justify-center shadow-inner">
                <div className="relative h-full w-full overflow-hidden rounded border border-[#1A1A1A]/20 bg-white shadow-md">
                  <Image
                    src={imageSrc}
                    alt="Custom poster preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Photo Meta and Change Button */}
              <div className="flex items-center justify-between text-xs text-[#6B665E] px-1">
                <div>
                  <span className="font-medium text-[#1A1A1A] truncate block max-w-xs">{fileName}</span>
                  {imageDims.width > 0 && (
                    <span>{imageDims.width} × {imageDims.height} px</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded border border-[#DDD7CC] bg-[#F6F3EE] px-3 py-1.5 text-xs font-medium text-[#1A1A1A] hover:bg-white transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>

            {/* Right Column: Size Selector, Specs & Order Action */}
            <div className="lg:col-span-6 space-y-6">
              {/* Size Selector */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Select Print Format
                </span>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSize("A4")}
                    className={`flex flex-col items-start rounded border p-4 transition-all text-left ${
                      size === "A4"
                        ? "border-2 border-[#1A1A1A] bg-white shadow-xs"
                        : "border-[#DDD7CC] bg-[#F6F3EE] hover:border-[#1A1A1A]"
                    }`}
                  >
                    <span className="font-serif text-lg font-bold text-[#1A1A1A]">A4 Format</span>
                    <span className="text-xs text-[#6B665E] mt-0.5">210 × 297 mm • 8.3 × 11.7 in</span>
                    <span className="mt-2 text-sm font-bold text-[#C8501E]">₹49</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSize("A3")}
                    className={`flex flex-col items-start rounded border p-4 transition-all text-left ${
                      size === "A3"
                        ? "border-2 border-[#1A1A1A] bg-white shadow-xs"
                        : "border-[#DDD7CC] bg-[#F6F3EE] hover:border-[#1A1A1A]"
                    }`}
                  >
                    <span className="font-serif text-lg font-bold text-[#1A1A1A]">A3 Format</span>
                    <span className="text-xs text-[#6B665E] mt-0.5">297 × 420 mm • 11.7 × 16.5 in</span>
                    <span className="mt-2 text-sm font-bold text-[#C8501E]">₹89</span>
                  </button>
                </div>
              </div>

              {/* Archival Specification Summary */}
              <div className="rounded border border-[#DDD7CC] bg-[#FAF8F5] p-4 text-xs space-y-2">
                <div className="flex justify-between border-b border-[#DDD7CC] pb-2">
                  <span className="text-[#6B665E]">Paper:</span>
                  <span className="font-medium text-[#1A1A1A]">300 GSM Heavyweight Archival Cardstock</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD7CC] pb-2">
                  <span className="text-[#6B665E]">Finish:</span>
                  <span className="font-medium text-[#1A1A1A]">Premium Vibrant Gloss</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD7CC] pb-2">
                  <span className="text-[#6B665E]">Selected Size:</span>
                  <span className="font-medium text-[#1A1A1A]">{size} ({size === "A4" ? "210×297 mm" : "297×420 mm"})</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-serif text-base font-bold text-[#1A1A1A]">Total Price:</span>
                  <span className="font-serif text-base font-bold text-[#C8501E]">{formatINR(pricePaise)}</span>
                </div>
              </div>

              {/* Rights Confirmation Checkbox */}
              <div className="rounded border border-[#DDD7CC] bg-white p-3.5">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#1A1A1A]">
                  <input
                    id="rights-confirmed-checkbox"
                    type="checkbox"
                    checked={rightsConfirmed}
                    onChange={(e) => setRightsConfirmed(e.target.checked)}
                    className="mt-0.5 rounded text-[#C8501E]"
                  />
                  <span>
                    I confirm I own or have permission to print this photo. We do not print illegal or defamatory content.
                  </span>
                </label>
              </div>

              {/* Authentication check notice */}
              {!session?.user && (
                <div className="rounded bg-[#EFECE5] p-3 text-xs text-[#6B665E] flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#C8501E] shrink-0" />
                  <span>You will be prompted to sign in during checkout.</span>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                id="add-custom-to-cart-btn"
                type="button"
                disabled={isUploading}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#1A1A1A] py-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading photo to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Upload & Add {size} to Cart ({formatINR(pricePaise)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
