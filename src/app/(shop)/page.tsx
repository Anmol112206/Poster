import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Palette, Layers, Box, CheckCircle2, Star, Sparkles } from "lucide-react";
import HeroCategorySlider from "@/components/home/HeroCategorySlider";

const categories = [
  { name: "Sports", slug: "sports", image: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg" },
  { name: "God", slug: "god", image: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460217/Untitled_design_6.jpg" },
  { name: "Anime", slug: "anime", image: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459551/Untitled_design.jpg" },
  { name: "Marvel", slug: "marvel", image: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459827/Wanda_Maximoff__Scarlet_Witch_wallpaper.jpg" },
  { name: "Motivation", slug: "motivation", image: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463267/Untitled_design_4.jpg" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Left-aligned Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-block rounded border border-[#DDD7CC] bg-white px-3 py-1 text-xs font-semibold tracking-wide uppercase text-[#C8501E]">
              Cammino Print Editions
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-6xl sm:leading-[1.1]">
              Posters for the wall you actually look at.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#6B665E] leading-relaxed">
              Printed on heavyweight 300 GSM archival stock in exact A4 and A3 dimensions.
              Handcrafted in India, packed in rigid tubes, and available with Cash on Delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded bg-[#1A1A1A] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#C8501E]"
              >
                Shop Posters
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center rounded border border-[#1A1A1A] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#C8501E] hover:text-[#C8501E]"
              >
                <Palette className="mr-2 h-4 w-4 text-[#C8501E]" />
                Make Your Own
              </Link>
            </div>

            {/* Factual Highlights */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#DDD7CC] pt-8 text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">₹39</p>
                <p className="text-xs uppercase tracking-wider text-[#6B665E]">A4 (210×297mm)</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">₹79</p>
                <p className="text-xs uppercase tracking-wider text-[#6B665E]">A3 (297×420mm)</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">300 GSM</p>
                <p className="text-xs uppercase tracking-wider text-[#6B665E]">Heavy Paper</p>
              </div>
            </div>
          </div>

          {/* Interactive 5-Slide Category Slider */}
          <div className="lg:col-span-5">
            <HeroCategorySlider />
          </div>
        </div>
      </section>

      {/* 2. Category Strip */}
      <section className="border-y border-[#DDD7CC] bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Browse by Category</h2>
            <Link href="/shop" className="text-xs font-semibold uppercase tracking-wider text-[#C8501E] hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[#DDD7CC] group-hover:border-[#C8501E] transition-colors">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-110"
                    sizes="80px"
                  />
                </div>
                <span className="mt-2 text-xs font-medium text-[#1A1A1A] group-hover:text-[#C8501E] transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Make it Yours" Custom Poster Builder Teaser */}
      <section className="border-y border-[#DDD7CC] bg-[#EFECE5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
                Personalized Printing
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                Make it yours. Upload & print any artwork.
              </h2>
              <p className="mt-4 text-base text-[#6B665E] leading-relaxed">
                Whether it is your vacation shot, custom digital illustration, or anime artwork — our custom builder checks your resolution and crops to precise A-series ratios so your print comes out razor sharp.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-xs font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Upload any high-res image</h4>
                    <p className="text-xs text-[#6B665E]">Supports JPG, PNG, WEBP files up to 15 MB.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-xs font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Crop to exact A4 or A3 ratio</h4>
                    <p className="text-xs text-[#6B665E]">Interactive cropper with real-time DPI print quality badge.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-xs font-bold text-white">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A]">Printed on 300 GSM Archival Paper</h4>
                    <p className="text-xs text-[#6B665E]">A4 at ₹49 and A3 at ₹89. Shipped rolled in kraft tubes.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/custom"
                  className="inline-flex items-center rounded bg-[#C8501E] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#B34416]"
                >
                  Start Custom Design
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Custom Before/After Visual */}
            <div className="lg:col-span-6">
              <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B665E] mb-2">
                      Original Image
                    </p>
                    <div className="relative aspect-[3/4] overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                      <Image
                        src="https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459827/Wanda_Maximoff__Scarlet_Witch_wallpaper.jpg"
                        alt="Uncropped customer artwork"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 250px"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C8501E] mb-2">
                      A3 Print Mockup (1:1.414)
                    </p>
                    <div className="relative aspect-[1/1.414] overflow-hidden rounded border-2 border-[#1A1A1A] bg-white p-1">
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src="https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459827/Wanda_Maximoff__Scarlet_Witch_wallpaper.jpg"
                          alt="Cropped A3 poster ready for print"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 250px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[#6B665E] border-t border-[#DDD7CC] pt-3">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="h-4 w-4" /> 300 DPI Print-Ready Check Passed
                  </span>
                  <span className="font-semibold text-[#1A1A1A]">₹89</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Size Guide Visualizer */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
            Dimensions & Proportions
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A]">
            A4 vs A3 Size Comparison
          </h2>
          <p className="mt-2 text-sm text-[#6B665E]">
            Both sizes follow the international ISO 216 aspect ratio (1:1.414), meaning your prints never look stretched or distorted.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* A4 Card */}
          <div className="rounded border border-[#DDD7CC] bg-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <span className="rounded bg-[#F6F3EE] px-2.5 py-1 text-xs font-bold text-[#1A1A1A]">A4 Format</span>
                <span className="font-serif text-xl font-bold text-[#C8501E]">₹39</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">210 × 297 mm</h3>
              <p className="text-xs text-[#6B665E]">8.3 × 11.7 inches</p>
              <p className="mt-4 text-sm text-[#6B665E] leading-relaxed">
                Ideal for gallery clusters, study desks, pinboards, and dorm walls. Fits into readily available standard photo frames.
              </p>
            </div>
            <div className="mt-8 border-t border-[#DDD7CC] pt-4 text-xs text-[#6B665E]">
              Printed on 300 GSM Archival Cardstock
            </div>
          </div>

          {/* A3 Card */}
          <div className="rounded border border-[#DDD7CC] bg-white p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <span className="rounded bg-[#1A1A1A] px-2.5 py-1 text-xs font-bold text-white">A3 Format (Double A4)</span>
                <span className="font-serif text-xl font-bold text-[#C8501E]">₹79</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">297 × 420 mm</h3>
              <p className="text-xs text-[#6B665E]">11.7 × 16.5 inches</p>
              <p className="mt-4 text-sm text-[#6B665E] leading-relaxed">
                The statement centerpiece size. Best displayed above sofas, beds, studio workstations, or as single focal wall art.
              </p>
            </div>
            <div className="mt-8 border-t border-[#DDD7CC] pt-4 text-xs text-[#6B665E]">
              Printed on 300 GSM Archival Cardstock
            </div>
          </div>
        </div>
      </section>

      {/* 6. Factual Quality Details */}
      <section className="border-t border-[#DDD7CC] bg-[#F6F3EE] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded border border-[#DDD7CC] bg-white p-6">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">300 GSM</span>
              <h4 className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Heavyweight Paper
              </h4>
              <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
                We use thick, non-curling 300 GSM archival stock that feels substantial in hands and resists ambient room moisture.
              </p>
            </div>

            <div className="rounded border border-[#DDD7CC] bg-white p-6">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">300 DPI</span>
              <h4 className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                High-Density Pigment Print
              </h4>
              <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
                Deep black levels, true saturated colors, and crisp typographic details with zero pixelation or halftone artifacts.
              </p>
            </div>

            <div className="rounded border border-[#DDD7CC] bg-white p-6">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">2 mm Kraft</span>
              <h4 className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Crush-Proof Tube Delivery
              </h4>
              <p className="mt-2 text-xs text-[#6B665E] leading-relaxed">
                Every poster is wrapped in protective acid-free glassine paper and shipped in 2mm thick rigid cylindrical kraft tubes.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
