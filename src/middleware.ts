import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // console.log(`Middleware running for: ${pathname}`);

  // Allow login page and its variations (with/without trailing slash)
  if (
    pathname === "/panel/login" ||
    pathname === "/panel/signup" ||
    pathname === "/panel/login/"
  ) {
    return NextResponse.next();
  }

  // Check if this is a protected route
  const isProtectedRoute =
    pathname.startsWith("/panel") || pathname.startsWith("/panel-api");

  if (!isProtectedRoute) {
    console.log("Not a protected route, allowing access");
    return NextResponse.next();
  }

  // Check if JWT_SECRET is available
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables");
    const loginUrl = new URL("/panel/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value;
  // console.log(`Token found: ${token ? "Yes" : "No"}`);

  if (!token) {
    console.log("No token found, redirecting to login");
    const loginUrl = new URL("/panel/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Actually verify the token - this was commented out!
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.warn("Invalid token:", err);
    // Clear the invalid token cookie
    const response = NextResponse.redirect(
      new URL("/panel/login", request.url)
    );
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    // Match all panel routes
    "/panel/:path*",
    "/panel-api/:path*",
  ],
};
