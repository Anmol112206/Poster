import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { getUserOrders } from "@/actions/order";
import { formatINR } from "@/lib/utils";
import { Package, Truck, ArrowRight, ShoppingBag } from "lucide-react";

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const orders = await getUserOrders();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Account Navigation Tabs */}
      <div className="border-b border-[#DDD7CC] pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            My Orders
          </h1>
          <p className="mt-1 text-sm text-[#6B665E]">
            Account: {session.user.name} ({session.user.email})
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/account/orders"
            className="rounded bg-[#1A1A1A] px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            Orders
          </Link>
          <Link
            href="/account/profile"
            className="rounded border border-[#DDD7CC] bg-white px-3.5 py-1.5 text-xs font-medium text-[#1A1A1A] hover:bg-[#F6F3EE]"
          >
            Profile
          </Link>
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-8 space-y-6">
        {orders.length === 0 ? (
          <div className="rounded border border-[#DDD7CC] bg-white p-12 text-center shadow-xs">
            <Package className="mx-auto h-12 w-12 text-[#DDD7CC]" />
            <h3 className="mt-4 font-serif text-xl font-bold text-[#1A1A1A]">No orders placed yet</h3>
            <p className="mt-1 text-sm text-[#6B665E]">
              When you place an order, its tracking details and delivery timeline will appear here.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center rounded bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
            >
              Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#DDD7CC] pb-4 gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                    {order.orderNumber}
                  </span>
                  <p className="text-xs text-[#6B665E]">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold">
                    {order.status}
                  </span>
                  <span className="font-serif text-base font-bold text-[#1A1A1A]">
                    {formatINR(order.totalPaise)}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="divide-y divide-[#DDD7CC]/60 mt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="relative h-16 w-12 shrink-0 rounded border border-[#DDD7CC] bg-[#ECE7DE] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.productTitle}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-semibold text-[#1A1A1A]">{item.productTitle}</h4>
                      <p className="text-[#6B665E]">{item.variantLabel}</p>
                      <p className="text-[#6B665E]">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      {formatINR(item.unitPricePaise * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-[#DDD7CC] pt-3 flex justify-between items-center text-xs text-[#6B665E]">
                <span>Payment: Cash on Delivery ({order.paymentStatus})</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <Truck className="h-3.5 w-3.5" /> 300 GSM Archival Tube Packaging
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
