"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl");
  const callbackUrl = (rawCallback && !rawCallback.startsWith("/login") && !rawCallback.startsWith("/signup"))
    ? rawCallback
    : "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const res = await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Incorrect email or password. Please try again.");
        toast.error("Incorrect email or password.");
      } else {
        toast.success("Welcome back!");
        const isAdmin = normalizedEmail === "agarwalanmol1212@gmail.com";
        const destination = callbackUrl || (isAdmin ? "/admin/products" : "/account/orders");
        window.location.href = destination;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded border border-[#DDD7CC] bg-white p-8 shadow-sm">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A]">
            Cammino
          </Link>
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">Sign in to your account</h2>
          <p className="mt-2 text-sm text-[#6B665E]">
            Track orders, save favorite prints, and manage delivery addresses.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-6 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="email">
              Email address
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-[#C8501E]"
              />
              <Mail className="pointer-events-none absolute right-3.5 top-3 h-4 w-4 text-[#6B665E]" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2.5 pr-10 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-[#C8501E]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#6B665E] hover:text-[#1A1A1A]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center rounded bg-[#1A1A1A] px-4 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#C8501E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-[#DDD7CC] pt-6 text-center text-sm text-[#6B665E]">
          Don&apos;t have an account yet?{" "}
          <Link
            href={rawCallback ? `/signup?callbackUrl=${encodeURIComponent(rawCallback)}` : "/signup"}
            className="font-semibold text-[#C8501E] hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-[#6B665E]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
