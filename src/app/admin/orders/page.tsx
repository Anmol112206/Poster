import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";
import { ArrowLeft, Package, Truck, CheckCircle2, ExternalLink } from "lucide-react";

export default async function AdminOrdersPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/?error=forbidden");
  }

  let orders: Array<{
    id: string;
    orderNumber: string;
    totalPaise: number;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: Date;
    user: { name: string | null; email: string };
    items: Array<{ id: string; productTitle: string; variantLabel: string; quantity: number; imageUrl?: string | null }>;
  }> = [];

  try {
    orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // If DB offline, empty array
  }

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
            Order Fulfillment ({orders.length} Orders)
          </h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-8 space-y-4">
        {orders.length === 0 ? (
          <div className="rounded border border-[#DDD7CC] bg-white p-12 text-center text-xs text-[#6B665E]">
            <Package className="mx-auto h-10 w-10 text-[#DDD7CC] mb-2" />
            No customer orders recorded yet.
          </div>
        ) : (
          orders.map((ord) => (
            <div key={ord.id} className="rounded border border-[#DDD7CC] bg-white p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#DDD7CC] pb-3 gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A]">{ord.orderNumber}</span>
                  <span className="text-xs text-[#6B665E] ml-3">
                    Placed by {ord.user?.name} ({ord.user?.email}) on{" "}
                    {new Date(ord.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold">
                    {ord.status}
                  </span>
                  <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                    {formatINR(ord.totalPaise)}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#6B665E] space-y-2">
                {ord.items.map((i) => (
                  <div key={i.id} className="flex items-center justify-between gap-3 p-2 rounded bg-[#FDFBF7] border border-[#DDD7CC]/60">
                    <div className="flex items-center gap-3">
                      {i.imageUrl && (
                        <div className="relative h-12 w-9 rounded overflow-hidden border border-[#DDD7CC] bg-[#ECE7DE] shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={i.imageUrl} alt={i.productTitle} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{i.productTitle}</p>
                        <p className="text-[11px] text-[#6B665E]">{i.variantLabel} × {i.quantity}</p>
                      </div>
                    </div>
                    {i.imageUrl && (
                      <a
                        href={i.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 text-[11px] font-medium text-[#C8501E] border border-[#DDD7CC] hover:border-[#C8501E] transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> Full Print File
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t border-[#DDD7CC]/60 pt-2 flex justify-between items-center text-[11px] text-[#6B665E]">
                <span>Payment: Cash on Delivery ({ord.paymentStatus})</span>
                <span className="text-[#C8501E] font-medium">Ready for Studio Printing & Tube Dispatch</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
