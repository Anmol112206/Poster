import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

async function getSessionToken(req: NextRequest, secret: string) {
  const isSecure =
    req.nextUrl.protocol === "https:" ||
    req.headers.get("x-forwarded-proto") === "https" ||
    req.cookies.has("__Secure-authjs.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token");

  // 1. Try with detected secure flag
  let token = await getToken({
    req,
    secret,
    secureCookie: isSecure,
  });

  // 2. Fallback: try opposite secure flag
  if (!token) {
    token = await getToken({
      req,
      secret,
      secureCookie: !isSecure,
    });
  }

  // 3. Fallback: check legacy cookie names if still not found
  if (!token && (req.cookies.has("next-auth.session-token") || req.cookies.has("__Secure-next-auth.session-token"))) {
    token = await getToken({
      req,
      secret,
      cookieName: isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      salt: isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      secureCookie: isSecure,
    });
  }

  return token;
}

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
  const token = await getSessionToken(req, secret);
  const isLoggedIn = !!token;
  const role = token?.role;
  const { pathname } = req.nextUrl;

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/?error=unauthorized", req.nextUrl.origin));
    }
  }

  // Account and Checkout routes protection
  if (pathname.startsWith("/account") || pathname.startsWith("/checkout")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect already authenticated users trying to access login/signup
  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    const rawCallback = req.nextUrl.searchParams.get("callbackUrl");
    if (rawCallback && !rawCallback.startsWith("/login") && !rawCallback.startsWith("/signup")) {
      return NextResponse.redirect(new URL(rawCallback, req.nextUrl.origin));
    }
    return NextResponse.redirect(
      new URL(role === "ADMIN" ? "/admin/products" : "/account/orders", req.nextUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/checkout",
    "/checkout/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/signup",
  ],
};
