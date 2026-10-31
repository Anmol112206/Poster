import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#DDD7CC] bg-[#EFECE5] text-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A]">
              Camino
            </Link>
            <p className="mt-3 max-w-sm text-sm text-[#6B665E] leading-relaxed">
              Archival wall art and custom prints for desks, rooms, and studios.
              Printed on heavyweight 300 GSM paper and shipped rolled in rigid protective tubes.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6B665E]">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
              <span>Printed & Dispatched from IIT Patna, Bihar • Shipped across India</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#1A1A1A]">
              Collections
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#6B665E]">
              <li>
                <Link href="/shop" className="hover:text-[#C8501E] transition-colors">
                  All Posters
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-[#C8501E] font-medium hover:underline">
                  Custom Poster Builder
                </Link>
              </li>
              <li>
                <Link href="/shop?category=anime" className="hover:text-[#C8501E] transition-colors">
                  Anime & Manga
                </Link>
              </li>
              <li>
                <Link href="/shop?category=movies" className="hover:text-[#C8501E] transition-colors">
                  Cinema & Cult
                </Link>
              </li>
              <li>
                <Link href="/shop?category=minimal-art" className="hover:text-[#C8501E] transition-colors">
                  Minimalist Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#1A1A1A]">
              Assistance
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#6B665E]">
              <li>
                <Link href="/size-guide" className="hover:text-[#C8501E] transition-colors">
                  A4 vs A3 Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#C8501E] transition-colors">
                  Shipping & Packaging
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C8501E] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C8501E] transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#1A1A1A]">
              Standards
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#6B665E]">
              <li>
                <span className="text-xs text-[#6B665E] block">Sizes: 210×297 & 297×420 mm</span>
              </li>
              <li>
                <span className="text-xs text-[#6B665E] block">Paper: 300 GSM Archival</span>
              </li>
              <li>
                <span className="text-xs text-[#6B665E] block">Payment: Cash on Delivery</span>
              </li>
              <li className="pt-2">
                <Link href="/terms" className="text-xs text-[#6B665E] hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-[#6B665E] hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#DDD7CC] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B665E] gap-4">
          <p>© {new Date().getFullYear()} Camino Editions. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>Prices in INR (₹)</span>
            <span>•</span>
            <span>No plastic packaging used</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
