import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const session = await getIronSession(request.cookies as any, sessionOptions) as any;
  const user = session.user;

  const { pathname } = request.nextUrl;

  // Allow API routes to pass through
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Redirect to login if not logged in and not on the login page
  if (!user && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to create contact if logged in and on the login page
  if (user && pathname === "/login") {
    const redirectUrl = user.username === 'admin' ? '/contacts' : '/contacts/create';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Role-based access control
  if (user && user.username !== 'admin') {
    const allowedPaths = ['/contacts/create', '/api/auth/logout', '/api/auth/allowed-companies'];
    if (!allowedPaths.some(p => pathname.startsWith(p))) {
      // If not admin and trying to access a restricted page, redirect to create contact
      return NextResponse.redirect(new URL('/contacts/create', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
