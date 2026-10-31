"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/actions/subscriber";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const res = await subscribeNewsletter(email);
    setLoading(false);

    if (res.success) {
      setSubscribed(true);
      toast.success(res.data.message);
      setEmail("");
    } else {
      toast.error(res.error.message);
    }
  };

  return (
    <section className="border-t border-[#DDD7CC] bg-[#EFECE5] py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
          Monthly Catalog Drops
        </span>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
          Get notified when new poster prints arrive.
        </h2>
        <p className="mt-3 text-sm text-[#6B665E]">
          We curate small-batch prints every month. No spam, just fresh anime, marvel, sports, and motivational artwork drops.
        </p>

        {subscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 border border-emerald-200">
            <Check className="h-4 w-4" /> Thank you for subscribing to Camino editions.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded border border-[#DDD7CC] bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#C8501E] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
