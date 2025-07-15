import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/core/auth";

// Define routes that require authentication
const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdmin = adminRoutes.some(route => pathname.startsWith(route));

  // Get the session (user) from NextAuth
  const session = await auth();

  if (isProtected && !session) {
    // If not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isProtected && session && pathname === "/login") {
    // If authenticated and trying to access login, redirect to dashboard (or home)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }



  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*",  "/login"],
};