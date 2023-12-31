import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = req.nextUrl.pathname;
  const searchParams = url.searchParams;
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  if (mode === "verifyEmail") {
    return NextResponse.redirect(
      new URL(`/verify-email?oobCode=${oobCode}`, req.url)
    );
  } else if (mode === "resetPassword") {
    return NextResponse.redirect(
      new URL(`/auth/reset-password?oobCode=${oobCode}`, req.url)
    );
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    if (pathname === "/upload" ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  // if (session) {
  //   if (session.user.user.emailVerified === false) {
  //     if (pathname === "/upload" ) {
  //       toast.error(
  //         "Your email is not verified, please verify it to upload images"
  //       );
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //   } else {
  //   return NextResponse.next();
  //   }

  //   return NextResponse.next();
  // }
}
export const config = {
  matcher: [
    "/",
    "/verify-email",
    "/auth/login",
    "/upload",
  ],
};
