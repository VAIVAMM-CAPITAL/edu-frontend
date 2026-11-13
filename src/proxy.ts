import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MARKET_COOKIE, MARKET_HEADER, isMarketCode, marketForCountry, type MarketCode } from "@/lib/market";
const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/privacy-policy",
    "/terms-of-service",
    "/risk-disclosure",
];
const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
];
const roleBasedRoutes: Record<string, string[]> = {
    LEARNER: [
        "/learner/dashboard",
        "/learner/my-courses",
        "/learner/profile",
        "/learner/course",
        "/learner/checkout",
        "/learner/cart",
        "/learner/payment/success",
        "/learner/payment/failure",
    ],
    INSTRUCTOR: ["/instructor"],
    CORPORATE_ADMIN: ["/corporate"],
    PLATFORM_ADMIN: ["/admin", "/instructor"],
    CONTENT_ADMIN: ["/admin/blogs"],
};
const publicPrefixes = ["/courses", "/about", "/contact"];
function decodeJwtPayload(token: string): {
    role?: string;
} | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3)
            return null;
        const payload = parts[1];
        const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);
        const decoded = Buffer.from(paddedPayload, "base64").toString("utf-8");
        return JSON.parse(decoded);
    }
    catch {
        return null;
    }
}
function getDashboardRoute(role: string): string {
    const roleToRoute: Record<string, string> = {
        LEARNER: "/learner/dashboard",
        PLATFORM_ADMIN: "/admin/dashboard",
        INSTRUCTOR: "/instructor/dashboard",
        CORPORATE_ADMIN: "/corporate/dashboard",
        CONTENT_ADMIN: "/admin/blogs",
    };
    return roleToRoute[role] || "/learner/dashboard";
}
/** Visitor's market: their saved choice, else the country their host or CDN detected. */
function detectMarket(request: NextRequest): MarketCode {
    const chosen = request.cookies.get(MARKET_COOKIE)?.value;
    if (isMarketCode(chosen))
        return chosen;
    const country = request.headers.get("x-vercel-ip-country") ||
        request.headers.get("cf-ipcountry") ||
        request.headers.get("cloudfront-viewer-country");
    return marketForCountry(country);
}
export function proxy(request: NextRequest) {
    // API calls are proxied to the backend: tell it which country's prices to use.
    if (request.nextUrl.pathname.startsWith("/api/")) {
        if (request.headers.get(MARKET_HEADER))
            return NextResponse.next();
        const headers = new Headers(request.headers);
        headers.set(MARKET_HEADER, detectMarket(request));
        return NextResponse.next({ request: { headers } });
    }
    const response = route(request);
    if (!request.cookies.get(MARKET_COOKIE)) {
        response.cookies.set(MARKET_COOKIE, detectMarket(request), { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return response;
}
function route(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("auth-token")?.value;
    if (pathname.startsWith("/learner/checkout")) {
        return NextResponse.redirect(new URL("/learner/cart", request.url));
    }
    if (pathname === "/" ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next"))
        return NextResponse.next();
    const isPublicPrefix = publicPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
    const commonRoutes = [
        "/learner/profile",
        "/courses",
        "/search",
        "/categories",
        "/learner/cart",
        "/learner/courses",
        "/leadership",
        "/events",
        "/spotlight",
        "/about",
        "/contact",
        "/privacy-policy",
    ];
    if (!token) {
        if (isPublicRoute || isPublicPrefix)
            return NextResponse.next();
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }
    const payload = decodeJwtPayload(token);
    const userRole = payload?.role || "LEARNER";
    const dashboardRoute = getDashboardRoute(userRole);
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    const isCommonRoute = commonRoutes.some((route) => pathname.startsWith(route));
    if (!payload?.role) {
        if (isAuthRoute)
            return NextResponse.next();
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }
    if (isAuthRoute) {
        if (pathname === dashboardRoute)
            return NextResponse.next();
        return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }
    const hasAccess = roleBasedRoutes[userRole]?.some((route) => pathname.startsWith(route)) ??
        false;
    if (!hasAccess && !isCommonRoute) {
        if (pathname === dashboardRoute)
            return NextResponse.next();
        return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|pdf)$).*)",
    ],
};
