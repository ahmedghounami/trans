// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/home",
  "/dashboard",
  "/shop",
  "/profile",
  "/chat",
  "/settings",
  "/cart",
  "/orders",
  "/rps",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  
  // Check if there's a token in the URL query params (from OAuth redirect)
  const urlToken = request.nextUrl.searchParams.get("token");

  if (protectedRoutes.includes(pathname)) {
    // Allow access if there's a token in cookie OR in URL params
    if (!token && !urlToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in users from accessing /login again
  if (pathname === "/login" && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/chat";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
