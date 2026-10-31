import Link from "next/link";
import { Truck, Package, ShieldCheck, Clock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Shipping & Packaging — Camino",
  description: "Packaging standards, delivery timelines, and Cash on Delivery guidelines for Camino poster orders.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/shop" className="text-xs font-semibold text-[#6B665E] hover:text-[#1A1A1A] flex items-center gap-1 mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
      </Link>

      <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
        Delivery Standards
      </span>
      <h1 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
        Shipping & Protective Packaging
      </h1>
      <p className="mt-3 text-sm text-[#6B665E] leading-relaxed">
        Wall posters must arrive in pristine, uncreased condition. Here is how we print, pack, and ship your orders across India.
      </p>

      <div className="mt-10 space-y-6">
        <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Package className="h-5 w-5 text-[#C8501E]" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">2mm Heavy-Wall Kraft Tube Packaging</h2>
          </div>
          <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
            We never fold, crease, or mail posters in flimsy paper envelopes. Every print is carefully hand-rolled with acid-free glassine sheets to prevent ink transfer, then secured inside a 2mm thick cylindrical kraft tube with tight plastic end-caps.
          </p>
        </div>

        <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-[#C8501E]" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Dispatch & Delivery Timelines</h2>
          </div>
          <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
            • Orders are printed, checked for color density, and dispatched within 24 to 48 business hours.<br />
            • Major metros and state capitals: 3 to 4 business days.<br />
            • Tier 2/3 cities and university towns: 4 to 6 business days.
          </p>
        </div>

        <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Truck className="h-5 w-5 text-[#C8501E]" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Shipping Rates & Free Delivery</h2>
          </div>
          <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
            • 100% Free Express Courier Delivery on ALL orders anywhere in India. No minimum purchase required.<br />
            • Zero handling or convenience charges.
          </p>
        </div>

        <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#C8501E]" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Cash on Delivery (COD) Guidelines</h2>
          </div>
          <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
            Cash on Delivery is available with zero convenience fees. When the courier agent arrives at your door, you can pay using exact cash or scan their UPI QR code on the spot.
          </p>
        </div>
      </div>
    </div>
  );
}
