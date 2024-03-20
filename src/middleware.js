import { NextResponse } from "next/server";
import Cookies from "js-cookie";
export default function middleware(req) {
  const loggedin = Cookies.get("token");
  console.log(loggedin);
  const role = req.cookies.get("role");
  const { pathname } = req.nextUrl;

  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL("/message", req.url));
  }

  if (loggedin && role && role.value === "admin") {
    if (
      pathname === "/agents" ||
      pathname === "/message" ||
      pathname === "/create"
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/message", req.url));
  }

  if (loggedin && role && role.value === "agent") {
    if (pathname === "/message" || pathname === "/newmessage") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/message", req.url));
  }

  // For any other cases
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.\..|_next).*)",
};