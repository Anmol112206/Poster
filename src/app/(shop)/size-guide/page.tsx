import Link from "next/link";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";

export const metadata = {
  title: "A4 vs A3 Poster Size Guide — Cammino",
  description: "Detailed dimensions and visual scale comparison for A4 (210×297mm) and A3 (297×420mm) wall posters.",
};

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/shop" className="text-xs font-semibold text-[#6B665E] hover:text-[#1A1A1A] flex items-center gap-1 mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
      </Link>

      <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
        Studio Guide
      </span>
      <h1 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
        A4 vs A3 Poster Size Guide
      </h1>
      <p className="mt-3 text-sm text-[#6B665E] leading-relaxed">
        We print exclusively on ISO 216 standard A-Series sizes (1:1.414 aspect ratio). Here is everything you need to know about dimensions, framing, and choosing the right size for your wall.
      </p>

      {/* Comparison Cards */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded border border-[#DDD7CC] bg-white p-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="rounded bg-[#F6F3EE] px-2.5 py-1 text-xs font-bold text-[#1A1A1A]">
              Compact & Cluster
            </span>
            <span className="font-serif text-2xl font-bold text-[#C8501E]">₹39</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">A4 Format</h2>
          <p className="text-xs font-mono text-[#6B665E]">210 × 297 mm • 8.27 × 11.69 inches</p>

          <p className="text-xs text-[#6B665E] leading-relaxed">
            The standard document proportion. Ideal for hanging in sets of 3 to 6 posters as a gallery wall above your workstation, study desk, or bookshelf.
          </p>

          <ul className="text-xs text-[#1A1A1A] space-y-2 border-t border-[#DDD7CC] pt-4">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Fits any standard A4 certificate frame
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Printed on 300 GSM Archival Cardstock
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Great for pinboards & student dorms
            </li>
          </ul>
        </div>

        <div className="rounded border border-[#DDD7CC] bg-white p-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="rounded bg-[#1A1A1A] text-white px-2.5 py-1 text-xs font-bold">
              Statement Piece
            </span>
            <span className="font-serif text-2xl font-bold text-[#C8501E]">₹59</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">A3 Format</h2>
          <p className="text-xs font-mono text-[#6B665E]">297 × 420 mm • 11.69 × 16.54 inches</p>

          <p className="text-xs text-[#6B665E] leading-relaxed">
            Exactly double the surface area of A4. Built to command attention as a primary wall centerpiece above beds, living room sofas, and studio tables.
          </p>

          <ul className="text-xs text-[#1A1A1A] space-y-2 border-t border-[#DDD7CC] pt-4">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> High visual impact in medium-to-large rooms
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Printed on 300 GSM Archival Cardstock
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Delivered rolled in crush-proof 2mm tubes
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center rounded bg-[#1A1A1A] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
        >
          Browse Posters by Size
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
