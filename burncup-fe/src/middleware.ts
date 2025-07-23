import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/core/auth";

// Define routes that require authentication
const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];

// Array of admin emails
const adminEmails = [
  "vidoghibran7@gmail.com",
  "nicolasmaulanass@gmail.com",
  "burncupbinusbekasi@gmail.com",
  "mahesaryan350@gmail.com",
  "ghozifthr@gmail.com"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdmin = adminRoutes.some(route => pathname.startsWith(route));

  // Get the session (user) from NextAuth
  const session = await auth();

  // Check if user is admin
  const isAdminUser = session?.user?.email && adminEmails.includes(session.user.email);

  if (isProtected && !session) {
    // If not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isProtected && session && pathname === "/login") {
    // If authenticated and trying to access login, redirect appropriately
    if (isAdminUser) {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Admin route protection: only admin can access admin routes
  if (isAdmin && !isAdminUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/admin/:path*"],
};