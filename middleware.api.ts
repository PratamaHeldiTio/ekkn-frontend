import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("AUTH_LGN")?.value;
  let url = request.nextUrl;
  let role = "";

  if (cookie) {
    role = decodeJWT(cookie).role;
  }

  if (url.pathname == "/sakera-login" && cookie) {
    if (role != "admin") {
      return NextResponse.redirect(new URL(`/${role}/profile`, url));
    }
    return NextResponse.redirect(new URL("/sakera/student", url));
  }

  if (url.pathname == "/" && cookie) {
    if (role == "admin") {
      return NextResponse.redirect(new URL("/sakera/student", url));
    }
    return NextResponse.redirect(new URL(`/${role}/profile`, url));
  }

  if (url.pathname != "/" && url.pathname != "/sakera-login" && !cookie) {
    if (url.pathname.startsWith("/sakera")) {
      return NextResponse.redirect(new URL("/sakera-login", url));
    }
    return NextResponse.redirect(new URL("/", url));
  }

  if (role !== "student" && url.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/logout", url));
  }

  if (role !== "lecturer" && url.pathname.startsWith("/lecturer")) {
    return NextResponse.redirect(new URL("/logout", url));
  }

  if (role !== "admin" && url.pathname.startsWith("/sakera/")) {
    return NextResponse.redirect(new URL("/logout", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/",
    "/sakera-login",
    "/sakera/:path*",
    "/lecturer/:path*",
  ],
};

function decodeJWT(token: string) {
  var arr = token.split(".");
  const payload = JSON.parse(atob(arr[1]));
  return payload;
}
