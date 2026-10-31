"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AppError]:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="rounded-full bg-rose-100 p-3 text-rose-600">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="mt-4 font-serif text-3xl font-bold text-[#1A1A1A]">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-[#6B665E] max-w-md mx-auto">
        An unexpected error occurred while loading this view. You can retry or head back to the main catalog.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center rounded bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded border border-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE]"
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
