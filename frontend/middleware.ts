import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessions";
import { Role } from "@/types/auth";

const routePermissions = {
   guestOnly: ["/signin", "/signup", "/forgot-password"],
   protected: {
      customer: ["/dashboard"],
      admin: ["/control-panel"],
   },
};

function hasRequiredRole(userRole: Role, requiredRole: Role[]): boolean {
   const requiredRolesSet = new Set([...requiredRole]);

   return requiredRolesSet.has(userRole);
}

function matchesPath(pathname: string, paths: string[]): boolean {
   return paths.some((path) => {
      if (path === pathname) return true;

      if (pathname.startsWith(path + "/")) return true;

      return false;
   });
}

function getRequiredRole(pathname: string): Role[] | null {
   if (matchesPath(pathname, routePermissions.protected.admin)) {
      return [Role.ADMIN, Role.SUPER_ADMIN];
   }

   if (matchesPath(pathname, routePermissions.protected.customer)) {
      return [Role.CUSTOMER, Role.SUPER_ADMIN];
   }

   return null;
}

export async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;
   const session = await getSession();

   if (matchesPath(pathname, routePermissions.guestOnly)) {
      if (session?.user) {
         return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
   }

   const requiredRole = getRequiredRole(pathname);

   if (!requiredRole) {
      return NextResponse.next();
   }

   if (!session?.user) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signinUrl);
   }

   // if (!hasRequiredRole(session.user.role, requiredRole)) {
   //    const unauthorizedUrl = new URL("/unauthorized", request.url);
   //    unauthorizedUrl.searchParams.set("required", Role.ADMIN);
   //    unauthorizedUrl.searchParams.set("current", session.user.role);
   //    return NextResponse.redirect(unauthorizedUrl);
   // }

   return NextResponse.next();
}

export const config = {
   matcher: [
      // Protected routes
      "/dashboard/:path*",
      "/profile/:path*",
      "/settings/:path*",
      "/upload/:path*",

      // Admin routes
      "/admin/:path*",
      "/users/:path*",
      "/analytics/:path*",
      "/reports/:path*",

      // Super Admin routes
      "/control-panel/:path*",
      "/system-settings/:path*",
      "/admin-management/:path*",

      // Guest-only routes
      "/signin",
      "/signup",
      "/forgot-password",
      "/reset-password",

      // Account status route
      "/account-status",
      "/unauthorized",
   ],
};
