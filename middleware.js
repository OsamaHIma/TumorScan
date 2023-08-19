import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = req.nextUrl.pathname;
  const searchParams = url.searchParams;
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  // if (pathname === "/verify-email" || pathname === "/auth/reset-password") {
  //   if (mode !== "verifyEmail" && mode !== "resetPassword") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }

  if (mode === "verifyEmail") {
    return NextResponse.redirect(new URL(`/verify-email?oobCode=${oobCode}`, req.url));
  } else if (mode === "resetPassword") {
    return NextResponse.redirect(new URL(`/auth/reset-password?oobCode=${oobCode}`, req.url));
  }


  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    if (pathname === "/upload" || pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  if (session) {
    if (pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/upload", req.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/","/verify-email", "/dashboard/:path*", "/auth/login", "/dashboard","/upload"],
};