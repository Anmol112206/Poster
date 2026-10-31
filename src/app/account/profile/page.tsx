import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User, Mail, Phone, MapPin, ShieldAlert, LogOut } from "lucide-react";

export default async function AccountProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/account/profile");
  }

  let addresses: Array<{
    id: string;
    fullName: string;
    phone: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }> = [];

  try {
    addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // If DB offline, empty array
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Account Navigation Tabs */}
      <div className="border-b border-[#DDD7CC] pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            Account Profile
          </h1>
          <p className="mt-1 text-sm text-[#6B665E]">
            Manage your personal details and delivery addresses.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/account/orders"
            className="rounded border border-[#DDD7CC] bg-white px-3.5 py-1.5 text-xs font-medium text-[#1A1A1A] hover:bg-[#F6F3EE]"
          >
            Orders
          </Link>
          <Link
            href="/account/profile"
            className="rounded bg-[#1A1A1A] px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            Profile
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Personal Details Card */}
        <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
            Personal Information
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-[#6B665E]" />
              <div>
                <p className="text-xs text-[#6B665E]">Full Name</p>
                <p className="font-medium text-[#1A1A1A]">{session.user.name || "Customer"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#6B665E]" />
              <div>
                <p className="text-xs text-[#6B665E]">Email Address</p>
                <p className="font-medium text-[#1A1A1A]">{session.user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldAlert className="h-4 w-4 text-[#6B665E]" />
              <div>
                <p className="text-xs text-[#6B665E]">Account Role</p>
                <p className="font-medium text-[#1A1A1A]">
                  <span className="rounded bg-[#F6F3EE] px-2 py-0.5 text-xs font-semibold">
                    {session.user.role || "CUSTOMER"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Addresses Card */}
        <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
            Saved Delivery Addresses
          </h2>

          {addresses.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#6B665E]">
              <MapPin className="mx-auto h-8 w-8 text-[#DDD7CC] mb-2" />
              <p>No saved addresses yet.</p>
              <p className="mt-1">Addresses saved during checkout will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="rounded border border-[#DDD7CC] bg-[#F6F3EE] p-3 text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-[#1A1A1A]">
                    <span>{addr.fullName}</span>
                    {addr.isDefault && (
                      <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[#6B665E]">{addr.line1}</p>
                  {addr.line2 && <p className="text-[#6B665E]">{addr.line2}</p>}
                  <p className="text-[#6B665E]">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-[#6B665E] font-mono">Mobile: +91 {addr.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
