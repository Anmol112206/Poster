import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="font-mono text-sm font-bold tracking-widest uppercase text-[#C8501E]">
        404 — Page Not Found
      </span>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
        This poster fell off the wall.
      </h1>
      <p className="mt-3 text-sm text-[#6B665E] max-w-md mx-auto">
        The link you followed may be broken, or the poster print has been retired from our current edition.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center rounded border border-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE] transition-colors"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Browse All Prints
        </Link>
      </div>
    </div>
  );
}
