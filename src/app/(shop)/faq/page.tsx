import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions — Camino",
  description: "Answers to questions about paper quality, framing, custom poster uploads, and delivery.",
};

const FAQS = [
  {
    q: "Do the posters come with frames?",
    a: "No, all posters are shipped unframed, rolled inside rigid 2mm protective kraft tubes. This prevents glass breakage in transit and allows you to choose frames that match your personal interior decor.",
  },
  {
    q: "What paper do you print on?",
    a: "We print exclusively on heavyweight 300 GSM archival cardstock. It has a substantial, premium feel, does not curl easily, and reproduces deep ink density without bleeding.",
  },
  {
    q: "What is the difference between Gloss and Matte finish?",
    a: "Vibrant Gloss brings out maximum contrast, saturation, and deep cyber/neon black levels. Velvet Matte has an anti-glare, non-reflective finish best suited for brightly lit rooms or direct desk lamps.",
  },
  {
    q: "How does the custom poster tool work?",
    a: "You can upload any photo or digital artwork. Our tool locks your crop to the exact 1:1.414 A-series ratio and automatically checks whether your image has enough resolution (DPI) to look razor-sharp when printed.",
  },
  {
    q: "How does Cash on Delivery (COD) work?",
    a: "Simply place your order without entering any payment details. When your package arrives, you can pay the courier agent in cash or scan their UPI QR code (Google Pay, PhonePe, Paytm).",
  },
  {
    q: "What if my poster gets damaged during transit?",
    a: "If your tube arrives crushed or damaged, send us a photo of the tube and poster within 48 hours via our contact page. We will dispatch an immediate replacement free of charge.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/shop" className="text-xs font-semibold text-[#6B665E] hover:text-[#1A1A1A] flex items-center gap-1 mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
      </Link>

      <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
        Help & Answers
      </span>
      <h1 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 text-sm text-[#6B665E] leading-relaxed">
        Everything you need to know about our prints, sizes, paper stock, and orders.
      </p>

      <div className="mt-10 space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
              {faq.q}
            </h3>
            <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded border border-[#DDD7CC] bg-[#EFECE5] p-6 text-center">
        <h4 className="font-serif text-base font-bold text-[#1A1A1A]">Have a specific question?</h4>
        <p className="mt-1 text-xs text-[#6B665E]">
          Our print studio team is available to assist you with order status or custom resolution checks.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded bg-[#1A1A1A] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
