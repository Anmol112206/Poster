"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function SyncCloudinaryButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const handleSync = async () => {
    setIsSyncing(true);
    const toastId = toast.loading("Syncing newly uploaded photos from Cloudinary...");

    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Synced ${data.totalSynced} posters across ${data.categoriesSynced.length} categories!`, {
          id: toastId,
        });
        router.refresh();
      } else {
        toast.error(data.error || "Failed to sync photos from Cloudinary", { id: toastId });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sync network error";
      toast.error(msg, { id: toastId });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSync}
      disabled={isSyncing}
      id="sync-cloudinary-btn"
      className="inline-flex items-center gap-1.5 rounded bg-[#C8501E] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#B34416] transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
    >
      <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
      <span>{isSyncing ? "Syncing..." : "Sync from Cloudinary"}</span>
    </button>
  );
}

