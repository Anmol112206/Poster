import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import AppProviders from "@/components/providers/AppProviders";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MiniCart from "@/components/cart/MiniCart";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cammino — Premium A4 & A3 Wall Posters",
  description: "Curated wall posters in A4 and A3 sizes printed on 300 GSM paper. Create your own custom posters with precision cropping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F6F3EE] text-[#1A1A1A] antialiased selection:bg-[#C8501E] selection:text-white">
        <AppProviders>
          <Header />
          <MiniCart />
          <div className="flex-1">{children}</div>
          <Footer />
        </AppProviders>
        <Toaster
          position="bottom-right"
          duration={2000}
          toastOptions={{
            duration: 2000,
            style: {
              background: "#1A1A1A",
              color: "#F6F3EE",
              border: "1px solid #333333",
              borderRadius: "4px",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
