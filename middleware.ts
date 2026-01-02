import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for session token in cookies
    // better-auth typically uses "better-auth.session_token"
    const sessionToken = request.cookies.get("better-auth.session_token")?.value;

    const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isProtectedRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/krypt") ||
        pathname.startsWith("/stocks");

    // 1. If user is logged in and tries to access auth routes, redirect to dashboard
    if (isAuthRoute && sessionToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 2. If user is NOT logged in and tries to access protected routes, redirect to sign-in
    if (isProtectedRoute && !sessionToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/krypt/:path*",
        "/stocks/:path*",
        "/sign-in",
        "/sign-up",
    ],
};
