import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessions";

const routePermissions = {
   guestOnly: ["/signin", "/signup", "/forgot-password"],
   protected: ["/todos", "/analytics", "/calendar", "/search"],
};

function matchesPath(pathname: string, paths: string[]): boolean {
   return paths.some((path) => {
      if (path === pathname) return true;

      if (pathname.startsWith(path + "/")) return true;

      return false;
   });
}

export async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;
   const session = await getSession();

   if (matchesPath(pathname, routePermissions.guestOnly)) {
      if (session?.user) {
         return NextResponse.redirect(new URL("/todos", request.url));
      }
      return NextResponse.next();
   }

   if (!session?.user) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signinUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      // Protected routes
      "/todos/:path*",
      "/analytics/:path*",
      "/calendar/:path*",
      "/search/:path*",

      // Guest-only routes
      "/signin",
      "/signup",
      "/forgot-password",
      "/reset-password",
   ],
};
