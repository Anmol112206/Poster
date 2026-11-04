"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or searchParams change, navigation has completed
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept clicks on links across the document to start progress instantly
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      // Only handle internal links without new tab
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        (!target || target === "_self") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        // If clicking current exact URL, ignore
        const currentUrl = window.location.pathname + window.location.search;
        if (href === currentUrl) return;

        setLoading(true);
        setProgress(25);

        // Gradually increment to simulate active loading
        const timer1 = setTimeout(() => setProgress(55), 150);
        const timer2 = setTimeout(() => setProgress(80), 400);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#C8501E] via-[#E26938] to-[#1A1A1A] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(200,80,30,0.8)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}

