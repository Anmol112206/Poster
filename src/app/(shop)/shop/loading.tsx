import { Loader2 } from "lucide-react";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      {/* Header skeleton */}
      <div className="border-b border-[#DDD7CC] pb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 w-12 bg-[#DDD7CC]/60 rounded" />
          <div className="h-3 w-3 bg-[#DDD7CC]/60 rounded-full" />
          <div className="h-3 w-16 bg-[#DDD7CC]/60 rounded" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-[#DDD7CC] rounded" />
            <div className="mt-2 h-4 w-96 bg-[#DDD7CC]/60 rounded" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C8501E]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading prints...</span>
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar skeleton */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded border border-[#DDD7CC] bg-white p-5 space-y-3">
            <div className="h-4 w-24 bg-[#DDD7CC] rounded" />
            <div className="space-y-2 pt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-[#F6F3EE] rounded w-full" />
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid skeleton */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="rounded border border-[#DDD7CC] bg-white p-4 space-y-4"
              >
                <div className="aspect-[3/4] w-full bg-[#ECE7DE] rounded relative overflow-hidden flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-[#DDD7CC] animate-spin" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-[#DDD7CC]/60 rounded" />
                  <div className="h-4 w-4/5 bg-[#DDD7CC] rounded" />
                  <div className="h-4 w-1/3 bg-[#DDD7CC] rounded pt-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

