import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/login", "/register"];

const roleBasedRoutes: Record<string, string> = {
  "/dashboard": "customer",
  "/orders": "customer",
  "/chef-dashboard": "chef",
  "/menu": "chef",
  "/admin": "admin",
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const path = nextUrl.pathname;

  if (isLoggedIn && authRoutes.includes(path)) {
    const redirectPath = getDashboardPath(userRole);
    return NextResponse.redirect(new URL(redirectPath, nextUrl));
  }

  const matchedRolePrefix = Object.keys(roleBasedRoutes).find((prefix) =>
    path.startsWith(prefix)
  );

  if (matchedRolePrefix && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  if (matchedRolePrefix && isLoggedIn) {
    const requiredRole = roleBasedRoutes[matchedRolePrefix];
    if (userRole !== requiredRole) {
      const redirectPath = getDashboardPath(userRole);
      return NextResponse.redirect(new URL(redirectPath, nextUrl));
    }
  }

  return NextResponse.next();
});

function getDashboardPath(role?: string) {
  switch (role) {
    case "chef":
      return "/chef-dashboard";
    case "admin":
      return "/admin";
    default:
      return "/dashboard";
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/chef-dashboard/:path*",
    "/menu/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};