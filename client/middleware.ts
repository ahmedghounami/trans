import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require auth
const protectedRoutes = ["/home", "/dashboard", "/shop", "/profile"];

export function middleware(request: NextRequest) {
  const isLoggedIn = true; // Replace with actual authentication check logic

  const pathname = request.nextUrl.pathname;

  if (protectedRoutes.includes(pathname)) {
    if (!isLoggedIn) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
