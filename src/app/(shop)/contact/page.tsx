"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessageAction } from "@/actions/contact";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendContactMessageAction({ name, email, message });
      if (res.success) {
        setSent(true);
        toast.success("Thank you for your message! Our studio team will respond within 24 hours.");
      } else {
        toast.error(res.error.message || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Failed to connect to support server. Please email support@camino.store directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/shop" className="text-xs font-semibold text-[#6B665E] hover:text-[#1A1A1A] flex items-center gap-1 mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
      </Link>

      <span className="text-xs font-semibold uppercase tracking-wider text-[#C8501E]">
        Get in Touch
      </span>
      <h1 className="mt-1 font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
        Contact Camino Studio
      </h1>
      <p className="mt-3 text-sm text-[#6B665E] leading-relaxed">
        Have questions regarding a custom image crop, bulk dorm order, or courier delivery? We are here to help.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 sm:p-8 shadow-xs">
            {sent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Message Received</h3>
                <p className="text-xs text-[#6B665E]">
                  Thank you, {name}. A member of our print team will reply to {email} shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 rounded bg-[#1A1A1A] px-5 py-2 text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                    Message / Question
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with your wall posters?"
                    className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded bg-[#1A1A1A] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              Studio Location
            </h3>

            <div className="flex items-start gap-3 text-xs text-[#6B665E]">
              <MapPin className="h-4 w-4 text-[#C8501E] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1A1A1A]">Camino Print Studio</p>
                <p>Indian Institute of Technology Patna (IIT Patna)</p>
                <p>Bihta, Patna, Bihar 801106</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-[#6B665E]">
              <Mail className="h-4 w-4 text-[#C8501E] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1A1A1A]">Email Enquiries</p>
                <p>support@camino.store</p>
              </div>
            </div>
          </div>

          <div className="rounded border border-[#DDD7CC] bg-[#EFECE5] p-5 text-xs text-[#6B665E] space-y-1.5">
            <p className="font-semibold text-[#1A1A1A]">Customer Response Hours:</p>
            <p>Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
            <p>Direct courier dispatch tracking links sent via SMS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
