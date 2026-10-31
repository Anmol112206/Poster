"use client";

import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Upload,
  RotateCw,
  ZoomIn,
  Check,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Maximize2,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { calculateDPI, getDPIQuality, formatINR } from "@/lib/utils";
import { SAMPLE_ARTWORKS } from "@/lib/sampleArtwork";
import { toast } from "sonner";

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CustomPosterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { addItem } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageDims, setImageDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Custom Options
  const [size, setSize] = useState<"A4" | "A3">("A4");
  const finish = "GLOSS" as const;
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [borderStyle, setBorderStyle] = useState<"none" | "thin" | "thick">("none");
  const [caption, setCaption] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [blurAcknowledged, setBlurAcknowledged] = useState(false);

  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // A-Series Ratio is 1 : 1.414 (Portrait) or 1.414 : 1 (Landscape)
  const aspect = orientation === "portrait" ? 1 / 1.414 : 1.414 / 1;

  // Common File Processor
  const processFile = (file: File) => {
    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 15 MB.");
      return;
    }

    // Validate type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);

      // Detect dimensions
      const img = new window.Image();
      img.onload = () => {
        setImageDims({ width: img.width || 2000, height: img.height || 2800 });
        setOrientation((img.width || 2000) > (img.height || 2800) ? "landscape" : "portrait");
        setStep(2);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Sample Artwork Loader (Instant, 0-network, CORS-safe)
  const loadSampleImage = (dataUrl: string, width = 2400, height = 3400) => {
    setImageSrc(dataUrl);
    setImageDims({ width, height });
    setOrientation(width > height ? "landscape" : "portrait");
    setStep(2);
  };

  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Generate cropped preview
  const handleProceedToPreview = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    // Create canvas to crop
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = new window.Image();
      image.crossOrigin = "anonymous";
      image.src = imageSrc;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      if (ctx) {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        setCroppedImageUrl(dataUrl);
      }
    } catch {
      // Fallback to original
      setCroppedImageUrl(imageSrc);
    }

    setStep(4);
  };

  // Calculate Effective DPI
  const effectiveWidth = croppedAreaPixels ? croppedAreaPixels.width : imageDims.width;
  const effectiveHeight = croppedAreaPixels ? croppedAreaPixels.height : imageDims.height;
  const dpi = calculateDPI(effectiveWidth, effectiveHeight, size);
  const quality = getDPIQuality(dpi);

  const pricePaise = size === "A4" ? 7000 : 12000;

  // Add Custom Poster to Cart (Only when authenticated)
  const handleAddToCart = () => {
    if (!session?.user) {
      toast.error("Please sign in or create an account to order custom prints.");
      router.push("/login?callbackUrl=/custom");
      return;
    }

    if (!rightsConfirmed) {
      toast.error("Please confirm that you own the rights to this image.");
      return;
    }

    if (quality.isWarning && !blurAcknowledged) {
      toast.error("Please acknowledge the print resolution warning before ordering.");
      return;
    }

    const customId = `custom_${Date.now()}`;
    addItem({
      variantId: `CUSTOM_${size}_${finish}_GSM300`,
      productId: "custom-poster",
      productTitle: caption ? `Custom Print: "${caption}"` : `Custom ${size} Wall Poster`,
      productSlug: "custom",
      imageUrl: croppedImageUrl || imageSrc || "",
      size,
      finish,
      paper: "GSM_300",
      pricePaise,
      quantity: 1,
      customDesignId: customId,
      customThumbnail: croppedImageUrl || imageSrc || undefined,
    });

    toast.success("Custom poster added to cart!");
    router.push("/cart");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header & Stepper */}
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
          Studio Tool
        </span>
        <h1 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Custom Wall Poster Builder
        </h1>
        <p className="mt-2 text-sm text-[#6B665E]">
          Upload any artwork or memory. Precision cropped to exact A4 (₹70) & A3 (₹120) dimensions.
        </p>

        {/* Stepper Indicator */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs font-medium">
          {[
            { num: 1, label: "Upload" },
            { num: 2, label: "Crop & Scale" },
            { num: 3, label: "Border & Caption" },
            { num: 4, label: "Wall Preview" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === s.num
                    ? "bg-[#C8501E] text-white"
                    : step > s.num
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-[#DDD7CC] text-[#6B665E]"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span className={step === s.num ? "font-semibold text-[#1A1A1A]" : "text-[#6B665E]"}>
                {s.label}
              </span>
              {s.num < 4 && <span className="text-[#DDD7CC]">/</span>}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: UPLOAD */}
      {step === 1 && (
        <div className="mt-10 rounded border border-[#DDD7CC] bg-white p-8 sm:p-12 text-center shadow-xs">
          <input
            id="poster-file-input"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />

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
            className={`cursor-pointer mx-auto block max-w-xl rounded-lg border-2 border-dashed p-10 transition-colors ${
              isDragging
                ? "border-[#C8501E] bg-[#F6F3EE]"
                : "border-[#DDD7CC] hover:border-[#C8501E] hover:bg-[#F6F3EE]/50"
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-[#6B665E]" />
            <h3 className="mt-4 font-serif text-lg font-bold text-[#1A1A1A]">
              Drop your image here or click to browse
            </h3>
            <p className="mt-1 text-xs text-[#6B665E]">
              Supports JPG, PNG, WEBP files up to 15 MB
            </p>
            <span
              id="select-custom-image-btn"
              className="mt-6 inline-block rounded bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors"
            >
              Select Image File
            </span>
          </label>

          {/* Curated Starter Artworks */}
          <div className="mt-10 border-t border-[#DDD7CC] pt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
              Or start customizing with one of our curated templates:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {SAMPLE_ARTWORKS.map((sample) => (
                <button
                  key={sample.id}
                  id={`sample-artwork-btn-${sample.id}`}
                  type="button"
                  onClick={() => loadSampleImage(sample.dataUrl, sample.width, sample.height)}
                  className="rounded border border-[#DDD7CC] bg-[#F6F3EE] px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-white transition-all shadow-xs"
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: CROP & ADJUST */}
      {step === 2 && imageSrc && (
        <div className="mt-10 rounded border border-[#DDD7CC] bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#DDD7CC] pb-4 gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Crop to Exact A-Series Ratio (1 : 1.414)
              </h3>
              <p className="text-xs text-[#6B665E]">
                Original resolution: {imageDims.width} × {imageDims.height} px
              </p>
            </div>

            {/* Size & Orientation Toggles */}
            <div className="flex items-center gap-3">
              <div className="flex rounded border border-[#DDD7CC] p-0.5">
                <button
                  type="button"
                  onClick={() => setSize("A4")}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    size === "A4" ? "bg-[#1A1A1A] text-white" : "text-[#6B665E]"
                  }`}
                >
                  A4 (₹70)
                </button>
                <button
                  type="button"
                  onClick={() => setSize("A3")}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    size === "A3" ? "bg-[#1A1A1A] text-white" : "text-[#6B665E]"
                  }`}
                >
                  A3 (₹120)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setOrientation(orientation === "portrait" ? "landscape" : "portrait")}
                className="flex items-center gap-1.5 rounded border border-[#DDD7CC] bg-[#F6F3EE] px-3 py-1 text-xs font-medium text-[#1A1A1A] hover:bg-white"
              >
                <RotateCw className="h-3.5 w-3.5" />
                {orientation === "portrait" ? "Portrait" : "Landscape"}
              </button>
            </div>
          </div>

          {/* Interactive Cropper Area */}
          <div className="relative mt-6 h-96 w-full rounded border border-[#DDD7CC] bg-[#1A1A1A] overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Cropper Controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DDD7CC] pt-4">
            <div className="flex items-center gap-3 w-full sm:w-64">
              <ZoomIn className="h-4 w-4 text-[#6B665E]" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-[#6B665E] font-mono">{zoom.toFixed(1)}x</span>
            </div>

            {/* Real-time DPI indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B665E]">Print Quality Check:</span>
              <span className={`rounded border px-2 py-0.5 text-xs font-medium ${quality.color}`}>
                {quality.label} ({dpi} DPI)
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 rounded border border-[#DDD7CC] px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F6F3EE]"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <button
                id="step2-next-btn"
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 rounded bg-[#1A1A1A] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
              >
                Next: Options <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: OPTIONS & CAPTION */}
      {step === 3 && (
        <div className="mt-10 rounded border border-[#DDD7CC] bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
            Finish, Borders & Custom Caption
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left: Finish & Paper Options */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Surface Finish
                </label>
                <div className="mt-2 rounded border border-[#1A1A1A] bg-white p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#1A1A1A]">Premium Vibrant Gloss</p>
                    <p className="text-[11px] text-[#6B665E]">300 GSM Archival Cardstock • Richest black depths & color pop</p>
                  </div>
                  <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                    Included
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Optional Print Margin
                </label>
                <div className="mt-2 flex gap-3">
                  {[
                    { id: "none", label: "Full Bleed (No Border)" },
                    { id: "thin", label: "5mm White Border" },
                    { id: "thick", label: "10mm Gallery Border" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBorderStyle(b.id as "none" | "thin" | "thick")}
                      className={`flex-1 rounded border p-2.5 text-center text-xs ${
                        borderStyle === b.id
                          ? "border-2 border-[#1A1A1A] bg-white font-semibold text-[#1A1A1A]"
                          : "border-[#DDD7CC] bg-[#F6F3EE] text-[#6B665E]"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Caption & Typographic Bottom Tag */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]" htmlFor="caption">
                  Optional Bottom Caption (Max 40 Characters)
                </label>
                <p className="mt-0.5 text-xs text-[#6B665E]">
                  E.g. &quot;Kyoto, October 2026&quot; or &quot;Stay Curious&quot; printed in elegant editorial font.
                </p>
                <input
                  id="caption"
                  type="text"
                  maxLength={40}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Leave empty for art-only print"
                  className="mt-2 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
                <span className="mt-1 block text-right text-[11px] text-[#6B665E]">
                  {caption.length}/40
                </span>
              </div>

              <div className="rounded border border-[#DDD7CC] bg-[#F6F3EE] p-4 text-xs text-[#6B665E] space-y-1">
                <p className="font-semibold text-[#1A1A1A]">Specifications Summary:</p>
                <p>• Size: {size} ({size === "A4" ? "210×297 mm" : "297×420 mm"})</p>
                <p>• Heavyweight 300 GSM Archival Cardstock</p>
                <p>• Total Price: {formatINR(pricePaise)} (All taxes included)</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between border-t border-[#DDD7CC] pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 rounded border border-[#DDD7CC] px-4 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F6F3EE]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Crop
            </button>
            <button
              id="step3-preview-btn"
              type="button"
              onClick={handleProceedToPreview}
              className="flex items-center gap-1.5 rounded bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
            >
              Generate Wall Mockup <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PREVIEW & ADD TO CART */}
      {step === 4 && (
        <div className="mt-10 rounded border border-[#DDD7CC] bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
            Final Wall Mockup & Print Quality Verification
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Visualizer Wall Mockup */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded border border-[#DDD7CC] bg-[#ECE7DE] p-8 flex items-center justify-center overflow-hidden shadow-inner">
                {/* Simulated Wall Poster Frame */}
                <div
                  className={`relative border-4 border-[#1A1A1A] bg-white shadow-xl transition-all ${
                    borderStyle === "thin" ? "p-2" : borderStyle === "thick" ? "p-4" : "p-0.5"
                  } ${orientation === "portrait" ? "h-72 w-52" : "h-52 w-72"}`}
                >
                  <div className="relative h-full w-full overflow-hidden bg-white flex flex-col justify-between">
                    {croppedImageUrl && (
                      <div className="relative flex-1 w-full overflow-hidden">
                        <Image
                          src={croppedImageUrl}
                          alt="Cropped artwork print preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {caption && (
                      <div className="py-1 text-center font-serif text-[10px] tracking-wider uppercase text-[#1A1A1A] border-t border-[#DDD7CC]/50">
                        {caption}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Summary & Checkout Action */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded border border-[#DDD7CC] bg-[#F6F3EE] p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {formatINR(pricePaise)}
                  </span>
                  <span className="rounded bg-[#1A1A1A] text-white px-2.5 py-0.5 text-xs font-bold">
                    {size} Format
                  </span>
                </div>

                <div className="text-xs text-[#6B665E] space-y-1">
                  <p>• Format: {size} ({size === "A4" ? "210×297mm" : "297×420mm"})</p>
                  <p>• Finish: Vibrant Gloss (300 GSM Archival Stock)</p>
                  <p>• Paper: 300 GSM Archival Art Paper</p>
                  <p>• Effective DPI: {dpi} ({quality.label})</p>
                </div>
              </div>

              {/* Resolution Warning checkbox if DPI < 150 */}
              {quality.isWarning && (
                <div className="rounded border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="h-4 w-4" /> Resolution Notice ({dpi} DPI)
                  </div>
                  <p className="mt-1">
                    This image has lower resolution than our recommended 150 DPI for {size}. It may look slightly soft when viewed up close.
                  </p>
                  <label className="mt-2.5 flex items-center gap-2 cursor-pointer font-medium text-[#1A1A1A]">
                    <input
                      type="checkbox"
                      checked={blurAcknowledged}
                      onChange={(e) => setBlurAcknowledged(e.target.checked)}
                      className="rounded"
                    />
                    <span>I understand and wish to proceed with this resolution</span>
                  </label>
                </div>
              )}

              {/* Rights confirmation checkbox */}
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
                    I confirm I own or have permission to print this image. We do not print illegal or defamatory content.
                  </span>
                </label>
              </div>

              {/* Authentication check notice */}
              {!session?.user && (
                <div className="rounded bg-[#EFECE5] p-3 text-xs text-[#6B665E] flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#C8501E] shrink-0" />
                  <span>You will be prompted to sign in when ordering your custom poster.</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1 rounded border border-[#DDD7CC] px-4 py-3 text-xs font-medium text-[#1A1A1A] hover:bg-[#F6F3EE]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  id="add-custom-to-cart-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded bg-[#C8501E] py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#B34416] transition-colors"
                >
                  Add Custom Poster to Cart ({formatINR(pricePaise)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
