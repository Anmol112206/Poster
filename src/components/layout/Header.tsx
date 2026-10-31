"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Palette,
  Compass,
  Package,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { itemCount, openCart } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DDD7CC] bg-[#F6F3EE]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
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
            Camino
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[#1A1A1A] lg:flex">
            <Link href="/shop" className="transition-colors hover:text-[#C8501E]">
              Shop Posters
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center gap-1.5 text-[#C8501E] font-semibold transition-colors hover:text-[#B34416]"
            >
              <Palette className="h-4 w-4" />
              Custom Poster
            </Link>
            <Link href="/shop?category=anime" className="transition-colors hover:text-[#C8501E]">
              Anime
            </Link>
            <Link href="/shop?category=movies" className="transition-colors hover:text-[#C8501E]">
              Cinema
            </Link>
            <Link href="/shop?category=minimal-art" className="transition-colors hover:text-[#C8501E]">
              Minimal
            </Link>
          </nav>
        </div>

        {/* Right Actions: Search, Login / Account, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  id="header-search-input"
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posters, anime, cinema..."
                  className="w-48 rounded border border-[#1A1A1A] bg-white px-3 py-1.5 text-xs text-[#1A1A1A] outline-none sm:w-64"
                />
                <button
                  type="submit"
                  className="ml-1 p-1.5 text-[#1A1A1A] hover:text-[#C8501E]"
                  aria-label="Submit search"
                >
                  <Search className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-[#6B665E] hover:text-[#1A1A1A]"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                id="header-search-btn"
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 rounded p-2 text-[#1A1A1A] hover:bg-[#EAE5DC] transition-colors"
                aria-label="Open search"
                title="Search posters"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

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
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C8501E]"
            >
              All Wall Posters
            </Link>
            <Link
              href="/custom"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#C8501E] font-semibold flex items-center gap-2"
            >
              <Palette className="h-4 w-4" />
              Design Custom Poster
            </Link>
            <div className="border-t border-[#DDD7CC] pt-4 text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
              Featured Categories
            </div>
            <Link
              href="/shop?category=anime"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm pl-2 hover:text-[#C8501E]"
            >
              Anime & Manga
            </Link>
            <Link
              href="/shop?category=movies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm pl-2 hover:text-[#C8501E]"
            >
              Cinema & Cult Films
            </Link>
            <Link
              href="/shop?category=minimal-art"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm pl-2 hover:text-[#C8501E]"
            >
              Minimalist Art
            </Link>
            <Link
              href="/shop?category=motivational"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm pl-2 hover:text-[#C8501E]"
            >
              Motivational & Typography
            </Link>
            <Link
              href="/shop?category=cars"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm pl-2 hover:text-[#C8501E]"
            >
              Automotive & Speed
            </Link>
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
