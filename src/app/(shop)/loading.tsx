import { Loader2 } from "lucide-react";

export default function GeneralShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 text-[#C8501E] animate-spin" />
        <p className="font-serif text-lg font-semibold text-[#1A1A1A]">
          Loading Cammino Editions...
        </p>
        <p className="text-xs text-[#6B665E]">
          Preparing archival prints and specifications
        </p>
      </div>
    </div>
  );
}

