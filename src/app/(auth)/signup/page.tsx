"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Check, X, Shield, ArrowRight, Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { sendMobileOtp, verifyMobileOtp, signUp } from "@/actions/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [demoOtpHint, setDemoOtpHint] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live password strength calculation
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const getStrengthLabel = () => {
    if (!password) return null;
    if (hasMinLength && hasLetter && hasNumber && hasSpecial) {
      return { text: "Strong", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    }
    if (hasMinLength && hasLetter && hasNumber) {
      return { text: "Medium", color: "text-amber-700 bg-amber-50 border-amber-200" };
    }
    return { text: "Weak", color: "text-rose-700 bg-rose-50 border-rose-200" };
  };

  const strength = getStrengthLabel();

  // Handle Send OTP
  const handleSendOtp = async () => {
    setErrorMsg(null);
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number starting with 6-9.");
      return;
    }

    setSendingOtp(true);
    const res = await sendMobileOtp(phone);
    setSendingOtp(false);

    if (res.success) {
      setOtpSent(true);
      if (res.data.devOtp) {
        setDemoOtpHint(res.data.devOtp);
      }
      toast.success(res.data.message);
    } else {
      setErrorMsg(res.error.message);
      toast.error(res.error.message);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    setErrorMsg(null);
    if (otp.length !== 6) {
      setErrorMsg("Please enter the 6-digit OTP received.");
      return;
    }

    setVerifyingOtp(true);
    const res = await verifyMobileOtp(phone, otp);
    setVerifyingOtp(false);

    if (res.success) {
      setOtpVerified(true);
      toast.success("Phone verified successfully!");
    } else {
      setErrorMsg(res.error.message);
      toast.error(res.error.message);
    }
  };

  // Handle Final Signup Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!otpVerified) {
      setErrorMsg("Please verify your mobile number with OTP first.");
      toast.error("Mobile OTP verification required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!hasMinLength || !hasLetter || !hasNumber) {
      setErrorMsg("Password must be at least 8 characters with at least 1 letter and 1 number.");
      return;
    }

    setSubmitting(true);
    const res = await signUp({
      name,
      email,
      phone,
      otp,
      password,
      confirmPassword,
    });

    if (!res.success) {
      setSubmitting(false);
      setErrorMsg(res.error.message);
      toast.error(res.error.message);
      return;
    }

    toast.success("Account created successfully! Signing in...");

    // Auto sign-in
    const signInRes = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (signInRes?.error) {
      router.push("/login?registered=true");
    } else {
      router.push("/account/orders");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded border border-[#DDD7CC] bg-white p-8 shadow-sm">
        <div className="text-center">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A]">
            Camino
          </Link>
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">Create an account</h2>
          <p className="mt-2 text-sm text-[#6B665E]">
            Get access to orders, faster checkout, and exclusive poster drops.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-6 rounded border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-[#C8501E]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-[#C8501E]"
            />
          </div>

          {/* Mobile Number & OTP Verification */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="phone">
              Mobile Number (10 digits)
            </label>
            <div className="mt-1 flex gap-2">
              <div className="flex flex-1 items-center rounded border border-[#DDD7CC] bg-white px-3">
                <span className="text-sm font-medium text-[#6B665E]">+91</span>
                <input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  required
                  disabled={otpVerified}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="w-full bg-transparent px-2 py-2.5 text-sm text-[#1A1A1A] outline-none disabled:text-[#6B665E]"
                />
              </div>

              {!otpVerified ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || phone.length !== 10}
                  className="rounded border border-[#1A1A1A] bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] transition-colors duration-150 hover:bg-[#1A1A1A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sendingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              ) : (
                <div className="flex items-center gap-1 rounded bg-emerald-50 px-3 text-xs font-medium text-emerald-700 border border-emerald-200">
                  <Check className="h-4 w-4" /> Verified
                </div>
              )}
            </div>

            {demoOtpHint && !otpVerified && (
              <p className="mt-1 text-xs text-[#C8501E]">
                Test Hint: OTP is <span className="font-mono font-bold">{demoOtpHint}</span>
              </p>
            )}
          </div>

          {/* OTP Input Field */}
          {otpSent && !otpVerified && (
            <div className="rounded border border-[#DDD7CC] bg-[#F6F3EE] p-3">
              <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="otp">
                Enter 6-digit OTP
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  id="otp"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full rounded border border-[#DDD7CC] bg-white px-3 py-2 text-sm font-mono tracking-widest text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || otp.length !== 6}
                  className="rounded bg-[#C8501E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B34416] disabled:opacity-50"
                >
                  {verifyingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                </button>
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="password">
              Password (min. 8 characters, 1 letter, 1 number)
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
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

            {/* Live Strength Hints */}
            {password && strength && (
              <div className="mt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`rounded border px-2 py-0.5 font-medium ${strength.color}`}>
                    {strength.text}
                  </span>
                  <span className="text-[#6B665E]">
                    {hasMinLength ? "✓ 8+ chars" : "• Needs 8+ chars"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6B665E]" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-[#C8501E]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !otpVerified}
            className="mt-6 flex w-full items-center justify-center rounded bg-[#1A1A1A] px-4 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#C8501E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating your account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-[#DDD7CC] pt-6 text-center text-sm text-[#6B665E]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#C8501E] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
