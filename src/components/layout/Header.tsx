"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Palette,
  Package,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  { name: "Sports", slug: "sports" },
  { name: "God", slug: "god" },
  { name: "Anime", slug: "anime" },
  { name: "Marvel", slug: "marvel" },
  { name: "Motivation", slug: "motivation" },
];

function useActiveNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let activeCategory: string | null = null;
  let isShopAll = false;
  let isCustom = false;

  if (pathname === "/custom") {
    isCustom = true;
  } else if (pathname === "/shop") {
    const cat = searchParams.get("category")?.toLowerCase() || null;
    if (cat) {
      activeCategory = cat;
    } else {
      isShopAll = true;
    }
  } else if (pathname.startsWith("/product/")) {
    const slug = pathname.replace("/product/", "").toLowerCase();
    if (slug.startsWith("sports-")) activeCategory = "sports";
    else if (slug.startsWith("god-")) activeCategory = "god";
    else if (slug.startsWith("anime-")) activeCategory = "anime";
    else if (slug.startsWith("marvel-")) activeCategory = "marvel";
    else if (slug.startsWith("motivation-")) activeCategory = "motivation";
  }

  return { activeCategory, isShopAll, isCustom };
}

function DesktopNav() {
  const { activeCategory, isShopAll, isCustom } = useActiveNavigation();

  return (
    <nav className="hidden items-center gap-1.5 text-sm font-medium text-[#1A1A1A] lg:flex">
      <Link
        href="/shop"
        className={`px-3 py-1.5 rounded transition-all ${
          isShopAll
            ? "bg-[#1A1A1A] text-white font-semibold shadow-xs"
            : "text-[#1A1A1A] hover:text-[#C8501E] hover:bg-[#EAE5DC]"
        }`}
      >
        Shop Posters
      </Link>

      <Link
        href="/custom"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all font-semibold ${
          isCustom
            ? "bg-[#C8501E] text-white shadow-xs"
            : "text-[#C8501E] hover:bg-[#EAE5DC]"
        }`}
      >
        <Palette className="h-4 w-4" />
        Custom Poster
      </Link>

      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className={`px-3 py-1.5 rounded transition-all ${
              isActive
                ? "bg-[#1A1A1A] text-white font-semibold shadow-xs"
                : "text-[#1A1A1A] hover:text-[#C8501E] hover:bg-[#EAE5DC]"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileCategoryNav({ onClose }: { onClose: () => void }) {
  const { activeCategory, isShopAll, isCustom } = useActiveNavigation();

  return (
    <div className="flex flex-col space-y-2">
      <Link
        href="/shop"
        onClick={onClose}
        className={`px-3 py-2 rounded text-sm transition-colors ${
          isShopAll
            ? "bg-[#1A1A1A] text-white font-semibold"
            : "text-[#1A1A1A] hover:bg-[#F6F3EE] hover:text-[#C8501E]"
        }`}
      >
        All Wall Posters
      </Link>

      <Link
        href="/custom"
        onClick={onClose}
        className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-colors ${
          isCustom
            ? "bg-[#C8501E] text-white"
            : "text-[#C8501E] hover:bg-[#F6F3EE]"
        }`}
      >
        <Palette className="h-4 w-4" />
        Design Custom Poster
      </Link>

      <div className="border-t border-[#DDD7CC] pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B665E]">
        Categories
      </div>

      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            onClick={onClose}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              isActive
                ? "bg-[#1A1A1A] text-white font-semibold"
                : "text-[#1A1A1A] hover:bg-[#F6F3EE] hover:text-[#C8501E]"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}

export default function Header() {
  const { data: session } = useSession();
  const { itemCount, openCart } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DDD7CC] bg-[#F6F3EE]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu & Desktop Nav */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded p-1.5 text-[#1A1A1A] hover:bg-[#EAE5DC] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
            Cammino
          </Link>

          <Suspense
            fallback={
              <nav className="hidden items-center gap-2 text-sm font-medium text-[#1A1A1A] lg:flex">
                <Link href="/shop" className="px-3 py-1.5">Shop Posters</Link>
                <Link href="/custom" className="px-3 py-1.5 text-[#C8501E]">Custom Poster</Link>
              </nav>
            }
          >
            <DesktopNav />
          </Suspense>
        </div>

        {/* Right Actions: Login / Account, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Account / Login */}
          {session?.user ? (
            <div className="relative">
              <button
                id="header-account-btn"
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-1.5 rounded border border-[#DDD7CC] bg-white px-3 py-1.5 text-xs font-medium text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                aria-label="Account options"
              >
                <User className="h-4 w-4 text-[#C8501E]" />
                <span className="max-w-[100px] truncate">
                  {session.user.name?.split(" ")[0] || "Account"}
                </span>
              </button>

              {accountMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setAccountMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 z-40 mt-2 w-52 rounded border border-[#DDD7CC] bg-white p-2 shadow-lg">
                    <div className="border-b border-[#DDD7CC] px-3 py-2 text-xs">
                      <p className="font-semibold text-[#1A1A1A] truncate">{session.user.name}</p>
                      <p className="text-[#6B665E] truncate">{session.user.email}</p>
                    </div>

                    {session.user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-[#C8501E] hover:bg-[#F6F3EE]"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/account/orders"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded px-3 py-2 text-xs text-[#1A1A1A] hover:bg-[#F6F3EE]"
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>

                    <Link
                      href="/account/profile"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded px-3 py-2 text-xs text-[#1A1A1A] hover:bg-[#F6F3EE]"
                    >
                      <User className="h-4 w-4" />
                      Saved Addresses
                    </Link>

                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              id="header-login-btn"
              href="/login"
              className="flex items-center gap-1.5 rounded border border-[#DDD7CC] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:border-[#1A1A1A] hover:text-[#C8501E] transition-colors"
              title="Sign in to your account"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Cart Trigger */}
          <button
            id="header-cart-btn"
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-1.5 rounded bg-[#1A1A1A] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#C8501E]"
            aria-label={`Open shopping cart with ${itemCount} items`}
            title="Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C8501E] px-1 text-[10px] font-bold text-white border border-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#DDD7CC] bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col space-y-4 text-base font-medium text-[#1A1A1A]">
            <Suspense fallback={null}>
              <MobileCategoryNav onClose={() => setMobileMenuOpen(false)} />
            </Suspense>

            <div className="border-t border-[#DDD7CC] pt-4 flex flex-col gap-2">
              {session?.user ? (
                <>
                  <Link
                    href="/account/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium hover:text-[#C8501E]"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="text-left text-sm font-medium text-rose-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center rounded bg-[#1A1A1A] py-2.5 text-xs font-semibold text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center rounded border border-[#DDD7CC] py-2.5 text-xs font-semibold text-[#1A1A1A]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
