import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const publicRoutes = ["/api/auth/signin", "/"];

  if (!session && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|sitemap.xml|robots.txt).*)",
  ],
};
