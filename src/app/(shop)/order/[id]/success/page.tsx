import Link from "next/link";
import { CheckCircle2, Package, Truck, ArrowRight, Home } from "lucide-react";

interface OrderSuccessProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrderSuccessPage(props: OrderSuccessProps) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const orderNumber = typeof searchParams.num === "string" ? searchParams.num : `WP-${id.slice(0, 8).toUpperCase()}`;

  // Estimate 4 business days ahead
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 4);
  const formattedEst = estDate.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded border border-[#DDD7CC] bg-white p-8 sm:p-12 shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <span className="mt-6 inline-block rounded bg-[#F6F3EE] px-3 py-1 font-mono text-xs font-bold text-[#1A1A1A] border border-[#DDD7CC]">
          Order Number: {orderNumber}
        </span>

        <h1 className="mt-4 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Thank you! Your order is placed.
        </h1>

        <p className="mt-3 text-sm text-[#6B665E] max-w-md mx-auto leading-relaxed">
          We have received your print order. Our studio team is preparing your posters on 300 GSM archival stock.
        </p>

        {/* Factual Timeline */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left border-y border-[#DDD7CC] py-6">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-[#C8501E] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">Estimated Delivery</p>
              <p className="text-sm font-medium text-[#C8501E]">{formattedEst}</p>
              <p className="text-[11px] text-[#6B665E]">Shipped in 2mm rigid kraft tube</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1A1A1A]">Payment on Delivery</p>
              <p className="text-sm font-medium text-[#1A1A1A]">Cash or UPI Accepted</p>
              <p className="text-[11px] text-[#6B665E]">Pay the courier agent upon arrival</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center rounded bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors"
          >
            View in My Orders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded border border-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE] transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
