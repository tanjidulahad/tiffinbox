import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/login", "/register"];

// যে prefix গুলোতে শুধু login থাকলেই চলবে (কোনো special role লাগবে না)
const customerRoutes = ["/dashboard", "/orders", "/notifications", "/become-a-chef"];

// যে prefix গুলোতে নির্দিষ্ট extra role লাগবে
const roleGatedRoutes: Record<string, "chef" | "admin"> = {
  "/chef-dashboard": "chef",
  "/menu": "chef",
  "/admin": "admin",
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRoles = req.auth?.user?.roles || [];
  const path = nextUrl.pathname;

  console.log("Current User:", req.auth?.user,path)


  if (isLoggedIn && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  const matchedCustomerPrefix = customerRoutes.find((p) => path.startsWith(p));
  if (matchedCustomerPrefix && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  const matchedRoleGatedPrefix = Object.keys(roleGatedRoutes).find((p) =>
    path.startsWith(p)
  );
  console.log("matchedRoleGatedPrefix", matchedRoleGatedPrefix)
  if (matchedRoleGatedPrefix) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }
    const requiredRole = roleGatedRoutes[matchedRoleGatedPrefix];
    console.log("requiredRole", requiredRole)
    console.log("userRoles", userRoles)
    console.log("requiredRole if condition", !userRoles.includes(requiredRole))
    if (!userRoles.includes(requiredRole)) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/notifications/:path*",
    "/chef-dashboard/:path*",
    "/menu/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/become-a-chef",
  ],
};