import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("AUTH_LGN")?.value;
  let url = request.nextUrl;
  let role = "";

  if (cookie) {
    role = decodeJWT(cookie).role;
  }

  if (url.pathname == "/login" && cookie) {
    return NextResponse.redirect(new URL("/student/activity", url));
  }
  if (url.pathname != "/login" && !cookie) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (role !== "student" && url.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/forbidden", url));
  }

  if (role !== "lecture" && url.pathname.startsWith("/lecture")) {
    return NextResponse.redirect(new URL("/forbidden", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/login", "/lecture:path*"],
};

function decodeJWT(token: string) {
  var arr = token.split(".");
  const payload = JSON.parse(atob(arr[1]));
  return payload;
}
