// ========================================
// Middleware - Route Protection
// ========================================
// This runs before every page load to check if user is authenticated
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of pages that require authentication
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
  "/games",
];

export function middleware(request: NextRequest) {
  // Get JWT token from cookie (stored after login)
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  
  // Check if token is in URL (from Google OAuth redirect)
  const urlToken = request.nextUrl.searchParams.get("token");

  // ========================================
  // Protect Routes - Require Authentication
  // ========================================
  if (protectedRoutes.includes(pathname)) {
    // If no token in cookie OR URL, redirect to login
    if (!token && !urlToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // ========================================
  // Prevent Double Login
  // ========================================
  // If user is already logged in, don't show login page
  if (pathname === "/login" && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // Allow request to continue
  return NextResponse.next();
}

// ========================================
// Middleware Configuration
// ========================================
// Tell Next.js which routes to apply middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
